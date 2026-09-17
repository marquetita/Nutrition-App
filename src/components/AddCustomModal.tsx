import { useState } from 'react';
import type { Macros } from '../types';
import { Modal } from './Modal';

export function AddCustomModal({
  onAdd,
  onClose,
}: {
  onAdd: (label: string, macros: Macros) => void;
  onClose: () => void;
}) {
  const [label, setLabel] = useState('');
  const [protein, setProtein] = useState('');
  const [fat, setFat] = useState('');
  const [carbs, setCarbs] = useState('');
  const [sugar, setSugar] = useState('');

  const proteinNum = Number(protein);
  const canSubmit = label.trim().length > 0 && protein !== '' && proteinNum >= 0;

  function submit() {
    if (!canSubmit) return;
    onAdd(label.trim(), {
      protein: proteinNum,
      fat: fat !== '' ? Number(fat) : undefined,
      carbs: carbs !== '' ? Number(carbs) : undefined,
      sugar: sugar !== '' ? Number(sugar) : undefined,
    });
  }

  return (
    <Modal title="Add custom entry" onClose={onClose}>
      <p className="mb-3 text-sm text-slate-400">
        For meals not in your library — e.g. something from a restaurant you estimated
        elsewhere (photo + AI, nutrition label, guess).
      </p>

      <label className="mb-1 block text-sm text-slate-400">What was it?</label>
      <input
        type="text"
        autoFocus
        placeholder="e.g. lunch at a restaurant"
        value={label}
        onChange={(e) => setLabel(e.target.value)}
        className="mb-3 w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-slate-100"
      />

      <label className="mb-1 block text-sm text-slate-400">Protein (g)</label>
      <input
        type="number"
        inputMode="decimal"
        value={protein}
        onChange={(e) => setProtein(e.target.value)}
        className="mb-3 w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-lg text-slate-100"
      />

      <div className="mb-4 grid grid-cols-3 gap-2">
        <div>
          <label className="mb-1 block text-xs text-slate-400">Fat (g)</label>
          <input
            type="number"
            inputMode="decimal"
            value={fat}
            onChange={(e) => setFat(e.target.value)}
            className="w-full rounded-lg border border-slate-700 bg-slate-800 px-2 py-2 text-slate-100"
          />
        </div>
        <div>
          <label className="mb-1 block text-xs text-slate-400">Carbs (g)</label>
          <input
            type="number"
            inputMode="decimal"
            value={carbs}
            onChange={(e) => setCarbs(e.target.value)}
            className="w-full rounded-lg border border-slate-700 bg-slate-800 px-2 py-2 text-slate-100"
          />
        </div>
        <div>
          <label className="mb-1 block text-xs text-slate-400">Sugar (g)</label>
          <input
            type="number"
            inputMode="decimal"
            value={sugar}
            onChange={(e) => setSugar(e.target.value)}
            className="w-full rounded-lg border border-slate-700 bg-slate-800 px-2 py-2 text-slate-100"
          />
        </div>
      </div>

      <button
        disabled={!canSubmit}
        onClick={submit}
        className="w-full rounded-lg bg-cyan-500 py-2 font-medium text-slate-950 disabled:opacity-40"
      >
        Add to today
      </button>
    </Modal>
  );
}
