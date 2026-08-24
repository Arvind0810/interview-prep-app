"use client";
import { useState } from "react";
import useMermaidSvg from "./useMermaidSvg";
import DiagramZoom from "./DiagramZoom";

// A diagram entry carries either `chart` (mermaid source) or `svg` (hand-authored
// markup, for shapes mermaid cannot draw — Venns, rings, memory layouts, charts).
export default function Diagram({ entry }) {
  const { svg: rendered, failed } = useMermaidSvg(entry?.chart);
  const [zoomed, setZoomed] = useState(false);

  if (!entry) return null;
  const markup = entry.svg || rendered;

  if (failed) {
    return (
      <pre className="text-slate-400">
        <code>{entry.chart}</code>
      </pre>
    );
  }

  if (!markup) {
    return (
      <figure className="diagram-figure my-3 flex min-h-[160px] items-center justify-center rounded-lg border border-border bg-[#0b1220] p-3">
        <p className="m-0 animate-pulse text-xs text-slate-500">Rendering diagram…</p>
      </figure>
    );
  }

  const open = () => setZoomed(true);
  const onKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      open();
    }
  };

  return (
    <>
      <figure className="diagram-figure group relative my-3 rounded-lg border border-border bg-[#0b1220] p-3 transition-colors hover:border-slate-500">
        <div
          role="button"
          tabIndex={0}
          onClick={open}
          onKeyDown={onKeyDown}
          aria-label={entry.caption ? `Enlarge diagram: ${entry.caption}` : "Enlarge diagram"}
          className="cursor-zoom-in overflow-x-auto rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          {/* Static markup — hand-authored, or produced by mermaid from our own
              source with securityLevel "strict". No user input reaches it. */}
          <div className="[&_svg]:mx-auto [&_svg]:h-auto [&_svg]:max-w-full" dangerouslySetInnerHTML={{ __html: markup }} />
        </div>
        <span
          aria-hidden="true"
          className="pointer-events-none absolute right-4 top-4 rounded border border-border bg-panel/90 px-2 py-0.5 text-[10px] text-slate-400 opacity-0 transition-opacity group-hover:opacity-100"
        >
          ⤢ zoom
        </span>
        {entry.caption && (
          <figcaption className="mt-2 text-center text-[11px] leading-relaxed text-slate-400">{entry.caption}</figcaption>
        )}
      </figure>
      {zoomed && <DiagramZoom markup={markup} caption={entry.caption} onClose={() => setZoomed(false)} />}
    </>
  );
}
