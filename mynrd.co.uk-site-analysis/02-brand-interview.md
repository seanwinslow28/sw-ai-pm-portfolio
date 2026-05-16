# Brand Interview — Sean Winslow Portfolio 2.0

Reference site: https://mynrd.co.uk/
Date: 2026-05-08

---

## 1. PRODUCT IDENTITY

A personal portfolio site for **Sean Winslow**, a creative technologist who blends an animator's hand-made craft with a product manager's substance. Industry/category: **Creative-tech personal portfolio** (designer-engineer hybrid; competing in the "design-and-build" tier alongside Linear/Vercel-aesthetic personal sites and animator/illustrator portfolios).

The product is a *single-page narrative experience* that doubles as a hiring portfolio and a manifesto: it has to make a recruiter feel that Sean is distinctive within 5 seconds, and survive deeper inspection by a discerning design director or technical hiring panel.

## 2. AUDIENCE PERSONA

(Inferred — not specified by user; aligned with the design philosophy.)

Primary: **Hiring managers, design directors, founders, and senior recruiters** at product companies, design studios, and creative-engineering teams. Age range **30–55**. Technical sophistication **high** — they will inspect with DevTools open, judge the craft of the markup as much as the visual surface, and will recognize Vercel/Linear-tier aesthetics as a signal. Psychographic trait: **discerning and time-poor** — they have seen 50 portfolios this week and are looking for the one that announces a distinctive POV in the first scroll.

Secondary: peer creatives and engineers who might share the link as "this person is interesting."

## 3. BRAND FEELING

(User did not specify exactly 3 adjectives — derived from the philosophy paragraph the user wrote.)

**Tactile · Engineered · Autobiographical**

- **Tactile** — pencil-test paper, registration marks, frame numbers, the warmth of aged paper. The first 5 seconds must feel hand-made.
- **Engineered** — Vercel-grade containers, monospace accents, card patterns, dark-mode precision. The substance has to read as product-shop quality.
- **Autobiographical** — the interface itself tells the origin story (animator → creative technologist). Light mode = the past; dark mode = the present. Duality with meaning, not decoration.

## 4. COLOR PALETTE

