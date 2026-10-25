function Rep($path, $pairs) {
  $t = Get-Content $path -Raw
  $n = 0
  foreach ($p in $pairs) {
    if ($t.Contains($p[0])) { $t = $t.Replace($p[0], $p[1]); $n++ }
    else { Write-Host ("MISS " + $path + " :: " + $p[0].Substring(0, [Math]::Min(70, $p[0].Length))) }
  }
  Set-Content $path $t -NoNewline
  Write-Host ($path + " : " + $n + "/" + $pairs.Count + " applied")
}
# ---- header: keep brand left, nav left, icons right (Hyper layout) ----
Rep "assets/css/components.css" @(
  @(".header__inner {`n  height: var(--header-h);`n  display: grid;`n  grid-template-columns: 1fr auto 1fr;", ".header__inner {`n  height: var(--header-h);`n  display: flex;`n  align-items: center;`n  gap: 28px;`n  /*HYPER*/grid-template-columns: 1fr auto 1fr;"),
  @(".nav { display: flex; align-items: center; gap: clamp(18px, 2.4vw, 40px); justify-self: center; }", ".nav { display: flex; align-items: center; gap: clamp(14px, 1.8vw, 28px); margin-right: auto; }"),
  @(".nav__link {`n  position: relative;`n  display: inline-flex;`n  align-items: center;`n  gap: 6px;`n  padding: 8px 2px;`n  font-size: 1rem;", ".nav__link {`n  position: relative;`n  display: inline-flex;`n  align-items: center;`n  gap: 6px;`n  padding: 8px 2px;`n  font-size: .875rem;`n  font-weight: 600;`n  letter-spacing: .02em;`n  text-transform: uppercase;`n  /*HYPER*/font-size: 1rem;"),
  @(".header__actions { display: flex; align-items: center; gap: 6px; justify-self: end; }", ".header__actions { display: flex; align-items: center; gap: 2px; margin-left: auto; }")
)
# ---- buttons: black primary, sharp corners ----
Rep "assets/css/components.css" @(
  @(".btn--dark { --btn-bg: var(--ink); --btn-ink: var(--canvas); --btn-bd: var(--ink); }", ".btn--dark { --btn-bg: var(--ink); --btn-ink: #fff; --btn-bd: var(--ink); }"),
  @(".btn--light { --btn-bg: #f6f2e8; --btn-ink: var(--ink); --btn-bd: #f6f2e8; }", ".btn--light { --btn-bg: #fff; --btn-ink: var(--ink); --btn-bd: #fff; }")
)
# ---- Hyper: add quick-order bar + volume pricing + trust row styles ----
Rep "assets/css/sections.css" @(
  @("/* ---------- VALUES (item styling) ----------", "/* ---------- HYPER trust-bar / value props ---------- */`n.trustbar { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1px; background: var(--stroke); border-block: 1px solid var(--stroke); }`n.trustbar > div { background: var(--surface); padding: 22px 24px; display: flex; align-items: center; gap: 14px; }`n.trustbar svg { width: 26px; height: 26px; flex: none; }`n.trustbar b { display: block; font-size: .875rem; font-weight: 600; }`n.trustbar span { font-size: .8125rem; color: var(--muted); }`n@media (max-width: 900px) { .trustbar { grid-template-columns: 1fr 1fr; } }`n/* ---------- VALUES (item styling) ----------")
)
