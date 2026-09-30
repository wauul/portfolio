# Signal Atlas verification

30 September 2026. Developed on `codex/portfolio-kinetic-redesign`; publication target: `main`.

## Implementation coverage

The single-page portfolio, both languages and both themes are covered: navigation and mobile menu; language popover; theme controls and system motion preferences; hero; professional case studies and disclosures; nine personal projects with six animated demos and three actual interface previews; skills, experience and education; all five journey chapters; visitor disclosure; contact form and social/direct-email actions; footer; 404 and error boundary; local fonts, favicon, Apple icon and social image. No authentication, dashboard or onboarding routes exist in this product.

The redesign preserves public anchors, social destinations, CV and locale endpoints, contact payload and server delivery logic. The Microsoft illustration separates SSO/Office integrations from the distinct Bubble operations application, matching the original project facts. Current source documentation corrects the Hooka Relay and Recipe Buddy destinations.

## Checks performed

- `pnpm lint`: passed without warnings.
- `pnpm test`: 18/18 passed. Contact delivery, origin/body/spam checks, retry idempotency, journey timing, project URLs, GetRatchet's absent private repository link and visitor fallback behavior remain covered.
- `pnpm build`: passed. Root first-load JavaScript is 139 kB versus the 135 kB onboarding baseline. No new runtime dependency was added. The existing edge-runtime social-image warning remains.
- Morph geometry: all five artworks have 2,037 matching finite 3D vertices; every chapter uses the same interpolation topology.
- Local HTTP checks: both CV PDFs returned 200 with matching attachment filenames; locale, social image, favicon, Apple icon, robots and sitemap returned 200; an unknown page returned 404.
- Browser inspection at 320×740, 390×844, 768×1024, 1440×900 and the app's desktop viewport. Checked French/English and light/dark, open navigation/language menus, case-study disclosures, long project text, contact form and journey.
- Keyboard: visible focus outlines, mobile menu Escape-to-close with focus returned to its trigger, and operable project/chapter controls. Inactive pinned slides and story text are inert and hidden from assistive technology.
- Narrow layouts: no page overflow at 320px after the disclosure fix. Enlarging the root font to 32px exposed headline/about overflow; headings now wrap and grid children can shrink. A subsequent 390px check had no page overflow at that root text scale.
- Reduced motion: no autoplay GIFs, no pinned project track, and all five story chapters readable as a normal list. Individual demo play/pause controls remain available. The global pause button and its saved preference were removed at the user’s request.
- Motion: inspected all five semantic illustrations, an intermediate morph, forward/reverse progression and chapter jumps; checked canvas resize and synchronization. Rendering follows the same frame as text and skips unchanged/offscreen frames.
- Project illustrations: team planning/Lucca, Azure retrieval/OpenAI and Microsoft/Bubble workflows have distinct accessible descriptions and matching light/dark styling. Connector motion stops when offscreen or under the system reduced-motion setting.
- Contact: empty-field validation/focus; actual local unconfigured error preserving entered text; disabled/sending and success/reset states with an intercepted local response. No real email was sent.
- Visitor panel: actual data, blocked-service unavailable state and successful retry recovery. Unit tests cover partial provider failures. Demo failure: blocked local image produced a readable fallback with project text and links intact.
- Copy-email feedback and the 404 return link were exercised. A browser hydration warning from unrounded SVG coordinates was corrected by rounding the static geometry; subsequent reloads produced no new application console errors.

## Project additions

Added QueryOtter, PatchGoblin and GetRatchet from the owner's current project documentation. QueryOtter's performance copy describes measured, isolated experiments without promising a general speedup. PatchGoblin's primary action opens a public verified repair because its hosted workbench requires owner access. GetRatchet links only to its public application; its private repository is absent from both the data and rendered links. Removed the extra GitHub profile CTA below professional work.

The reel ranks technical depth and practical usefulness: GetRatchet, Hooka Relay, QueryOtter, PatchGoblin, Study Room, RAG Bench, Watchtower, R We Vibing?, then Recipe Buddy. Durable job execution and webhook infrastructure lead; measured database and CI investigations follow, then collaborative/evaluation tools and everyday apps. Bilingual project-type tags identify AI, web apps, APIs, SDKs and specialist capabilities in both professional and personal work. Only R We Vibing? receives a mobile tag, based on its existing Capacitor Android application.

QueryOtter and PatchGoblin previews are actual screenshots from their repository documentation. GetRatchet's screenshot is from its public, explicitly fictional demo workspace. Static previews have descriptive bilingual alt text and no playback control. Existing six recordings keep pause/play, offscreen handling and reduced-motion stills.

The nine-project desktop reel was checked chapter by chapter with the expected current title and destinations. All three previews loaded. At 320×740 in French/light mode, the horizontal chapter rail reached Recipe Buddy at `09 / 09` without page overflow. Mobile selection uses actual card offsets, including gaps. At 1440×900 in reduced-motion mode, all nine projects were readable in the normal list, no GIF was active, and there were zero private GetRatchet repository links. The professional section had zero links after the requested CTA removal. Public QueryOtter, GetRatchet, Hooka Relay and Recipe Buddy destinations were opened successfully.

Source references: [QueryOtter](https://github.com/wauul/queryotter), [PatchGoblin](https://github.com/wauul/PatchGoblin), [GetRatchet documentation](https://getratchet.app/docs), [Hooka Relay](https://hooka-relay.com), and [Recipe Buddy](https://recipe-buddy-wauul.vercel.app).

Temporary network failures, interception patterns, root font changes and media/viewport overrides used for these checks were restored before handoff.

## Limits

Real email delivery requires configured Resend credentials and was not verified. The error boundary is implemented and compiled, but an artificial application crash was not injected. Native mobile hardware, screen-reader audio, cross-browser rendering, Core Web Vitals and a formal WCAG audit were not tested; viewport and computed-token checks are not substitutes for those measurements. Third-party visitor services and linked live applications may change independently.

Semantic normal-text token contrast was calculated against the relevant surfaces: light muted text ≥5.64:1, accent text ≥4.83:1 and accent-button text 5.77:1; dark muted text ≥7.19:1, accent text ≥5.77:1 and accent-button text 7.03:1. Decorative canvas lines are not text.

The preview runs locally on port 3180. The user requested that the completed changes be committed and pushed to `main` after verification.
