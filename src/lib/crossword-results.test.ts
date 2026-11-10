import { afterEach, describe, expect, it, vi } from 'vitest';
import { formatTime, resultsRequest, PUZZLE_VERSION, readAttempt, RESULTS_SESSION_KEY } from './crossword-results';
afterEach(() => { vi.unstubAllGlobals(); localStorage.clear(); });
describe('crossword results client', () => {
  it('posts only to the configured service and includes the puzzle version', async () => {
    const fetch = vi.fn().mockResolvedValue({ ok: true, json: async () => ({ total: 0, rows: [] }) }); vi.stubGlobal('fetch', fetch);
    await resultsRequest('leaderboard', {}, 'https://example.test/api');
    expect(JSON.parse(fetch.mock.calls[0][1].body)).toEqual({ action: 'leaderboard', puzzleVersion: PUZZLE_VERSION });
    expect(fetch.mock.calls[0][1].credentials).toBe('omit');
  });
  it('does not report a failed save as success', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: false, json: async () => ({ error: 'Save failed' }) }));
    await expect(resultsRequest('save', {}, 'https://example.test')).rejects.toThrow('Save failed');
  });
  it('handles unavailable browser storage and invalid sessions', () => {
    localStorage.setItem(RESULTS_SESSION_KEY, '{bad json'); expect(readAttempt()).toBe(null);
    localStorage.setItem(RESULTS_SESSION_KEY, JSON.stringify({ attemptId: 'x', token: 'invalid' })); expect(readAttempt()).toBe(null);
  });
  it('formats elapsed times consistently', () => { expect(formatTime(65)).toBe('1:05'); expect(formatTime(3600)).toBe('60:00'); });
});
