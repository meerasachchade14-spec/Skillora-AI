# ---------------------------------------------------------
# Job Role and Skill Taxonomy
# ---------------------------------------------------------
#
# A structured registry of fresher and entry-level job
# roles in software development, Python, web development,
# databases, and AI/ML.
#
# Each role defines:
#   - required_skills   : must-have skills for the role
#   - preferred_skills  : nice-to-have skills that
#                         strengthen a candidate's profile
#   - experience_level  : one of "fresher", "entry-level",
#                         or "junior"
#   - description       : concise, honest role summary
#
# This module is consumed by the skill-matching engine
# (matching_engine.py) and the job recommendations view
# (JobRecommendationsView) to surface relevant roles and
# generate targeted skill-gap advice.
# ---------------------------------------------------------


# ---------------------------------------------------------
# Domain Constants
# ---------------------------------------------------------

DOMAIN_SOFTWARE_DEVELOPMENT = "Software Development"
DOMAIN_PYTHON                = "Python"
DOMAIN_WEB_DEVELOPMENT       = "Web Development"
DOMAIN_DATABASES             = "Databases"
DOMAIN_AI_ML                 = "AI / Machine Learning"


# ---------------------------------------------------------
# Experience Level Constants
# ---------------------------------------------------------

LEVEL_FRESHER     = "fresher"       # 0 years; final-year / recent graduate
LEVEL_ENTRY       = "entry-level"   # 0-1 years; internship or first job
LEVEL_JUNIOR      = "junior"        # 1-2 years; some professional experience


# ---------------------------------------------------------
# Job Role Taxonomy
# ---------------------------------------------------------

