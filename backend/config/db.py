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
        except Exception as e:
            logger.error(f"Error connecting to MongoDB: {str(e)}")
            raise e
            
    return _db

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
