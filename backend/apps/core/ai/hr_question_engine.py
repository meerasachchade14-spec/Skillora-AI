# ---------------------------------------------------------
# HR & Behavioral Interview Question Engine
# ---------------------------------------------------------
#
# Generates HR / behavioral interview questions personalised
# to the candidate's actual resume: real project names,
# education details, experience titles, and target role.
#
# Design rules:
#   - Every question is built from a parametric template
#     filled with REAL resume fields — never hardcoded text.
#   - Each question ships with an ANSWER FRAMEWORK (STAR /
#     PAR / structured steps) so the candidate knows HOW
#     to answer — not a fabricated personal answer.
#   - Gracefully degrades when resume data is incomplete:
#     falls back to role-generic phrasing.
# ---------------------------------------------------------

import random


# ---------------------------------------------------------
# Answer Framework Definitions
# ---------------------------------------------------------
# Named frameworks returned verbatim to the frontend.

FRAMEWORKS = {
    "STAR": {
        "name": "STAR Framework",
        "steps": [
            "Situation — Set the scene: what was the context or challenge?",
            "Task — What was your specific responsibility or goal?",
            "Action — What concrete steps did YOU take? (Use 'I', not 'we')",
            "Result — What measurable outcome did you achieve?",
        ],
    },
    "PAR": {
        "name": "PAR Framework",
        "steps": [
            "Problem — Describe the specific problem or obstacle you faced.",
            "Action — Explain the exact steps you personally took to address it.",
            "Result — Share the tangible outcome and what you learned.",
        ],
    },
    "INTRO": {
        "name": "Structured Introduction",
        "steps": [
            "Present — Start with your current status (student / recent grad / role).",
            "Past — Briefly mention your most relevant education or experience.",
            "Projects — Highlight one key project or achievement.",
            "Future — Connect your background to why you want THIS role.",
        ],
    },
    "GOAL": {
        "name": "Career Goals Framework",
        "steps": [
            "Short-term — What do you want to achieve in the next 1–2 years?",
            "Long-term — Where do you see yourself in 5 years?",
            "Alignment — How does this role or company help you get there?",
        ],
    },
    "STRENGTH": {
        "name": "Strength Evidence Framework",
        "steps": [
            "Claim — Name the strength clearly and confidently.",
            "Evidence — Back it up with a specific, real example from your work.",
            "Relevance — Explain why this strength matters for the target role.",
        ],
    },
    "WEAKNESS": {
        "name": "Weakness Growth Framework",
        "steps": [
            "Honest gap — Name a real (non-critical) area you are improving.",
            "Awareness — Show you recognise the impact of this gap.",
            "Action — Describe the concrete steps you are taking to improve.",
            "Progress — Share any measurable improvement so far.",
        ],
    },
    "CONFLICT": {
        "name": "Conflict Resolution Framework",
        "steps": [
            "Context — Briefly describe the situation without blame.",
            "Your role — What was your responsibility and perspective?",
            "Steps taken — How did you initiate resolution constructively?",
            "Outcome — What was the result, and what did you learn about collaboration?",
        ],
    },
    "MOTIVATION": {
        "name": "Motivation Framework",
        "steps": [
            "Genuine interest — What genuinely excites you about this area?",
            "Evidence — Point to a project, course, or experience that shows the interest.",
            "Company fit — Connect your interest to what this company specifically does.",
        ],
    },
}


# ---------------------------------------------------------
# HR Question Categories & Templates
# ---------------------------------------------------------
# Templates use:
#   {name}      — candidate first name (or "you")
#   {role}      — target job role
#   {project}   — a real project title
#   {proj_tech} — technologies used in the project
#   {company}   — a real past company / internship
#   {exp_role}  — a real past job title
#   {degree}    — education degree
#   {field}     — field of study
#   {college}   — institution name
#   {skill}     — a top matched skill

