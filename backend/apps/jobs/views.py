import re
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404

from .models import Job, SavedJob
from .serializers import JobSerializer, SavedJobSerializer
from apps.resumes.models import Resume

class JobListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        jobs = Job.objects.all()
        serializer = JobSerializer(jobs, many=True)
        return Response({
            "success": True,
            "data": serializer.data
        }, status=status.HTTP_200_OK)

class RecommendedJobsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        # Retrieve latest resume text
        resume = Resume.objects.filter(user=request.user).order_by('-uploaded_at').first()
        
        candidate_skills = []
        if resume and resume.extracted_text:
            text = resume.extracted_text.lower()
            skills_pool = [
                "React", "HTML", "CSS", "JavaScript", "Python", "MongoDB", "SQL", 
                "Git", "Node.js", "Django", "Tailwind", "Java", "Docker", "AWS", 
                "Kubernetes", "TypeScript", "Redux", "GraphQL", "Next.js", "CI/CD"
            ]
            for skill in skills_pool:
                if skill.lower() in text:
                    candidate_skills.append(skill.lower())
                    
        jobs = Job.objects.all()
        recommended = []
        
        for job in jobs:
            job_tags_lower = [t.lower() for t in job.tags]
            
            if candidate_skills:
                matching = set(candidate_skills).intersection(set(job_tags_lower))
                match_pct = int((len(matching) / len(job_tags_lower)) * 100) if job_tags_lower else 70
                # Realistic scoring offset
                match_pct = max(45, min(97, match_pct + 25))
            else:
                match_pct = 60 # Default base match score if no resume uploaded
                
            job_data = JobSerializer(job).data
            job_data['match'] = match_pct
            recommended.append(job_data)
            
        # Sort by match percentage descending
        recommended.sort(key=lambda x: x['match'], reverse=True)
        
        return Response({
            "success": True,
            "data": recommended
        }, status=status.HTTP_200_OK)

class SaveJobView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, job_id):
        job = get_object_or_404(Job, id=job_id)
        saved_job, created = SavedJob.objects.get_or_create(
            user=request.user,
            job=job
        )
        
        message = "Job saved successfully." if created else "Job was already saved."
        return Response({
            "success": True,
            "message": message,
            "data": SavedJobSerializer(saved_job).data
        }, status=status.HTTP_200_OK)

class SavedJobsListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        saved = SavedJob.objects.filter(user=request.user).order_by('-saved_at')
        serializer = SavedJobSerializer(saved, many=True)
        return Response({
            "success": True,
            "data": serializer.data
        }, status=status.HTTP_200_OK)
