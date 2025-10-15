@echo off
echo Setting up git repository for Sweet Paradise...

REM Add git to PATH
set PATH=C:\Program Files\Git\cmd;%PATH%

REM Check git version
git --version

REM Check current status
echo Checking git status...
git status

REM Add all files
echo Adding all files...
git add .

REM Commit changes
echo Committing changes...
git commit -m "Initial commit: Sweet Paradise project with complete setup"

REM Check if remote origin exists
git remote -v

REM Remove existing origin if it exists
git remote remove origin 2>nul

REM Add your GitHub repository as remote
echo Adding remote repository...
git remote add origin https://github.com/Sarvesh-Shelgaonkar/Sweet_Paradise.git

REM Push to repository
echo Pushing to GitHub...
git branch -M main
git push -u origin main

echo Done! Project pushed to GitHub successfully.
pause