from rest_framework import serializers
from .models import Resume

class ResumeSerializer(serializers.ModelSerializer):
    filename = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Resume
        fields = ['id', 'user', 'title', 'resume_file', 'extracted_text', 'uploaded_at', 'filename']
        read_only_fields = ['id', 'user', 'extracted_text', 'uploaded_at']

    def get_filename(self, obj):
        if obj.resume_file:
            import os
            return os.path.basename(obj.resume_file.name)
        return ""
