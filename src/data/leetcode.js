// LeetCode index — flattens every language file into one CHALLENGES array.
// Each source file omits `lang`; it is stamped on here so a problem solved in
// two languages stays a separate, independently trackable entry.
import goChallenges from "./leetcode/go";
import jsChallenges from "./leetcode/javascript";
import sqlChallenges from "./leetcode/sql";

export const LANGUAGES = ["Go", "JavaScript", "SQL"];

export const DIFFICULTIES = ["easy", "med", "hard"];

const withLang = (challenges, lang) =>
  challenges.map((c) => ({ ...c, lang, key: `${lang}-${c.id}` }));

export const CHALLENGES = [
  ...withLang(goChallenges, "Go"),
  ...withLang(jsChallenges, "JavaScript"),
  ...withLang(sqlChallenges, "SQL"),
];

export const leetcodeUrl = (slug) => `https://leetcode.com/problems/${slug}/`;
