import os
import random
from datetime import datetime
from bson import ObjectId
from django.conf import settings
from django.core.files.storage import default_storage
from django.core.files.base import ContentFile
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser

from config.db import get_db
from apps.core.serializers import (
    ResumeUploadSerializer, 
    SkillMatchSerializer, 
    RoadmapUpdateSerializer
)
from apps.authentication.views import get_user_profile_response_dict
from apps.core.ai.resume_parser import extract_resume_text
from apps.core.ai.information_extractor import extract_resume_information

# Helpers for generating realistic career/resume mock-analyzed data
def generate_ats_score(filename, user_skills):
    # Base score on filename and skills length
    base = 75
    overlap_bonus = min(len(user_skills) * 2, 15)
    random_variation = random.randint(0, 8)
    return min(base + overlap_bonus + random_variation, 98)

def get_demo_analysis_data(user_name, user_email, user_phone, user_skills, education_str, experience_str, score):
    skills_list = [s.get('name') if isinstance(s, dict) else str(s) for s in user_skills]
    if not skills_list:
        skills_list = ["Python", "JavaScript", "React", "Django", "SQL", "Git"]
        
    all_potential_missing = ["Docker", "AWS", "TypeScript", "CI/CD", "Kubernetes", "GraphQL", "Redis", "NoSQL"]
    missing = [s for s in all_potential_missing if s not in skills_list][:4]
    
    return {
        "score": score,
        "summary": {
            "name": user_name or "User",
            "email": user_email,
            "phone": user_phone or "+91 9999999999",
            "education": education_str or "Degree Not Listed",
            "experience": experience_str or "Fresher / No experience listed"
        },
        "skills": skills_list,
        "missingSkills": missing,
        "strengths": [
            "Clear section organization and flow",
            "Strong foundation in core developer tools",
            "Quantifiable metrics in projects",
            "ATS-friendly layout and font hierarchy"
        ],
        "weaknesses": [
            "Limited cloud deployment/DevOps visibility",
            "Missing certifications in target areas",
            "Resume summary could be more impact-driven"
        ],
        "improvementTips": [
            "Add measurable achievements for your top project contributions.",
            "Incorporate keywords from cloud technologies (e.g., Docker, AWS).",
            "Refine the professional summary to highlight your specific career goal."
        ]
    }

def get_demo_roadmap_data(role="Software Engineer"):
    return {
        "title": f"AI Learning Roadmap for {role}",
        "progress": 35,
        "steps": [
            {
                "id": "step-1",
                "name": "Core Language Mastery",
                "status": "completed",
                "description": "Master programming fundamentals, data structures, and algorithms.",
                "resources": "LeetCode, freeCodeCamp Python/JS tutorials",
                "skills": ["Algorithms", "Data Structures", "Problem Solving"]
            },
            {
                "id": "step-2",
                "name": "Web Development & Frameworks",
                "status": "in-progress",
                "description": "Build responsive web applications using React, HTML/CSS, and Django.",
                "resources": "Official React Documentation, Django Girls Tutorial",
                "skills": ["React.js", "Django", "HTML5", "CSS3"]
            },
            {
                "id": "step-3",
                "name": "Databases & API Design",
                "status": "todo",
                "description": "Learn SQL/NoSQL databases, schema designs, and RESTful API integrations.",
                "resources": "MDN Web Docs: REST APIs, PostgreSQL Tutorial",
                "skills": ["SQL", "MongoDB", "REST APIs"]
            },
            {
                "id": "step-4",
                "name": "DevOps & Cloud Deployment",
                "status": "todo",
                "description": "Understand containerization with Docker and deployment onto AWS/GCP.",
                "resources": "Docker handbook, AWS Free Tier guides",
                "skills": ["Docker", "AWS", "CI/CD"]
            }
        ]
    }

def get_demo_job_data(skills):
    # Dynamic generation based on skills
    jobs = [
        {
            "id": "job-1",
            "title": "Junior Python Developer",
            "company": "TechLogix Solutions",
            "location": "Mumbai, India (Hybrid)",
            "matchScore": 92,
            "salary": "₹6,00,000 - ₹8,00,000",
            "description": "We are looking for a Junior Python Developer who is passionate about backend engineering, Django, and database designs.",
            "type": "Full-time",
            "link": "#"
        },
        {
            "id": "job-2",
            "title": "Frontend React Developer",
            "company": "Appify Technologies",
            "location": "Bengaluru, India (Remote)",
            "matchScore": 88,
            "salary": "₹8,00,000 - ₹11,00,000",
            "description": "Join our fast-paced UI team to design and develop interactive consumer dashboards in React.js and Tailwind CSS.",
            "type": "Full-time",
            "link": "#"
        },
        {
            "id": "job-3",
            "title": "Associate Software Engineer",
            "company": "Global Systems Inc.",
            "location": "Pune, India (On-site)",
            "matchScore": 82,
            "salary": "₹5,00,000 - ₹7,00,000",
            "description": "Entry level engineering role focusing on full-stack development, version control, and contributing to agile deliverables.",
            "type": "Full-time",
            "link": "#"
        }
    ]
    return jobs

