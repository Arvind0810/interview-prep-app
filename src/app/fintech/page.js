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

      {/* ────────── PAYMENT FLOWS ────────── */}
      <h2>7. Payment Processing Flows</h2>
      <p>Understanding how money actually moves between systems is critical.</p>

      <h3>Card Payment Flow</h3>
      <ol>
        <li><b>Customer:</b> Enters card details on checkout page (tokenized by Stripe.js/Razorpay SDK — raw PAN never touches your server).</li>
        <li><b>Payment Gateway:</b> (Stripe, Razorpay) receives the token, routes to the card network.</li>
        <li><b>Card Network:</b> (Visa, Mastercard) routes the authorization request to the issuing bank.</li>
        <li><b>Issuing Bank:</b> Approves or declines based on available balance, fraud checks, 3DS verification.</li>
        <li><b>Authorization:</b> An authorization hold is placed on the customer&apos;s account. Money hasn&apos;t moved yet.</li>
        <li><b>Capture:</b> The merchant captures the payment (immediately or later for hotel-style pre-auths). Now settlement begins.</li>
        <li><b>Settlement:</b> The acquiring bank transfers funds to the merchant&apos;s bank account (T+1 to T+3 days typically).</li>
      </ol>
      <p><b>Key distinction:</b> Authorization ≠ Capture. A pre-auth (like a hotel hold) authorizes $500 but only captures the actual charge of $320 at checkout.</p>

      <h3>UPI (India-specific — Unified Payments Interface)</h3>
      <p>UPI is a real-time payment system developed by NPCI. It&apos;s essentially a wrapper over IMPS that allows instant bank-to-bank transfers using a Virtual Payment Address (VPA) like <code>user@upi</code>.</p>
      <table>
        <thead><tr><th>System</th><th>Speed</th><th>Limit</th><th>Use Case</th></tr></thead>
        <tbody>
          <tr><td><b>UPI</b></td><td>Real-time (seconds)</td><td>₹1 Lakh / txn</td><td>P2P transfers, merchant payments, bill payments</td></tr>
          <tr><td><b>IMPS</b></td><td>Real-time</td><td>₹5 Lakh / txn</td><td>Instant fund transfers (bank-to-bank)</td></tr>
          <tr><td><b>NEFT</b></td><td>Half-hourly batches (now 24/7)</td><td>No limit</td><td>Large business transfers</td></tr>
          <tr><td><b>RTGS</b></td><td>Real-time</td><td>Min ₹2 Lakh</td><td>High-value corporate transfers</td></tr>
        </tbody>
      </table>

      {/* ────────── SUBSCRIPTION BILLING ────────── */}
      <h2>8. Subscription &amp; Recurring Billing</h2>
      <ul>
        <li><b>Trial Periods:</b> Time-limited free access. Must handle conversion to paid, cancellation, and trial extension.</li>
        <li><b>Proration:</b> When a user upgrades mid-cycle (e.g., Basic → Premium), charge only the remaining days difference. This is complex math — most use Stripe/Chargebee for it.</li>
        <li><b>Dunning:</b> When a recurring charge fails (card expired, insufficient funds), the system retries on a schedule (day 1, day 3, day 5) and notifies the user. After N failures, subscription is paused/cancelled.</li>
        <li><b>Grace Period:</b> Time after payment failure where the user retains access while dunning retries.</li>
        <li><b>Invoicing:</b> Legal requirement. Each charge must generate an invoice with tax details (GST in India, VAT in EU).</li>
      </ul>

      {/* ────────── REGULATORY ────────── */}
      <h2>9. Regulatory Awareness</h2>
      <ul>
        <li><b>RBI Guidelines (India):</b> Data localization (all payment data stored in India), tokenization mandates (no card data storage by merchants), cooling-off periods for investments.</li>
        <li><b>GDPR (Europe):</b> Right to erasure, consent management, data portability. Fines up to 4% of global revenue.</li>
        <li><b>SOC 2:</b> An audit standard for service organizations. Type I = controls design at a point in time. Type II = controls effectiveness over 6-12 months. Most B2B fintech companies need this.</li>
        <li><b>Open Banking:</b> Banks expose APIs (PSD2 in Europe, Account Aggregator in India) allowing third parties to access account data with user consent. Enables apps like 1Finance to aggregate financial data.</li>
      </ul>

      {/* ────────── ARCHITECTURE DECISIONS ────────── */}
      <h2>10. Fintech Architecture Principles</h2>
      <ul>
        <li><b>Eventual consistency is acceptable for reads, but NEVER for money:</b> The user&apos;s dashboard balance can be eventually consistent. The ledger MUST be strongly consistent.</li>
        <li><b>Exactly-once delivery is a myth in distributed systems:</b> Design for at-least-once delivery + idempotency. Kafka consumers must handle duplicate messages.</li>
        <li><b>Shadow/Dry-run mode:</b> Before going live, run new financial logic in parallel with old logic. Compare outputs. Only switch once they match for 99.99% of cases.</li>
        <li><b>Retry with dead-letter queues:</b> Failed payment webhooks go to a DLQ for manual investigation. Never silently drop financial events.</li>
        <li><b>Immutable audit trail:</b> Append-only tables for all state changes. Never UPDATE or DELETE financial records. Use reversal transactions instead.</li>
      </ul>

      <h2>Interview Quick Reference</h2>
      <table>
        <thead><tr><th>Topic</th><th>Key Points to Mention</th></tr></thead>
        <tbody>
          <tr><td>Money Math</td><td>Never use floats. Store as integer cents/paise. Big decimal for precision. Banker&apos;s rounding.</td></tr>
          <tr><td>Idempotency</td><td>Client generates UUID. Server checks before processing. Prevents double charges.</td></tr>
          <tr><td>Ledger</td><td>Double-entry: every transaction has balanced debit + credit. Immutable (append-only). Reversal transactions, not UPDATEs.</td></tr>
          <tr><td>Security</td><td>PCI-DSS (use tokenization to avoid). KYC/AML. PII encryption (AES-256). Masked logs.</td></tr>
          <tr><td>Webhooks</td><td>HMAC signature verification. Replay protection (timestamp). Async processing (return 200 immediately).</td></tr>
          <tr><td>Payments</td><td>Authorization vs Capture. Settlement (T+1 to T+3). UPI real-time. NEFT batched. Dunning for failed recurring.</td></tr>
        </tbody>
      </table>
    </>
  );
}