HR_TEMPLATES = {

    # ── Self-Introduction ────────────────────────────────
    "self_introduction": {
        "label": "Self-Introduction",
        "emoji": "👋",
        "framework": "INTRO",
        "templates": [
            "Tell me about yourself and why you are interested in a {role} position.",
            "Walk me through your background and what makes you a strong candidate for this {role} role.",
            "Can you give me a brief introduction — your education, any projects, and what drew you to {role}?",
            "Introduce yourself: highlight the experience or project that best prepared you for this {role} role.",
            "Tell us who you are, what you have built, and why you are here interviewing for a {role} position.",
        ],
    },

    # ── Project Deep-Dive ────────────────────────────────
    "project_deepdive": {
        "label": "Project Deep-Dive",
        "emoji": "🛠️",
        "framework": "STAR",
        "templates": [
            "Walk me through your project '{project}'. What problem did it solve and what was your contribution?",
            "Tell me about the most challenging technical decision you made in '{project}' and why you made it.",
            "How did you approach testing and quality assurance in your project '{project}'?",
            "Describe a bug or unexpected problem you encountered in '{project}' and how you resolved it.",
            "If you could rebuild '{project}' from scratch today, what would you do differently and why?",
            "How did you decide which technologies to use for '{project}'? What trade-offs did you consider?",
            "What is the one feature of '{project}' you are most proud of, and what made it technically interesting?",
        ],
    },

    # ── Teamwork & Collaboration ─────────────────────────
    "teamwork": {
        "label": "Teamwork & Collaboration",
        "emoji": "🤝",
        "framework": "STAR",
        "templates": [
            "Describe a time you collaborated with others on a project. What was your role and how did you ensure the team stayed aligned?",
            "Tell me about a situation where you had to contribute to a shared codebase or group project. How did you manage version control and code quality?",
            "Have you ever worked with someone whose working style was very different from yours? How did you adapt?",
            "Describe a time you had to communicate a technical concept to a non-technical teammate or stakeholder.",
            "Tell me about a group project where the team faced a setback. What did you do to help the team move forward?",
            "How have you handled a situation where a team member was not contributing their fair share to a project?",
        ],
    },

    # ── Problem Solving ──────────────────────────────────
    "problem_solving": {
        "label": "Problem Solving",
        "emoji": "🧩",
        "framework": "PAR",
        "templates": [
            "Describe the most difficult technical problem you have faced in a project and how you solved it.",
            "Tell me about a time you had to learn a new technology quickly to complete a task. How did you approach it?",
            "Describe a situation where your initial solution did not work. What did you do next?",
            "Tell me about a time when you had to debug a complex issue under time pressure. Walk me through your process.",
            "Have you ever encountered a requirement that seemed technically impossible? How did you handle it?",
            "Describe a time you identified a problem in a project before it became critical. What did you do?",
        ],
    },

    # ── Strengths & Weaknesses ───────────────────────────
    "strengths_weaknesses": {
        "label": "Strengths & Weaknesses",
        "emoji": "⚖️",
        "framework_map": {
            "strength": "STRENGTH",
            "weakness": "WEAKNESS",
        },
        "templates": {
            "strength": [
                "What is your greatest technical strength as a {role}, and can you give a specific example of it in action?",
                "Which of your skills — such as {skill} — do you feel most confident applying on the job, and why?",
                "What do you think you bring to a {role} team that is genuinely hard to find?",
            ],
            "weakness": [
                "What is an area of your technical skill set that you are actively working to improve for a {role} role?",
                "Tell me about a skill gap you have identified in yourself and what you are doing about it.",
                "Is there a type of problem or task in software development that you find consistently challenging? How are you addressing it?",
            ],
        },
    },

    # ── Career Goals & Motivation ────────────────────────
    "career_goals": {
        "label": "Career Goals",
        "emoji": "🚀",
        "framework": "GOAL",
        "templates": [
            "Where do you see yourself in three to five years, and how does a {role} position fit into that path?",
            "What motivated you to pursue a career in software development, and what excites you most about the {role} field?",
            "Why do you want to work as a {role} specifically, rather than in another area of technology?",
            "How has your {degree} in {field} prepared you for the challenges of a {role} position?",
            "What kind of projects or problems do you hope to work on in your first year as a {role}?",
            "How do you plan to continue growing your skills beyond the requirements of a {role} role?",
        ],
    },

    # ── Conflict & Communication ─────────────────────────
    "conflict_communication": {
        "label": "Conflict & Communication",
        "emoji": "💬",
        "framework": "CONFLICT",
        "templates": [
            "Describe a time when you disagreed with a technical decision made by a team lead or peer. How did you handle it?",
            "Tell me about a time you had to give constructive feedback to a colleague. How did you approach it?",
            "Have you ever had a conflict with a teammate over how to implement a feature? How was it resolved?",
            "Describe a situation where miscommunication caused a problem in a project. What did you learn from it?",
            "Tell me about a time you had to persuade someone to adopt your technical approach. What was the outcome?",
        ],
    },

    # ── Work Ethic & Adaptability ────────────────────────
    "work_ethic": {
        "label": "Work Ethic & Adaptability",
        "emoji": "⚡",
        "framework": "STAR",
        "templates": [
            "Tell me about a time you had to manage multiple tasks or deadlines simultaneously. How did you prioritise?",
            "Describe a situation where project requirements changed significantly mid-way. How did you adapt?",
            "Tell me about a time you went beyond what was expected to deliver a project or assignment.",
            "How do you stay motivated when working on a long or repetitive task?",
            "Describe a time you received critical feedback on your work. What did you do with it?",
            "Tell me about a time you had to work independently without clear instructions. How did you manage?",
        ],
    },

    # ── Company & Role Fit ───────────────────────────────
    "company_fit": {
        "label": "Company & Role Fit",
        "emoji": "🏢",
        "framework": "MOTIVATION",
        "templates": [
            "Why are you interested in this {role} position specifically, and what do you know about the company?",
            "What do you look for in a team or company culture as a {role}?",
            "How does this {role} position align with your skills in {skill} and your career aspirations?",
            "What questions do you have for us about the day-to-day work of a {role} here?",
            "What is the most important thing you hope to learn in your first three months as a {role}?",
        ],
    },
}


