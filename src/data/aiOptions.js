// Options shared by the AI interviewer UI and the server-side prompt builder.
export const ROUND_OPTIONS = [
  { id: "screen", label: "Recruiter screen" },
  { id: "technical", label: "Technical" },
  { id: "design", label: "System design" },
  { id: "manager", label: "Hiring manager / behavioral" },
];

export const TONE_OPTIONS = [
  { id: "friendly", label: "Friendly" },
  { id: "neutral", label: "Neutral" },
  { id: "tough", label: "Tough" },
];

export const QUESTION_COUNTS = [3, 5, 8];

export const roundLabel = (id) => ROUND_OPTIONS.find((r) => r.id === id)?.label ?? id;
