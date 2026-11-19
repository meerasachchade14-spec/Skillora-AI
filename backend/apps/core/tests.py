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


# =============================================================
# Job Role Taxonomy Unit Tests
# =============================================================
#
# These tests are purely in-memory; no database or HTTP client
# is required. They validate the taxonomy data and every public
# API function in apps/core/ai/job_role_taxonomy.py.
# =============================================================

from django.test import TestCase

from apps.core.ai.job_role_taxonomy import (
    JOB_ROLE_TAXONOMY,
    ROLES_BY_DOMAIN,
    ROLES_BY_EXPERIENCE,
    DOMAIN_SOFTWARE_DEVELOPMENT,
    DOMAIN_PYTHON,
    DOMAIN_WEB_DEVELOPMENT,
    DOMAIN_DATABASES,
    DOMAIN_AI_ML,
    LEVEL_FRESHER,
    LEVEL_ENTRY,
    LEVEL_JUNIOR,
    get_role,
    list_roles_by_domain,
    list_roles_by_experience,
    get_required_skills,
    get_preferred_skills,
    get_all_role_keys,
    match_roles_for_skills,
)


class JobRoleTaxonomyDataTests(TestCase):
    """Structural integrity tests for JOB_ROLE_TAXONOMY."""

    def test_taxonomy_is_not_empty(self):
        """Taxonomy must define at least one role."""
        self.assertGreater(len(JOB_ROLE_TAXONOMY), 0)

    def test_all_roles_have_required_keys(self):
        """Every role must supply the five mandatory keys."""
        mandatory_keys = {
            "domain",
            "experience_level",
            "description",
            "required_skills",
            "preferred_skills",
        }
        for role_key, role_data in JOB_ROLE_TAXONOMY.items():
            with self.subTest(role=role_key):
                missing = mandatory_keys - set(role_data.keys())
                self.assertFalse(
                    missing,
                    msg=f"Role '{role_key}' is missing keys: {missing}",
                )

    def test_all_roles_have_non_empty_required_skills(self):
        """required_skills must be a non-empty list for every role."""
        for role_key, role_data in JOB_ROLE_TAXONOMY.items():
            with self.subTest(role=role_key):
                req = role_data.get("required_skills", [])
                self.assertIsInstance(req, list)
                self.assertGreater(len(req), 0)

    def test_all_roles_have_non_empty_preferred_skills(self):
        """preferred_skills must be a non-empty list for every role."""
        for role_key, role_data in JOB_ROLE_TAXONOMY.items():
            with self.subTest(role=role_key):
                pref = role_data.get("preferred_skills", [])
                self.assertIsInstance(pref, list)
                self.assertGreater(len(pref), 0)

    def test_all_roles_have_non_empty_description(self):
        """description must be a non-empty string of reasonable length."""
        for role_key, role_data in JOB_ROLE_TAXONOMY.items():
            with self.subTest(role=role_key):
                desc = role_data.get("description", "")
                self.assertIsInstance(desc, str)
                self.assertGreater(len(desc.strip()), 20)

    def test_valid_experience_levels(self):
        """experience_level must be one of the three defined constants."""
        valid_levels = {LEVEL_FRESHER, LEVEL_ENTRY, LEVEL_JUNIOR}
        for role_key, role_data in JOB_ROLE_TAXONOMY.items():
            with self.subTest(role=role_key):
                self.assertIn(role_data["experience_level"], valid_levels)

    def test_valid_domains(self):
        """domain must be one of the five defined domain constants."""
        valid_domains = {
            DOMAIN_SOFTWARE_DEVELOPMENT,
            DOMAIN_PYTHON,
            DOMAIN_WEB_DEVELOPMENT,
            DOMAIN_DATABASES,
            DOMAIN_AI_ML,
        }
        for role_key, role_data in JOB_ROLE_TAXONOMY.items():
            with self.subTest(role=role_key):
                self.assertIn(role_data["domain"], valid_domains)

    def test_no_overlap_between_required_and_preferred(self):
        """A skill must not appear in both required and preferred lists."""
        for role_key, role_data in JOB_ROLE_TAXONOMY.items():
            with self.subTest(role=role_key):
                req  = set(role_data.get("required_skills", []))
                pref = set(role_data.get("preferred_skills", []))
                overlap = req.intersection(pref)
                self.assertFalse(overlap)

    def test_all_five_domains_are_represented(self):
        """Each defined domain must have at least one role."""
        domains_in_taxonomy = {
            data["domain"] for data in JOB_ROLE_TAXONOMY.values()
        }
        for domain in [
            DOMAIN_SOFTWARE_DEVELOPMENT,
            DOMAIN_PYTHON,
            DOMAIN_WEB_DEVELOPMENT,
            DOMAIN_DATABASES,
            DOMAIN_AI_ML,
        ]:
            self.assertIn(domain, domains_in_taxonomy)

    def test_all_three_experience_levels_are_represented(self):
        """Each experience level must have at least one role."""
        levels_in_taxonomy = {
            data["experience_level"] for data in JOB_ROLE_TAXONOMY.values()
        }
        for level in [LEVEL_FRESHER, LEVEL_ENTRY, LEVEL_JUNIOR]:
            self.assertIn(level, levels_in_taxonomy)


