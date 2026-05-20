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

## Stack

- Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS
- GSAP + ScrollTrigger, Lenis (`@studio-freight/lenis`), Framer Motion (available), Lucide icons

## GitHub → Lovable

1. Push this repo to GitHub (see below).
2. In [Lovable](https://lovable.dev), choose **Import project** / connect GitHub and select this repository.
3. After Lovable syncs, polish components there; merge changes back via GitHub PRs or `git pull` locally as you prefer.

Keep `node_modules` and `.next` out of Git (already in `.gitignore`). Always run `npm install` after pulling.

## License

Private / all rights reserved — adjust as needed for your brand.
