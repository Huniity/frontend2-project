import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const DAY_COLORS = [
  "#f97316", "#10b981", "#3b82f6", "#ef4444",
  "#8b5cf6", "#f59e0b", "#06b6d4", "#ec4899",
];

export function getDayColor(dayNumber: number | null): string {
  if (dayNumber === null) return "#10b981";
  return DAY_COLORS[(dayNumber - 1) % DAY_COLORS.length];
}
