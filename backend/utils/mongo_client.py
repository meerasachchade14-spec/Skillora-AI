import os
import pymongo
from dotenv import load_dotenv
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent
load_dotenv(BASE_DIR / '.env')

def get_mongo_db():
    """
    Returns the pymongo database reference.
    """
    host = os.getenv('MONGO_HOST', 'localhost')
    port = int(os.getenv('MONGO_PORT', 27017))
    db_name = os.getenv('MONGO_DB', 'skillora_ai')
    
    # Connect using pymongo
    client = pymongo.MongoClient(host=host, port=port)
    return client[db_name]
