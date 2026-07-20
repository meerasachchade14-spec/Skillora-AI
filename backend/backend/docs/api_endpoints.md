# Skillora AI Backend API Documentation

All API endpoints are prefixed with `/api`. Standard authentication uses **JWT Bearer Tokens** inside the `Authorization` header:
`Authorization: Bearer <access_token>`

---

## Authentication & Accounts (`/api/auth`)

### 1. Register User
- **Endpoint**: `POST /api/auth/register/`
- **Authentication**: None
- **Request Body**:
  ```json
  {
    "email": "candidate@example.com",
    "password": "securepassword123",
    "full_name": "Jhanvi Ramani",
    "phone": "+91 9876543210"
  }
  ```
- **Response** (201 Created):
  ```json
  {
    "success": true,
    "message": "Registration successful! A verification code has been sent to your email."
  }
  ```

### 2. Verify Email OTP
- **Endpoint**: `POST /api/auth/verify-otp/`
- **Authentication**: None
- **Request Body**:
  ```json
  {
    "email": "candidate@example.com",
    "otp": "123456"
  }
  ```
- **Response** (200 OK):
  ```json
  {
    "success": true,
    "message": "Email verification successful! You can now log in."
  }
  ```

### 3. Log In
- **Endpoint**: `POST /api/auth/login/`
- **Authentication**: None
- **Request Body**:
  ```json
  {
    "email": "candidate@example.com",
    "password": "securepassword123"
  }
  ```
- **Response** (200 OK):
  ```json
  {
    "success": true,
    "message": "Login successful.",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refresh": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": 1,
      "email": "candidate@example.com",
      "full_name": "Jhanvi Ramani",
      "phone": "+91 9876543210",
      "profile_image": null,
      "is_verified": true,
      "created_at": "2026-07-19T21:30:00Z",
      "updated_at": "2026-07-19T21:30:00Z"
    }
  }
  ```

### 4. Refresh JWT Token
- **Endpoint**: `POST /api/auth/token/refresh/`
- **Authentication**: None
- **Request Body**:
  ```json
  {
    "refresh": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
  ```
- **Response** (200 OK):
  ```json
  {
    "access": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
  ```

### 5. Forgot Password
- **Endpoint**: `POST /api/auth/forgot-password/`
- **Authentication**: None
- **Request Body**:
  ```json
  {
    "email": "candidate@example.com"
  }
  ```
- **Response** (200 OK):
  ```json
  {
    "success": true,
    "message": "Password reset code sent to your email."
  }
  ```

### 6. Reset Password
- **Endpoint**: `POST /api/auth/reset-password/`
- **Authentication**: None
- **Request Body**:
  ```json
  {
    "email": "candidate@example.com",
    "otp": "123456",
    "new_password": "newsecurepassword123"
  }
  ```
- **Response** (200 OK):
  ```json
  {
    "success": true,
    "message": "Your password has been reset successfully."
  }
  ```

### 7. Get User Profile
- **Endpoint**: `GET /api/auth/profile/`
- **Authentication**: Required (`Bearer Token`)
- **Response** (200 OK):
  ```json
  {
    "success": true,
    "data": {
      "id": 1,
      "email": "candidate@example.com",
      "full_name": "Jhanvi Ramani",
      "phone": "+91 9876543210",
      "profile_image": "http://localhost:5000/media/profiles/avatar.jpg",
      "is_verified": true,
      "created_at": "2026-07-19T21:30:00Z",
      "updated_at": "2026-07-19T21:32:00Z"
    }
  }
  ```

### 8. Update User Profile
- **Endpoint**: `PUT /api/auth/profile/`
- **Authentication**: Required (`Bearer Token`)
- **Request Body** (Multipart Form Data):
  - `full_name` (optional): "Jhanvi A. Ramani"
  - `phone` (optional): "+91 9999999999"
  - `profile_image` (optional): file binary
- **Response** (200 OK):
  ```json
  {
    "success": true,
    "message": "Profile updated successfully.",
    "data": {
      "id": 1,
      "email": "candidate@example.com",
      "full_name": "Jhanvi A. Ramani",
      "phone": "+91 9999999999",
      "profile_image": "http://localhost:5000/media/profiles/new_avatar.jpg",
      "is_verified": true,
      "created_at": "2026-07-19T21:30:00Z",
      "updated_at": "2026-07-19T21:40:00Z"
    }
  }
  ```

