# ---------------------------------------------------------
# Career Insights Engine
# ---------------------------------------------------------


def get_readiness_level(match_score):
    """
    Convert numerical match score into
    a human-readable job readiness level.
    """

    if match_score >= 85:
        return "Highly Ready"

    if match_score >= 70:
        return "Job Ready"

    if match_score >= 50:
        return "Developing"

    return "Needs Improvement"


def generate_strengths(
    matched_skills,
    skill_match_percentage,
):
    """
    Generate candidate strengths based on
    matched skills and skill alignment.
    """

    strengths = []

    if skill_match_percentage >= 70:
        strengths.append(
            "Strong alignment with the required technical skills."
        )

    elif skill_match_percentage >= 50:
        strengths.append(
            "Good foundation in several required technical skills."
        )

    else:
        strengths.append(
            "Has some relevant technical skills for the role."
        )

    if matched_skills:
        top_skills = matched_skills[:5]

        strengths.append(
            "Relevant skills include: "
            + ", ".join(top_skills)
            + "."
        )

    return strengths


def generate_improvement_areas(
    missing_skills,
):
    """
    Generate improvement areas from
    missing skill analysis.
    """

    improvements = []

    for skill_data in missing_skills:

        skill = skill_data.get(
            "skill",
            "",
        )

        priority = skill_data.get(
            "priority",
            "medium",
        )

        if skill:

            improvements.append(
                {
                    "skill": skill,
                    "priority": priority,
                    "recommendation":
                        f"Improve your knowledge of {skill}.",
                }
            )

    return improvements


def generate_career_recommendation(
    readiness_level,
    total_missing,
):
    """
    Generate a high-level career recommendation.
    """

    if readiness_level == "Highly Ready":

        return (
            "Your profile strongly matches this role. "
            "Focus on interview preparation and advanced projects."
        )

    if readiness_level == "Job Ready":

        return (
            "Your profile is well aligned with this role. "
            "Strengthen the remaining skill gaps and prepare "
            "for technical interviews."
        )

    if readiness_level == "Developing":

        return (
            "You have a good foundation but should focus on "
            "important missing skills to improve job readiness."
        )

    return (
        "Focus on building the core technical skills required "
        "for this role before applying."
    )


def generate_career_insights(
    match_score,
    matched_skills,
    skill_match_percentage,
    skill_gap_analysis,
):
    """
    Generate complete AI-powered career insights.

    Parameters:

    match_score:
        Final hybrid job match score.

    matched_skills:
        Skills matched between resume and job description.

    skill_match_percentage:
        Percentage of required skills matched.

    skill_gap_analysis:
        Output from analyze_skill_gaps().
    """

    readiness_level = get_readiness_level(
        match_score
    )

    strengths = generate_strengths(
        matched_skills,
        skill_match_percentage,
    )

    missing_skills = skill_gap_analysis.get(
        "missing_skills",
        [],
    )

    improvement_areas = generate_improvement_areas(
        missing_skills
    )

    total_missing = skill_gap_analysis.get(
        "total_missing",
        0,
    )

    recommendation = generate_career_recommendation(
        readiness_level,
        total_missing,
    )

    return {
        "match_score": match_score,

        "job_readiness":
            readiness_level,

        "strengths":
            strengths,

        "improvement_areas":
            improvement_areas,

        "career_recommendation":
            recommendation,

        "summary": {
            "matched_skills":
                len(matched_skills),

            "missing_skills":
                total_missing,

            "skill_match_percentage":
                skill_match_percentage,
        },
    }