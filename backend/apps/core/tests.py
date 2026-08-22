import io
from django.test import override_settings
from rest_framework.test import APITestCase
from rest_framework import status
from django.contrib.auth.hashers import make_password
from datetime import datetime
from bson import ObjectId

from config.db import get_db
from apps.authentication.services import generate_jwt_token

@override_settings(MONGO_DB_NAME='test_skillora_ai')
class CoreAPITests(APITestCase):

    def setUp(self):
        self.db = get_db()
        # Clean up database collections
        self.db.users.delete_many({})
        self.db.resumes.delete_many({})
        self.db.resume_analyses.delete_many({})
        self.db.matcher_history.delete_many({})
        self.db.roadmaps.delete_many({})
        self.db.job_recommendations.delete_many({})
        self.db.career_insights.delete_many({})

        # 1. Create a primary user (verified)
        self.user_doc = {
            "name": "Meera Core",
            "email": "meera.core@example.com",
            "password": make_password("securepassword123"),
            "is_verified": True,
            "skills": [{"name": "Python"}, {"name": "React"}, {"name": "JavaScript"}],
            "role": "Full Stack Engineer",
            "created_at": datetime.utcnow()
        }
        res = self.db.users.insert_one(self.user_doc)
        self.user_id = str(res.inserted_id)
        self.token = generate_jwt_token("meera.core@example.com", self.user_id)

        # 2. Create another user (verified) to test cross-user security boundaries
        self.other_user_doc = {
            "name": "Unauthorized User",
            "email": "other.user@example.com",
            "password": make_password("otherpassword123"),
            "is_verified": True,
            "created_at": datetime.utcnow()
        }
        res_other = self.db.users.insert_one(self.other_user_doc)
        self.other_user_id = str(res_other.inserted_id)
        self.other_token = generate_jwt_token("other.user@example.com", self.other_user_id)

    def tearDown(self):
        self.db.users.delete_many({})
        self.db.resumes.delete_many({})
        self.db.resume_analyses.delete_many({})
        self.db.matcher_history.delete_many({})
        self.db.roadmaps.delete_many({})
        self.db.job_recommendations.delete_many({})
        self.db.career_insights.delete_many({})

    # 1. Resume upload
    def test_resume_upload_success(self):
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {self.token}')
        # Prepare a mock PDF file
        resume_file = io.BytesIO(b"Dummy PDF content.")
        resume_file.name = "meera_resume.pdf"
        
        response = self.client.post('/api/resume/upload', {'file': resume_file}, format='multipart')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertIn("resume", response.data)
        self.assertIn("id", response.data["resume"])
        self.assertEqual(response.data["resume"]["filename"], "meera_resume.pdf")

        # Verify active resume set in user document
        user_in_db = self.db.users.find_one({"_id": ObjectId(self.user_id)})
        self.assertEqual(user_in_db["resume"]["filename"], "meera_resume.pdf")

    def test_resume_upload_invalid_type(self):
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {self.token}')
        resume_file = io.BytesIO(b"Dummy EXE content.")
        resume_file.name = "malware.exe"
        
        response = self.client.post('/api/resume/upload', {'file': resume_file}, format='multipart')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("file", response.data)

    # 2. Resume listing and deletion
    def test_resume_listing_and_deletion(self):
        # Create a resume record directly
        resume_doc = {
            "user_id": ObjectId(self.user_id),
            "filename": "history_resume.pdf",
            "atsScore": 88,
            "uploadDate": "12 August 2026",
            "created_at": datetime.utcnow()
        }
        self.db.resumes.insert_one(resume_doc)
        resume_id = str(resume_doc["_id"])

        # Fetch listing
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {self.token}')
        response = self.client.get('/api/resume')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]["filename"], "history_resume.pdf")

        # Attempt to delete with other user (should fail)
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {self.other_token}')
        del_fail_response = self.client.delete(f'/api/resume/{resume_id}')
        self.assertEqual(del_fail_response.status_code, status.HTTP_403_FORBIDDEN)

        # Attempt to delete with correct user (should succeed)
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {self.token}')
        del_success_response = self.client.delete(f'/api/resume/{resume_id}')
        self.assertEqual(del_success_response.status_code, status.HTTP_200_OK)
        
        # Verify deletion in DB
        self.assertEqual(self.db.resumes.count_documents({"_id": ObjectId(resume_id)}), 0)

    # 3. Resume analysis
    def test_resume_analysis_flow(self):
        resume_doc = {
            "user_id": ObjectId(self.user_id),
            "filename": "analyzeme.pdf",
            "atsScore": 90,
            "uploadDate": "18 August 2026",
            "created_at": datetime.utcnow()
        }
        self.db.resumes.insert_one(resume_doc)
        resume_id = str(resume_doc["_id"])

        # Attempt GET analysis with unauthorized user
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {self.other_token}')
        response_unauth = self.client.get(f'/api/analysis/{resume_id}')
        self.assertEqual(response_unauth.status_code, status.HTTP_403_FORBIDDEN)

        # Retrieve analysis with authorized user
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {self.token}')
        response_auth = self.client.get(f'/api/analysis/{resume_id}')
        self.assertEqual(response_auth.status_code, status.HTTP_200_OK)
        self.assertEqual(response_auth.data["atsScore"], 90)
        self.assertIn("skills", response_auth.data)

        # Trigger re-analysis
        re_response = self.client.post(f'/api/analysis/{resume_id}')
        self.assertEqual(re_response.status_code, status.HTTP_200_OK)

    # 4. Skill Matcher
    def test_skill_matcher_flow(self):
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {self.token}')
        payload = {
            "job_description": "Wanted a Python developer who knows React, Docker and AWS Cloud environments.",
            "job_title": "Software Engineer"
        }
        response = self.client.post('/api/skills/match', payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertIn("matchScore", response.data)
        self.assertIn("Python", response.data["matchedSkills"])
        self.assertIn("Docker", response.data["missingSkills"])

        # Fetch match history
        history_response = self.client.get('/api/skills/match')
        self.assertEqual(history_response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(history_response.data), 1)
        self.assertEqual(history_response.data[0]["jobTitle"], "Software Engineer")

    # 5. Learning Roadmap
    def test_roadmap_flow(self):
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {self.token}')
        # GET should initialize a default roadmap
        response_get = self.client.get('/api/roadmap')
        self.assertEqual(response_get.status_code, status.HTTP_200_OK)
        self.assertEqual(response_get.data["progress"], 35)

        # Update progress and steps
        roadmap_id = response_get.data["id"]
        updated_steps = response_get.data["steps"]
        updated_steps[0]["status"] = "completed"
        
        update_payload = {
            "progress": 50,
            "steps": updated_steps
        }
        response_put = self.client.put('/api/roadmap', update_payload, format='json')
        self.assertEqual(response_put.status_code, status.HTTP_200_OK)
        self.assertEqual(response_put.data["progress"], 50)

    # 6. Job Recommendations
    def test_job_recommendations(self):
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {self.token}')
        response = self.client.get('/api/jobs/recommended')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue(len(response.data) > 0)
        self.assertEqual(response.data[0]["title"], "Junior Python Developer")

    # 7. Career Insights
    def test_career_insights(self):
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {self.token}')
        response = self.client.get('/api/career-insights')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["readinessScore"], 80) # Default since user has no active resume in setUp
        self.assertIn("salaryPrediction", response.data)

    # 8. Unauthenticated Access Protection
    def test_unauthenticated_access_to_all_endpoints(self):
        self.client.credentials()  # Clear all tokens/credentials
        
        endpoints = [
            ('/api/resume', 'GET'),
            ('/api/resume/upload', 'POST'),
            ('/api/resume/dummy-id', 'DELETE'),
            ('/api/analysis/dummy-id', 'GET'),
            ('/api/analysis/dummy-id', 'POST'),
            ('/api/skills/match', 'GET'),
            ('/api/skills/match', 'POST'),
            ('/api/roadmap', 'GET'),
            ('/api/roadmap', 'PUT'),
            ('/api/jobs/recommended', 'GET'),
            ('/api/career-insights', 'GET')
        ]
        
        for url, method in endpoints:
            if method == 'GET':
                response = self.client.get(url)
            elif method == 'POST':
                response = self.client.post(url, {})
            elif method == 'PUT':
                response = self.client.put(url, {})
            elif method == 'DELETE':
                response = self.client.delete(url)
                
            self.assertEqual(
                response.status_code, 
                status.HTTP_401_UNAUTHORIZED, 
                f"Endpoint {url} did not enforce authentication!"
            )

    # 9. User-scoped Data Isolation
    def test_user_data_isolation(self):
        # Create user A data
        self.db.matcher_history.insert_one({
            "user_id": ObjectId(self.user_id),
            "job_title": "Python Architect",
            "job_description": "Wanted python architect",
            "match_score": 95,
            "created_at": datetime.utcnow()
        })
        
        # Verify user B gets an empty match history
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {self.other_token}')
        response = self.client.get('/api/skills/match')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 0)
        
        # Verify user A sees their match history entry
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {self.token}')
        response_a = self.client.get('/api/skills/match')
        self.assertEqual(response_a.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response_a.data), 1)
        self.assertEqual(response_a.data[0]["jobTitle"], "Python Architect")

    # 10. Additional validation error and edge cases
    def test_additional_error_cases_and_permissions(self):
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {self.token}')

        # Malformed Resume ID formats
        resp = self.client.get('/api/analysis/invalid-id-format')
        self.assertEqual(resp.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("error", resp.data)

        resp = self.client.post('/api/analysis/invalid-id-format')
        self.assertEqual(resp.status_code, status.HTTP_400_BAD_REQUEST)

        resp = self.client.delete('/api/resume/invalid-id-format')
        self.assertEqual(resp.status_code, status.HTTP_400_BAD_REQUEST)

        # Non-existent Resume IDs (valid hex but not in database)
        non_existent_id = str(ObjectId())
        resp = self.client.get(f'/api/analysis/{non_existent_id}')
        self.assertEqual(resp.status_code, status.HTTP_404_NOT_FOUND)

        resp = self.client.post(f'/api/analysis/{non_existent_id}')
        self.assertEqual(resp.status_code, status.HTTP_404_NOT_FOUND)

        resp = self.client.delete(f'/api/resume/{non_existent_id}')
        self.assertEqual(resp.status_code, status.HTTP_404_NOT_FOUND)

        # Skill match serializer validation error (too short description)
        resp = self.client.post('/api/skills/match', {"job_description": "Short", "job_title": "SWE"})
        self.assertEqual(resp.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("job_description", resp.data)

        # Roadmap update validation errors (out of range progress)
        resp = self.client.put('/api/roadmap', {"progress": 150})
        self.assertEqual(resp.status_code, status.HTTP_400_BAD_REQUEST)

        resp = self.client.put('/api/roadmap', {"progress": -5})
        self.assertEqual(resp.status_code, status.HTTP_400_BAD_REQUEST)

    # 11. Active Resume Clearing on Deletion
    def test_active_resume_cleared_on_deletion(self):
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {self.token}')

        # 1. Upload a resume
        import io
        resume_file = io.BytesIO(b"Resume content")
        resume_file.name = "my_active_resume.pdf"
        upload_resp = self.client.post('/api/resume/upload', {'file': resume_file}, format='multipart')
        self.assertEqual(upload_resp.status_code, status.HTTP_201_CREATED)
        resume_id = upload_resp.data["resume"]["id"]

        # Confirm it is marked active in the database
        user_doc = self.db.users.find_one({"_id": ObjectId(self.user_id)})
        self.assertEqual(user_doc["resume"]["id"], resume_id)

        # 2. Delete it
        del_resp = self.client.delete(f'/api/resume/{resume_id}')
        self.assertEqual(del_resp.status_code, status.HTTP_200_OK)

        # Confirm the user profile's active resume reference has been cleared
        user_doc_after = self.db.users.find_one({"_id": ObjectId(self.user_id)})
        self.assertEqual(user_doc_after["resume"], {})

class AdminAPITests(APITestCase):
    def setUp(self):
        self.db = get_db()
        self.db.users.delete_many({})
        self.db.skills.delete_many({})
        
        # Admin User
        admin_doc = {
            "name": "Meera Admin",
            "email": "meera.ldrp.7@gmail.com",
            "password": make_password("admin123"),
            "role": "admin",
            "is_verified": True,
            "created_at": datetime.utcnow()
        }
        res_admin = self.db.users.insert_one(admin_doc)
        self.admin_id = str(res_admin.inserted_id)
        self.admin_token = generate_jwt_token("meera.ldrp.7@gmail.com", self.admin_id)

        # Normal User
        norm_doc = {
            "name": "Normal User",
            "email": "normal@example.com",
            "password": make_password("normal123"),
            "role": "Student",
            "is_verified": True,
            "created_at": datetime.utcnow()
        }
        res_norm = self.db.users.insert_one(norm_doc)
        self.norm_id = str(res_norm.inserted_id)
        self.norm_token = generate_jwt_token("normal@example.com", self.norm_id)

    def test_admin_access_allowed(self):
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {self.admin_token}')
        response = self.client.get('/api/admin/stats')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        
    def test_normal_user_denied(self):
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {self.norm_token}')
        response = self.client.get('/api/admin/stats')
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
        
    def test_unauthorized_denied(self):
        response = self.client.get('/api/admin/stats')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

