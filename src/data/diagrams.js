// Diagram index — re-exports every topic's sources as one DIAGRAMS map.
// An entry carries either `chart` (mermaid) or `svg` (hand-authored markup).
// Keys are globally unique so a question only needs `dia: "<key>"`.
import go from "./diagrams/go";
import sql from "./diagrams/sql";
import react from "./diagrams/react";
import sysdesign from "./diagrams/sysdesign";
import js from "./diagrams/js";
import platform from "./diagrams/platform";

export const DIAGRAMS = { ...go, ...sql, ...react, ...sysdesign, ...js, ...platform };

export const diagramFor = (key) => (key ? DIAGRAMS[key] : undefined);
