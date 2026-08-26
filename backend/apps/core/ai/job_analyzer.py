import re

from .skill_extractor import (
    SKILL_TAXONOMY,
    normalize_text,
)


# ---------------------------------------------------------
# Job Description Text Cleaning
# ---------------------------------------------------------

def clean_job_description(text):
    """
    Clean and normalize job-description text
    before analysis.
    """

    if not text:
        return ""

    text = text.strip()

    # Normalize common separators
    text = text.replace("\r\n", "\n")
    text = text.replace("\r", "\n")

    # Remove excessive whitespace
    text = re.sub(r"[ \t]+", " ", text)

    # Remove excessive blank lines
    text = re.sub(r"\n{3,}", "\n\n", text)

    return text.strip()


# ---------------------------------------------------------
# Skill Matching
# ---------------------------------------------------------

def _find_skills_in_text(text):
    """
    Find skills from the existing centralized
    skill taxonomy.

    Returns categorized skills.
    """

    normalized_text = normalize_text(text)

    extracted_skills = []
    categorized_skills = {}

    for category, skills in SKILL_TAXONOMY.items():

        category_matches = []

        for canonical_skill, variations in skills.items():

            for variation in variations:

                normalized_variation = normalize_text(
                    variation
                )

                pattern = (
                    r"(?<!\w)"
                    + re.escape(normalized_variation)
                    + r"(?!\w)"
                )

                if re.search(pattern, normalized_text):

                    if canonical_skill not in extracted_skills:
                        extracted_skills.append(
                            canonical_skill
                        )

                    if canonical_skill not in category_matches:
                        category_matches.append(
                            canonical_skill
                        )

                    break

        if category_matches:
            categorized_skills[category] = sorted(
                category_matches
            )

    return {
        "skills": sorted(extracted_skills),
        "categories": categorized_skills,
    }


# ---------------------------------------------------------
# Requirement Detection
# ---------------------------------------------------------

def extract_requirements(text):
    """
    Extract common requirement sections from a
    job description.

    This is intentionally rule-based at this stage.
    Later we can replace/augment it with NLP-based
    classification.
    """

    lines = [
        line.strip()
        for line in text.splitlines()
        if line.strip()
    ]

    requirement_keywords = [
        "requirements",
        "required skills",
        "qualifications",
        "skills required",
        "must have",
        "must-have",
        "preferred qualifications",
        "technical skills",
        "what we're looking for",
        "what we are looking for",
    ]

    requirement_lines = []

    capture = False

    for line in lines:

        normalized_line = line.lower().strip()

        # Start capturing when a requirement heading appears
        if any(
            keyword in normalized_line
            for keyword in requirement_keywords
        ):
            capture = True
            continue

        # Stop at common next sections
        if capture and any(
            section in normalized_line
            for section in [
                "responsibilities",
                "responsibility",
                "benefits",
                "about us",
                "about the company",
                "what you will do",
                "what you'll do",
            ]
        ):
            capture = False

        if capture:
            requirement_lines.append(line)

    return requirement_lines


# ---------------------------------------------------------
# Job Description Analyzer
# ---------------------------------------------------------

def analyze_job_description(text):
    """
    Analyze a complete job description.

    Returns a structured representation containing:

    - cleaned description
    - detected skills
    - categorized skills
    - requirement section
    - basic statistics
    """

    if not text or not text.strip():
        raise ValueError(
            "Job description cannot be empty."
        )

    cleaned_text = clean_job_description(text)

    skill_data = _find_skills_in_text(cleaned_text)

    requirement_lines = extract_requirements(
        cleaned_text
    )

    words = cleaned_text.split()

    return {
        "job_description": cleaned_text,

        "skills": skill_data["skills"],

        "skill_categories": skill_data["categories"],

        "requirements": requirement_lines,

        "statistics": {
            "word_count": len(words),
            "character_count": len(cleaned_text),
            "skill_count": len(skill_data["skills"]),
            "category_count": len(
                skill_data["categories"]
            ),
        },
    }