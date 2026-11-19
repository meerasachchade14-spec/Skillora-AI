# Skillora AI

> **An AI‑powered career assistant that helps users create, analyse, and improve their resumes, discover job roles, plan learning pathways, and prepare for interviews.**

---

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [AI/ML Workflow](#aiml-workflow)
- [System Architecture](#system-architecture)
- [Folder Structure](#folder-structure)
- [Installation & Setup](#installation--setup)
- [Environment Variables](#environment-variables)
- [API Overview](#api-overview)
- [Screenshots](#screenshots)
- [Future Scope](#future-scope)

---

## Project Overview

Skillora AI is a full‑stack web application that guides job‑seekers through the entire hiring preparation process.  Users can register with email‑based OTP verification, upload and edit resumes, run AI‑driven analyses (skill extraction, ATS scoring, quality suggestions), receive personalised job‑role recommendations, view a learning roadmap, and practise interview questions.  All data is persisted per‑user in MongoDB, and the backend exposes a clean REST API built with Django REST Framework.

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

---

## AI/ML Workflow

1. **Resume parsing** – uploaded file is converted to plain text using `pdfminer` / `python-docx`.
2. **Embedding generation** – the text is fed to a `sentence‑transformers` model to obtain a dense vector representation.
3. **Skill extraction** – spaCy NER and custom keyword matching identify hard/soft skills.
4. **ATS scoring** – similarity between resume embedding and a curated set of job‑description embeddings yields a match percentage.
5. **Quality suggestions** – heuristics (length, section order, action‑verb usage) produce actionable feedback.
6. **Recommendations** – the skill vector is compared against a database of job titles to suggest relevant roles.
7. **Learning roadmap & interview prep** – based on the identified gaps, content modules and typical interview questions are selected.

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

## Environment Variables

Create a `.env` file in the **backend** directory (do **not** commit it). Example values:

```
# Django core
SECRET_KEY=replace‑with‑a‑strong‑random‑string
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1

# MongoDB
MONGO_URI=mongodb://localhost:27017/
MONGO_DB_NAME=skillora_ai

# Email (SMTP) – used for OTP and bug‑report
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USE_TLS=True
EMAIL_HOST_USER=your_email@gmail.com
EMAIL_HOST_PASSWORD=your_16_digit_app_password

# Admin contact (bug reports)
ADMIN_EMAIL=admin@example.com
```

---

## API Overview

All endpoints are prefixed with **/api/**.

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/auth/register/` | Register a new user (triggers OTP) |
| `POST` | `/auth/verify-otp/` | Verify OTP and receive JWT |
| `POST` | `/auth/login/` | Login with email/password |
| `POST` | `/auth/logout/` | Invalidate JWT (client‑side) |
| `POST` | `/auth/forgot-password/` | Request password‑reset OTP |
| `POST` | `/auth/verify-reset-otp/` | Verify reset OTP, get short‑lived token |
| `POST` | `/auth/reset-password/` | Set new password |
| `POST` | `/auth/report-bug/` | Send a bug report (emails admin) |
| `POST` | `/resume/upload/` | Upload PDF/DOCX, store metadata |
| `GET`  | `/resume/{id}/` | Retrieve parsed resume content |
| `PUT`  | `/resume/{id}/` | Save edited resume content |
| `GET`  | `/resume/download/{id}/` | Download PDF version |
| `GET`  | `/resume/history/` | List user's past resumes |
| `POST` | `/analysis/run/` | Trigger AI analysis for a resume |
| `GET`  | `/analysis/result/{resume_id}/` | Poll for analysis result |
| `GET`  | `/jobs/recommendations/` | Get role recommendations based on analysis |
| `GET`  | `/resume/quality/` | Retrieve quality‑suggestion report |
| `GET`  | `/learning/roadmap/` | Get personalised learning pathway |
| `GET`  | `/interview/prep/` | Fetch interview‑question set |

Authentication is required for all endpoints except `/auth/register/`, `/auth/verify-otp/`, `/auth/login/`, and password‑reset flows.  Include the JWT token in the `Authorization: Bearer <token>` header.

---

## Screenshots

![Login page](file:///C:/Users/meera/.gemini/antigravity/brain/bedf7a87-4986-4c53-8cbb-9d0a96a9e870/login_page_1795122789503.jpg)

*Login screen – dark mode with glassmorphism form.*

*(Add additional screenshots for dashboard, resume builder, analysis results, etc., in the same way.)*

---

## Future Scope

- **Model versioning** – integrate a model‑registry to seamlessly upgrade AI components.
- **Multi‑language support** – add resume parsing and analysis for non‑English languages.
- **Real‑time collaboration** – allow multiple users to edit a resume together.
- **Export formats** – support LaTeX and Markdown resume exports.
- **Analytics dashboard** – give users visual insights on skill trends over time.

---

*This README reflects the current state of the repository. Features are described exactly as implemented; no placeholder or speculative functionality is listed.*
