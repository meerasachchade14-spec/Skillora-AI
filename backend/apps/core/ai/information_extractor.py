import re
import spacy

nlp = spacy.load("en_core_web_sm")

def extract_resume_information(text):
    """
    Extracts structured data from raw resume text mapping to the resumeData structure.
    """
    data = {
        "personal": {
            "firstName": "",
            "lastName": "",
            "email": "",
            "phone": "",
            "location": "",
            "jobTitle": "",
            "summary": ""
        },
        "education": [],
        "experience": [],
        "projects": [],
        "skills": [],
        "certifications": [],
        "languages": [],
        "achievements": [],
        "volunteer": [],
        "customSections": []
    }
    
    if not text:
        return data

    doc = nlp(text)

    # 1. Extract Email
    email_pattern = r'[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}'
    emails = re.findall(email_pattern, text)
    if emails:
        data["personal"]["email"] = emails[0]

    # 2. Extract Phone Number
    phone_pattern = r'\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}'
    phones = re.findall(phone_pattern, text)
    if phones:
        data["personal"]["phone"] = phones[0]

    # 3. Extract Name (Heuristic: first PERSON entity found in first 200 chars)
    intro_doc = nlp(text[:200])
    for ent in intro_doc.ents:
        if ent.label_ == "PERSON":
            name_parts = ent.text.split()
            if len(name_parts) >= 1:
                data["personal"]["firstName"] = name_parts[0]
            if len(name_parts) >= 2:
                data["personal"]["lastName"] = " ".join(name_parts[1:])
            break

    # 4. Extract Location
    for ent in intro_doc.ents:
        if ent.label_ in ["GPE", "LOC"]:
            data["personal"]["location"] = ent.text
            break

    # 5. Extract Sections based on Keywords
    lines = text.split("\n")
    current_section = None
    section_content = {
        "experience": [],
        "education": [],
        "skills": [],
        "projects": []
    }
    
    for line in lines:
        line_clean = line.strip().upper()
        # Detect section headers
        if "EXPERIENCE" in line_clean and len(line_clean) < 20:
            current_section = "experience"
        elif "EDUCATION" in line_clean and len(line_clean) < 20:
            current_section = "education"
        elif "SKILLS" in line_clean and len(line_clean) < 20:
            current_section = "skills"
        elif "PROJECTS" in line_clean and len(line_clean) < 20:
            current_section = "projects"
        elif current_section:
            section_content[current_section].append(line.strip())
            
    # Process Experience
    if section_content["experience"]:
        exp_text = " ".join(section_content["experience"])
        data["experience"].append({
            "company": "Extracted Experience",
            "role": "",
            "location": "",
            "startDate": "",
            "endDate": "",
            "description": exp_text[:500] + ("..." if len(exp_text) > 500 else "")
        })

    # Process Education
    if section_content["education"]:
        edu_text = " ".join(section_content["education"])
        data["education"].append({
            "institution": "Extracted Education",
            "degree": "",
            "fieldOfStudy": "",
            "startDate": "",
            "endDate": "",
            "description": edu_text[:300] + ("..." if len(edu_text) > 300 else "")
        })
        
    # Process Projects
    if section_content["projects"]:
        proj_text = " ".join(section_content["projects"])
        data["projects"].append({
            "name": "Extracted Project",
            "description": proj_text[:300] + ("..." if len(proj_text) > 300 else ""),
            "link": ""
        })

    # Process Skills
    if section_content["skills"]:
        skills_text = " ".join(section_content["skills"])
        raw_skills = re.split(r'[,•|]', skills_text)
        for s in raw_skills:
            clean_s = s.strip()
            if clean_s and len(clean_s) < 30:
                data["skills"].append({
                    "name": clean_s,
                    "level": "Intermediate"
                })

    return data
