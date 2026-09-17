import type { FoodItem, LogEntry, Macros } from '../types';

export function macrosForPortion(item: FoodItem, grams: number): Macros {
  const ratio = grams / 100;
  return {
    protein: round1(item.proteinPer100g * ratio),
    fat: item.fatPer100g != null ? round1(item.fatPer100g * ratio) : undefined,
    carbs: item.carbsPer100g != null ? round1(item.carbsPer100g * ratio) : undefined,
    sugar: item.sugarPer100g != null ? round1(item.sugarPer100g * ratio) : undefined,
  };
}

export function sumMacros(entries: Macros[]): Required<Macros> {
  return entries.reduce<Required<Macros>>(
    (total, entry) => ({
      protein: total.protein + (entry.protein || 0),
      fat: total.fat + (entry.fat || 0),
      carbs: total.carbs + (entry.carbs || 0),
      sugar: total.sugar + (entry.sugar || 0),
    }),
    { protein: 0, fat: 0, carbs: 0, sugar: 0 },
  );
}

export function round1(n: number): number {
  return Math.round(n * 10) / 10;
}

export function entriesForDate(entries: LogEntry[], date: string): LogEntry[] {
  return entries
    .filter((e) => e.date === date)
    .sort((a, b) => a.createdAt - b.createdAt);
}
