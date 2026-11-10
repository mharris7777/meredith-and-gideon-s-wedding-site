import { useEffect, useState, type FormEvent } from 'react';
import { formatTime } from '@/lib/crossword-results';
import type { useCrosswordResults } from '@/lib/useCrosswordResults';
import './CrosswordLeaderboard.css';
type Props = { results: ReturnType<typeof useCrosswordResults> };
const CrosswordLeaderboard = ({ results }: Props) => {
  const [name, setName] = useState('');
  const [confirmSubmit, setConfirmSubmit] = useState(false);
  const [clock, setClock] = useState(Date.now());
  const a = results.attempt;
  useEffect(() => { if (!a || a.submittedAt) return; const timer = setInterval(() => setClock(Date.now()), 1000); return () => clearInterval(timer); }, [a?.attemptId, a?.submittedAt]);
  if (!results.configured) return null;
  const start = async (event: FormEvent) => { event.preventDefault(); await results.start(name); setConfirmSubmit(false); };
  const elapsed = a?.submittedAt ? a.elapsedSeconds : a ? Math.max(0, Math.floor((clock - a.startedAt) / 1000)) : 0;
  return <section id="crossword-results" className="crossword-leaderboard" aria-labelledby="leaderboard-heading">
    <div className="crossword-ranking-entry">
      <p className="overline">A friendly competition</p>
      <h2>How well do you know us?</h2>
      {!a || a.submittedAt ? <>
        {a?.submittedAt && <p className="crossword-score" role="status">{a.displayName}: {a.correctWords}/{a.totalWords} correct · {a.checks} checks · {formatTime(a.elapsedSeconds)}</p>}
        <p>Choose a display name to join the leaderboard. Starting a ranked attempt clears this puzzle and starts a new timer.</p>
        <form onSubmit={start} className="crossword-name-form">
          <label htmlFor="leaderboard-name">Name shown on the leaderboard</label>
          <input id="leaderboard-name" autoComplete="nickname" maxLength={32} minLength={2} required value={name} onChange={e => setName(e.target.value)} placeholder="First name or nickname" />
          <button type="submit" disabled={results.busy} className="btn-outline">{results.busy ? 'Starting…' : a ? 'Play a new ranked puzzle' : 'Start ranked puzzle'}</button>
        </form>
        <p className="crossword-ranking-note">Your display name and score are shared. Your answers stay private.</p>
      </> : <>
        <p className="crossword-score">Playing as {a.displayName} · {formatTime(elapsed)} · {a.checks} answer checks</p>
        <p className="crossword-ranking-note">Time runs from the moment you start, including breaks. Rank is based on correct words, then fewer checks, then time.</p>
        <p aria-live="polite">{!results.ready ? 'Restoring your ranked attempt…' : results.saving ? 'Saving answers…' : results.saved ? 'Answers saved' : 'Changes waiting to save'}</p>
        {!confirmSubmit ? <button type="button" disabled={results.busy || !results.ready} className="btn-primary" onClick={() => setConfirmSubmit(true)}>Submit score</button> : <div className="crossword-submit-confirm" role="group" aria-label="Confirm score submission">
          <p>Submit these answers? Your score will be final, even if the puzzle is unfinished.</p>
          <button type="button" disabled={results.busy} className="btn-primary" onClick={async () => { if (await results.submit()) setConfirmSubmit(false); }}>{results.busy ? 'Submitting…' : 'Yes, submit score'}</button>
          <button type="button" disabled={results.busy} className="btn-ghost" onClick={() => setConfirmSubmit(false)}>Keep solving</button>
        </div>}
      </>}
      {results.error && <div role="alert"><p>{results.error}</p>{a && !a.submittedAt && <button type="button" disabled={results.busy} className="btn-ghost" onClick={() => void results.retrySave()}>Retry</button>}{a && !a.submittedAt && <button type="button" className="btn-ghost" onClick={results.abandon}>Continue without leaderboard</button>}</div>}
    </div>
    <div>
      <div className="crossword-board-heading"><h2 id="leaderboard-heading">Leaderboard</h2><button type="button" className="btn-ghost" onClick={() => void results.refreshBoard()}>Refresh</button></div>
      <p className="crossword-ranking-note">Most correct words first, then fewer checks, then fastest time. Showing the top 50 submitted attempts.</p>
      {results.boardLoading ? <p role="status">Loading scores…</p> : results.boardError ? <p role="alert">{results.boardError}</p> : results.board.rows.length === 0 ? <p className="crossword-board-empty">No scores yet. Be the first to finish!</p> : <div className="crossword-table-scroll"><table>
        <caption className="sr-only">Crossword leaderboard, {results.board.total} submitted attempts</caption>
        <thead><tr><th scope="col">Rank</th><th scope="col">Name</th><th scope="col">Correct</th><th scope="col">Checks</th><th scope="col">Time</th></tr></thead>
        <tbody>{results.board.rows.map(row => <tr key={row.attemptId} className={row.attemptId === a?.attemptId ? 'your-score' : ''}>
          <td>{row.rank}</td><th scope="row">{row.displayName}{row.attemptId === a?.attemptId && <small> (you)</small>}</th><td>{row.correctWords}/{row.totalWords}</td><td>{row.checks}</td><td>{formatTime(row.elapsedSeconds)}</td>
        </tr>)}</tbody>
      </table></div>}
    </div>
  </section>;
};
export default CrosswordLeaderboard;
