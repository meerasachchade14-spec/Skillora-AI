from django.urls import path
from apps.core.views import (
    ResumeUploadView,
    ResumeListView,
    ResumeDetailView,
    ResumeAnalysisView,
    SkillMatchView,
    RoadmapView,
    JobRecommendationsView,
    CareerInsightsView
)
from apps.core.admin_views import (
    AdminStatsView,
    AdminUsersView,
    AdminResumesView,
    AdminJobsView,
    AdminSkillsView,
    AdminResourcesView,
    AdminBugsView,
    AdminSettingsView
)

urlpatterns = [
    path('resume/upload', ResumeUploadView.as_view(), name='resume-upload'),
    path('resume', ResumeListView.as_view(), name='resume-list'),
    path('resume/<str:resume_id>', ResumeDetailView.as_view(), name='resume-detail'),
    path('analysis/<str:resume_id>', ResumeAnalysisView.as_view(), name='resume-analysis'),
    path('skills/match', SkillMatchView.as_view(), name='skill-match'),
    path('jobs/recommended', JobRecommendationsView.as_view(), name='job-recommendations'),
    path('roadmap', RoadmapView.as_view(), name='roadmap'),
    path('career-insights', CareerInsightsView.as_view(), name='career-insights'),

    # Admin Panel APIs
    path('admin/stats', AdminStatsView.as_view(), name='admin-stats'),
    path('admin/users', AdminUsersView.as_view(), name='admin-users'),
    path('admin/resumes', AdminResumesView.as_view(), name='admin-resumes'),
    path('admin/jobs', AdminJobsView.as_view(), name='admin-jobs'),
    path('admin/skills', AdminSkillsView.as_view(), name='admin-skills'),
    path('admin/resources', AdminResourcesView.as_view(), name='admin-resources'),
    path('admin/bugs', AdminBugsView.as_view(), name='admin-bugs'),
    path('admin/settings', AdminSettingsView.as_view(), name='admin-settings'),
]