class JobRoleTaxonomyIndexTests(TestCase):
    """Tests for pre-computed ROLES_BY_DOMAIN and ROLES_BY_EXPERIENCE."""

    def test_domain_index_covers_all_roles(self):
        """Every role key must appear in ROLES_BY_DOMAIN."""
        all_indexed = {
            key
            for keys in ROLES_BY_DOMAIN.values()
            for key in keys
        }
        for role_key in JOB_ROLE_TAXONOMY:
            self.assertIn(role_key, all_indexed)

    def test_experience_index_covers_all_roles(self):
        """Every role key must appear in ROLES_BY_EXPERIENCE."""
        all_indexed = {
            key
            for keys in ROLES_BY_EXPERIENCE.values()
            for key in keys
        }
        for role_key in JOB_ROLE_TAXONOMY:
            self.assertIn(role_key, all_indexed)


class JobRoleTaxonomyAPITests(TestCase):
    """Tests for public API functions."""

    # ---- get_role --------------------------------------------------

    def test_get_role_returns_correct_entry(self):
        role = get_role("django developer")
        self.assertEqual(role["domain"], DOMAIN_PYTHON)
        self.assertIn("python", role["required_skills"])

    def test_get_role_is_case_insensitive(self):
        self.assertEqual(
            get_role("django developer"),
            get_role("Django Developer"),
        )

    def test_get_role_returns_empty_dict_for_unknown(self):
        self.assertEqual(get_role("senior quantum engineer"), {})

    # ---- list_roles_by_domain -------------------------------------

    def test_list_roles_by_domain_software(self):
        roles = list_roles_by_domain(DOMAIN_SOFTWARE_DEVELOPMENT)
        for expected in [
            "junior software developer",
            "software developer intern",
            "junior backend developer",
            "junior frontend developer",
            "junior full stack developer",
        ]:
            self.assertIn(expected, roles)

    def test_list_roles_by_domain_python(self):
        roles = list_roles_by_domain(DOMAIN_PYTHON)
        for expected in [
            "django developer",
            "flask developer",
            "junior python developer",
            "python developer intern",
        ]:
            self.assertIn(expected, roles)

    def test_list_roles_by_domain_web(self):
        roles = list_roles_by_domain(DOMAIN_WEB_DEVELOPMENT)
        for expected in [
            "junior react developer",
            "junior node.js developer",
            "frontend developer intern",
            "web developer intern",
        ]:
            self.assertIn(expected, roles)

    def test_list_roles_by_domain_databases(self):
        roles = list_roles_by_domain(DOMAIN_DATABASES)
        for expected in [
            "junior database administrator",
            "junior data engineer",
            "sql developer intern",
        ]:
            self.assertIn(expected, roles)

    def test_list_roles_by_domain_ai_ml(self):
        roles = list_roles_by_domain(DOMAIN_AI_ML)
        for expected in [
            "junior machine learning engineer",
            "junior data scientist",
            "ai/ml intern",
            "nlp engineer intern",
            "junior ai researcher",
        ]:
            self.assertIn(expected, roles)

    def test_list_roles_by_domain_returns_sorted(self):
        roles = list_roles_by_domain(DOMAIN_PYTHON)
        self.assertEqual(roles, sorted(roles))

    def test_list_roles_by_domain_unknown_returns_empty(self):
        self.assertEqual(list_roles_by_domain("Quantum Computing"), [])

    # ---- list_roles_by_experience ---------------------------------

    def test_list_roles_by_experience_fresher(self):
        roles = list_roles_by_experience(LEVEL_FRESHER)
        for expected in [
            "software developer intern",
            "python developer intern",
            "frontend developer intern",
            "web developer intern",
            "sql developer intern",
            "ai/ml intern",
            "nlp engineer intern",
        ]:
            self.assertIn(expected, roles)

    def test_list_roles_by_experience_entry(self):
        roles = list_roles_by_experience(LEVEL_ENTRY)
        for expected in [
            "django developer",
            "flask developer",
            "junior data engineer",
            "junior ai researcher",
        ]:
            self.assertIn(expected, roles)

    def test_list_roles_by_experience_junior(self):
        roles = list_roles_by_experience(LEVEL_JUNIOR)
        for expected in [
            "junior software developer",
            "junior backend developer",
            "junior frontend developer",
            "junior full stack developer",
            "junior python developer",
            "junior react developer",
            "junior node.js developer",
            "junior database administrator",
            "junior machine learning engineer",
            "junior data scientist",
        ]:
            self.assertIn(expected, roles)

    def test_list_roles_by_experience_returns_sorted(self):
        roles = list_roles_by_experience(LEVEL_JUNIOR)
        self.assertEqual(roles, sorted(roles))

    def test_list_roles_by_experience_unknown_returns_empty(self):
        self.assertEqual(list_roles_by_experience("senior"), [])

    # ---- get_required_skills / get_preferred_skills ---------------

    def test_get_required_skills_django_developer(self):
        skills = get_required_skills("django developer")
        for expected in ["python", "django", "sql"]:
            self.assertIn(expected, skills)

    def test_get_preferred_skills_django_developer(self):
        skills = get_preferred_skills("django developer")
        for expected in ["django rest framework", "postgresql"]:
            self.assertIn(expected, skills)

    def test_get_required_skills_unknown_role_returns_empty(self):
        self.assertEqual(get_required_skills("unknown role"), [])

    def test_get_preferred_skills_unknown_role_returns_empty(self):
        self.assertEqual(get_preferred_skills("unknown role"), [])

    # ---- get_all_role_keys ----------------------------------------

    def test_get_all_role_keys_returns_all_roles(self):
        keys = get_all_role_keys()
        self.assertEqual(len(keys), len(JOB_ROLE_TAXONOMY))

    def test_get_all_role_keys_is_sorted(self):
        keys = get_all_role_keys()
        self.assertEqual(keys, sorted(keys))

    # ---- match_roles_for_skills -----------------------------------

    def test_match_roles_perfect_match_for_django_developer(self):
        """Providing all required skills for 'django developer' yields 100 %."""
        required = get_required_skills("django developer")
        results  = match_roles_for_skills(required)
        django_result = next(
            (r for r in results if r["role"] == "django developer"), None
        )
        self.assertIsNotNone(django_result)
        self.assertEqual(django_result["required_match_pct"], 100.0)
        self.assertEqual(django_result["missing_required"], [])

    def test_match_roles_zero_skills_all_zero(self):
        """An empty skill list must score 0 for every role."""
        for r in match_roles_for_skills([]):
            self.assertEqual(r["required_match_pct"], 0.0)

    def test_match_roles_result_sorted_descending(self):
        """Results must be sorted by required_match_pct descending."""
        results = match_roles_for_skills(["python", "sql", "git", "react", "html", "css"])
        pcts = [r["required_match_pct"] for r in results]
        self.assertEqual(pcts, sorted(pcts, reverse=True))

    def test_match_roles_bonus_matches_detected(self):
        """Preferred skills supplied by the candidate appear in bonus_matches."""
        preferred = get_preferred_skills("flask developer")
        results   = match_roles_for_skills(preferred)
        flask_res = next(
            (r for r in results if r["role"] == "flask developer"), None
        )
        self.assertIsNotNone(flask_res)
        self.assertGreater(len(flask_res["bonus_matches"]), 0)

    def test_match_roles_result_contains_all_roles(self):
        """match_roles_for_skills must return a result for every role."""
        result_keys = {r["role"] for r in match_roles_for_skills(["python"])}
        self.assertEqual(result_keys, set(JOB_ROLE_TAXONOMY.keys()))

    def test_match_roles_result_structure(self):
        """Each result dict must contain the expected keys."""
        expected_keys = {
            "role", "domain", "experience_level", "description",
            "required_match_pct", "matched_required", "missing_required",
            "bonus_matches",
        }
        for r in match_roles_for_skills(["python", "git"]):
            self.assertEqual(set(r.keys()), expected_keys)

    def test_match_roles_case_insensitive_candidate_skills(self):
        """Candidate skills should be matched case-insensitively."""
        required_lower = get_required_skills("junior machine learning engineer")
        required_upper = [s.upper() for s in required_lower]

        def pct_for(results, role):
            return next(
                r["required_match_pct"]
                for r in results if r["role"] == role
            )

        pct_lower = pct_for(
            match_roles_for_skills(required_lower),
            "junior machine learning engineer",
        )
        pct_upper = pct_for(
            match_roles_for_skills(required_upper),
            "junior machine learning engineer",
        )
        self.assertEqual(pct_lower, pct_upper)

    def test_match_ai_ml_intern_perfect_score(self):
        """A candidate with all AI/ML intern required skills scores 100 %."""
        skills = get_required_skills("ai/ml intern")
        results = match_roles_for_skills(skills)
        ai_res  = next(
            (r for r in results if r["role"] == "ai/ml intern"), None
        )
        self.assertIsNotNone(ai_res)
        self.assertEqual(ai_res["required_match_pct"], 100.0)

    def test_match_sql_intern_missing_skills_reported(self):
        """A candidate with no skills has all required skills marked missing."""
        results = match_roles_for_skills([])
        sql_res = next(
            (r for r in results if r["role"] == "sql developer intern"), None
        )
        self.assertIsNotNone(sql_res)
        required = set(get_required_skills("sql developer intern"))
        self.assertEqual(set(sql_res["missing_required"]), required)


