import io
import json
from django.test import override_settings
from rest_framework.test import APITestCase
from rest_framework import status
from django.contrib.auth.hashers import make_password
from datetime import datetime
from bson import ObjectId

from config.db import get_db
from apps.authentication.services import generate_jwt_token

@override_settings(MONGO_DB_NAME='test_skillora_ai_lifecycle')
class ResumeLifecycleTests(APITestCase):
    def setUp(self):
        self.db = get_db()
        self.db.users.delete_many({})
        self.db.resumes.delete_many({})
        self.db.resume_analyses.delete_many({})
        
        # Create a primary user (verified)
        self.user_doc = {
            "name": "Meera Lifecycle",
            "email": "meera.lifecycle@example.com",
            "password": make_password("securepassword123"),
            "is_verified": True,
            "skills": [{"name": "Python"}, {"name": "React"}],
            "role": "Full Stack Engineer",
            "created_at": datetime.utcnow()
        }
        res = self.db.users.insert_one(self.user_doc)
        self.user_id = str(res.inserted_id)
        self.token = generate_jwt_token("meera.lifecycle@example.com", self.user_id)
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {self.token}')

    def tearDown(self):
        self.db.users.delete_many({})
        self.db.resumes.delete_many({})
        self.db.resume_analyses.delete_many({})

    def test_1_create_fill_save_reload_edit_save_verify(self):
        dummy_file = io.BytesIO(b"Dummy")
        dummy_file.name = "builder.txt"
        
        initial_data = {
            "basics": {"name": "Meera", "email": "meera@example.com"},
            "work": [{"company": "Tech Corp", "position": "Developer"}]
        }
        
        response = self.client.post('/api/resume/upload', {
            'file': dummy_file,
            'resumeData': json.dumps(initial_data)
        }, format='multipart')
        
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        resume_id = response.data['resume']['id']
        
        # Reload
        response_get = self.client.get(f'/api/resume/{resume_id}')
        self.assertEqual(response_get.status_code, status.HTTP_200_OK)
        self.assertEqual(response_get.data['resumeData']['basics']['name'], "Meera")
        
        # Edit -> Save
        updated_data = initial_data.copy()
        updated_data['basics']['name'] = "Meera Updated"
        
        response_put = self.client.put(f'/api/resume/{resume_id}', {
            'resumeData': json.dumps(updated_data)
        }, format='multipart')
        self.assertEqual(response_put.status_code, status.HTTP_200_OK)
        
        # Verify update
        response_verify = self.client.get(f'/api/resume/{resume_id}')
        self.assertEqual(response_verify.data['resumeData']['basics']['name'], "Meera Updated")

    def test_2_upload_pdf_extract_populate_edit_save_verify(self):
        pdf_file = io.BytesIO(b"%PDF-1.4 mock pdf content with John Doe Software Engineer")
        pdf_file.name = "resume.pdf"
        
        response_parse = self.client.post('/api/resume/parse-to-builder', {
            'file': pdf_file
        }, format='multipart')
        self.assertEqual(response_parse.status_code, status.HTTP_200_OK)
        
        extracted_data = response_parse.data.get('resumeData', {})
        extracted_data['basics'] = extracted_data.get('basics', {})
        extracted_data['basics']['name'] = "John Doe Edited"
        
        pdf_file.seek(0)
        response_save = self.client.post('/api/resume/upload', {
            'file': pdf_file,
            'resumeData': json.dumps(extracted_data)
        }, format='multipart')
        self.assertEqual(response_save.status_code, status.HTTP_201_CREATED)
        resume_id = response_save.data['resume']['id']
        
        response_verify = self.client.get(f'/api/resume/{resume_id}')
        self.assertEqual(response_verify.data['resumeData']['basics']['name'], "John Doe Edited")

    def test_3_upload_docx_extract_populate_edit_save_verify(self):
        docx_file = io.BytesIO(b"PK\x03\x04 mock docx content")
        docx_file.name = "resume.docx"
        
        response_parse = self.client.post('/api/resume/parse-to-builder', {
            'file': docx_file
        }, format='multipart')
        self.assertEqual(response_parse.status_code, status.HTTP_200_OK)
        
        extracted_data = response_parse.data.get('resumeData', {})
        extracted_data['basics'] = extracted_data.get('basics', {})
        extracted_data['basics']['name'] = "Jane Doe Edited"
        
        docx_file.seek(0)
        response_save = self.client.post('/api/resume/upload', {
            'file': docx_file,
            'resumeData': json.dumps(extracted_data)
        }, format='multipart')
        self.assertEqual(response_save.status_code, status.HTTP_201_CREATED)
        resume_id = response_save.data['resume']['id']
        
        response_verify = self.client.get(f'/api/resume/{resume_id}')
        self.assertEqual(response_verify.data['resumeData']['basics']['name'], "Jane Doe Edited")

    def test_4_analyze_resume_job_desc_verify_ai_results(self):
        dummy_file = io.BytesIO(b"Dummy")
        dummy_file.name = "builder.txt"
        response_upload = self.client.post('/api/resume/upload', {
            'file': dummy_file,
        }, format='multipart')
        resume_id = response_upload.data['resume']['id']
        
        response_analysis = self.client.post(f'/api/analysis/{resume_id}', {
            'jobDescription': "Looking for a Python React developer"
        }, format='json')
        
        self.assertEqual(response_analysis.status_code, status.HTTP_200_OK)
        self.assertIn('resume_analysis', response_analysis.data)
        self.assertIn('job_analysis', response_analysis.data)
        self.assertIn('matching_result', response_analysis.data)
