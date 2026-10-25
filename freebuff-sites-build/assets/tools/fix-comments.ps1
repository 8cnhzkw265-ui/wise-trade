# Restores CSS block comments mangled as ** ... ** back to /* ... */
$files = @('assets/css/sections.css')
foreach ($f in $files) {
  $lines = Get-Content $f
  $out = @()
  $inComment = $false
  foreach ($line in $lines) {
    if (-not $inComment -and $line -match '^\*\*') {
      $line = $line -replace '^\*\*', '/*'
      if ($line -match '\*\*\s*$') {
        $line = $line -replace '\*\*\s*$', '*/'
      } else {
        $inComment = $true
      }
      $out += $line
    } elseif ($inComment) {
      if ($line -match '\*\*') {
        $line = $line -replace '\*\*.*$', '*/'
        $inComment = $false
      }
      $out += $line
    } else {
      $out += $line
    }
  }
  $out | Set-Content $f -Encoding UTF8
  Write-Output "$f fixed"
}
