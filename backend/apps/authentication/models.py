from datetime import datetime

class MongoUser:
    """
    A lightweight user class that represents a MongoDB document.
    Mimics standard Django User attributes for seamless integration 
    with Django REST Framework authentication and permission classes.
    """
    def __init__(self, data):
        self.id = str(data.get('_id')) if '_id' in data else None
        self.name = data.get('name')
        self.email = data.get('email')
        self.password = data.get('password')
        self.is_verified = data.get('is_verified', False)
        
        # Social authentication fields
        self.google_id = data.get('google_id')
        self.github_id = data.get('github_id')
        self.phone_number = data.get('phone_number')
        
        # Timestamps
        self.created_at = data.get('created_at')
        self.updated_at = data.get('updated_at')

    @property
    def is_authenticated(self):
        """
        Always returns True for authenticated users.
        Required by DRF permissions like IsAuthenticated.
        """
        return True

    @property
    def pk(self):
        """
        Mimics Django's primary key attribute.
        """
        return self.id

    def to_dict(self):
        """
        Converts the user instance to a dictionary for MongoDB insertion/updates.
        """
        return {
            'name': self.name,
            'email': self.email,
            'password': self.password,
            'is_verified': self.is_verified,
            'google_id': self.google_id,
            'github_id': self.github_id,
            'phone_number': self.phone_number,
            'created_at': self.created_at or datetime.utcnow(),
            'updated_at': self.updated_at or datetime.utcnow()
        }

    def __str__(self):
        return f"{self.name} <{self.email}>"
