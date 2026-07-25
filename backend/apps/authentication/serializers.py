from rest_framework import serializers
from config.db import get_db
import re

class UserRegistrationSerializer(serializers.Serializer):
    name = serializers.CharField(max_length=100, required=True)
    email = serializers.EmailField(required=True)
    password = serializers.CharField(min_length=8, write_only=True, required=True)
    confirm_password = serializers.CharField(write_only=True, required=True)

    def validate_email(self, value):
        email = value.lower().strip()
        # Basic regex check for format validation
        email_regex = r'^[\w\.-]+@[\w\.-]+\.\w+$'
        if not re.match(email_regex, email):
            raise serializers.ValidationError("Enter a valid email address.")

        db = get_db()
        # Query MongoDB users collection to enforce uniqueness
        existing_user = db.users.find_one({'email': email})
        if existing_user:
            if existing_user.get('is_verified', False):
                raise serializers.ValidationError("A user with this email address already exists.")
            else:
                # Delete unverified user doc so they can start fresh
                db.users.delete_one({'email': email})
        return email

    def validate(self, data):
        if data['password'] != data['confirm_password']:
            raise serializers.ValidationError({"confirm_password": "Passwords do not match."})
        return data

class VerifyOtpSerializer(serializers.Serializer):
    email = serializers.EmailField(required=True)
    otp_code = serializers.CharField(max_length=6, min_length=6, required=True)
    otp_type = serializers.ChoiceField(
        choices=['registration', 'forgot_password', 'google_mfa', 'github_mfa'],
        default='registration'
    )

    def validate_email(self, value):
        return value.lower().strip()

class UserLoginSerializer(serializers.Serializer):
    email = serializers.EmailField(required=True)
    password = serializers.CharField(write_only=True, required=True)

    def validate_email(self, value):
        return value.lower().strip()

class ForgotPasswordSerializer(serializers.Serializer):
    email = serializers.EmailField(required=True)

    def validate_email(self, value):
        email = value.lower().strip()
        db = get_db()
        existing_user = db.users.find_one({'email': email})
        if not existing_user:
            raise serializers.ValidationError("No account exists with this email address.")
        return email

class ResetPasswordSerializer(serializers.Serializer):
    reset_token = serializers.CharField(required=True)
    password = serializers.CharField(min_length=8, write_only=True, required=True)
    confirm_password = serializers.CharField(write_only=True, required=True)

    def validate(self, data):
        if data['password'] != data['confirm_password']:
            raise serializers.ValidationError({"confirm_password": "Passwords do not match."})
        return data

class SocialAuthSerializer(serializers.Serializer):
    # This serializer parses credentials received from OAuth flow
    # or secondary verification requests (including phone number/otp)
    email = serializers.EmailField(required=True)
    name = serializers.CharField(max_length=100, required=False)
    social_id = serializers.CharField(required=True)
    social_provider = serializers.ChoiceField(choices=['google', 'github'], required=True)
    
    # Secondary verification parameters (optional)
    phone_number = serializers.CharField(max_length=15, required=False)
    otp_code = serializers.CharField(max_length=6, min_length=6, required=False)

    def validate_email(self, value):
        return value.lower().strip()
