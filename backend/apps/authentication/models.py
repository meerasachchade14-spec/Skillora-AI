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
        self.is_active = data.get('is_active', True)
        
        # Social authentication fields
        self.google_id = data.get('google_id')
        self.github_id = data.get('github_id')
        self.phone_number = data.get('phone_number')
        
        # Profile fields
        self.dob = data.get('dob')
        self.linkedin = data.get('linkedin')
        self.github = data.get('github')
        self.bio = data.get('bio')
        self.role = data.get('role', 'Student')
        self.profile_picture = data.get('profile_picture')
        
        # Profile details list/dict
        self.education = data.get('education', {})
        self.experience = data.get('experience', [])
        self.projects = data.get('projects', [])
        self.skills = data.get('skills', [])
        self.resume = data.get('resume', {})
        self.certifications = data.get('certifications', [])
        
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
            'is_active': self.is_active,
            'google_id': self.google_id,
            'github_id': self.github_id,
            'phone_number': self.phone_number,
            'dob': self.dob,
            'linkedin': self.linkedin,
            'github': self.github,
            'bio': self.bio,
            'role': self.role,
            'profile_picture': self.profile_picture,
            'education': self.education,
            'experience': self.experience,
            'projects': self.projects,
            'skills': self.skills,
            'resume': self.resume,
            'certifications': self.certifications,
            'created_at': self.created_at or datetime.utcnow(),
            'updated_at': self.updated_at or datetime.utcnow()
        }

    def __str__(self):
        return f"{self.name} <{self.email}>"