# ---------------------------------------------------------------------------
# HR Question Engine Unit Tests
# ---------------------------------------------------------------------------

from apps.core.ai.hr_question_engine import generate_hr_questions

class HRQuestionEngineTests(CoreAPITests):
    """
    Unit tests for generate_hr_questions().
    These tests run the AI engine directly (no HTTP layer) to verify the
    output contract and personalisation logic.
    """

    # ── Sample resume fixtures ──────────────────────────────────────────────

    PERSONAL = {
        "fullName": "Meera Sachchade",
        "summary": "Passionate software engineer interested in full-stack development.",
    }

    PROJECTS = [
        {
            "title": "Skillora AI",
            "technologies": ["React", "Django", "MongoDB"],
            "description": "AI-powered career platform.",
        },
        {
            "title": "Smart Resume Builder",
            "techStack": "Python, NLP",
            "description": "Resume builder with NLP scoring.",
        },
    ]

    EDUCATION = [
        {
            "degree": "Bachelor of Engineering",
            "fieldOfStudy": "Computer Science",
            "college": "VCET Mumbai",
        }
    ]

    EXPERIENCE = [
        {
            "role": "Full Stack Intern",
            "company": "TechCorp Solutions",
        }
    ]

    MATCHED_SKILLS = ["python", "react", "django", "mongodb"]

    # ── Helper ──────────────────────────────────────────────────────────────

    def _generate(self, **overrides):
        defaults = dict(
            role_name="full stack developer",
            personal=self.PERSONAL,
            projects=self.PROJECTS,
            education=self.EDUCATION,
            experience=self.EXPERIENCE,
            matched_skills=self.MATCHED_SKILLS,
            questions_per_category=2,
        )
        defaults.update(overrides)
        return generate_hr_questions(**defaults)

    # ── Output contract ─────────────────────────────────────────────────────

    def test_hr_output_top_level_keys(self):
        """Result must contain role, resume_context, questions, total."""
        result = self._generate()
        self.assertIn("role", result)
        self.assertIn("resume_context", result)
        self.assertIn("questions", result)
        self.assertIn("total", result)

    def test_hr_total_matches_questions_length(self):
        """result['total'] must equal len(result['questions'])."""
        result = self._generate()
        self.assertEqual(result["total"], len(result["questions"]))

    def test_hr_produces_questions(self):
        """At least one question should be generated from a full resume."""
        result = self._generate()
        self.assertGreater(result["total"], 0)

    def test_hr_question_entry_structure(self):
        """Every question dict must have the expected keys."""
        required_keys = {
            "question", "category", "category_emoji",
            "answer_framework", "context_used",
        }
        result = self._generate()
        for q in result["questions"]:
            self.assertEqual(
                set(q.keys()) & required_keys, required_keys,
                msg=f"Question missing required keys: {q}",
            )

    def test_hr_answer_framework_structure(self):
        """answer_framework must have 'name' (str) and 'steps' (non-empty list)."""
        result = self._generate()
        for q in result["questions"]:
            fw = q["answer_framework"]
            self.assertIn("name", fw)
            self.assertIn("steps", fw)
            self.assertIsInstance(fw["name"], str)
            self.assertIsInstance(fw["steps"], list)
            self.assertGreater(len(fw["steps"]), 0, msg=f"Empty steps for: {q['question']}")

    # ── Personalisation ─────────────────────────────────────────────────────

    def test_hr_project_name_appears_in_project_deepdive(self):
        """At least one project deep-dive question must reference a real project title."""
        result = self._generate()
        project_titles = {p["title"].lower() for p in self.PROJECTS}
        project_questions = [
            q for q in result["questions"] if "project" in q["category"].lower()
        ]
        self.assertGreater(len(project_questions), 0, "No project deep-dive questions generated")
        found = any(
            any(title in q["question"].lower() for title in project_titles)
            for q in project_questions
        )
        self.assertTrue(found, "No project deep-dive question contains a real project name")

    def test_hr_role_appears_in_questions(self):
        """The target role name should appear in at least one generated question."""
        result = self._generate(role_name="junior backend developer")
        role_lc = "junior backend developer"
        found = any(role_lc in q["question"].lower() for q in result["questions"])
        self.assertTrue(found, "Target role name not found in any generated question")

    def test_hr_resume_context_populated(self):
        """resume_context should include name, top_project, education, top_skill."""
        result = self._generate()
        ctx = result["resume_context"]
        self.assertIn("name", ctx)
        self.assertIn("top_project", ctx)
        self.assertIn("education", ctx)
        self.assertIn("top_skill", ctx)

    def test_hr_resume_context_name_is_first_name(self):
        """resume_context.name should be the candidate's first name."""
        result = self._generate()
        self.assertEqual(result["resume_context"]["name"], "Meera")

    def test_hr_resume_context_top_project(self):
        """resume_context.top_project should equal the first project title."""
        result = self._generate()
        self.assertEqual(result["resume_context"]["top_project"], "Skillora AI")

    def test_hr_resume_context_education_string(self):
        """resume_context.education should include the degree and field."""
        result = self._generate()
        edu = result["resume_context"]["education"] or ""
        self.assertIn("Bachelor of Engineering", edu)
        self.assertIn("Computer Science", edu)

    # ── Graceful degradation ────────────────────────────────────────────────

    def test_hr_empty_resume_still_generates(self):
        """With no resume data, the engine should still produce HR questions."""
        result = generate_hr_questions(
            role_name="software engineer",
            personal={},
            projects=[],
            education=[],
            experience=[],
            matched_skills=[],
            questions_per_category=1,
        )
        self.assertGreater(result["total"], 0)

    def test_hr_empty_resume_fallback_role(self):
        """With an empty role_name, default role is used in questions."""
        result = generate_hr_questions(
            role_name="",
            personal={},
            projects=[],
            education=[],
            experience=[],
            matched_skills=[],
            questions_per_category=1,
        )
        self.assertEqual(result["role"], "Software Engineer")

    def test_hr_no_duplicate_questions(self):
        """No two questions in the output should have identical text."""
        result = self._generate(questions_per_category=3)
        texts = [q["question"] for q in result["questions"]]
        self.assertEqual(len(texts), len(set(texts)), "Duplicate questions found")

    # ── Category coverage ───────────────────────────────────────────────────

    def test_hr_all_expected_categories_present(self):
        """
        With questions_per_category=2 and a full resume, questions should
        span at least 5 distinct HR categories.
        """
        result = self._generate(questions_per_category=2)
        categories = {q["category"] for q in result["questions"]}
        self.assertGreaterEqual(
            len(categories), 5,
            msg=f"Expected at least 5 categories, got: {categories}",
        )

    def test_hr_self_intro_category_present(self):
        """Self-Introduction category should always appear."""
        result = self._generate()
        categories = {q["category"] for q in result["questions"]}
        self.assertIn("Self-Introduction", categories)

    def test_hr_project_deepdive_category_present(self):
        """Project Deep-Dive category should appear when projects are provided."""
        result = self._generate()
        categories = {q["category"] for q in result["questions"]}
        self.assertIn("Project Deep-Dive", categories)

    # ── questions_per_category scaling ─────────────────────────────────────

    def test_hr_questions_per_category_1_fewer_total(self):
        """questions_per_category=1 should produce fewer questions than =2."""
        r1 = self._generate(questions_per_category=1)
        r2 = self._generate(questions_per_category=2)
        self.assertLess(r1["total"], r2["total"])

    def test_hr_category_emoji_is_string(self):
        """category_emoji must be a non-empty string."""
        result = self._generate()
        for q in result["questions"]:
            self.assertIsInstance(q["category_emoji"], str)
            self.assertGreater(len(q["category_emoji"]), 0)
