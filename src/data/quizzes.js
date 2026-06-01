// Quiz index — re-exports all quiz data as a single QUIZZES object
import goBasics from "./quizzes/go-basics";
import goAdvanced from "./quizzes/go-advanced";
import postgres from "./quizzes/postgres";
import redisCache from "./quizzes/redis-cache";
import systemDesign from "./quizzes/system-design";
import nextjsReact from "./quizzes/nextjs-react";
import apisMicroservices from "./quizzes/apis-microservices";
import fintechDomain from "./quizzes/fintech-domain";

// MCQ quizzes — 8 topics, ~50 questions each
export const QUIZZES = {
  "go-basics": goBasics,
  "go-advanced": goAdvanced,
  "postgres": postgres,
  "redis-cache": redisCache,
  "system-design": systemDesign,
  "nextjs-react": nextjsReact,
  "apis-microservices": apisMicroservices,
  "fintech-domain": fintechDomain,
};
