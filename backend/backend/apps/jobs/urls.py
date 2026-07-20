from django.urls import path
from .views import JobListView, RecommendedJobsView, SaveJobView, SavedJobsListView

urlpatterns = [
    path('', JobListView.as_view()),
    path('recommended/', RecommendedJobsView.as_view()),
    path('saved/', SavedJobsListView.as_view()),
    path('save/<int:job_id>/', SaveJobView.as_view()),
]
