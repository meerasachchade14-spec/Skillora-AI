import jwt
from datetime import datetime, timedelta
from django.conf import settings
from rest_framework.authentication import BaseAuthentication
from rest_framework.exceptions import AuthenticationFailed
from bson import ObjectId

from config.db import get_db
from apps.authentication.models import MongoUser

def generate_jwt_token(email, user_id):
    """
    Generates a login JWT token containing the user's ID and email,
    expiring in 24 hours.
    """
    payload = {
        'user_id': str(user_id),
        'email': email,
        'exp': datetime.utcnow() + timedelta(days=1),
        'iat': datetime.utcnow()
    }
    return jwt.encode(payload, settings.SECRET_KEY, algorithm='HS256')

def generate_password_reset_token(email):
    """
    Generates a short-lived (15 minutes) temporary JWT token specifically
    intended to authenticate the reset-password API invocation.
    """
    payload = {
        'email': email,
        'purpose': 'password_reset',
        'exp': datetime.utcnow() + timedelta(minutes=15),
        'iat': datetime.utcnow()
    }
    return jwt.encode(payload, settings.SECRET_KEY, algorithm='HS256')

def decode_password_reset_token(token):
    """
    Decodes the reset token and returns the email if valid.
    Raises ValueError with descriptive messages if invalid or expired.
    """
    try:
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=['HS256'])
        if payload.get('purpose') != 'password_reset':
            raise ValueError("Invalid token purpose")
        return payload.get('email')
    except jwt.ExpiredSignatureError:
        raise ValueError("The reset token has expired. Please request another OTP.")
    except jwt.InvalidTokenError:
        raise ValueError("Invalid reset token.")

class JWTAuthentication(BaseAuthentication):
    """
    Custom Django REST Framework Authentication class.
    Looks for the 'Authorization: Bearer <token>' header, decodes it,
    validates the user, and registers the MongoUser instance on request.user.
    """
    def authenticate(self, request):
        auth_header = request.headers.get('Authorization')
        if not auth_header:
            return None

        parts = auth_header.split()
        if len(parts) != 2 or parts[0].lower() != 'bearer':
            # Invalid header format, ignore (or raise exception depending on strictness)
            return None

        token = parts[1]
        try:
            # Decode token
            payload = jwt.decode(token, settings.SECRET_KEY, algorithms=['HS256'])
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed('Authentication token has expired.')
        except jwt.InvalidTokenError:
            raise AuthenticationFailed('Invalid authentication token.')

        user_id = payload.get('user_id')
        email = payload.get('email')

        if not user_id:
            raise AuthenticationFailed('Invalid token payload.')

        # Fetch user details from MongoDB
        db = get_db()
        try:
            user_data = db.users.find_one({'_id': ObjectId(user_id)})
        except Exception:
            raise AuthenticationFailed('Database error during authentication.')

        if not user_data:
            raise AuthenticationFailed('User not found.')

        # Check verification status
        if not user_data.get('is_verified', False):
            raise AuthenticationFailed('Account is not verified. Please verify your OTP.')

        # Return (User, Auth) tuple
        return (MongoUser(user_data), token)

    def authenticate_header(self, request):
        return 'Bearer'
