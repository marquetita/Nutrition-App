export interface FoodItem {
  id: string;
  name: string;
  /** grams of protein per 100g of this food */
  proteinPer100g: number;
  fatPer100g?: number;
  carbsPer100g?: number;
  sugarPer100g?: number;
  /** the portion (in grams) you typically eat in one sitting, used to pre-fill the add-food form */
  usualGrams?: number;
}

export interface Macros {
  protein: number;
  fat?: number;
  carbs?: number;
  sugar?: number;
}

export interface LogEntry extends Macros {
  id: string;
  /** local date the entry belongs to, format YYYY-MM-DD */
  date: string;
  createdAt: number;
  label: string;
  /** set when this entry was added from the food library */
  foodItemId?: string;
  /** grams eaten, only set for library-linked entries */
  grams?: number;
}
