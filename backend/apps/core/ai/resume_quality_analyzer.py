"""
Resume Quality Analyzer
-----------------------
Deterministic, NLP/regex-based resume quality analysis engine.
Analyses the actual uploaded resume text and structured data only.
Never invents qualifications, skills, achievements, or experience.

Three sub-analyzers:
  1. detect_weak_bullets   – flags weak starters, suggests action-verb rewrites
  2. detect_missing_sections – flags absent standard sections
  3. detect_quality_issues – flags formatting / content-quality problems

All rules are based purely on what is (or isn't) in the resume.
"""

import re

# ---------------------------------------------------------------------------
# Action Verb Reference Table
# Grouped by common resume context so rewrites stay contextually relevant.
# ---------------------------------------------------------------------------

ACTION_VERBS_BY_CONTEXT = {
    "development": [
        "Developed", "Engineered", "Architected", "Implemented", "Built",
        "Designed", "Optimized", "Refactored", "Deployed", "Automated",
    ],
    "leadership": [
        "Led", "Managed", "Directed", "Coordinated", "Mentored",
        "Supervised", "Spearheaded", "Drove", "Championed", "Facilitated",
    ],
    "analysis": [
        "Analyzed", "Evaluated", "Assessed", "Identified", "Investigated",
        "Measured", "Diagnosed", "Benchmarked", "Reviewed", "Audited",
    ],
    "creation": [
        "Created", "Produced", "Launched", "Established", "Introduced",
        "Authored", "Designed", "Formulated", "Developed", "Initiated",
    ],
    "improvement": [
        "Improved", "Enhanced", "Increased", "Reduced", "Streamlined",
        "Accelerated", "Boosted", "Strengthened", "Upgraded", "Revamped",
    ],
    "collaboration": [
        "Collaborated", "Partnered", "Coordinated", "Supported", "Assisted",
        "Contributed", "Participated", "Engaged", "Liaised", "Communicated",
    ],
}

# Map weak starters → (context bucket, explanation)
WEAK_STARTERS = {
    # Responsibility-only starters
    "responsible for": ("development", "Vague ownership language. Lead with what you built or achieved."),
    "tasked with":     ("development", "Passive framing. Start with the action you performed."),
    "duties included": ("development", "Job-description style. Use active, impact-focused verbs."),
    "job included":    ("development", "Job-description style. Focus on what you delivered."),
    "role included":   ("development", "Role-description framing. Describe outcomes, not duties."),
    # Weak helpers
    "helped":    ("collaboration", "Vague contribution. Specify your direct role and impact."),
    "assisted":  ("collaboration", "Vague. Clarify your specific contribution."),
    "supported": ("collaboration", "Vague. What did you specifically deliver or build?"),
    "worked on": ("development", "Unclear scope. Describe what you built, improved, or delivered."),
    "worked with": ("collaboration", "Vague. Describe the outcome you contributed to."),
    "involved in": ("development", "Passive. Lead with your specific contribution."),
    # Filler / meta words
    "did":   ("development", "Too generic. Use a specific action verb that describes your impact."),
    "made":  ("creation",    "Generic verb. Specify what you created or delivered."),
    "got":   ("improvement", "Informal and vague. Describe the outcome you achieved."),
    "tried": ("improvement", "Implies uncertainty. Rewrite with the result you delivered."),
    # Participation only
    "participated in": ("collaboration", "Vague involvement. State your specific contribution and outcome."),
    "took part in":    ("collaboration", "Vague. Describe your direct role and deliverable."),
    "was part of":     ("collaboration", "Passive framing. Focus on your individual contribution."),
    "contributed to":  ("collaboration", "Generic. Quantify your contribution or describe what you built."),
}

FILLER_PHRASES = [
    "various", "etc", "and so on", "numerous", "many", "several",
    "different", "some", "a lot of", "lots of", "a number of",
    "in order to", "that being said", "needless to say",
    "as mentioned", "for the purposes of",
]

PASSIVE_VOICE_PATTERNS = [
    r'\bwas\s+\w+ed\b',
    r'\bwere\s+\w+ed\b',
    r'\bbeen\s+\w+ed\b',
    r'\bbeing\s+\w+ed\b',
    r'\bhas\s+been\s+\w+ed\b',
    r'\bhave\s+been\s+\w+ed\b',
]

# ---------------------------------------------------------------------------
# 1. Weak Bullet Detector
# ---------------------------------------------------------------------------

