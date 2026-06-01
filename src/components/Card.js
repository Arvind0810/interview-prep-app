export function Card({ children, className = "" }) {
  return (
    <div className={`bg-panel border border-border rounded-xl p-5 my-4 ${className}`}>
      {children}
    </div>
  );
}

export function Stat({ value, label }) {
  return (
    <div className="bg-panel border border-border rounded-xl p-4 text-center">
      <div className="text-2xl font-bold text-accent">{value}</div>
      <div className="text-[11px] text-slate-400 uppercase tracking-wider mt-1">{label}</div>
    </div>
  );
}

export function Pill({ children, color = "cyan" }) {
  const colors = {
    cyan: "bg-cyan-700",
    purple: "bg-violet-700",
    green: "bg-emerald-700",
    amber: "bg-amber-700",
    red: "bg-red-700",
  };
  return (
    <span className={`inline-block px-2 py-0.5 rounded-full text-[11px] text-white mr-1 ${colors[color]}`}>
      {children}
    </span>
  );
}
