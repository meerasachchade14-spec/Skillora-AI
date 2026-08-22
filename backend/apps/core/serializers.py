from rest_framework import serializers

class ResumeUploadSerializer(serializers.Serializer):
    file = serializers.FileField(required=True)

    def validate_file(self, value):
        # Allow PDF, Word (.doc, .docx), and plain text files
        allowed_extensions = ['.pdf', '.docx', '.doc', '.txt']
        filename = value.name.lower()
        if not any(filename.endswith(ext) for ext in allowed_extensions):
            raise serializers.ValidationError(
                "Unsupported file type. Only PDF, DOCX, DOC, and TXT files are allowed."
            )
        return value

class SkillMatchSerializer(serializers.Serializer):
    job_description = serializers.CharField(required=True, min_length=10)
    job_title = serializers.CharField(required=False, allow_blank=True, default="Target Job")

class RoadmapUpdateSerializer(serializers.Serializer):
    progress = serializers.IntegerField(min_value=0, max_value=100, required=False)
    steps = serializers.ListField(child=serializers.DictField(), required=False)