def detect_weak_bullets(resume_text: str, extracted_info: dict) -> list:
    """
    Scan actual resume text for bullet points starting with weak phrases.
    Returns a list of finding dicts — never invents content.

    Each item:
      {
        "original":    str  – the actual line from the resume,
        "weak_phrase": str  – the matched weak starter,
        "explanation": str  – why it is weak,
        "suggestions": list[str]  – 3 stronger action-verb openers,
        "line_index":  int  – 0-based index among all bullet lines found,
      }
    """
    if not resume_text or not resume_text.strip():
        return []

    findings = []
    seen_lines = set()

    # Collect every non-trivial line from the resume text
    lines = [ln.strip() for ln in resume_text.splitlines() if ln.strip()]

    # Also pull bullet lines from structured experience/project descriptions
    extra_bullets = []
    if isinstance(extracted_info, dict):
        for section_key in ("experience", "work"):
            for entry in (extracted_info.get(section_key) or []):
                desc = entry.get("description", "") or ""
                for sub in re.split(r'[.\n•\-–]', desc):
                    s = sub.strip()
                    if len(s) > 15:
                        extra_bullets.append(s)
        for proj in (extracted_info.get("projects") or []):
            desc = proj.get("description", "") or ""
            for sub in re.split(r'[.\n•\-–]', desc):
                s = sub.strip()
                if len(s) > 15:
                    extra_bullets.append(s)

    all_lines = lines + extra_bullets
    bullet_index = 0

    for line in all_lines:
        if line in seen_lines:
            continue

        lower = line.lower()

        for phrase, (context, explanation) in WEAK_STARTERS.items():
            # Match at start of bullet (after optional bullet symbols / whitespace)
            pattern = r'^[•\-–*>]?\s*' + re.escape(phrase)
            if re.match(pattern, lower):
                seen_lines.add(line)
                # Pick three contextually appropriate action verbs
                verb_pool = ACTION_VERBS_BY_CONTEXT.get(context, ACTION_VERBS_BY_CONTEXT["development"])
                suggestions = verb_pool[:3]

                # Build example rewrites using the TAIL of the original line
                # (strip the weak starter, preserve the rest verbatim)
                tail = re.sub(r'^[•\-–*>]?\s*' + re.escape(phrase) + r'\s*', '', line, flags=re.IGNORECASE).strip()
                example_rewrites = [
                    f"{v} {tail}" if tail else f"{v} [describe your specific contribution and impact]"
                    for v in suggestions
                ]

                findings.append({
                    "original":       line,
                    "weak_phrase":    phrase.title(),
                    "explanation":    explanation,
                    "suggestions":    example_rewrites,
                    "line_index":     bullet_index,
                })
                bullet_index += 1
                break  # only one finding per line

    return findings[:12]  # Cap at 12 to avoid overwhelming the UI


# ---------------------------------------------------------------------------
# 2. Missing Section Detector
# ---------------------------------------------------------------------------

REQUIRED_SECTIONS = [
    {
        "id":          "skills",
        "label":       "Skills",
        "description": "A dedicated Skills section helps ATS systems identify your technical competencies quickly.",
        "priority":    "High",
        "builder_step": 4,  # 0-indexed step in ResumeBuilder
        "keywords":    ["skills", "technologies", "tech stack", "competencies", "tools"],
    },
    {
        "id":          "experience",
        "label":       "Work Experience",
        "description": "Experience entries demonstrate practical application of your skills and are critical for most roles.",
        "priority":    "High",
        "builder_step": 2,
        "keywords":    ["experience", "work", "internship", "employment", "position", "role"],
    },
    {
        "id":          "education",
        "label":       "Education",
        "description": "Education details (degree, institution, year) are required by most ATS systems and recruiters.",
        "priority":    "High",
        "builder_step": 1,
        "keywords":    ["education", "degree", "university", "college", "b.tech", "bachelor", "master", "school"],
    },
    {
        "id":          "projects",
        "label":       "Projects",
        "description": "A Projects section showcases practical skills and is especially important for freshers and developers.",
        "priority":    "Medium",
        "builder_step": 3,
        "keywords":    ["project", "portfolio", "built", "developed", "created"],
    },
    {
        "id":          "certifications",
        "label":       "Certifications",
        "description": "Industry certifications validate expertise and improve ATS keyword matching for technical roles.",
        "priority":    "Medium",
        "builder_step": 5,
        "keywords":    ["certification", "certificate", "certified", "credential", "course"],
    },
    {
        "id":          "summary",
        "label":       "Professional Summary",
        "description": "A 2–3 sentence professional summary at the top helps recruiters quickly understand your profile.",
        "priority":    "Medium",
        "builder_step": 0,  # Personal section in builder
        "keywords":    ["summary", "objective", "profile", "about me", "professional summary"],
    },
]


