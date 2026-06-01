export const metadata = { title: "Fintech Domain — Interview Prep" };

export default function FintechPage() {
  return (
    <>
      <h1>Fintech Domain Knowledge</h1>
      <p>You&apos;ve worked in fintech for 2.5+ years. Interviewers (especially at fintechs) will probe domain understanding even for engineering roles.</p>

      <h2>Core Concepts</h2>
      <h3>Money in Code</h3>
      <ul>
        <li><b>Never use floats</b> for money — floating point can&apos;t represent 0.1 exactly. Use integer paise/cents, or a Decimal/BigDecimal library.</li>
        <li>In Go: <code>shopspring/decimal</code>. In Postgres: <code>NUMERIC(18,2)</code>. In Node: <code>decimal.js</code> or BigInt for paise.</li>
        <li>Store currency code alongside amount</li>
        <li>Always log every monetary mutation with before/after values</li>
      </ul>

      <h3>Ledger / Double-Entry Accounting</h3>
      <p>Every transaction is two entries: a debit on one account and a credit on another. Sums always balance. Immutable append-only — corrections are reversing entries, never updates.</p>
      <pre><code>{`-- Transfer ₹100 from Alice to Bob
INSERT INTO ledger (txn_id, account, debit, credit) VALUES
  ('t1', 'alice', 10000, 0),    -- amounts in paise
  ('t1', 'bob',       0, 10000);
-- Balance is SUM(credit) - SUM(debit) per account`}</code></pre>

      <h3>Idempotency in Payments</h3>
      <p>Critical. Client sends an <code>Idempotency-Key</code> header. Server stores the first response keyed by this ID; subsequent same-key requests return cached response. Prevents double-charging on retries.</p>

      <h3>Compliance &amp; Security</h3>
      <ul>
        <li><b>PCI-DSS</b> — if you touch card numbers. Most fintechs use a vault (Stripe, payment gateway providers) so they&apos;re &quot;out of scope&quot;.</li>
        <li><b>KYC / AML</b> — Know Your Customer / Anti-Money Laundering checks before onboarding</li>
        <li><b>RBI guidelines</b> (India) — data localization, audit trails, customer consent</li>
        <li><b>PII handling</b> — encrypt at rest, mask in logs, role-based access</li>
        <li><b>SOC 2 / ISO 27001</b> — common audits</li>
      </ul>

      <h3>Webhooks Security</h3>
      <ul>
        <li>Always verify HMAC signature on incoming webhooks</li>
        <li>Replay protection via timestamp + nonce</li>
        <li>Process idempotently — providers retry</li>
        <li>Acknowledge fast (200 OK), process async</li>
      </ul>

      <h2>Common Fintech Architectures</h2>
      <ul>
        <li><b>Wallet system</b> — ledger, freeze/unfreeze balances, transactional</li>
        <li><b>Payment gateway integration</b> — webhook handling, retry, reconciliation</li>
        <li><b>Loan calculation engine</b> — EMI formulas, amortization schedules, what-if scenarios</li>
        <li><b>Scoring engine</b> — your work! Rules-based or ML-based credit/personalization scoring</li>
        <li><b>Recon engine</b> — match bank statements to internal ledger nightly</li>
      </ul>

      <h2>EMI Formula (good to know cold)</h2>
      <p>EMI = P × r × (1+r)<sup>n</sup> / ((1+r)<sup>n</sup> − 1), where P=principal, r=monthly rate (annual/12/100), n=months.</p>

      <h2>What 1Finance Does (refresh)</h2>
      <p>1Finance is a personal finance qualified advisory firm — they provide independent financial planning, scoring, and education. Your work on the 1Finance website platform powers their advisory platform: events, testimonials, financial planning calculator (FPC) management, personalization, and notifications.</p>
    </>
  );
}
