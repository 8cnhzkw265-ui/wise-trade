# Generates the four category bento images into assets\img
# Warm, photographic-feeling scenes on a neutral ground.
# Run:  powershell -ExecutionPolicy Bypass -File tools\gen-categories.ps1

$Out = Join-Path (Split-Path -Parent $PSScriptRoot) 'assets\img'

# ---------- Organizers: walnut tray with phone, watch, keys ----------
$organizers = @'
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 900" width="1200" height="900" role="img" aria-label="Desk organizers">
<defs>
<linearGradient id="o-bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#e6dcc8"/><stop offset="1" stop-color="#cfc2a8"/></linearGradient>
<linearGradient id="o-wood" x1="0" y1="0" x2="0.2" y2="1"><stop offset="0" stop-color="#b5814b"/><stop offset="1" stop-color="#8b5a2b"/></linearGradient>
<linearGradient id="o-steel" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#3a3d40"/><stop offset="1" stop-color="#1c1e20"/></linearGradient>
</defs>
<rect width="1200" height="900" fill="url(#o-bg)"/>
<ellipse cx="600" cy="740" rx="400" ry="52" fill="#6b5a3c" opacity=".3"/>
<rect x="240" y="300" width="720" height="400" rx="34" fill="url(#o-wood)"/>
<rect x="240" y="300" width="720" height="400" rx="34" fill="none" stroke="#7a4f28" stroke-width="4"/>
<rect x="278" y="336" width="644" height="328" rx="20" fill="#a8743f"/>
<rect x="278" y="336" width="644" height="328" rx="20" fill="none" stroke="#8b5f34" stroke-width="3"/>
<!-- phone on a stand -->
<g transform="translate(470 470)">
<rect x="-58" y="-96" width="116" height="196" rx="18" fill="#25272a"/>
<rect x="-50" y="-88" width="100" height="180" rx="13" fill="#0f1113"/>
<rect x="-24" y="100" width="48" height="16" rx="6" fill="url(#o-steel)"/>
</g>
<!-- small tray -->
<g transform="translate(700 430)">
<rect x="-110" y="-70" width="220" height="140" rx="16" fill="url(#o-steel)"/>
<rect x="-92" y="-52" width="184" height="104" rx="10" fill="#2a2d30"/>
<rect x="-92" y="-52" width="184" height="104" rx="10" fill="#fff" opacity=".05"/>
</g>
<!-- keys -->
<g transform="translate(700 620)">
<circle cx="0" cy="0" r="26" fill="none" stroke="#c9a86a" stroke-width="7"/>
<path d="M24 12l52 26" stroke="#c9a86a" stroke-width="7" stroke-linecap="round"/>
<path d="M60 34l14-10M74 42l12-9" stroke="#c9a86a" stroke-width="6" stroke-linecap="round"/>
</g>
</svg>
'@

# ---------- Chargers: dock, brick and braided cable ----------
$chargers = @'
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 900" width="800" height="900" role="img" aria-label="Chargers and power">
<defs>
<linearGradient id="c-bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#dfe2dd"/><stop offset="1" stop-color="#c4c9c1"/></linearGradient>
<linearGradient id="c-alu" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8d949c"/><stop offset=".5" stop-color="#c3c9cf"/><stop offset="1" stop-color="#767d85"/></linearGradient>
<linearGradient id="c-dark" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#33383d"/><stop offset="1" stop-color="#1a1d20"/></linearGradient>
</defs>
<rect width="800" height="900" fill="url(#c-bg)"/>
<ellipse cx="400" cy="740" rx="270" ry="40" fill="#4d5349" opacity=".26"/>
<!-- dock -->
<g transform="translate(400 470)">
<rect x="-230" y="-40" width="460" height="180" rx="24" fill="url(#c-alu)"/>
<rect x="-230" y="-40" width="460" height="180" rx="24" fill="none" stroke="#6f767e" stroke-width="3"/>
<rect x="-196" y="-8" width="130" height="18" rx="9" fill="#20242a"/>
<rect x="66" y="-8" width="130" height="18" rx="9" fill="#20242a"/>
<g fill="#1b1e21"><rect x="-196" y="46" width="70" height="16" rx="8"/><rect x="-110" y="46" width="70" height="16" rx="8"/><rect x="-24" y="46" width="70" height="16" rx="8"/></g>
<g fill="#e6e8ea"><rect x="-196" y="86" width="60" height="15" rx="7"/><rect x="-120" y="86" width="60" height="15" rx="7"/><rect x="-44" y="86" width="60" height="15" rx="7"/></g>
</g>
<!-- charger brick -->
<g transform="translate(400 700)">
<rect x="-90" y="-58" width="180" height="116" rx="26" fill="url(#c-dark)"/>
<rect x="-90" y="-58" width="180" height="116" rx="26" fill="#fff" opacity=".05"/>
<rect x="-58" y="-24" width="48" height="13" rx="6" fill="#d8dcd0"/>
<rect x="10" y="-24" width="48" height="13" rx="6" fill="#d8dcd0"/>
<circle cx="-34" cy="22" r="7" fill="#d98a2b"/>
</g>
<!-- braided cable -->
<path d="M120 240c120 40 120 150 60 220" fill="none" stroke="#4a4f56" stroke-width="22" stroke-linecap="round"/>
<path d="M120 240c120 40 120 150 60 220" fill="none" stroke="#c3c9cf" stroke-width="6" stroke-dasharray="12 12" opacity=".55"/>
</svg>
'@

