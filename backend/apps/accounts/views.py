import random
from django.utils import timezone
from datetime import timedelta
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.generics import RetrieveUpdateAPIView
from rest_framework_simplejwt.tokens import RefreshToken

from .models import CustomUser
from .serializers import (
    RegisterSerializer,
    LoginSerializer,
    VerifyOTPSerializer,
    ForgotPasswordSerializer,
    ResetPasswordSerializer,
    UserProfileSerializer
)
from utils.email_service import send_otp_email, send_password_reset_email

def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)
    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }

class RegisterView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            
            # Generate OTP
            otp = str(random.randint(100000, 999999))
            user.otp = otp
            user.otp_created_at = timezone.now()
            user.save()
            
            # Send Email
            send_otp_email(user.email, otp)
            
            return Response({
                "success": True,
                "message": "Registration successful! A verification code has been sent to your email."
            }, status=status.HTTP_201_CREATED)
            
        return Response({
            "success": False,
            "message": "Registration failed.",
            "errors": serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)

class VerifyOTPView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = VerifyOTPSerializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data['email']
            otp = serializer.validated_data['otp']
            
            try:
                user = CustomUser.objects.get(email=email, otp=otp)
            except CustomUser.DoesNotExist:
                return Response({
                    "success": False,
                    "message": "Invalid OTP code or email."
                }, status=status.HTTP_400_BAD_REQUEST)
                
            # Verify timeframe (10 minutes limit)
            now = timezone.now()
            if not user.otp_created_at or now - user.otp_created_at > timedelta(minutes=10):
                return Response({
                    "success": False,
                    "message": "OTP verification code has expired. Please request a new one."
                }, status=status.HTTP_400_BAD_REQUEST)
                
            # Flag user as verified
            user.is_verified = True
            user.otp = None
            user.otp_created_at = None
            user.save()
            
            return Response({
                "success": True,
                "message": "Email verification successful! You can now log in."
            }, status=status.HTTP_200_OK)
            
        return Response({
            "success": False,
            "message": "Verification parameters invalid.",
            "errors": serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)

class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.validated_data['user']
            tokens = get_tokens_for_user(user)
            user_data = UserProfileSerializer(user, context={"request": request}).data
            
            return Response({
                "success": True,
                "message": "Login successful.",
                "token": tokens['access'],
                "refresh": tokens['refresh'],
                "user": user_data
            }, status=status.HTTP_200_OK)
            
        return Response({
            "success": False,
            "message": "Login failed.",
            "errors": serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)

class ForgotPasswordView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = ForgotPasswordSerializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data['email']
            user = CustomUser.objects.get(email=email)
            
            otp = str(random.randint(100000, 999999))
            user.otp = otp
            user.otp_created_at = timezone.now()
            user.save()
            
            send_password_reset_email(email, otp)
            
            return Response({
                "success": True,
                "message": "Password reset code sent to your email."
            }, status=status.HTTP_200_OK)
            
        return Response({
            "success": False,
            "message": "Failed to request password reset code.",
            "errors": serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)

class ResetPasswordView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = ResetPasswordSerializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data['email']
            otp = serializer.validated_data['otp']
            new_password = serializer.validated_data['new_password']
            
            try:
                user = CustomUser.objects.get(email=email, otp=otp)
            except CustomUser.DoesNotExist:
                return Response({
                    "success": False,
                    "message": "Invalid verification code or email address."
                }, status=status.HTTP_400_BAD_REQUEST)
                
            # Verify timeframe (10 minutes)
            now = timezone.now()
            if not user.otp_created_at or now - user.otp_created_at > timedelta(minutes=10):
                return Response({
                    "success": False,
                    "message": "Verification code has expired. Please request a new one."
                }, status=status.HTTP_400_BAD_REQUEST)
                
            # Reset password
            user.set_password(new_password)
            user.otp = None
            user.otp_created_at = None
            user.save()
            
            return Response({
                "success": True,
                "message": "Your password has been reset successfully."
            }, status=status.HTTP_200_OK)
            
        return Response({
            "success": False,
            "message": "Password reset failed.",
            "errors": serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)

class UserProfileView(RetrieveUpdateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = UserProfileSerializer

    def get_object(self):
        return self.request.user

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        return Response({
            "success": True,
            "data": serializer.data
        }, status=status.HTTP_200_OK)

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        if serializer.is_valid():
            self.perform_update(serializer)
            return Response({
                "success": True,
                "message": "Profile updated successfully.",
                "data": serializer.data
            }, status=status.HTTP_200_OK)
            
        return Response({
            "success": False,
            "message": "Profile update failed.",
            "errors": serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)

class RequestLoginOTPView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        email = request.data.get('email')
        if not email:
            return Response({
                "success": False,
                "message": "Email is required."
            }, status=status.HTTP_400_BAD_REQUEST)

        # Get or create user
        user, created = CustomUser.objects.get_or_create(
            email=email,
            defaults={
                "username": email,
                "full_name": email.split("@")[0].replace(".", " ").title(),
                "is_verified": True
            }
        )

        # Generate OTP
        otp = str(random.randint(100000, 999999))
        user.otp = otp
        user.otp_created_at = timezone.now()
        user.save()

        # Send SMTP email
        send_otp_email(email, otp)

        return Response({
            "success": True,
            "message": "OTP verification code has been sent to your email."
        }, status=status.HTTP_200_OK)

class VerifyLoginOTPView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        email = request.data.get('email')
        otp = request.data.get('otp')

        if not email or not otp:
            return Response({
                "success": False,
                "message": "Email and OTP are required."
            }, status=status.HTTP_400_BAD_REQUEST)

        try:
            user = CustomUser.objects.get(email=email, otp=otp)
        except CustomUser.DoesNotExist:
            return Response({
                "success": False,
                "message": "Invalid OTP code or email."
            }, status=status.HTTP_400_BAD_REQUEST)

        # Check expiry (10 minutes)
        now = timezone.now()
        if not user.otp_created_at or now - user.otp_created_at > timedelta(minutes=10):
            return Response({
                "success": False,
                "message": "OTP has expired. Please request a new one."
            }, status=status.HTTP_400_BAD_REQUEST)

        # Clear OTP
        user.otp = None
        user.otp_created_at = None
        user.is_verified = True
        user.save()

        tokens = get_tokens_for_user(user)
        user_data = UserProfileSerializer(user, context={"request": request}).data

        return Response({
            "success": True,
            "message": "Login successful.",
            "token": tokens['access'],
            "refresh": tokens['refresh'],
            "user": user_data
        }, status=status.HTTP_200_OK)