def get_demo_insights_data(score=85):
    return {
        "readinessScore": score,
        "salaryPrediction": {
            "min": 450000,
            "max": 850000,
            "average": 650000,
            "currency": "INR"
        },
        "timeline": [
            {"milestone": "Resume Optimization", "date": "Completed", "description": "Profile parsed and ATS-optimized."},
            {"milestone": "Core Skill Acquisition", "date": "Next 1-2 Months", "description": "Acquiring missing skills such as Docker and AWS."},
            {"milestone": "Project Building", "date": "Next 3 Months", "description": "Constructing portfolio projects to prove technical capabilities."},
            {"milestone": "Mock Interviews", "date": "Next 4 Months", "description": "Enrolling in mock technical interviews and DSA preps."}
        ],
        "demandTrend": [
            {"skill": "React.js", "demandLevel": "High"},
            {"skill": "Django", "demandLevel": "Medium-High"},
            {"skill": "AWS Cloud", "demandLevel": "High"},
            {"skill": "Docker Containers", "demandLevel": "Medium"}
        ]
    }


# --- VIEWS ---

class ResumeUploadView(APIView):
    """
    POST /api/resume/upload
    Uploads a resume file (linked to user), saves it in media folder, 
    persists metadata in resumes collection, and sets it as user's active resume.
    """
    permission_classes = [IsAuthenticated]
    parser_classes = (MultiPartParser, FormParser)

    def post(self, request):
        serializer = ResumeUploadSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            
        file_obj = serializer.validated_data['file']
        
        import json
        resume_data_input = request.data.get('resumeData')
        if isinstance(resume_data_input, str):
            try:
                resume_data = json.loads(resume_data_input)
            except Exception:
                resume_data = None
        else:
            resume_data = resume_data_input
            
        db = get_db()
        
        # Enforce directory existence
        os.makedirs(os.path.join(settings.MEDIA_ROOT, 'resumes'), exist_ok=True)
        
        # Save file to media/resumes/
        timestamp = datetime.utcnow().strftime('%Y%m%d%H%M%S')
        file_name = f"{timestamp}_{file_obj.name}"
        file_path = os.path.join('resumes', file_name)
        
        saved_path = default_storage.save(file_path, ContentFile(file_obj.read()))
        full_url = request.build_absolute_uri(settings.MEDIA_URL + saved_path)
        
        # Calculate simulated ATS score
        user_skills = request.user.skills or []
        ats_score = generate_ats_score(file_obj.name, user_skills)
        upload_date = datetime.utcnow().strftime('%d %B %Y')
        
        # Save resume document to MongoDB
        resume_doc = {
            'user_id': ObjectId(request.user.id),
            'filename': file_obj.name,
            'atsScore': ats_score,
            'uploadDate': upload_date,
            'file_path': saved_path,
            'file_url': full_url,
            'created_at': datetime.utcnow()
        }
        if resume_data:
            resume_doc['resumeData'] = resume_data
            
        db.resumes.insert_one(resume_doc)
        resume_id = str(resume_doc['_id'])
        
        # Set active resume on user profile
        db.users.update_one(
            {'_id': ObjectId(request.user.id)},
            {'$set': {
                'resume': {
                    'id': resume_id,
                    'filename': file_obj.name,
                    'atsScore': ats_score,
                    'uploadDate': upload_date
                },
                'updated_at': datetime.utcnow()
            }}
        )
        
        # Get updated user profile dict
        updated_user_doc = db.users.find_one({'_id': ObjectId(request.user.id)})
        
        return Response({
            "message": "Resume uploaded successfully.",
            "resume": {
                "id": resume_id,
                "filename": file_obj.name,
                "atsScore": ats_score,
                "uploadDate": upload_date,
                "fileUrl": full_url
            },
            "user": get_user_profile_response_dict(updated_user_doc)
        }, status=status.HTTP_201_CREATED)


