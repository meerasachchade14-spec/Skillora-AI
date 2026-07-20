import os
import pymongo
from dotenv import load_dotenv
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent
load_dotenv(BASE_DIR / '.env')


def get_mongo_db():
    """
    Returns the pymongo database reference.
    Prefers MONGO_URI (for MongoDB Atlas / connection string) over
    individual MONGO_HOST / MONGO_PORT variables (for local MongoDB).
    """
    mongo_uri = os.getenv('MONGO_URI')
    db_name = os.getenv('MONGO_DB', 'skillora_ai')

    if mongo_uri:
        # Atlas or full connection string — extract db name from URI if present
        client = pymongo.MongoClient(mongo_uri)
    else:
        host = os.getenv('MONGO_HOST', 'localhost')
        port = int(os.getenv('MONGO_PORT', 27017))
        client = pymongo.MongoClient(host=host, port=port)

    return client[db_name]
