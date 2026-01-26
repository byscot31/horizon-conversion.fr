param(
    [Parameter(Mandatory=$true)]
    [string]$site
)

$root = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $root

$sitePath = Join-Path $root $site
if (!(Test-Path $sitePath)) {
    throw "Dossier introuvable: $sitePath"
}

$pkg = Join-Path $sitePath "package.json"
if (!(Test-Path $pkg)) {
    throw "package.json introuvable dans: $sitePath (pas un projet Astro ?)"
}

Write-Host "==> Build du site: $site" -ForegroundColor Cyan

# install deps + build (npm)
npm --prefix $sitePath ci
npm --prefix $sitePath run build

$dist = Join-Path $sitePath "dist"
if (!(Test-Path $dist)) {
    throw "dist introuvable après build: $dist"
}

# staging vers _deploy/<subdomain>/
$deployRoot = Join-Path $root "_deploy"
$dest = Join-Path $deployRoot $site

# nettoie l'ancien staging du site
if (Test-Path $dest) { Remove-Item $dest -Recurse -Force }
New-Item -ItemType Directory -Path $dest -Force | Out-Null

Copy-Item (Join-Path $dist "*") $dest -Recurse -Force

Write-Host "OK: staging prêt -> $dest" -ForegroundColor Green
Write-Host "Upload ensuite: _deploy\$site vers /var/www/vhosts/horizon-conversion.fr/$site/" -ForegroundColor Yellow