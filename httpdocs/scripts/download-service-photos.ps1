# scripts/download-service-photos.ps1
# PowerShell 7+ recommandé (compatible PS 5.1)
# 25 photos gratuites par service, renommées avec les slugs
# Sources: Unsplash Source (sans clé, parfois instable) + fallback Picsum (stable)
# Sortie: public\_assets_\images\blog\cache\<service>\<slug>.jpg
# Option: si ImageMagick "magick" est dispo, crop 1200x630

    [CmdletBinding()]
param(
    [string]$ContentRoot,
    [string]$PublicRoot,
    [int]$PerService = 25,
    [int]$SrcWidth = 1600,
    [int]$SrcHeight = 900,
    [int]$OutWidth = 1200,
    [int]$OutHeight = 630,
    [ValidateSet("unsplash","picsum")]
    [string]$Provider = "unsplash",
    [switch]$NoResize,
    [switch]$AllowNoMd,   # si pas de .md, génère quand même des images (slugs auto)
    [switch]$DryRun
)

# UTF-8 console
try {
    [Console]::OutputEncoding = [System.Text.Encoding]::UTF8
    $OutputEncoding = [System.Text.Encoding]::UTF8
} catch {}

function Fail($m){ throw $m }
function Test-Command($n){ [bool](Get-Command $n -ErrorAction SilentlyContinue) }

# Chemin script fiable
$ScriptPath = $MyInvocation.MyCommand.Path
if ([string]::IsNullOrWhiteSpace($ScriptPath)) {
    Fail "Chemin script introuvable. Lance via: pwsh -File .\scripts\download-service-photos.ps1"
}
$ScriptDir = Split-Path -Parent $ScriptPath

# Defaults
if ([string]::IsNullOrWhiteSpace($ContentRoot)) { $ContentRoot = Join-Path $ScriptDir "..\src\content\blog" }
if ([string]::IsNullOrWhiteSpace($PublicRoot))  { $PublicRoot  = Join-Path $ScriptDir "..\public" }

if (-not (Test-Path $ContentRoot)) { Fail "ContentRoot introuvable: $ContentRoot" }
if (-not (Test-Path $PublicRoot))  { Fail "PublicRoot introuvable: $PublicRoot" }

$ContentRoot = (Resolve-Path $ContentRoot).Path
$PublicRoot  = (Resolve-Path $PublicRoot).Path

$CacheRoot = Join-Path $PublicRoot "_assets_\images\blog\cache"
if (-not (Test-Path $CacheRoot) -and -not $DryRun) {
    New-Item -ItemType Directory -Path $CacheRoot | Out-Null
}

$HasMagick = (Test-Command "magick") -and (-not $NoResize)

# Services attendus + alias
# => ton site a "tracking" mais tu demandes "analytics"
$Services = @(
"social-retargeting"
)

# Mots-clés "univers" par service
$Keywords = @{
    "social-retargeting"      = "social-media,network,community,notification,pattern,engagement"
}

function Download-WithRetry {
    param(
        [Parameter(Mandatory=$true)][string]$Url,
        [Parameter(Mandatory=$true)][string]$OutFile,
        [int]$Tries = 3
    )

    $headers = @{
        "User-Agent" = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome Safari"
        "Accept"     = "image/avif,image/webp,image/apng,image/*,*/*;q=0.8"
    }

    for ($i=1; $i -le $Tries; $i++) {
        try {
            Invoke-WebRequest -Uri $Url -OutFile $OutFile -Headers $headers -MaximumRedirection 10 -TimeoutSec 60 -ErrorAction Stop | Out-Null
            if ((Test-Path $OutFile) -and ((Get-Item $OutFile).Length -gt 30kb)) { return $OutFile }
            throw "Fichier téléchargé trop petit / invalide."
        }
        catch {
            $sleep = [Math]::Min(12, [Math]::Pow(2, $i))  # 2,4,8...
            Write-Warning ("Download failed (try {0}/{1}) -> wait {2}s | {3}" -f $i,$Tries,$sleep,$Url)
            Start-Sleep -Seconds $sleep
        }
    }

    throw "Téléchargement impossible: $Url"
}

