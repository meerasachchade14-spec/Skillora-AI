
# Skillora AI - AI-Powered Resume Intelligence & Career Guidance Platform
---

## Project Information

| Detail | Description |
|---|---|
| Project Name | Skillora AI |
| Project Type | AI-Based Web Application |
| Academic Level | 7th Semester |
| Course | B.E. Computer Engineering |
| Institute | LDRP Institute of Technology and Research |
| University | Kadi Sarva Vishwavidyalaya (KSV) |
| Academic Project | 7th Semester Group Project |
---

## Project Overview

Skillora AI is an AI-powered web application designed to help students, fresh graduates, and job seekers analyze their resumes, evaluate their skills, identify skill gaps, and make informed career decisions.

The platform combines modern web technologies with Natural Language Processing (NLP), Machine Learning, and semantic similarity techniques to provide meaningful resume insights and career guidance.

Instead of simply displaying a resume score, Skillora AI focuses on understanding resume content, identifying relevant skills, evaluating job compatibility, and suggesting areas for improvement.

---

## Features

- **Secure authentication** – registration, OTP verification, login, password reset, and logout using JWT tokens.
- **Resume management** – upload PDF/DOCX, server‑side parsing, edit with a visual Resume Builder, download the final PDF, and view a history of past uploads.
- **AI analysis** – extract key skills, compute ATS match scores, generate quality improvement suggestions, and visualise analysis results.
- **Career guidance** – job‑role recommendations based on extracted skills, a personalised learning roadmap, and AI‑generated interview preparation material.
- **User‑specific persistence** – all resumes, analyses, and recommendations are stored in MongoDB and tied to the authenticated user.
- **Admin utilities** – bug‑report endpoint that emails the admin address defined in `.env`.

---

## Technology Stack

| Layer | Technology |
|-------|------------|
| Front‑end | React 17+, Vite, Tailwind CSS, React‑Router |
| Back‑end | Python 3.10+, Django 4.x, Django REST Framework |
| Database | MongoDB (accessed via `pymongo` in `config/db.py`)
| AI/ML | `sentence‑transformers`, `spaCy`, `torch`, `scikit‑learn`
| Dev tools | VS Code, PowerShell, Cypress (E2E), PyTest (`APITestCase`)
| Other tools | Git ,Github ,Antigravity 
---

## AI/ML Workflow

step 1. **Resume parsing** – uploaded file is converted to plain text using `pdfminer` / `python-docx`.

step 2. **Embedding generation** – the text is fed to a `sentence‑transformers` model to obtain a dense vector representation.

step 3. **Skill extraction** – spaCy NER and custom keyword matching identify hard/soft skills.

step 4. **ATS scoring** – similarity between resume embedding and a curated set of job‑description embeddings yields a match percentage.

step 5. **Quality suggestions** – heuristics (length, section order, action‑verb usage) produce actionable feedback.

step 6. **Recommendations** – the skill vector is compared against a database of job titles to suggest relevant roles.

step 7. **Learning roadmap & interview prep** – based on the identified gaps, content modules and typical interview questions are selected.


All models are lazy‑loaded on first use and cached for subsequent requests, preventing repeated heavy initialisation.

---

## System Architecture

```
+--------------------+        +-------------------+        +-------------------+
|   Front‑end (Vite) | <---> |  Django REST API  | <---> |   MongoDB Atlas   |
|  React + Tailwind  |        |  JWT Auth, Views  |        |   collections:   |
+--------------------+        +-------------------+        |  users, resumes, |
                                                          |  analyses,      |
                                                          |  recommendations |
                                                          +-------------------+
```

- The front‑end talks to the API over HTTPS (development uses `http://localhost:8000`).
- The API layer handles authentication, file storage, AI inference, and data aggregation.
- AI models are loaded once per server process and reused across requests.

---

## Folder Structure

```
Skillora-AI/
├─ backend/                     # Django project
│  ├─ apps/
│  │  ├─ authentication/        # auth, OTP, bug‑report
│  │  ├─ resume/                # upload, builder, history
│  │  ├─ analysis/              # AI analysis endpoints
│  │  ├─ jobs/                  # role recommendations
│  │  ├─ learning/              # learning roadmap
│  │  └─ interview/             # interview prep
│  ├─ config/
│  │   └─ db.py                 # MongoDB connection
│  ├─ manage.py
│  └─ requirements.txt
├─ frontend/                    # React/Vite source
│  ├─ src/
│  │  ├─ components/           # UI components (buttons, cards…)
│  │  ├─ pages/                # Each page (Login, Dashboard, …)
│  │  └─ api/                  # Wrapper around REST calls
│  ├─ public/
│  ├─ e2e/                     # Cypress config & specs
│  ├─ package.json
│  └─ vite.config.js
├─ run_full_tests.ps1           # PowerShell script that runs end‑to‑end suite
├─ test_report.md               # Generated after test run
└─ README.md                    # ← **this file**
```

---

## Installation & Setup

```bash
# 1. Clone the repo
git clone https://github.com/your‑org/skillora-ai.git
cd skillora-ai

# 2. Backend – create virtual env and install deps
cd backend
py -3 -m venv venv
source venv/Scripts/activate   # PowerShell: ./venv/Scripts/Activate.ps1
pip install -r requirements.txt

# 3. Front‑end – install npm packages
cd ../frontend
npm ci   # installs exact versions from lockfile

# 4. Environment variables (see below) – copy .env.example → .env and fill values
cp .env.example .env

# 5. Start services (development)
# In separate terminals:
#   Backend API
cd backend && python manage.py runserver 0.0.0.0:8000
#   Front‑end dev server
cd frontend && npm run dev
```

The application will be reachable at `http://localhost:5173` (Vite) and the API at `http://localhost:8000/api/`.

---
## Future Scope

- **Model versioning** – integrate a model‑registry to seamlessly upgrade AI components.
- **Multi‑language support** – add resume parsing and analysis for non‑English languages.
- **Real‑time collaboration** – allow multiple users to edit a resume together.
- **Export formats** – support LaTeX and Markdown resume exports.
- **Analytics dashboard** – give users visual insights on skill trends over time.

---

## Developed By

Meera Sachchade - Computer Enineering Student (2023-2027)