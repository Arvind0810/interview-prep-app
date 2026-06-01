export const metadata = { title: "Next.js & React — Interview Prep" };

export default function NextjsPage() {
  return (
    <>
      <h1>Next.js &amp; React</h1>
      <p>Your resume highlights Next.js and React. Expect questions on rendering modes, App Router, and React fundamentals.</p>

      <h2>Rendering Modes</h2>
      <table>
        <thead><tr><th>Mode</th><th>When</th><th>Trade-off</th></tr></thead>
        <tbody>
          <tr><td>SSG (Static)</td><td>Marketing pages, blogs</td><td>Fastest, but rebuild for updates</td></tr>
          <tr><td>SSR (Server)</td><td>Personalized pages</td><td>Fresh data, slower TTFB</td></tr>
          <tr><td>ISR (Incremental)</td><td>Mostly static with periodic refresh</td><td>Best of both, stale window</td></tr>
          <tr><td>CSR (Client)</td><td>Heavily interactive app pages</td><td>Slow first paint, fast interaction</td></tr>
          <tr><td>RSC (React Server Components)</td><td>Default in App Router</td><td>Smaller bundle, server-side data fetching</td></tr>
        </tbody>
      </table>

      <h2>App Router vs Pages Router</h2>
      <p>App Router (Next.js 13+) introduces Server Components by default, nested layouts, streaming with Suspense, and route groups. Pages Router (legacy) uses <code>getServerSideProps</code>/<code>getStaticProps</code>.</p>
      <pre><code>{`// App Router — server component by default
// app/events/[id]/page.tsx
async function EventPage({ params }) {
  const { id } = await params;
  const event = await fetch(\`https://api.../events/\${id}\`,
    { next: { revalidate: 60 } } // ISR-like
  ).then(r => r.json());
  return <EventDetail event={event} />;
}

// Client component (needs interactivity)
'use client';
function LikeButton() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(c => c+1)}>{count}</button>;
}`}</code></pre>

      <h2>React Core Hooks</h2>
      <ul>
        <li><code>useState</code> — local state</li>
        <li><code>useEffect</code> — side effects, with cleanup</li>
        <li><code>useMemo</code> — memoize expensive computation</li>
        <li><code>useCallback</code> — stable function reference for child memoization</li>
        <li><code>useRef</code> — mutable value that doesn&apos;t trigger re-render; or DOM ref</li>
        <li><code>useContext</code> — consume context</li>
        <li><code>useReducer</code> — complex state transitions</li>
        <li><code>useTransition</code> — mark state update as non-urgent (React 18+)</li>
      </ul>

      <h2>React Performance</h2>
      <ul>
        <li>Use <code>React.memo</code>, <code>useMemo</code>, <code>useCallback</code> selectively — not everywhere</li>
        <li>Virtualize long lists with <code>react-window</code> or <code>tanstack/react-virtual</code></li>
        <li>Code split with <code>next/dynamic</code> or <code>React.lazy</code></li>
        <li>Avoid prop drilling — use context or state library (Zustand, Redux Toolkit)</li>
        <li>Keys in lists must be stable and unique — never use array index for mutable lists</li>
      </ul>

      <h2>Data Fetching</h2>
      <ul>
        <li><b>Server Components</b> — fetch directly in component, no useEffect needed</li>
        <li><b>Route Handlers</b> — <code>app/api/.../route.ts</code> for backend logic</li>
        <li><b>SWR / React Query</b> — client-side caching with revalidation</li>
        <li><b>Server Actions</b> — RPC-style mutations from forms without writing API endpoints</li>
      </ul>

      <h2>SEO &amp; Performance</h2>
      <ul>
        <li>Use <code>next/image</code> for automatic optimization</li>
        <li>Set metadata via <code>generateMetadata</code> or <code>metadata</code> export</li>
        <li>Lighthouse / Core Web Vitals — LCP &lt; 2.5s, CLS &lt; 0.1, INP &lt; 200ms</li>
        <li>Use ISR for content pages that change occasionally</li>
      </ul>

      <h2>Common Interview Topics</h2>
      <details><summary>Hydration errors</summary>
        <p>Mismatch between server-rendered HTML and client first render. Causes: <code>Date.now()</code>, <code>Math.random()</code>, <code>typeof window</code> checks. Fix: use <code>useEffect</code> for client-only logic or <code>suppressHydrationWarning</code> sparingly.</p>
      </details>
      <details><summary>useEffect dependencies</summary>
        <p>Missing deps cause stale closures. ESLint plugin <code>react-hooks/exhaustive-deps</code> catches them. If you need to skip a dep, use a ref.</p>
      </details>
      <details><summary>Reconciliation</summary>
        <p>React diffs the new tree against the old. Keys help match list items. Component identity (same type at same position) preserves state; different type unmounts.</p>
      </details>
    </>
  );
}
