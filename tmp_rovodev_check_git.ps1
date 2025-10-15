# Check git status and push to GitHub
$gitPath = "C:\Program Files\Git\bin\git.exe"

Write-Host "=== Checking Git Status ===" -ForegroundColor Cyan

# Check current directory
Write-Host "Current directory: $(Get-Location)" -ForegroundColor Yellow

# Check if .git exists
if (Test-Path ".git") {
    Write-Host ".git directory exists" -ForegroundColor Green
} else {
    Write-Host ".git directory NOT found" -ForegroundColor Red
}

# Check git status
Write-Host "`n=== Git Status ===" -ForegroundColor Cyan
try {
    $status = & $gitPath status 2>&1
    Write-Host $status
} catch {
    Write-Host "Error running git status: $_" -ForegroundColor Red
}

# Check remotes
Write-Host "`n=== Git Remotes ===" -ForegroundColor Cyan
try {
    $remotes = & $gitPath remote -v 2>&1
    Write-Host $remotes
} catch {
    Write-Host "Error checking remotes: $_" -ForegroundColor Red
}

# Check branches
Write-Host "`n=== Git Branches ===" -ForegroundColor Cyan
try {
    $branches = & $gitPath branch -a 2>&1
    Write-Host $branches
} catch {
    Write-Host "Error checking branches: $_" -ForegroundColor Red
}