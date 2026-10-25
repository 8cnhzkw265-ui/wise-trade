function Replace-InFile($path, $pairs) {
  $t = Get-Content $path -Raw
  $n = 0
  foreach ($p in $pairs) {
    $count = ([regex]::Matches($t, [regex]::Escape($p[0]))).Count
    if ($count -gt 0) { $t = $t.Replace($p[0], $p[1]); $n += $count }
    else { Write-Host "MISS in $path : $($p[0].Substring(0, [Math]::Min(60, $p[0].Length)))" }
  }
  Set-Content $path $t -NoNewline
  Write-Host "$path : $n replacements"
}
$nl = "`n"
Replace-InFile "assets/css/base.css" @(
  @("43, 39, 33", "17, 17, 17"),
  @("--container: 1560px;", "--container: 1400px;"),
  @("--announce-h: 52px;", "--announce-h: 40px;"),
  @("h1 { font-size: clamp(2.6rem, 6.2vw, 5.4rem); }", "h1 { font-size: clamp(2.25rem, 4.6vw, 4rem); }"),
  @("h2 { font-size: clamp(2rem, 4vw, 3.4rem); }", "h2 { font-size: clamp(1.6rem, 2.8vw, 2.5rem); }"),
  @(".section { padding-block: clamp(64px, 9vw, 130px); }", ".section { padding-block: clamp(48px, 6vw, 96px); }"),
  @("  font-weight: 500;${nl}  letter-spacing: .18em;", "  font-weight: 600;${nl}  letter-spacing: .12em;")
)
Replace-InFile "assets/css/components.css" @(
  @("43, 39, 33", "17, 17, 17"),
  @("244, 241, 232", "255, 255, 255"),
  @("255, 253, 248", "255, 255, 255"),
  @("#f6f2e8", "#ffffff"),
  @("border: 1px solid var(--btn-bd);${nl}  border-radius: var(--radius-pill);", "border: 1px solid var(--btn-bd);${nl}  border-radius: var(--radius-xs);"),
  @(".badge--sale { background: var(--ink); color: var(--canvas); }", ".badge--sale { background: var(--sale); color: #fff; }"),
  @(".badge--new  { background: var(--amber); color: var(--amber-ink); }", ".badge--new  { background: var(--ink); color: #fff; }"),
  @(".badge--hot  { background: var(--sage); color: var(--sage-ink); }", ".badge--hot  { background: var(--ink); color: #fff; }"),
  @("  flex: 1;${nl}  background: var(--surface);${nl}  color: var(--ink);", "  flex: 1;${nl}  background: var(--ink);${nl}  color: #fff;"),
  @("  background: var(--beige);${nl}  border-radius: var(--radius);", "  background: var(--beige);${nl}  border-radius: var(--radius-sm);"),
  @(".mega__promo strong { font-family: var(--font-display); font-size: 1.35rem; font-weight: 400; }", ".mega__promo strong { font-family: var(--font-display); font-size: 1.35rem; font-weight: 700; }"),
  @(".drawer__title { font-family: var(--font-display); font-size: 1.5rem; font-weight: 400;", ".drawer__title { font-family: var(--font-display); font-size: 1.5rem; font-weight: 600;"),
  @("  font-size: .9375rem;${nl}  font-weight: 500;${nl}  position: relative;", "  font-size: .8125rem;${nl}  font-weight: 600;${nl}  letter-spacing: .04em;${nl}  text-transform: uppercase;${nl}  position: relative;"),
  @(".announce__item .dot { color: var(--ink); opacity: .55; }", ".announce__item .dot { color: #fff; opacity: .5; }"),
  @("  font-size: 1.65rem; font-weight: 400;", "  font-size: 1.25rem; font-weight: 700;")
)
Replace-InFile "assets/css/sections.css" @(
  @("43, 39, 33", "17, 17, 17"),
  @(".collhead__title { font-size: clamp(2.8rem, 7vw, 6.2rem); line-height: .98; letter-spacing: -.025em; }", ".collhead__title { font-size: clamp(2.2rem, 4.5vw, 3.75rem); line-height: 1.02; letter-spacing: -.03em; }")
)
Replace-InFile "assets/css/pages.css" @(
  @("43, 39, 33", "17, 17, 17"),
  @("255, 253, 248", "255, 255, 255")
)
Replace-InFile "assets/css/motion.css" @(
  @("  font-weight: 400;${nl}  letter-spacing: -.015em;", "  font-weight: 700;${nl}  letter-spacing: -.02em;")
)
