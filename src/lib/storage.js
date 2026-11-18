"use client";
import { useEffect, useRef, useState } from "react";

// Every key the app persists. All prefixed `iprep_` to avoid collisions.
export const KEYS = {
  qReviewed: "iprep_qReviewed",
  lastQuiz: "iprep_lastQuiz",
  quizStats: "iprep_quizStats",
  studyDays: "iprep_studyDays",
  storiesReady: "iprep_storiesReady",
  storyNotes: "iprep_storyNotes",
  mockSessions: "iprep_mockSessions",
  pipeline: "iprep_pipeline",
  checklistPrefix: "iprep_check_",
  lessonsDone: "iprep_lessonsDone",
  lastLesson: "iprep_lastLesson",
  flashcards: "iprep_flashcards",
  theme: "iprep_theme",
  sidebarCollapsed: "iprep_sidebarCollapsed",
};

// Same-tab listeners: the browser's `storage` event only fires in *other* tabs, so components
// that mirror the same key (e.g. sidebar ticks and the lesson "complete" button) use this.
const STORE_EVENT = "iprep-store";

export function writeAndBroadcast(key, value) {
  const ok = writeJSON(key, value);
  try {
    window.dispatchEvent(new CustomEvent(STORE_EVENT, { detail: { key } }));
  } catch {
    // ignore — non-browser environment
  }
  return ok;
}

// Read-only subscription to a key, kept in sync with writeAndBroadcast and other tabs.
export function useStoredValue(key, fallback) {
  const fallbackRef = useRef(fallback);
  const [value, setValue] = useState(fallback);
  useEffect(() => {
    const load = () => setValue(readJSON(key, fallbackRef.current));
    const onStore = (e) => { if (!e.detail || e.detail.key === key) load(); };
    const onStorage = (e) => { if (e.key === key) load(); };
    load();
    window.addEventListener(STORE_EVENT, onStore);
    window.addEventListener("storage", onStorage);
    return () => {
      window.removeEventListener(STORE_EVENT, onStore);
      window.removeEventListener("storage", onStorage);
    };
  }, [key]);
  return value;
}

// Records today as a study day (used for the activity strip / streak).
export function recordStudyDay() {
  const today = new Date().toISOString().slice(0, 10);
  const days = readJSON(KEYS.studyDays, []);
  if (!days.includes(today)) writeJSON(KEYS.studyDays, [...days, today].slice(-365));
}

// localStorage throws in private windows and when site data is blocked,
// so every access goes through these guards and falls back cleanly.
export function readJSON(key, fallback) {
  try {
    const raw = window.localStorage.getItem(key);
    return raw == null ? fallback : JSON.parse(raw);
  } catch {
    return fallback;
  }
}

export function writeJSON(key, value) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
}

// State mirrored to localStorage. Reads after mount so the server render and
// the first client render match (no hydration mismatch); writes only once loaded
// so the fallback never overwrites stored data.
export function usePersistentState(key, fallback) {
  const fallbackRef = useRef(fallback);
  const [value, setValue] = useState(fallback);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setValue(readJSON(key, fallbackRef.current));
    setLoaded(true);
  }, [key]);

  useEffect(() => {
    if (loaded) writeJSON(key, value);
  }, [key, value, loaded]);

  return [value, setValue, loaded];
}
