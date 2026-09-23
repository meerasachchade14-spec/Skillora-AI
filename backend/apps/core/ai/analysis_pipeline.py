# ---------------------------------------------------------
# Complete AI Analysis Pipeline
# ---------------------------------------------------------

from apps.core.ai.resume_parser import (
    extract_resume_text,
    preprocess_resume_text,
)

from apps.core.ai.skill_extractor import (
    extract_skills,
)

from apps.core.ai.job_analyzer import (
    analyze_job_description,
)

from apps.core.ai.matching_engine import (
    match_resume_with_job,
)

from apps.core.ai.skill_intelligence import (
    analyze_skill_gaps,
)

from apps.core.ai.career_insights import (
    generate_career_insights,
)

from apps.core.ai.learning_roadmap import (
    generate_learning_roadmap,
)


def analyze_resume_with_job(
    resume_file_path=None,
    job_description="",
    resume_text=None,
):
    """
    Complete AI-powered resume and job description
    analysis pipeline.

    Steps:

    1. Extract resume text
    2. Preprocess resume text
    3. Extract resume skills
    4. Analyze job description
    5. Match resume with job
    6. Analyze skill gaps
    7. Generate career insights
    8. Generate personalized learning roadmap
    """

    # -------------------------------------------------
    # Step 1: Extract Resume Text
    # -------------------------------------------------

    if not resume_text and resume_file_path:
        resume_text = extract_resume_text(
            resume_file_path
        )
        
    if not resume_text:
        resume_text = ""

    # -------------------------------------------------
    # Step 2: NLP Preprocessing
    # -------------------------------------------------

    processed_resume_text = (
        preprocess_resume_text(
            resume_text
        )
    )

    # -------------------------------------------------
    # Step 3: Extract Resume Skills
    # -------------------------------------------------

    resume_skills = extract_skills(
        resume_text
    )

    # -------------------------------------------------
    # Step 4: Analyze Job Description
    # -------------------------------------------------

    job_analysis = analyze_job_description(
        job_description
    )

    job_skills = job_analysis.get(
        "skills",
        [],
    )

    # -------------------------------------------------
    # Step 5: Resume-Job Matching
    # -------------------------------------------------

    matching_result = (
        match_resume_with_job(
            resume_text=processed_resume_text,
            job_description=job_description,
            resume_skills=resume_skills.get("skills", []),
            job_skills=job_skills,
        )
    )

    # -------------------------------------------------
    # Step 6: Skill Gap Analysis
    # -------------------------------------------------

    skill_gap_analysis = (
        analyze_skill_gaps(
            matched_skills=matching_result[
                "matched_skills"
            ],
            missing_skills=matching_result[
                "missing_skills"
            ],
        )
    )

    # -------------------------------------------------
    # Step 7: Career Insights
    # -------------------------------------------------

    career_insights = (
        generate_career_insights(
            match_score=matching_result[
                "final_match_score"
            ],
            matched_skills=matching_result[
                "matched_skills"
            ],
            skill_match_percentage=matching_result[
                "skill_match_percentage"
            ],
            skill_gap_analysis=skill_gap_analysis,
        )
    )

    # -------------------------------------------------
    # Step 8: Personalized Learning Roadmap
    # -------------------------------------------------

    learning_roadmap = (
        generate_learning_roadmap(
            skill_gap_analysis
        )
    )

    # -------------------------------------------------
    # Complete Result
    # -------------------------------------------------

    return {
        "resume_analysis": {
            "resume_text": resume_text,
            "processed_text": processed_resume_text,
            "skills": resume_skills,
        },

        "job_analysis": job_analysis,

        "matching_result": matching_result,

        "skill_gap_analysis": skill_gap_analysis,

        "career_insights": career_insights,

        "learning_roadmap": learning_roadmap,
    }