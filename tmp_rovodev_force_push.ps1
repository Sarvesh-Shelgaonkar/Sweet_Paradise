# Force push to GitHub repository
$gitPath = "C:\Program Files\Git\bin\git.exe"

Write-Host "=== Starting Fresh Git Setup ===" -ForegroundColor Green

# Initialize git if needed
Write-Host "Initializing git repository..." -ForegroundColor Yellow
& $gitPath init

# Add all files
Write-Host "Adding all files..." -ForegroundColor Yellow
& $gitPath add .

# Commit with message
Write-Host "Creating commit..." -ForegroundColor Yellow
& $gitPath commit -m "Sweet Paradise: Complete full-stack sweet shop management system"

# Remove any existing origin
Write-Host "Removing existing origin..." -ForegroundColor Yellow
& $gitPath remote remove origin 2>$null

# Add your GitHub repository
Write-Host "Adding GitHub remote..." -ForegroundColor Yellow
& $gitPath remote add origin https://github.com/Sarvesh-Shelgaonkar/Sweet_Paradise.git

# Set main branch
Write-Host "Setting main branch..." -ForegroundColor Yellow
& $gitPath branch -M main

# Force push to repository
Write-Host "Force pushing to GitHub..." -ForegroundColor Yellow
& $gitPath push -f origin main

Write-Host "=== Push Complete! ===" -ForegroundColor Green
Write-Host "Check your repository at: https://github.com/Sarvesh-Shelgaonkar/Sweet_Paradise" -ForegroundColor Cyan