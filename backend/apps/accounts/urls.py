from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from .views import (
    RegisterView,
    VerifyOTPView,
    LoginView,
    ForgotPasswordView,
    ResetPasswordView,
    UserProfileView,
    RequestLoginOTPView,
    VerifyLoginOTPView
)

urlpatterns = [
    path('register/', RegisterView.as_view()),
    path('verify-otp/', VerifyOTPView.as_view()),
    path('login/', LoginView.as_view()),
    path('token/refresh/', TokenRefreshView.as_view()),
    path('forgot-password/', ForgotPasswordView.as_view()),
    path('reset-password/', ResetPasswordView.as_view()),
    path('profile/', UserProfileView.as_view()),
    
    # Passwordless OTP login routes
    path('login/request-otp', RequestLoginOTPView.as_view()),
    path('login/request-otp/', RequestLoginOTPView.as_view()),
    path('login/verify-otp', VerifyLoginOTPView.as_view()),
    path('login/verify-otp/', VerifyLoginOTPView.as_view()),
]