# ---------------------------------------------------------
# Skill Intelligence Engine
# ---------------------------------------------------------

DEFAULT_SKILL_PRIORITIES = {
    "python": "high",
    "java": "high",
    "javascript": "high",
    "typescript": "high",
    "c++": "high",
    "django": "high",
    "django rest framework": "high",
    "react": "high",
    "node.js": "high",
    "sql": "high",
    "mongodb": "medium",
    "machine learning": "high",
    "natural language processing": "high",
    "deep learning": "high",
    "git": "medium",
    "github": "medium",
    "html": "medium",
    "css": "medium",
}


# ---------------------------------------------------------
# Skill Aliases
# ---------------------------------------------------------

SKILL_ALIASES = {
    "py": "python",
    "js": "javascript",
    "javascript es6": "javascript",
    "ts": "typescript",
    "node": "node.js",
    "nodejs": "node.js",
    "drf": "django rest framework",
    "django-rest-framework": "django rest framework",
    "mongo": "mongodb",
    "ml": "machine learning",
    "nlp": "natural language processing",
    "dl": "deep learning",
    "git hub": "github",
}


# ---------------------------------------------------------
# Skill Metadata
# ---------------------------------------------------------

SKILL_METADATA = {
    "python": {
        "category": "Programming Languages",
        "related_skills": ["django", "machine learning", "data analysis"],
        "learning_focus": (
            "Core Python, object-oriented programming, "
            "modules, APIs and practical development"
        ),
    },

    "javascript": {
        "category": "Programming Languages",
        "related_skills": ["react", "node.js", "html", "css"],
        "learning_focus": (
            "Modern JavaScript, ES6+, asynchronous programming "
            "and web application development"
        ),
    },

    "typescript": {
        "category": "Programming Languages",
        "related_skills": ["javascript", "react", "node.js"],
        "learning_focus": (
            "Type safety, interfaces, generics and "
            "large-scale JavaScript application development"
        ),
    },

    "java": {
        "category": "Programming Languages",
        "related_skills": ["spring", "sql", "object-oriented programming"],
        "learning_focus": (
            "Core Java, object-oriented programming, collections "
            "and backend application development"
        ),
    },

    "c++": {
        "category": "Programming Languages",
        "related_skills": ["data structures", "algorithms", "object-oriented programming"],
        "learning_focus": (
            "Object-oriented programming, STL, data structures "
            "and algorithmic problem solving"
        ),
    },

    "django": {
        "category": "Web Development",
        "related_skills": ["python", "django rest framework", "sql"],
        "learning_focus": (
            "Django architecture, models, views, authentication "
            "and production-ready backend development"
        ),
    },

    "django rest framework": {
        "category": "Web Development",
        "related_skills": ["django", "python", "rest api"],
        "learning_focus": (
            "REST API design, serializers, authentication, "
            "permissions and API integration"
        ),
    },

    "react": {
        "category": "Web Development",
        "related_skills": ["javascript", "typescript", "html", "css"],
        "learning_focus": (
            "Components, hooks, state management, routing "
            "and modern frontend application development"
        ),
    },

    "node.js": {
        "category": "Web Development",
        "related_skills": ["javascript", "express.js", "rest api"],
        "learning_focus": (
            "Server-side JavaScript, APIs, asynchronous programming "
            "and backend development"
        ),
    },

    "sql": {
        "category": "Databases",
        "related_skills": ["postgresql", "mysql", "database management"],
        "learning_focus": (
            "Queries, joins, aggregation, subqueries, "
            "transactions and database design"
        ),
    },

    "mongodb": {
        "category": "Databases",
        "related_skills": ["python", "node.js", "database management"],
        "learning_focus": (
            "Document databases, collections, queries, "
            "indexing and MongoDB application integration"
        ),
    },

    "machine learning": {
        "category": "AI / Machine Learning",
        "related_skills": [
            "python",
            "scikit-learn",
            "natural language processing",
        ],
        "learning_focus": (
            "Supervised and unsupervised learning, "
            "feature engineering, model evaluation and deployment"
        ),
    },

    "natural language processing": {
        "category": "AI / Machine Learning",
        "related_skills": [
            "python",
            "machine learning",
            "transformers",
        ],
        "learning_focus": (
            "Text preprocessing, embeddings, semantic similarity, "
            "text classification and language models"
        ),
    },

    "deep learning": {
        "category": "AI / Machine Learning",
        "related_skills": [
            "python",
            "machine learning",
            "neural networks",
        ],
        "learning_focus": (
            "Neural networks, representation learning, "
            "model training and deep learning architectures"
        ),
    },

    "git": {
        "category": "Tools & Technologies",
        "related_skills": ["github", "version control"],
        "learning_focus": (
            "Branches, commits, merging, rebasing "
            "and collaborative version control"
        ),
    },

    "github": {
        "category": "Tools & Technologies",
        "related_skills": ["git", "version control", "pull requests"],
        "learning_focus": (
            "Repositories, branches, pull requests, "
            "issues and collaborative Git workflows"
        ),
    },

    "html": {
        "category": "Web Development",
        "related_skills": ["css", "javascript", "accessibility"],
        "learning_focus": (
            "Semantic HTML, forms, accessibility "
            "and modern web structure"
        ),
    },

    "css": {
        "category": "Web Development",
        "related_skills": ["html", "javascript", "responsive design"],
        "learning_focus": (
            "Responsive layouts, Flexbox, Grid, "
            "animations and modern UI styling"
        ),
    },
}


