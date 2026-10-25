# Generates the 12 product SVGs (+ hover variants) into assets\img
# Objects are drawn on a TRANSPARENT ground so the beige card shows
# through, matching the reference product photography.
# Run:  powershell -ExecutionPolicy Bypass -File tools\gen-products.ps1

$Out = Join-Path (Split-Path -Parent $PSScriptRoot) 'assets\img'

function Shadow { '<ellipse cx="300" cy="466" rx="150" ry="24" fill="#2b2721" opacity=".13"/>' }

$Art = @{}

# --- walnut MagSafe stand on a blackened steel wedge ---
$Art['magsafe'] = {
@'
<ellipse cx="300" cy="452" rx="148" ry="24" fill="#2b2721" opacity=".14"/>
<path d="M206 388l198-28v26L210 414z" fill="#12100e"/>
<path d="M212 400l192-26 6 80-192 24z" fill="#1f1c18"/>
<g transform="rotate(-11 302 292)">
  <rect x="196" y="174" width="212" height="238" rx="16" fill="#8b5a2b"/>
  <rect x="196" y="174" width="212" height="238" rx="16" fill="#000" opacity=".08"/>
  <circle cx="302" cy="292" r="82" fill="#e9e4da"/>
  <circle cx="302" cy="292" r="73" fill="#f4f0e7"/>
  <circle cx="302" cy="292" r="58" fill="#e3ded3" opacity=".75"/>
</g>
<path d="M300 414c0 24 10 38 26 44" fill="none" stroke="#e9e4da" stroke-width="9" stroke-linecap="round"/>
<circle cx="332" cy="460" r="11" fill="#e9e4da"/>
'@
}

# --- dark felt-lined note tray ---
$Art['tray-dark'] = {
@'
<defs><linearGradient id="fd" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#575c51"/><stop offset="1" stop-color="#2e322b"/></linearGradient></defs>
<ellipse cx="300" cy="434" rx="162" ry="24" fill="#2b2721" opacity=".14"/>
<path d="M170 234l270-24 14 28-270 26z" fill="#0f0e0c"/>
<path d="M184 264l270-26v152l-270 24z" fill="#1f1c18"/>
<path d="M200 284l238-22v118l-238 22z" fill="url(#fd)"/>
<path d="M184 264l270-26v152l-270 24z" fill="none" stroke="#0b0a09" stroke-width="2"/>
'@
}

# --- pale tray ---
$Art['tray-light'] = {
@'
<ellipse cx="300" cy="440" rx="170" ry="24" fill="#2b2721" opacity=".14"/>
<path d="M158 226l298-26 16 30-298 28z" fill="#cbc4b4"/>
<path d="M174 258l298-28v168l-298 26z" fill="#efe9dd"/>
<path d="M192 282l262-24v134l-262 22z" fill="#ded6c4"/>
<path d="M174 258l298-28v168l-298 26z" fill="none" stroke="#b5ac9a" stroke-width="2"/>
'@
}

# --- open cable case with coiled leads ---
$Art['cablekit'] = {
@'
<ellipse cx="300" cy="452" rx="168" ry="26" fill="#2b2721" opacity=".14"/>
<rect x="132" y="188" width="336" height="252" rx="26" fill="#22201d"/>
<rect x="132" y="188" width="336" height="252" rx="26" fill="#fff" opacity=".04"/>
<rect x="156" y="212" width="288" height="204" rx="16" fill="#141312"/>
<g fill="none" stroke-linecap="round">
  <path d="M196 272a46 46 0 1 0 46 46" stroke="#3a3f38" stroke-width="13"/>
  <path d="M300 250a46 46 0 1 0 46 46" stroke="#8b5a2b" stroke-width="13"/>
  <path d="M240 366a44 44 0 1 0 44 44" stroke="#cfc8b8" stroke-width="13"/>
</g>
<g fill="#e8e2d4">
  <rect x="378" y="300" width="44" height="16" rx="8"/>
  <rect x="378" y="336" width="44" height="16" rx="8"/>
</g>
'@
}

