# ---------------------------------------------------------
# Personalized Learning Roadmap Engine
# ---------------------------------------------------------


SKILL_ROADMAPS = {
    "sql": {
        "estimated_duration": "2-4 weeks",
        "difficulty": "beginner",
        "topics": [
            "SQL Fundamentals",
            "SELECT and WHERE Queries",
            "ORDER BY and LIMIT",
            "Aggregate Functions",
            "GROUP BY and HAVING",
            "JOIN Operations",
            "Subqueries",
            "Database Practice Project",
        ],
    },

    "github": {
        "estimated_duration": "1-2 weeks",
        "difficulty": "beginner",
        "topics": [
            "Git and GitHub Basics",
            "Repositories",
            "Git Commit Workflow",
            "Branches",
            "Pull and Push Operations",
            "Pull Requests",
            "Merge Conflicts",
            "Collaborative Development",
        ],
    },

    "natural language processing": {
        "estimated_duration": "4-6 weeks",
        "difficulty": "intermediate",
        "topics": [
            "NLP Fundamentals",
            "Text Preprocessing",
            "Tokenization",
            "Stop Words and Lemmatization",
            "Named Entity Recognition",
            "Text Vectorization",
            "Word Embeddings",
            "spaCy",
            "Transformer Models",
            "NLP Project",
        ],
    },

    "machine learning": {
        "estimated_duration": "6-8 weeks",
        "difficulty": "intermediate",
        "topics": [
            "Machine Learning Fundamentals",
            "Supervised Learning",
            "Regression",
            "Classification",
            "Model Evaluation",
            "Feature Engineering",
            "Scikit-learn",
            "Machine Learning Project",
        ],
    },

    "python": {
        "estimated_duration": "4-6 weeks",
        "difficulty": "beginner",
        "topics": [
            "Python Fundamentals",
            "Variables and Data Types",
            "Conditional Statements",
            "Loops",
            "Functions",
            "Object-Oriented Programming",
            "File Handling",
            "Python Project",
        ],
    },

    "django": {
        "estimated_duration": "3-5 weeks",
        "difficulty": "intermediate",
        "topics": [
            "Django Fundamentals",
            "Project Structure",
            "Models",
            "Views",
            "URLs",
            "Django ORM",
            "Authentication",
            "REST APIs",
            "Django Project",
        ],
    },

    "react": {
        "estimated_duration": "4-6 weeks",
        "difficulty": "intermediate",
        "topics": [
            "React Fundamentals",
            "Components",
            "Props",
            "State",
            "Hooks",
            "React Router",
            "API Integration",
            "State Management",
            "React Project",
        ],
    },
}


DEFAULT_ROADMAP = {
    "estimated_duration": "2-4 weeks",
    "difficulty": "intermediate",
    "topics": [
        "Understand Fundamentals",
        "Learn Core Concepts",
        "Practice Exercises",
        "Build Small Projects",
        "Apply Skill in Real Projects",
    ],
}


def normalize_skill(skill):
    """
    Normalize skill names for consistent matching.
    """

    if not skill:
        return ""

    return skill.lower().strip()


def generate_learning_roadmap(
    skill_gap_analysis,
):
    """
    Generate a personalized learning roadmap
    based on missing skills and their priority.
    """

    missing_skills = skill_gap_analysis.get(
        "missing_skills",
        [],
    )

    roadmap = []

    for item in missing_skills:

        skill = normalize_skill(
            item.get("skill")
        )

        priority = item.get(
            "priority",
            "medium",
        )

        roadmap_data = SKILL_ROADMAPS.get(
            skill,
            DEFAULT_ROADMAP,
        )

        roadmap.append(
            {
                "skill": skill,
                "priority": priority,
                "difficulty": roadmap_data[
                    "difficulty"
                ],
                "estimated_duration": roadmap_data[
                    "estimated_duration"
                ],
                "topics": roadmap_data[
                    "topics"
                ],
            }
        )

    return {
        "roadmap": roadmap,
        "total_skills_to_learn": len(
            roadmap
        ),
    }