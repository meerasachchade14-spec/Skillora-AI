from django.urls import path, include
from django.http import JsonResponse


def api_root(request):
    """Root endpoint — confirms the backend is running."""
    return JsonResponse({
        "success": True,
        "message": "🎉 Skillora AI Backend is running!",
        "version": "1.0.0",
        "endpoints": {
            "auth": "/api/auth/",
        }
    })


def health_check(request):
    """Health check endpoint."""
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

    # Authentication (register)
    path("api/auth/", include("authentication.urls")),
]