# --- rolled felt desk mat ---
$Art['mat'] = {
@'
<ellipse cx="300" cy="440" rx="180" ry="30" fill="#2b2721" opacity=".12"/>
<path d="M120 268c0-16 12-28 28-28h304c16 0 28 12 28 28v132c0 16-12 28-28 28H148c-16 0-28-12-28-28z" fill="#4a4d42"/>
<path d="M120 268c0-16 12-28 28-28h304c16 0 28 12 28 28v132c0 16-12 28-28 28H148c-16 0-28-12-28-28z" fill="#fff" opacity=".05"/>
<rect x="182" y="316" width="150" height="46" rx="9" fill="#2b2e26"/>
<rect x="194" y="330" width="62" height="8" rx="4" fill="#5f655a"/>
<rect x="194" y="346" width="42" height="8" rx="4" fill="#5f655a"/>
<rect x="356" y="306" width="86" height="58" rx="10" fill="#343a32"/>
'@
}


# --- aluminium dock ---
$Art['dock'] = {
@'
<defs><linearGradient id="dk" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3a3f38"/><stop offset="1" stop-color="#1d201b"/></linearGradient></defs>
<ellipse cx="300" cy="440" rx="172" ry="26" fill="#2b2721" opacity=".14"/>
<path d="M138 258l324-30 18 34-324 32z" fill="#2b2e26"/>
<path d="M156 292l324-32v150l-324 28z" fill="url(#dk)"/>
<g fill="#0e100d">
  <rect x="186" y="326" width="96" height="16" rx="8"/>
  <rect x="310" y="312" width="96" height="16" rx="8"/>
</g>
<g fill="#e8e2d4">
  <rect x="186" y="372" width="54" height="14" rx="7"/>
  <rect x="258" y="368" width="54" height="14" rx="7"/>
  <rect x="330" y="364" width="54" height="14" rx="7"/>
  <rect x="402" y="360" width="54" height="14" rx="7"/>
</g>
<rect x="186" y="404" width="204" height="9" rx="4" fill="#5f655a"/>
'@
}

# --- A5 lay-flat notebook ---
$Art['notebook'] = {
@'
<defs><linearGradient id="cv" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#26241f"/><stop offset="1" stop-color="#15140f"/></linearGradient></defs>
<ellipse cx="300" cy="462" rx="150" ry="22" fill="#2b2721" opacity=".14"/>
<g transform="rotate(-7 300 300)">
  <rect x="196" y="132" width="208" height="286" rx="12" fill="url(#cv)"/>
  <rect x="216" y="150" width="168" height="250" rx="6" fill="#f6f2e8"/>
  <g stroke="#d5cebd" stroke-width="2">
    <path d="M232 200h136M232 232h136M232 264h136M232 296h136M232 328h104"/>
  </g>
  <rect x="196" y="132" width="20" height="286" rx="10" fill="#8b5a2b"/>
</g>
'@
}

# --- brass tape dispenser ---
$Art['brass'] = {
@'
<defs><linearGradient id="br" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#d8b47a"/><stop offset="1" stop-color="#9c7b3f"/></linearGradient></defs>
<ellipse cx="300" cy="452" rx="140" ry="24" fill="#2b2721" opacity=".14"/>
<path d="M182 300h232l-26 132H208z" fill="url(#br)"/>
<path d="M182 300h232l-9 42H191z" fill="#e6c894"/>
<circle cx="298" cy="300" r="86" fill="url(#br)"/>
<circle cx="298" cy="300" r="66" fill="#e9e4da"/>
<circle cx="298" cy="300" r="20" fill="#c39c5c"/>
<path d="M414 340c34-8 48 28 30 54" fill="none" stroke="#b8925a" stroke-width="11" stroke-linecap="round"/>
'@
}

# --- pocket mini hub ---
$Art['minihub'] = {
@'
<ellipse cx="300" cy="440" rx="128" ry="22" fill="#2b2721" opacity=".14"/>
<rect x="180" y="230" width="240" height="200" rx="30" fill="#1f1c18"/>
<rect x="180" y="230" width="240" height="200" rx="30" fill="#fff" opacity=".05"/>
<g fill="#e8e2d4">
  <rect x="212" y="278" width="52" height="16" rx="8"/>
  <rect x="288" y="278" width="52" height="16" rx="8"/>
</g>
<rect x="212" y="326" width="80" height="15" rx="7" fill="#8b5a2b"/>
<rect x="316" y="326" width="72" height="15" rx="7" fill="#3f4439"/>
<circle cx="252" cy="382" r="9" fill="#6f7a5c"/>
'@
}

