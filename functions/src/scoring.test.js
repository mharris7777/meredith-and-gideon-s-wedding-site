import { test } from 'node:test';
import assert from 'node:assert/strict';
import { scoreResponses, validateResponses, publicResult, rankedRows } from './scoring.js';
import { solution, words } from './puzzle.js';
test('scores full words only when every crossing cell is correct', () => {
  assert.equal(scoreResponses(solution).correctWords, 33);
  assert.equal(scoreResponses({}).correctWords, 0);
  const word = words[0];
  const partial = Object.fromEntries(word.cells.map(k => [k, solution[k]]));
  assert.equal(scoreResponses(partial).correctWords, 1);
  partial[word.cells[0]] = solution[word.cells[0]] === 'A' ? 'B' : 'A';
  assert.equal(scoreResponses(partial).correctWords, 0);
});
test('rejects unknown cells, arrays, lowercase letters, and script values', () => {
  for (const value of [null, [], { bad: 'A' }, { [Object.keys(solution)[0]]: '<script>' }, { [Object.keys(solution)[0]]: 'a' }]) assert.throws(() => validateResponses(value));
});
test('public results never expose answers, tokens, or unrequested correctness', () => {
  const data = { displayName: 'Test', startedAt: Date.now(), submittedAt: null, revision: 1, checks: 0, submitted: false,
    responses: solution, tokenHash: 'private', ...scoreResponses(solution), elapsedSeconds: 0 };
  const result = publicResult('id', data);
  assert.equal(result.responses, undefined); assert.equal(result.tokenHash, undefined); assert.equal(result.correctWords, undefined);
  assert.equal(publicResult('id', data, true).correctWords, 33);
});
test('equal results share a rank and submitted metadata is limited', () => {
  const row = { displayName: 'Test', submitted: true, startedAt: 1, submittedAt: 2, checks: 0, elapsedSeconds: 60, ...scoreResponses(solution) };
  const ranked = rankedRows([{ id: 'a', data: row }, { id: 'b', data: row }, { id: 'c', data: { ...row, checks: 1 } }]);
  assert.deepEqual(ranked.map(r => r.rank), [1, 1, 3]);
  assert.equal(ranked[0].startedAt, undefined); assert.equal(ranked[0].submittedAt, undefined);
});

test('deployed scoring matches the current crossword grid', async () => {
  const { readFileSync } = await import('node:fs');
  const text = readFileSync(new URL('../../src/lib/crossword-data.ts', import.meta.url), 'utf8');
  const data = JSON.parse(text.slice(text.indexOf('{\n')).trim().replace(/;$/, ''));
  const expected = {};
  for (const entry of data.entries) for (const [i, letter] of Array.from(entry.answer).entries()) {
    expected[`${entry.row + (entry.direction === 'down' ? i : 0)},${entry.col + (entry.direction === 'across' ? i : 0)}`] = letter;
  }
  assert.deepEqual(solution, expected);
  assert.equal(words.length, data.entries.length);
});
