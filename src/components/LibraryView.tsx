import { useState } from 'react';
import type { FoodItem } from '../types';
import { FoodItemModal } from './FoodItemModal';

export function LibraryView({
  library,
  onAdd,
  onUpdate,
  onDelete,
}: {
  library: FoodItem[];
  onAdd: (item: Omit<FoodItem, 'id'>) => void;
  onUpdate: (id: string, item: Omit<FoodItem, 'id'>) => void;
  onDelete: (id: string) => void;
}) {
  const [editing, setEditing] = useState<FoodItem | 'new' | null>(null);

  return (
    <div className="mx-auto max-w-md px-4 pb-24 pt-6">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-xl font-semibold text-slate-100">Food library</h1>
        <button
          onClick={() => setEditing('new')}
          className="rounded-lg bg-cyan-500 px-3 py-1.5 text-sm font-medium text-slate-950"
        >
          + New
        </button>
      </div>

      <div className="divide-y divide-slate-800 rounded-xl bg-slate-900">
        {library
          .slice()
          .sort((a, b) => a.name.localeCompare(b.name))
          .map((item) => (
            <button
              key={item.id}
              onClick={() => setEditing(item)}
              className="flex w-full items-center justify-between px-4 py-3 text-left hover:bg-slate-800"
            >
              <div>
                <div className="text-slate-100">{item.name}</div>
                <div className="text-xs text-slate-400">
                  {item.proteinPer100g}g protein / 100g
                  {item.usualGrams != null ? ` · usually ${item.usualGrams}g` : ''}
                </div>
              </div>
              <span className="text-slate-500">›</span>
            </button>
          ))}
        {library.length === 0 && (
          <p className="px-4 py-6 text-center text-sm text-slate-400">
            No foods yet. Add your first one.
          </p>
        )}
      </div>

      {editing && (
        <FoodItemModal
          initial={editing === 'new' ? undefined : editing}
          onClose={() => setEditing(null)}
          onSave={(item) => {
            if (editing === 'new') onAdd(item);
            else onUpdate(editing.id, item);
            setEditing(null);
          }}
          onDelete={
            editing !== 'new'
              ? () => {
                  onDelete(editing.id);
                  setEditing(null);
                }
              : undefined
          }
        />
      )}
    </div>
  );
}
