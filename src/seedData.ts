import type { FoodItem } from './types';

// Seeded from the user's existing spreadsheet (protein per 100g + usual portion).
// Fat/carbs/sugar were not tracked there, so they start empty and can be filled
// in later from the Library screen.
export const seedLibrary: FoodItem[] = [
  { id: 'seed-kaiserka', name: 'Kaiserka', proteinPer100g: 8.6 },
  { id: 'seed-houska', name: 'Houska', proteinPer100g: 9 },
  { id: 'seed-skyr', name: 'Skyr', proteinPer100g: 9.5, usualGrams: 130 },
  { id: 'seed-tvaroh', name: 'Tvaroh', proteinPer100g: 9, usualGrams: 250 },
  { id: 'seed-gran-moravia', name: 'Gran Moravia', proteinPer100g: 31, usualGrams: 100 },
  { id: 'seed-recky-jogurt', name: 'Řecký jogurt', proteinPer100g: 10, usualGrams: 140 },
  { id: 'seed-mleko', name: 'Mléko', proteinPer100g: 3.2, usualGrams: 200 },
  { id: 'seed-syr', name: 'Sýr', proteinPer100g: 14, usualGrams: 25 },
  { id: 'seed-steak', name: 'Steak', proteinPer100g: 23, usualGrams: 166 },
];
