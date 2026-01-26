param(
    [Parameter(Mandatory=$true)]
    [string]$site
)

$root = Split-Path -Parent $MyInvocation.MyCommand.Path
$template = Join-Path $root "_astro-template"
$target = Join-Path $root $site

if (!(Test-Path $template)) { throw "Template introuvable: $template (crée _astro-template d'abord)" }
if (!(Test-Path $target))   { throw "Sous-domaine introuvable: $target" }

$pkg = Join-Path $target "package.json"

# Si déjà Astro, on installe juste les deps et on sort
if (Test-Path $pkg) {
    $content = Get-Content $pkg -Raw
    if ($content -match '"astro"\s*:') {
        Write-Host "Déjà Astro: $site -> npm install" -ForegroundColor Green
        npm --prefix $target install
        exit 0
    }
}

# Sauvegarde l'existant dans _legacy_YYYYMMDD_HHMMSS
$stamp = Get-Date -Format "yyyyMMdd_HHmmss"
$legacy = Join-Path $target "_legacy_$stamp"
New-Item -ItemType Directory -Path $legacy -Force | Out-Null

# Déplace tout sauf les dossiers _legacy_*
Get-ChildItem -Path $target -Force | Where-Object {
    $_.Name -notlike "_legacy_*"
} | ForEach-Object {
    Move-Item -Path $_.FullName -Destination $legacy -Force
}

Write-Host "Backup créé: $legacy" -ForegroundColor Yellow

# Copie le template dans le dossier cible (hors node_modules/dist/.git)
# Robocopy code 0-7 = succès
robocopy $template $target /E /XD "node_modules" "dist" ".git" | Out-Null
if ($LASTEXITCODE -ge 8) { throw "Robocopy a échoué (code $LASTEXITCODE)" }

# Install deps
Write-Host "npm install dans $site" -ForegroundColor Cyan
npm --prefix $target install

Write-Host "OK. Prochaines commandes :" -ForegroundColor Green
Write-Host "  cd $target" -ForegroundColor Green
Write-Host "  npm run dev" -ForegroundColor Green
Write-Host "  npm run build" -ForegroundColor Green
Write-Host "" -ForegroundColor Green
Write-Host "Ton ancien site est dans: $legacy" -ForegroundColor Yellow