def detect_missing_sections(extracted_info: dict, resume_text: str) -> list:
    """
    Compare required standard sections against structured extracted_info
    and resume text. Returns missing sections with explanations.

    Each item:
      {
        "id":           str,
        "label":        str,
        "description":  str,
        "priority":     "High" | "Medium",
        "builder_step": int,
      }
    """
    if not isinstance(extracted_info, dict):
        extracted_info = {}

    missing = []
    lower_text = (resume_text or "").lower()

    for section in REQUIRED_SECTIONS:
        sid = section["id"]

        # Check structural data first
        found_in_data = False

        if sid == "skills":
            # Check skills in extracted_info or resumeData-style
            skills_list = (
                extracted_info.get("skills") or
                (extracted_info.get("resume_skills_dict", {}) or {}).get("skills", [])
            )
            found_in_data = isinstance(skills_list, list) and len(skills_list) > 0

        elif sid == "experience":
            exp = extracted_info.get("experience") or extracted_info.get("work") or []
            found_in_data = isinstance(exp, list) and len(exp) > 0

        elif sid == "education":
            edu = extracted_info.get("education") or []
            found_in_data = isinstance(edu, list) and len(edu) > 0

        elif sid == "projects":
            proj = extracted_info.get("projects") or []
            found_in_data = isinstance(proj, list) and len(proj) > 0

        elif sid == "certifications":
            certs = extracted_info.get("certifications") or []
            found_in_data = isinstance(certs, list) and len(certs) > 0

        elif sid == "summary":
            personal = extracted_info.get("personal") or extracted_info.get("basics") or {}
            found_in_data = bool(
                (isinstance(personal, dict) and personal.get("summary"))
                or (isinstance(personal, dict) and personal.get("objective"))
            )

        if found_in_data:
            continue

        # Fallback: keyword scan in raw resume text
        found_in_text = any(kw in lower_text for kw in section["keywords"])
        if found_in_text:
            continue

        missing.append({
            "id":           section["id"],
            "label":        section["label"],
            "description":  section["description"],
            "priority":     section["priority"],
            "builder_step": section["builder_step"],
        })

    return missing


# ---------------------------------------------------------------------------
# 3. Quality Issue Detector
# ---------------------------------------------------------------------------

