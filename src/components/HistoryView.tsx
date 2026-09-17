import { useMemo, useState } from 'react';
import type { LogEntry } from '../types';
import { entriesForDate, sumMacros } from '../utils/macros';
import { todayKey } from '../storage';
import { MacroTotals } from './MacroTotals';
import { EntryRow } from './EntryRow';

export function HistoryView({
  entries,
  onDeleteEntry,
}: {
  entries: LogEntry[];
  onDeleteEntry: (id: string) => void;
}) {
  const today = todayKey();
  const dates = useMemo(() => {
    const set = new Set(entries.map((e) => e.date));
    set.delete(today);
    return Array.from(set).sort((a, b) => (a < b ? 1 : -1));
  }, [entries, today]);

  const [selected, setSelected] = useState<string | null>(null);

  if (selected) {
    const dayEntries = entriesForDate(entries, selected);
    const totals = sumMacros(dayEntries);
    return (
      <div className="mx-auto max-w-md px-4 pb-24 pt-6">
        <button onClick={() => setSelected(null)} className="mb-3 text-sm text-cyan-400">
          ‹ All days
        </button>
        <h1 className="mb-4 text-xl font-semibold text-slate-100">{formatDate(selected)}</h1>
        <MacroTotals totals={totals} />
        <div className="mt-4 divide-y divide-slate-800 rounded-xl bg-slate-900">
          {dayEntries.map((entry) => (
            <EntryRow key={entry.id} entry={entry} onDelete={() => onDeleteEntry(entry.id)} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-md px-4 pb-24 pt-6">
      <h1 className="mb-4 text-xl font-semibold text-slate-100">History</h1>
      <div className="divide-y divide-slate-800 rounded-xl bg-slate-900">
        {dates.map((date) => {
          const totals = sumMacros(entriesForDate(entries, date));
          return (
            <button
              key={date}
              onClick={() => setSelected(date)}
              className="flex w-full items-center justify-between px-4 py-3 text-left hover:bg-slate-800"
            >
              <span className="text-slate-100">{formatDate(date)}</span>
              <span className="text-sm text-slate-400">{Math.round(totals.protein)}g protein</span>
            </button>
          );
        })}
        {dates.length === 0 && (
          <p className="px-4 py-6 text-center text-sm text-slate-400">
            No past days yet — they'll show up here once today is over.
          </p>
        )}
      </div>
    </div>
  );
}

function formatDate(date: string): string {
  const [y, m, d] = date.split('-').map(Number);
  return new Date(y, m - 1, d).toLocaleDateString(undefined, {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });
}
