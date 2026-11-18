import { QUIZZES } from "@/data/quizzes";
import { STORIES } from "@/data/stories";
import { CHECKLISTS } from "@/data/checklists";

const TECH_QUIZZES = ["go-basics", "go-advanced", "postgres", "redis-cache", "apis-microservices", "nextjs-react"];
const DESIGN_QUIZZES = ["system-design", "rewards-platform", "fintech-domain"];
const MAX_RUBRIC = 4;
const WEAK_QUIZ_PCT = 60;
const WEAK_MOCK_AVG = 2.5;

const mean = (nums) => (nums.length ? nums.reduce((a, b) => a + b, 0) / nums.length : 0);
const checklistShare = (stored, id) =>
  CHECKLISTS[id].filter((it) => (stored[id] || []).includes(it)).length / CHECKLISTS[id].length;
const quizShare = (quizStats, ids) => mean(ids.map((id) => (quizStats[id]?.best || 0) / 100));

function mockAverages(sessions) {
  const byTopic = {};
  for (const s of sessions) {
    for (const it of s.items) {
      (byTopic[it.t] ||= []).push(mean(Object.values(it.scores)));
    }
  }
  return Object.fromEntries(Object.entries(byTopic).map(([t, vals]) => [t, mean(vals)]));
}

const mockShare = (avgs, pick) => {
  const vals = Object.entries(avgs).filter(([t]) => pick(t)).map(([, v]) => v);
  return vals.length ? mean(vals) / MAX_RUBRIC : 0;
};

// Each round's readiness is the mean of its parts, shown to the user so the score is explainable.
export function computeReadiness({ checklists, quizStats, storiesReady, mockSessions }) {
  const mock = mockAverages(mockSessions);
  const readyCount = STORIES.filter((s) => storiesReady.includes(s.id)).length;
  const storyShare = readyCount / STORIES.length;

  const rounds = [
    { key: "screen", label: "Recruiter screen", href: "/recruiter-screen", parts: [
      ["Screen checklist", checklistShare(checklists, "screen")],
    ]},
    { key: "technical", label: "Technical", href: "/technical-round", parts: [
      ["Technical checklist", checklistShare(checklists, "technical")],
      ["Tech quiz best scores", quizShare(quizStats, TECH_QUIZZES)],
      ["Mock technical answers", mockShare(mock, (t) => t !== "Behavioral" && t !== "SysDesign")],
    ]},
    { key: "design", label: "System design", href: "/sysdesign", parts: [
      ["Design/domain quiz scores", quizShare(quizStats, DESIGN_QUIZZES)],
      ["Mock system-design answers", mockShare(mock, (t) => t === "SysDesign")],
    ]},
    { key: "behavioral", label: "Hiring manager", href: "/behavioral", parts: [
      ["Stories interview-ready", storyShare],
      ["Mock behavioral answers", mockShare(mock, (t) => t === "Behavioral")],
    ]},
    { key: "offer", label: "Offer", href: "/offer", parts: [
      ["Offer checklist", checklistShare(checklists, "offer")],
    ]},
  ].map((r) => ({ ...r, score: mean(r.parts.map(([, v]) => v)) }));

  const weak = [
    ...Object.entries(QUIZZES)
      .filter(([id]) => quizStats[id] && quizStats[id].best < WEAK_QUIZ_PCT)
      .map(([id, q]) => ({ label: `${q.title} quiz — best ${quizStats[id].best}%`, href: "/quiz", sev: quizStats[id].best / 100 })),
    ...Object.entries(mock)
      .filter(([, v]) => v < WEAK_MOCK_AVG)
      .map(([t, v]) => ({ label: `${t} mock answers — avg ${v.toFixed(1)}/4`, href: "/mock", sev: v / MAX_RUBRIC })),
    ...(storyShare < 1
      ? [{ label: `${STORIES.length - readyCount} STAR stories not interview-ready`, href: "/behavioral", sev: storyShare }]
      : []),
  ].sort((a, b) => a.sev - b.sev).slice(0, 3);

  return { rounds, weak };
}
