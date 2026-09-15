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
- Animated body text and overlapping descriptions hurt readability. Descriptions stay in place and switch at the transition midpoint; only demo panels move and scale.
- Chapter buttons and repository links have at least 44px target height. Inactive pinned scenes are inert and hidden from assistive technology. Reduced motion and viewports that cannot fit the content show all projects in ordinary document flow.

## Intentional choices

The user will supply GIF recordings later, so explicitly labelled demo placeholders remain. Project titles use the portfolio's larger showcase heading scale because each is the sole project in the pinned stage, rather than a dense grid tile. Skill tags remain 12px microcomponents. No global font or site-wide spacing changes were made.

## Control behavior

Chapter buttons support default, hover, active, keyboard focus and current-step states. Activating a chapter jumps directly to its scroll position. Demo buttons support default, hover, active, focus and pressed states; image failure returns to a readable placeholder. No timers advance projects or autoplay recordings.

## Verification

- Production build and lint passed; all 16 existing tests passed.
- Browser samples at every project boundary kept the stage at 110px below the viewport top on a 1440 × 1000 viewport. All six projects became current in order; reverse scrolling returned to the earlier transition.
- Clicking the Hooka Relay chapter selected the sixth project and completed the progress line.
- Accessibility snapshots exposed only the current pinned project plus all six chapter buttons.
- At 390px and 320px widths, no horizontal page overflow occurred. Reduced-motion mode restored the ordinary document layout with every project accessible.
- GIF playback awaits the user's recordings; no demo was represented as an existing recording.
