import re
import spacy

nlp = spacy.load("en_core_web_sm")

def extract_resume_information(text):
    """
    Extracts structured data from raw resume text mapping to the resumeData structure.
    """
    data = {
        "personal": {
            "fullName": "",
            "email": "",
            "phone": "",
            "address": "",
            "title": "",
            "summary": "",
            "linkedin": "",
            "github": "",
            "portfolio": ""
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
            data["personal"]["fullName"] = ent.text
            break

    # 4. Extract Location
    for ent in intro_doc.ents:
        if ent.label_ in ["GPE", "LOC"]:
            data["personal"]["address"] = ent.text
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
            
    from sklearn.feature_extraction.text import TfidfVectorizer

    def extract_keywords_tfidf(text, top_n=3):
        if not text.strip():
            return "Extracted Detail"
        try:
            vectorizer = TfidfVectorizer(stop_words='english', max_features=top_n)
            tfidf_matrix = vectorizer.fit_transform([text])
            feature_names = vectorizer.get_feature_names_out()
            scores = tfidf_matrix.toarray()[0]
            # sort features by score
            sorted_indices = scores.argsort()[::-1]
            top_features = [feature_names[i].title() for i in sorted_indices[:top_n] if scores[i] > 0]
            if top_features:
                return " ".join(top_features)
        except Exception:
            pass
        return "Extracted Detail"
            
    # Process Experience
    if section_content["experience"]:
        exp_text = " ".join(section_content["experience"])
        role_keywords = extract_keywords_tfidf(exp_text, top_n=2)
        company_keywords = extract_keywords_tfidf(exp_text[len(exp_text)//2:], top_n=2)
        
        data["experience"].append({
            "company": company_keywords if company_keywords != "Extracted Detail" else "Company",
            "role": role_keywords if role_keywords != "Extracted Detail" else "Role",
            "location": "",
            "startDate": "",
            "endDate": "",
            "description": exp_text[:500] + ("..." if len(exp_text) > 500 else "")
        })

    # Process Education
    if section_content["education"]:
        edu_text = " ".join(section_content["education"])
        degree_keywords = extract_keywords_tfidf(edu_text, top_n=2)
        college_keywords = extract_keywords_tfidf(edu_text[len(edu_text)//2:], top_n=2)
        data["education"].append({
            "type": "College / University",
            "college": college_keywords if college_keywords != "Extracted Detail" else "University",
            "degree": degree_keywords if degree_keywords != "Extracted Detail" else "Degree",
            "fieldOfStudy": "",
            "startYear": "",
            "year": "",
            "cgpa": "",
            "description": edu_text[:300] + ("..." if len(edu_text) > 300 else "")
        })
        
    # Process Projects
    if section_content["projects"]:
        proj_text = " ".join(section_content["projects"])
        title_keywords = extract_keywords_tfidf(proj_text, top_n=3)
        data["projects"].append({
            "title": title_keywords if title_keywords != "Extracted Detail" else "Project",
            "description": proj_text[:300] + ("..." if len(proj_text) > 300 else ""),
            "live": "",
            "github": "",
            "technologies": "",
            "projectType": "",
            "role": ""
        })

    # Process Skills
    if section_content["skills"]:
        skills_text = " ".join(section_content["skills"])
        raw_skills = re.split(r'[,•|]', skills_text)
        for s in raw_skills:
            clean_s = s.strip()
            if clean_s and len(clean_s) < 30:
                data["skills"].append(clean_s)

    return data

