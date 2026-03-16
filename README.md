# Himanshu Nanda — Portfolio v6

Personal portfolio for a data scientist building toward quantitative research.
Features a Quant Playground with live trading strategy simulations, LangGraph/LangChain
agentic AI section, interactive Gaussian curve, animated scroll reveals, magnetic buttons,
custom cursor, floating math equations, typewriter hero, and a mathematical design language.

---

## Stack

| Layer         | Tech                                                        |
|---------------|-------------------------------------------------------------|
| Framework     | Next.js 14 (Pages Router)                                   |
| Language      | TypeScript                                                  |
| Styling       | Tailwind CSS + CSS custom properties                        |
| Animations    | Custom scroll reveals, magnetic buttons, particle field     |
| Math / Sim    | Pure canvas + TypeScript (`lib/math.ts`)                    |
| Fonts         | Playfair Display · JetBrains Mono · Source Sans 3           |
| Deployment    | Vercel                                                      |

---

## Quick Start (local dev)

```bash
# 1. Unzip and enter the folder
cd himanshu-portfolio-v6

# 2. Install dependencies
npm install

# 3. Start dev server
npm run dev
# → open http://localhost:3000

# 4. Production build (test before deploying)
npm run build && npm start
```

> **MetaMask error?** Open the site in an Incognito window (`Cmd/Ctrl + Shift + N`).
> MetaMask injects itself into every page — it has nothing to do with your code.

---

## Deploy to GitHub + Vercel

### Step 1 — Personalise before you push

Open `lib/constants.ts` and update:

```ts
export const PERSON = {
  name: 'Himanshu Nanda',
  company: 'AT&T',
  email: 'himanshu.nanda22@gmail.com',
  linkedin: 'https://www.linkedin.com/in/himanshu-nanda-8537a6225/',
  leetcode: 'https://leetcode.com/u/nh22/',
  github: 'https://github.com/YOUR_GITHUB_USERNAME',   // ← update this
}
```

Also update the B.Tech institution name in `EDUCATION`:
```ts
institution: 'Your University Name Here',   // ← update this
```

Drop your resume into `public/resume.pdf` — the download button is already wired.

---

### Step 2 — Create a GitHub repository

1. Go to **https://github.com/new**
2. Repository name: `portfolio` (or `himanshu-portfolio`)
3. Visibility: **Public** ← required for free Vercel deployment
4. Leave "Add a README" **unchecked** — you already have one
5. Click **Create repository**

---

### Step 3 — Push your code

Open a terminal inside the `himanshu-portfolio-v6` folder and run:

