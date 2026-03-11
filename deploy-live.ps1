# Get a LIVE link instantly - no GitHub needed
# Uses Surge.sh (free). Run in PowerShell.

$projectPath = $PSScriptRoot
Set-Location $projectPath

Write-Host "`n🌐 Deploying to Surge.sh for instant live link..." -ForegroundColor Cyan
Write-Host "   (First time: you'll create a free Surge account)`n" -ForegroundColor Gray

npx --yes surge . codetherapist.surge.sh

if ($LASTEXITCODE -eq 0) {
    Write-Host "`n✅ Your site is LIVE at: https://codetherapist.surge.sh" -ForegroundColor Green
} else {
    Write-Host "`n💡 If codetherapist.surge.sh is taken, run:" -ForegroundColor Yellow
    Write-Host "   npx surge ." -ForegroundColor White
    Write-Host "   (You'll get a random URL like something.surge.sh)`n" -ForegroundColor Gray
}
