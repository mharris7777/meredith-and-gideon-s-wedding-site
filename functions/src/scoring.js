import { solution, words } from './puzzle.js';
export function validateResponses(responses) {
  if (!responses || Array.isArray(responses) || typeof responses !== 'object') throw new Error('Invalid responses');
  if (Object.keys(responses).length > Object.keys(solution).length) throw new Error('Too many answer cells');
  for (const [key, value] of Object.entries(responses)) {
    if (!Object.hasOwn(solution, key) || typeof value !== 'string' || !/^[A-Z]$/.test(value)) throw new Error('Invalid answer cells');
  }
  return responses;
}
export function scoreResponses(responses) {
  validateResponses(responses);
  return {
    correctWords: words.filter(word => word.cells.every(key => responses[key] === solution[key])).length,
    totalWords: words.length,
    correctLetters: Object.keys(solution).filter(key => responses[key] === solution[key]).length,
    totalLetters: Object.keys(solution).length,
  };
}
export function publicResult(attemptId, data, includeScore = false) {
  const result = { attemptId, displayName: data.displayName, startedAt: data.startedAt,
    submittedAt: data.submittedAt ?? null, revision: data.revision, checks: data.checks,
    elapsedSeconds: data.submitted ? data.elapsedSeconds : Math.max(0, Math.floor((Date.now() - data.startedAt) / 1000)) };
  if (includeScore || data.submitted) Object.assign(result, {
    correctWords: data.correctWords, totalWords: data.totalWords,
    correctLetters: data.correctLetters, totalLetters: data.totalLetters,
  });
  return result;
}
export function rankedRows(docs) {
  let previous = null, rank = 0;
  return docs.map(({ id, data }, index) => {
    const key = `${data.correctWords}/${data.checks}/${data.elapsedSeconds}`;
    if (key !== previous) rank = index + 1;
    previous = key;
    const { startedAt, submittedAt, revision, ...row } = publicResult(id, data, true);
    return { ...row, rank };
  });
}