# ---------------------------------------------------------
# Context Extraction Helpers
# ---------------------------------------------------------

def _first_name(full_name: str) -> str:
    """Return the first word of a name, or 'you' if empty."""
    parts = (full_name or "").strip().split()
    return parts[0] if parts else "you"


def _safe(value, fallback: str = "") -> str:
    """Return stripped string or fallback."""
    v = (value or "").strip()
    return v if v else fallback


def _extract_project_context(projects: list) -> list:
    """
    Return a list of dicts {title, tech} from the resume projects list.
    Works with both resumeData schema and plain dicts.
    """
    out = []
    for p in (projects or []):
        if not isinstance(p, dict):
            continue
        title = _safe(
            p.get("title") or p.get("name"),
            "your project",
        )
        tech_raw = p.get("technologies") or p.get("techStack") or ""
        if isinstance(tech_raw, list):
            tech_raw = ", ".join(tech_raw)
        tech = _safe(tech_raw, "your chosen technologies")
        out.append({"title": title, "tech": tech})
    return out


def _extract_education_context(education: list) -> dict:
    """Return {degree, field, college} from the first education entry."""
    for edu in (education or []):
        if not isinstance(edu, dict):
            continue
        degree = _safe(edu.get("degree"), "your degree")
        field  = _safe(
            edu.get("fieldOfStudy") or edu.get("branch"),
            "your field",
        )
        college = _safe(
            edu.get("college") or edu.get("school") or edu.get("institution"),
            "your university",
        )
        return {"degree": degree, "field": field, "college": college}
    return {"degree": "your degree", "field": "your field", "college": "your university"}


def _extract_experience_context(experience: list) -> list:
    """Return [{exp_role, company}] from resume experience entries."""
    out = []
    for exp in (experience or []):
        if not isinstance(exp, dict):
            continue
        exp_role = _safe(
            exp.get("role") or exp.get("position"),
            "your previous role",
        )
        company = _safe(exp.get("company"), "your previous company")
        out.append({"exp_role": exp_role, "company": company})
    return out


# ---------------------------------------------------------
# Template Filler
# ---------------------------------------------------------

def _fill(template: str, ctx: dict) -> str:
    """
    Fill {placeholders} in a template using ctx dict.
    Any missing key is replaced with a sensible default.
    """
    defaults = {
        "name":      "you",
        "role":      "Software Engineer",
        "project":   "your main project",
        "proj_tech": "your chosen stack",
        "company":   "your previous company",
        "exp_role":  "your previous role",
        "degree":    "your degree",
        "field":     "your field of study",
        "college":   "your university",
        "skill":     "your primary skill",
    }
    merged = {**defaults, **ctx}
    # Safe format — ignore extra keys
    try:
        return template.format(**merged)
    except KeyError:
        # Fallback: replace each placeholder individually
        result = template
        for k, v in merged.items():
            result = result.replace(f"{{{k}}}", str(v))
        return result


