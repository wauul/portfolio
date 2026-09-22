# Wael Fezari — Portfolio

Personal portfolio for Wael Fezari, a full-stack and AI developer. The site presents selected work, experience, and ways to get in touch, with French and English content.

Built with Next.js and designed as a fast, accessible single-page experience.

## Highlights

- Responsive portfolio with light and dark themes
- French and English interface
- Project showcase with interactive demos
- Downloadable CV in both languages
- Contact form powered by Resend
- Visitor weather and local-time panel
- SEO metadata, sitemap, robots configuration, and social sharing image

## Tech stack

- Next.js 15
- React 18
- CSS and Tailwind CSS
- Resend for transactional email
- Vercel Analytics and Speed Insights

## Getting started

### Prerequisites

- Node.js 22 or later
- pnpm 11 or later

### Installation

```bash
git clone https://github.com/wauul/portfolio.git
cd portfolio
pnpm install --frozen-lockfile
```

Start the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Scripts

| Command | Description |
| --- | --- |
| `pnpm dev` | Starts the development server |
| `pnpm build` | Creates a production build |
| `pnpm start` | Runs the production server |
| `pnpm lint` | Runs ESLint |
| `pnpm test` | Runs the test suite |

## Environment variables

The contact form is optional for local development. To enable email delivery, copy `.env.example` to `.env.local` and configure the following variables:

```env
RESEND_API_KEY=your_resend_api_key
CONTACT_FROM="Your Name <hello@your-domain.com>"
```

`CONTACT_FROM` must use a sender verified in Resend. Keep these variables server-side; do not expose them with a `NEXT_PUBLIC_` prefix.

## Project structure

```text
src/app/
├── api/           # Contact and CV endpoints
├── components/    # UI components
├── lib/           # Content and application helpers
├── page.js        # Main portfolio page
└── globals.css    # Global styles
public/
├── demos/         # Project demo assets
└── Images/        # Portfolio imagery
```

## Deployment

The project is ready to deploy on [Vercel](https://vercel.com). Add the environment variables above to the target Vercel project before enabling the contact form.

## License

Run `pnpm test` for contact validation, delivery-failure, retry and visitor-service tests. Tests mock external providers and send no real emails.
