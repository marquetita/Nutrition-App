import { useCallback, useState } from 'react';
import { getLogEntries, newId, saveLogEntries } from '../storage';
import type { LogEntry, Macros } from '../types';

export function useLogEntries() {
  const [entries, setEntries] = useState<LogEntry[]>(getLogEntries);

  const persist = useCallback((next: LogEntry[]) => {
    setEntries(next);
    saveLogEntries(next);
  }, []);

  const addEntry = useCallback(
    (entry: { date: string; label: string; foodItemId?: string; grams?: number } & Macros) => {
      const newEntry: LogEntry = { ...entry, id: newId(), createdAt: Date.now() };
      persist([...entries, newEntry]);
      return newEntry;
    },
    [entries, persist],
  );

  const deleteEntry = useCallback(
    (id: string) => {
      persist(entries.filter((e) => e.id !== id));
    },
    [entries, persist],
  );

  return { entries, addEntry, deleteEntry };
}
