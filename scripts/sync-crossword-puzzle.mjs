import { readFileSync, writeFileSync } from 'node:fs';
const source = readFileSync(new URL('../src/lib/crossword-data.ts', import.meta.url), 'utf8');
const data = JSON.parse(source.slice(source.indexOf('{\n')).trim().replace(/;$/, ''));
const versionSource = readFileSync(new URL('../src/lib/crossword-results.ts', import.meta.url), 'utf8');
const version = versionSource.match(/PUZZLE_VERSION = '([^']+)'/)?.[1];
if (!version) throw new Error('Puzzle version not found');
const solution = {}, words = [];
for (const entry of data.entries) {
  const cells = [];
  for (const [i, letter] of Array.from(entry.answer).entries()) {
    const key = `${entry.row + (entry.direction === 'down' ? i : 0)},${entry.col + (entry.direction === 'across' ? i : 0)}`;
    if (solution[key] && solution[key] !== letter) throw new Error('Invalid crossing at '+key);
    solution[key] = letter; cells.push(key);
  }
  words.push({ id: entry.id, cells });
}
writeFileSync(new URL('../functions/src/puzzle.js', import.meta.url), `export const puzzleVersion = ${JSON.stringify(version)};\nexport const solution = ${JSON.stringify(solution)};\nexport const words = ${JSON.stringify(words)};\n`);
console.log(`Synced ${words.length} words for ${version}.`);
