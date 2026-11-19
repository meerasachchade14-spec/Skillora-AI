from rest_framework import serializers

# ---------------------------------------------------------------------------
# File upload security constants
# ---------------------------------------------------------------------------
# Maximum allowed upload size: 10 MB
MAX_UPLOAD_SIZE = 10 * 1024 * 1024  # 10 MB in bytes

# Magic-byte signatures used to verify the actual file type regardless of
# the file extension the client sends.
# key: label used in error messages
# value: tuple of (byte_offset, expected_prefix_bytes)
_MIME_SIGNATURES = {
    'pdf':  (0, b'%PDF-'),
    'docx': (0, b'PK'),   # DOCX/XLSX/PPTX are ZIP archives (PK header)
    'doc':  (0, b'\xd0\xcf'),  # Compound Document File (legacy .doc)
}


class ResumeUploadSerializer(serializers.Serializer):
    file = serializers.FileField(required=True)

    def validate_file(self, value):
        # 1. Extension allowlist (PDF and DOCX only)
        allowed_extensions = ['.pdf', '.docx']
        filename = value.name.lower()
        if not any(filename.endswith(ext) for ext in allowed_extensions):
            raise serializers.ValidationError(
                "Unsupported file type. Only PDF and DOCX files are allowed."
            )

        # 2. File size cap (10 MB)
        if value.size > MAX_UPLOAD_SIZE:
            max_mb = MAX_UPLOAD_SIZE // (1024 * 1024)
            raise serializers.ValidationError(
                f"File too large. Maximum allowed size is {max_mb} MB "
                f"(uploaded: {value.size / (1024 * 1024):.1f} MB)."
            )

        # 3. MIME‑type validation via magic bytes
        try:
            header = value.read(8)
            value.seek(0)
        except Exception:
            raise serializers.ValidationError(
                "Could not read the uploaded file. Please try again."
            )

        # Determine acceptable signatures based on extension
        if filename.endswith('.pdf'):
            expected = [_MIME_SIGNATURES['pdf']]
        else:  # .docx
            expected = [_MIME_SIGNATURES['docx']]

        valid_magic = any(
            header[offset:offset + len(sig)] == sig
            for offset, sig in expected
        )
        if not valid_magic:
            raise serializers.ValidationError(
                "File content does not match its extension. Please upload a genuine PDF or DOCX document."
            )
        return value


class SkillMatchSerializer(serializers.Serializer):
    job_description = serializers.CharField(required=True, min_length=10)
    job_title = serializers.CharField(required=False, allow_blank=True, default="Target Job")

class RoadmapUpdateSerializer(serializers.Serializer):
    progress = serializers.IntegerField(min_value=0, max_value=100, required=False)
    steps = serializers.ListField(child=serializers.DictField(), required=False)