# ---------- Productivity: notebook, pen, monitor arm ----------
$productivity = @'
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="800" height="600" role="img" aria-label="Productivity tools">
<defs>
<linearGradient id="p-bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#e9e5da"/><stop offset="1" stop-color="#d2ccbc"/></linearGradient>
<linearGradient id="p-cover" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#3a3d38"/><stop offset="1" stop-color="#222420"/></linearGradient>
</defs>
<rect width="800" height="600" fill="url(#p-bg)"/>
<ellipse cx="400" cy="500" rx="290" ry="40" fill="#6a6152" opacity=".24"/>
<!-- notebook -->
<g transform="translate(330 330) rotate(-6)">
<rect x="-150" y="-160" width="300" height="330" rx="12" fill="url(#p-cover)"/>
<rect x="-126" y="-140" width="252" height="290" rx="6" fill="#f6f2e8"/>
<g stroke="#d5cebd" stroke-width="2">
<path d="M-104 -100h208M-104 -64h208M-104 -28h208M-104 8h208M-104 44h208M-104 80h150"/>
</g>
<rect x="-150" y="-160" width="26" height="330" rx="10" fill="#8b5a2b"/>
</g>
<!-- pen -->
<g transform="translate(560 300) rotate(24)">
<rect x="-14" y="-170" width="28" height="250" rx="12" fill="#2a2d31"/>
<path d="M-14 -170l14 -40 14 40z" fill="#9aa0a6"/>
<rect x="-15" y="62" width="30" height="16" rx="6" fill="#9aa0a6"/>
</g>
<!-- screen -->
<g transform="translate(360 200)">
<rect x="-140" y="-90" width="280" height="150" rx="10" fill="#2a2d2f"/>
<rect x="-128" y="-78" width="256" height="126" rx="5" fill="#4a5c42"/>
<path d="M-106 30l28-34 26 24 30-40 34 42" fill="none" stroke="#9db584" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
<rect x="-12" y="60" width="24" height="18" fill="#2a2d2f"/>
<rect x="-56" y="78" width="112" height="10" rx="5" fill="#2a2d2f"/>
</g>
</svg>
'@

# ---------- Decor: lamp, felt mat, brass tray ----------
$decor = @'
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="800" height="600" role="img" aria-label="Desk decor">
<defs>
<linearGradient id="d-bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#efe9dc"/><stop offset="1" stop-color="#d8d0bf"/></linearGradient>
<linearGradient id="d-shade" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#d98a2b"/><stop offset="1" stop-color="#a8631a"/></linearGradient>
<linearGradient id="d-brass" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#d8b47a"/><stop offset="1" stop-color="#9c7b3f"/></linearGradient>
</defs>
<rect width="800" height="600" fill="url(#d-bg)"/>
<ellipse cx="400" cy="500" rx="300" ry="42" fill="#6a6152" opacity=".22"/>
<!-- felt mat -->
<rect x="120" y="330" width="560" height="150" rx="22" fill="#4a4d42"/>
<rect x="120" y="330" width="560" height="150" rx="22" fill="#fff" opacity=".04"/>
<!-- lamp -->
<g transform="translate(300 330)">
<ellipse cx="0" cy="0" rx="82" ry="18" fill="#2b2e26"/>
<ellipse cx="0" cy="-8" rx="82" ry="18" fill="#454a40"/>
<rect x="-6" y="-170" width="12" height="164" fill="#9aa0a6"/>
<path d="M0 -240l-58 82h116z" fill="url(#d-shade)"/>
<path d="M0 -224l-38 60h76z" fill="#f6e6c4" opacity=".65"/>
</g>
<!-- brass tray -->
<g transform="translate(520 400)">
<rect x="-90" y="-56" width="180" height="112" rx="14" fill="url(#d-brass)"/>
<rect x="-74" y="-40" width="148" height="80" rx="8" fill="#8a6a3a"/>
<rect x="-90" y="-56" width="180" height="112" rx="14" fill="none" stroke="#8a6a3a" stroke-width="2"/>
</g>
<!-- plant -->
<g transform="translate(660 340)">
<rect x="-24" y="0" width="48" height="46" rx="6" fill="#c8a97c"/>
<path d="M0 0c-4-42 10-70 30-86-2 30-8 56-18 86z" fill="#4a6b45"/>
<path d="M0 0c6-38-6-64-26-78 8 30 14 52 20 78z" fill="#3c5c3c"/>
</g>
</svg>
'@

$Utf8NoBom = New-Object System.Text.UTF8Encoding($false)
$map = @{
  'cat-organizers.svg'   = $organizers
  'cat-chargers.svg'     = $chargers
  'cat-productivity.svg' = $productivity
  'cat-decor.svg'        = $decor
}
foreach ($k in $map.Keys) {
  [System.IO.File]::WriteAllText((Join-Path $Out $k), $map[$k], $Utf8NoBom)
}
Write-Output "Generated $($map.Count) category images in $Out"

