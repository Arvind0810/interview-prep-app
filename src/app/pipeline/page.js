"use client";
import { useEffect, useState } from "react";
import { COMPANIES } from "@/data/companies";
import { KEYS, usePersistentState } from "@/lib/storage";

const STAGES = [
  "Applied",
  "Recruiter screen",
  "Technical 1",
  "Technical 2",
  "System design",
  "Hiring manager",
  "HR / offer discussion",
  "Offer",
  "Rejected",
  "Withdrawn",
];
const CLOSED_STAGES = new Set(["Rejected", "Withdrawn"]);

const EMPTY = { company: "", role: "", stage: STAGES[0], nextDate: "", interviewer: "", followUp: "", notes: "" };

const newId = () =>
  typeof crypto !== "undefined" && crypto.randomUUID ? crypto.randomUUID() : String(Date.now());

const today = () => new Date().toISOString().slice(0, 10);

function Field({ label, children }) {
  return (
    <label className="text-sm block">
      <div className="text-slate-400 mb-1">{label}</div>
      {children}
    </label>
  );
}

const inputCls = "w-full px-3 py-2 bg-panel2 border border-border rounded-md text-slate-200";

function EntryForm({ initial, onSave, onCancel }) {
  const [form, setForm] = useState(initial);
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));
  const canSave = form.company.trim().length > 0;

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (canSave) onSave({ ...form, company: form.company.trim() });
      }}
      className="bg-panel border border-accent/40 rounded-xl p-5 my-4 grid gap-3 md:grid-cols-2"
    >
      <Field label="Company *">
        <input className={inputCls} value={form.company} onChange={set("company")} list="known-companies" required />
        <datalist id="known-companies">
          {COMPANIES.map((c) => <option key={c.slug} value={c.company} />)}
        </datalist>
      </Field>
      <Field label="Role"><input className={inputCls} value={form.role} onChange={set("role")} /></Field>
      <Field label="Stage">
        <select className={inputCls} value={form.stage} onChange={set("stage")}>
          {STAGES.map((s) => <option key={s}>{s}</option>)}
        </select>
      </Field>
      <Field label="Next round date"><input type="date" className={inputCls} value={form.nextDate} onChange={set("nextDate")} /></Field>
      <Field label="Interviewer / recruiter"><input className={inputCls} value={form.interviewer} onChange={set("interviewer")} /></Field>
      <Field label="Follow up by"><input type="date" className={inputCls} value={form.followUp} onChange={set("followUp")} /></Field>
      <div className="md:col-span-2">
        <Field label="Notes (questions asked, band quoted, red flags)">
          <textarea rows={3} className={inputCls} value={form.notes} onChange={set("notes")} />
        </Field>
      </div>
      <div className="md:col-span-2 flex gap-3">
        <button type="submit" disabled={!canSave} className="px-5 py-2 rounded-md bg-gradient-to-r from-cyan-700 to-violet-700 text-white font-semibold disabled:opacity-40">Save</button>
        <button type="button" onClick={onCancel} className="px-5 py-2 rounded-md bg-panel border border-border text-fg hover:border-accent/60">Cancel</button>
      </div>
    </form>
  );
}

function EntryRow({ entry, onEdit, onDelete }) {
  const now = today();
  const followUpDue = entry.followUp && entry.followUp <= now && !CLOSED_STAGES.has(entry.stage);
  const closed = CLOSED_STAGES.has(entry.stage);
  return (
    <div className={`bg-panel border rounded-xl p-4 my-3 ${followUpDue ? "border-warn" : "border-border"} ${closed ? "opacity-60" : ""}`}>
      <div className="flex flex-wrap justify-between gap-2">
        <div>
          <div className="font-semibold text-fg">{entry.company}{entry.role ? ` — ${entry.role}` : ""}</div>
          <div className="text-sm text-accent">{entry.stage}</div>
        </div>
        <div className="flex gap-3 text-sm">
          <button onClick={onEdit} className="text-accent hover:underline">Edit</button>
          <button onClick={onDelete} className="text-bad hover:underline">Delete</button>
        </div>
      </div>
      <div className="text-sm text-slate-300 mt-2 grid gap-1 md:grid-cols-3">
        {entry.nextDate && <div>Next round: <b>{entry.nextDate}</b></div>}
        {entry.interviewer && <div>With: {entry.interviewer}</div>}
        {entry.followUp && <div className={followUpDue ? "text-warn font-semibold" : ""}>Follow up: {entry.followUp}{followUpDue ? " (due)" : ""}</div>}
      </div>
      {entry.notes && <p className="text-sm text-slate-400 mt-2 mb-0 whitespace-pre-wrap">{entry.notes}</p>}
    </div>
  );
}

