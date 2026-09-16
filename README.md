# Wael Fezari — Portfolio

A Next.js portfolio focused on full-stack development and applied AI. The homepage uses a custom responsive design, lightweight scroll parallax and accessible native project disclosures.

## Development

Use Node.js 22 or newer and pnpm.

```sh
pnpm install --frozen-lockfile
pnpm dev
pnpm lint
pnpm build
pnpm start
```

## Editing

- `src/app/page.js`: project descriptions, experience entries and homepage components.
- `src/app/globals.css`: design tokens, responsive layouts and reduced-motion styles.
- `public/Wael-Fezari-CV.pdf`: current downloadable French full-stack/AI CV. The previous URL, `public/CV-Wael Fezari.pdf`, serves the same updated document for existing links.
- `src/app/layout.js`: metadata, canonical domain and Person structured data.
- `src/app/opengraph-image.js`: generated social sharing image.
- `src/app/robots.js` and `src/app/sitemap.js`: crawler metadata.

Project visuals are conceptual illustrations, not screenshots from clients. Do not add client names, code links, metrics or technical claims without permission and evidence. Project details are available without JavaScript through native `details` elements.

## Interaction and accessibility

The hero layers move at different speeds via a passive scroll listener and requestAnimationFrame. This motion switches off when reduced motion is requested. The site includes keyboard focus styles, a skip link, an accessible mobile menu, email clipboard feedback and semantic landmarks. The contact form has a server-side Resend integration; activation instructions are below.

## Deployment

Deploy through the existing Vercel project when the changes are approved. The contact form requires the server-only Resend settings below. The browser-side GitHub token has been removed; visitor information uses the documented public services below. Vercel Analytics and Speed Insights remain enabled as in the original project. Update canonical, sitemap and robots URLs together if the production domain changes.

## Languages, themes and live visitor information

French is the initial server-rendered language; English is available from the header. Language and theme selections persist locally. Translation strings are in `src/app/lib/fr.json`, with controls in `components/Preferences.js`. The French PDF is clearly labelled in both languages.

The visitor panel shows the browser's local time and requests approximate IP location from FreeIPAPI, with ipify as an IP-only fallback. Open-Meteo supplies the weather. No GPS permission is used and the application does not persist visitor information. Providers receive the requests; attribution is shown on the page. Service failures leave the clock and available fields working and offer a retry. External services have their own usage limits.

The WF hero responds to pointer movement on desktop. `ScrollStory.js` presents one pinned card that transitions through five personal journey scenes as the visitor scrolls. A stable small-viewport height, lightweight SVG artwork and complementary crossfade weights prevent blank transitions. The card follows light/dark preferences. Shared vector geometry morphs between scenes while text fades and slides; reduced-motion mode switches scenes without motion or crossfades.

## Contact form activation (Resend)

1. Use the Resend account registered with `wael.fezari@epitech.eu`.
2. Create a sending API key and add it privately as `RESEND_API_KEY` in `.env.local` and in the existing Vercel project's environment settings. Never use a `NEXT_PUBLIC_` prefix.
3. Set `CONTACT_FROM` to a Resend-verified sender. The default `WF Portfolio <onboarding@resend.dev>` supports testing to the email used for your Resend account; a verified domain is recommended for production. Do not set the sender to the visitor's email or to an unverified Gmail address.
4. Restart the local server, or redeploy when approved, then submit a real test and confirm its receipt in your inbox.

All submissions go to the fixed address `wael.fezari@epitech.eu`. The visitor email is used as Reply-To. No key or verified sender is bundled with the project. An unconfigured service returns a clear unavailable message and a direct email link; it never reports a successful send.

The route validates fields, limits request size, rejects cross-origin browser submissions, uses a honeypot and per-instance burst limiting, and sends plain text. Retrying an unchanged submission reuses the Resend idempotency key. Burst limits are in memory, not a distributed anti-spam guarantee; enable hosting-level protections if traffic warrants it.

Run `pnpm test` for contact validation, delivery-failure, retry and visitor-service tests. Tests mock external providers and send no real emails.
=======
# Wael Fezari — Portfolio

