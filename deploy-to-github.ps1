# Deploy codetherapist portfolio to GitHub + get live link
# Run from this folder in PowerShell

$repoName = "codetherapist-portfolio"
$projectPath = $PSScriptRoot

Write-Host "`n🚀 Deploying codetherapist portfolio..." -ForegroundColor Cyan
Set-Location $projectPath

# Step 1: Git init and commit
if (-not (Test-Path ".git")) {
    Write-Host "Initializing git..." -ForegroundColor Yellow
    git init
}
git add .
git status
git commit -m "Deploy: codetherapist portfolio" 2>$null
if ($LASTEXITCODE -ne 0) { git commit -m "Initial commit: codetherapist portfolio" }

# Step 2: Create repo on GitHub and push
Write-Host "`nCreating GitHub repo and pushing..." -ForegroundColor Yellow
gh repo create $repoName --public --source=. --remote=origin --push 2>$null
if ($LASTEXITCODE -eq 0) {
    $repoUrl = "https://github.com/codetherapistpita-oss/$repoName"
    Write-Host "`n✅ Done! Repo: $repoUrl" -ForegroundColor Green
    Write-Host "`nTo enable GitHub Pages (live site):" -ForegroundColor Cyan
    Write-Host "  1. Go to: $repoUrl/settings/pages"
    Write-Host "  2. Source: Deploy from branch"
    Write-Host "  3. Branch: main → / (root)"
    Write-Host "  4. Save → Your site: https://codetherapistpita-oss.github.io/$repoName/`n"
} else {
    Write-Host "`n⚠️  Could not create repo. Make sure:" -ForegroundColor Yellow
    Write-Host "  - GitHub CLI is installed: winget install GitHub.cli"
    Write-Host "  - You're logged in: gh auth login"
    Write-Host "`nOr create the repo manually at github.com/new named '$repoName', then run:" -ForegroundColor Cyan
    Write-Host "  git remote add origin https://github.com/codetherapistpita-oss/$repoName.git"
    Write-Host "  git branch -M main"
    Write-Host "  git push -u origin main`n"
}
