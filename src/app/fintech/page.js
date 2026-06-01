export const metadata = { title: "Fintech Domain — Interview Prep" };

export default function FintechPage() {
  return (
    <>
      <h1>Fintech Domain Knowledge</h1>
      <p>If you're interviewing for Stripe, Plaid, Square, or any neo-bank, domain knowledge gives you a massive edge. Engineering in fintech requires paranoia about accuracy, idempotency, and security.</p>

      {/* ────────── ACCURACY ────────── */}
      <h2>1. Money Representation &amp; Math</h2>
      <p><b>NEVER use floating-point numbers (float32/float64) for money.</b> Floating point math is imprecise (e.g., <code>0.1 + 0.2 = 0.30000000000000004</code>). If you truncate that over millions of transactions, you lose real money.</p>
      <ul>
        <li><b>Integer Cents/Paise:</b> The most common approach. Store $10.50 as <code>1050</code> (integer). Only format it with a decimal on the frontend.</li>
        <li><b>Big Decimal Libraries:</b> If you need to calculate complex interest rates with 8 decimal places of precision, use arbitrary-precision decimal libraries (e.g., <code>shopspring/decimal</code> in Go, <code>BigDecimal</code> in Java).</li>
        <li><b>Banker's Rounding:</b> "Round half to even". Standard rounding (round .5 up) creates a positive bias over large datasets. Banker's rounding rounds 2.5 to 2, and 3.5 to 4.</li>
      </ul>

      {/* ────────── IDEMPOTENCY ────────── */}
      <h2>2. Idempotency (Critical)</h2>
      <p>Network calls fail. If a client sends a "Charge $100" request and the connection drops before the server replies, the client will retry. Without idempotency, the user gets charged $200.</p>
      <ul>
        <li>Client generates a unique UUID (<code>Idempotency-Key</code>) and includes it in the HTTP header.</li>
        <li>Server checks if it has seen this key in its database.</li>
        <li>If NO: Process the payment, save the result tied to the key, return 200.</li>
        <li>If YES: Do not process the payment. Fetch the saved result for that key and return 200.</li>
      </ul>

      {/* ────────── LEDGER ────────── */}
      <h2>3. Double-Entry Accounting (The Ledger)</h2>
      <p>Money is never "created" or "destroyed", it only moves. Every transaction requires at least two ledger entries: a Debit (Dr) and a Credit (Cr) that must balance to zero.</p>
      <pre><code>{`-- Moving $50 from Alice to Bob
BEGIN;
INSERT INTO ledger (tx_id, account, type, amount) VALUES ('tx1', 'Alice', 'DEBIT', 5000);
INSERT INTO ledger (tx_id, account, type, amount) VALUES ('tx1', 'Bob', 'CREDIT', 5000);
COMMIT;`}</code></pre>
      <p><b>Immutability:</b> You NEVER <code>UPDATE</code> a ledger row. If a mistake was made, you insert a <i>reversing transaction</i> to undo it. This creates a perfect audit trail.</p>

      {/* ────────── COMPLIANCE ────────── */}
      <h2>4. Compliance &amp; Security</h2>
      <ul>
        <li><b>PCI-DSS:</b> Standard for handling credit cards. It is extremely rigorous. Most startups avoid it entirely by using "Tokens" from Stripe/Braintree. The raw PAN (Primary Account Number) never touches their servers.</li>
        <li><b>KYC / AML:</b> Know Your Customer / Anti-Money Laundering. Regulations requiring you to verify identity (ID scans, SSN/PAN checks) before allowing money movement to prevent funding terrorism or crime.</li>
        <li><b>PII (Personally Identifiable Information):</b> SSNs, birth dates. Must be encrypted at rest (AES-256). Should be masked in application logs (e.g., <code>***-**-1234</code>).</li>
        <li><b>Audit Logs:</b> Every action an admin takes (e.g. refunding a user) must be logged immutably to a separate system.</li>
      </ul>

      {/* ────────── WEBHOOKS ────────── */}
      <h2>5. Webhook Security</h2>
      <p>When a payment gateway (like Stripe) notifies you asynchronously that a payment succeeded, you must secure the webhook endpoint:</p>
      <ol>
        <li><b>HMAC Signatures:</b> The provider signs the payload with a shared secret. You must verify the signature to prove the request actually came from them, not a hacker.</li>
        <li><b>Replay Attacks:</b> Providers include a timestamp in the header. Reject webhooks older than 5 minutes.</li>
        <li><b>Async Processing:</b> Acknowledge the webhook immediately (return 200 OK), then process the business logic in a background queue. If you block, the provider might time out and retry.</li>
      </ol>

      {/* ────────── COMMON ARCHITECTURES ────────── */}
      <h2>6. Common Fintech Systems</h2>
      <ul>
        <li><b>Reconciliation Engine (Recon):</b> Internal ledger says we have $1M. Bank statement says we have $990k. The recon engine runs nightly, matching internal DB records against flat files (CSV/SFTP) provided by the bank to find the missing $10k.</li>
        <li><b>Fraud / Risk Engine:</b> Evaluates incoming transactions against ML models or rulesets (e.g., Velocity checks: "Has this user made 10 transactions in 1 minute?"). Must execute in &lt;100ms.</li>
        <li><b>Lending / EMI:</b> Handling amortization schedules, grace periods, late fees, and compounding interest.</li>
      </ul>
    </>
  );
}
