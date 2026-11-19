# PowerShell script to run the full Skillora AI test suite
# Place this file at the repository root: c:/Users/meera/Skillora-AI/run_full_tests.ps1
# Prerequisites: Python 3, Node.js, npm, MongoDB, and the `py` launcher available in PATH.

$ErrorActionPreference = 'Stop'

Write-Host "=== Setting up Python virtual environment ==="
Set-Location "c:/Users/meera/Skillora-AI/backend"
if (-Not (Test-Path -Path 'venv')) {
    py -3 -m venv venv
}
& "./venv/Scripts/Activate.ps1"
pip install -r requirements.txt

Write-Host "=== Starting Django development server (background) ==="
# Run the server in a background job; it will listen on port 8000
Start-Job -ScriptBlock { python manage.py runserver 0.0.0.0:8000 } -Name DjangoServer

function Wait-ForDjango {
    $max = 30
    $url = 'http://127.0.0.1:8000/api/health/'
    for ($i=0; $i -lt $max; $i++) {
        try {
            $r = Invoke-WebRequest -Uri $url -UseBasicParsing -TimeoutSec 2
            if ($r.StatusCode -eq 200) { return }
        } catch { }
        Start-Sleep -Seconds 1
    }
    throw "Django server did not become healthy in time"
}
Wait-ForDjango

Write-Host "=== Installing frontend dependencies ==="
Set-Location "c:/Users/meera/Skillora-AI/frontend"
npm ci
# Ensure Cypress is available
npm install cypress --save-dev

Write-Host "=== Starting Vite dev server (background) ==="
Start-Job -ScriptBlock { npm run dev } -Name ViteServer
# Give Vite a moment to start
Start-Sleep -Seconds 5

Write-Host "=== Running Cypress end‑to‑end tests ==="
npx cypress run --config-file e2e/cypress.config.js --spec "e2e/specs/**/*.cy.js"
$cypressExit = $LASTEXITCODE

Write-Host "=== Running Python integration test suite ==="
Set-Location "c:/Users/meera/Skillora-AI/backend"
python tests/integration_test_suite.py
$pythonExit = $LASTEXITCODE

# Generate a simple markdown report
$report = @"
# Skillora AI Full Test Report

- Cypress UI tests exit code: $cypressExit
- Python integration tests exit code: $pythonExit

All steps have been executed. Review the console output above for details.
"@
$report | Out-File -Encoding utf8 "c:/Users/meera/Skillora-AI/test_report.md"

Write-Host "=== Stopping background servers ==="
Get-Job | Stop-Job -Force | Remove-Job

Write-Host "Test run complete. See test_report.md for summary."