---

## Resume Upload & Management (`/api/resumes`)

### 1. Upload Resume
- **Endpoint**: `POST /api/resumes/upload/` (also mapped singular `/api/resume/upload/` for convenience)
- **Authentication**: Required (`Bearer Token`)
- **Request Body** (Multipart Form Data):
  - `resume_file`: file binary (PDF, DOC, or DOCX)
  - `title` (optional): string title
- **Response** (201 Created):
  ```json
  {
    "success": true,
    "message": "Resume uploaded and text extracted successfully.",
    "data": {
      "id": 1,
      "title": "Resume.pdf",
      "resume_file": "http://localhost:5000/media/resumes/Resume.pdf",
      "filename": "Resume.pdf",
      "extracted_text": "...",
      "uploaded_at": "2026-07-19T21:45:00Z"
    }
  }
  ```

### 2. List Resumes
- **Endpoint**: `GET /api/resumes/`
- **Authentication**: Required (`Bearer Token`)
- **Response** (200 OK):
  ```json
  {
    "success": true,
    "data": [
      {
        "id": 1,
        "title": "Resume.pdf",
        "resume_file": "http://localhost:5000/media/resumes/Resume.pdf",
        "filename": "Resume.pdf",
        "extracted_text": "...",
        "uploaded_at": "2026-07-19T21:45:00Z"
      }
    ]
  }
  ```

### 3. Get Resume Details
- **Endpoint**: `GET /api/resumes/<id>/`
- **Authentication**: Required (`Bearer Token`)
- **Response** (200 OK):
  ```json
  {
    "success": true,
    "data": {
      "id": 1,
      "title": "Resume.pdf",
      "resume_file": "http://localhost:5000/media/resumes/Resume.pdf",
      "filename": "Resume.pdf",
      "extracted_text": "extracted text content",
      "uploaded_at": "2026-07-19T21:45:00Z"
    }
  }
  ```

### 4. Delete Resume
- **Endpoint**: `DELETE /api/resumes/<id>/`
- **Authentication**: Required (`Bearer Token`)
- **Response** (200 OK):
  ```json
  {
    "success": true,
    "message": "Resume deleted successfully."
  }
  ```

---

## Resume Analysis Report (`/api/analysis`)

### 1. Perform ATS Analysis
- **Endpoint**: `POST /api/analysis/<resume_id>/`
- **Authentication**: Required (`Bearer Token`)
- **Response** (201 Created):
  ```json
  {
    "success": true,
    "message": "ATS analysis report generated successfully.",
    "data": {
      "id": 1,
      "resume_id": 1,
      "ats_score": 85,
      "strengths": [
        "Strong mentions of technical tools: React, JavaScript, SQL.",
        "Proper structure with standard readable sections."
      ],
      "weaknesses": [
        "Missing core industry keywords: Docker, AWS.",
        "Lack of cloud deployment experience."
      ],
      "missing_keywords": ["Docker", "AWS", "CI/CD"],
      "recommendations": [
        "Tailor your profile summary for specific target roles.",
        "Incorporate missing tools like Docker and AWS into project bullet points."
      ],
      "created_at": "2026-07-19T21:50:00Z"
    }
  }
  ```

---

## Skill Matcher Comparison (`/api/matcher`)

### 1. Compare Skills
- **Endpoint**: `POST /api/matcher/match/` (also mapped `/api/skills/match/` for convenience)
- **Authentication**: Required (`Bearer Token`)
- **Request Body**:
  ```json
  {
    "resume_text": "Experienced software developer skilled in React, HTML, CSS, JavaScript, Python.",
    "job_description": "Wanted a Frontend Engineer with React, TypeScript, Node.js, and Docker experience."
  }
  ```
