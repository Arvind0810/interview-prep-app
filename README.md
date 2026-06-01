# Interview Prep Hub — Next.js App

A personal interview preparation app for a Full-Stack Engineer (Go + Next.js) role, built with Next.js 14 (App Router), JavaScript, and Tailwind CSS.

Built from Arvind Sharma's resume — covers Golang/GoFiber, Node.js/NestJS, PostgreSQL, Redis, Docker, Microservices, Next.js/React, System Design, Fintech, DSA, plus a 150+ question bank, interactive quizzes, STAR behavioral stories, and self-introduction scripts.

## Quick start

```bash
# 1. Install dependencies
npm install

# 2. Run development server
npm run dev

# 3. Open in browser
# http://localhost:3000
```

That's it. The app uses `localStorage` for progress tracking (no backend needed).

## Production build

```bash
npm run build
npm run start
```

## Project structure

```
interview-prep-app/
├── package.json
├── next.config.mjs
├── jsconfig.json              # @/* path alias to src/
├── tailwind.config.js
├── postcss.config.js
├── src/
│   ├── app/
│   │   ├── layout.js          # Root layout (sidebar + main)
│   │   ├── page.js            # Dashboard (home)
│   │   ├── globals.css        # Tailwind + custom styles
│   │   ├── intro/             # Self-introduction scripts (60s/90s/2min)
│   │   ├── roadmap/           # 14-day study plan
│   │   ├── golang/            # Go & GoFiber reading
│   │   ├── nodejs/            # Node.js & NestJS reading
│   │   ├── postgresql/        # PostgreSQL & SQL reading
│   │   ├── redis/             # Redis & Caching reading
│   │   ├── docker/            # Docker & DevOps reading
│   │   ├── microservices/     # Microservices & APIs reading
│   │   ├── nextjs/            # Next.js & React reading
│   │   ├── sysdesign/         # System Design framework
│   │   ├── fintech/           # Fintech domain knowledge
│   │   ├── dsa/               # DSA refresher
│   │   ├── qbank/             # 150+ Q&A bank (filterable)
│   │   ├── quiz/              # 8 interactive MCQ quizzes
│   │   ├── behavioral/        # 8 STAR stories + common questions
│   │   └── improvement/       # Resources & habits
│   ├── components/
│   │   ├── Sidebar.js         # Left nav with search
│   │   └── Card.js            # Reusable cards/stats/pills
│   └── data/
│       ├── questions.js       # 150 questions (10 topics)
│       └── quizzes.js         # 8 MCQ quizzes (54 questions total)
└── README.md
```

## Features

- **Sidebar navigation** with live filter search
- **Dashboard** shows questions reviewed, latest quiz score, study streak (localStorage)
- **Reading materials** for every technology on the resume — code samples, gotchas, tables
- **Question Bank** — 150+ questions, filterable by topic and difficulty, mark-as-reviewed persistence
- **Interactive Quizzes** — 8 topic quizzes, instant feedback, score history, retry support
- **Behavioral STAR stories** — 8 pre-written stories drawn from Arvind's real projects (1Finance, Thinkbar, Visualytes)
- **Self-introduction scripts** — 60s, 90s, and 2-minute versions, plus delivery tips
- **Improvement plan** — resources, weekly habits, books, channels
- **Persistent progress** via `localStorage` (no backend required)

## Routing map

| Path | Page |
|------|------|
| `/` | Dashboard |
| `/intro` | Self-Introduction |
| `/roadmap` | 14-day study plan |
| `/golang` | Golang & GoFiber |
| `/nodejs` | Node.js & NestJS |
| `/postgresql` | PostgreSQL & SQL |
| `/redis` | Redis & Caching |
| `/docker` | Docker & DevOps |
| `/microservices` | Microservices & APIs |
| `/nextjs` | Next.js & React |
| `/sysdesign` | System Design |
| `/fintech` | Fintech Domain |
| `/dsa` | DSA Refresher |
| `/qbank` | Question Bank |
| `/quiz` | Skill Test (Quizzes) |
| `/behavioral` | Behavioral & STAR |
| `/improvement` | Improvement Plan |

## Customization

Want to add your own question? Edit `src/data/questions.js`:

```js
{ t: "Go", d: "med", q: "Your question?", a: "Your answer." }
```

`t` = topic, `d` = difficulty (`easy`/`med`/`hard`), `q` = question, `a` = answer.

For quizzes, edit `src/data/quizzes.js` and add an MCQ entry: `{ q, o: [opts], c: correctIdx, e: explanation }`.

## Tech stack

- **Next.js 14.2** — App Router, Server Components for content pages
- **React 18.3** — Client components for interactive features
- **Tailwind CSS 3.4** — utility-first styling
- **localStorage** — progress persistence (no DB needed)

## Notes

- All localStorage keys are prefixed with `iprep_` to avoid collisions
- Content pages are Server Components (no JS shipped) — fast initial load
- Interactive pages (`/qbank`, `/quiz`) are Client Components — they use state
- Sidebar is a Client Component because it needs `usePathname()` and search state

Built for Arvind Sharma, Backend-focused Full-Stack Software Engineer at NeoSOFT Technologies / 1Finance.
