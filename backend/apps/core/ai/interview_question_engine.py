# ---------------------------------------------------------
# Interview Question Generation Engine
# ---------------------------------------------------------
#
# Generates technical interview questions dynamically based
# on the candidate's actual resume skills and target job role.
#
# Strategy:
#   - Beginner   : Conceptual/definitional questions on skills
#                  the candidate already possesses (can they
#                  explain what they know?).
#   - Intermediate: Application / problem-solving questions
#                   that combine matched skills and role context.
#   - Advanced   : Architecture / design / gap-bridging questions
#                  targeting missing role-critical skills.
#
# No question is ever hardcoded. Every question is built by
# filling real skill names into category-aware parametric
# templates chosen by the skill's domain category.
# ---------------------------------------------------------

import random


# ---------------------------------------------------------
# Skill Category Mapping
# ---------------------------------------------------------
# Maps canonical skill names (lowercase) to their domain
# category, which selects the right question framework.

SKILL_CATEGORY_MAP = {
    # Programming Languages
    "python":       "programming_language",
    "java":         "programming_language",
    "javascript":   "programming_language",
    "typescript":   "programming_language",
    "c":            "programming_language",
    "c++":          "programming_language",

    # Web Development
    "html":                 "web_frontend",
    "css":                  "web_frontend",
    "react":                "web_frontend",
    "vue.js":               "web_frontend",
    "bootstrap":            "web_frontend",
    "responsive design":    "web_frontend",
    "redux":                "web_frontend",
    "webpack":              "web_frontend",
    "vite":                 "web_frontend",

    "node.js":              "web_backend",
    "express.js":           "web_backend",
    "django":               "web_backend",
    "django rest framework":"web_backend",
    "flask":                "web_backend",
    "rest api":             "web_backend",

    # Databases
    "sql":                  "database",
    "mysql":                "database",
    "postgresql":           "database",
    "mongodb":              "database",
    "database management":  "database",
    "data modeling":        "database",
    "query optimization":   "database",
    "indexing":             "database",

    # AI / ML
    "machine learning":             "ml",
    "deep learning":                "ml",
    "natural language processing":  "ml",
    "artificial intelligence":      "ml",
    "scikit-learn":                 "ml",
    "tensorflow":                   "ml",
    "pytorch":                      "ml",
    "spacy":                        "ml",

    # Data Science
    "numpy":                "data_science",
    "pandas":               "data_science",
    "matplotlib":           "data_science",
    "data analysis":        "data_science",
    "data visualization":   "data_science",

    # Software Engineering
    "data structures":              "cs_fundamentals",
    "algorithms":                   "cs_fundamentals",
    "object-oriented programming":  "cs_fundamentals",

    # Tools
    "git":          "devops_tools",
    "github":       "devops_tools",
    "docker":       "devops_tools",
    "linux":        "devops_tools",
    "ci/cd":        "devops_tools",
    "aws":          "devops_tools",
    "microsoft azure": "devops_tools",
    "google cloud": "devops_tools",
    "unit testing": "devops_tools",
    "postman":      "devops_tools",
}


# ---------------------------------------------------------
# Parametric Question Templates
# ---------------------------------------------------------
# Each category has templates for each difficulty level.
# `{skill}` is replaced with the actual skill name.
# `{role}` is replaced with the target job role.

