from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404

from apps.resumes.models import Resume
from .models import AnalysisReport

class ResumeAnalysisView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, resume_id):
        resume = get_object_or_404(Resume, id=resume_id, user=request.user)
        
        # Perform Mock ATS analysis (which can be extended to Gemini later)
        report_data = self.run_mock_ats_analysis(resume.extracted_text or "")
        
        # Save to MongoDB
        report = AnalysisReport.objects.create(
            user=request.user,
            resume=resume,
            ats_score=report_data['ats_score'],
            strengths=report_data['strengths'],
            weaknesses=report_data['weaknesses'],
            missing_keywords=report_data['missing_keywords'],
            recommendations=report_data['recommendations']
        )
        
        return Response({
            "success": True,
            "message": "ATS analysis report generated successfully.",
            "data": {
                "id": report.id,
                "resume_id": resume.id,
                "ats_score": report.ats_score,
                "strengths": report.strengths,
                "weaknesses": report.weaknesses,
                "missing_keywords": report.missing_keywords,
                "recommendations": report.recommendations,
                "created_at": report.created_at
            }
        }, status=status.HTTP_201_CREATED)

    def run_mock_ats_analysis(self, text):
        """
        Mock ATS analyser that scores resume, checks keyword densities and
        returns recommendations. Extend/replace this code to call Gemini or
        other LLM services in production.
        """
        if not text.strip():
            return {
                "ats_score": 45,
                "strengths": ["Clean layout spacing"],
                "weaknesses": ["Missing text content - could not read file"],
                "missing_keywords": ["Developer", "Project"],
                "recommendations": ["Re-upload your resume in a standard PDF/DOCX containing readable text."]
            }
            
        # Common tech keywords
        keywords = ["React", "JavaScript", "Python", "SQL", "Git", "Docker", "AWS", "Agile", "CI/CD", "HTML", "CSS", "TypeScript", "Node.js"]
        found_keywords = []
        for word in keywords:
            if word.lower() in text.lower():
                found_keywords.append(word)
                
        # Calculate dynamic mock score
        score = 65 + (len(found_keywords) * 3)
        score = min(98, max(45, score))
        
        # Generate lists
        missing = [w for w in keywords if w not in found_keywords]
        
        strengths = [
            f"Strong mentions of development tools: {', '.join(found_keywords[:3])}." if len(found_keywords) >= 3 else "Identified standard technology terms.",
            "Proper structure with standard readable sections.",
            "Includes contact details and email markers."
        ]
        
        weaknesses = []
        if len(missing) > 0:
            weaknesses.append(f"Missing core industry keywords: {', '.join(missing[:3])}.")
        if "docker" not in text.lower() and "aws" not in text.lower():
            weaknesses.append("Lack of deployment, containerization, or DevOps experiences.")
        if len(text.split()) < 200:
            weaknesses.append("Resume content is sparse. Expand on project metrics and responsibilities.")
            
        if not weaknesses:
            weaknesses = ["No major formatting or keyword omissions detected."]
            
        recommendations = [
            "Tailor your career summary for specific target roles.",
            f"Incorporate missing tools like {', '.join(missing[:2])} into project bullet points." if len(missing) >= 2 else "Add quantitative metrics (e.g., 'improved performance by 15%')."
        ]
        
        return {
            "ats_score": score,
            "strengths": strengths,
            "weaknesses": weaknesses,
            "missing_keywords": missing[:5],
            "recommendations": recommendations
        }
