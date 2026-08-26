from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

from .semantic_ai import (
    calculate_semantic_similarity,
    calculate_skill_semantic_similarity,
)

from .skill_intelligence import analyze_skill_gaps


# ---------------------------------------------------------
# Configuration
# ---------------------------------------------------------

TFIDF_WEIGHT = 0.30
SKILL_WEIGHT = 0.40
SEMANTIC_WEIGHT = 0.30


# ---------------------------------------------------------
# TF-IDF Text Similarity
# ---------------------------------------------------------

def calculate_tfidf_similarity(resume_text, job_description):
    """
    Calculate lexical similarity between a resume and
    job description using TF-IDF and cosine similarity.

    Returns a score between 0 and 100.
    """

    if not resume_text or not job_description:
        return 0.0

    documents = [
        resume_text,
        job_description,
    ]

    vectorizer = TfidfVectorizer(
        lowercase=True,
        stop_words="english",
        ngram_range=(1, 2),
    )

    tfidf_matrix = vectorizer.fit_transform(documents)

    similarity = cosine_similarity(
        tfidf_matrix[0:1],
        tfidf_matrix[1:2],
    )[0][0]

    return round(
        float(similarity * 100),
        2,
    )


# ---------------------------------------------------------
# Exact Skill Alignment
# ---------------------------------------------------------

def calculate_skill_alignment(
    resume_skills,
    job_skills,
):
    """
    Compare normalized resume skills with required
    job skills.

    Returns matched, missing and extra skills.
    """

    resume_set = {
        skill.lower().strip()
        for skill in resume_skills
        if skill and skill.strip()
    }

    job_set = {
        skill.lower().strip()
        for skill in job_skills
        if skill and skill.strip()
    }

    matched_skills = sorted(
        resume_set.intersection(job_set)
    )

    missing_skills = sorted(
        job_set.difference(resume_set)
    )

    extra_skills = sorted(
        resume_set.difference(job_set)
    )

    if job_set:
        skill_match_percentage = (
            len(matched_skills) / len(job_set)
        ) * 100
    else:
        skill_match_percentage = 0.0

    return {
        "matched_skills": matched_skills,
        "missing_skills": missing_skills,
        "extra_skills": extra_skills,
        "skill_match_percentage": round(
            skill_match_percentage,
            2,
        ),
    }


# ---------------------------------------------------------
# Hybrid AI Score
# ---------------------------------------------------------

def calculate_hybrid_score(
    tfidf_score,
    skill_match_percentage,
    semantic_score,
):
    """
    Combine three complementary signals:

    1. TF-IDF lexical similarity
    2. Explicit skill alignment
    3. Semantic similarity using Sentence Transformers

    Returns a score between 0 and 100.
    """

    score = (
        tfidf_score * TFIDF_WEIGHT
        + skill_match_percentage * SKILL_WEIGHT
        + semantic_score * SEMANTIC_WEIGHT
    )

    return round(
        min(max(score, 0.0), 100.0),
        2,
    )


# ---------------------------------------------------------
# Complete AI Matching Pipeline
# ---------------------------------------------------------

def match_resume_with_job(
    resume_text,
    job_description,
    resume_skills,
    job_skills,
):
    """
    Complete hybrid AI resume-to-job matching pipeline.

    Pipeline:

    Resume + Job Description
            ↓
        TF-IDF
            ↓
    Explicit Skill Matching
            ↓
    Semantic Similarity
            ↓
    Skill Intelligence
            ↓
    Hybrid Match Score
    """

    # -----------------------------------------------------
    # 1. TF-IDF similarity
    # -----------------------------------------------------

    tfidf_score = calculate_tfidf_similarity(
        resume_text,
        job_description,
    )

    # -----------------------------------------------------
    # 2. Explicit skill alignment
    # -----------------------------------------------------

    skill_alignment = calculate_skill_alignment(
        resume_skills,
        job_skills,
    )

    # -----------------------------------------------------
    # 3. Document-level semantic similarity
    # -----------------------------------------------------

    semantic_score = calculate_semantic_similarity(
        resume_text,
        job_description,
    )

    # -----------------------------------------------------
    # 4. Skill-level semantic similarity
    # -----------------------------------------------------

    skill_semantic_score = (
        calculate_skill_semantic_similarity(
            resume_skills,
            job_skills,
        )
    )

    # -----------------------------------------------------
    # 5. Hybrid final score
    # -----------------------------------------------------

    final_score = calculate_hybrid_score(
        tfidf_score,
        skill_alignment[
            "skill_match_percentage"
        ],
        semantic_score,
    )

    # -----------------------------------------------------
    # 6. Skill intelligence
    # -----------------------------------------------------

    skill_intelligence = analyze_skill_gaps(
        skill_alignment[
            "matched_skills"
        ],
        skill_alignment[
            "missing_skills"
        ],
    )

    # -----------------------------------------------------
    # 7. Final result
    # -----------------------------------------------------

    return {
        "tfidf_similarity": tfidf_score,

        "semantic_similarity": semantic_score,

        "skill_semantic_similarity":
            skill_semantic_score,

        "skill_match_percentage":
            skill_alignment[
                "skill_match_percentage"
            ],

        "matched_skills":
            skill_alignment[
                "matched_skills"
            ],

        "missing_skills":
            skill_alignment[
                "missing_skills"
            ],

        "extra_skills":
            skill_alignment[
                "extra_skills"
            ],

        "final_match_score": final_score,

        "skill_intelligence":
            skill_intelligence,
    }