QUESTION_TEMPLATES = {

    "programming_language": {
        "beginner": [
            "What are the key features of {skill} that make it suitable for software development?",
            "Explain the difference between mutable and immutable data types in {skill} with examples.",
            "How does {skill} handle memory management, and what are the implications for a {role}?",
            "What is the difference between compiled and interpreted execution, and how does {skill} fit in?",
            "Describe the basic data types available in {skill} and when you would use each.",
        ],
        "intermediate": [
            "How would you implement a caching layer in {skill} to optimize repeated function calls?",
            "Explain how concurrency or multithreading works in {skill}. What pitfalls should a {role} watch for?",
            "Describe how you would structure a {skill} project to follow clean architecture principles.",
            "What design patterns have you used in {skill}? Walk through a practical example.",
            "How would you handle error propagation and logging in a production {skill} application?",
        ],
        "advanced": [
            "Design a scalable task queue system using {skill}. What data structures and concurrency primitives would you choose?",
            "How would you profile and optimize a CPU-bound {skill} service experiencing high latency at scale?",
            "Describe a scenario where you would choose {skill} over another language for a {role} position, citing runtime, ecosystem, and performance trade-offs.",
            "Implement a thread-safe singleton pattern in {skill} and explain why naive implementations fail.",
            "How does the {skill} runtime handle garbage collection, and how can a {role} tune it for throughput-sensitive workloads?",
        ],
    },

    "web_frontend": {
        "beginner": [
            "What is {skill} and what problem does it solve in modern web development?",
            "Explain the component lifecycle in {skill}. When does each phase run?",
            "How does {skill} handle state management, and what are the basic patterns for sharing state?",
            "What is the difference between client-side rendering and server-side rendering, and how does {skill} relate to each?",
            "How would you make a UI built with {skill} accessible to users with disabilities?",
        ],
        "intermediate": [
            "How would you optimise render performance in a {skill} application with a large component tree?",
            "Describe how you would implement lazy loading and code splitting in a {skill} project.",
            "How does {skill} handle routing in a single-page application? What edge cases must a {role} handle?",
            "Explain how you would manage form validation and error display using {skill}.",
            "How would you implement real-time updates (e.g., live notifications) in a {skill} frontend?",
        ],
        "advanced": [
            "Design a micro-frontend architecture where {skill} is one of several independently deployed UIs.",
            "How would you implement a virtualised list in {skill} to handle rendering 100,000 rows without layout jank?",
            "Describe a strategy for A/B testing UI changes in a production {skill} application without a full redeployment.",
            "How would you structure a monorepo containing multiple {skill} packages with shared design tokens?",
            "Explain how you would diagnose and fix a memory leak in a long-running {skill} single-page application.",
        ],
    },

    "web_backend": {
        "beginner": [
            "What is {skill} and what role does it play in a typical web application stack?",
            "Explain the request/response lifecycle in {skill}. What happens between a client request and the server's response?",
            "How does {skill} handle routing, and how would a {role} define a RESTful endpoint?",
            "What is middleware in {skill}, and can you give an example of when you would write custom middleware?",
            "How does {skill} connect to a database, and what is the role of an ORM or query builder?",
        ],
        "intermediate": [
            "How would you implement JWT-based authentication in {skill}? Walk through the token validation flow.",
            "Describe how you would design a rate-limiting mechanism in {skill} to protect a public API.",
            "How does {skill} handle asynchronous operations, and when would a {role} use background tasks?",
            "Explain how you would version a REST API built with {skill} to avoid breaking existing clients.",
            "How would you structure {skill} for horizontal scaling behind a load balancer?",
        ],
        "advanced": [
            "Design an event-driven microservices architecture where {skill} handles one of the services. How do you ensure message ordering and idempotency?",
            "How would you implement distributed tracing across {skill} services, and what would you instrument?",
            "Describe a strategy for zero-downtime database migrations in a production {skill} application.",
            "How would you secure a {skill} API against OWASP Top 10 vulnerabilities as a {role}?",
            "Design a caching strategy for a high-read {skill} API: what cache layers would you add and when would you invalidate?",
        ],
    },

    "database": {
        "beginner": [
            "What is {skill}, and what are its primary use cases compared to other database systems?",
            "Explain the difference between primary keys, foreign keys, and indexes in {skill}.",
            "How would you write a basic SELECT query in {skill} to filter, sort, and paginate results?",
            "What is normalisation in database design, and why is it important for a {role}?",
            "Describe the ACID properties of transactions and how {skill} enforces them.",
        ],
        "intermediate": [
            "How would you optimise a slow query in {skill}? Walk through your diagnostic process.",
            "Explain the difference between INNER JOIN, LEFT JOIN, and FULL OUTER JOIN with a practical example in {skill}.",
            "How does {skill} handle indexing, and when can an index hurt rather than help performance?",
            "Describe a schema design you would use to store hierarchical data in {skill}.",
            "How would you implement database connection pooling in a {role} backend application using {skill}?",
        ],
        "advanced": [
            "Design a sharding strategy for a {skill} database that must handle 10 million writes per day.",
            "Explain the CAP theorem and how it applies when choosing between {skill} and an eventually consistent alternative.",
            "How would you implement optimistic locking in {skill} to handle concurrent updates without deadlocks?",
            "Describe how you would migrate a 500 GB {skill} table with zero downtime while the application is under load.",
            "How would a {role} implement a multi-tenant database architecture using {skill}, and what are the trade-offs of row-level vs schema-level isolation?",
        ],
    },

    "ml": {
        "beginner": [
            "What is {skill}, and what category of problems does it help solve?",
            "Explain the difference between supervised, unsupervised, and reinforcement learning. Where does {skill} fit?",
            "What is overfitting in a {skill} model, and how would you detect it?",
            "Describe the typical workflow for training a model using {skill}: data prep, training, and evaluation.",
            "What evaluation metrics would you choose for a classification task using {skill}, and why?",
        ],
        "intermediate": [
            "How would you use {skill} to implement cross-validation and hyperparameter tuning?",
            "Describe how you would handle class imbalance in a training dataset when using {skill}.",
            "Explain the bias-variance trade-off and how you would tune a {skill} model to balance it.",
            "How would you deploy a {skill} model as a REST API for use by a production application?",
            "Walk through how you would debug a {skill} model that is performing well on training data but poorly on validation data.",
        ],
        "advanced": [
            "Design an end-to-end MLOps pipeline for retraining and deploying {skill} models with zero downtime.",
            "How would you implement model explainability for a black-box {skill} model in a regulated industry?",
            "Describe how you would apply transfer learning using {skill} to a domain with limited labelled data.",
            "How would you architect a feature store for a team of {role}s sharing features across multiple {skill} models?",
            "Explain how you would monitor a production {skill} model for data drift and trigger automatic retraining.",
        ],
    },

    "data_science": {
        "beginner": [
            "What is {skill} and what are its primary functions in a data analysis workflow?",
            "How would you use {skill} to load, inspect, and clean a dataset with missing values?",
            "Explain how you would use {skill} to calculate summary statistics and identify outliers.",
            "What is the difference between a Series and a DataFrame in the context of {skill}?",
            "How would you use {skill} to create a basic visualisation that communicates a business insight?",
        ],
        "intermediate": [
            "How would you use {skill} to merge, reshape, and aggregate data from multiple sources?",
            "Describe how you would use {skill} to perform exploratory data analysis (EDA) before modelling.",
            "How would you handle time-series data using {skill}, including resampling and rolling windows?",
            "Explain how you would use {skill} to build a reproducible data preparation pipeline.",
            "How would you optimise a {skill} script processing a 10 GB CSV file that does not fit in memory?",
        ],
        "advanced": [
            "Design a scalable data processing architecture where {skill} is used as part of a distributed pipeline.",
            "How would you use {skill} to implement a custom feature engineering step for a machine learning model?",
            "Describe how you would benchmark and profile {skill} code to identify bottlenecks in a data pipeline.",
            "How would you implement incremental data processing with {skill} for a continuously updated dataset?",
            "Explain how a {role} would set up automated data quality checks using {skill} in a CI/CD pipeline.",
        ],
    },

    "cs_fundamentals": {
        "beginner": [
            "Explain what {skill} is and why it is important for a {role} to have a strong foundation in it.",
            "What is the difference between a stack and a queue, and when would you use each in the context of {skill}?",
            "Describe the time complexity of common operations (insert, search, delete) for the most frequently used data structures in {skill}.",
            "What is a recursion in {skill}, and how do you identify when it might lead to a stack overflow?",
            "Explain Big-O notation and how a {role} would use it to compare two algorithmic solutions.",
        ],
        "intermediate": [
            "How would you use {skill} to solve a graph traversal problem — when would you choose BFS over DFS?",
            "Describe how dynamic programming differs from greedy approaches in {skill}, and give an example of each.",
            "Implement and explain the time and space complexity of a binary search using {skill}.",
            "How would you apply {skill} to design an efficient caching mechanism with an LRU eviction policy?",
            "Explain how you would use {skill} to detect a cycle in a linked list.",
        ],
        "advanced": [
            "Design a system using {skill} that can process a stream of events and report the top-K most frequent items in O(1) query time.",
            "How would you apply advanced {skill} concepts to solve a distributed consensus problem?",
            "Describe how you would implement a persistent, copy-on-write data structure using {skill} principles.",
            "How would a {role} use {skill} to design an algorithm for optimally scheduling tasks with dependencies (topological sort + optimisation)?",
            "Explain how segment trees or Fenwick trees from {skill} can be applied to a real-world range query problem.",
        ],
    },

    "devops_tools": {
        "beginner": [
            "What is {skill} and what problem does it solve in a software development workflow?",
            "Explain the basic workflow of {skill}: how would a {role} use it on a day-to-day basis?",
            "What is the difference between {skill} and similar tools in the same category?",
            "How would you use {skill} to collaborate safely on a team project without overwriting each other's work?",
            "What are the most common commands or operations in {skill} that a {role} should know?",
        ],
        "intermediate": [
            "How would you set up a CI/CD pipeline using {skill} to automate testing and deployment?",
            "Describe how you would use {skill} to containerise a backend application and its dependencies.",
            "How does {skill} handle environment-specific configuration, and what are best practices for a {role}?",
            "Explain how you would use {skill} to perform a blue-green deployment with zero downtime.",
            "How would you debug a production issue using the observability features of {skill}?",
        ],
        "advanced": [
            "Design an infrastructure-as-code setup using {skill} for a multi-region, high-availability deployment.",
            "How would you implement secrets management in a {skill} pipeline without exposing credentials in logs or version control?",
            "Describe how you would orchestrate a multi-container application using {skill} and handle service discovery.",
            "Explain how a {role} would implement auto-scaling policies using {skill} based on custom business metrics.",
            "How would you migrate a monolithic application to microservices using {skill} incrementally, without taking the system offline?",
        ],
    },
}

