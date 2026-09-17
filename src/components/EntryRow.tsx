import type { LogEntry } from '../types';

export function EntryRow({ entry, onDelete }: { entry: LogEntry; onDelete?: () => void }) {
  return (
    <div className="flex items-center justify-between px-4 py-3">
      <div>
        <div className="text-slate-100">{entry.label}</div>
        <div className="text-xs text-slate-400">
          {entry.grams != null ? `${entry.grams}g · ` : ''}
          {entry.protein}g protein
          {entry.fat != null ? ` · ${entry.fat}g fat` : ''}
          {entry.carbs != null ? ` · ${entry.carbs}g carbs` : ''}
          {entry.sugar != null ? ` · ${entry.sugar}g sugar` : ''}
        </div>
      </div>
      {onDelete && (
        <button
          onClick={onDelete}
          aria-label={`Delete ${entry.label}`}
          className="rounded-full p-2 text-slate-500 hover:bg-slate-800 hover:text-red-400"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 6h18" />
            <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
            <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
          </svg>
        </button>
      )}
    </div>
  );
}
