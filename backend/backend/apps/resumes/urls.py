from django.urls import path
from .views import ResumeListView, ResumeUploadView, ResumeDetailView

urlpatterns = [
    path('', ResumeListView.as_view()),
    path('upload/', ResumeUploadView.as_view()),
    path('<int:pk>/', ResumeDetailView.as_view()),
]
