from django.core.mail import send_mail
from django.conf import settings
import logging

logger = logging.getLogger(__name__)

def send_otp_email(email, otp_code, otp_type):
    """
    Sends an OTP code via email to the user using Django's SMTP backend.
    
    Arguments:
    - email: recipient email address
    - otp_code: the 6-digit numeric string
    - otp_type: 'registration', 'forgot_password', 'google_mfa', 'github_mfa'
    
    Returns:
    - True if email sent successfully, False otherwise.
    """
    # Define message subject and content based on otp_type
    if otp_type == 'registration':
        subject = "Verify your Skillora AI Account"
        message = (
            f"Hello,\n\n"
            f"Thank you for registering with Skillora AI.\n"
            f"Your account verification OTP code is: {otp_code}\n\n"
            f"This code will expire in 10 minutes. Please do not share this code with anyone.\n\n"
            f"Regards,\n"
            f"The Skillora AI Team"
        )
    elif otp_type == 'forgot_password':
        subject = "Reset your Skillora AI Password"
        message = (
            f"Hello,\n\n"
            f"We received a request to reset your password for Skillora AI.\n"
            f"Your verification code is: {otp_code}\n\n"
            f"This code will expire in 10 minutes. If you did not request this, you can safely ignore this email.\n\n"
            f"Regards,\n"
            f"The Skillora AI Team"
        )
    elif otp_type in ['google_mfa', 'github_mfa']:
        provider = "Google" if otp_type == 'google_mfa' else "GitHub"
        subject = f"Verify your {provider} Registration"
        message = (
            f"Hello,\n\n"
            f"To complete your registration via {provider}, please verify your identity.\n"
            f"Your OTP code is: {otp_code}\n\n"
            f"This code will expire in 10 minutes.\n\n"
            f"Regards,\n"
            f"The Skillora AI Team"
        )
    else:
        subject = "Skillora AI Security Code"
        message = f"Your verification code is: {otp_code}. It will expire in 10 minutes."

    try:
        # Use Django's send_mail helper
        # settings.EMAIL_HOST_USER is the sender
        send_mail(
            subject=subject,
            message=message,
            from_email=settings.EMAIL_HOST_USER,
            recipient_list=[email],
            fail_silently=False,
        )
        logger.info(f"OTP email sent successfully to {email} for type '{otp_type}'")
        return True, None
    except Exception as e:
        import traceback
        tb_str = traceback.format_exc()
        logger.error(f"Failed to send SMTP email to {email}: {str(e)}\nTraceback:\n{tb_str}")
        # Also print to stdout/stderr so it's guaranteed visible in the console
        print(f"SMTP ERROR: Failed to send OTP email to {email} ({str(e)})", flush=True)
        print(tb_str, flush=True)
        return False, str(e)
