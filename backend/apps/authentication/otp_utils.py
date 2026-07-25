import random
import string
from datetime import datetime, timedelta
from config.db import get_db

def generate_otp_code(length=6):
    """
    Generates a secure 6-digit numeric OTP code.
    """
    return ''.join(random.choices(string.digits, k=length))

def can_request_otp(email, otp_type, limit_seconds=60):
    """
    Implements rate limiting for OTP requests.
    Checks the database to ensure at least `limit_seconds` have passed
    since the last OTP request of the same type for this email.
    
    Returns (True, 0) if allowed, or (False, seconds_remaining) if blocked.
    """
    db = get_db()
    
    # Query the last created OTP document for this email and type
    last_otp = db.otps.find_one(
        {'email': email, 'otp_type': otp_type},
        sort=[('created_at', -1)]
    )
    
    if last_otp:
        now = datetime.utcnow()
        created_at = last_otp.get('created_at')
        
        # Calculate time elapsed
        elapsed = (now - created_at).total_seconds()
        if elapsed < limit_seconds:
            remaining = int(limit_seconds - elapsed)
            return False, remaining
            
    return True, 0

def create_otp(email, otp_type, expiry_minutes=10):
    """
    Generates and saves a new OTP document to MongoDB.
    Returns the raw OTP code so it can be sent to the user.
    """
    db = get_db()
    
    # Generate 6 digit numeric code
    otp_code = generate_otp_code()
    
    # Calculate expiry
    expires_at = datetime.utcnow() + timedelta(minutes=expiry_minutes)
    
    # Construct OTP document
    otp_document = {
        'email': email,
        'otp_code': otp_code,
        'otp_type': otp_type,
        'expires_at': expires_at,
        'is_used': False,
        'created_at': datetime.utcnow()
    }
    
    # Insert to collection
    db.otps.insert_one(otp_document)
    
    return otp_code

def verify_otp_code(email, otp_code, otp_type):
    """
    Verifies the provided OTP code for a given email and type.
    Looks for a document where:
    - Email matches
    - OTP code matches
    - OTP type matches
    - is_used is False
    - expires_at is in the future
    
    If verified, sets `is_used` to True and returns True. Otherwise, returns False.
    """
    db = get_db()
    now = datetime.utcnow()
    
    # Query matching active OTP document
    otp_doc = db.otps.find_one({
        'email': email,
        'otp_code': otp_code,
        'otp_type': otp_type,
        'is_used': False,
        'expires_at': {'$gt': now}
    }, sort=[('created_at', -1)])  # Get the most recent matching one
    
    if otp_doc:
        # Invalidate OTP immediately upon successful verification
        db.otps.update_one(
            {'_id': otp_doc['_id']},
            {'$set': {'is_used': True}}
        )
        return True
        
    return False
