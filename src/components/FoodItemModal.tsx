import { useState } from 'react';
import type { FoodItem } from '../types';
import { Modal } from './Modal';

export function FoodItemModal({
  initial,
  initialName,
  onSave,
  onDelete,
  onClose,
}: {
  initial?: FoodItem;
  initialName?: string;
  onSave: (item: Omit<FoodItem, 'id'>) => void;
  onDelete?: () => void;
  onClose: () => void;
}) {
  const [name, setName] = useState(initial?.name ?? initialName ?? '');
  const [protein, setProtein] = useState(initial ? String(initial.proteinPer100g) : '');
  const [fat, setFat] = useState(initial?.fatPer100g != null ? String(initial.fatPer100g) : '');
  const [carbs, setCarbs] = useState(initial?.carbsPer100g != null ? String(initial.carbsPer100g) : '');
  const [sugar, setSugar] = useState(initial?.sugarPer100g != null ? String(initial.sugarPer100g) : '');
  const [usualGrams, setUsualGrams] = useState(initial?.usualGrams != null ? String(initial.usualGrams) : '');

  const proteinNum = Number(protein);
  const canSubmit = name.trim().length > 0 && protein !== '' && proteinNum >= 0;

  function submit() {
    if (!canSubmit) return;
    onSave({
      name: name.trim(),
      proteinPer100g: proteinNum,
      fatPer100g: fat !== '' ? Number(fat) : undefined,
      carbsPer100g: carbs !== '' ? Number(carbs) : undefined,
      sugarPer100g: sugar !== '' ? Number(sugar) : undefined,
      usualGrams: usualGrams !== '' ? Number(usualGrams) : undefined,
    });
  }

  return (
    <Modal title={initial ? 'Edit food' : 'New food'} onClose={onClose}>
      <label className="mb-1 block text-sm text-slate-400">Name</label>
      <input
        type="text"
        autoFocus
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="mb-3 w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-slate-100"
      />

      <p className="mb-2 text-xs uppercase tracking-wide text-slate-500">Per 100g</p>
      <div className="mb-3 grid grid-cols-4 gap-2">
        <Field label="Protein" value={protein} onChange={setProtein} />
        <Field label="Fat" value={fat} onChange={setFat} />
        <Field label="Carbs" value={carbs} onChange={setCarbs} />
        <Field label="Sugar" value={sugar} onChange={setSugar} />
      </div>

      <label className="mb-1 block text-sm text-slate-400">Usual portion (g)</label>
      <input
        type="number"
        inputMode="decimal"
        placeholder="e.g. 130"
        value={usualGrams}
        onChange={(e) => setUsualGrams(e.target.value)}
        className="mb-4 w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-slate-100"
      />

      <div className="flex gap-2">
        {onDelete && (
          <button onClick={onDelete} className="rounded-lg border border-red-900 px-4 py-2 text-red-400">
            Delete
          </button>
        )}
        <button
          disabled={!canSubmit}
          onClick={submit}
          className="flex-1 rounded-lg bg-cyan-500 py-2 font-medium text-slate-950 disabled:opacity-40"
        >
          Save
        </button>
      </div>
    </Modal>
  );
}

function Field({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <label className="mb-1 block text-xs text-slate-400">{label}</label>
      <input
        type="number"
        inputMode="decimal"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-slate-700 bg-slate-800 px-2 py-2 text-slate-100"
      />
    </div>
  );
}
