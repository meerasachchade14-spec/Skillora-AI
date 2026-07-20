from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from django.http import JsonResponse


def api_root(request):
    """Root endpoint — confirms the backend is running and lists all API routes."""
    return JsonResponse({
        "success": True,
        "message": "🎉 Skillora AI Backend is running!",
        "version": "1.0.0",
        "endpoints": {
            "health":    "/api/health/",
            "auth":      "/api/auth/",
            "resumes":   "/api/resumes/",
            "analysis":  "/api/analysis/<resume_id>/",
            "skills":    "/api/skills/match/",
            "jobs":      "/api/jobs/",
            "settings":  "/api/settings/",
        }
    })


def health_check(request):
    """Health check endpoint for uptime monitors."""
    return JsonResponse({
        "success": True,
        "status": "healthy",
        "message": "Skillora API is running",
    })


urlpatterns = [
    # Root and health
    path("", api_root),
    path("api/", api_root),
    path("api/health/", health_check),

    # Django admin
    path("admin/", admin.site.urls),

    # Authentication (register, login, OTP, profile, token refresh)
    path("api/auth/", include("apps.accounts.urls")),

    # Resumes (upload, list, detail, delete)
    path("api/resumes/", include("apps.resumes.urls")),

    # ATS Analysis
    path("api/analysis/", include("apps.analysis.urls")),

    # Skill Matcher
    path("api/skills/", include("apps.matcher.urls")),

    # Jobs (list, recommended, save)
    path("api/jobs/", include("apps.jobs.urls")),

    # User settings
    path("api/settings/", include("apps.settings_app.urls")),
]

# Serve uploaded media files in development
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)