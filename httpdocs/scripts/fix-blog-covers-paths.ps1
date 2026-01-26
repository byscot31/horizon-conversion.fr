# scripts/fix-blog-covers-paths.ps1
# Update cover paths in frontmatter to match desired image folders.

    [CmdletBinding()]
param(
    [string]$ContentRoot,
    [string]$AssetUrlBase = "/_assets_/images/blog",
    [switch]$DryRun
)

try {
    [Console]::OutputEncoding = [System.Text.Encoding]::UTF8
    $OutputEncoding = [System.Text.Encoding]::UTF8
} catch {}

function Fail($m){ throw $m }

$ScriptPath = $MyInvocation.MyCommand.Path
if ([string]::IsNullOrWhiteSpace($ScriptPath)) {
    Fail "Chemin script introuvable. Lance via: pwsh -File .\scripts\fix-blog-covers-paths.ps1"
}
$ScriptDir = Split-Path -Parent $ScriptPath

if ([string]::IsNullOrWhiteSpace($ContentRoot)) {
    $ContentRoot = Join-Path $ScriptDir "..\src\content\blog"
}
if (-not (Test-Path $ContentRoot)) { Fail "ContentRoot introuvable: $ContentRoot" }
$ContentRoot = (Resolve-Path $ContentRoot).Path

# ✅ Mapping des dossiers images voulu
$ImgFolderByService = @{
    "contenu-seo" = "contenu-seo"
    "cro" = "cro"
    "google-ads" = "google-ads"
    "seo-local" = "seo-local"
    "social" = "social"
    "tracking" = "analytics"     # si tu as encore un dossier service nommé tracking
    "analytics" = "analytics"    # service final
}

function Guess-ServiceFromPath([string]$FilePath) {
    $dir = Split-Path $FilePath -Parent
    return (Split-Path $dir -Leaf)
}

function Set-FrontMatterCover([string]$Text, [string]$NewCover) {
    if (-not ($Text -match "(?s)^---\s*.*?\s*---\s*")) {
        return "---`ncover: `"$NewCover`"`n---`n`n$Text"
    }
    if ($Text -match "(?m)^\s*cover\s*:") {
        return [regex]::Replace($Text, "(?m)^\s*cover\s*:\s*.+$", "cover: `"$NewCover`"")
    } else {
        return [regex]::Replace($Text, "(?s)^---\s*(.*?)\s*---", { param($m) "---`n$($m.Groups[1].Value)`ncover: `"$NewCover`"`n---" })
    }
}

$files = Get-ChildItem -Path $ContentRoot -Filter *.md -Recurse -File
Write-Host ("Fichiers trouvés: {0}" -f $files.Count)

$updated=0; $skipped=0

foreach($f in $files){
    $filePath = $f.FullName
    $service = Guess-ServiceFromPath $filePath
    $slug = [IO.Path]::GetFileNameWithoutExtension($filePath)

    $imgFolder = $ImgFolderByService[$service]
    if ([string]::IsNullOrWhiteSpace($imgFolder)) {
        Write-Warning "Service non mappé: '$service' -> skip ($filePath)"
        $skipped++; continue
    }

    $coverUrl = "$AssetUrlBase/$imgFolder/$slug.jpg"

    $md = Get-Content -LiteralPath $filePath -Raw -Encoding UTF8
    $newMd = Set-FrontMatterCover $md $coverUrl

    if ($newMd -ne $md) {
        if ($DryRun) {
            Write-Host ("DRYRUN -> {0} => cover: {1}" -f $filePath,$coverUrl)
        } else {
            Set-Content -LiteralPath $filePath -Value $newMd -Encoding UTF8
            Write-Host ("OK -> {0}" -f $coverUrl)
        }
        $updated++
    } else {
        $skipped++
    }
}

Write-Host ("Terminé. Updated={0} Skipped={1}" -f $updated,$skipped)