Brand palette (provided by user):
- **Primary**:    `#0A3E42` — deep teal / midnight spruce (matches mynrd.co.uk's outro section exactly — strong continuity with reference)
- **Secondary**:  `#546E71` — slate-teal mid-tone
- **Tertiary**:   `#455A64` — graphite / blue-stone
- **Neutral**:    `#FFF9F0` — warm cream paper

Derived semantic mapping for implementation:
- **Light-mode page bg**: `#FFF9F0` (Neutral / aged paper)
- **Light-mode ink**:     `#0A3E42` (Primary used as primary type — NOT pure black; gives the warm-paper-with-blue-ink vibe)
- **Dark-mode page bg**:  `#0A3E42` or near-black `#0B0B0B` w/ teal accent (TBD in Phase 3 — recommend `#0A0E0F` with `#0A3E42` as section accent for the Vercel-engineering chrome)
- **Dark-mode ink**:      `#FFF9F0` (cream on near-black for warmth, NOT cool white)
- **Mid-tone secondary**: `#546E71` for muted labels, borders, dividers
- **Tertiary accent**:    `#455A64` for tertiary chrome (frame numbers, registration marks, card stroke)

## 5. PAGE SECTIONS

User-specified order:
1. **Hero**
2. **Case Studies / Projects**
3. **About**
4. **Contact / Socials** (footer)

(4 sections vs the reference's 6 — Sean's site collapses the reference's intro+gallery into "Hero+Case Studies" and rolls the reference's outro+footer into "Contact/Socials.")

## 6. PRIMARY HEADLINE

**Headline:** "Sean Winslow — Creative Technologist"

**Subheadline:** (Not specified by user — derived from the philosophy paragraph.)

Recommended subheadline candidates for Phase 3 (pick one in synthesis):
- "A creative who learned to think like a product manager." *(direct from philosophy)*
- "An animator's pencil test, mounted in a Vercel-grade frame."
- "Pencil-test paper meets Vercel deployment logs."

## 7. PRIMARY CTA

**Action:** Open an email / start a conversation about working together.
**Button label:** "Let's work together"  (matches reference site's footer CTA exactly — preserves the editorial voice)

Treatment in synthesis: render as the giant footer-link headline with paper-plane illustration + ↗ arrow, exactly as in the reference. In addition, surface a quieter persistent CTA: a rotating "Get in touch" badge in the hero (top-right), styled in dark-mode chrome (Vercel-grade) instead of cream.

## 8. KEY DIFFERENTIATOR

**"A creative who learned to think like a product manager."**

The duality is the differentiator: most portfolios in this tier are either *all craft* (illustrator/animator) or *all substance* (engineer/PM). Sean's POV is that the two compound — the animator's eye for timing and texture makes him a better PM, and the PM's framing makes the craft purposeful. The site itself enacts the thesis: pencil-test warmth on the surface, Vercel-grade architecture underneath. Light mode tells the origin (animator); dark mode shows the present (creative technologist). Same person, two registers.

This shapes copy tone throughout: confident but self-deprecating, never precious about the craft, always returning to outcomes. Avoid agency-speak ("magical brand experiences"); favor specific receipts ("shipped X to Y users").

## 9. ANIMATION INTENSITY

**Level: 4 — Rich**
- GSAP scroll triggers
- Staggered text reveals (per-line, per-character)
- Interactive components (custom cursor, hover previews on case-study tiles)
- Parallax for the case-studies marquee callback
- Hero Lottie-style character illustration with idle motion
- Light/dark mode transition animated as a "page flip" or "reel change" (cinematic narrative beat — not a toggle, an event)

NOT level 5: no physics simulations, no full-screen WebGL, no scroll-jacking. Smooth is enough.

## 10. TECH STACK

User-specified:

| Layer                | Technology                  | Rationale                                                                                                              |
| -------------------- | --------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| Framework            | **Astro 5**                 | Ships zero JS by default. Islands Architecture hydrates only interactive components — fits the "engineered" thesis.    |
| Interactive Islands  | **React** (within Astro)    | Reuse React skills for galleries, cursor, AI demos, dark-mode toggle.                                                  |
| Styling              | **Tailwind CSS v4**         | Tiny CSS payload, shared token system, dark-mode out of the box.                                                       |
| Scroll/Animation     | **GSAP** + **Lenis**        | GSAP for scroll-triggered storytelling and SplitText-style reveals. Lenis (~3KB) for buttery smooth scroll.            |

Component-libraries: none specified — Phase 3 will compose from scratch on top of Tailwind utility classes plus a small in-house primitive set (Button, Card, Tile).

## 11. CONTENT ASSETS

- **Logo**: not provided — Phase 3 to use an SW monogram set in the chosen serif (recommend Bodoni Moda or Newsreader as the EditorialWeb stand-in).
- **Photography**: none provided.
- **Placeholder aesthetic**: **pencil-test animation / hand-drawn line illustration** — black ink line on cream paper, no fill, vintage character style matching mynrd's hero/footer Lottie character. Phase 3 prompt will:
  - Generate hero character illustration (Sean working at a drawing desk + at a code editor — duality literalized)
  - Generate decorative SVG vignettes for the About section (saxophone-style decorative line drawings)
  - For case-study tiles, use **pencil-test frame stills** (registration-mark-bordered project screenshots) as placeholders, with optional Lottie loops for projects with motion.
  - For the outro/marquee callback, use a strip of pencil-test frame numbers (1A, 2A, 3A…) as the recurring texture.

Typography (user said "Use the typography within the original UI"):
- Reference uses `EditorialWeb` (custom serif) + `MontrealWeb` (custom sans). Both are licensed Pangram Pangram fonts (PP Editorial New + PP Neue Montreal). Phase 3 will:
  - **Default to free Google equivalents** to keep the site self-hostable and CI-clean: **Newsreader** or **Bodoni Moda** (display serif, weight 300/400 to match the wt300 body + wt400 display contrast); **Geist** or **Inter** for the sans (Geist preferred — it is the Vercel-engineering signal Sean's brief calls for, and pairs with the dark-mode chrome).
  - **Note in the prompt** that if the user has licensed PP Editorial New + PP Neue Montreal, they can swap the font-face URLs in one place.
  - **Preserve the typographic ratios** from the Site DNA: 120px display vs 14px micro label (8.5×), 85px hero vs 45px body (1.9×), -0.15px hero tracking, weight 300 body, weight 400 display.

## 12. SECTION MODIFICATIONS

User specified: **KEEP AS-IS** (same layout pattern, same component type, only content swapped in).

Section-by-section reconciliation (mapping reference → Sean's 4 user-specified sections):

| Reference Section | Decision | Notes                                                                                                                                                                                                                                                                                  |
| ----------------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **1. Hero**       | KEEP AS-IS | Same sticky-overlap mechanic. Title becomes "Sean Winslow — Creative Technologist". Hero character illustration (Lottie or static SVG): Sean at a hybrid desk with one drawing tablet + one laptop. "Get in touch" rotating badge in top-right preserved.                              |
| **2. Intro**      | KEEP AS-IS | Same torn-paper transition. Same centered EditorialWeb 45/300 quote pattern. Copy becomes the "creative who learned to think like a PM" thesis. The brand-logo cycler in parens cycles through companies/projects Sean has shipped for, OR through tools (Figma, Linear, Vercel, GSAP). |
| **3. Gallery**    | KEEP AS-IS, RENAMED → **Case Studies / Projects** | 3-col CSS grid, 18 tiles (or fewer — match what Sean has). Tiles 440×580, video-on-loop or pencil-test frame stills. Custom-cursor preview on hover preserved. NO on-tile titles (per reference).                                                                |
| **4. About**      | KEEP AS-IS | Same centered weight-300 manifesto block. Decorative SVGs (sax/wand/shaka) replaced with pencil-test motifs: registration marks, light-bulb sketch, animator's pencil. Inline `<em>` highlight pattern preserved for Sean's discipline list ("design, animation, product, code").     |
| **5. Outro**      | KEEP AS-IS | Same dark-teal #0A3E42 island (Sean's PRIMARY brand color exactly — perfect alignment). 120px white serif punchline. Copy: a Sean-voice equivalent of "Simply making cool sh*t Wilson would say wow too" — recommend something like "Building things that earn their own applause." Same parallax marquee of project thumbnails behind. |
| **6. Footer**     | KEEP AS-IS, RENAMED → **Contact / Socials** | Same giant "Let's work together ↗" mailto headline, paper-plane illustration, character-in-chair illustration on right. Footer meta row: © 2026 Sean Winslow · live local time + city · "Code by Sean Winslow" (self-attribution, replacing Thomas Aufresne credit) · social icons (GitHub, LinkedIn, X, Read.cv — replacing Dribbble/IG/LinkedIn). |

**ADDED sections (not in reference):**

- **Light/Dark mode duality (cross-cutting, not a section):** This is the user's explicit autobiographical thesis ("light = origin / animator, dark = present / creative technologist"). Not a separate section but a *page-wide treatment* applied to every section. Implementation in Phase 3:
  - Light mode = the reference site's full cream/white/black/teal palette as audited.
  - Dark mode = `#0A0E0F` page bg with `#FFF9F0` ink, `#0A3E42` accent (teal stays the constant); pencil-test character illustrations remain ink-line but render on dark paper; the "torn-paper" transitions become **frame-edge sprocket holes** (animation reel perforations) instead of paper tears.
  - Toggle is **not a generic moon/sun icon** — it is a "frame change" event: a film-reel frame-counter ticks from 24 to 25, page state inverts, character illustration re-draws as a separate pencil-test frame.
  - Default to **system preference**, persist to localStorage, with the toggle as a small fixed-position chip in the top-right matching the reference's "Get in touch" badge alignment.

- **Frame numbers / registration marks (cross-cutting motif):** Tiny `1A · 2A · 3A` style frame-counter labels in MontrealWeb 12px appear in the upper-left of each section as section IDs, replacing the reference's lack of section headers. Reinforces the "animator's pencil test" narrative without adding a real nav.