# ---------------------------------------------------------
# Main Entry Point
# ---------------------------------------------------------

def generate_hr_questions(
    role_name: str,
    personal: dict,
    projects: list,
    education: list,
    experience: list,
    matched_skills: list,
    questions_per_category: int = 2,
) -> dict:
    """
    Generate personalised HR & behavioral interview questions.

    Parameters
    ----------
    role_name             : Target job role title
    personal              : resumeData["personal"] dict (name, summary, etc.)
    projects              : resumeData["projects"] list
    education             : resumeData["education"] list
    experience            : resumeData["experience"] list
    matched_skills        : Skills matched to the role (from technical pipeline)
    questions_per_category: How many questions to pick per HR category

    Returns
    -------
    {
        "role": str,
        "resume_context": { name, top_project, education, top_skill },
        "questions": [
            {
                "question":         str,
                "category":         str,
                "category_emoji":   str,
                "answer_framework":  { name, steps },
                "context_used":     str,
            },
            ...
        ],
        "total": int,
    }
    """
    role_display = (role_name or "Software Engineer").strip()

    # ── Build context dicts ──────────────────────────────
    name       = _first_name((personal or {}).get("fullName") or "")
    edu_ctx    = _extract_education_context(education)
    proj_list  = _extract_project_context(projects)
    exp_list   = _extract_experience_context(experience)
    top_skill  = matched_skills[0].title() if matched_skills else "your primary skill"

    # Base context used by all templates
    base_ctx = {
        "name":    name,
        "role":    role_display,
        "degree":  edu_ctx["degree"],
        "field":   edu_ctx["field"],
        "college": edu_ctx["college"],
        "skill":   top_skill,
    }

    # Project-specific context (cycle through projects for variety)
    proj_ctxs = proj_list or [{"title": "your main project", "tech": "your chosen stack"}]

    # Experience-specific context
    exp_ctxs = exp_list or [{"exp_role": "your previous role", "company": "your previous company"}]

    questions = []
    used_texts: set = set()

    # ── 1. Self-Introduction ─────────────────────────────
    _add_from_category(
        category_key="self_introduction",
        ctx=base_ctx,
        n=min(questions_per_category, 2),
        questions=questions,
        used=used_texts,
    )

    # ── 2. Project Deep-Dives ────────────────────────────
    _add_project_questions(
        proj_ctxs=proj_ctxs,
        base_ctx=base_ctx,
        n=min(questions_per_category + 1, 3),
        questions=questions,
        used=used_texts,
    )

    # ── 3. Teamwork ──────────────────────────────────────
    _add_from_category(
        category_key="teamwork",
        ctx=base_ctx,
        n=questions_per_category,
        questions=questions,
        used=used_texts,
    )

    # ── 4. Problem Solving ───────────────────────────────
    _add_from_category(
        category_key="problem_solving",
        ctx=base_ctx,
        n=questions_per_category,
        questions=questions,
        used=used_texts,
    )

    # ── 5. Strengths & Weaknesses ────────────────────────
    _add_strength_weakness_questions(
        base_ctx=base_ctx,
        n=questions_per_category,
        questions=questions,
        used=used_texts,
    )

    # ── 6. Career Goals ──────────────────────────────────
    _add_from_category(
        category_key="career_goals",
        ctx=base_ctx,
        n=questions_per_category,
        questions=questions,
        used=used_texts,
    )

    # ── 7. Conflict & Communication ──────────────────────
    _add_from_category(
        category_key="conflict_communication",
        ctx=base_ctx,
        n=questions_per_category,
        questions=questions,
        used=used_texts,
    )

    # ── 8. Work Ethic ────────────────────────────────────
    _add_from_category(
        category_key="work_ethic",
        ctx=base_ctx,
        n=questions_per_category,
        questions=questions,
        used=used_texts,
    )

    # ── 9. Company & Role Fit ────────────────────────────
    _add_from_category(
        category_key="company_fit",
        ctx=base_ctx,
        n=questions_per_category,
        questions=questions,
        used=used_texts,
    )

    # ── Build resume_context summary for the frontend ────
    resume_context = {
        "name":        name if name != "you" else None,
        "top_project": proj_ctxs[0]["title"] if proj_list else None,
        "education":   f"{edu_ctx['degree']} in {edu_ctx['field']}" if edu_ctx["field"] != "your field" else None,
        "top_skill":   top_skill,
    }

    return {
        "role":           role_display,
        "resume_context": resume_context,
        "questions":      questions,
        "total":          len(questions),
    }


