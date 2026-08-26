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


def normalize_skill(skill):
    """
    Normalize a skill name for consistent comparison.
    """

    if not skill:
        return ""

    return skill.lower().strip()


def classify_skill_priority(skill):
    """
    Assign a default importance level to a skill.

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


def analyze_skill_gaps(
    matched_skills,
    missing_skills,
):
    """
    Analyze matched and missing skills and assign
    priority levels to missing skills.
    """

    matched = [
        normalize_skill(skill)
        for skill in matched_skills
        if skill
    ]

    missing = [
        normalize_skill(skill)
        for skill in missing_skills
        if skill
    ]

    prioritized_missing = []

    for skill in missing:
        priority = classify_skill_priority(skill)

        prioritized_missing.append(
            {
                "skill": skill,
                "priority": priority,
            }
        )

    priority_order = {
        "high": 0,
        "medium": 1,
        "low": 2,
    }

    prioritized_missing.sort(
        key=lambda item: priority_order[
            item["priority"]
        ]
    )

    return {
        "matched_skills": matched,
        "missing_skills": prioritized_missing,
        "total_matched": len(matched),
        "total_missing": len(missing),
    }