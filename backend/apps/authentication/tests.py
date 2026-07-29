from django.test import override_settings
from rest_framework.test import APITestCase
from rest_framework import status
from django.conf import settings
from django.contrib.auth.hashers import make_password, check_password
from datetime import datetime, timedelta

from config.db import get_db, _mongo_client
from apps.authentication.otp_utils import create_otp

@override_settings(MONGO_DB_NAME='test_skillora_ai', EMAIL_BACKEND='django.core.mail.backends.locmem.EmailBackend')
class AuthenticationAPITests(APITestCase):
    
    def setUp(self):
        # Retrieve db handle for tests
        self.db = get_db()
        # Ensure collections are clean before each test
        self.db.users.delete_many({})
        self.db.otps.delete_many({})

    def tearDown(self):
        # Clean up database after each test
        self.db.users.delete_many({})
        self.db.otps.delete_many({})

    def test_user_registration_success(self):
        payload = {
            "name": "Meera",
            "email": "meera.test@example.com",
            "password": "securepassword123",
            "confirm_password": "securepassword123"
        }
        
        response = self.client.post('/api/auth/register/', payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertIn("message", response.data)
        
        # Verify user in database
        user = self.db.users.find_one({"email": "meera.test@example.com"})
        self.assertIsNotNone(user)
        self.assertEqual(user["name"], "Meera")
        self.assertFalse(user["is_verified"])
        self.assertTrue(check_password("securepassword123", user["password"]))
        
        # Verify OTP generated
        otp = self.db.otps.find_one({"email": "meera.test@example.com", "otp_type": "registration"})
        self.assertIsNotNone(otp)
        self.assertEqual(len(otp["otp_code"]), 6)

    def test_user_registration_password_mismatch(self):
        payload = {
            "name": "Meera",
            "email": "meera.test@example.com",
            "password": "securepassword123",
            "confirm_password": "differentpassword"
        }
        
        response = self.client.post('/api/auth/register/', payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("confirm_password", response.data)

    def test_verify_otp_success(self):
        # Create unverified user
        user_doc = {
            "name": "Meera",
            "email": "verify.test@example.com",
            "password": make_password("securepassword123"),
            "is_verified": False,
            "created_at": datetime.utcnow()
        }
        self.db.users.insert_one(user_doc)
        
        # Create OTP
        otp_code = create_otp("verify.test@example.com", "registration")
        
        payload = {
            "email": "verify.test@example.com",
            "otp_code": otp_code,
            "otp_type": "registration"
        }
        
        response = self.client.post('/api/auth/verify-otp/', payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn("token", response.data)
        self.assertEqual(response.data["user"]["email"], "verify.test@example.com")
        
        # Check user verification status in DB
        updated_user = self.db.users.find_one({"email": "verify.test@example.com"})
        self.assertTrue(updated_user["is_verified"])
        
        # Check OTP marked as used
        otp = self.db.otps.find_one({"email": "verify.test@example.com", "otp_code": otp_code})
        self.assertTrue(otp["is_used"])

    def test_login_success(self):
        # Create verified user
        user_doc = {
            "name": "Meera",
            "email": "login.test@example.com",
            "password": make_password("securepassword123"),
            "is_verified": True,
            "created_at": datetime.utcnow()
        }
        self.db.users.insert_one(user_doc)
        
        payload = {
            "email": "login.test@example.com",
            "password": "securepassword123"
        }
        
        response = self.client.post('/api/auth/login/', payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn("token", response.data)
        self.assertEqual(response.data["user"]["name"], "Meera")

    def test_login_unverified_accounts(self):
        # Create unverified user
        user_doc = {
            "name": "Meera",
            "email": "unverified.test@example.com",
            "password": make_password("securepassword123"),
            "is_verified": False,
            "created_at": datetime.utcnow()
        }
        self.db.users.insert_one(user_doc)
        
        payload = {
            "email": "unverified.test@example.com",
            "password": "securepassword123"
        }
        
        response = self.client.post('/api/auth/login/', payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
        self.assertEqual(response.data["is_verified"], False)
        
        # Ensure a new OTP was sent
        otp = self.db.otps.find_one({"email": "unverified.test@example.com", "otp_type": "registration"})
        self.assertIsNotNone(otp)

    def test_forgot_and_reset_password_flow(self):
        # Create verified user
        user_doc = {
            "name": "Meera",
            "email": "reset.test@example.com",
            "password": make_password("oldpassword123"),
            "is_verified": True,
            "created_at": datetime.utcnow()
        }
        self.db.users.insert_one(user_doc)
        
        # Step 1: Request password reset OTP
        forgot_payload = {"email": "reset.test@example.com"}
        forgot_response = self.client.post('/api/auth/forgot-password/', forgot_payload, format='json')
        self.assertEqual(forgot_response.status_code, status.HTTP_200_OK)
        
        # Step 2: Grab the OTP code from test database
        otp_doc = self.db.otps.find_one({"email": "reset.test@example.com", "otp_type": "forgot_password"})
        self.assertIsNotNone(otp_doc)
        otp_code = otp_doc["otp_code"]
        
        # Step 3: Verify the OTP and receive short-lived reset token
        verify_payload = {
            "email": "reset.test@example.com",
            "otp_code": otp_code
        }
        verify_response = self.client.post('/api/auth/verify-reset-otp/', verify_payload, format='json')
        self.assertEqual(verify_response.status_code, status.HTTP_200_OK)
        self.assertIn("reset_token", verify_response.data)
        reset_token = verify_response.data["reset_token"]
        
        # Step 4: Reset password using token
        reset_payload = {
            "reset_token": reset_token,
            "password": "newsecurepassword123",
            "confirm_password": "newsecurepassword123"
        }
        reset_response = self.client.post('/api/auth/reset-password/', reset_payload, format='json')
        self.assertEqual(reset_response.status_code, status.HTTP_200_OK)
        
        # Step 5: Verify password was updated in MongoDB
        updated_user = self.db.users.find_one({"email": "reset.test@example.com"})
        self.assertTrue(check_password("newsecurepassword123", updated_user["password"]))
        self.assertFalse(check_password("oldpassword123", updated_user["password"]))

    def test_delete_account_success(self):
        from apps.authentication.services import generate_jwt_token
        # 1. Create a verified user
        user_doc = {
            "name": "Delete Me",
            "email": "delete.test@example.com",
            "password": make_password("mypassword123"),
            "is_verified": True,
            "created_at": datetime.utcnow()
        }
        res = self.db.users.insert_one(user_doc)
        user_id = str(res.inserted_id)

        # Create dummy records in other collections
        self.db.resumes.insert_one({"email": "delete.test@example.com", "filename": "resume.pdf"})
        self.db.analyses.insert_one({"user_id": user_id, "score": 85})

        # 2. Generate JWT token
        token = generate_jwt_token("delete.test@example.com", user_id)

        # 3. Request account deletion
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {token}')
        response = self.client.delete('/api/auth/delete-account/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        # 4. Verify user and other collections are cleared
        self.assertIsNone(self.db.users.find_one({"email": "delete.test@example.com"}))
        self.assertEqual(self.db.resumes.count_documents({"email": "delete.test@example.com"}), 0)
        self.assertEqual(self.db.analyses.count_documents({"user_id": user_id}), 0)

        # 5. Verify same email can register again
        self.client.credentials()  # Clear auth header so the registration request is unauthenticated
        register_payload = {
            "name": "Delete Me Again",
            "email": "delete.test@example.com",
            "password": "newsecurepassword123",
            "confirm_password": "newsecurepassword123"
        }
        reg_response = self.client.post('/api/auth/register/', register_payload, format='json')
        self.assertEqual(reg_response.status_code, status.HTTP_201_CREATED)

    def test_report_bug_success(self):
        from apps.authentication.services import generate_jwt_token
        from django.core import mail
        # 1. Create a verified user
        user_doc = {
            "name": "Reporter",
            "email": "bug.reporter@example.com",
            "password": make_password("mypassword123"),
            "is_verified": True,
            "created_at": datetime.utcnow()
        }
        res = self.db.users.insert_one(user_doc)
        user_id = str(res.inserted_id)

        # 2. Generate JWT token
        token = generate_jwt_token("bug.reporter@example.com", user_id)

        # 3. Post bug report
        bug_payload = {
            "subject": "UI button misaligned",
            "description": "The profile save button overlaps the input field on mobile screens."
        }
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {token}')
        response = self.client.post('/api/auth/report-bug/', bug_payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        # 4. Verify email was sent
        self.assertEqual(len(mail.outbox), 1)
        sent_email = mail.outbox[0]
        self.assertEqual(sent_email.to, ["meera.ldrp.7@gmail.com"])
        self.assertIn("UI button misaligned", sent_email.subject)
        self.assertIn("bug.reporter@example.com", sent_email.body)
        self.assertIn("overlaps the input field", sent_email.body)
