export const PLAN_LIMITS = {
  FREE: {
    max_tokens: 8000,
    tripsPerMonth: 2,
    model: "gemini-2.5-flash",
  },
  NOMAD: {
    max_tokens: 12000,
    tripsPerMonth: 10,
    model: "gemini-2.5-flash",
  },
  GLOBETROTTER: {
    max_tokens: 16000,
    tripsPerMonth: -1,
    model: "gemini-2.5-flash",
  },
} as const;

export type PlanKey = keyof typeof PLAN_LIMITS;