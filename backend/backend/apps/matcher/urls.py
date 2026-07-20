from django.urls import path
from .views import SkillMatchView

urlpatterns = [
    path('match/', SkillMatchView.as_view()),
]