function Get-UnsplashUrl([string]$service){
    $kw = $Keywords[$service]
    if (-not $kw) { $kw = "abstract,technology,gradient" }
    return ("https://source.unsplash.com/{0}x{1}/?{2}" -f $SrcWidth,$SrcHeight,$kw)
}

function Get-PicsumUrl([string]$seed){
    return ("https://picsum.photos/seed/{0}/{1}/{2}.jpg" -f [uri]::EscapeDataString($seed),$SrcWidth,$SrcHeight)
}

function Ensure-Folder($p){
    if (-not (Test-Path $p) -and -not $DryRun) { New-Item -ItemType Directory -Path $p | Out-Null }
}

function Get-ServiceSlugs([string]$serviceDir, [int]$limit, [string]$service){
    if (Test-Path $serviceDir) {
        $mds = Get-ChildItem -Path $serviceDir -Filter *.md -File | Sort-Object Name
        $slugs = $mds | ForEach-Object { [IO.Path]::GetFileNameWithoutExtension($_.FullName) }
        if ($slugs.Count -gt 0) {
            if ($limit -gt 0) { return $slugs | Select-Object -First $limit }
            return $slugs
        }
    }

    if ($AllowNoMd) {
        # Slugs auto si aucun .md
        return 1..$limit | ForEach-Object { "{0}-{1:00}" -f $service, $_ }
    }

    return @()
}

Write-Host ("Provider={0} | PerService={1} | Resize={2}" -f $Provider,$PerService,($HasMagick))

$ok=0; $skip=0; $fail=0

foreach($service in $Services){

    $serviceDir = Join-Path $ContentRoot $service
    $slugs = Get-ServiceSlugs $serviceDir $PerService $service

    if ($slugs.Count -eq 0) {
        Write-Warning "Aucun .md trouvé pour service '$service' dans: $serviceDir (mets -AllowNoMd pour générer quand même)"
        continue
    }

    $outDir = Join-Path $CacheRoot $service
    Ensure-Folder $outDir

    Write-Host ("--- {0}: {1} images ---" -f $service,$slugs.Count)

    foreach($slug in $slugs){
        $outJpg = Join-Path $outDir ($slug + ".jpg")
        if (Test-Path $outJpg) { Write-Host "SKIP exists -> $outJpg"; $skip++; continue }

        try {
            if ($DryRun) { Write-Host ("DRYRUN -> {0}\{1}.jpg" -f $service,$slug); continue }

            $tmp = Join-Path ([IO.Path]::GetTempPath()) ("hc_dl_{0}.jpg" -f ([guid]::NewGuid().ToString("N")))

            # UNSPLASH d’abord (2 tentatives) puis fallback PICSUM
            if ($Provider -eq "unsplash") {
                $u = Get-UnsplashUrl $service
                try {
                    Download-WithRetry -Url $u -OutFile $tmp -Tries 2 | Out-Null
                } catch {
                    $fb = Get-PicsumUrl ("$service-$slug")
                    Write-Warning "Unsplash KO -> Fallback Picsum"
                    Download-WithRetry -Url $fb -OutFile $tmp -Tries 3 | Out-Null
                }
            } else {
                $fb = Get-PicsumUrl ("$service-$slug")
                Download-WithRetry -Url $fb -OutFile $tmp -Tries 3 | Out-Null
            }

            if ($HasMagick) {
                & magick $tmp `
          -resize ("{0}x{1}^" -f $OutWidth,$OutHeight) -gravity center -extent ("{0}x{1}" -f $OutWidth,$OutHeight) `
          -quality 90 $outJpg | Out-Null
                Remove-Item -Force $tmp -ErrorAction SilentlyContinue
            } else {
                Move-Item -Force $tmp $outJpg
            }

            Write-Host ("OK -> {0}" -f $outJpg)
            $ok++
        }
        catch {
            Write-Warning ("FAIL -> {0}/{1} : {2}" -f $service,$slug,$_.Exception.Message)
            $fail++
        }
    }
}

Write-Host ("Terminé. OK={0} SKIP={1} FAIL={2}" -f $ok,$skip,$fail)
Write-Host ("Dossier cache: {0}" -f $CacheRoot)