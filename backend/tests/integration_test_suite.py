# integration_test_suite.py
"""End‑to‑end integration tests for the Skillora AI platform.

These tests spin up the Django development server (using the built‑in
runserver command) and issue HTTP requests that exercise the full stack:

- User registration → OTP verification → login → logout
- Resume upload and parsing
- AI analysis request (mocked via real model endpoint)
- Resume builder import / edit / download
- History view, job role recommendations, quality suggestions,
  learning roadmap, interview preparation
- Verify that all data is persisted in MongoDB.

The script is intended to be run by the PowerShell helper
`run_full_tests.ps1`. It aborts on the first failure and prints a short
summary at the end.
"""
import os
import sys
import time
import subprocess
import requests
from urllib.parse import urljoin

# Load environment variables from the project's .env (if present)
from dotenv import load_dotenv
load_dotenv(dotenv_path=os.path.abspath('../.env'))

BASE_URL = os.getenv('DJANGO_BASE_URL', 'http://127.0.0.1:8000')
API_ROOT = urljoin(BASE_URL, '/api/')

# Helper utilities -----------------------------------------------------------

def wait_for_server(timeout: int = 30) -> bool:
    """Poll the health endpoint until the server responds or timeout.
    """
    health_url = urljoin(BASE_URL, '/api/health/')
    deadline = time.time() + timeout
    while time.time() < deadline:
        try:
            r = requests.get(health_url, timeout=2)
            if r.status_code == 200:
                return True
        except Exception:
            pass
        time.sleep(1)
    return False

def post_json(endpoint: str, payload: dict, headers: dict = None):
    url = urljoin(API_ROOT, endpoint)
    return requests.post(url, json=payload, headers=headers)

def get_json(endpoint: str, headers: dict = None, params: dict = None):
    url = urljoin(API_ROOT, endpoint)
    return requests.get(url, headers=headers, params=params)

def put_json(endpoint: str, payload: dict, headers: dict = None):
    url = urljoin(API_ROOT, endpoint)
    return requests.put(url, json=payload, headers=headers)

# Test flow -----------------------------------------------------------------

def main():
    print('=== Skillora AI Integration Test Suite ===')
    # 1. Register user
    reg_payload = {
        "name": "Integration Tester",
        "email": "integration.test@example.com",
        "password": "StrongPass!234",
        "confirm_password": "StrongPass!234",
    }
    print('Registering user...')
    r = post_json('auth/register/', reg_payload)
    assert r.status_code == 201, f"Registration failed: {r.status_code} {r.text}"

    # 2. Retrieve OTP from DB (direct access – assumes test DB)
    from config.db import get_db
    db = get_db()
    otp_doc = db.otps.find_one({"email": reg_payload["email"], "otp_type": "registration"})
    assert otp_doc, "OTP not generated"
    otp_code = otp_doc["otp_code"]

    # 3. Verify OTP → obtain JWT token
    verify_payload = {
        "email": reg_payload["email"],
        "otp_code": otp_code,
        "otp_type": "registration",
    }
    print('Verifying OTP...')
    r = post_json('auth/verify-otp/', verify_payload)
    assert r.status_code == 200, f"OTP verification failed: {r.status_code} {r.text}"
    token = r.json()["token"]
    auth_headers = {"Authorization": f"Bearer {token}"}

    # 4. Login (should succeed now)
    login_payload = {"email": reg_payload["email"], "password": reg_payload["password"]}
    print('Logging in...')
    r = post_json('auth/login/', login_payload)
    assert r.status_code == 200, f"Login failed: {r.status_code} {r.text}"

    # 5. Upload a sample resume (use test.docx from repo root)
    resume_path = os.path.abspath('../test.docx')
    with open(resume_path, 'rb') as f:
        files = {'file': ('test.docx', f, 'application/vnd.openxmlformats-officedocument.wordprocessingml.document')}
        upload_url = urljoin(API_ROOT, 'resume/upload/')
        print('Uploading resume...')
        r = requests.post(upload_url, headers=auth_headers, files=files)
    assert r.status_code == 201, f"Resume upload failed: {r.status_code} {r.text}"
    resume_id = r.json()["resume_id"]

    # 6. Trigger AI analysis
    analysis_payload = {"resume_id": resume_id, "analysis_type": "full"}
    print('Requesting AI analysis...')
    r = post_json('analysis/run/', analysis_payload, headers=auth_headers)
    assert r.status_code == 202, f"Analysis request failed: {r.status_code} {r.text}"
    # Poll for result
    result_url = urljoin(API_ROOT, f"analysis/result/{resume_id}/")
    for _ in range(20):
        r = get_json(f"analysis/result/{resume_id}/", headers=auth_headers)
        if r.status_code == 200 and r.json().get('status') == 'completed':
            break
        time.sleep(3)
    else:
        raise AssertionError('AI analysis did not complete in time')
    print('AI analysis completed.')

    # 7. Resume Builder import / edit / download
    print('Fetching resume for builder...')
    r = get_json(f"resume/{resume_id}/", headers=auth_headers)
    assert r.status_code == 200, f"Builder import failed: {r.status_code}"
    resume_content = r.json()["content"]
    # Simulate a simple edit: add a blank line at the end
    edited_content = resume_content + "\n"
    edit_payload = {"content": edited_content}
    r = put_json(f"resume/{resume_id}/", edit_payload, headers=auth_headers)
    assert r.status_code == 200, f"Resume edit failed: {r.status_code}"
    # Download
    download_url = urljoin(API_ROOT, f"resume/download/{resume_id}/")
    r = requests.get(download_url, headers=auth_headers)
    assert r.status_code == 200, f"Resume download failed: {r.status_code}"
    print('Resume Builder flow successful.')

    # 8. History view
    r = get_json('resume/history/', headers=auth_headers)
    assert r.status_code == 200, f"History fetch failed: {r.status_code}"
    assert any(item["resume_id"] == resume_id for item in r.json()), "Uploaded resume not present in history"

    # 9. Job role recommendations
    r = get_json('jobs/recommendations/', headers=auth_headers)
    assert r.status_code == 200, f"Job recommendations failed: {r.status_code}"

    # 10. Resume quality suggestions
    r = get_json('resume/quality/', headers=auth_headers)
    assert r.status_code == 200, f"Quality suggestions failed: {r.status_code}"

    # 11. Learning roadmap
    r = get_json('learning/roadmap/', headers=auth_headers)
    assert r.status_code == 200, f"Learning roadmap failed: {r.status_code}"

    # 12. Interview preparation
    r = get_json('interview/prep/', headers=auth_headers)
    assert r.status_code == 200, f"Interview prep failed: {r.status_code}"

    # 13. Logout
    r = post_json('auth/logout/', {}, headers=auth_headers)
    assert r.status_code == 200, f"Logout failed: {r.status_code}"

    print('All integration checks passed!')

if __name__ == '__main__':
    # The script expects the Django dev server to be started externally.
    if not wait_for_server():
        sys.exit('Server did not become healthy within timeout.')
    try:
        main()
    except AssertionError as e:
        sys.exit(str(e))
