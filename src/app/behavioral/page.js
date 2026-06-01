export const metadata = { title: "Behavioral & STAR — Interview Prep" };

export default function BehavioralPage() {
  return (
    <>
      <h1>Behavioral &amp; STAR Stories</h1>
      <p>Behavioral interviews assess your judgment, ability to work with others, and how you handle failure. Companies (especially FAANG) use these rounds to see if you align with their core values (like Amazon's Leadership Principles).</p>

      {/* ────────── THE STAR METHOD ────────── */}
      <h2>The STAR Method</h2>
      <p>Every behavioral answer should follow this structure. Keep the <i>Situation</i> and <i>Task</i> brief (20%). Spend the most time on your <i>Action</i> (60%) and conclude with a measurable <i>Result</i> (20%).</p>
      <ul>
        <li><b>Situation:</b> Set the scene. What was the context?</li>
        <li><b>Task:</b> What was the goal or problem you needed to solve?</li>
        <li><b>Action:</b> What did <i>you</i> specifically do? Use "I", not "We". Describe the technical and interpersonal steps.</li>
        <li><b>Result:</b> What was the outcome? Use numbers if possible (e.g., "saved 10 hours a week", "reduced latency by 40%"). What did you learn?</li>
      </ul>

      {/* ────────── CORE THEMES & SCENARIOS ────────── */}
      <h2>Core Themes to Prepare For</h2>
      <p>Instead of memorizing answers, prepare 4-5 versatile stories from your career that can be adapted to answer questions across these themes:</p>

      <details><summary>Theme 1: Handling Conflict / Pushback</summary>
        <p><i>Example Question:</i> "Tell me about a time you disagreed with a colleague on a technical approach."</p>
        <p><b>What they want to see:</b> Empathy, data-driven decision making, compromise, and the ability to "disagree and commit".</p>
        <p><b>How to frame it:</b> Talk about a time someone proposed a fast, hacky solution vs your robust but slower solution (or vice versa). Explain how you evaluated the trade-offs (time-to-market vs technical debt), listened to their concerns, built a quick PoC, and reached a consensus.</p>
      </details>

      <details><summary>Theme 2: Delivering Under Pressure / Missed Deadlines</summary>
        <p><i>Example Question:</i> "Tell me about a time you realized you were going to miss a deadline."</p>
        <p><b>What they want to see:</b> Proactive communication, prioritization, and managing expectations.</p>
        <p><b>How to frame it:</b> Explain the unforeseen blocker. Show that you didn't hide the problem. You alerted stakeholders early, proposed cutting non-critical scope (MVP approach), and delivered the core value on time while scheduling the rest for a fast-follow sprint.</p>
      </details>

      <details><summary>Theme 3: Owning a Failure / Production Outage</summary>
        <p><i>Example Question:</i> "Tell me about a time you broke something in production or failed at a task."</p>
        <p><b>What they want to see:</b> Accountability (no finger-pointing), immediate mitigation, and long-term prevention.</p>
        <p><b>How to frame it:</b> "I pushed a bad config / dropped a table / caused a memory leak." Detail how you diagnosed it, how quickly you rolled it back, and critically, the <i>post-mortem</i>. What CI/CD check, linter, or alerting did you add to ensure it never happens again?</p>
      </details>

      <details><summary>Theme 4: Mentorship &amp; Leadership</summary>
        <p><i>Example Question:</i> "Tell me about a time you helped a teammate level up."</p>
        <p><b>What they want to see:</b> Patience, knowledge sharing, and raising the team's bar.</p>
        <p><b>How to frame it:</b> A junior engineer was struggling with a concept (e.g., Goroutines leaking memory). You pair-programmed, walked them through the debugger/profiler, and then wrote a wiki page or gave a lightning talk so the whole team benefited.</p>
      </details>

      <details><summary>Theme 5: Dealing with Ambiguity</summary>
        <p><i>Example Question:</i> "Tell me about a time you were given a vague requirement."</p>
        <p><b>What they want to see:</b> Initiative, product sense, and stakeholder alignment.</p>
        <p><b>How to frame it:</b> PM asked for "an SEO tool" or "a reporting dashboard." You didn't just build blindly. You interviewed the end-users, drafted a quick PRD/Mockup, got sign-off, and delivered iteratively.</p>
      </details>

      {/* ────────── QUESTIONS TO ASK THEM ────────── */}
      <h2>Questions to ASK the Interviewer</h2>
      <p>Always have questions prepared. It shows engagement and helps you evaluate if you actually want to work there.</p>
      <ul>
        <li><i>Technical:</i> "What does the architecture of your primary system look like, and what is the biggest scaling bottleneck you are currently facing?"</li>
        <li><i>Process:</i> "How does the team balance shipping new features versus paying down technical debt?"</li>
        <li><i>Culture:</i> "What happens when a production incident occurs? What is the post-mortem process like?"</li>
        <li><i>Onboarding:</i> "What would a successful first 30/60/90 days look like for someone in this role?"</li>
      </ul>
      
      <h2>Red Flags to Avoid</h2>
      <ul>
        <li><b>"We" syndrome:</b> Saying "we built this" makes the interviewer wonder what <i>you</i> actually did. Use "I".</li>
        <li><b>Trash-talking past employers:</b> Never say your last boss was terrible. Say "I'm looking for a culture with stronger engineering alignment."</li>
        <li><b>Fake weaknesses:</b> "I work too hard" or "I'm a perfectionist" are cliché. Give a real, minor weakness and show how you compensate for it (e.g., "I sometimes over-engineer solutions, so now I strictly time-box my architecture research").</li>
      </ul>
    </>
  );
}
