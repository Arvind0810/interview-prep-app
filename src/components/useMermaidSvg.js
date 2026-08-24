"use client";
import { useEffect, useRef, useState } from "react";

// mermaid measures label text with the top-level `fontFamily` and paints it
// with `themeVariables.fontFamily`. If the two differ it sizes nodes for the
// wrong font and clips the labels, so both must be set from one constant.
const DIAGRAM_FONT = 'ui-monospace, SFMono-Regular, Menlo, "Courier New", monospace';

// Matches the palette in globals.css so diagrams sit inside the dark theme
// rather than punching a white box through it.
const THEME_VARIABLES = {
  background: "#0b1220",
  primaryColor: "#1e293b",
  primaryTextColor: "#e2e8f0",
  primaryBorderColor: "#475569",
  secondaryColor: "#312e81",
  tertiaryColor: "#0f172a",
  lineColor: "#64748b",
  textColor: "#e2e8f0",
  mainBkg: "#1e293b",
  nodeBorder: "#475569",
  clusterBkg: "#0f172a",
  clusterBorder: "#334155",
  titleColor: "#22d3ee",
  edgeLabelBackground: "#0b1220",
  actorBkg: "#1e293b",
  actorBorder: "#475569",
  actorTextColor: "#e2e8f0",
  signalColor: "#94a3b8",
  signalTextColor: "#cbd5e1",
  labelBoxBkgColor: "#1e293b",
  labelBoxBorderColor: "#475569",
  labelTextColor: "#e2e8f0",
  loopTextColor: "#cbd5e1",
  noteBkgColor: "#422006",
  noteTextColor: "#fde68a",
  noteBorderColor: "#a16207",
  fontFamily: DIAGRAM_FONT,
  fontSize: "13px",
};

// One shared import + initialize for the whole page; mermaid is a large chunk
// and initialize() is global, so calling it per instance is wasted work.
let mermaidPromise = null;
const loadMermaid = () => {
  if (!mermaidPromise) {
    mermaidPromise = import("mermaid").then(({ default: mermaid }) => {
      mermaid.initialize({
        startOnLoad: false,
        securityLevel: "strict",
        theme: "base",
        fontFamily: DIAGRAM_FONT,
        themeVariables: THEME_VARIABLES,
        flowchart: { curve: "basis", padding: 16, htmlLabels: true, useMaxWidth: true },
        sequence: { useMaxWidth: true, wrap: true },
      });
      return mermaid;
    });
  }
  return mermaidPromise;
};

let instanceId = 0;

export default function useMermaidSvg(chart) {
  const [svg, setSvg] = useState("");
  const [failed, setFailed] = useState(false);
  const idRef = useRef(`mermaid-${(instanceId += 1)}`);

  useEffect(() => {
    if (!chart) return undefined;
    let cancelled = false;

    loadMermaid()
      .then((mermaid) => mermaid.render(idRef.current, chart))
      .then((result) => {
        if (!cancelled) setSvg(result.svg);
      })
      .catch(() => {
        if (!cancelled) setFailed(true);
      });

    return () => {
      cancelled = true;
    };
  }, [chart]);

  return { svg, failed };
}