A Next.js portfolio focused on full-stack development and applied AI. The homepage uses a custom responsive design, lightweight scroll parallax and accessible native project disclosures.

## Development

Use Node.js 22 or newer and pnpm.

```sh
pnpm install --frozen-lockfile
pnpm dev
pnpm lint
pnpm build
pnpm start
```

## Editing

- `src/app/page.js`: project descriptions, experience entries and homepage components.
- `src/app/globals.css`: design tokens, responsive layouts and reduced-motion styles.
- `public/Wael-Fezari-CV.pdf`: current downloadable French full-stack/AI CV. The previous URL, `public/CV-Wael Fezari.pdf`, serves the same updated document for existing links.
- `src/app/layout.js`: metadata, canonical domain and Person structured data.
- `src/app/opengraph-image.js`: generated social sharing image.
- `src/app/robots.js` and `src/app/sitemap.js`: crawler metadata.

Project visuals are conceptual illustrations, not screenshots from clients. Do not add client names, code links, metrics or technical claims without permission and evidence. Project details are available without JavaScript through native `details` elements.

## Interaction and accessibility

The hero layers move at different speeds via a passive scroll listener and requestAnimationFrame. This motion switches off when reduced motion is requested. The site includes keyboard focus styles, a skip link, an accessible mobile menu, email clipboard feedback and semantic landmarks. The contact form has a server-side Resend integration; activation instructions are below.

## Deployment

Deploy through the existing Vercel project when the changes are approved. The contact form requires the server-only Resend settings below. The browser-side GitHub token has been removed; visitor information uses the documented public services below. Vercel Analytics and Speed Insights remain enabled as in the original project. Update canonical, sitemap and robots URLs together if the production domain changes.

## Languages, themes and live visitor information

French is the initial server-rendered language; English is available from the header. Language and theme selections persist locally. Translation strings are in `src/app/lib/fr.json`, with controls in `components/Preferences.js`. The French PDF is clearly labelled in both languages.

The visitor panel shows the browser's local time and requests approximate IP location from FreeIPAPI, with ipify as an IP-only fallback. Open-Meteo supplies the weather. No GPS permission is used and the application does not persist visitor information. Providers receive the requests; attribution is shown on the page. Service failures leave the clock and available fields working and offer a retry. External services have their own usage limits.

The WF hero responds to pointer movement on desktop. `ScrollStory.js` presents one pinned card that transitions through five personal journey scenes as the visitor scrolls. A stable small-viewport height, lightweight SVG artwork and complementary crossfade weights prevent blank transitions. The card follows light/dark preferences. Shared vector geometry morphs between scenes while text fades and slides; reduced-motion mode switches scenes without motion or crossfades.

## Contact form activation (Resend)

1. Use the Resend account registered with `wael.fezari@epitech.eu`.
2. Create a sending API key and add it privately as `RESEND_API_KEY` in `.env.local` and in the existing Vercel project's environment settings. Never use a `NEXT_PUBLIC_` prefix.
3. Set `CONTACT_FROM` to a Resend-verified sender. The default `WF Portfolio <onboarding@resend.dev>` supports testing to the email used for your Resend account; a verified domain is recommended for production. Do not set the sender to the visitor's email or to an unverified Gmail address.
4. Restart the local server, or redeploy when approved, then submit a real test and confirm its receipt in your inbox.

All submissions go to the fixed address `wael.fezari@epitech.eu`. The visitor email is used as Reply-To. No key or verified sender is bundled with the project. An unconfigured service returns a clear unavailable message and a direct email link; it never reports a successful send.

The route validates fields, limits request size, rejects cross-origin browser submissions, uses a honeypot and per-instance burst limiting, and sends plain text. Retrying an unchanged submission reuses the Resend idempotency key. Burst limits are in memory, not a distributed anti-spam guarantee; enable hosting-level protections if traffic warrants it.

Run `pnpm test` for contact validation, delivery-failure, retry and visitor-service tests. Tests mock external providers and send no real emails.