class ResumeListView(APIView):
    """
    GET /api/resume
    Retrieves the logged-in user's resume history.
    """
    permission_classes = [IsAuthenticated]

    def get(self, request):
        db = get_db()
        cursor = db.resumes.find({'user_id': ObjectId(request.user.id)}).sort('created_at', -1)
        
        resumes_list = []
        for doc in cursor:
            resumes_list.append({
                "id": str(doc['_id']),
                "name": doc.get('filename'),
                "filename": doc.get('filename'),
                "date": doc.get('uploadDate'),
                "uploadDate": doc.get('uploadDate'),
                "score": doc.get('atsScore', 85),
                "atsScore": doc.get('atsScore', 85),
                "status": "Analyzed",
                "fileUrl": doc.get('file_url')
            })
            
        return Response(resumes_list, status=status.HTTP_200_OK)


class ResumeDetailView(APIView):
    """
    GET /api/resume/<resume_id>
    Retrieves the specific resume document along with its parsed JSON.
    
    PUT /api/resume/<resume_id>
    Updates the resume data and PDF file.
    
    DELETE /api/resume/<resume_id>
    Deletes the specific resume document. Scoped to authenticated user.
    """
    permission_classes = [IsAuthenticated]
    parser_classes = (MultiPartParser, FormParser, JSONParser)

    def get(self, request, resume_id):
        db = get_db()
        try:
            resume_obj_id = ObjectId(resume_id)
        except Exception:
            return Response({"error": "Invalid resume ID."}, status=status.HTTP_400_BAD_REQUEST)
            
        resume = db.resumes.find_one({'_id': resume_obj_id})
        if not resume:
            return Response({"error": "Resume not found."}, status=status.HTTP_404_NOT_FOUND)
            
        if str(resume.get('user_id')) != request.user.id:
            return Response({"error": "You do not have permission to view this resume."}, status=status.HTTP_403_FORBIDDEN)
            
        resume_data = resume.get('resumeData')
        
        # If resumeData doesn't exist, try to parse it from the saved PDF
        if not resume_data and resume.get('file_path'):
            file_path = resume.get('file_path')
            full_disk_path = os.path.join(settings.MEDIA_ROOT, file_path)
            if os.path.exists(full_disk_path):
                try:
                    raw_text = extract_resume_text(full_disk_path)
                    resume_data = extract_resume_information(raw_text)
                    # Save back to DB
                    db.resumes.update_one({'_id': resume_obj_id}, {'$set': {'resumeData': resume_data}})
                except Exception as e:
                    print(f"Extraction error: {e}")
                    resume_data = {}
            else:
                resume_data = {}
                
        return Response({
            "id": str(resume['_id']),
            "filename": resume.get('filename'),
            "uploadDate": resume.get('uploadDate'),
            "fileUrl": resume.get('file_url'),
            "resumeData": resume_data or {}
        }, status=status.HTTP_200_OK)

    def put(self, request, resume_id):
        import json
        db = get_db()
        try:
            resume_obj_id = ObjectId(resume_id)
        except Exception:
            return Response({"error": "Invalid resume ID."}, status=status.HTTP_400_BAD_REQUEST)
            
        resume = db.resumes.find_one({'_id': resume_obj_id})
        if not resume:
            return Response({"error": "Resume not found."}, status=status.HTTP_404_NOT_FOUND)
            
        if str(resume.get('user_id')) != request.user.id:
            return Response({"error": "You do not have permission to update this resume."}, status=status.HTTP_403_FORBIDDEN)
            
        resume_data_input = request.data.get('resumeData')
        if isinstance(resume_data_input, str):
            try:
                resume_data = json.loads(resume_data_input)
            except Exception:
                resume_data = None
        else:
            resume_data = resume_data_input
            
        update_fields = {'updated_at': datetime.utcnow()}
        if resume_data:
            update_fields['resumeData'] = resume_data
            
        file_obj = request.FILES.get('file')
        if file_obj:
            old_file_path = resume.get('file_path')
            if old_file_path and default_storage.exists(old_file_path):
                default_storage.delete(old_file_path)
                
            timestamp = datetime.utcnow().strftime('%Y%m%d%H%M%S')
            file_name = f"{timestamp}_{file_obj.name}"
            # Ensure resumes directory exists
            os.makedirs(os.path.join(settings.MEDIA_ROOT, 'resumes'), exist_ok=True)
            file_path = os.path.join('resumes', file_name)
            saved_path = default_storage.save(file_path, ContentFile(file_obj.read()))
            full_url = request.build_absolute_uri(settings.MEDIA_URL + saved_path)
            
            update_fields['file_path'] = saved_path
            update_fields['file_url'] = full_url
            update_fields['filename'] = file_obj.name
            
            # Also update user's active resume if this is the active one
            user_doc = db.users.find_one({'_id': ObjectId(request.user.id)})
            if user_doc and user_doc.get('resume', {}).get('id') == resume_id:
                db.users.update_one(
                    {'_id': ObjectId(request.user.id)},
                    {'$set': {'resume.filename': file_obj.name, 'updated_at': datetime.utcnow()}}
                )
            
        db.resumes.update_one({'_id': resume_obj_id}, {'$set': update_fields})
        
        return Response({"message": "Resume updated successfully."}, status=status.HTTP_200_OK)


    def delete(self, request, resume_id):
        db = get_db()
        try:
            resume_obj_id = ObjectId(resume_id)
        except Exception:
            return Response({"error": "Invalid resume ID."}, status=status.HTTP_400_BAD_REQUEST)
            
        # Security: verify ownership before deletion
        resume = db.resumes.find_one({'_id': resume_obj_id})
        if not resume:
            return Response({"error": "Resume not found."}, status=status.HTTP_404_NOT_FOUND)
            
        if str(resume.get('user_id')) != request.user.id:
            return Response({"error": "You do not have permission to delete this resume."}, status=status.HTTP_403_FORBIDDEN)
            
        # Delete the resume document
        db.resumes.delete_one({'_id': resume_obj_id})
        
        # Clean up related analysis and matching history
        db.resume_analyses.delete_many({'resume_id': resume_obj_id})
        db.matcher_history.delete_many({'resume_id': resume_obj_id})
        
        # Delete file from local storage if exists
        file_path = resume.get('file_path')
        if file_path:
            if default_storage.exists(file_path):
                default_storage.delete(file_path)
                
        # If deleted resume was active, clear active resume on user profile
        user_doc = db.users.find_one({'_id': ObjectId(request.user.id)})
        active_resume = user_doc.get('resume', {})
        if active_resume.get('id') == resume_id:
            db.users.update_one(
                {'_id': ObjectId(request.user.id)},
                {'$set': {'resume': {}, 'updated_at': datetime.utcnow()}}
            )
            
        return Response({"message": "Resume deleted successfully."}, status=status.HTTP_200_OK)