# Default templates for skills not in any known category
DEFAULT_TEMPLATES = {
    "beginner": [
        "What is {skill} and what are its primary use cases for a {role}?",
        "How would you explain {skill} to a non-technical stakeholder?",
        "What are the fundamental concepts behind {skill} that every {role} should understand?",
    ],
    "intermediate": [
        "How have you applied {skill} to solve a real problem in a project? Walk through your approach.",
        "What are common pitfalls when working with {skill}, and how would you avoid them as a {role}?",
        "How would you integrate {skill} into an existing production system?",
    ],
    "advanced": [
        "Design a scalable architecture that leverages {skill} at its core. What are the key trade-offs?",
        "How would you evaluate the performance of a system built on {skill} and optimise it for scale?",
        "Describe the most complex challenge you have solved using {skill} and how you approached it as a {role}.",
    ],
}


# ---------------------------------------------------------
# Skill Category Lookup
# ---------------------------------------------------------

def get_skill_category(skill: str) -> str:
    """Return the domain category for a given skill name."""
    return SKILL_CATEGORY_MAP.get(skill.lower().strip(), "default")


# ---------------------------------------------------------
# Single-Skill Question Builder
# ---------------------------------------------------------

def build_questions_for_skill(
    skill: str,
    role: str,
    level: str,
    used_questions: set,
    n: int = 1,
) -> list:
    """
    Generate n unique questions for a single skill at the
    given difficulty level.

    Parameters
    ----------
    skill         : Canonical skill name (e.g. "python")
    role          : Target job role title
    level         : "beginner" | "intermediate" | "advanced"
    used_questions: Set of question texts already chosen
                    (prevents duplicates across skills)
    n             : Number of questions to generate

    Returns
    -------
    list of dicts with keys: question, skill, hint, level
    """
    category = get_skill_category(skill)
    templates = (
        QUESTION_TEMPLATES.get(category, DEFAULT_TEMPLATES)
        .get(level, DEFAULT_TEMPLATES[level])
    )

    # Shuffle so each call returns a different ordering
    pool = list(templates)
    random.shuffle(pool)

    results = []
    for template in pool:
        if len(results) >= n:
            break
        question_text = template.format(
            skill=skill.title(),
            role=role.title(),
        )
        if question_text not in used_questions:
            used_questions.add(question_text)
            results.append({
                "question": question_text,
                "skill":    skill.title(),
                "level":    level,
                "hint":     _build_hint(skill, level),
            })

    return results


