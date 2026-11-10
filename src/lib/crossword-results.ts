import { FIREBASE_RESULTS_API_URL } from './crossword-results-config';
export const PUZZLE_VERSION = 'mg-crossword-v3';
export const RESULTS_SESSION_KEY = 'mg-crossword-ranked-v3';
export const RESULTS_ENDPOINT = import.meta.env.VITE_CROSSWORD_API_URL?.trim() || FIREBASE_RESULTS_API_URL;
export type Result = {
  attemptId: string; displayName: string; startedAt: number; submittedAt: number | null;
  revision: number; checks: number; elapsedSeconds: number;
  correctWords?: number; totalWords?: number; correctLetters?: number; totalLetters?: number;
};
export type Attempt = Result & { token: string };
export type Leader = Required<Pick<Result, 'attemptId' | 'displayName' | 'correctWords' | 'totalWords' | 'checks' | 'elapsedSeconds'>> & { rank: number };
export type Board = { total: number; rows: Leader[] };
export async function resultsRequest<T>(action: string, body: Record<string, unknown> = {}, endpoint = RESULTS_ENDPOINT): Promise<T> {
  if (!endpoint) throw new Error('Results service is not configured');
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 20000);
  try {
    const response = await fetch(endpoint, { method: 'POST', credentials: 'omit', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...body, action, puzzleVersion: PUZZLE_VERSION }), signal: controller.signal });
    const data = await response.json();
    if (!response.ok || data.error) throw new Error(data.error || 'Unable to load results');
    return data as T;
  } catch (error) {
    if (error instanceof Error && error.name === 'AbortError') throw new Error('The results service took too long. Please retry.');
    throw error;
  } finally { clearTimeout(timer); }
}
export function readAttempt(): Attempt | null {
  try {
    const a = JSON.parse(localStorage.getItem(RESULTS_SESSION_KEY) ?? 'null');
    return a && typeof a.attemptId === 'string' && typeof a.token === 'string' && /^[a-f0-9]{64}$/.test(a.token) && typeof a.startedAt === 'number' ? a : null;
  } catch { return null; }
}
export function formatTime(seconds: number) {
  const minutes = Math.floor(Math.max(0, seconds) / 60), remainder = Math.floor(Math.max(0, seconds) % 60);
  return `${minutes}:${String(remainder).padStart(2, '0')}`;
}