# --- waterproof field notebook ---
$Art['fieldbook'] = {
@'
<defs><linearGradient id="fb" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#4a4d42"/><stop offset="1" stop-color="#2b2e26"/></linearGradient></defs>
<ellipse cx="300" cy="466" rx="130" ry="20" fill="#2b2721" opacity=".14"/>
<g transform="rotate(6 300 300)">
  <rect x="204" y="150" width="192" height="280" rx="10" fill="url(#fb)"/>
  <rect x="222" y="168" width="156" height="244" rx="6" fill="#3f4439"/>
  <g stroke="#8b937e" stroke-width="2" opacity=".7">
    <path d="M242 220h116M242 252h116M242 284h116M242 316h116M242 348h84"/>
  </g>
  <rect x="204" y="150" width="18" height="280" rx="9" fill="#8b5a2b"/>
</g>
'@
}

# --- monitor arm ---
$Art['arm'] = {
@'
<ellipse cx="300" cy="452" rx="150" ry="22" fill="#2b2721" opacity=".14"/>
<rect x="196" y="418" width="208" height="26" rx="13" fill="#1f1c18"/>
<rect x="292" y="200" width="20" height="222" fill="#9aa0a6"/>
<circle cx="302" cy="192" r="17" fill="#1f1c18"/>
<rect x="184" y="120" width="256" height="160" rx="10" fill="#1f1c18"/>
<rect x="198" y="134" width="228" height="132" rx="5" fill="#2f3a2c"/>
<path d="M222 232l26-30 24 22 30-38 34 40 26-22 40 30" fill="none" stroke="#9db584" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
'@
}

# --- task lamp ---
$Art['lamp'] = {
@'
<defs><linearGradient id="lm" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#d98a2b"/><stop offset="1" stop-color="#a8631a"/></linearGradient></defs>
<ellipse cx="300" cy="440" rx="128" ry="22" fill="#2b2721" opacity=".14"/>
<ellipse cx="300" cy="418" rx="118" ry="26" fill="#1f1c18"/>
<ellipse cx="300" cy="408" rx="118" ry="26" fill="#3a3f38"/>
<rect x="292" y="180" width="16" height="230" fill="#9aa0a6"/>
<path d="M300 78l-84 122h168z" fill="url(#lm)"/>
<path d="M300 96l-56 90h112z" fill="#f6e6c4" opacity=".7"/>
<path d="M196 220c-40 70-28 130 52 156 44 14 96 4 130-22" fill="none" stroke="#f6e6c4" stroke-width="4" opacity=".2"/>
'@
}

# --- product definitions ---
$Products = @(
  @{ n='p1';  kind='magsafe'   },
  @{ n='p2';  kind='tray-dark'},
  @{ n='p3';  kind='tray-light'},
  @{ n='p4';  kind='cablekit' },
  @{ n='p5';  kind='mat'      },
  @{ n='p6';  kind='dock'     },
  @{ n='p7';  kind='notebook' },
  @{ n='p8';  kind='brass'    },
  @{ n='p9';  kind='minihub'  },
  @{ n='p10'; kind='fieldbook'},
  @{ n='p11'; kind='arm'      },
  @{ n='p12'; kind='lamp'     }
)

function New-ProductSvg {
  param([string]$Name, [string]$Kind, [bool]$Alt)
  $art = & $Art[$Kind]
  # the hover variant scales the object up slightly, like a product turntable
  $open = ''
  $close = ''
  if ($Alt) {
    $open  = '<g transform="translate(300 300) scale(1.06) translate(-300 -300)">'
    $close = '</g>'
  }

  $svg = @"
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600" width="600" height="600" role="img" aria-label="$Name">
$open$art$close
</svg>
"@
  return $svg
}

$count = 0
$Utf8NoBom = New-Object System.Text.UTF8Encoding($false)
foreach ($p in $Products) {
  [System.IO.File]::WriteAllText((Join-Path $Out ($p.n + '.svg')),      (New-ProductSvg -Name $p.n -Kind $p.kind -Alt $false), $Utf8NoBom)
  [System.IO.File]::WriteAllText((Join-Path $Out ($p.n + '-alt.svg')), (New-ProductSvg -Name ($p.n + ' hover') -Kind $p.kind -Alt $true),  $Utf8NoBom)
  $count += 2
}

Write-Output "Generated $count product images in $Out"
