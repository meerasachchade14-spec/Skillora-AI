from django.urls import path
from .views import ResumeAnalysisView

urlpatterns = [
    path('<int:resume_id>/', ResumeAnalysisView.as_view()),
]
