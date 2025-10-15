# PowerShell script to push to GitHub
$gitPath = "C:\Program Files\Git\bin\git.exe"

Write-Host "Setting up Sweet Paradise project for GitHub..." -ForegroundColor Green

# Check if git exists
if (Test-Path $gitPath) {
    Write-Host "Git found at: $gitPath" -ForegroundColor Green
    
    # Check git status
    Write-Host "Checking git status..." -ForegroundColor Yellow
    & $gitPath status
    
    # Add all files
    Write-Host "Adding all files..." -ForegroundColor Yellow
    & $gitPath add .
    
    # Commit changes
    Write-Host "Committing changes..." -ForegroundColor Yellow
    & $gitPath commit -m "Initial commit: Sweet Paradise project with complete setup"
    
    # Check existing remotes
    Write-Host "Checking existing remotes..." -ForegroundColor Yellow
    & $gitPath remote -v
    
    # Remove existing origin if exists
    & $gitPath remote remove origin 2>$null
    
    # Add new remote
    Write-Host "Adding GitHub remote..." -ForegroundColor Yellow
    & $gitPath remote add origin https://github.com/Sarvesh-Shelgaonkar/Sweet_Paradise.git
    
    # Set main branch and push
    Write-Host "Pushing to GitHub..." -ForegroundColor Yellow
    & $gitPath branch -M main
    & $gitPath push -u origin main
    
    Write-Host "Successfully pushed to GitHub!" -ForegroundColor Green
} else {
    Write-Host "Git not found at expected location" -ForegroundColor Red
}