# ---------------------------------------------------------
# Internal Helpers
# ---------------------------------------------------------

def _build_question_entry(
    question_text: str,
    category_key: str,
    framework_key: str,
    context_used: str,
) -> dict:
    """Assemble a single HR question dict."""
    cat_cfg = HR_TEMPLATES[category_key]
    fw      = FRAMEWORKS[framework_key]
    return {
        "question":       question_text,
        "category":       cat_cfg["label"],
        "category_emoji": cat_cfg.get("emoji", "💬"),
        "answer_framework": {
            "name":  fw["name"],
            "steps": fw["steps"],
        },
        "context_used": context_used,
    }


def _add_from_category(
    category_key: str,
    ctx: dict,
    n: int,
    questions: list,
    used: set,
) -> None:
    """Pick n unique questions from a simple (non-split) category."""
    cat = HR_TEMPLATES[category_key]
    templates = list(cat["templates"])
    random.shuffle(templates)
    fw_key = cat["framework"]

    added = 0
    for tmpl in templates:
        if added >= n:
            break
        text = _fill(tmpl, ctx)
        if text not in used:
            used.add(text)
            questions.append(
                _build_question_entry(
                    question_text=text,
                    category_key=category_key,
                    framework_key=fw_key,
                    context_used=f"role: {ctx.get('role', 'Software Engineer')}",
                )
            )
            added += 1


def _add_project_questions(
    proj_ctxs: list,
    base_ctx: dict,
    n: int,
    questions: list,
    used: set,
) -> None:
    """
    Pick project deep-dive questions, cycling through real projects
    so each question references a different project where possible.
    """
    templates = list(HR_TEMPLATES["project_deepdive"]["templates"])
    random.shuffle(templates)

    added = 0
    proj_idx = 0
    for tmpl in templates:
        if added >= n:
            break
        proj = proj_ctxs[proj_idx % len(proj_ctxs)]
        ctx = {
            **base_ctx,
            "project":   proj["title"],
            "proj_tech": proj["tech"],
        }
        text = _fill(tmpl, ctx)
        if text not in used:
            used.add(text)
            questions.append(
                _build_question_entry(
                    question_text=text,
                    category_key="project_deepdive",
                    framework_key="STAR",
                    context_used=f"project: {proj['title']}",
                )
            )
            added += 1
            proj_idx += 1


def _add_strength_weakness_questions(
    base_ctx: dict,
    n: int,
    questions: list,
    used: set,
) -> None:
    """
    Interleave strength and weakness questions, each with the
    correct framework.
    """
    cat = HR_TEMPLATES["strengths_weaknesses"]
    fw_map = cat["framework_map"]
    all_pairs = []

    for sub_key, fw_key in fw_map.items():
        tmpls = list(cat["templates"][sub_key])
        random.shuffle(tmpls)
        for tmpl in tmpls:
            all_pairs.append((tmpl, sub_key, fw_key))

    random.shuffle(all_pairs)
    added = 0
    for tmpl, sub_key, fw_key in all_pairs:
        if added >= n:
            break
        text = _fill(tmpl, base_ctx)
        if text not in used:
            used.add(text)
            cat_label = cat["label"]
            cat_emoji = cat.get("emoji", "⚖️")
            fw        = FRAMEWORKS[fw_key]
            questions.append({
                "question":       text,
                "category":       cat_label,
                "category_emoji": cat_emoji,
                "answer_framework": {
                    "name":  fw["name"],
                    "steps": fw["steps"],
                },
                "context_used": f"sub-type: {sub_key}",
            })
            added += 1
