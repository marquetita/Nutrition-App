import { useState } from 'react';
import type { FoodItem, LogEntry, Macros } from '../types';
import { entriesForDate, macrosForPortion, sumMacros } from '../utils/macros';
import { todayKey } from '../storage';
import { MacroTotals } from './MacroTotals';
import { EntryRow } from './EntryRow';
import { AddFoodModal } from './AddFoodModal';
import { AddCustomModal } from './AddCustomModal';
import { FoodItemModal } from './FoodItemModal';

export function TodayView({
  library,
  entries,
  onAddEntry,
  onDeleteEntry,
  onAddFoodItem,
}: {
  library: FoodItem[];
  entries: LogEntry[];
  onAddEntry: (entry: { label: string; foodItemId?: string; grams?: number } & Macros) => void;
  onDeleteEntry: (id: string) => void;
  onAddFoodItem: (item: Omit<FoodItem, 'id'>) => FoodItem;
}) {
  const [showAddFood, setShowAddFood] = useState(false);
  const [showAddCustom, setShowAddCustom] = useState(false);
  const [newFoodSeed, setNewFoodSeed] = useState<string | null>(null);

  const date = todayKey();
  const todays = entriesForDate(entries, date);
  const totals = sumMacros(todays);

  return (
    <div className="mx-auto max-w-md px-4 pb-28 pt-6">
      <h1 className="mb-1 text-xl font-semibold text-slate-100">Today</h1>
      <p className="mb-4 text-sm text-slate-400">
        {new Date().toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}
      </p>

      <MacroTotals totals={totals} />

      <div className="mt-4 divide-y divide-slate-800 rounded-xl bg-slate-900">
        {todays.map((entry) => (
          <EntryRow key={entry.id} entry={entry} onDelete={() => onDeleteEntry(entry.id)} />
        ))}
        {todays.length === 0 && (
          <p className="px-4 py-6 text-center text-sm text-slate-400">
            Nothing logged yet today.
          </p>
        )}
      </div>

      <div className="mt-4 flex gap-2">
        <button
          onClick={() => setShowAddFood(true)}
          className="flex-1 rounded-lg bg-cyan-500 py-3 font-medium text-slate-950"
        >
          + Add food
        </button>
        <button
          onClick={() => setShowAddCustom(true)}
          className="flex-1 rounded-lg border border-slate-700 py-3 font-medium text-slate-100"
        >
          + Add custom
        </button>
      </div>

      {showAddFood && (
        <AddFoodModal
          library={library}
          onClose={() => setShowAddFood(false)}
          onCreateNew={(term) => {
            setShowAddFood(false);
            setNewFoodSeed(term);
          }}
          onAdd={(item, grams) => {
            const macros = macrosForPortion(item, grams);
            onAddEntry({ label: item.name, foodItemId: item.id, grams, ...macros });
            setShowAddFood(false);
          }}
        />
      )}

      {showAddCustom && (
        <AddCustomModal
          onClose={() => setShowAddCustom(false)}
          onAdd={(label, macros) => {
            onAddEntry({ label, ...macros });
            setShowAddCustom(false);
          }}
        />
      )}

      {newFoodSeed !== null && (
        <FoodItemModal
          initialName={newFoodSeed}
          onClose={() => setNewFoodSeed(null)}
          onSave={(item) => {
            onAddFoodItem(item);
            setNewFoodSeed(null);
            // Back to the food picker so they can now select the item they just created.
            setShowAddFood(true);
          }}
        />
      )}
    </div>
  );
}
