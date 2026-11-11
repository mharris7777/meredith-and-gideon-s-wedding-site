import { SUPABASE_PROJECT_URL, SUPABASE_PUBLISHABLE_KEY } from './crossword-results-config';
export const PUZZLE_VERSION = 'mg-crossword-v3';
export const RESULTS_SESSION_KEY = 'mg-crossword-ranked-v3';
const projectUrl = import.meta.env.VITE_SUPABASE_URL?.trim() || SUPABASE_PROJECT_URL;
const publishableKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY?.trim() || SUPABASE_PUBLISHABLE_KEY;
export const RESULTS_ENDPOINT = projectUrl && publishableKey ? projectUrl : '';
export type ResultsConfig = { url: string; publishableKey: string };
export type Result = {
  attemptId: string; displayName: string; startedAt: number; submittedAt: number | null;
  revision: number; checks: number; elapsedSeconds: number;
  correctWords?: number; totalWords?: number; correctLetters?: number; totalLetters?: number;
};
export type Attempt = Result & { token: string };
export type Leader = Required<Pick<Result, 'attemptId' | 'displayName' | 'correctWords' | 'totalWords' | 'checks' | 'elapsedSeconds'>> & { rank: number };
export type Board = { total: number; rows: Leader[] };
export function rpcRequest(action: string, body: Record<string, unknown>) {
  if (action === 'leaderboard') return { name: 'cw_leaderboard', params: { p_puzzle_id: PUZZLE_VERSION } };
  if (action === 'start') return { name: 'cw_start', params: { p_puzzle_id: PUZZLE_VERSION, p_display_name: body.displayName } };
  if (action === 'resume') return { name: 'cw_attempt', params: { p_attempt_id: body.attemptId, p_token: body.token } };
  if (!['save', 'check', 'submit'].includes(action)) throw new Error('Invalid results action');
  return { name: 'cw_save', params: { p_attempt_id: body.attemptId, p_token: body.token, p_responses: body.responses,
    p_revision: body.revision, p_action: action, p_event_id: body.eventId ?? null } };
}
export async function resultsRequest<T>(action: string, body: Record<string, unknown> = {}, config: ResultsConfig = { url: projectUrl, publishableKey }): Promise<T> {
  if (!config.url || !config.publishableKey) throw new Error('Results service is not configured');
  if (!config.publishableKey.startsWith('sb_publishable_')) throw new Error('A public Supabase publishable key is required');
  const rpc = rpcRequest(action, body);
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 20000);
  try {
    const response = await fetch(`${config.url.replace(/\/$/, '')}/rest/v1/rpc/${rpc.name}`, {
      method: 'POST', credentials: 'omit', headers: { 'Content-Type': 'application/json', apikey: config.publishableKey },
      body: JSON.stringify(rpc.params), signal: controller.signal,
    });
    let data;
    try { data = await response.json(); } catch { throw new Error('Unable to read results. Please retry.'); }
    if (!response.ok) throw new Error(typeof data?.message === 'string' ? data.message : 'Unable to save results. Please retry.');
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
