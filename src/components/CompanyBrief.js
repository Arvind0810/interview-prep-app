import Link from "next/link";
import { Pill } from "@/components/Card";
import { companyBySlug, FIT_LABEL } from "@/data/companies";

// Uniform recruiter brief rendered at the top of every company page.
export default function CompanyBrief({ slug }) {
  const c = companyBySlug(slug);
  if (!c) return null;
  const fit = FIT_LABEL[c.fit];

  return (
    <section className="bg-panel border border-accent/40 rounded-xl p-5 my-4">
      <div className="flex flex-wrap items-center gap-2 mb-1">
        <span className="text-[11px] uppercase tracking-wider text-slate-400">Recruiter brief</span>
        <Pill color={fit.color}>{fit.text}</Pill>
      </div>
      <div className="text-lg font-semibold text-fg">{c.company} — {c.role}</div>
      <div className="text-sm text-slate-400 mb-3">{c.meta}</div>

      <p className="text-emerald-300"><b>Your angle:</b> {c.pitch}</p>

      <div className="grid gap-4 md:grid-cols-3 mt-3">
        <div>
          <h4 className="mt-0">Top risks</h4>
          <ul>{c.risks.map((r) => <li key={r}>{r}</li>)}</ul>
        </div>
        <div>
          <h4 className="mt-0">Screen questions to expect</h4>
          <ul>{c.screenQs.map((q) => <li key={q}>{q}</li>)}</ul>
        </div>
        <div>
          <h4 className="mt-0">Ask them</h4>
          <ul>{c.askThem.map((q) => <li key={q}>{q}</li>)}</ul>
        </div>
      </div>

      <div className="flex flex-wrap gap-4 text-sm mt-3">
        <Link href="/recruiter-screen">Recruiter screen prep →</Link>
        <Link href="/behavioral">Pick your stories →</Link>
        <Link href={`/pipeline?company=${encodeURIComponent(c.company)}`}>Track in pipeline →</Link>
      </div>
    </section>
  );
}