class ResumeAnalysisView(APIView):
    """
    POST / GET /api/analysis/<resume_id>
    Retrieves or generates resume analysis results. Scoped to authenticated user.
    """
    permission_classes = [IsAuthenticated]

    def get_user_details(self, user):
        latest_exp = user.experience[0] if user.experience else None
        graduation = user.education.get('graduation', {}) if user.education else {}
        
        edu_str = f"{graduation.get('degree', '')} in {graduation.get('branch', '')}" if graduation else "Degree Not Listed"
        exp_str = f"{latest_exp.get('role', '')} at {latest_exp.get('company', '')}" if latest_exp else "Fresher / No experience listed"
        return edu_str, exp_str

    def _generate_analysis(self, request, resume, resume_obj_id, job_description=""):
        db = get_db()
        from apps.core.ai.analysis_pipeline import analyze_resume_with_job
        import os
        from django.conf import settings
        
        full_disk_path = None
        if resume.get('file_path'):
            full_disk_path = os.path.join(settings.MEDIA_ROOT, resume.get('file_path'))
            if not os.path.exists(full_disk_path):
                full_disk_path = None
                
        resume_text = None
        if not full_disk_path and resume.get('resumeData'):
            import json
            resume_text = json.dumps(resume.get('resumeData'))

        if not job_description:
            # If no job description is provided, dynamically construct one based on the user's profile and extracted skills
            # This ensures TF-IDF and semantic similarity reflect the user's actual domain instead of dummy python/react data
            role = request.user.role if request.user.role else "Professional"
            user_skills = [s.get("name") if isinstance(s, dict) else s for s in request.user.skills] if request.user.skills else []
            if not user_skills:
                # We can't easily extract text here if full_disk_path is used without parsing it first, 
                # but we will just pass empty string if no user skills exist
                pass
            skills_str = ", ".join(user_skills[:10]) if user_skills else ""
            job_description = f"{role} with experience in {skills_str}" if skills_str else f"{role} role."
            
        try:
            analysis_result = analyze_resume_with_job(
                resume_file_path=full_disk_path, 
                job_description=job_description,
                resume_text=resume_text
            )
            resume_analysis = analysis_result["resume_analysis"]
            career_insights = analysis_result["career_insights"]
            skill_gap = analysis_result["skill_gap_analysis"]
            
            edu_str, exp_str = self.get_user_details(request.user)
            
            from apps.core.ai.information_extractor import extract_resume_information
            actual_resume_text = resume_analysis.get("resume_text", "")
            extracted_info = extract_resume_information(actual_resume_text) if actual_resume_text else {}

            if extracted_info.get("education") and len(extracted_info["education"]) > 0:
                extracted_edu = extracted_info["education"][0]
                extracted_edu_str = f"{extracted_edu.get('degree', 'Degree')} from {extracted_edu.get('college', 'University')}"
                if extracted_edu_str != "Degree from University":
                    edu_str = extracted_edu_str

            if extracted_info.get("experience") and len(extracted_info["experience"]) > 0:
                extracted_exp = extracted_info["experience"][0]
                extracted_exp_str = f"{extracted_exp.get('role', 'Role')} at {extracted_exp.get('company', 'Company')}"
                if extracted_exp_str != "Role at Company":
                    exp_str = extracted_exp_str

            analysis_data = {
                "score": career_insights.get("match_score", 85),
                "summary": {
                    "name": extracted_info.get("personal", {}).get("fullName") or request.user.name or "User",
                    "email": extracted_info.get("personal", {}).get("email") or request.user.email,
                    "phone": extracted_info.get("personal", {}).get("phone") or request.user.phone_number or "",
                    "education": edu_str,
                    "experience": exp_str
                },
                "skills": resume_analysis.get("skills", {}).get("skills", []),
                "missingSkills": [s["skill"] for s in skill_gap.get("missing_skills", [])],
                "strengths": career_insights.get("strengths", []),
                "weaknesses": [s["recommendation"] for s in career_insights.get("improvement_areas", [])],
                "improvementTips": [s["recommendation"] for s in career_insights.get("improvement_areas", [])],
                "resume_analysis": resume_analysis,
                "job_analysis": analysis_result.get("job_analysis", {}),
                "matching_result": analysis_result.get("matching_result", {}),
                "skill_gap_analysis": skill_gap,
                "career_insights": career_insights,
                "learning_roadmap": analysis_result.get("learning_roadmap", {}),
                "extracted_info": extracted_info
            }
        except Exception as e:
            print(f"AI Pipeline Error: {e}")
            return Response({"error": "Failed to analyze resume with AI."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        analysis_doc = {
            'user_id': ObjectId(request.user.id),
            'resume_id': resume_obj_id,
            **analysis_data,
            'created_at': datetime.utcnow()
        }
        db.resume_analyses.insert_one(analysis_doc)
        return analysis_doc

    def get(self, request, resume_id):
        db = get_db()
        try:
            resume_obj_id = ObjectId(resume_id)
        except Exception:
            return Response({"error": "Invalid resume ID format."}, status=status.HTTP_400_BAD_REQUEST)
            
        # Security: verify ownership of resume
        resume = db.resumes.find_one({'_id': resume_obj_id})
        if not resume:
            return Response({"error": "Resume not found."}, status=status.HTTP_404_NOT_FOUND)
            
        if str(resume.get('user_id')) != request.user.id:
            return Response({"error": "Access Denied: Resume ownership mismatch."}, status=status.HTTP_403_FORBIDDEN)
            
        # Retrieve analysis results
        analysis = db.resume_analyses.find_one({'resume_id': resume_obj_id})
        if not analysis:
            # Fallback to create analysis
            job_description = request.query_params.get("jobDescription", "")
            analysis = self._generate_analysis(request, resume, resume_obj_id, job_description)
            if isinstance(analysis, Response):
                return analysis
            
        skills = analysis.get('skills', [])
        if isinstance(skills, dict):
            skills = skills.get('skills', [])

        # Format response
        return Response({
            "id": str(analysis['_id']),
            "resumeId": str(analysis['resume_id']),
            "score": analysis.get('score'),
            "atsScore": analysis.get('score'),
            "summary": analysis.get('summary'),
            "skills": skills,
            "missingSkills": analysis.get('missingSkills'),
            "strengths": analysis.get('strengths'),
            "weaknesses": analysis.get('weaknesses'),
            "improvementTips": analysis.get('improvementTips'),
            "resume_analysis": analysis.get("resume_analysis"),
            "job_analysis": analysis.get("job_analysis"),
            "matching_result": analysis.get("matching_result"),
            "skill_gap_analysis": analysis.get("skill_gap_analysis"),
            "career_insights": analysis.get("career_insights"),
            "learning_roadmap": analysis.get("learning_roadmap"),
            "extracted_info": analysis.get("extracted_info", {})
        }, status=status.HTTP_200_OK)

    def post(self, request, resume_id):
        # Trigger re-analysis
        db = get_db()
        try:
            resume_obj_id = ObjectId(resume_id)
        except Exception:
            return Response({"error": "Invalid resume ID."}, status=status.HTTP_400_BAD_REQUEST)
            
        resume = db.resumes.find_one({'_id': resume_obj_id})
        if not resume:
            return Response({"error": "Resume not found."}, status=status.HTTP_404_NOT_FOUND)
            
        if str(resume.get('user_id')) != request.user.id:
            return Response({"error": "Access Denied."}, status=status.HTTP_403_FORBIDDEN)
            
        # Delete old analysis if any
        db.resume_analyses.delete_many({'resume_id': resume_obj_id})
        
        # Generate fresh analysis
        job_description = request.data.get("jobDescription", "")
        analysis_doc = self._generate_analysis(request, resume, resume_obj_id, job_description)
        
        if isinstance(analysis_doc, Response):
            return analysis_doc
        
        skills = analysis_doc.get('skills', [])
        if isinstance(skills, dict):
            skills = skills.get('skills', [])

        return Response({
            "id": str(analysis_doc['_id']),
            "resumeId": str(analysis_doc['resume_id']),
            "score": analysis_doc.get('score'),
            "atsScore": analysis_doc.get('score'),
            "summary": analysis_doc.get('summary'),
            "skills": skills,
            "missingSkills": analysis_doc.get('missingSkills'),
            "strengths": analysis_doc.get('strengths'),
            "weaknesses": analysis_doc.get('weaknesses'),
            "improvementTips": analysis_doc.get('improvementTips'),
            "resume_analysis": analysis_doc.get("resume_analysis"),
            "job_analysis": analysis_doc.get("job_analysis"),
            "matching_result": analysis_doc.get("matching_result"),
            "skill_gap_analysis": analysis_doc.get("skill_gap_analysis"),
            "career_insights": analysis_doc.get("career_insights"),
            "learning_roadmap": analysis_doc.get("learning_roadmap"),
            "extracted_info": analysis_doc.get("extracted_info", {})
        }, status=status.HTTP_200_OK)


class SkillMatchView(APIView):
    """
    POST /api/skills/match
    GET /api/skills/match
    Calculates skills gap matching and stores/retrieves history.
    """
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = SkillMatchSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            
        job_description = serializer.validated_data['job_description']
        job_title = serializer.validated_data.get('job_title', 'Target Job')
        
        db = get_db()
        user_doc = db.users.find_one({'_id': ObjectId(request.user.id)})
        active_resume = user_doc.get('resume', {})
        resume_id = active_resume.get('id')
        
        # We need the user's resume text or file path
        resume_text = None
        if resume_id:
            resume = db.resumes.find_one({'_id': ObjectId(resume_id)})
            if resume and resume.get('resumeData'):
                import json
                resume_text = json.dumps(resume.get('resumeData'))
                
        # If no resume text is found, fallback to user skills
        if not resume_text:
            user_skills = [s.get('name') if isinstance(s, dict) else str(s) for s in (request.user.skills or [])]
            resume_text = ", ".join(user_skills) if user_skills else "Software Engineer"
            
        # Run real AI pipeline
        from apps.core.ai.analysis_pipeline import analyze_resume_with_job
        try:
            analysis_result = analyze_resume_with_job(
                job_description=job_description,
                resume_text=resume_text
            )
            matching_result = analysis_result["matching_result"]
            career_insights = analysis_result["career_insights"]
            
            match_score = matching_result.get("final_match_score", 85)
            matched = matching_result.get("matched_skills", [])
            missing = matching_result.get("missing_skills", [])
            recommendations = [rec["recommendation"] for rec in career_insights.get("improvement_areas", [])]
            
            # If nothing returned, fallback gracefully
            if not matched and not missing:
                missing = ["Specific skills from job description"]
                recommendations = ["Consider adding more context to your resume."]
        except Exception as e:
            print(f"Error in real AI matching: {e}")
            match_score = 75
            matched = []
            missing = ["Error generating AI matches"]
            recommendations = ["Try uploading a more detailed resume."]

        # Save to database
        match_doc = {
            'user_id': ObjectId(request.user.id),
            'resume_id': ObjectId(resume_id) if resume_id else None,
            'job_title': job_title,
            'job_description': job_description,
            'match_score': match_score,
            'matched_skills': matched,
            'missing_skills': missing,
            'recommendations': recommendations,
            'created_at': datetime.utcnow()
        }
        db.matcher_history.insert_one(match_doc)
        
        return Response({
            "id": str(match_doc['_id']),
            "jobTitle": job_title,
            "matchScore": match_score,
            "matchedSkills": matched,
            "missingSkills": missing,
            "recommendations": recommendations,
            "createdAt": match_doc['created_at'].strftime('%Y-%m-%d %H:%M:%S')
        }, status=status.HTTP_201_CREATED)

    def get(self, request):
        db = get_db()
        cursor = db.matcher_history.find({'user_id': ObjectId(request.user.id)}).sort('created_at', -1)
        
        history = []
        for doc in cursor:
            history.append({
                "id": str(doc['_id']),
                "jobTitle": doc.get('job_title', 'Target Job'),
                "matchScore": doc.get('match_score', 85),
                "matchedSkills": doc.get('matched_skills', []),
                "missingSkills": doc.get('missing_skills', []),
                "recommendations": doc.get('recommendations', []),
                "createdAt": doc.get('created_at').strftime('%Y-%m-%d %H:%M:%S') if doc.get('created_at') else ''
            })
        return Response(history, status=status.HTTP_200_OK)


class RoadmapView(APIView):
    """
    GET /api/roadmap
    POST/PUT /api/roadmap
    Retrieves/initializes and updates roadmaps for user.
    """
    permission_classes = [IsAuthenticated]

    def get(self, request):
        db = get_db()
        roadmap = db.roadmaps.find_one({'user_id': ObjectId(request.user.id)})
        
        if not roadmap:
            # Determine role from profile
            user_doc = db.users.find_one({'_id': ObjectId(request.user.id)})
            role = user_doc.get('role', 'Software Engineer')
            
            # Use real AI data if available
            latest_analysis = db.resume_analyses.find_one({'user_id': ObjectId(request.user.id)}, sort=[('created_at', -1)])
            
            if latest_analysis and latest_analysis.get('learning_roadmap'):
                ai_roadmap = latest_analysis.get('learning_roadmap')
                roadmap_data = {
                    "title": ai_roadmap.get("roadmap_title", f"AI Learning Roadmap for {role}"),
                    "progress": 0,
                    "steps": [
                        {
                            "id": f"step-{i+1}",
                            "name": step.get("phase", f"Phase {i+1}"),
                            "status": "todo" if i > 0 else "in-progress",
                            "description": step.get("focus", ""),
                            "resources": "Online tutorials and courses",
                            "skills": step.get("skills_to_acquire", [])
                        }
                        for i, step in enumerate(ai_roadmap.get("phases", []))
                    ]
                }
            else:
                roadmap_data = get_demo_roadmap_data(role)
            
            roadmap_doc = {
                'user_id': ObjectId(request.user.id),
                **roadmap_data,
                'created_at': datetime.utcnow(),
                'updated_at': datetime.utcnow()
            }
            db.roadmaps.insert_one(roadmap_doc)
            roadmap = roadmap_doc
            
        return Response({
            "id": str(roadmap['_id']),
            "title": roadmap.get('title'),
            "progress": roadmap.get('progress', 0),
            "steps": roadmap.get('steps', []),
            "updatedAt": roadmap.get('updated_at', datetime.utcnow()).strftime('%Y-%m-%d %H:%M:%S')
        }, status=status.HTTP_200_OK)

    def put(self, request):
        # Also support POST/PUT updates
        serializer = RoadmapUpdateSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            
        db = get_db()
        roadmap = db.roadmaps.find_one({'user_id': ObjectId(request.user.id)})
        if not roadmap:
            return Response({"error": "Roadmap not initialized."}, status=status.HTTP_404_NOT_FOUND)
            
        update_data = {}
        if 'progress' in serializer.validated_data:
            update_data['progress'] = serializer.validated_data['progress']
        if 'steps' in serializer.validated_data:
            update_data['steps'] = serializer.validated_data['steps']
            
        if update_data:
            update_data['updated_at'] = datetime.utcnow()
            db.roadmaps.update_one({'_id': roadmap['_id']}, {'$set': update_data})
            roadmap = db.roadmaps.find_one({'_id': roadmap['_id']})
            
        return Response({
            "id": str(roadmap['_id']),
            "title": roadmap.get('title'),
            "progress": roadmap.get('progress', 0),
            "steps": roadmap.get('steps', []),
            "updatedAt": roadmap.get('updated_at').strftime('%Y-%m-%d %H:%M:%S')
        }, status=status.HTTP_200_OK)

    def post(self, request):
        return self.put(request)


class JobRecommendationsView(APIView):
    """
    GET /api/jobs/recommended
    Returns tailored job recommendations based on user skills/profile.
    """
    permission_classes = [IsAuthenticated]

    def get(self, request):
        db = get_db()
        rec_doc = db.job_recommendations.find_one({'user_id': ObjectId(request.user.id)})
        
        if not rec_doc:
            user_skills = [s.get('name') if isinstance(s, dict) else str(s) for s in (request.user.skills or [])]
            jobs = get_demo_job_data(user_skills)
            
            rec_doc = {
                'user_id': ObjectId(request.user.id),
                'jobs': jobs,
                'created_at': datetime.utcnow()
            }
            db.job_recommendations.insert_one(rec_doc)
            
        return Response(rec_doc.get('jobs', []), status=status.HTTP_200_OK)


class CareerInsightsView(APIView):
    """
    GET /api/career-insights
    Retrieves or generates career insights (readiness score, salaries, timeline, trends).
    """
    permission_classes = [IsAuthenticated]

    def get(self, request):
        db = get_db()
        insights_doc = db.career_insights.find_one({'user_id': ObjectId(request.user.id)})
        
        if not insights_doc:
            user_doc = db.users.find_one({'_id': ObjectId(request.user.id)})
            active_resume = user_doc.get('resume', {})
            ats_score = active_resume.get('atsScore', 85) if active_resume else 80
            
            # Use real AI data if available
            latest_analysis = db.resume_analyses.find_one({'user_id': ObjectId(request.user.id)}, sort=[('created_at', -1)])
            
            if latest_analysis and latest_analysis.get('career_insights'):
                ai_insights = latest_analysis.get('career_insights')
                insights_data = {
                    "readinessScore": ai_insights.get("match_score", ats_score),
                    "salaryPrediction": {
                        "min": 450000,
                        "max": 850000,
                        "average": 650000,
                        "currency": "INR"
                    },
                    "timeline": [
                        {"milestone": "Resume Optimization", "date": "Completed", "description": "Profile parsed and ATS-optimized."}
                    ] + [
                        {"milestone": f"Improve {area.get('skill', 'Skill')}", "date": "Next 1-2 Months", "description": area.get("recommendation", "")}
                        for area in ai_insights.get("improvement_areas", [])[:3]
                    ],
                    "demandTrend": [
                        {"skill": s.get("skill", "Technology"), "demandLevel": "High"}
                        for s in latest_analysis.get("skill_gap_analysis", {}).get("missing_skills", [])[:4]
                    ]
                }
            else:
                insights_data = get_demo_insights_data(ats_score)
                
            insights_doc = {
                'user_id': ObjectId(request.user.id),
                **insights_data,
                'created_at': datetime.utcnow()
            }
            db.career_insights.insert_one(insights_doc)
            
        return Response({
            "id": str(insights_doc['_id']),
            "readinessScore": insights_doc.get('readinessScore'),
            "salaryPrediction": insights_doc.get('salaryPrediction'),
            "timeline": insights_doc.get('timeline'),
            "demandTrend": insights_doc.get('demandTrend')
        }, status=status.HTTP_200_OK)


class ResumeParseToBuilderView(APIView):
    """
    POST /api/resume/parse-to-builder
    Parses a resume for the Resume Builder without saving as active.
    """
    permission_classes = [IsAuthenticated]
    parser_classes = (MultiPartParser, FormParser)

    def post(self, request):
        serializer = ResumeUploadSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            
        file_obj = serializer.validated_data['file']
        
        # Save file to a temporary location to process it
        os.makedirs(os.path.join(settings.MEDIA_ROOT, 'temp_resumes'), exist_ok=True)
        timestamp = datetime.utcnow().strftime('%Y%m%d%H%M%S')
        file_name = f"temp_{timestamp}_{file_obj.name}"
        file_path = os.path.join('temp_resumes', file_name)
        saved_path = default_storage.save(file_path, ContentFile(file_obj.read()))
        
        full_disk_path = os.path.join(settings.MEDIA_ROOT, saved_path)
        
        try:
            raw_text = extract_resume_text(full_disk_path)
            structured_data = extract_resume_information(raw_text)
        except Exception as e:
            structured_data = {}
            print(f"Extraction error: {e}")
        finally:
            # Clean up
            if default_storage.exists(saved_path):
                default_storage.delete(saved_path)
                
        return Response({"resumeData": structured_data}, status=status.HTTP_200_OK)
