import { puzzle, type Entry } from './crossword-data';
export const cellKey = (row: number, col: number) => `${row},${col}`;
export const entryCells = (entry: Entry) => Array.from(entry.answer, (_, i) => cellKey(entry.row + (entry.direction === 'down' ? i : 0), entry.col + (entry.direction === 'across' ? i : 0)));
export const solution: Record<string, string> = {};
export const memberships: Record<string, Entry[]> = {};
export const numbers: Record<string, number> = {};
for (const entry of puzzle.entries) {
  numbers[cellKey(entry.row, entry.col)] = entry.number;
  entryCells(entry).forEach((key, i) => {
    solution[key] = entry.answer[i];
    (memberships[key] ??= []).push(entry);
  });
}
export const STORAGE_KEY = 'mg-crossword-v2';
export function readProgress(): Record<string, string> {
  try {
    const saved: unknown = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '{}');
    if (!saved || typeof saved !== 'object' || Array.isArray(saved)) return {};
    return Object.fromEntries(Object.entries(saved).filter(([key, value]) => key in solution && typeof value === 'string' && /^[A-Z]$/.test(value)));
  } catch { return {}; }
}
export const cleanAnswer = (text: string) => text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toUpperCase().replace(/[^A-Z]/g, '');

export const themeCells = new Set(puzzle.entries.filter(entry => entry.theme === "wedding").flatMap(entryCells));
