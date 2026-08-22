import pymongo
from django.conf import settings
import logging

logger = logging.getLogger(__name__)

# Cached connection variables
_mongo_client = None
_db = None

def get_db():
    """
    Returns the MongoDB database instance.
    Utilizes a singleton pattern to reuse the connection client.
    """
    global _mongo_client, _db
    if _db is None:
        try:
            uri = getattr(settings, 'MONGO_URI', 'mongodb://localhost:27017/')
            db_name = getattr(settings, 'MONGO_DB_NAME', 'skillora_ai')
            
            logger.info(f"Connecting to MongoDB database '{db_name}'...")
            _mongo_client = pymongo.MongoClient(uri, serverSelectionTimeoutMS=5000)
            
            # Trigger server selection to force verification of connection
            _mongo_client.server_info()
            
            _db = _mongo_client[db_name]
            logger.info("Successfully connected to MongoDB.")
            _ensure_admin_user(_db)
        except Exception as e:
            logger.error(f"Error connecting to MongoDB: {str(e)}")
            raise e
            
    return _db

def _ensure_admin_user(db):
    """
    Ensures that the default admin user exists in the database.
    """
    try:
        from django.contrib.auth.hashers import make_password
        from datetime import datetime
        
        admin_email = 'meera.ldrp.7@gmail.com'
        admin_user = db.users.find_one({'email': admin_email})
        
        if not admin_user:
            logger.info(f"Admin user '{admin_email}' not found. Seeding initial admin...")
            admin_doc = {
                'name': 'Admin Meera',
                'email': admin_email,
                'password': make_password('heyldrp'),
                'is_verified': True,
                'is_active': True,
                'role': 'Admin',
                'google_id': None,
                'github_id': None,
                'phone_number': None,
                'dob': None,
                'linkedin': '',
                'github': '',
                'bio': 'System Administrator',
                'education': {
                    'school': {'name': '', 'board': '', 'passing_year': '', 'percentage': ''},
                    'graduation': {'college': '', 'degree': '', 'branch': '', 'passing_year': '', 'cgpa_percentage': ''}
                },
                'experience': [],
                'projects': [],
                'skills': [],
                'resume': {},
                'certifications': [],
                'created_at': datetime.utcnow(),
                'updated_at': datetime.utcnow()
            }
            db.users.insert_one(admin_doc)
            logger.info("Successfully seeded default admin user.")
        else:
            # Ensure the admin user has the Admin role
            if admin_user.get('role') != 'Admin':
                logger.info(f"Ensuring user '{admin_email}' has 'Admin' role.")
                db.users.update_one({'_id': admin_user['_id']}, {'$set': {'role': 'Admin', 'updated_at': datetime.utcnow()}})
    except Exception as e:
        logger.error(f"Failed to ensure admin user: {str(e)}")

def check_db_connection():
    """
    Checks if the database is accessible.
    Returns True if connected, False otherwise.
    """
    try:
        db = get_db()
        db.command('ping')
        return True
    except Exception:
        return False
