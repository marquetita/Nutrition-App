import type { FoodItem, LogEntry } from './types';
import { seedLibrary } from './seedData';

const LIBRARY_KEY = 'protein-tracker:library';
const LOGS_KEY = 'protein-tracker:logs';

function readJson<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function writeJson<T>(key: string, value: T): void {
  localStorage.setItem(key, JSON.stringify(value));
}

export function newId(): string {
  return crypto.randomUUID();
}

/** Local (not UTC) date key so "today" matches the user's actual day. */
export function todayKey(): string {
  return dateKey(new Date());
}

export function dateKey(d: Date): string {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function getLibrary(): FoodItem[] {
  return readJson<FoodItem[]>(LIBRARY_KEY, seedLibrary);
}

export function saveLibrary(items: FoodItem[]): void {
  writeJson(LIBRARY_KEY, items);
}

export function getLogEntries(): LogEntry[] {
  return readJson<LogEntry[]>(LOGS_KEY, []);
}

export function saveLogEntries(entries: LogEntry[]): void {
  writeJson(LOGS_KEY, entries);
}