const sortKey = (e) => (CLOSED_STAGES.has(e.stage) ? "9" : "0") + (e.nextDate || "9999");

export default function PipelinePage() {
  const [entries, setEntries, loaded] = usePersistentState(KEYS.pipeline, []);
  const [editing, setEditing] = useState(null);

  // /pipeline?company=X (from a company brief) opens the form prefilled, or the existing row.
  useEffect(() => {
    if (!loaded) return;
    const company = new URLSearchParams(window.location.search).get("company");
    if (!company) return;
    const existing = entries.find((e) => e.company === company);
    setEditing(existing || { ...EMPTY, id: null, company });
    window.history.replaceState(null, "", "/pipeline");
    // Run once after storage loads; entries deliberately omitted.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loaded]);

  const save = (form) => {
    const stamped = { ...form, updated: new Date().toISOString() };
    setEntries((prev) =>
      form.id ? prev.map((e) => (e.id === form.id ? stamped : e)) : [...prev, { ...stamped, id: newId() }]
    );
    setEditing(null);
  };

  const remove = (entry) => {
    if (window.confirm(`Delete ${entry.company} from your pipeline?`)) {
      setEntries((prev) => prev.filter((e) => e.id !== entry.id));
    }
  };

  const active = entries.filter((e) => !CLOSED_STAGES.has(e.stage));
  const due = active.filter((e) => e.followUp && e.followUp <= today());
  const sorted = [...entries].sort((a, b) => sortKey(a).localeCompare(sortKey(b)));

  return (
    <>
      <h1>Pipeline</h1>
      <p>
        Recruiters manage dozens of candidates, and you should manage your processes the same way.
        Keep every process here so timelines line up: you want offers to arrive close together,
        not weeks apart. Saved in this browser only.
      </p>

      <div className="grid grid-cols-3 gap-4 my-4">
        <div className="bg-panel border border-border rounded-xl p-4 text-center"><div className="text-2xl font-bold text-accent">{active.length}</div><div className="text-[11px] text-slate-400 uppercase tracking-wider mt-1">Active</div></div>
        <div className="bg-panel border border-border rounded-xl p-4 text-center"><div className="text-2xl font-bold text-good">{entries.filter((e) => e.stage === "Offer").length}</div><div className="text-[11px] text-slate-400 uppercase tracking-wider mt-1">Offers</div></div>
        <div className="bg-panel border border-border rounded-xl p-4 text-center"><div className={`text-2xl font-bold ${due.length ? "text-warn" : "text-slate-400"}`}>{due.length}</div><div className="text-[11px] text-slate-400 uppercase tracking-wider mt-1">Follow-ups due</div></div>
      </div>

      {editing ? (
        <EntryForm key={editing.id || "new"} initial={editing} onSave={save} onCancel={() => setEditing(null)} />
      ) : (
        <button onClick={() => setEditing({ ...EMPTY, id: null })} className="px-5 py-2 rounded-md bg-gradient-to-r from-cyan-700 to-violet-700 text-white font-semibold">
          + Add a process
        </button>
      )}

      {loaded && entries.length === 0 && !editing && (
        <p className="text-slate-400 mt-4">No processes yet. Add the first one, or open a company page and use &quot;Track in pipeline&quot;.</p>
      )}

      {sorted.map((e) => (
        <EntryRow key={e.id} entry={e} onEdit={() => setEditing(e)} onDelete={() => remove(e)} />
      ))}

      <h2>Follow-up rules of thumb</h2>
      <ul>
        <li>No reply 3 working days after a round: one short note to the recruiter.</li>
        <li>An offer from A while B is mid-loop: tell B&apos;s recruiter the same day and ask whether they can speed up.</li>
        <li>Log the band they quote and the questions they asked in Notes. The next company will ask you something similar.</li>
      </ul>
    </>
  );
}
