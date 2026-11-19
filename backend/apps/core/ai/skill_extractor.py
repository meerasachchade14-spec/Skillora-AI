import re


# ---------------------------------------------------------
# Skill Taxonomy
# ---------------------------------------------------------

SKILL_TAXONOMY = {
    "Programming Languages": {
        "python": ["python", "python3", "python 3"],
        "java": ["java"],
        "c": ["c programming", "c language"],
        "c++": ["c++", "cpp"],
        "javascript": ["javascript", "js"],
        "typescript": ["typescript", "ts"],
    },

    "Web Development": {
        "html": ["html", "html5"],
        "css": ["css", "css3"],
        "react": ["react", "react.js", "reactjs"],
        "node.js": ["node.js", "nodejs", "node js"],
        "express.js": ["express.js", "expressjs", "express js"],
        "django": ["django"],
        "django rest framework": [
            "django rest framework",
            "django rest",
            "drf",
        ],
        "flask": ["flask"],
        "vue.js": ["vue.js", "vuejs", "vue js", "vue"],
        "responsive design": [
            "responsive design",
            "responsive web design",
        ],
        "bootstrap": ["bootstrap"],
        "webpack": ["webpack"],
        "vite": ["vite"],
    },

    "Databases": {
        "mysql": ["mysql"],
        "postgresql": ["postgresql", "postgres"],
        "mongodb": ["mongodb", "mongo db", "mongo"],
        "sql": ["sql"],
        "database management": [
            "database management",
            "database administration",
            "dba",
        ],
        "data modeling": [
            "data modeling",
            "data modelling",
            "db design",
            "database design",
        ],
        "query optimization": [
            "query optimization",
            "query optimisation",
            "sql optimization",
            "sql tuning",
        ],
        "indexing": ["indexing", "database indexing"],
    },

    "AI / Machine Learning": {
        "machine learning": [
            "machine learning",
            "machine-learning",
            "ml",
        ],
        "deep learning": [
            "deep learning",
            "deep-learning",
        ],
        "natural language processing": [
            "natural language processing",
            "nlp",
        ],
        "artificial intelligence": [
            "artificial intelligence",
            "ai",
        ],
        "scikit-learn": [
            "scikit-learn",
            "sklearn",
        ],
        "tensorflow": [
            "tensorflow",
        ],
        "pytorch": [
            "pytorch",
            "torch",
        ],
        "spacy": [
            "spacy",
            "spa cy",
        ],
    },

    "Data Science": {
        "numpy": ["numpy"],
        "pandas": ["pandas"],
        "matplotlib": ["matplotlib"],
        "data analysis": [
            "data analysis",
            "data analytics",
        ],
        "data visualization": [
            "data visualization",
            "data visualisation",
        ],
    },

    "Tools & Technologies": {
        "git": ["git"],
        "github": ["github"],
        "docker": ["docker"],
        "postman": ["postman"],
        "visual studio code": [
            "visual studio code",
            "vs code",
        ],
        "rest api": [
            "rest api",
            "restful api",
            "restful apis",
        ],
        "unit testing": [
            "unit testing",
            "unit tests",
            "pytest",
            "jest",
            "unittest",
        ],
        "linux": ["linux", "unix"],
        "figma": ["figma"],
        "redux": ["redux"],
        "transformers": [
            "transformers",
            "hugging face",
            "huggingface",
        ],
    },

    "Software Engineering": {
        "data structures": [
            "data structures",
            "data structure",
            "dsa",
        ],
        "algorithms": [
            "algorithms",
            "algorithm",
            "algorithmic",
        ],
        "object-oriented programming": [
            "object-oriented programming",
            "object oriented programming",
            "oop",
            "oops",
        ],
    },

    "Cloud & DevOps": {
        "aws": ["aws", "amazon web services"],
        "microsoft azure": [
            "azure",
            "microsoft azure",
        ],
        "google cloud": [
            "google cloud",
            "gcp",
        ],
        "ci/cd": [
            "ci/cd",
            "continuous integration",
            "continuous deployment",
        ],
    },
}


# ---------------------------------------------------------
# Text Normalization
# ---------------------------------------------------------

def normalize_text(text):
    """
    Normalize resume text before skill matching.
    """

    text = text.lower()

    # Normalize common separators
    text = text.replace("/", " ")
    text = text.replace("-", " ")

    # Remove unnecessary punctuation
    text = re.sub(r"[^\w\s+#.]", " ", text)

    # Normalize multiple spaces
    text = re.sub(r"\s+", " ", text)

    return text.strip()


# ---------------------------------------------------------
# Skill Extraction
# ---------------------------------------------------------

def extract_skills(text):
    """
    Extract normalized skills from resume text.

    Returns:
        {
            "skills": [...],
            "categories": {
                "category": [...]
            }
        }
    """

    normalized_text = normalize_text(text)

    extracted_skills = []
    categorized_skills = {}

    for category, skills in SKILL_TAXONOMY.items():

        category_matches = []

        for canonical_skill, variations in skills.items():

            for variation in variations:

                normalized_variation = normalize_text(variation)

                # Word-boundary matching prevents
                # accidental partial matches.
                pattern = r"(?<!\w)" + re.escape(
                    normalized_variation
                ) + r"(?!\w)"

                if re.search(pattern, normalized_text):

                    if canonical_skill not in extracted_skills:
                        extracted_skills.append(canonical_skill)

                    if canonical_skill not in category_matches:
                        category_matches.append(canonical_skill)

                    break

        if category_matches:
            categorized_skills[category] = sorted(category_matches)

    return {
        "skills": sorted(extracted_skills),
        "categories": categorized_skills,
    }