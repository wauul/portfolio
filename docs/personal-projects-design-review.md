# Personal projects design review

## Reference and scope

Applied [TypeUI fundamentals](https://github.com/bergside/typeui/blob/main/skills/fundamentals/SKILL.md), including its typography, spacing and accessibility guidance, to the personal-projects section. Existing portfolio colors and font families remain the design system. This is a section review, not a full-site accessibility certification.

## Findings and changes

- The previous effect moved rows through the document. The requested behavior is one pinned stage that transitions through six projects. The stage now stays below the header, with a reading interval followed by a scroll-controlled demo transition.
- Decorative numbers up to 320px competed with project names. Removed them and used a compact current-project count and numbered navigation.
- Support text at 9–11px and body copy at 14–15px were difficult to read. Raised support text to 14px and body/link text to 16px, using relative font units.
- Centered mobile paragraphs made long descriptions harder to scan. Project descriptions are left aligned with restrained line lengths and 1.6 line height.
- Large repeated vertical gaps interrupted the relationship between projects. A shared frame and progress indicator now communicate one collection.
- Unicode symbols and repeated project names in the demo placeholders added noise. Replaced the symbols with the existing Feather icon family and kept one primary project title.
- Overlapping descriptions hurt readability. Each complete project now slides horizontally in its own lane, without crossfading text. A small relative offset on the demo adds depth. Reading intervals use the exact same chapter timing function as My Journey, including a final-project pause.
- Chapter buttons and repository links have at least 44px target height. Inactive pinned scenes are inert and hidden from assistive technology. Reduced motion switches directly between individual projects without sliding.
- A content-height fallback incorrectly disabled the carousel in shorter browser panels. Removed this fallback: the stage now fits the available viewport, retaining one project per slide at every breakpoint. Long copy can scroll within its panel on narrow screens.

## Intentional choices

The user will supply GIF recordings later, so explicitly labelled demo placeholders remain. Project titles use the portfolio's larger showcase heading scale because each is the sole project in the pinned stage, rather than a dense grid tile. Skill tags remain 12px microcomponents. No global font or site-wide spacing changes were made.

## Control behavior

Chapter buttons support default, hover, active, keyboard focus and current-step states. Activating a chapter jumps directly to its scroll position. Project recordings animate automatically without extra controls; image failure returns to a readable placeholder. No timers advance projects.

Partial horizontal transitions settle to the nearest complete project after scrolling pauses. Settling waits for touch release, respects reduced motion, and does not pull visitors back once they have scrolled outside the pinned section.

## Verification

- Production build and lint passed; all 16 existing tests passed.
- Browser samples at every project boundary kept the stage at 110px below the viewport top on a 1440 × 1000 viewport. All six projects became current in order; reverse scrolling returned to the earlier transition.
- Clicking the Hooka Relay chapter selected the sixth project and completed the progress line.
- Accessibility snapshots exposed only the current pinned project plus all six chapter buttons.
- Earlier checks at 390px and 320px widths found no horizontal page overflow. After removing the height fallback, the actual in-app preview showed a fixed frame while reverse scrolling transitioned from Hooka Relay to Recipe Buddy. A 390 × 700 check retained the pinned frame and scrolling advanced from R We Vibing? to Recipe Buddy. The temporary viewport override was reset.
- All six user-provided GIF recordings are mapped to their projects and animate automatically.
- Snap verification in the in-app browser: a partial forward scroll settled on Study Room with a 0% slide offset, and a reverse scroll settled on RAG Bench with a 0% offset. At 390 × 700, a forward scroll also settled on Study Room at 0%, with pinning retained. Build and lint passed after the snap change.
