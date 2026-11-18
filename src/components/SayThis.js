// A recruiter question with a strong answer, a weak one, and why.
export default function SayThis({ q, say, avoid, why }) {
  return (
    <details>
      <summary>{q}</summary>
      <div className="grid gap-3 md:grid-cols-2 mt-3">
        <div className="border border-emerald-700 rounded-lg p-3 bg-emerald-950/30">
          <div className="text-[11px] uppercase tracking-wider text-emerald-400 mb-1">Say this</div>
          <p className="m-0">{say}</p>
        </div>
        <div className="border border-red-800 rounded-lg p-3 bg-red-950/30">
          <div className="text-[11px] uppercase tracking-wider text-red-400 mb-1">Not this</div>
          <p className="m-0">{avoid}</p>
        </div>
      </div>
      {why && <p className="text-sm text-slate-400 mt-3 mb-0"><b>Why:</b> {why}</p>}
    </details>
  );
}
