import json
from datetime import datetime, timezone

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
from django.contrib.auth.hashers import make_password

from django.conf import settings


@csrf_exempt
@require_http_methods(["POST"])
def register(request):
    """
    Register a new user.

    Expects JSON body:
    {
        "full_name": "...",
        "email": "...",
        "password": "..."
    }

    Stores the user in MongoDB → skillora_ai.users
    Password is hashed using Django's make_password().
    """
    try:
        data = json.loads(request.body)
    except (json.JSONDecodeError, ValueError):
        return JsonResponse(
            {"error": "Invalid JSON in request body"},
            status=400,
        )

    full_name = data.get("full_name", "").strip()
    email = data.get("email", "").strip().lower()
    password = data.get("password", "")

    # ── Validation ──────────────────────────────────────────────────────
    if not full_name:
        return JsonResponse({"error": "Full name is required"}, status=400)

    if not email:
        return JsonResponse({"error": "Email is required"}, status=400)

    if not password:
        return JsonResponse({"error": "Password is required"}, status=400)

    if len(password) < 6:
        return JsonResponse(
            {"error": "Password must be at least 6 characters"},
            status=400,
        )

    # ── MongoDB collection ──────────────────────────────────────────────
    users_collection = settings.mongodb["users"]

    # ── Duplicate email check ───────────────────────────────────────────
    if users_collection.find_one({"email": email}):
        return JsonResponse(
            {"error": "Email already registered"},
            status=400,
        )

    # ── Create user document ────────────────────────────────────────────
    user_doc = {
        "full_name": full_name,
        "email": email,
        "password": make_password(password),
        "created_at": datetime.now(timezone.utc),
    }

    users_collection.insert_one(user_doc)

    # ── Success response ────────────────────────────────────────────────
    return JsonResponse(
        {
            "success": True,
            "message": "🎉 Account created successfully! Please login.",
            "user": {
                "full_name": full_name,
                "email": email,
            },
        },
        status=201,
    )
