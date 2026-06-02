# Har Ghar Shudhi — Cinematic scroll experience

Premium Next.js (App Router) scrollytelling site for **Har Ghar Shudhi**: pinned fullscreen video, GSAP + ScrollTrigger, Lenis smooth scroll, and luxury typography.

## Prerequisites

- Node.js 18+ (20+ recommended)
- npm

## Local setup

```bash
git clone <your-repo-url>
cd <repo-folder>
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Cinematic video

Place your master film at:

`public/hargharshudhi-story.mp4`

A large file (~45MB+) is fine for GitHub under the 100MB per-file limit; for faster clones you can use [Git LFS](https://git-lfs.com/) or host the asset on a CDN and change the `src` in `components/CinematicExperience.tsx`.

## Scripts

| Command        | Description           |
|----------------|-----------------------|
| `npm run dev`  | Development server    |
| `npm run build`| Production build      |
| `npm run start`| Serve production build|
| `npm run lint` | ESLint                |

## Shopify (Phase 1 — Headless)

Copy `env.example` to `.env.local` and add your Shopify credentials:

```bash
cp env.example .env.local
```

```env
SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
SHOPIFY_STOREFRONT_ACCESS_TOKEN=your_storefront_access_token
SHOPIFY_API_VERSION=2025-10
```

**What's wired up:**
- Live products & collections from Shopify Storefront API
- Cart (add / update / remove) with cookie persistence
- Checkout redirect to Shopify hosted checkout
- Product variant selection with real availability
- Search at `/search?q=...`

Create a custom app in **Shopify Admin → Settings → Apps → Develop apps**, enable **Storefront API** scopes, and copy the public Storefront access token.

### Checkout (Har Ghar Shudhi — on your site)

The cart **Checkout** button goes to **`/checkout`** on this Next.js app — fully branded **Har Ghar Shudhi** (not Shopify / Two Brothers). Orders are confirmed on **`/checkout/complete`**.

Shopify is still used for the **product catalog and cart** via the Storefront API. When you connect your own Har Ghar Shudhi Shopify store in `.env.local`, swap the domain and tokens; checkout UI stays on your site.

Brand logo image: `public/brand/har-ghar-shudhi-logo.png` (used in header, footer, checkout, and favicon).

Optional: `scripts/set-checkout-logo.mjs` only applies if you later use Shopify hosted checkout on **your** store.

## Stack

- Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS
- **Shopify Storefront API** (`@shopify/storefront-api-client`)
- GSAP + ScrollTrigger, Lenis (`@studio-freight/lenis`), Lucide icons

## GitHub → Lovable

1. Push this repo to GitHub (see below).
2. In [Lovable](https://lovable.dev), choose **Import project** / connect GitHub and select this repository.
3. After Lovable syncs, polish components there; merge changes back via GitHub PRs or `git pull` locally as you prefer.

Keep `node_modules` and `.next` out of Git (already in `.gitignore`). Always run `npm install` after pulling.

## License

Private / all rights reserved — adjust as needed for your brand.
