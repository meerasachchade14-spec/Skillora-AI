from django.db import models
from django.conf import settings
from apps.resumes.models import Resume

class AnalysisReport(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='user_analysis_reports'
    )
    resume = models.ForeignKey(
        Resume,
        on_delete=models.CASCADE,
        related_name='resume_analysis_reports'
    )
    ats_score = models.IntegerField(default=0)
    
    strengths = models.JSONField(default=list)
    weaknesses = models.JSONField(default=list)
    missing_keywords = models.JSONField(default=list)
    recommendations = models.JSONField(default=list)
    
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Report {self.id} for {self.user.email} - Score: {self.ats_score}"
