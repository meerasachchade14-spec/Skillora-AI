import os
import zipfile
import xml.etree.ElementTree as ET
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404
import pypdf

from .models import Resume
from .serializers import ResumeSerializer

def extract_text_from_pdf(file_path):
    try:
        text = ""
        with open(file_path, 'rb') as f:
            reader = pypdf.PdfReader(f)
            for page in reader.pages:
                text += page.extract_text() or ""
        return text
    except Exception as e:
        print(f"PDF extraction error: {e}")
        return ""

def extract_text_from_docx(file_path):
    try:
        with zipfile.ZipFile(file_path) as docx:
            xml_content = docx.read('word/document.xml')
            root = ET.fromstring(xml_content)
            namespaces = {'w': 'http://schemas.openxmlformats.org/wordprocessingml/2006/main'}
            texts = [node.text for node in root.findall('.//w:t', namespaces) if node.text]
            return " ".join(texts)
    except Exception as e:
        print(f"DOCX extraction error: {e}")
        return ""

def extract_text(file_path):
    ext = file_path.split('.')[-1].lower()
    if ext == 'pdf':
        return extract_text_from_pdf(file_path)
    elif ext in ['doc', 'docx']:
        return extract_text_from_docx(file_path)
    return ""

class ResumeUploadView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        if 'resume_file' not in request.FILES:
            return Response({
                "success": False,
                "message": "No resume file provided."
            }, status=status.HTTP_400_BAD_REQUEST)

        title = request.data.get('title', request.FILES['resume_file'].name)
        serializer = ResumeSerializer(data={
            'title': title,
            'resume_file': request.FILES['resume_file']
        })

        if serializer.is_valid():
            resume = serializer.save(user=request.user)
            
            # Extract text
            file_path = resume.resume_file.path
            extracted = extract_text(file_path)
            resume.extracted_text = extracted
            resume.save()
            
            return Response({
                "success": True,
                "message": "Resume uploaded and text extracted successfully.",
                "data": ResumeSerializer(resume, context={"request": request}).data
            }, status=status.HTTP_201_CREATED)
            
        return Response({
            "success": False,
            "message": "Upload failed.",
            "errors": serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)

class ResumeListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        resumes = Resume.objects.filter(user=request.user).order_by('-uploaded_at')
        serializer = ResumeSerializer(resumes, many=True, context={"request": request})
        return Response({
            "success": True,
            "data": serializer.data
        }, status=status.HTTP_200_OK)

class ResumeDetailView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, pk):
        resume = get_object_or_404(Resume, id=pk, user=request.user)
        serializer = ResumeSerializer(resume, context={"request": request})
        return Response({
            "success": True,
            "data": serializer.data
        }, status=status.HTTP_200_OK)

    def delete(self, request, pk):
        resume = get_object_or_404(Resume, id=pk, user=request.user)
        
        # Delete file from storage
        if resume.resume_file and os.path.exists(resume.resume_file.path):
            try:
                os.remove(resume.resume_file.path)
            except Exception as e:
                print(f"Error deleting file from disk: {e}")
                
        resume.delete()
        return Response({
            "success": True,
            "message": "Resume deleted successfully."
        }, status=status.HTTP_200_OK)
