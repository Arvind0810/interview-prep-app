import Link from "next/link";

// Shared UI primitives. Server-safe (no hooks) so content pages can use them too.

const cx = (...parts) => parts.filter(Boolean).join(" ");

const BUTTON_VARIANTS = {
  primary: "bg-gradient-to-r from-cyan-600 to-violet-600 text-white shadow-card hover:brightness-110",
  secondary: "bg-panel border border-border text-fg hover:border-accent/60",
  ghost: "text-muted hover:text-fg hover:bg-panel2",
  danger: "text-bad border border-bad/40 hover:bg-bad/10",
  good: "bg-good/15 text-good border border-good/40 hover:bg-good/25",
};
const BUTTON_SIZES = {
  sm: "h-8 px-3 text-sm gap-1.5",
  md: "h-10 px-4 text-sm gap-2",
  lg: "h-12 px-6 text-base gap-2",
};

export function buttonClass({ variant = "primary", size = "md", className = "" } = {}) {
  return cx(
    "inline-flex items-center justify-center rounded-lg font-semibold transition-all no-underline hover:no-underline",
    "disabled:opacity-40 disabled:pointer-events-none select-none",
    BUTTON_VARIANTS[variant],
    BUTTON_SIZES[size],
    className
  );
}

export function Button({ variant, size, className, href, children, ...props }) {
  const cls = buttonClass({ variant, size, className });
  if (href) return <Link href={href} className={cls} {...props}>{children}</Link>;
  return <button type="button" className={cls} {...props}>{children}</button>;
}

const BADGE_TONES = {
  neutral: "bg-panel2 text-muted border-border",
  accent: "bg-accent/10 text-accent border-accent/30",
  violet: "bg-accent2/10 text-accent2 border-accent2/30",
  good: "bg-good/10 text-good border-good/30",
  warn: "bg-warn/10 text-warn border-warn/30",
  bad: "bg-bad/10 text-bad border-bad/30",
};

export function Badge({ tone = "neutral", className = "", children }) {
  return (
    <span className={cx("inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[11px] font-semibold whitespace-nowrap", BADGE_TONES[tone], className)}>
      {children}
    </span>
  );
}

export function ProgressBar({ value, tone = "accent", className = "" }) {
  const pct = Math.max(0, Math.min(1, value || 0)) * 100;
  const fill = { accent: "bg-gradient-to-r from-cyan-500 to-violet-500", good: "bg-good", warn: "bg-warn", bad: "bg-bad" }[tone];
  return (
    <div className={cx("h-1.5 w-full rounded-full bg-border/70 overflow-hidden", className)} role="progressbar" aria-valuenow={Math.round(pct)} aria-valuemin={0} aria-valuemax={100}>
      <div className={cx("h-full rounded-full transition-all duration-500", fill)} style={{ width: `${pct}%` }} />
    </div>
  );
}

export function ProgressRing({ value, size = 48, stroke = 5, label, className = "" }) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const v = Math.max(0, Math.min(1, value || 0));
  return (
    <div className={cx("relative inline-flex items-center justify-center shrink-0", className)} style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90" aria-hidden="true">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" strokeWidth={stroke} className="stroke-border" />
        <circle
          cx={size / 2} cy={size / 2} r={r} fill="none" strokeWidth={stroke} strokeLinecap="round"
          className="stroke-accent transition-all duration-500"
          strokeDasharray={c} strokeDashoffset={c * (1 - v)}
        />
      </svg>
      <span className="absolute text-[11px] font-bold text-fg tabular-nums">{label ?? `${Math.round(v * 100)}%`}</span>
    </div>
  );
}

export function StatTile({ icon: Icon, value, label, tone = "accent" }) {
  const color = { accent: "text-accent bg-accent/10", violet: "text-accent2 bg-accent2/10", good: "text-good bg-good/10", warn: "text-warn bg-warn/10" }[tone];
  return (
    <div className="flex items-center gap-3 rounded-xl border border-border bg-panel p-4 shadow-card">
      {Icon && <span className={cx("grid h-10 w-10 place-items-center rounded-lg", color)}><Icon size={20} /></span>}
      <div className="min-w-0">
        <div className="text-xl font-bold text-fg tabular-nums leading-tight">{value}</div>
        <div className="text-xs leading-snug text-muted">{label}</div>
      </div>
    </div>
  );
}

export function Panel({ className = "", children, ...props }) {
  return (
    <section className={cx("rounded-2xl border border-border bg-panel p-5 shadow-card [&>:first-child]:mt-0 [&>:last-child]:mb-0", className)} {...props}>
      {children}
    </section>
  );
}

export function PanelTitle({ icon: Icon, children, action }) {
  return (
    <div className="mb-3 flex items-center justify-between gap-3">
      <div className="flex items-center gap-2 font-semibold text-fg">
        {Icon && <Icon size={18} className="text-accent" />}
        {children}
      </div>
      {action}
    </div>
  );
}

export function PageHeader({ eyebrow, title, description, actions }) {
  return (
    <header className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div className="min-w-0">
        {eyebrow && <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-accent">{eyebrow}</div>}
        <h1 className="!m-0">{title}</h1>
        {description && <p className="!mb-0 !mt-2 max-w-3xl text-muted">{description}</p>}
      </div>
      {actions && <div className="flex shrink-0 flex-wrap gap-2">{actions}</div>}
    </header>
  );
}

export function Tabs({ tabs, value, onChange }) {
  return (
    <div className="inline-flex rounded-xl border border-border bg-panel2 p-1" role="tablist">
      {tabs.map(({ id, label, icon: Icon }) => (
        <button
          key={id}
          type="button"
          role="tab"
          aria-selected={value === id}
          onClick={() => onChange(id)}
          className={cx(
            "inline-flex items-center gap-2 rounded-lg px-4 py-1.5 text-sm font-semibold transition-colors",
            value === id ? "bg-panel text-fg shadow-card" : "text-muted hover:text-fg"
          )}
        >
          {Icon && <Icon size={16} />}
          {label}
        </button>
      ))}
    </div>
  );
}

export function Chip({ active, onClick, children, className = "" }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cx(
        "shrink-0 rounded-full border px-3 py-1 text-xs font-semibold transition-colors",
        active ? "border-accent bg-accent/15 text-accent" : "border-border bg-panel text-muted hover:text-fg",
        className
      )}
    >
      {children}
    </button>
  );
}

export function EmptyState({ icon: Icon, title, children }) {
  return (
    <div className="rounded-2xl border border-dashed border-border p-8 text-center">
      {Icon && <Icon size={28} className="mx-auto mb-2 text-subtle" />}
      <div className="font-semibold text-fg">{title}</div>
      {children && <div className="mt-1 text-sm text-muted">{children}</div>}
    </div>
  );
}

export const inputClass =
  "w-full h-10 px-3 rounded-lg bg-panel2 border border-border text-fg placeholder:text-subtle focus:outline-none focus:border-accent";
