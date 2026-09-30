# Portfolio project overview

Reviewed on 30 September 2026 against `main` at `2c8124e` in [wauul/portfolio](https://github.com/wauul/portfolio).

The sections below record the onboarding baseline. The redesign was developed on `codex/portfolio-kinetic-redesign` for publication to `main`; its identity and coverage are in [DESIGN.md](../DESIGN.md) and [redesign verification](redesign-verification.md).

The current root page is a server wrapper around `components/Portfolio.js`. Professional work and experience are in `lib/professional-work.js`. All five story chapters are in `lib/story.js`, with continuous semantic morph geometry in `lib/journey-artwork.js` and a shared canvas renderer in `components/JourneySculpture.js`. `components/WorkVisual.js` contains the three distinct professional illustrations. The visitor panel now loads only when opened; themes follow the system unless overridden; reduced motion removes the long story/project tracks. Public API contracts remain the same.

The active personal reel is ordered by technical depth and practical usefulness: GetRatchet, Hooka Relay, QueryOtter, PatchGoblin, Study Room, RAG Bench, Watchtower, R We Vibing?, and Recipe Buddy. GetRatchet, QueryOtter and PatchGoblin use actual interface screenshots; the existing six retain their recordings. Prominent type tags identify AI, web apps, APIs, SDKs and specialist capabilities. R We Vibing? also has a mobile tag for its existing Android shell. Hooka Relay and Recipe Buddy use their current documented public domains. PatchGoblin links to a public verified repair because its hosted workbench requires owner access. GetRatchet links only to its public app. The extra GitHub profile CTA below professional work was removed; other social links remain.

## Purpose and structure

Wael Fezari's public portfolio presents full-stack development and applied AI work to prospective employers and clients. It is a single-page Next.js App Router application with anchor navigation, French and English content, light and dark themes, downloadable CVs, and a contact form. There is no application database or authentication layer.

The installed baseline uses Next.js 15.5.25, React 18.3.1, Tailwind CSS 3, and pnpm 11.19.0. Source is JavaScript/JSX with separate `.mjs` helpers. Most of the current presentation uses ordinary CSS and CSS modules rather than Tailwind utility classes.

## Baseline application map

| File | Responsibility |
| --- | --- |
| `src/app/layout.js` | Global styles, French SEO metadata, canonical URL, Person structured data, initial theme script, Vercel Analytics and Speed Insights |
| `src/app/page.js` | Client entry point, preferences provider, sticky navigation, hero, three professional projects, skills, experience, education, contact and footer |
| `src/app/components/Preferences.js` | Language/theme state, localStorage persistence, document language/title updates, locale detection and preference controls |
| `src/app/lib/fr.json` | French translations keyed by English source text; missing keys fall back to the source string |
| `src/app/components/PersonalProjects.js` | Six-project showcase, GIFs, chapter controls, desktop scroll transitions, mobile swipe carousel and live/repository links |
| `src/app/lib/personal-projects.js` | Ordered project data, bilingual copy, technologies, demo paths and URLs |
| `src/app/components/ScrollStory.js` | Illustrated personal journey; currently renders three selected chapters from five defined chapters |
| `src/app/lib/journey.mjs` | Shared chapter timing and SVG silhouette interpolation |
| `src/app/components/HeroSculpture.js` | Decorative hero artwork with pointer tilt and reduced-motion support |
| `src/app/components/ContactForm.js` | Client validation, submission state, preserved text on failure and retry identifiers |
| `src/app/lib/contact.mjs` | Server validation, origin checks, body-size limit, honeypot, per-instance rate limiting and Resend delivery |
| `src/app/components/VisitorPanel.js` | Local clock, visitor context, loading/fallback states and retry |
| `src/app/lib/visitor.mjs` | FreeIPAPI location, ipify fallback and Open-Meteo weather requests |
| `src/app/components/DownloadCV.js` | CV link matching the selected interface language |

Professional projects and experience are embedded directly in `page.js`. Personal project copy uses `[English, French]` pairs; journey copy uses `[French, English]` pairs. Keep that difference in mind when editing content.

The current personal-project order is Hooka Relay, RAG Bench, Study Room, Watchtower, R We Vibing?, then Recipe Buddy. All six GIF files are present under `public/demos/`.

## Routes and external dependencies

| Route | Behavior |
| --- | --- |
| `/` | Portfolio page |
| `POST /api/contact` | Sends plain-text email to the fixed portfolio recipient through the Resend REST API; visitor email becomes reply-to |
| `GET /api/cv?lang=fr\|en` | Streams the corresponding PDF with attachment headers; defaults/falls back to French |
| `GET /api/locale` | Chooses French or English from Vercel country headers, with Accept-Language fallback |
| `/sitemap.xml`, `/robots.txt` | Search indexing configuration |
| `/opengraph-image` | Generated social sharing image |

Only contact delivery needs local credentials: `RESEND_API_KEY` and `CONTACT_FROM`, documented in `.env.example`. The sender must be verified in Resend. No credentials were added during onboarding, and no real email was sent.

Visitor service calls happen from the browser when the component mounts, including when its disclosure is closed. The clock uses the browser timezone. Location comes from IP lookup rather than device geolocation. Partial provider failures preserve available data.

The canonical deployment URL is hard-coded as `https://wael-fezari.vercel.app`. `next.config.mjs` applies content-type, referrer, framing and permissions headers.

## Interaction and styling

The default interface is French with a dark theme. A saved language takes precedence; otherwise `/api/locale` supplies a preference. English is the translation source. The layout sets the stored theme before hydration to reduce theme flashing.

At widths above 760px, personal projects pin below the header across a 650svh track. Vertical scroll moves complete cards horizontally, with a reading interval and a delayed settle to the nearest project during partial transitions. Inactive desktop cards are inert and hidden from assistive technology. At 760px and below, pinning is disabled and the section uses horizontal scroll snapping with chapter controls.

The journey has a separate 360svh sticky stage and currently displays childhood, teamwork and freelance chapters. Its timing helper is shared with personal projects. Reduced motion changes how scenes transition; it does not remove the long scroll tracks.

`globals.css` owns global tokens, typography, most section layouts, responsive behavior and theme overrides. `PersonalProjects.module.css` and `ScrollStory.module.css` own their respective interactive sections. Decorative hero parallax is disabled on small screens, coarse pointers and reduced-motion settings.

## Legacy code and maintenance observations

`src/app/pages/`, `ThemeProvider.js`, `services/projectsService.js`, and several older UI components remain from an earlier design. The current root route does not import those pages or the old theme provider. For example, the old Home component references an OpenWeather token, while the active visitor panel uses Open-Meteo without an API key. Do not mistake old code requirements for active application requirements.

The dependency list still includes libraries referenced by that legacy UI. Cleanup would need a dependency/import audit before removal.

Some documentation describes an older project order or mobile pinning behavior. Treat the current project data and component breakpoint logic as authoritative. Journey frame tests use the helper's default five chapters; the rendered journey now uses three. The SVG morph helper still uses its five original silhouettes, so chapter illustrations and transition silhouettes should be reviewed together if the story is changed.

Contact rate limiting is in memory per server instance, rather than shared durable storage. Language switching updates the visible UI and document title, while server-generated metadata remains French. These are implementation constraints to consider when future work touches abuse protection or multilingual SEO.

## Local workflow and baseline checks

- Install: `pnpm install --frozen-lockfile`.
- Development: `pnpm dev`.
- Production: `pnpm build`, then `pnpm start`.
- Validation: `pnpm lint` and `pnpm test`.

Onboarding installation succeeded with the frozen lockfile. The existing 17 tests passed using `node --test tests/*.test.mjs`, and lint passed. Tests cover contact validation/delivery failures/idempotency, journey timing, personal-project URL structure and visitor-provider fallbacks. Expected mocked provider failures print diagnostic messages. Node also emits a non-fatal module-type warning for the personal-project data file.

The production build passed. Its only reported build warning concerns the edge-runtime social image being dynamic. The root route is statically prerendered with a reported first-load JavaScript size of 135 kB.

A temporary production server returned HTTP 200 for the root page, locale endpoint, both CV languages, robots and sitemap. Locale responses matched an English browser header and a French country header; both downloads had valid PDF signatures and matching attachment filenames. The root page included project content and the configured framing header. The temporary server was stopped after verification.

This document is a source-level onboarding map, not a full visual or accessibility audit. No application code was changed during onboarding; this overview is the only new tracked-workspace file.
