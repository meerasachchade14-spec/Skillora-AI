from django.contrib.auth.hashers import make_password, check_password
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from datetime import datetime

from config.db import get_db
from apps.authentication.otp_utils import create_otp, verify_otp_code, can_request_otp
from apps.authentication.email_utils import send_otp_email
from apps.authentication.services import (
    generate_jwt_token, 
    generate_password_reset_token, 
    decode_password_reset_token
)
from apps.authentication.serializers import (
    UserRegistrationSerializer,
    VerifyOtpSerializer,
    UserLoginSerializer,
    ForgotPasswordSerializer,
    ResetPasswordSerializer,
    SocialAuthSerializer
)

class RegisterView(APIView):
    """
    POST /api/auth/register/
    Registers a new user, hashes the password, stores in MongoDB,
    generates an OTP and sends it via email.
    """
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = UserRegistrationSerializer(data=request.data)
        if serializer.is_valid():
            data = serializer.validated_data
            
            db = get_db()
            
            # Create user document
            user_doc = {
                'name': data['name'],
                'email': data['email'],
                'password': make_password(data['password']),
                'is_verified': False,
                'google_id': None,
                'github_id': None,
                'phone_number': None,
                'created_at': datetime.utcnow(),
                'updated_at': datetime.utcnow()
            }
            
            # Save user
            db.users.insert_one(user_doc)
            
            # Create and send registration OTP (10 mins expiration)
            otp_code = create_otp(data['email'], 'registration')
            sent, email_error = send_otp_email(data['email'], otp_code, 'registration')
            if not sent:
                db.users.delete_one({'email': data['email']})
                return Response({
                    "error": f"Failed to send verification OTP email: {email_error}"
                }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            
            return Response({
                "message": "Registration successful. A verification OTP has been sent to your email."
            }, status=status.HTTP_201_CREATED)
            
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class VerifyOtpView(APIView):
    """
    POST /api/auth/verify-otp/
    Verifies registration or social MFA OTPs.
    If valid, marks the user verified and issues a JWT auth token.
    """
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = VerifyOtpSerializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data['email']
            otp_code = serializer.validated_data['otp_code']
            otp_type = serializer.validated_data['otp_type']
            
            # OTP validation in database
            if verify_otp_code(email, otp_code, otp_type):
                db = get_db()
                user = db.users.find_one({'email': email})
                
                if not user:
                    return Response({"error": "User not found."}, status=status.HTTP_404_NOT_FOUND)
                
                # Mark verified for registration or social login MFA
                if otp_type in ['registration', 'google_mfa', 'github_mfa']:
                    db.users.update_one(
                        {'_id': user['_id']},
                        {'$set': {'is_verified': True, 'updated_at': datetime.utcnow()}}
                    )
                    user['is_verified'] = True
                
                # Generate auth JWT token
                token = generate_jwt_token(email, str(user['_id']))
                
                return Response({
                    "message": "OTP verified successfully.",
                    "token": token,
                    "user": {
                        "id": str(user['_id']),
                        "name": user.get('name'),
                        "email": user.get('email')
                    }
                }, status=status.HTTP_200_OK)
                
            return Response({"error": "Invalid or expired OTP."}, status=status.HTTP_400_BAD_REQUEST)
            
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LoginView(APIView):
    """
    POST /api/auth/login/
    Logs in users by email and password.
    Returns JWT if verified.
    If account is not verified, automatically resends OTP and returns 403.
    """
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = UserLoginSerializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data['email']
            password = serializer.validated_data['password']
            
            db = get_db()
            user = db.users.find_one({'email': email})
            
            # Verify existence and password
            if not user or not check_password(password, user['password']):
                return Response({"error": "Invalid email or password."}, status=status.HTTP_400_BAD_REQUEST)
            
            # Verify account status
            if not user.get('is_verified', False):
                # Check rate limit before resending registration OTP
                allowed, _ = can_request_otp(email, 'registration')
                if allowed:
                    otp_code = create_otp(email, 'registration')
                    sent, email_error = send_otp_email(email, otp_code, 'registration')
                    if not sent:
                        return Response({
                            "error": f"Account is not verified, and failed to send verification OTP email: {email_error}"
                        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
                    
                return Response({
                    "error": "Account is not verified.",
                    "is_verified": False,
                    "message": "A verification OTP has been sent to your email. Please verify it before logging in."
                }, status=status.HTTP_403_FORBIDDEN)
                
            # Generate token
            token = generate_jwt_token(email, str(user['_id']))
            
            return Response({
                "message": "Login successful.",
                "token": token,
                "user": {
                    "id": str(user['_id']),
                    "name": user.get('name'),
                    "email": user.get('email')
                }
            }, status=status.HTTP_200_OK)
            
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class SendOtpView(APIView):
    """
    POST /api/auth/send-otp/
    General endpoint to manually request/resend OTP codes.
    Accepts: email, otp_type ('registration', 'forgot_password', 'google_mfa', 'github_mfa').
    """
    permission_classes = [AllowAny]

    def post(self, request):
        email = request.data.get('email')
        otp_type = request.data.get('otp_type', 'registration')
        
        if not email:
            return Response({"error": "Email is required."}, status=status.HTTP_400_BAD_REQUEST)
            
        email = email.lower().strip()
        
        # Check OTP rate limit (60 seconds)
        allowed, retry_after = can_request_otp(email, otp_type)
        if not allowed:
            return Response({
                "error": f"Please wait {retry_after} seconds before requesting another OTP."
            }, status=status.HTTP_429_TOO_MANY_REQUESTS)
            
        db = get_db()
        user = db.users.find_one({'email': email})
        
        # Ensure user exists for authentication actions
        if otp_type in ['forgot_password', 'google_mfa', 'github_mfa'] and not user:
            return Response({"error": "No account exists with this email address."}, status=status.HTTP_404_NOT_FOUND)
            
        # Create and send OTP
        otp_code = create_otp(email, otp_type)
        sent, email_error = send_otp_email(email, otp_code, otp_type)
        
        if sent:
            return Response({"message": f"OTP successfully sent to {email}."}, status=status.HTTP_200_OK)
            
        return Response({
            "error": f"Failed to send email: {email_error}"
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class ForgotPasswordView(APIView):
    """
    POST /api/auth/forgot-password/
    Requests a password reset by email. Generates and sends 'forgot_password' OTP.
    """
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = ForgotPasswordSerializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data['email']
            
            # Check rate limiting
            allowed, retry_after = can_request_otp(email, 'forgot_password')
            if not allowed:
                return Response({
                    "error": f"Please wait {retry_after} seconds before requesting another OTP."
                }, status=status.HTTP_429_TOO_MANY_REQUESTS)
                
            # Generate & Send
            otp_code = create_otp(email, 'forgot_password')
            sent, email_error = send_otp_email(email, otp_code, 'forgot_password')
            if not sent:
                return Response({
                    "error": f"Failed to send password reset OTP email: {email_error}"
                }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            
            return Response({
                "message": "Password reset OTP sent to your email."
            }, status=status.HTTP_200_OK)
            
        # Flatten validation errors
        email_errors = serializer.errors.get('email', [])
        error_msg = email_errors[0] if email_errors else "Invalid email address."
        return Response({"error": error_msg}, status=status.HTTP_400_BAD_REQUEST)


class VerifyResetOtpView(APIView):
    """
    POST /api/auth/verify-reset-otp/
    Verifies the password-reset OTP.
    If valid, returns a temporary reset_token (JWT) to reset the password in the next step.
    """
    permission_classes = [AllowAny]

    def post(self, request):
        email = request.data.get('email')
        otp_code = request.data.get('otp_code')
        
        if not email or not otp_code:
            return Response({"error": "Email and OTP code are required."}, status=status.HTTP_400_BAD_REQUEST)
            
        email = email.lower().strip()
        
        # Verify OTP code
        if verify_otp_code(email, otp_code, 'forgot_password'):
            # Generate a temporary reset token (expires in 15 mins)
            reset_token = generate_password_reset_token(email)
            
            return Response({
                "message": "OTP verified. You may now reset your password.",
                "reset_token": reset_token
            }, status=status.HTTP_200_OK)
            
        return Response({"error": "Invalid or expired OTP."}, status=status.HTTP_400_BAD_REQUEST)


class ResetPasswordView(APIView):
    """
    POST /api/auth/reset-password/
    Resets user password in MongoDB using a verified reset_token.
    """
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = ResetPasswordSerializer(data=request.data)
        if serializer.is_valid():
            reset_token = serializer.validated_data['reset_token']
            new_password = serializer.validated_data['password']
            
            # Decode and validate token
            try:
                email = decode_password_reset_token(reset_token)
            except ValueError as e:
                return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
                
            db = get_db()
            
            # Hash and update password
            hashed_password = make_password(new_password)
            result = db.users.update_one(
                {'email': email},
                {'$set': {'password': hashed_password, 'updated_at': datetime.utcnow()}}
            )
            
            if result.matched_count > 0:
                return Response({"message": "Password has been reset successfully."}, status=status.HTTP_200_OK)
                
            return Response({"error": "User account no longer exists."}, status=status.HTTP_404_NOT_FOUND)
            
        # Flatten validation errors
        errors = serializer.errors
        error_msg = "Validation failed."
        if 'password' in errors:
            error_msg = errors['password'][0]
        elif 'confirm_password' in errors:
            error_msg = errors['confirm_password'][0]
        elif 'reset_token' in errors:
            error_msg = errors['reset_token'][0]
        elif 'non_field_errors' in errors:
            error_msg = errors['non_field_errors'][0]
        return Response({"error": error_msg}, status=status.HTTP_400_BAD_REQUEST)


class GoogleAuthView(APIView):
    """
    POST /api/auth/google/
    Continues authentication with Google.
    Handles secondary phone number verification if required.
    """
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = SocialAuthSerializer(data=request.data)
        if serializer.is_valid():
            data = serializer.validated_data
            email = data['email']
            name = data.get('name', 'Google User')
            social_id = data['social_id']
            phone_number = data.get('phone_number')
            otp_code = data.get('otp_code')
            
            db = get_db()
            user = db.users.find_one({'email': email})
            
            # Check if user already exists
            if user:
                # If they already have phone number verified, let them pass
                if user.get('phone_number'):
                    # Update google_id if not set
                    if not user.get('google_id'):
                        db.users.update_one({'_id': user['_id']}, {'$set': {'google_id': social_id}})
                    
                    token = generate_jwt_token(email, str(user['_id']))
                    return Response({
                        "message": "Login successful.",
                        "token": token,
                        "user": {
                            "id": str(user['_id']),
                            "name": user.get('name'),
                            "email": user.get('email')
                        }
                    }, status=status.HTTP_200_OK)
                
                # If they exist but need phone verification:
                if not phone_number or not otp_code:
                    return Response({
                        "status": "phone_verification_required",
                        "message": "Phone number verification is required to link Google login."
                    }, status=status.HTTP_200_OK)
                    
                # If phone_number and otp_code are provided, verify the OTP
                if not verify_otp_code(email, otp_code, 'google_mfa'):
                    return Response({"error": "Invalid or expired OTP."}, status=status.HTTP_400_BAD_REQUEST)
                
                # OTP is valid, save phone number and google_id
                db.users.update_one(
                    {'_id': user['_id']},
                    {'$set': {
                        'phone_number': phone_number,
                        'google_id': social_id,
                        'is_verified': True,
                        'updated_at': datetime.utcnow()
                    }}
                )
                
                # Re-fetch user document
                user = db.users.find_one({'email': email})
                token = generate_jwt_token(email, str(user['_id']))
                return Response({
                    "message": "Google login setup and verification successful.",
                    "token": token,
                    "user": {
                        "id": str(user['_id']),
                        "name": user.get('name'),
                        "email": user.get('email')
                    }
                }, status=status.HTTP_200_OK)
                
            else:
                # User does not exist at all, registration flow
                if not phone_number or not otp_code:
                    return Response({
                        "status": "phone_verification_required",
                        "message": "Phone verification is required to complete Google sign-up."
                    }, status=status.HTTP_200_OK)
                
                # Verify OTP code
                if not verify_otp_code(email, otp_code, 'google_mfa'):
                    return Response({"error": "Invalid or expired OTP."}, status=status.HTTP_400_BAD_REQUEST)
                
                # Create user document
                user_doc = {
                    'name': name,
                    'email': email,
                    'password': make_password(None), # No local password for pure social logins
                    'is_verified': True,
                    'google_id': social_id,
                    'github_id': None,
                    'phone_number': phone_number,
                    'created_at': datetime.utcnow(),
                    'updated_at': datetime.utcnow()
                }
                
                result = db.users.insert_one(user_doc)
                token = generate_jwt_token(email, str(result.inserted_id))
                return Response({
                    "message": "Google registration and verification successful.",
                    "token": token,
                    "user": {
                        "id": str(result.inserted_id),
                        "name": name,
                        "email": email
                    }
                }, status=status.HTTP_201_CREATED)
                
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class GithubAuthView(APIView):
    """
    POST /api/auth/github/
    Continues authentication with GitHub.
    Handles secondary phone number verification if required.
    """
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = SocialAuthSerializer(data=request.data)
        if serializer.is_valid():
            data = serializer.validated_data
            email = data['email']
            name = data.get('name', 'GitHub User')
            social_id = data['social_id']
            phone_number = data.get('phone_number')
            otp_code = data.get('otp_code')
            
            db = get_db()
            user = db.users.find_one({'email': email})
            
            # Check if user already exists
            if user:
                # If they already have phone number verified, let them pass
                if user.get('phone_number'):
                    # Update github_id if not set
                    if not user.get('github_id'):
                        db.users.update_one({'_id': user['_id']}, {'$set': {'github_id': social_id}})
                    
                    token = generate_jwt_token(email, str(user['_id']))
                    return Response({
                        "message": "Login successful.",
                        "token": token,
                        "user": {
                            "id": str(user['_id']),
                            "name": user.get('name'),
                            "email": user.get('email')
                        }
                    }, status=status.HTTP_200_OK)
                
                # If they exist but need phone verification:
                if not phone_number or not otp_code:
                    return Response({
                        "status": "phone_verification_required",
                        "message": "Phone number verification is required to link GitHub login."
                    }, status=status.HTTP_200_OK)
                    
                # If phone_number and otp_code are provided, verify the OTP
                if not verify_otp_code(email, otp_code, 'github_mfa'):
                    return Response({"error": "Invalid or expired OTP."}, status=status.HTTP_400_BAD_REQUEST)
                
                # OTP is valid, save phone number and github_id
                db.users.update_one(
                    {'_id': user['_id']},
                    {'$set': {
                        'phone_number': phone_number,
                        'github_id': social_id,
                        'is_verified': True,
                        'updated_at': datetime.utcnow()
                    }}
                )
                
                user = db.users.find_one({'email': email})
                token = generate_jwt_token(email, str(user['_id']))
                return Response({
                    "message": "GitHub login setup and verification successful.",
                    "token": token,
                    "user": {
                        "id": str(user['_id']),
                        "name": user.get('name'),
                        "email": user.get('email')
                    }
                }, status=status.HTTP_200_OK)
                
            else:
                # User does not exist, registration flow
                if not phone_number or not otp_code:
                    return Response({
                        "status": "phone_verification_required",
                        "message": "Phone verification is required to complete GitHub sign-up."
                    }, status=status.HTTP_200_OK)
                
                # Verify OTP code
                if not verify_otp_code(email, otp_code, 'github_mfa'):
                    return Response({"error": "Invalid or expired OTP."}, status=status.HTTP_400_BAD_REQUEST)
                
                # Create user document
                user_doc = {
                    'name': name,
                    'email': email,
                    'password': make_password(None), # No local password for pure social logins
                    'is_verified': True,
                    'google_id': None,
                    'github_id': social_id,
                    'phone_number': phone_number,
                    'created_at': datetime.utcnow(),
                    'updated_at': datetime.utcnow()
                }
                
                result = db.users.insert_one(user_doc)
                token = generate_jwt_token(email, str(result.inserted_id))
                return Response({
                    "message": "GitHub registration and verification successful.",
                    "token": token,
                    "user": {
                        "id": str(result.inserted_id),
                        "name": name,
                        "email": email
                    }
                }, status=status.HTTP_201_CREATED)
                
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
