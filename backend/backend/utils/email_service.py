from django.core.mail import send_mail
from django.conf import settings

def send_otp_email(email, otp):
    """
    Sends registration verification OTP via SMTP.
    """
    subject = "Skillora AI - Verify Your Account"
    html_message = f"""
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 12px;">
        <h2 style="color: #0284c7; text-align: center;">Welcome to Skillora AI!</h2>
        <p style="font-size: 16px; color: #334155;">Thank you for registering. Please verify your email address using the following One-Time Password (OTP):</p>
        <div style="background-color: #f0f9ff; border: 1px dashed #0284c7; padding: 15px; border-radius: 8px; text-align: center; margin: 20px 0;">
            <span style="font-size: 32px; font-weight: bold; letter-spacing: 4px; color: #0369a1;">{otp}</span>
        </div>
        <p style="font-size: 14px; color: #64748b;">This OTP code is valid for 10 minutes. If you did not register on Skillora AI, please ignore this email.</p>
        <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
        <p style="font-size: 12px; color: #94a3b8; text-align: center;">&copy; 2026 Skillora AI Team. All rights reserved.</p>
    </div>
    """
    plain_message = f"Welcome to Skillora AI!\n\nYour verification code is: {otp}\n\nThis OTP is valid for 10 minutes."
    
    try:
        send_mail(
            subject=subject,
            message=plain_message,
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=[email],
            html_message=html_message,
            fail_silently=False
        )
        print(f"[Email Service] OTP successfully sent to {email}")
        return True
    except Exception as e:
        print(f"[Email Service Error] Failed to send email to {email}: {e}")
        # Always output to console logs as fallback so the developer/user can find it if SMTP is not set up
        print(f"\n===========================================================")
        print(f"FALLBACK OTP LOG (Send from {settings.DEFAULT_FROM_EMAIL} to {email}): {otp}")
        print(f"===========================================================\n")
        return False

def send_password_reset_email(email, otp):
    """
    Sends password reset verification OTP via SMTP.
    """
    subject = "Skillora AI - Reset Your Password"
    html_message = f"""
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 12px;">
        <h2 style="color: #ea580c; text-align: center;">Reset Your Password</h2>
        <p style="font-size: 16px; color: #334155;">We received a request to reset your password. Use the following One-Time Password (OTP) code to complete the request:</p>
        <div style="background-color: #fff7ed; border: 1px dashed #ea580c; padding: 15px; border-radius: 8px; text-align: center; margin: 20px 0;">
            <span style="font-size: 32px; font-weight: bold; letter-spacing: 4px; color: #c2410c;">{otp}</span>
        </div>
        <p style="font-size: 14px; color: #64748b;">This OTP code is valid for 10 minutes. If you did not make this request, you can safely ignore this email.</p>
        <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
        <p style="font-size: 12px; color: #94a3b8; text-align: center;">&copy; 2026 Skillora AI Team. All rights reserved.</p>
    </div>
    """
    plain_message = f"Reset Your Password\n\nYour password reset code is: {otp}\n\nThis OTP is valid for 10 minutes."
    
    try:
        send_mail(
            subject=subject,
            message=plain_message,
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=[email],
            html_message=html_message,
            fail_silently=False
        )
        print(f"[Email Service] Password reset code successfully sent to {email}")
        return True
    except Exception as e:
        print(f"[Email Service Error] Failed to send password reset email to {email}: {e}")
        # Print fallback to console
        print(f"\n===========================================================")
        print(f"FALLBACK PASSWORD RESET OTP LOG (Send to {email}): {otp}")
        print(f"===========================================================\n")
        return False
