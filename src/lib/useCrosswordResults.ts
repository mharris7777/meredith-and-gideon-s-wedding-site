import { useCallback, useEffect, useRef, useState } from 'react';
import { resultsRequest, readAttempt, RESULTS_ENDPOINT, RESULTS_SESSION_KEY, type Attempt, type Result, type Board } from './crossword-results';
import { solution } from './crossword';

type Letters = Record<string, string>;
export function useCrosswordResults(letters: Letters, onRestore: (letters: Letters) => void, onRestart: () => void) {
  const [attempt, setAttempt] = useState<Attempt | null>(() => RESULTS_ENDPOINT ? readAttempt() : null);
  const attemptRef = useRef(attempt);
  const restoreRef = useRef(onRestore), restartRef = useRef(onRestart);
  restoreRef.current = onRestore; restartRef.current = onRestart;
  const [ready, setReady] = useState(!attempt);
  const readyRef = useRef(ready);
  const [busy, setBusy] = useState(false), [saving, setSaving] = useState(false);
  const [error, setError] = useState(''), [saved, setSaved] = useState(false);
  const [board, setBoard] = useState<Board>({ total: 0, rows: [] });
  const [boardError, setBoardError] = useState('');
  const [boardLoading, setBoardLoading] = useState(Boolean(RESULTS_ENDPOINT));
  const revision = useRef(attempt?.revision ?? 0);
  const queue = useRef<Promise<unknown>>(Promise.resolve());
  const lastSaved = useRef('');
  const configured = Boolean(RESULTS_ENDPOINT);
  const put = useCallback((next: Attempt | null) => {
    attemptRef.current = next; setAttempt(next);
    try { if (next) localStorage.setItem(RESULTS_SESSION_KEY, JSON.stringify(next)); else localStorage.removeItem(RESULTS_SESSION_KEY); } catch { /* Session stays available while this page is open. */ }
  }, []);
  const refreshBoard = useCallback(async () => {
    if (!RESULTS_ENDPOINT) return;
    setBoardLoading(true);
    try { setBoard(await resultsRequest<Board>('leaderboard')); setBoardError(''); }
    catch { setBoardError('Unable to load the leaderboard. Please retry.'); }
    finally { setBoardLoading(false); }
  }, []);
  const restore = useCallback(async () => {
    const current = attemptRef.current;
    if (!current || !RESULTS_ENDPOINT) return;
    setBusy(true); setError('');
    try {
      const data = await resultsRequest<Result & { responses: Letters }>('resume', { attemptId: current.attemptId, token: current.token });
      const safe = Object.fromEntries(Object.entries(data.responses).filter(([key, value]) => Object.prototype.hasOwnProperty.call(solution, key) && /^[A-Z]$/.test(value)));
      const { responses: _, ...metadata } = data;
      put({ ...metadata, token: current.token }); revision.current = data.revision;
      lastSaved.current = JSON.stringify(safe); restoreRef.current(safe); readyRef.current = true; setReady(true); setSaved(true);
    } catch (e) { setError(e instanceof Error ? e.message : 'Unable to restore saved answers'); }
    finally { setBusy(false); }
  }, [put]);
  useEffect(() => { void restore(); void refreshBoard(); }, [restore, refreshBoard]);

  const persist = useCallback((action: 'save' | 'check' | 'submit', snapshot: Letters) => {
    const session = attemptRef.current;
    if (!session || !readyRef.current || session.submittedAt) return Promise.resolve<Result | null>(null);
    const nextRevision = ++revision.current;
    const eventId = action === 'check' ? crypto.randomUUID() : undefined;
    const task = queue.current.catch(() => undefined).then(async () => {
      setSaving(true);
      try {
        const result = await resultsRequest<Result>(action, { attemptId: session.attemptId, token: session.token, responses: snapshot, revision: nextRevision, eventId });
        const current = attemptRef.current;
        if (current?.attemptId === session.attemptId) {
          put({ ...current, ...result, submittedAt: result.submittedAt || current.submittedAt, token: current.token });
          lastSaved.current = JSON.stringify(snapshot); setSaved(true); setError('');
        }
        return result;
      } catch (e) { setError(e instanceof Error ? e.message : 'Unable to save answers'); setSaved(false); throw e; }
      finally { setSaving(false); }
    });
    queue.current = task;
    return task;
  }, [put]);
  useEffect(() => {
    if (!attempt || !ready || attempt.submittedAt || JSON.stringify(letters) === lastSaved.current) return;
    setSaved(false);
    const timer = setTimeout(() => { void persist('save', letters).catch(() => undefined); }, 1000);
    return () => clearTimeout(timer);
  }, [letters, attempt?.attemptId, attempt?.submittedAt, ready, persist]);

  const start = async (displayName: string) => {
    setBusy(true); setError('');
    try {
      const data = await resultsRequest<Attempt>('start', { displayName });
      put(data); revision.current = data.revision; lastSaved.current = '{}'; readyRef.current = true; setReady(true); setSaved(true);
      restartRef.current(); return true;
    } catch (e) { setError(e instanceof Error ? e.message : 'Unable to start ranked play'); return false; }
    finally { setBusy(false); }
  };
  const check = async () => {
    if (!attemptRef.current || attemptRef.current.submittedAt) return true;
    if (!readyRef.current) return false;
    setBusy(true);
    try { await persist('check', letters); return true; } catch { return false; } finally { setBusy(false); }
  };
  const submit = async () => {
    setBusy(true);
    try { await persist('submit', letters); await refreshBoard(); return true; } catch { return false; } finally { setBusy(false); }
  };
  const retrySave = async () => { if (!readyRef.current) await restore(); else { try { await persist('save', letters); } catch { /* Error is displayed above. */ } } };
  const abandon = () => { put(null); readyRef.current = true; setReady(true); setError(''); setSaved(false); };
  return { configured, attempt, ready, busy, saving, saved, error, board, boardError, boardLoading, abandon, start, check, submit, refreshBoard, retrySave };
}