# ---------------------------------------------------------
# Normalization
# ---------------------------------------------------------

def normalize_skill(skill):
    """
    Normalize a skill name for consistent comparison.
    """

    if not skill:
        return ""

    normalized = " ".join(
        str(skill).lower().strip().split()
    )

    return SKILL_ALIASES.get(
        normalized,
        normalized,
    )


# ---------------------------------------------------------
# Priority Classification
# ---------------------------------------------------------

def classify_skill_priority(skill):
    """
    Assign a baseline importance level to a skill.

    Priority levels:
    high
    medium
    low
    """

    normalized_skill = normalize_skill(skill)

    return DEFAULT_SKILL_PRIORITIES.get(
        normalized_skill,
        "medium",
    )


# ---------------------------------------------------------
# Skill Metadata
# ---------------------------------------------------------

def get_skill_metadata(skill):
    """
    Return metadata associated with a skill.
    """

    normalized_skill = normalize_skill(skill)

    metadata = SKILL_METADATA.get(
        normalized_skill,
        {},
    )

    return {
        "category": metadata.get(
            "category",
            "Other",
        ),
        "related_skills": metadata.get(
            "related_skills",
            [],
        ),
        "learning_focus": metadata.get(
            "learning_focus",
            (
                "Build practical knowledge through "
                "fundamentals, hands-on exercises "
                "and project-based learning"
            ),
        ),
    }


# ---------------------------------------------------------
# Missing Skill Analysis
# ---------------------------------------------------------

def analyze_missing_skill(skill):
    """
    Generate detailed intelligence for one missing skill.
    """

    normalized_skill = normalize_skill(skill)

    priority = classify_skill_priority(
        normalized_skill
    )

    metadata = get_skill_metadata(
        normalized_skill
    )

    return {
        "skill": normalized_skill,
        "priority": priority,
        "category": metadata["category"],
        "reason": (
            "This skill is required by the target "
            "job but was not detected in the resume."
        ),
        "related_skills": metadata[
            "related_skills"
        ],
        "learning_focus": metadata[
            "learning_focus"
        ],
    }


# ---------------------------------------------------------
# Skill Gap Analysis
# ---------------------------------------------------------

def analyze_skill_gaps(
    matched_skills,
    missing_skills,
):
    """
    Analyze matched and missing skills.

    Provides:
    - normalized skills
    - missing-skill priorities
    - skill categories
    - related skills
    - learning focus
    - summary statistics
    """

    matched = sorted(
        {
            normalize_skill(skill)
            for skill in matched_skills
            if normalize_skill(skill)
        }
    )

    missing = sorted(
        {
            normalize_skill(skill)
            for skill in missing_skills
            if normalize_skill(skill)
        }
    )

    prioritized_missing = [
        analyze_missing_skill(skill)
        for skill in missing
    ]

    priority_order = {
        "high": 0,
        "medium": 1,
        "low": 2,
    }

    prioritized_missing.sort(
        key=lambda item: (
            priority_order[
                item["priority"]
            ],
            item["skill"],
        )
    )

    high_priority_count = sum(
        1
        for item in prioritized_missing
        if item["priority"] == "high"
    )

    medium_priority_count = sum(
        1
        for item in prioritized_missing
        if item["priority"] == "medium"
    )

    low_priority_count = sum(
        1
        for item in prioritized_missing
        if item["priority"] == "low"
    )

    return {
        "matched_skills": matched,

        "missing_skills":
            prioritized_missing,

        "total_matched":
            len(matched),

        "total_missing":
            len(missing),

        "priority_summary": {
            "high": high_priority_count,
            "medium": medium_priority_count,
            "low": low_priority_count,
        },
    }