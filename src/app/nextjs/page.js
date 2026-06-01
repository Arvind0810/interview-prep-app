export const metadata = { title: "Next.js & React — Interview Prep" };

export default function NextjsPage() {
  return (
    <>
      <h1>React &amp; Next.js</h1>
      <p>Frontend and Full-Stack interviews expect a deep understanding of React's rendering lifecycle, state management, and modern Next.js architectural patterns (App Router, Server Components).</p>

      {/* ────────── REACT INTERNALS ────────── */}
      <h2>React Internals &amp; Lifecycle</h2>
      <ul>
        <li><b>The Virtual DOM:</b> A lightweight JavaScript representation of the actual DOM. React updates the VDOM first, compares it to a snapshot of the previous VDOM (<b>Reconciliation/Diffing</b>), and calculates the minimal set of changes needed. It then applies these changes to the real DOM in one batch.</li>
        <li><b>Keys in Lists:</b> When rendering arrays, React uses the <code>key</code> prop to identify which items have changed, been added, or been removed. <b>Never use array indices as keys</b> for lists that can re-order, as it breaks state mapping and hurts performance.</li>
        <li><b>Component Lifecycle (Mental Model):</b>
          <ul>
            <li><i>Mount:</i> Component is added to the screen. (useEffect with empty array runs).</li>
            <li><i>Update:</i> State or Props change. Component re-renders. (useEffect with dependencies runs).</li>
            <li><i>Unmount:</i> Component is removed. (useEffect cleanup function runs).</li>
          </ul>
        </li>
      </ul>

      {/* ────────── REACT HOOKS ────────── */}
      <h2>Core React Hooks</h2>
      <table>
        <thead><tr><th>Hook</th><th>Use Case</th><th>Pitfalls</th></tr></thead>
        <tbody>
          <tr><td><code>useState</code></td><td>Local component state.</td><td>State updates are asynchronous. Relying on current state to calculate next state? Use the functional form: <code>setCount(c =&gt; c + 1)</code>.</td></tr>
          <tr><td><code>useEffect</code></td><td>Side effects (fetching data, DOM manipulation, subscriptions).</td><td>Missing dependencies cause stale closures (using old variable values). Forgetting cleanup causes memory leaks.</td></tr>
          <tr><td><code>useRef</code></td><td>Mutable value that persists across renders without triggering a re-render. Accessing DOM elements.</td><td>Don't read/write <code>ref.current</code> during rendering, only in event handlers or effects.</td></tr>
          <tr><td><code>useMemo</code></td><td>Caching expensive calculations.</td><td>Overuse. React is fast. Don't memoize simple math or object creation unless it's passed as a prop to a memoized child.</td></tr>
          <tr><td><code>useCallback</code></td><td>Caching function definitions between renders.</td><td>Same as useMemo. Primarily used to prevent unnecessary re-renders of child components wrapped in <code>React.memo</code>.</td></tr>
          <tr><td><code>useContext</code></td><td>Passing data deeply without prop drilling.</td><td>Any change to the context value re-renders <i>all</i> consumers, even if they only need a subset of the data.</td></tr>
          <tr><td><code>useReducer</code></td><td>Complex state logic involving multiple sub-values or when next state depends on previous.</td><td>More boilerplate than useState.</td></tr>
        </tbody>
      </table>

      {/* ────────── NEXT.JS RENDERING MODES ────────── */}
      <h2>Next.js Rendering Strategies</h2>
      <p>Next.js solves React's biggest flaw (Client-Side Rendering latency and poor SEO) by moving rendering to the server.</p>
      
      <table>
        <thead><tr><th>Mode</th><th>How it works</th><th>Best for</th></tr></thead>
        <tbody>
          <tr><td><b>CSR</b> (Client-Side)</td><td>Standard React. Blank HTML loads, JS downloads, app renders in browser.</td><td>Highly interactive dashboards behind a login.</td></tr>
          <tr><td><b>SSG</b> (Static Site)</td><td>HTML is generated at <i>build time</i>. Served instantly via CDN.</td><td>Marketing pages, Blogs, Docs.</td></tr>
          <tr><td><b>SSR</b> (Server-Side)</td><td>HTML is generated on the server on <i>every request</i>.</td><td>Personalized feeds, real-time inventory.</td></tr>
          <tr><td><b>ISR</b> (Incremental)</td><td>HTML generated at build time, but automatically regenerated in the background every X seconds.</td><td>E-commerce product pages. Fast like SSG, fresh like SSR.</td></tr>
        </tbody>
      </table>

      {/* ────────── APP ROUTER VS PAGES ROUTER ────────── */}
      <h2>App Router &amp; React Server Components (RSC)</h2>
      <p>Next.js 13+ introduced the App Router (<code>app/</code> directory), built entirely around React Server Components.</p>
      
      <h3>Server Components (Default)</h3>
      <p>Components render exclusively on the server. The resulting HTML is sent to the client, but <b>no JavaScript is shipped for that component</b>. This drastically reduces bundle size.</p>
      <ul>
        <li>✅ Can access backend resources directly (Databases, File System).</li>
        <li>✅ Can keep sensitive tokens (API keys) secure.</li>
        <li>❌ Cannot use interactivity (<code>onClick</code>, <code>useState</code>, <code>useEffect</code>).</li>
      </ul>

      <h3>Client Components (<code>"use client"</code>)</h3>
      <p>Standard React components. They are still pre-rendered on the server for initial HTML (for SEO), but their JavaScript is shipped to the browser so they can "hydrate" and become interactive.</p>
      <p><b>Best Practice:</b> Push <code>"use client"</code> as far down the component tree as possible. Don't make the whole page a client component just for one button.</p>

      {/* ────────── COMMON PITFALLS ────────── */}
      <h2>Common Interview Pitfalls</h2>
      <details><summary>Hydration Errors</summary>
        <p><b>What is it?</b> Hydration is the process of attaching event listeners to server-rendered HTML. A hydration error occurs when the HTML generated on the server doesn't exactly match the HTML generated on the client's first render.</p>
        <p><b>Causes:</b> Using <code>Date.now()</code>, <code>Math.random()</code>, or checking <code>typeof window !== 'undefined'</code> during render. Browser extensions modifying the DOM before hydration.</p>
        <p><b>Fix:</b> Use <code>useEffect</code> to run client-specific logic only after the initial render mounts.</p>
      </details>

      <details><summary>Prop Drilling vs State Management</summary>
        <p>Passing props down 5 levels is bad (Prop Drilling). Interviewers will ask how to fix it.</p>
        <ul>
          <li><b>Context API:</b> Good for low-frequency updates (Theme, Auth User). Bad for high-frequency updates (causes massive re-renders).</li>
          <li><b>Redux:</b> Industry standard, but huge boilerplate. Centralized global store.</li>
          <li><b>Zustand:</b> Modern, lightweight alternative to Redux. No providers needed.</li>
          <li><b>Component Composition:</b> Passing <code>children</code> instead of data. Often eliminates the need for global state entirely.</li>
        </ul>
      </details>

      <details><summary>Core Web Vitals</summary>
        <p>Google's metrics for UX and SEO. You must know these:</p>
        <ul>
          <li><b>LCP (Largest Contentful Paint):</b> Loading performance. Should be &lt; 2.5s. Optimize by preloading hero images and minimizing render-blocking JS.</li>
          <li><b>INP (Interaction to Next Paint):</b> Responsiveness (replaced FID). Time from click to visual feedback. Should be &lt; 200ms. Fix by breaking up long JS tasks in the main thread.</li>
          <li><b>CLS (Cumulative Layout Shift):</b> Visual stability. Should be &lt; 0.1. Fix by explicitly setting <code>width</code> and <code>height</code> on images/ads so the page doesn't jump as they load.</li>
        </ul>
      </details>
      
      <h2>Interview Quick Reference</h2>
      <table>
        <thead><tr><th>Topic</th><th>Key Points to Mention</th></tr></thead>
        <tbody>
          <tr><td>Data Fetching</td><td>In App Router, fetch in Server Components directly (async/await) without useEffect.</td></tr>
          <tr><td>React.memo</td><td>Only prevents re-renders if props haven't changed (shallow comparison).</td></tr>
          <tr><td>Server Actions</td><td>Next.js 14+ feature. Write server-side functions that can be called directly from client forms, eliminating the need to write API routes manually.</td></tr>
        </tbody>
      </table>
    </>
  );
}
