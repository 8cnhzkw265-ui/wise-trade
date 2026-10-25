# Validates that every local asset referenced by the HTML and JS actually exists.
# Run:  powershell -NoProfile -ExecutionPolicy Bypass -File tools\validate.ps1

$Root = Split-Path -Parent $PSScriptRoot
$Fail = 0
$Checked = 0

Write-Output "=== Wise Trade asset validation ===`n"

# --- 1. structural check: required files present ---
$required = @(
  'index.html', 'shop.html', 'product.html',
  'assets\css\base.css', 'assets\css\components.css',
  'assets\css\sections.css', 'assets\css\pages.css',
  'assets\css\motion.css',
  'assets\js\icons.js', 'assets\js\data.js', 'assets\js\app.js',
  'assets\js\motion.js', 'assets\js\shop.js', 'assets\js\product.js'
)
foreach ($r in $required) {
  $p = Join-Path $Root $r
  if (Test-Path $p) {
    Write-Output "  [ok]   $r"
  } else {
    Write-Output "  [MISS] $r"
    $Fail++
  }
}

# --- 2. reference check: src / href in HTML ---
Write-Output "`n--- HTML asset references ---"
Get-ChildItem -Path $Root -Filter *.html -File | ForEach-Object {
  $file = $_
  $html = Get-Content $file.FullName -Raw
  $base = $file.DirectoryName

  $matches = [regex]::Matches($html, '(?:src|href)="([^"]+)"')
  foreach ($m in $matches) {
    $ref = $m.Groups[1].Value
    # skip external, anchors, data: uris and mailto
    if ($ref -match '^(https?:|//|#|data:|mailto:|tel:)' -or $ref -eq '') { continue }
    # strip any #anchor and ?query before resolving the file path
    $path = ($ref -split '#')[0]
    $path = ($path -split '\?')[0]
    if ($path -eq '') { continue }
    $Checked++
    $target = Join-Path $base $path
    if (Test-Path $target) {
      Write-Output "  [ok]   $($file.Name) -> $ref"
    } else {
      Write-Output "  [MISS] $($file.Name) -> $ref"
      $Fail++
    }
  }
}

# --- 3. reference check: image paths built inside JS ---
Write-Output "`n--- JS image references ---"
Get-ChildItem -Path (Join-Path $Root 'assets\js') -Filter *.js -File | ForEach-Object {
  $file = $_
  $js = Get-Content $file.FullName -Raw
  $matches = [regex]::Matches($js, "assets/img/([A-Za-z0-9\-_]+)\.svg")
  $names = $matches | ForEach-Object { $_.Groups[1].Value } | Sort-Object -Unique
  foreach ($n in $names) {
    $Checked++
    $target = Join-Path $Root "assets\img\$n.svg"
    if (Test-Path $target) {
      Write-Output "  [ok]   $($file.Name) -> assets/img/$n.svg"
    } else {
      Write-Output "  [MISS] $($file.Name) -> assets/img/$n.svg"
      $Fail++
    }
  }
}

# --- 4. balance check: every <use href="#i-..."> has a matching symbol ---
Write-Output "`n--- icon sprite integrity ---"
$iconsJs = Get-Content (Join-Path $Root 'assets\js\icons.js') -Raw
$defined = [regex]::Matches($iconsJs, '"(i-[a-z\-]+)"\s*:\s*\{') | ForEach-Object { $_.Groups[1].Value } | Sort-Object -Unique
Write-Output "  defined symbols: $($defined.Count)"

Get-ChildItem -Path $Root -Filter *.html -File | ForEach-Object {
  $file = $_
  $html = Get-Content $file.FullName -Raw
  $used = [regex]::Matches($html, '<use href="#(i-[a-z\-]+)"') | ForEach-Object { $_.Groups[1].Value } | Sort-Object -Unique
  foreach ($u in $used) {
    $Checked++
    if ($defined -contains $u) {
      Write-Output "  [ok]   $($file.Name) uses #$u"
    } else {
      Write-Output "  [MISS] $($file.Name) uses #$u (not in sprite)"
      $Fail++
    }
  }
}

Write-Output "`n=== checked $Checked references, $Fail problem(s) ==="
if ($Fail -gt 0) { exit 1 } else { exit 0 }
