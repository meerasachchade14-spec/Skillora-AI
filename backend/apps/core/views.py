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
from rest_framework.parsers import MultiPartParser, FormParser

from config.db import get_db
from apps.core.serializers import (
    ResumeUploadSerializer, 
    SkillMatchSerializer, 
    RoadmapUpdateSerializer
)
from apps.authentication.views import get_user_profile_response_dict

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
    DELETE /api/resume/<resume_id>
    Deletes the specific resume document. Scoped to authenticated user.
    """
    permission_classes = [IsAuthenticated]

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
            edu_str, exp_str = self.get_user_details(request.user)
            analysis_data = get_demo_analysis_data(
                request.user.name, 
                request.user.email, 
                request.user.phone_number,
                request.user.skills, 
                edu_str, 
                exp_str, 
                resume.get('atsScore', 85)
            )
            analysis_doc = {
                'user_id': ObjectId(request.user.id),
                'resume_id': resume_obj_id,
                **analysis_data,
                'created_at': datetime.utcnow()
            }
            db.resume_analyses.insert_one(analysis_doc)
            analysis = analysis_doc
            
        # Format response
        return Response({
            "id": str(analysis['_id']),
            "resumeId": str(analysis['resume_id']),
            "score": analysis.get('score'),
            "atsScore": analysis.get('score'),
            "summary": analysis.get('summary'),
            "skills": analysis.get('skills'),
            "missingSkills": analysis.get('missingSkills'),
            "strengths": analysis.get('strengths'),
            "weaknesses": analysis.get('weaknesses'),
            "improvementTips": analysis.get('improvementTips')
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
        edu_str, exp_str = self.get_user_details(request.user)
        analysis_data = get_demo_analysis_data(
            request.user.name, 
            request.user.email, 
            request.user.phone_number,
            request.user.skills, 
            edu_str, 
            exp_str, 
            resume.get('atsScore', 85)
        )
        analysis_doc = {
            'user_id': ObjectId(request.user.id),
            'resume_id': resume_obj_id,
            **analysis_data,
            'created_at': datetime.utcnow()
        }
        db.resume_analyses.insert_one(analysis_doc)
        
        return Response({
            "id": str(analysis_doc['_id']),
            "resumeId": str(analysis_doc['resume_id']),
            "score": analysis_doc.get('score'),
            "atsScore": analysis_doc.get('score'),
            "summary": analysis_doc.get('summary'),
            "skills": analysis_doc.get('skills'),
            "missingSkills": analysis_doc.get('missingSkills'),
            "strengths": analysis_doc.get('strengths'),
            "weaknesses": analysis_doc.get('weaknesses'),
            "improvementTips": analysis_doc.get('improvementTips')
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
        
        user_skills = [s.get('name') if isinstance(s, dict) else str(s) for s in (request.user.skills or [])]
        if not user_skills:
            user_skills = ["Python", "JavaScript", "React", "Django", "SQL", "Git"]
            
        # Skill matching algorithm
        job_desc_lower = job_description.lower()
        matched = []
        missing = []
        
        # Check matching of user's skills
        for skill in user_skills:
            if skill.lower() in job_desc_lower:
                matched.append(skill)
            else:
                # Add to missing if it's a common job keyword but they don't have it
                pass
                
        # Generate some missing skills based on text context
        potential_missing = ["Docker", "AWS", "TypeScript", "CI/CD", "Kubernetes", "GraphQL", "Redis", "NoSQL"]
        for p in potential_missing:
            if p not in user_skills and p.lower() in job_desc_lower:
                missing.append(p)
                
        if not missing:
            # Fallback
            missing = ["Docker", "AWS"][:random.randint(1, 2)]
            
        # Compute match score
        total_skills = len(matched) + len(missing)
        match_score = int((len(matched) / total_skills) * 100) if total_skills > 0 else 85
        
        # Recommendations
        recommendations = [
            f"Add {m} to your technical toolkit." for m in missing
        ] + ["Focus on deploying real-world API applications.", "Incorporate metric-driven results in your experience descriptions."]
        
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
