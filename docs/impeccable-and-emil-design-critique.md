  Critique — /docs/specs/* against /impeccable + /emil-design-eng
  
  Verdict: Ready to build after three specific blockers are addressed. The strategic frame (character + voice + live
  layer) is well-defended; the type/color discipline is unusual and good; the texture-and-artifacts spec is the
  strongest doc in the pile. But there are two Emil-flagged motion timings, one Impeccable absolute-ban that's visually
  load-bearing, and one structural color-strategy declaration that drifted when the chrome substrate was promoted. Plus
  a small handful of consistency items.
  
  I read in full: PMP, BLUEPRINT-COMPLETE, hero, projects, case-study, site-chrome, texture-and-artifacts. I read
  partial: about (through §12), transactions (through §9), architecture + essays (intros + structure). Coverage is
  enough for craft critique; flagged items below are anchored to specific sections.
  
  ---
  1. Critical blockers (must resolve before build)
  
  1.1 The B-1 lane-tint rule trips Impeccable's side-stripe-border ban

  about-spec-v1.md §9.2 specifies a 3px wide left-margin rule running per-beat in amber / teal / vertical-gradient.
  Impeccable's absolute-ban list:

  ▎ Side-stripe borders. border-left or border-right greater than 1px as a colored accent on cards, list items, 
  ▎ callouts, or alerts. Never intentional. Rewrite with full borders, background tints, leading numbers/icons, or 
  ▎ nothing.
  
  The intent here is different (chromatic lineage signal, not a card affordance) — but the visual reads identical to the
   banned pattern. Two viable fixes:

  - Reframe as an SVG-rendered timeline rule. A <svg><line stroke="…" stroke-width="3"/></svg> stays animatable via
  stroke-dasharray (which §6 already wants for the rule reveal) and visually distinguishes from a CSS border-left. Frame
   it in the spec as a "timeline scrubber" rather than a "rule" so the semantic intent shows.
  - Or: replace the rule with a leading swatch glyph on each beat — a 12×12px filled square (amber / teal /
  split-diagonal) sitting just left of the date line. Same lineage signal, no stripe.

  The braided-beat gradient is itself worth a second look — Impeccable's color rules ban gradient text but allow
  strategic gradients on backgrounds. A linear-gradient on a vertical SVG stroke is fine as long as it isn't read as
  decoration. If you keep it, document explicitly that this single gradient is the only sanctioned multi-color gradient
  on the site (§5 already nearly says this — tighten the language).
  
  1.2 Tile hover scale is too slow for a UI interaction

  projects-section-spec-v1.md §8: tile media animates scale(1.04) over 700ms with cubic-bezier(0.4, 0, 0.2, 1). Per
  Emil, UI animations should stay under 300ms; the 700ms gives a sluggish "marketing reveal" feel where you want crisp
  hover feedback. See §3 table below for the fix.
  
  1.3 Color-strategy declaration drifted when the teal chrome was promoted

  PMP §2.2 + hero §10 state "95% of the site is warm paper; each section gets one full-bleed splash-color moment." That
  math held when teal lived only inside the projects splash. But texture-and-artifacts-spec-v1.md §2 promoted teal
  #0A3E42 to a full-bleed persistent chrome at Z=0, visible through every torn-paper edge on every page. Teal is now
  substantial structural color, not ≤10% accent.
  
  Per Impeccable's color strategy axis, the site moved from Restrained (tinted neutrals + one accent ≤10%) to Committed
  (one saturated color carries 30–60%). That's a fine choice — Committed-teal fits the autobiography thesis — but the
  prior specs don't yet name it. Action: update PMP §2.2 and §5 to declare "Committed-teal with paper as the page
  surface," and check that hero §10's "one splash per section" rule still parses (it does — section splash blocks are
  still one-per-section; the chrome is a different layer).

  ---
  2. Motion review (Emil before/after)
  
  Before: Tile media scale(1.04) over 700ms with cubic-bezier(0.4, 0, 0.2, 1) (projects §8)
  After: scale(1.03) over 220ms with cubic-bezier(0.23, 1, 0.32, 1)                      
  Why: UI hover stays under 300ms. 700ms feels sluggish at the exact moment recruiters are scanning tiles. Lower 1.03
    scale also keeps the image from jumping under the cursor.
  ────────────────────────────────────────
  Before: Custom cursor "Sean Winslow" hover scale to 60px circle — duration unspecified (hero §9)
  After: Specify 160ms with cubic-bezier(0.23, 1, 0.32, 1)        
  Why: Cursor state transitions need explicit timing. 160ms is the snap-feedback range Emil specs for button-press
    equivalents. Leaving it unspecified invites a default ease or ease-in from the implementer.
  ────────────────────────────────────────
  Before: Hero name letters translateY(40px) → 0 per-char, 20ms stagger × ~12 chars = ~840ms total reveal (hero §6)
  After: translateY(24px) → 0, 18ms stagger, target ~600ms total
  Why: Page-load one-shot, so the budget is forgiving — but 40px on each of 12 letters is a lot of distance for a
    confident name reveal. 24px lands faster while keeping the staggered character.
  ────────────────────────────────────────
  Before: Signature draws in via stroke-dasharray over 1200ms with cubic-bezier(0.6, 0, 0.4, 1) (about §6)
  After: Keep 1200ms; switch easing to cubic-bezier(0.16, 1, 0.3, 1)
  Why: Duration is fine — this is a once-per-page closing moment, Emil's "marketing/explanatory" range. But (0.6, 0, 
  0.4,
    1) is essentially ease-in-out; for a pen writing in, ease-out feels right (the pen starts fast, then settles).
  ────────────────────────────────────────
  Before: B-1 lane rule reveal via stroke-dasharray 500ms after beat body lands (about §6)
  After: Verify the lane rule is rendered as SVG — see blocker 1.1. If kept as a CSS border-left, stroke-dasharray won't

    animate; the spec is self-inconsistent.
  Why: The animation contract requires SVG; the visual contract calls it a "3px left-margin rule." Pick one.
  ────────────────────────────────────────
  Before: Tagline per-line translateY(60%) → 0 with cubic-bezier(0.165, 0.84, 0.44, 1) (hero §6)
  After: Reduce to translateY(28px) → 0 and verify it doesn't trip layout shift
  Why: 60% percentage translation can briefly overshoot the line-box before settling at small sizes. A fixed 24-32px
    offset is more predictable across viewports.
  ────────────────────────────────────────
  Before: view-transition-name: hero-media-<slug> shared between tile and case-study hero (projects §10, case-study §6)
  After: Confirm the object-fit matches at both endpoints
  Why: View Transition cross-fade looks broken when the source is object-fit: cover (tile) and the destination is
    object-fit: contain (full-bleed hero). Lock both to cover or both to contain, or accept a snap moment.
  ────────────────────────────────────────
  Before: Annotations idle bob — "Subtle bob (rotate ±2°) at 4s/cycle thereafter" on the updated weekly arrow (projects
    §9)
  After: Drop the idle bob unless it's specifically pegged to the dateline.
  Why: The dateline is information; the annotation is decoration. A persistent ambient rotate on a decorative SVG falls
    into "looks cool, will see it 1000+ times" territory per Emil's frequency framework. Settle on first reveal, then
    static.

  The hero motion timeline is otherwise tight — start states are scale(0.95-0.97) not scale(0) (✓ Emil), reduced-motion
  fallbacks are explicit (✓), view-transition-name discipline avoids the over-shared-target trap, and Astro's
  <ClientRouter /> handles the cross-fade natively rather than re-implementing it in JS.
  
  ---
  3. Impeccable design-law findings (beyond §1)
  
  Em dashes in wire-service copy. Datelines are em-dash-heavy by inheritance from real newspapers ("BOSTON, MAY 13, 2026
   — vault indexer…"). Impeccable bans em dashes in product copy. This is a deliberate editorial choice and Sean's "user
   instructions override skill rules" applies — but document the exception once in PMP §3 ("wire-service register uses
  em dashes as historical typography; no other surface does"). Without that note, future Claude sessions will keep
  retrying the fix.
  
  Identical card grids — the 3×2 cartoon-cel grid is right at the edge. about §11 specifies 6 cells, each (registration
  peg + image + name + caption). Cell sizing identical; template identical. Each cell does carry unique art and a
  load-bearing lesson, which is the saving grace — but the bento-box quality is real. Two cheap interventions:
  
  - Let each cel rotate ±1.5° independently (frontmatter-driven angle per cel, defaults randomized at author time).
  - Allow one cel to break the grid — make the "this one rewires you" callout cel slightly larger or differently framed.
   The annotation in §11.7 already singles it out; let geometry do the work too.

  The "live" framing oversells slightly. Multiple specs call the dateline / pulse / shipped-stats "the live layer," but
  the Daily Driver writes once at 08:45. That's daily-fresh, not live. Either rename ("the dated layer" / "the morning
  brief") or actually wire it to a stream. The honest framing reads stronger than the marketing framing — Sean's voice
  everywhere else is honest, this is the one place it isn't.
  
  Type hierarchy spot-check. Newsreader + JetBrains Mono, two-font discipline, ✓. Step ratios mostly clear ≥1.25× (hero
  name 56-130px vs tagline 26-56px vs role tag 14px). One soft spot: case-study §4 has Newsreader 24/20 for opener and
  Newsreader 20/18 for 4Q body. 24→20 is only 1.2×. Worth nudging the 4Q to Newsreader 18 to keep step separation crisp.
  
  The chrome color inversion (paper + ink → teal + cream) is a strong move — Impeccable encourages "vary across
  projects; never converge on the same choices." This inversion is the kind of structural decision that distinguishes
  the site.
  
  ---
  4. Cross-spec / structural risks
  
  Mid-build asset authoring. ~10-15 hand-authored assets need to ship: paper texture, torn-paper edge, hero
  floor-shadow, coffee ring, kid-drawing, 6 cartoon-cel studies, 5 about heading SVGs, signature, OG card.
  Texture-and-artifacts §7 has the pipeline, but the order in which they need to land vs. when each spec's components
  depend on them isn't fully sequenced. Recommend adding a Phase 0 asset Gantt — what's blocking what.
  
  Build infrastructure fragility. 5 prebuild scripts (fetch_canonical_sources, validate_content, derive_crosslinks,
  validate_about, migrate_v3_transactions) + 1 runtime agent (Daily Driver writing 4 endpoints). Each is correct in
  isolation; together they're an integration surface. Two specific concerns:
  
  - fetch_canonical_sources.mjs reaches out to GitHub raw URLs. If a repo moves, renames, or the network blips at build,
   the site fails. Recommend committing a fallback cache (src/content/explanations/<slug>.md is committed;
  fetch_canonical_sources refreshes but never requires).
  - derive_crosslinks.mjs rejecting dangling slugs is correct discipline, but at v1 with most cross-link fields
  aspirational (relatedArchitecture, relatedEssay, relatedTransactions), one typo will break the build. Start strict;
  make sure error messages name the offending file + field.

  The MCP embed URL contradiction (BLUEPRINT §5 punch item #2) — hero §14 says /transactions/intent-engineering-mcp,
  case-study §13.3 + PMP §7 say /work/intent-engineering-mcp. Easiest fix: edit hero §14 in a one-line changelog entry.
  It's an out-of-scope reference, not load-bearing.
  
  Sticky nav vs no-nav home discipline split. site-chrome §6.1 defaults position: sticky for sub-pages while home is
  no-nav. The split is defensible (recruiters reading a 2k-word essay want escape; the home is mynrd-coded
  linear-scroll). But it does mean the site has two different navigation grammars. Verify by mockup that the first
  sub-page visit doesn't feel like "wait, where did the no-nav site go?"
  
  The dateline body uses datelines that read like real news ledes. Sample: "vault indexer wrote 47 chunks at 02:34. 
  fleet green. 7 of 9 agents on." This is the strongest single editorial moment on the site and the most fakeable by
  another portfolio. Make sure the Daily Driver actually fires before launch — a static-looking dateline reading "vault
  indexer wrote 47 chunks" forever would be the worst possible failure mode.
  
  ---
  5. What's strong — keep these
  
  - The three load-bearing things (character, voice, live layer) are defended consistently across all 9 specs. The
  "template trap" anti-references in PMP §1.3 stay top-of-mind in every downstream spec.
  - Two-font discipline + section-scoped splash + character lane. Most PM portfolios are tripping over four fonts and
  three accent colors at this stage.
  - texture-and-artifacts-spec-v1.md is the strongest spec in the pile. Clear raster/vector split with reasons,
  per-asset dimensions + budgets, optimization CLI pipeline, repo layout with staging discipline. This is what every
  other spec aspires to.
  - Status-driven page shape (case-study §12) — ACTIVE vs SHIPPED vs PAUSED vs ARCHIVED each rendering differently,
  governed by frontmatter — is genuinely opinionated. Most portfolios use a label and call it done.
  - Voice register by surface (PMP §3.3) — Sedaris on home/About, sober/declarative on architecture, wire-service
  everywhere mono lives — is a usable craft rule, not just an aesthetic gesture.
  - Reduced-motion handling is in every spec, with the right pattern (preserve opacity transitions, drop transforms).
  - Performance budgets are tight and per-asset. 378KB hero WebM, ≤180KB paper tile, ≤220KB tear edge. Lighthouse ≥95
  target is realistic.
  - <FourQBlock /> reading canonical EXPLANATION.md from upstream repos is the comprehension-artifact thesis made
  operational. Risk noted above but the thesis is right.

  ---
  Tightest punch list before build
  
  1. Decide blocker 1.1 — SVG timeline rule or leading swatch glyph or accept the impeccable side-stripe ban as a
  deliberate brand exception (then document it).
  2. Fix the projects-tile hover timing to ≤300ms.
  3. Update PMP §2.2/§5 to declare "Committed-teal" color strategy now that the chrome is full-bleed.
  4. Patch the MCP embed URL contradiction (one-line changelog in hero §14).
  5. Specify the missing cursor-hover duration (hero §9, Sean-Winslow target).
  6. Choose: SVG-stroke lane rule OR static border with fade-in (about §6 + §9.2 are currently inconsistent).
  7. Apply the pending relatedArchitecture additive to transactions §3.2 (BLUEPRINT §5 #1).

  Each is small. After those land, this is buildable.