import { useMemo, useState } from 'react';
import type { FoodItem } from '../types';
import { macrosForPortion } from '../utils/macros';
import { Modal } from './Modal';

export function AddFoodModal({
  library,
  onAdd,
  onClose,
  onCreateNew,
}: {
  library: FoodItem[];
  onAdd: (item: FoodItem, grams: number) => void;
  onClose: () => void;
  onCreateNew: (searchTerm: string) => void;
}) {
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState<FoodItem | null>(null);
  const [grams, setGrams] = useState<string>('');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return library;
    return library.filter((item) => item.name.toLowerCase().includes(q));
  }, [library, query]);

  function selectItem(item: FoodItem) {
    setSelected(item);
    setGrams(item.usualGrams != null ? String(item.usualGrams) : '');
  }

  const gramsNum = Number(grams);
  const preview = selected && gramsNum > 0 ? macrosForPortion(selected, gramsNum) : null;

  if (selected) {
    return (
      <Modal title={selected.name} onClose={onClose}>
        <label className="mb-1 block text-sm text-slate-400">Grams eaten</label>
        <input
          type="number"
          inputMode="decimal"
          autoFocus
          value={grams}
          onChange={(e) => setGrams(e.target.value)}
          className="mb-4 w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-lg text-slate-100"
        />

        {preview && (
          <div className="mb-4 grid grid-cols-4 gap-2 rounded-lg bg-slate-800 p-3 text-center">
            <Stat label="Protein" value={preview.protein} />
            <Stat label="Fat" value={preview.fat} />
            <Stat label="Carbs" value={preview.carbs} />
            <Stat label="Sugar" value={preview.sugar} />
          </div>
        )}

        <div className="flex gap-2">
          <button
            onClick={() => setSelected(null)}
            className="flex-1 rounded-lg border border-slate-700 py-2 text-slate-300"
          >
            Back
          </button>
          <button
            disabled={!gramsNum || gramsNum <= 0}
            onClick={() => gramsNum > 0 && onAdd(selected, gramsNum)}
            className="flex-1 rounded-lg bg-cyan-500 py-2 font-medium text-slate-950 disabled:opacity-40"
          >
            Add to today
          </button>
        </div>
      </Modal>
    );
  }

  return (
    <Modal title="Add food" onClose={onClose}>
      <input
        type="text"
        autoFocus
        placeholder="Search your foods…"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="mb-3 w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-slate-100"
      />
      <div className="max-h-72 overflow-y-auto">
        {filtered.map((item) => (
          <button
            key={item.id}
            onClick={() => selectItem(item)}
            className="flex w-full items-center justify-between rounded-lg px-3 py-3 text-left hover:bg-slate-800"
          >
            <span className="text-slate-100">{item.name}</span>
            <span className="text-sm text-slate-400">{item.proteinPer100g}g protein/100g</span>
          </button>
        ))}
        {filtered.length === 0 && (
          <p className="px-3 py-4 text-sm text-slate-400">No matching food in your library.</p>
        )}
      </div>
      <button
        onClick={() => onCreateNew(query)}
        className="mt-3 w-full rounded-lg border border-dashed border-slate-600 py-2 text-sm text-cyan-400"
      >
        + Add new food to library
      </button>
    </Modal>
  );
}

function Stat({ label, value }: { label: string; value: number | undefined }) {
  return (
    <div>
      <div className="text-base font-semibold text-slate-100">{value != null ? value : '–'}</div>
      <div className="text-xs text-slate-400">{label}</div>
    </div>
  );
}
