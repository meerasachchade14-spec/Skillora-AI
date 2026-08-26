import os
import fitz
import spacy
from docx import Document


# Load NLP model once when the server starts
nlp = spacy.load("en_core_web_sm")


def extract_text_from_pdf(file_path):
    """
    Extract text from a PDF resume.
    """
    text = []

    document = fitz.open(file_path)

    for page in document:
        page_text = page.get_text("text")

        if page_text:
            text.append(page_text)

    document.close()

    return "\n".join(text).strip()


def extract_text_from_docx(file_path):
    """
    Extract text from a DOCX resume.
    """
    document = Document(file_path)

    paragraphs = []

    for paragraph in document.paragraphs:
        if paragraph.text.strip():
            paragraphs.append(paragraph.text.strip())

    return "\n".join(paragraphs).strip()


def extract_text_from_txt(file_path):
    """
    Extract text from a TXT resume.
    """
    with open(file_path, "r", encoding="utf-8", errors="ignore") as file:
        return file.read().strip()


def extract_resume_text(file_path):
    """
    Detect resume format and extract readable text.
    """

    extension = os.path.splitext(file_path)[1].lower()

    if extension == ".pdf":
        return extract_text_from_pdf(file_path)

    if extension == ".docx":
        return extract_text_from_docx(file_path)

    if extension == ".txt":
        return extract_text_from_txt(file_path)

    raise ValueError(
        "Unsupported resume format. Only PDF, DOCX and TXT are supported."
    )


def preprocess_resume_text(text):
    """
    Basic NLP preprocessing using spaCy.
    """

    doc = nlp(text)

    cleaned_tokens = []

    for token in doc:
        if not token.is_space and not token.is_punct:
            cleaned_tokens.append(token.lemma_.lower())

    return " ".join(cleaned_tokens)