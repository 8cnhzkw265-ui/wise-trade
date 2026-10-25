# Syntax-checks every JS file using the Windows Script Host JScript engine.
# Run:  powershell -NoProfile -ExecutionPolicy Bypass -File tools\check-js.ps1
#
# CScript parses each file, so a syntax error makes it emit a line number
# and exit non-zero. This catches the class of mistake that would otherwise
# only show up silently in the browser console.

$Root = Split-Path -Parent $PSScriptRoot
$JsDir = Join-Path $Root 'assets\js'
$Fail = 0

Write-Output "=== JS syntax check ===`n"

Get-ChildItem -Path $JsDir -Filter *.js -File | ForEach-Object {
  $file = $_
  $tmp = Join-Path $env:TEMP ('wt_check_' + [System.IO.Path]::GetFileNameWithoutExtension($file.Name) + '.js')

  # read as UTF-8 and write back without BOM for the legacy parser
  $text = [System.IO.File]::ReadAllText($file.FullName)
  [System.IO.File]::WriteAllText($tmp, $text, (New-Object System.Text.UTF8Encoding($false)))

  $output = & cscript //nologo //E:JScript $tmp 2>&1
  $code = $LASTEXITCODE

  if ($code -eq 0) {
    Write-Output "  [ok]   $($file.Name)"
  } else {
    Write-Output "  [FAIL] $($file.Name)"
    $output | ForEach-Object { Write-Output "         $_" }
    $Fail++
  }
  Remove-Item $tmp -ErrorAction SilentlyContinue
}

Write-Output "`n=== $Fail file(s) with syntax errors ==="
if ($Fail -gt 0) { exit 1 } else { exit 0 }