def detect_quality_issues(resume_text: str) -> list:
    """
    Scan resume text for formatting and content-quality problems.
    Returns a list of issue dicts — based strictly on the actual text.

    Each item:
      {
        "type":        str  – short slug,
        "title":       str  – display title,
        "description": str  – specific explanation,
        "priority":    "High" | "Medium" | "Low",
        "examples":    list[str]  – optional concrete examples found in text,
      }
    """
    if not resume_text or not resume_text.strip():
        return []

    issues = []
    lower = resume_text.lower()
    words = resume_text.split()
    word_count = len(words)

    # 1. No quantifiable metrics
    has_metrics = bool(
        re.search(r'\b\d+\s*%', resume_text) or
        re.search(r'\$\s*\d+', resume_text) or
        re.search(r'\b\d+\s*(?:users|clients|customers|projects|features|services|systems|applications|apps|'
                  r'bugs|issues|tickets|deployments|releases|x|times|hours|minutes|days|weeks|months|years|'
                  r'team members|people|students|members|employees|records|queries|requests|transactions|'
                  r'repositories|apis|endpoints)\b', resume_text, re.IGNORECASE)
    )
    if not has_metrics:
        issues.append({
            "type":        "no_metrics",
            "title":       "No Quantifiable Metrics Found",
            "description": "Resume bullet points lack numbers, percentages, or measurable outcomes. "
                           "Adding metrics (e.g. 'Improved load time by 40%', 'Served 5,000+ users') "
                           "significantly increases ATS score and recruiter impact.",
            "priority":    "High",
            "examples":    [],
        })

    # 2. Passive voice overuse (flag if 3+ passive constructions detected)
    passive_matches = []
    for pattern in PASSIVE_VOICE_PATTERNS:
        passive_matches.extend(re.findall(pattern, resume_text, re.IGNORECASE))
    if len(passive_matches) >= 3:
        issues.append({
            "type":        "passive_voice",
            "title":       "Excessive Passive Voice",
            "description": f"Detected {len(passive_matches)} passive-voice constructions "
                           f"(e.g. '{passive_matches[0]}'). Replacing with active voice "
                           "(e.g. 'Led…', 'Built…') makes achievements more impactful.",
            "priority":    "Medium",
            "examples":    passive_matches[:3],
        })

    # 3. Filler / vague language
    found_fillers = [fp for fp in FILLER_PHRASES if fp in lower]
    if len(found_fillers) >= 2:
        issues.append({
            "type":        "filler_language",
            "title":       "Vague / Filler Language Detected",
            "description": f"Phrases like {', '.join(repr(f) for f in found_fillers[:4])} add no value. "
                           "Replace with specific tools, technologies, or quantified outcomes.",
            "priority":    "Medium",
            "examples":    found_fillers[:4],
        })

    # 4. Missing professional links
    has_linkedin = "linkedin" in lower
    has_github   = "github" in lower
    missing_links = []
    if not has_linkedin:
        missing_links.append("LinkedIn profile URL")
    if not has_github:
        missing_links.append("GitHub profile URL")
    if missing_links:
        issues.append({
            "type":        "missing_links",
            "title":       "Missing Professional Profile Links",
            "description": f"No {' or '.join(missing_links)} detected. Including them "
                           "gives recruiters direct access to your work and improves trust.",
            "priority":    "Medium",
            "examples":    missing_links,
        })

    # 5. Resume length issues
    if word_count < 150:
        issues.append({
            "type":        "too_short",
            "title":       "Resume Content Too Brief",
            "description": f"Only {word_count} words detected. A strong resume typically has "
                           "250–600 words. Add more project details, experience descriptions, or skills.",
            "priority":    "High",
            "examples":    [f"Current word count: {word_count}"],
        })
    elif word_count > 900:
        issues.append({
            "type":        "too_long",
            "title":       "Resume May Be Too Lengthy",
            "description": f"{word_count} words detected. Most recruiters prefer resumes under 700 words "
                           "for early-career profiles. Consider trimming older or less relevant entries.",
            "priority":    "Low",
            "examples":    [f"Current word count: {word_count}"],
        })

    # 6. Repeated action verbs (monotony)
    action_verb_counts: dict = {}
    common_verbs = [
        "developed", "worked", "managed", "created", "implemented",
        "designed", "built", "maintained", "used", "utilized",
    ]
    for verb in common_verbs:
        count = len(re.findall(r'\b' + verb + r'\b', lower))
        if count >= 3:
            action_verb_counts[verb] = count

    if action_verb_counts:
        top_verb, top_count = max(action_verb_counts.items(), key=lambda x: x[1])
        issues.append({
            "type":        "repeated_verbs",
            "title":       "Repeated Action Verbs Detected",
            "description": f"The verb '{top_verb.title()}' appears {top_count} times. "
                           "Using varied, strong action verbs improves readability and ATS parsing.",
            "priority":    "Low",
            "examples":    [f"'{v.title()}' used {c} times" for v, c in action_verb_counts.items()][:3],
        })

    # 7. No email address
    email_pattern = r'[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}'
    if not re.search(email_pattern, resume_text):
        issues.append({
            "type":        "no_email",
            "title":       "No Email Address Detected",
            "description": "Every resume must include a professional email address in the contact section.",
            "priority":    "High",
            "examples":    [],
        })

    # 8. No phone number
    phone_pattern = r'[\+]?[\d\s\-\(\)]{10,15}'
    if not re.search(phone_pattern, resume_text):
        issues.append({
            "type":        "no_phone",
            "title":       "No Phone Number Detected",
            "description": "Including a phone number is essential for recruiter contact.",
            "priority":    "High",
            "examples":    [],
        })

    return issues


# ---------------------------------------------------------------------------
# 4. Orchestrator
# ---------------------------------------------------------------------------

def generate_quality_report(resume_text: str, extracted_info: dict, skills_data: dict) -> dict:
    """
    Master function: runs all three quality-analysis sub-modules on the
    actual resume content and returns a unified quality_analysis object.

    Returns:
      {
        "weak_bullets":    list[dict],
        "missing_sections": list[dict],
        "quality_issues":  list[dict],
        "overall_grade":   str   – "Excellent" | "Good" | "Needs Work" | "Critical",
        "total_issues":    int,
        "has_issues":      bool,
      }
    """
    if not resume_text or not resume_text.strip():
        return {
            "weak_bullets":     [],
            "missing_sections": [],
            "quality_issues":   [],
            "overall_grade":    "Insufficient Data",
            "total_issues":     0,
            "has_issues":       False,
        }

    weak_bullets     = detect_weak_bullets(resume_text, extracted_info)
    missing_sections = detect_missing_sections(extracted_info, resume_text)
    quality_issues   = detect_quality_issues(resume_text)

    total_issues = len(weak_bullets) + len(missing_sections) + len(quality_issues)

    # Count high-priority issues for overall grading
    high_priority_count = sum(
        1 for s in missing_sections if s["priority"] == "High"
    ) + sum(
        1 for q in quality_issues if q["priority"] == "High"
    )

    if total_issues == 0:
        overall_grade = "Excellent"
    elif high_priority_count == 0 and total_issues <= 3:
        overall_grade = "Good"
    elif high_priority_count <= 2:
        overall_grade = "Needs Work"
    else:
        overall_grade = "Critical"

    return {
        "weak_bullets":     weak_bullets,
        "missing_sections": missing_sections,
        "quality_issues":   quality_issues,
        "overall_grade":    overall_grade,
        "total_issues":     total_issues,
        "has_issues":       total_issues > 0,
    }