# ---------------------------------------------------------
# Hint Builder
# ---------------------------------------------------------

HINT_LIBRARY = {
    "beginner": [
        "Focus on clear definitions and real-world analogies.",
        "Think about the core concept and a simple practical example.",
        "Explain as if teaching a junior colleague who is new to the topic.",
        "Use first principles — start from what problem this solves.",
    ],
    "intermediate": [
        "Walk through your reasoning step by step, not just the answer.",
        "Mention edge cases and how you would handle them.",
        "Reference a real project or scenario where you applied this.",
        "Consider performance implications and trade-offs.",
    ],
    "advanced": [
        "Think at system design scale — millions of users, distributed teams.",
        "Discuss monitoring, failure modes, and recovery strategies.",
        "Address both the technical solution and the organisational impact.",
        "Justify your design choices with concrete metrics or benchmarks.",
    ],
}


def _build_hint(skill: str, level: str) -> str:
    """Return a contextual answering hint for the question."""
    hints = HINT_LIBRARY.get(level, HINT_LIBRARY["intermediate"])
    return random.choice(hints)


# ---------------------------------------------------------
# Main Entry Point
# ---------------------------------------------------------

def generate_interview_questions(
    resume_skills: list,
    role_name: str,
    matched_skills: list,
    missing_skills: list,
    questions_per_level: int = 4,
) -> dict:
    """
    Generate a full set of interview questions across three
    difficulty levels, tailored to the candidate's skills
    and the target job role.

    Parameters
    ----------
    resume_skills       : All skills extracted from the resume
    role_name           : Target job role (e.g. "junior backend developer")
    matched_skills      : Skills that match the job requirements
    missing_skills      : Skills the candidate lacks for the role
    questions_per_level : How many questions to generate per level

    Returns
    -------
    {
        "role": str,
        "resume_skills_used": list,
        "beginner":     [ { question, skill, level, hint }, ... ],
        "intermediate": [ ... ],
        "advanced":     [ ... ],
        "summary": {
            "total_questions": int,
            "skills_covered":  int,
        }
    }
    """
    role_display = role_name.strip() or "Software Engineer"
    used_questions: set = set()

    # Normalise inputs
    matched = [s.lower().strip() for s in matched_skills if s]
    missing = [s.lower().strip() for s in missing_skills if s]
    resume  = [s.lower().strip() for s in resume_skills  if s]

    # -----------------------------------------------------------
    # BEGINNER — draw from skills the candidate already has
    # (matched skills first; fallback to all resume skills)
    # -----------------------------------------------------------
    beginner_pool = matched if matched else resume
    # Avoid an empty pool
    if not beginner_pool:
        beginner_pool = ["software development"]

    beginner_questions = _pick_questions(
        skill_pool=beginner_pool,
        level="beginner",
        role=role_display,
        used_questions=used_questions,
        total=questions_per_level,
    )

    # -----------------------------------------------------------
    # INTERMEDIATE — mix of matched and all resume skills
    # -----------------------------------------------------------
    intermediate_pool = list(dict.fromkeys(matched + resume))
    if not intermediate_pool:
        intermediate_pool = beginner_pool

    intermediate_questions = _pick_questions(
        skill_pool=intermediate_pool,
        level="intermediate",
        role=role_display,
        used_questions=used_questions,
        total=questions_per_level,
    )

    # -----------------------------------------------------------
    # ADVANCED — target missing skills (gap bridging) first,
    # then fall back to matched skills for broader coverage
    # -----------------------------------------------------------
    advanced_pool = list(dict.fromkeys(missing + matched))
    if not advanced_pool:
        advanced_pool = resume if resume else beginner_pool

    advanced_questions = _pick_questions(
        skill_pool=advanced_pool,
        level="advanced",
        role=role_display,
        used_questions=used_questions,
        total=questions_per_level,
    )

    all_skills_used = sorted({
        q["skill"].lower()
        for q in beginner_questions + intermediate_questions + advanced_questions
    })

    return {
        "role":               role_display,
        "resume_skills_used": [s.title() for s in (matched or resume)[:8]],
        "beginner":           beginner_questions,
        "intermediate":       intermediate_questions,
        "advanced":           advanced_questions,
        "summary": {
            "total_questions": (
                len(beginner_questions)
                + len(intermediate_questions)
                + len(advanced_questions)
            ),
            "skills_covered": len(all_skills_used),
        },
    }


# ---------------------------------------------------------
# Internal Helpers
# ---------------------------------------------------------

def _pick_questions(
    skill_pool: list,
    level: str,
    role: str,
    used_questions: set,
    total: int,
) -> list:
    """
    Distribute `total` questions across skills in `skill_pool`,
    picking at least one question per skill where possible.
    """
    questions = []
    # Rotate through skills to ensure variety
    pool = list(skill_pool)
    random.shuffle(pool)
    idx = 0

    while len(questions) < total and pool:
        skill = pool[idx % len(pool)]
        new_q = build_questions_for_skill(
            skill=skill,
            role=role,
            level=level,
            used_questions=used_questions,
            n=1,
        )
        if new_q:
            questions.extend(new_q)
        idx += 1
        # Safety: stop if we have exhausted all skills twice
        if idx >= len(pool) * 2 + total:
            break

    return questions[:total]
