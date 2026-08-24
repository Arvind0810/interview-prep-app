"use client";
import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";

const MIN_SCALE = 0.4;
const MAX_SCALE = 8;
const STEP = 1.25;

const clamp = (value) => Math.min(MAX_SCALE, Math.max(MIN_SCALE, value));

// The page keeps its own copy of this markup mounted, so injecting it verbatim
// would duplicate every id. Renaming them is not enough on its own: mermaid
// embeds a <style> block scoped by the SVG's own id (#mermaid-3 .nodeLabel),
// so every "#id" reference has to move too — in url(), in href, and in CSS —
// or the copy renders unstyled and its labels clip.
const SUFFIX = "-zoomed";
const scopeIds = (markup) => {
  const ids = [...markup.matchAll(/id="([^"]+)"/g)].map((m) => m[1]);
  return ids.reduce((out, id) => {
    const escaped = id.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    return out
      .replace(new RegExp(`id="${escaped}"`, "g"), `id="${id}${SUFFIX}"`)
      .replace(new RegExp(`#${escaped}(?![\\w-])`, "g"), `#${id}${SUFFIX}`);
  }, markup);
};

export default function DiagramZoom({ markup, caption, onClose }) {
  const [view, setView] = useState({ scale: 1, x: 0, y: 0 });
  const scopedMarkup = useMemo(() => scopeIds(markup), [markup]);
  const stageRef = useRef(null);
  const closeRef = useRef(null);
  const dragRef = useRef(null);
  const pointersRef = useRef(new Map());
  const pinchRef = useRef(null);

  // Zoom about a point so the content under the cursor stays under the cursor.
  const zoomAt = useCallback((factor, clientX, clientY) => {
    const stage = stageRef.current;
    if (!stage) return;
    const rect = stage.getBoundingClientRect();
    const px = clientX - rect.left - rect.width / 2;
    const py = clientY - rect.top - rect.height / 2;
    setView((v) => {
      const next = clamp(v.scale * factor);
      const ratio = next / v.scale;
      return { scale: next, x: px - (px - v.x) * ratio, y: py - (py - v.y) * ratio };
    });
  }, []);

  const zoomCentre = useCallback((factor) => {
    const stage = stageRef.current;
    if (!stage) return;
    const rect = stage.getBoundingClientRect();
    zoomAt(factor, rect.left + rect.width / 2, rect.top + rect.height / 2);
  }, [zoomAt]);

  const reset = useCallback(() => setView({ scale: 1, x: 0, y: 0 }), []);

  // Lock background scrolling, and restore focus to whatever opened us.
  useLayoutEffect(() => {
    const opener = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = previousOverflow;
      if (opener instanceof HTMLElement) opener.focus();
    };
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") { e.preventDefault(); onClose(); }
      else if (e.key === "+" || e.key === "=") { e.preventDefault(); zoomCentre(STEP); }
      else if (e.key === "-" || e.key === "_") { e.preventDefault(); zoomCentre(1 / STEP); }
      else if (e.key === "0") { e.preventDefault(); reset(); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, zoomCentre, reset]);

  // Wheel must be a non-passive listener to be cancellable, which React's
  // onWheel prop cannot guarantee.
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return undefined;
    const onWheel = (e) => {
      e.preventDefault();
      zoomAt(e.deltaY < 0 ? STEP : 1 / STEP, e.clientX, e.clientY);
    };
    stage.addEventListener("wheel", onWheel, { passive: false });
    return () => stage.removeEventListener("wheel", onWheel);
  }, [zoomAt]);

  const onPointerDown = (e) => {
    pointersRef.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    e.currentTarget.setPointerCapture(e.pointerId);
    if (pointersRef.current.size === 1) {
      dragRef.current = { x: e.clientX, y: e.clientY, ox: view.x, oy: view.y };
    } else if (pointersRef.current.size === 2) {
      dragRef.current = null;
      const [a, b] = [...pointersRef.current.values()];
      pinchRef.current = Math.hypot(a.x - b.x, a.y - b.y);
    }
  };

  const onPointerMove = (e) => {
    if (!pointersRef.current.has(e.pointerId)) return;
    pointersRef.current.set(e.pointerId, { x: e.clientX, y: e.clientY });

    if (pointersRef.current.size === 2 && pinchRef.current) {
      const [a, b] = [...pointersRef.current.values()];
      const distance = Math.hypot(a.x - b.x, a.y - b.y);
      if (distance > 0) {
        zoomAt(distance / pinchRef.current, (a.x + b.x) / 2, (a.y + b.y) / 2);
        pinchRef.current = distance;
      }
      return;
    }
    const drag = dragRef.current;
    if (!drag) return;
    setView((v) => ({ ...v, x: drag.ox + (e.clientX - drag.x), y: drag.oy + (e.clientY - drag.y) }));
  };

  const endPointer = (e) => {
    pointersRef.current.delete(e.pointerId);
    if (pointersRef.current.size < 2) pinchRef.current = null;
    if (pointersRef.current.size === 0) dragRef.current = null;
  };

  const percent = Math.round(view.scale * 100);

  const overlay = (
    <div
      className="fixed inset-0 z-50 flex flex-col bg-slate-950/[0.98] backdrop-blur-md"
      role="dialog"
      aria-modal="true"
      aria-label={caption ? `Diagram: ${caption}` : "Diagram"}
    >
      <div className="flex items-center gap-2 border-b border-border px-3 py-2">
        <button type="button" onClick={() => zoomCentre(1 / STEP)} aria-label="Zoom out"
          className="h-8 w-8 rounded-md border border-border bg-panel text-slate-200 hover:border-accent">−</button>
        <button type="button" onClick={reset}
          className="h-8 min-w-[64px] rounded-md border border-border bg-panel px-2 text-xs text-slate-200 tabular-nums hover:border-accent"
          aria-label={`Reset zoom, currently ${percent} percent`}>{percent}%</button>
        <button type="button" onClick={() => zoomCentre(STEP)} aria-label="Zoom in"
          className="h-8 w-8 rounded-md border border-border bg-panel text-slate-200 hover:border-accent">+</button>
        <span className="ml-2 hidden text-[11px] text-slate-500 sm:inline">
          drag to pan · scroll or pinch to zoom · +, −, 0 · Esc to close
        </span>
        <button type="button" ref={closeRef} onClick={onClose}
          className="ml-auto h-8 rounded-md border border-border bg-panel px-3 text-sm text-slate-200 hover:border-accent">
          Close ✕
        </button>
      </div>

      <div
        ref={stageRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endPointer}
        onPointerCancel={endPointer}
        onDoubleClick={reset}
        className="flex-1 cursor-grab touch-none select-none overflow-hidden active:cursor-grabbing"
      >
        <div className="flex h-full w-full items-center justify-center">
          <div
            className="diagram-figure [&_svg]:h-auto [&_svg]:max-w-none [&_svg]:w-[min(1100px,90vw)]"
            style={{ transform: `translate(${view.x}px, ${view.y}px) scale(${view.scale})`, transformOrigin: "center center" }}
            dangerouslySetInnerHTML={{ __html: scopedMarkup }}
          />
        </div>
      </div>

      {caption && (
        <p className="border-t border-border px-4 py-2 text-center text-xs text-slate-400">{caption}</p>
      )}
    </div>
  );

  if (typeof document === "undefined") return null;
  return createPortal(overlay, document.body);
}