JOB_ROLE_TAXONOMY = {

    # =========================================================
    # Software Development
    # =========================================================

    "junior software developer": {
        "domain": DOMAIN_SOFTWARE_DEVELOPMENT,
        "experience_level": LEVEL_JUNIOR,
        "description": (
            "Writes, reviews, and debugs code under the guidance of "
            "senior developers. Works across the full development lifecycle "
            "from understanding requirements and designing small modules to "
            "testing and deploying features. Expected to follow coding "
            "standards, contribute to code reviews, and continuously improve "
            "technical skills."
        ),
        "required_skills": [
            "python",
            "java",
            "javascript",
            "git",
            "data structures",
            "algorithms",
            "object-oriented programming",
            "sql",
            "rest api",
        ],
        "preferred_skills": [
            "typescript",
            "docker",
            "github",
            "unit testing",
            "linux",
            "ci/cd",
        ],
    },

    "software developer intern": {
        "domain": DOMAIN_SOFTWARE_DEVELOPMENT,
        "experience_level": LEVEL_FRESHER,
        "description": (
            "Assists the engineering team in feature development, bug fixes, "
            "and documentation. Gains hands-on experience with real codebases, "
            "version control workflows, and software development methodologies "
            "such as Agile and Scrum. A strong opportunity to convert academic "
            "knowledge into professional competence."
        ),
        "required_skills": [
            "python",
            "java",
            "javascript",
            "git",
            "object-oriented programming",
        ],
        "preferred_skills": [
            "sql",
            "html",
            "css",
            "rest api",
            "github",
            "data structures",
        ],
    },

    "junior backend developer": {
        "domain": DOMAIN_SOFTWARE_DEVELOPMENT,
        "experience_level": LEVEL_JUNIOR,
        "description": (
            "Designs and maintains server-side logic, APIs, and database "
            "interactions for web and mobile applications. Collaborates with "
            "frontend teams and DevOps engineers to deliver reliable, "
            "performant backend services."
        ),
        "required_skills": [
            "python",
            "java",
            "rest api",
            "sql",
            "git",
            "object-oriented programming",
        ],
        "preferred_skills": [
            "django",
            "node.js",
            "postgresql",
            "mongodb",
            "docker",
            "ci/cd",
        ],
    },

    "junior frontend developer": {
        "domain": DOMAIN_SOFTWARE_DEVELOPMENT,
        "experience_level": LEVEL_JUNIOR,
        "description": (
            "Builds accessible, responsive user interfaces using modern "
            "frontend frameworks. Works closely with UI/UX designers and "
            "backend engineers to deliver polished, production-ready web "
            "experiences."
        ),
        "required_skills": [
            "html",
            "css",
            "javascript",
            "react",
            "git",
            "rest api",
        ],
        "preferred_skills": [
            "typescript",
            "responsive design",
            "vue.js",
            "github",
            "unit testing",
            "webpack",
        ],
    },

    "junior full stack developer": {
        "domain": DOMAIN_SOFTWARE_DEVELOPMENT,
        "experience_level": LEVEL_JUNIOR,
        "description": (
            "Contributes to both frontend and backend layers of web "
            "applications. Understands how client and server components "
            "interact and can implement features end-to-end, from UI "
            "components to database queries and API integration."
        ),
        "required_skills": [
            "html",
            "css",
            "javascript",
            "react",
            "python",
            "sql",
            "rest api",
            "git",
        ],
        "preferred_skills": [
            "node.js",
            "django",
            "mongodb",
            "typescript",
            "docker",
            "github",
        ],
    },

    # =========================================================
    # Python
    # =========================================================

    "junior python developer": {
        "domain": DOMAIN_PYTHON,
        "experience_level": LEVEL_JUNIOR,
        "description": (
            "Develops Python-based applications and scripts for web services, "
            "automation, data processing, or backend APIs. Writes clean, "
            "idiomatic Python code, creates unit tests, and participates in "
            "code reviews following PEP 8 and project conventions."
        ),
        "required_skills": [
            "python",
            "object-oriented programming",
            "rest api",
            "sql",
            "git",
        ],
        "preferred_skills": [
            "django",
            "django rest framework",
            "flask",
            "postgresql",
            "docker",
            "unit testing",
            "github",
        ],
    },

    "python developer intern": {
        "domain": DOMAIN_PYTHON,
        "experience_level": LEVEL_FRESHER,
        "description": (
            "Assists in building Python scripts, automation tools, or backend "
            "modules under the mentorship of senior developers. Expected to "
            "demonstrate solid Python fundamentals, a willingness to learn "
            "frameworks, and the ability to write readable, documented code."
        ),
        "required_skills": [
            "python",
            "object-oriented programming",
            "git",
        ],
        "preferred_skills": [
            "sql",
            "rest api",
            "django",
            "flask",
            "github",
            "data structures",
        ],
    },

    "django developer": {
        "domain": DOMAIN_PYTHON,
        "experience_level": LEVEL_ENTRY,
        "description": (
            "Builds and maintains web applications using the Django framework. "
            "Implements models, views, URL configurations, and authentication "
            "flows. Works with the Django ORM for database interactions and "
            "may build REST APIs using Django REST Framework."
        ),
        "required_skills": [
            "python",
            "django",
            "sql",
            "rest api",
            "git",
            "object-oriented programming",
        ],
        "preferred_skills": [
            "django rest framework",
            "postgresql",
            "mongodb",
            "docker",
            "unit testing",
            "github",
        ],
    },

    "flask developer": {
        "domain": DOMAIN_PYTHON,
        "experience_level": LEVEL_ENTRY,
        "description": (
            "Builds lightweight REST APIs and microservices using Flask. "
            "Responsible for route definition, request handling, and "
            "integration with databases and third-party services. Comfortable "
            "working in a minimal-framework environment that demands "
            "deliberate architectural decisions."
        ),
        "required_skills": [
            "python",
            "flask",
            "rest api",
            "sql",
            "git",
        ],
        "preferred_skills": [
            "postgresql",
            "mongodb",
            "docker",
            "unit testing",
            "github",
            "object-oriented programming",
        ],
    },

    # =========================================================
    # Web Development
    # =========================================================

    "junior react developer": {
        "domain": DOMAIN_WEB_DEVELOPMENT,
        "experience_level": LEVEL_JUNIOR,
        "description": (
            "Develops interactive, component-based user interfaces using React. "
            "Implements state management, routing, and API integration. "
            "Writes reusable component libraries, follows accessibility "
            "standards, and collaborates with backend teams through REST APIs."
        ),
        "required_skills": [
            "react",
            "javascript",
            "html",
            "css",
            "git",
            "rest api",
        ],
        "preferred_skills": [
            "typescript",
            "redux",
            "responsive design",
            "unit testing",
            "github",
            "webpack",
            "vite",
        ],
    },

    "junior node.js developer": {
        "domain": DOMAIN_WEB_DEVELOPMENT,
        "experience_level": LEVEL_JUNIOR,
        "description": (
            "Builds server-side applications and REST APIs using Node.js and "
            "Express.js. Handles routing, middleware, authentication, and "
            "database integration. Works in an asynchronous, event-driven "
            "architecture and deploys services in containerised environments."
        ),
        "required_skills": [
            "node.js",
            "javascript",
            "rest api",
            "sql",
            "git",
        ],
        "preferred_skills": [
            "express.js",
            "mongodb",
            "typescript",
            "docker",
            "github",
            "unit testing",
        ],
    },

    "frontend developer intern": {
        "domain": DOMAIN_WEB_DEVELOPMENT,
        "experience_level": LEVEL_FRESHER,
        "description": (
            "Supports the frontend team in building and styling web pages. "
            "Converts UI/UX designs into functional HTML, CSS, and JavaScript "
            "components. Gains practical experience with version control, "
            "responsive design, and browser developer tools."
        ),
        "required_skills": [
            "html",
            "css",
            "javascript",
            "git",
        ],
        "preferred_skills": [
            "react",
            "responsive design",
            "github",
            "bootstrap",
            "figma",
        ],
    },

    "web developer intern": {
        "domain": DOMAIN_WEB_DEVELOPMENT,
        "experience_level": LEVEL_FRESHER,
        "description": (
            "Works on both frontend and backend tasks for web projects. "
            "Assists in developing web pages, consuming APIs, and writing "
            "basic server-side logic. Expected to rapidly learn the team's "
            "tech stack and contribute to production features within weeks."
        ),
        "required_skills": [
            "html",
            "css",
            "javascript",
            "git",
        ],
        "preferred_skills": [
            "python",
            "node.js",
            "sql",
            "react",
            "rest api",
            "github",
        ],
    },

    # =========================================================
    # Databases
    # =========================================================

    "junior database administrator": {
        "domain": DOMAIN_DATABASES,
        "experience_level": LEVEL_JUNIOR,
        "description": (
            "Assists in managing, optimising, and securing relational databases. "
            "Writes and tunes complex SQL queries, implements backup and "
            "recovery procedures, monitors database performance, and supports "
            "schema design decisions with the development team."
        ),
        "required_skills": [
            "sql",
            "mysql",
            "postgresql",
            "database management",
            "git",
        ],
        "preferred_skills": [
            "mongodb",
            "data modeling",
            "indexing",
            "query optimization",
            "python",
            "linux",
        ],
    },

    "junior data engineer": {
        "domain": DOMAIN_DATABASES,
        "experience_level": LEVEL_ENTRY,
        "description": (
            "Builds and maintains data pipelines that ingest, transform, and "
            "store data from various sources. Works with SQL and NoSQL "
            "databases, ensures data quality, and collaborates with data "
            "science and analytics teams to supply clean, reliable datasets."
        ),
        "required_skills": [
            "python",
            "sql",
            "postgresql",
            "git",
            "data analysis",
        ],
        "preferred_skills": [
            "mongodb",
            "pandas",
            "numpy",
            "docker",
            "aws",
            "data visualization",
            "github",
        ],
    },

    "sql developer intern": {
        "domain": DOMAIN_DATABASES,
        "experience_level": LEVEL_FRESHER,
        "description": (
            "Writes SQL queries, stored procedures, and reports under the "
            "supervision of senior database engineers. Gains exposure to "
            "database design principles, normalisation, and ETL concepts. "
            "Expected to have solid foundational SQL skills from coursework "
            "or personal projects."
        ),
        "required_skills": [
            "sql",
            "mysql",
            "git",
        ],
        "preferred_skills": [
            "postgresql",
            "data analysis",
            "python",
            "data visualization",
            "mongodb",
        ],
    },

    # =========================================================
    # AI / Machine Learning
    # =========================================================

    "junior machine learning engineer": {
        "domain": DOMAIN_AI_ML,
        "experience_level": LEVEL_JUNIOR,
        "description": (
            "Designs, trains, and evaluates machine learning models for "
            "classification, regression, or clustering tasks. Performs "
            "feature engineering, selects appropriate algorithms, monitors "
            "model performance in production, and iterates on model quality "
            "based on feedback and new data."
        ),
        "required_skills": [
            "python",
            "machine learning",
            "scikit-learn",
            "numpy",
            "pandas",
            "sql",
            "git",
        ],
        "preferred_skills": [
            "deep learning",
            "tensorflow",
            "pytorch",
            "natural language processing",
            "data visualization",
            "docker",
            "github",
        ],
    },

    "ai/ml intern": {
        "domain": DOMAIN_AI_ML,
        "experience_level": LEVEL_FRESHER,
        "description": (
            "Supports data preparation, model experimentation, and research "
            "tasks on AI/ML projects. Runs training scripts, tracks "
            "experiments, and helps document findings. Expected to have "
            "foundational knowledge in linear algebra, statistics, and "
            "basic machine learning concepts from academic coursework."
        ),
        "required_skills": [
            "python",
            "machine learning",
            "numpy",
            "pandas",
            "git",
        ],
        "preferred_skills": [
            "scikit-learn",
            "data visualization",
            "matplotlib",
            "natural language processing",
            "tensorflow",
            "github",
        ],
    },

    "junior data scientist": {
        "domain": DOMAIN_AI_ML,
        "experience_level": LEVEL_JUNIOR,
        "description": (
            "Applies statistical analysis, machine learning, and data "
            "visualisation techniques to extract actionable insights from "
            "structured and unstructured datasets. Collaborates with product "
            "and engineering teams to translate business questions into "
            "analytical solutions."
        ),
        "required_skills": [
            "python",
            "machine learning",
            "pandas",
            "numpy",
            "data analysis",
            "sql",
            "data visualization",
            "git",
        ],
        "preferred_skills": [
            "scikit-learn",
            "matplotlib",
            "natural language processing",
            "deep learning",
            "tensorflow",
            "github",
        ],
    },

    "nlp engineer intern": {
        "domain": DOMAIN_AI_ML,
        "experience_level": LEVEL_FRESHER,
        "description": (
            "Works on text preprocessing, embeddings, and NLP model "
            "experiments under the guidance of senior engineers. Tasks include "
            "building data pipelines for text corpora, fine-tuning pre-trained "
            "language models, and evaluating model outputs against benchmarks."
        ),
        "required_skills": [
            "python",
            "natural language processing",
            "machine learning",
            "numpy",
            "git",
        ],
        "preferred_skills": [
            "spacy",
            "transformers",
            "pytorch",
            "tensorflow",
            "pandas",
            "github",
        ],
    },

    "junior ai researcher": {
        "domain": DOMAIN_AI_ML,
        "experience_level": LEVEL_ENTRY,
        "description": (
            "Conducts literature reviews, implements research papers, and "
            "runs experiments to advance the organisation's AI capabilities. "
            "Contributes to proof-of-concept models, writes research reports, "
            "and presents findings to the team. A strong academic foundation "
            "in machine learning or related fields is essential."
        ),
        "required_skills": [
            "python",
            "machine learning",
            "deep learning",
            "numpy",
            "pandas",
            "git",
        ],
        "preferred_skills": [
            "pytorch",
            "tensorflow",
            "natural language processing",
            "data visualization",
            "scikit-learn",
            "github",
        ],
    },
}


