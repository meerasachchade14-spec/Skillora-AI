from django.urls import path
from apps.authentication.views import (
    RegisterView,
    VerifyOtpView,
    LoginView,
    SendOtpView,
    ForgotPasswordView,
    VerifyResetOtpView,
    ResetPasswordView,
    GoogleAuthView,
    GithubAuthView
)

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('verify-otp/', VerifyOtpView.as_view(), name='verify-otp'),
    path('login/', LoginView.as_view(), name='login'),
    path('send-otp/', SendOtpView.as_view(), name='send-otp'),
    path('forgot-password/', ForgotPasswordView.as_view(), name='forgot-password'),
    path('verify-reset-otp/', VerifyResetOtpView.as_view(), name='verify-reset-otp'),
    path('reset-password/', ResetPasswordView.as_view(), name='reset-password'),
    path('google/', GoogleAuthView.as_view(), name='google-auth'),
    path('github/', GithubAuthView.as_view(), name='github-auth'),
]
