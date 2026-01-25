# scripts/generate-data-csv.ps1
# Génère un data.csv : dataset=slug, title=frontmatter title, bg=chemin complet vers ...\cache\slug.jpg

    [CmdletBinding()]
param(
    [string]$ContentRoot,
    [string]$PublicRoot,
    [string]$CacheSubPath = "_assets_\images\blog\cache",
    [string]$OutFile
)

# UTF-8 console
try {
    [Console]::OutputEncoding = [System.Text.Encoding]::UTF8
    $OutputEncoding = [System.Text.Encoding]::UTF8
} catch {}

function Fail($m){ throw $m }

# Chemin script
$ScriptPath = $MyInvocation.MyCommand.Path
if ([string]::IsNullOrWhiteSpace($ScriptPath)) {
    Fail "Chemin script introuvable. Lance via: pwsh -File .\scripts\generate-data-csv.ps1"
}
$ScriptDir = Split-Path -Parent $ScriptPath

# Defaults
if ([string]::IsNullOrWhiteSpace($ContentRoot)) { $ContentRoot = Join-Path $ScriptDir "..\src\content\blog" }
if ([string]::IsNullOrWhiteSpace($PublicRoot))  { $PublicRoot  = Join-Path $ScriptDir "..\public" }
if ([string]::IsNullOrWhiteSpace($OutFile))     { $OutFile     = Join-Path $ScriptDir "..\data.csv" }

if (-not (Test-Path $ContentRoot)) { Fail "ContentRoot introuvable: $ContentRoot" }
if (-not (Test-Path $PublicRoot))  { Fail "PublicRoot introuvable: $PublicRoot" }

$ContentRoot = (Resolve-Path $ContentRoot).Path
$PublicRoot  = (Resolve-Path $PublicRoot).Path
$OutFile     = (Resolve-Path (Split-Path $OutFile -Parent)).Path + "\" + (Split-Path $OutFile -Leaf)

$CacheDir = Join-Path $PublicRoot $CacheSubPath
# On ne force pas l'existence du cache, juste le chemin cible
$CacheDir = $CacheDir.TrimEnd('\')

function Get-FrontMatterValue([string]$Text, [string]$Key) {
    $rx = "(?m)^\s*$([regex]::Escape($Key))\s*:\s*(.+)\s*$"
    $m = [regex]::Match($Text, $rx)
    if (-not $m.Success) { return $null }
    $raw = $m.Groups[2].Value.Trim()
    if ($raw.StartsWith('"') -and $raw.EndsWith('"')) { $raw = $raw.Substring(1, $raw.Length-2) }
    if ($raw.StartsWith("'") -and $raw.EndsWith("'")) { $raw = $raw.Substring(1, $raw.Length-2) }
    return $raw
}

function ShortTitle([string]$Title) {
    if ([string]::IsNullOrWhiteSpace($Title)) { return "" }
    $t = $Title.Trim()
    # ici "non rogné" => on ne tronque pas. (si tu veux limiter: décommente)
    # if ($t.Length -gt 70) { $t = $t.Substring(0, 70).TrimEnd() + "…" }
    return $t
}

$mdFiles = Get-ChildItem -Path $ContentRoot -Filter *.md -Recurse -File
Write-Host ("Fichiers .md trouvés: {0}" -f $mdFiles.Count)

$rows = foreach ($f in $mdFiles) {
    $slug = [IO.Path]::GetFileNameWithoutExtension($f.FullName)
    $md   = Get-Content -LiteralPath $f.FullName -Raw -Encoding UTF8

    $title = Get-FrontMatterValue $md "title"
    if ([string]::IsNullOrWhiteSpace($title)) {
        $title = ($slug -replace "-", " ")
    }
    $title = ShortTitle $title

    # bg -> ...\public\_assets_\images\blog\cache\slug.jpg
    $bgPath = Join-Path $CacheDir ($slug + ".jpg")

    [pscustomobject]@{
        dataset = $slug
        title   = $title
        bg      = $bgPath
    }
}

# Export CSV
$rows | Export-Csv -LiteralPath $OutFile -NoTypeInformation -Encoding UTF8

Write-Host "OK -> $OutFile"
Write-Host ("Exemple bg: {0}" -f (Join-Path $CacheDir "exemple-slug.jpg"))