```bash
git init
git add .
git commit -m "initial commit — portfolio v6"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

Replace `YOUR_USERNAME` and `YOUR_REPO` with your actual GitHub values.

Verify: refresh your GitHub repo page — all files should appear.

---

### Step 4 — Deploy on Vercel

1. Go to **https://vercel.com** and click **Sign in with GitHub**
2. Click **Add New Project**
3. Find your repo in the list → click **Import**
4. Vercel auto-detects Next.js — **no configuration needed**
5. Click **Deploy**

Your site goes live in ~60 seconds at:
```
https://YOUR_REPO_NAME.vercel.app
```

Every time you `git push` to `main`, Vercel redeploys automatically.

---

### Step 5 — Custom domain (optional)

**Buy a domain** — recommended options:
- `nandaquant.com`
- `himanshunanda.com`
- `himanshuquant.com`

Good registrars: [Namecheap](https://namecheap.com) (~$10/yr) or [Google Domains](https://domains.google).

**Connect it to Vercel:**
1. In Vercel → your project → **Settings** → **Domains**
2. Click **Add** → type your domain
3. Vercel shows you two DNS records to add (usually an A record + CNAME)
4. Log into your registrar → DNS settings → add those records
5. Wait 5–15 minutes for propagation → your site is live on the custom domain

---

## Keeping it up to date

Every change follows the same 3-command flow:

```bash
git add .
git commit -m "describe what you changed"
git push
```

Vercel picks it up automatically. No manual redeploy needed.

---

## File Map

```
himanshu-portfolio-v6/
│
├── lib/
│   ├── constants.ts     ← ALL personal data — edit this first
│   └── math.ts          ← GBM, momentum, mean-reversion, pairs, Gaussian PDF
│
├── components/
│   ├── Effects/
│   │   ├── CustomCursor.tsx     ← blue dot + lagging ring cursor
│   │   ├── GlowCard.tsx         ← mouse-tracking radial glow on cards
│   │   ├── MagneticButton.tsx   ← buttons that follow the cursor
│   │   ├── ParticleField.tsx    ← rising math symbols canvas background
│   │   ├── Reveal.tsx           ← scroll-triggered fade/slide animations
│   │   ├── TypewriterText.tsx   ← cycling typewriter in hero subline
│   │   ├── CountUp.tsx          ← animated number counter (education scores)
│   │   └── SmoothProgress.tsx   ← animated skill progress bars
│   │
│   ├── Nav/             ← sticky nav + reading progress bar
│   ├── Hero/            ← floating equations + particles + typewriter + CTAs
│   ├── About/           ← cards + skill bars + Gaussian curve + terminal
│   ├── GaussianCurve/   ← interactive N(μ,σ) canvas with sliders
│   ├── Scene/           ← easter egg CLI terminal
│   ├── Playground/      ← 4-strategy trading simulator (canvas-drawn paths)
│   ├── Agentic/         ← LangGraph state machine + projects + code snippet
│   ├── Education/       ← animated timeline, expandable cards, CountUp scores
│   ├── Research/        ← Springer Nature publication card
│   ├── Articles/        ← writing cards with glow effect
│   ├── Contact/         ← email + social links with slide-in animation
│   └── Section/         ← shared section wrapper + Divider
│
├── hooks/
│   └── useScrollReveal.ts
│
├── pages/
│   ├── _app.tsx         ← mounts CustomCursor globally
│   └── index.tsx        ← assembles all sections
│
├── styles/globals.css   ← fonts, CSS variables, all keyframes
└── public/              ← drop resume.pdf here
```

---

## Personalisation Checklist

- [ ] `lib/constants.ts` → update `PERSON` (especially `github`)
- [ ] `lib/constants.ts` → update `EDUCATION[0].institution` with your university name
- [ ] `public/resume.pdf` → add your resume
- [ ] `lib/constants.ts` → update `ARTICLES` as you publish more writing
- [ ] `lib/constants.ts` → update `AGENTIC_PROJECTS` statuses as you complete projects
- [ ] `components/Research/ResearchSection.tsx` → add paper title once published
- [ ] `lib/constants.ts` → update `RESEARCH.title` once the Springer paper is live

---

## Adding a New Strategy to the Playground

In `lib/math.ts`, add a function following the existing pattern:

```ts
export function myStrategyPath(T: number, N: number, mu: number, sigma: number, S0 = 100): number[] {
  const base = gbmPath(T, N, mu, sigma, S0)
  const equity = [S0]
  // ... your signal logic
  return equity
}
```

Then in `components/Playground/QuantPlayground.tsx`:
1. Import your function
2. Add an entry to the `STRATEGIES` array
3. Add a case in the `if/else` block inside `runSim()`

---

## Adding a Terminal Easter Egg Command

In `components/Scene/Terminal.tsx`, add to the `COMMANDS` object:

```ts
'your command': {
  out: '→ Output line 1\n→ Output line 2\n→ Output line 3',
  hint: 'section-id',   // optional: auto-scrolls to this section after 800ms
},
```

---

## Roadmap

- [ ] Three.js 3D math world — floating bell curves, coordinate axes, regression plane
- [ ] Live market data via Next.js API route + yfinance
- [ ] KaTeX equation rendering in Research section
- [ ] Dark mode toggle
- [ ] LeetCode stats via API (`https://leetcode-stats-api.herokuapp.com/nh22`)
- [ ] Framer Motion for more complex page transitions
- [ ] Research paper full card once Springer publishes (Apr 2026)