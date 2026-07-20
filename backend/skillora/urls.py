from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from django.http import JsonResponse, HttpResponse


def home(request):
    return HttpResponse("🎉 Skillora Backend is Running Successfully!")


def health_check(request):
    return JsonResponse({
        "success": True,
        "message": "Skillora API is running",
        "database": "MongoDB"
    })


urlpatterns = [
    path("", home),      # <-- Add this line

    path("admin/", admin.site.urls),

    path("api/health/", health_check),
    path("api/health", health_check),

    path("api/auth/", include("apps.accounts.urls")),
    path("api/resume/", include("apps.resumes.urls")),
    path("api/resumes/", include("apps.resumes.urls")),
    path("api/analysis/", include("apps.analysis.urls")),
    path("api/skills/", include("apps.matcher.urls")),
    path("api/matcher/", include("apps.matcher.urls")),
    path("api/jobs/", include("apps.jobs.urls")),
    path("api/settings/", include("apps.settings_app.urls")),
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)