- **Response** (200 OK):
  ```json
  {
    "success": true,
    "data": {
      "match_percentage": 60,
      "matched_skills": ["React", "JavaScript"],
      "missing_skills": ["TypeScript", "Docker", "Node.js"],
      "learning_recommendations": [
        "Complete an online course or build a sandbox project using TypeScript.",
        "Complete an online course or build a sandbox project using Docker.",
        "Complete an online course or build a sandbox project using Node.js."
      ]
    }
  }
  ```

---

## Jobs Recommendation System (`/api/jobs`)

### 1. List All Jobs
- **Endpoint**: `GET /api/jobs/`
- **Authentication**: Required (`Bearer Token`)
- **Response** (200 OK):
  ```json
  {
    "success": true,
    "data": [
      {
        "id": 1,
        "title": "Frontend Developer (React)",
        "company": "Google",
        "location": "Bangalore (Hybrid)",
        "salary": "₹1,800,000 - ₹2,400,000 /yr",
        "tags": ["React", "TypeScript", "TailwindCSS", "JavaScript", "Git"],
        "logo_letter": "G",
        "logo_bg": "bg-red-500"
      }
    ]
  }
  ```

### 2. Get Recommended Jobs
- **Endpoint**: `GET /api/jobs/recommended/`
- **Authentication**: Required (`Bearer Token`)
- **Response** (200 OK):
  ```json
  {
    "success": true,
    "data": [
      {
        "id": 1,
        "title": "Frontend Developer (React)",
        "company": "Google",
        "location": "Bangalore (Hybrid)",
        "salary": "₹1,800,000 - ₹2,400,000 /yr",
        "tags": ["React", "TypeScript", "TailwindCSS", "JavaScript", "Git"],
        "logo_letter": "G",
        "logo_bg": "bg-red-500",
        "match": 85
      }
    ]
  }
  ```

### 3. Save a Job
- **Endpoint**: `POST /api/jobs/save/<job_id>/`
- **Authentication**: Required (`Bearer Token`)
- **Response** (200 OK):
  ```json
  {
    "success": true,
    "message": "Job saved successfully.",
    "data": {
      "id": 1,
      "job": 1,
      "saved_at": "2026-07-19T21:55:00Z"
    }
  }
  ```

### 4. Get Saved Jobs
- **Endpoint**: `GET /api/jobs/saved/`
- **Authentication**: Required (`Bearer Token`)
- **Response** (200 OK):
  ```json
  {
    "success": true,
    "data": [
      {
        "id": 1,
        "job": 1,
        "job_details": {
          "id": 1,
          "title": "Frontend Developer (React)",
          "company": "Google",
          "location": "Bangalore (Hybrid)",
          "salary": "₹1,800,000 - ₹2,400,000 /yr",
          "tags": ["React", "TypeScript", "TailwindCSS", "JavaScript", "Git"],
          "logo_letter": "G",
          "logo_bg": "bg-red-500"
        },
        "saved_at": "2026-07-19T21:55:00Z"
      }
    ]
  }
  ```

---

## User Settings (`/api/settings`)

### 1. Get Settings
- **Endpoint**: `GET /api/settings/`
- **Authentication**: Required (`Bearer Token`)
- **Response** (200 OK):
  ```json
  {
    "success": true,
    "data": {
      "email_notifications": true,
      "marketing_emails": false,
      "dark_mode": false,
      "language": "en",
      "ai_suggestions": true
    }
  }
  ```

### 2. Update Settings
- **Endpoint**: `PUT /api/settings/`
- **Authentication**: Required (`Bearer Token`)
- **Request Body**:
  ```json
  {
    "email_notifications": true,
    "marketing_emails": true,
    "dark_mode": true,
    "language": "en",
    "ai_suggestions": false
  }
  ```
- **Response** (200 OK):
  ```json
  {
    "success": true,
    "message": "Settings updated successfully.",
    "data": {
      "email_notifications": true,
      "marketing_emails": true,
      "dark_mode": true,
      "language": "en",
      "ai_suggestions": false
    }
  }
  ```

---

## API Health Check (`/api/health`)

### 1. Health Status
- **Endpoint**: `GET /api/health/`
- **Authentication**: None
- **Response** (200 OK):
  ```json
  {
    "success": true,
    "message": "Skillora API is running",
    "database": "MongoDB"
  }
  ```
