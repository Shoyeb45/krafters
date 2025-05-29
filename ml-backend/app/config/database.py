# config/database.py
import os
import logging
from pymongo import MongoClient
from pymongo.errors import ConnectionFailure

logger = logging.getLogger(__name__)

# Global database variables
client = None
db = None
histories_collection = None

def init_database():
    """Initialize MongoDB connection and collections"""
    global client, db, histories_collection
    
    try:
        mongo_uri = os.getenv("MONGO_URI")
        if not mongo_uri:
            raise ValueError("MONGO_URI environment variable not found")
        
        client = MongoClient(mongo_uri, connectTimeoutMS=30000)
        
        # Test connection
        client.admin.command('ping')
        
        db = client['history']
        histories_collection = db['histories']
        
        logger.info("Connected to MongoDB Atlas successfully!")
        
    except ConnectionFailure as e:
        logger.error(f"Failed to connect to MongoDB: {e}")
        raise e
    except Exception as e:
        logger.error(f"Database initialization error: {e}")
        raise e

def get_database():
    """Get database instance"""
    global db
    if db is None:
        raise RuntimeError("Database not initialized. Call init_database() first.")
    return db

def get_histories_collection():
    """Get histories collection instance"""
    global histories_collection
    if histories_collection is None:
        raise RuntimeError("Database not initialized. Call init_database() first.")
    return histories_collection

def close_database():
    """Close database connection"""
    global client
    if client:
        client.close()
        logger.info("Database connection closed")