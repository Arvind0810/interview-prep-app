# Interview Prep Hub — Next.js App

A personal, round-by-round interview playbook for a Full-Stack Engineer (Go + Next.js), built with Next.js 15 (App Router), React 19, JavaScript and Tailwind CSS.

It is organised the way a hiring loop runs (recruiter screen → technical → system design → hiring manager → offer), with a readiness scorecard, a timed mock-interview mode, a pipeline tracker and recruiter briefs per target company. The original reading library is still there under **Study Library**.

Built from Arvind Sharma's resume. It covers Golang/GoFiber, Node.js/NestJS, PostgreSQL, Redis, Docker, Microservices, Next.js/React, System Design, Fintech and DSA, plus a 330+ question bank, 9 quizzes, STAR stories drawn from real projects and self-introduction scripts.

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

## Navigation (by interview round)

| Group | Path | Page |
|---|---|---|
| Game Plan | `/` | Dashboard: readiness by round, next interview, top 3 weak areas |
| | `/pipeline` | Pipeline tracker: company, stage, dates, follow-ups |
| | `/interview-day` | T-24h / T-1h checklist, thank-you template |
| | `/intro` | Self-introduction scripts (60s / 90s / 2 min) |
| By Round | `/recruiter-screen` | Notice, CTC, reason for leaving, "say this / not this" |
| | `/technical-round` | Scoring rubric, coding-problem shape, resume deep dive |
| | `/sysdesign` | System design framework |
| | `/behavioral` | STAR story bank from real projects, with follow-up probes |
| | `/offer` | Offer components, negotiation scripts, counter-offers |
| Practice | `/mock` | Timed mock rounds, self-scored on a 4-point rubric |
| | `/qbank` | 496 questions: Browse (filters, paged) and Flashcards (Leitner spaced repetition) |
| | `/quiz`, `/leetcode` | Skill tests, coding problems |
| Learn | `/learn` | Course catalogue: 17 lessons with progress, "continue where you left off" |
| Companies | `/organizations/*` | Each page starts with a uniform recruiter brief (`CompanyBrief`) |
| Study Library | `/golang`, `/postgresql`, … | Technology reading pages (collapsed in the sidebar) |

## AI mock interviewer (Gemini, free tier)

`/mock` → **AI Interviewer** runs a live interview. Gemini asks one question at a time and follows up on vague answers or unbacked claims, using your profile and the company brief. At the end it grades the transcript per answer on structure, depth, ownership and conciseness, and lists strengths, gaps, overclaims and better versions of your weakest answers. Graded sessions feed the dashboard readiness score. Optional dictation and read-aloud use the browser's speech APIs.

Setup:
1. Create a free key at https://aistudio.google.com/apikey and restrict it to the Generative Language API.
2. `cp .env.example .env.local` and set `GEMINI_API_KEY`.
3. Restart `npm run dev`.

Notes:
- The key is read only by the server routes (`src/app/api/interview/`) and never reaches the browser.
- Default models are `gemini-3.8-flash`, falling back to `gemini-3.5-flash-lite` when the free-tier quota is hit (HTTP 429). Override them with `GEMINI_MODEL` and `GEMINI_FALLBACK_MODEL`.
- **Free-tier content is used by Google to improve its products.** Don't type anything confidential.
- If you deploy the app, set `AI_ACCESS_CODE` so strangers can't use up your quota.
- The AI routes need the Node server (`next start` or Vercel). They don't work with a static export.

## Learning-platform UI

- **App shell:** collapsible icon sidebar, sticky top bar (breadcrumbs, search, theme toggle), bottom tab bar on mobile.
- **⌘K / Ctrl+K command palette:** jumps to any page or question. The question data is only loaded when the palette is first opened.
- **Lesson layout (automatic):** every document page gets reading time, a reading-progress bar and an "On this page" table of contents built from its `<h2>`s, with the current section highlighted. Lessons (listed in `src/data/nav.js`) also get "Mark complete" and previous/next. Content pages need no changes; keep using plain `<h2>` headings.
- **Themes:** light and dark, defaulting to the OS setting. Colours are CSS variables in `globals.css` and exposed to Tailwind as `bg`, `panel`, `fg`, `muted`, `accent`, etc. Use those tokens in new code, not `slate-*` shades. Code blocks and diagrams stay dark in both themes.
- **UI primitives:** `src/components/ui.js` provides `Button`, `Badge`, `Chip`, `Tabs`, `Panel`, `PageHeader`, `StatTile`, `ProgressBar`, `ProgressRing` and `EmptyState`.

## Project structure (key files)

```
src/
├── app/                      # one folder per route (see table above)
├── components/
│   ├── Sidebar.js            # Icon nav, collapsible rail, mobile drawer, lesson ticks
│   ├── shell/                # TopBar, MobileTabBar, CommandPalette, PageFrame (TOC/lesson), ThemeToggle
│   ├── ui.js                 # Design-system primitives
│   ├── Flashcards.js         # Spaced-repetition deck
│   ├── CompanyBrief.js       # Recruiter brief at the top of each company page
│   ├── PrepChecklist.js      # Persisted checklist (feeds readiness)
│   ├── StoryBank.js          # STAR stories with theme filter + "ready" tracking
│   └── SayThis.js            # "Say this / not this" answer card
├── data/
│   ├── nav.js                # Single source for nav, lessons, mobile tabs
│   ├── stories.js            # STAR stories — fill in every [bracket] yourself
│   ├── companies.js          # Fit, angle, risks, questions per target company
│   ├── checklists.js         # Checklist items per round
│   ├── questions.js          # 330+ Q&As
│   └── quizzes.js            # 9 MCQ quizzes
└── lib/
    ├── storage.js            # Guarded localStorage + usePersistentState hook
    └── readiness.js          # Readiness score per round + weak areas
```

## Adding a target company

1. Add an entry to `src/data/companies.js` (`slug`, `company`, `role`, `fit`, `pitch`, `risks`, `screenQs`, `askThem`).
2. Create `src/app/organizations/<slug>/page.js` and render `<CompanyBrief slug="<slug>" />` under the `<h1>`.
3. Add it to the Companies group in `src/data/nav.js`.

## Customization

Want to add your own question? Edit `src/data/questions.js`:

```js
{ t: "Go", d: "med", q: "Your question?", a: "Your answer." }
```

`t` = topic, `d` = difficulty (`easy`/`med`/`hard`), `q` = question, `a` = answer.

For quizzes, edit `src/data/quizzes.js` and add an MCQ entry: `{ q, o: [opts], c: correctIdx, e: explanation }`.

## Tech stack

- **Next.js 15**: App Router, Server Components for content pages
- **React 19**: Client Components for interactive pages (dashboard, mock, pipeline, quizzes, checklists)
- **Tailwind CSS 3.4** with CSS-variable theme tokens
- **lucide-react** for icons
- **@google/genai** for the Gemini mock interviewer (server-side only)
- **localStorage**: all progress, all `iprep_`-prefixed, accessed through `src/lib/storage.js` so private windows and blocked storage fail gracefully. Data stays in the browser it was entered in.
