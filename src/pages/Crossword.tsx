import { useEffect, useRef, useState, type KeyboardEvent } from 'react';
import Navigation from '@/components/Navigation';
import { puzzle, type Entry } from '@/lib/crossword-data';
import { cellKey, entryCells, solution, memberships, numbers, STORAGE_KEY, readProgress, cleanAnswer, themeCells } from '@/lib/crossword';
import './Crossword.css';

const sorted = [...puzzle.entries].sort((a, b) => a.number - b.number);
const first = sorted.find(entry => entry.direction === 'across')!;
const Crossword = () => {
  const [letters, setLetters] = useState<Record<string, string>>(readProgress);
  const [selected, setSelected] = useState<Entry>(first);
  const [activeCell, setActiveCell] = useState(entryCells(first)[0]);
  const [checked, setChecked] = useState(false);
  const [confirmReset, setConfirmReset] = useState(false);
  const gridRef = useRef<HTMLDivElement>(null);
  const currentCells = entryCells(selected);
  const themeSelected = selected.theme === "wedding";
  const filled = Object.keys(letters).filter(key => solution[key] && letters[key]).length;
  const complete = Object.entries(solution).every(([key, value]) => letters[key] === value);

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(letters)); } catch { /* The puzzle still works without storage. */ }
  }, [letters]);

  const chooseEntry = (entry: Entry) => {
    setSelected(entry);
    setActiveCell(entryCells(entry).find(key => !letters[key]) ?? entryCells(entry)[0]);
  };
  const chooseCell = (key: string) => {
    const choices = memberships[key];
    const same = choices.find(entry => entry.direction === selected.direction) ?? choices[0];
    setSelected(key === activeCell && choices.length > 1 ? choices.find(entry => entry.id !== selected.id) ?? same : same);
    setActiveCell(key);
  };
  const focusCell = (key: string) => {
    setActiveCell(key);
    gridRef.current?.querySelector<HTMLButtonElement>(`[data-cell="${key}"]`)?.focus();
  };
  const moveInWord = (delta: number) => {
    const next = currentCells[Math.max(0, Math.min(currentCells.length - 1, currentCells.indexOf(activeCell) + delta))];
    focusCell(next);
  };
  const onGridKey = (event: KeyboardEvent<HTMLDivElement>) => {
    if (/^[a-zA-Z]$/.test(event.key)) {
      event.preventDefault();
      setLetters(previous => ({ ...previous, [activeCell]: event.key.toUpperCase() }));
      moveInWord(1);
    } else if (event.key === 'Backspace' || event.key === 'Delete') {
      event.preventDefault();
      const key = event.key === 'Backspace' && !letters[activeCell] ? currentCells[Math.max(0, currentCells.indexOf(activeCell) - 1)] : activeCell;
      setLetters(previous => { const next = { ...previous }; delete next[key]; return next; });
      focusCell(key);
    } else if (event.key.startsWith('Arrow')) {
      event.preventDefault();
      const direction = ['ArrowLeft', 'ArrowRight'].includes(event.key) ? 'across' : 'down';
      const entry = memberships[activeCell].find(item => item.direction === direction);
      if (entry) {
        const keys = entryCells(entry);
        const delta = ['ArrowLeft', 'ArrowUp'].includes(event.key) ? -1 : 1;
        setSelected(entry);
        focusCell(keys[Math.max(0, Math.min(keys.length - 1, keys.indexOf(activeCell) + delta))]);
      }
    } else if (event.key === ' ' || event.key === 'Enter') {
      event.preventDefault(); chooseCell(activeCell);
    }
  };
  const writeAnswer = (text: string) => {
    const answer = cleanAnswer(text).slice(0, selected.answer.length);
    setLetters(previous => {
      const next = { ...previous };
      currentCells.forEach((key, i) => { if (answer[i]) next[key] = answer[i]; else delete next[key]; });
      return next;
    });
  };

  return (
    <div className="crossword-page min-h-screen homepage-gradient">
      <Navigation />
      <main className="crossword-main">
        <header className="crossword-heading">
          <p className="overline">A little about us</p>
          <h1>Love, Across &amp; Down</h1>
          <p>How well do you know Meredith &amp; Gideon? Solve all 33 clues.</p>
          <p className="crossword-hint">Tap a clue or square to begin. Selecting a wedding-wordplay clue shades its related answers. Use letters only—no spaces, accents, or punctuation.</p>
        </header>
        <div className="crossword-layout">
          <section className="crossword-play" aria-label="Crossword puzzle">
            <div className="crossword-selected" aria-live="polite">
              <span className="overline">{selected.number} {selected.direction} · {selected.answer.length} letters</span>
              <p>{selected.clue}</p>
              {themeSelected && <small className="crossword-theme-note">Wedding wordplay · All five linked entries are shaded.</small>}
            </div>
            <div className="crossword-board" ref={gridRef} role="grid" aria-label="Wedding crossword" aria-rowcount={puzzle.rows} aria-colcount={puzzle.cols} onKeyDown={onGridKey}>
              {Array.from({ length: puzzle.rows }, (_, row) => (
                <div key={row} role="row" className="crossword-row" style={{ gridTemplateColumns: `repeat(${puzzle.cols}, minmax(0, 1fr))` }}>
                  {Array.from({ length: puzzle.cols }, (_, col) => {
                    const key = cellKey(row, col);
                    if (!solution[key]) return <span key={key} role="gridcell" aria-label="Black square" className="crossword-black" />;
                    const wrong = checked && Boolean(letters[key]) && letters[key] !== solution[key];
                    return <button key={key} data-cell={key} role="gridcell" aria-rowindex={row + 1} aria-colindex={col + 1}
                      aria-label={`Row ${row + 1}, column ${col + 1}${numbers[key] ? `, clue ${numbers[key]}` : ''}: ${letters[key] || 'empty'}${wrong ? ', incorrect' : ''}${themeSelected && themeCells.has(key) ? ', linked wedding-theme square' : ''}`}
                      aria-selected={currentCells.includes(key)} tabIndex={activeCell === key ? 0 : -1}
                      onClick={() => chooseCell(key)}
                      className={`crossword-cell ${themeSelected && themeCells.has(key) ? 'theme-related' : ''} ${currentCells.includes(key) ? 'word-selected' : ''} ${activeCell === key ? 'cell-active' : ''} ${wrong ? 'cell-wrong' : ''}`}>
                      {numbers[key] && <span className="crossword-number">{numbers[key]}</span>}
                      <span className="crossword-letter">{letters[key] ?? ''}</span>
                    </button>;
                  })}
                </div>
              ))}
            </div>
            <label className="crossword-answer-label" htmlFor="crossword-answer">Type your answer for {selected.number} {selected.direction}</label>
            <input id="crossword-answer" className="crossword-answer" value={currentCells.map(key => letters[key] || ' ').join('').trimEnd()}
              onFocus={event => event.currentTarget.select()} onChange={event => writeAnswer(event.target.value)} autoComplete="off" autoCapitalize="characters" spellCheck={false}
              aria-describedby="crossword-answer-help" />
            <p id="crossword-answer-help" className="crossword-help">Or type directly on the grid. Arrow keys move; tap an intersection twice to switch direction.</p>
            <div className="crossword-actions">
              <button type="button" className="btn-outline" onClick={() => setChecked(value => !value)}>{checked ? 'Hide checks' : 'Check answers'}</button>
              <button type="button" className="btn-ghost" onClick={() => setConfirmReset(true)}>Start over</button>
            </div>
            {confirmReset && <div className="crossword-reset" role="group" aria-label="Confirm starting over">
              <p>Clear all your answers?</p>
              <button type="button" className="btn-ghost" onClick={() => { setLetters({}); setChecked(false); setConfirmReset(false); }}>Yes, clear puzzle</button>
              <button type="button" className="btn-ghost" onClick={() => setConfirmReset(false)}>Keep playing</button>
            </div>}
            <p className="crossword-progress" role="status">{complete ? 'You solved it! You know us by heart. ♡' : `${filled} of ${Object.keys(solution).length} squares filled${checked ? ' · Incorrect letters are marked with a dotted underline.' : ''}`}</p>
            <p className="crossword-help">Your progress is saved in this browser when storage is available.</p>
          </section>
          <aside className="crossword-clues" aria-label="Crossword clues">
            {(['across', 'down'] as const).map(direction => <section key={direction}>
              <h2>{direction === 'across' ? 'Across' : 'Down'}</h2>
              <ol>{sorted.filter(entry => entry.direction === direction).map(entry => <li key={entry.id}>
                <button type="button" aria-pressed={selected.id === entry.id} onClick={() => chooseEntry(entry)} className={`${selected.id === entry.id ? 'clue-selected' : ''} ${themeSelected && entry.theme === 'wedding' ? 'clue-related' : ''}`}>
                  <span className="clue-number">{entry.number}</span><span>{entry.clue} <small>({entry.answer.length})</small>{entry.theme === 'wedding' && <span className="crossword-theme-tag">Wedding wordplay</span>}</span>
                </button>
              </li>)}</ol>
            </section>)}
          </aside>
        </div>
      </main>
    </div>
  );
};
export default Crossword;
