"use client";
import { KEYS, usePersistentState } from "@/lib/storage";

// A persisted checklist. `id` namespaces the storage key so the dashboard can read progress.
export default function PrepChecklist({ id, title, items }) {
  const [checked, setChecked] = usePersistentState(KEYS.checklistPrefix + id, []);
  const done = items.filter((it) => checked.includes(it)).length;

  const toggle = (item) =>
    setChecked((prev) => (prev.includes(item) ? prev.filter((x) => x !== item) : [...prev, item]));

  return (
    <div className="bg-panel border border-border rounded-xl p-5 my-4">
      <div className="flex justify-between items-baseline gap-3">
        <h3 className="m-0">{title}</h3>
        <span className="text-sm text-slate-400 shrink-0">{done}/{items.length}</span>
      </div>
      <div className="h-1.5 bg-slate-700 rounded mt-2 mb-3 overflow-hidden">
        <div className="h-full bg-good transition-all" style={{ width: `${(done / items.length) * 100}%` }} />
      </div>
      {items.map((item) => (
        <label key={item} className="flex gap-3 items-start py-1.5 cursor-pointer text-[15px]">
          <input
            type="checkbox"
            className="mt-1 accent-cyan-400 shrink-0"
            checked={checked.includes(item)}
            onChange={() => toggle(item)}
          />
          <span className={checked.includes(item) ? "text-slate-400 line-through" : ""}>{item}</span>
        </label>
      ))}
    </div>
  );
}

// Fraction (0..1) of a checklist completed — used by the dashboard.
export function checklistProgress(stored, items) {
  if (!items.length) return 0;
  return items.filter((it) => (stored || []).includes(it)).length / items.length;
}