# ---------------------------------------------------------
# Domain Index
# ---------------------------------------------------------

#  Pre-computed index: domain -> list of role keys
#  Used by JobRecommendationsView to filter by domain.

ROLES_BY_DOMAIN = {}

for _role_key, _role_data in JOB_ROLE_TAXONOMY.items():
    _domain = _role_data["domain"]
    ROLES_BY_DOMAIN.setdefault(_domain, []).append(_role_key)


# ---------------------------------------------------------
# Experience Index
# ---------------------------------------------------------

#  Pre-computed index: experience_level -> list of role keys

ROLES_BY_EXPERIENCE = {}

for _role_key, _role_data in JOB_ROLE_TAXONOMY.items():
    _level = _role_data["experience_level"]
    ROLES_BY_EXPERIENCE.setdefault(_level, []).append(_role_key)


# ---------------------------------------------------------
# Public API
# ---------------------------------------------------------

def get_role(role_key):
    """
    Return the taxonomy entry for a given role key.

    Parameters
    ----------
    role_key : str
        Lowercase role name as it appears in JOB_ROLE_TAXONOMY.

    Returns
    -------
    dict
        Full role entry, or an empty dict if not found.
    """
    return JOB_ROLE_TAXONOMY.get(role_key.lower().strip(), {})


