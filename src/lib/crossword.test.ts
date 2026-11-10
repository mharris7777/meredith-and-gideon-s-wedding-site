import { describe, expect, it } from 'vitest';
import { puzzle } from './crossword-data';
import { solution, memberships, entryCells, cellKey, cleanAnswer } from './crossword';

describe('wedding crossword', () => {
  it('includes every clue and consistent crossing letters', () => {
    expect(puzzle.entries).toHaveLength(33);
    expect(new Set(puzzle.entries.map(entry => entry.answer)).size).toBe(33);
    for (const entry of puzzle.entries) {
      expect(entry.answer).toMatch(/^[A-Z]+$/);
      entryCells(entry).forEach((key, i) => expect(solution[key]).toBe(entry.answer[i]));
    }
    for (const entries of Object.values(memberships)) {
      expect(entries.length).toBeLessThanOrEqual(2);
      if (entries.length === 2) expect(entries[0].direction).not.toBe(entries[1].direction);
    }
  });
  it('has no unintended words or adjacent runs', () => {
    for (const direction of ['across', 'down'] as const) for (let row = 0; row < puzzle.rows; row++) for (let col = 0; col < puzzle.cols; col++) {
      const dr = direction === 'down' ? 1 : 0, dc = direction === 'across' ? 1 : 0;
      if (!solution[cellKey(row, col)] || solution[cellKey(row - dr, col - dc)]) continue;
      let word = '', i = 0;
      while (solution[cellKey(row + i * dr, col + i * dc)]) { word += solution[cellKey(row + i * dr, col + i * dc)]; i++; }
      if (word.length < 2) continue;
      expect(puzzle.entries.some(entry => entry.row === row && entry.col === col && entry.direction === direction && entry.answer === word)).toBe(true);
    }
  });
  it('forms a single connected grid with sequential clue numbers', () => {
    const visited = new Set<string>(), queue = [Object.keys(solution)[0]];
    while (queue.length) {
      const key = queue.pop()!;
      if (visited.has(key)) continue;
      visited.add(key);
      const [r, c] = key.split(',').map(Number);
      for (const next of [cellKey(r - 1, c), cellKey(r + 1, c), cellKey(r, c - 1), cellKey(r, c + 1)]) if (solution[next] && !visited.has(next)) queue.push(next);
    }
    expect(visited.size).toBe(Object.keys(solution).length);
    const numbers = [...new Set(puzzle.entries.map(entry => entry.number))].sort((a, b) => a - b);
    expect(numbers).toEqual(Array.from({ length: numbers.length }, (_, i) => i + 1));
  });
  it('links the revealer and exactly four wedding-wordplay answers', () => {
    const themed = puzzle.entries.filter(entry => entry.theme === 'wedding');
    expect(themed.map(entry => entry.answer).sort()).toEqual(['WEDDING', 'TIETHEKNOT', 'TAKETHEPLUNGE', 'PERFECTMATCH', 'SEALEDWITHAKISS'].sort());
    expect(themed.find(entry => entry.answer === 'WEDDING')?.direction).toBe('across');
    expect(puzzle.entries.some(entry => entry.answer === 'KNUCKLES')).toBe(false);
  });
  it('normalizes accented and multiword answers', () => {
    expect(cleanAnswer('Beyoncé')).toBe('BEYONCE');
    expect(cleanAnswer('Jay-Z')).toBe('JAYZ');
    expect(cleanAnswer('Urban Studies')).toBe('URBANSTUDIES');
  });
});
