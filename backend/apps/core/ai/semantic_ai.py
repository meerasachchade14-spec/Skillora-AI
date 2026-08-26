from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity


# Load the embedding model once when the server starts.
# This model converts text into semantic vector representations.
model = SentenceTransformer("all-MiniLM-L6-v2")


def generate_embedding(text):
    """
    Convert text into a semantic embedding vector.
    """

    if not text or not text.strip():
        return None

    return model.encode(
        text,
        normalize_embeddings=True,
    )


def calculate_semantic_similarity(
    resume_text,
    job_description,
):
    """
    Calculate semantic similarity between a resume
    and a job description using Sentence Transformers.

    Returns a score between 0 and 100.
    """

    if not resume_text or not job_description:
        return 0.0

    resume_embedding = generate_embedding(
        resume_text
    )

    job_embedding = generate_embedding(
        job_description
    )

    similarity = cosine_similarity(
        [resume_embedding],
        [job_embedding],
    )[0][0]

    return round(
        float(similarity * 100),
        2,
    )


def calculate_skill_semantic_similarity(
    resume_skills,
    job_skills,
):
    """
    Compare resume skills and job skills using
    semantic embeddings.

    This helps identify conceptually similar skills
    instead of relying only on exact keyword matches.
    """

    if not resume_skills or not job_skills:
        return 0.0

    resume_embeddings = model.encode(
        resume_skills,
        normalize_embeddings=True,
    )

    job_embeddings = model.encode(
        job_skills,
        normalize_embeddings=True,
    )

    similarity_matrix = cosine_similarity(
        resume_embeddings,
        job_embeddings,
    )

    best_matches = similarity_matrix.max(
        axis=1
    )

    return round(
        float(best_matches.mean() * 100),
        2,
    )