def list_roles_by_domain(domain):
    """
    Return all role keys belonging to the given domain.

    Parameters
    ----------
    domain : str
        One of the DOMAIN_* constants defined above.

    Returns
    -------
    list[str]
        Sorted list of role keys.
    """
    return sorted(ROLES_BY_DOMAIN.get(domain, []))


def list_roles_by_experience(level):
    """
    Return all role keys at the given experience level.

    Parameters
    ----------
    level : str
        One of LEVEL_FRESHER, LEVEL_ENTRY, or LEVEL_JUNIOR.

    Returns
    -------
    list[str]
        Sorted list of role keys.
    """
    return sorted(ROLES_BY_EXPERIENCE.get(level, []))


def get_required_skills(role_key):
    """
    Return only the required skills for a role.
    """
    role = get_role(role_key)
    return role.get("required_skills", [])


def get_preferred_skills(role_key):
    """
    Return only the preferred skills for a role.
    """
    role = get_role(role_key)
    return role.get("preferred_skills", [])


def get_all_role_keys():
    """
    Return every role key registered in the taxonomy.
    """
    return sorted(JOB_ROLE_TAXONOMY.keys())


def match_roles_for_skills(candidate_skills):
    """
    Score every role in the taxonomy against a candidate's
    skill list and return roles sorted by match percentage.

    Uses required_skills for the match calculation.
    Preferred skills are surfaced as 'bonus_matches'.

    Parameters
    ----------
    candidate_skills : list[str]
        Normalised skill names from the candidate's resume.

    Returns
    -------
    list[dict]
        Each entry contains:
        {
            "role": str,
            "domain": str,
            "experience_level": str,
            "description": str,
            "required_match_pct": float,   # 0-100
            "matched_required": list[str],
            "missing_required": list[str],
            "bonus_matches": list[str],     # preferred skills also present
        }
    Sorted descending by required_match_pct.
    """
    candidate_set = {s.lower().strip() for s in candidate_skills if s}

    results = []

    for role_key, role_data in JOB_ROLE_TAXONOMY.items():

        required  = role_data.get("required_skills", [])
        preferred = role_data.get("preferred_skills", [])

        req_set  = {s.lower().strip() for s in required}
        pref_set = {s.lower().strip() for s in preferred}

        matched_req = sorted(req_set.intersection(candidate_set))
        missing_req = sorted(req_set.difference(candidate_set))
        bonus       = sorted(pref_set.intersection(candidate_set))

        match_pct = (
            round(len(matched_req) / len(req_set) * 100, 2)
            if req_set
            else 0.0
        )

        results.append({
            "role":               role_key,
            "domain":             role_data["domain"],
            "experience_level":   role_data["experience_level"],
            "description":        role_data["description"],
            "required_match_pct": match_pct,
            "matched_required":   matched_req,
            "missing_required":   missing_req,
            "bonus_matches":      bonus,
        })

    results.sort(
        key=lambda r: r["required_match_pct"],
        reverse=True,
    )

    return results
