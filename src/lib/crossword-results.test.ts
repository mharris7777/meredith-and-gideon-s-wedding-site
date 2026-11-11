import { afterEach, describe, expect, it, vi } from 'vitest';
import { formatTime, resultsRequest, rpcRequest, PUZZLE_VERSION, readAttempt, RESULTS_SESSION_KEY } from './crossword-results';
afterEach(() => { vi.unstubAllGlobals(); localStorage.clear(); });
const config = { url: 'https://example.supabase.co', publishableKey: 'sb_publishable_test' };
describe('crossword results client', () => {
  it('uses the public key and leaderboard RPC without browser credentials', async () => {
    const fetch = vi.fn().mockResolvedValue({ ok: true, json: async () => ({ total: 0, rows: [] }) }); vi.stubGlobal('fetch', fetch);
    await resultsRequest('leaderboard', {}, config);
    expect(fetch.mock.calls[0][0]).toBe('https://example.supabase.co/rest/v1/rpc/cw_leaderboard');
    expect(JSON.parse(fetch.mock.calls[0][1].body)).toEqual({ p_puzzle_id: PUZZLE_VERSION });
    expect(fetch.mock.calls[0][1].headers.apikey).toBe(config.publishableKey);
    expect(fetch.mock.calls[0][1].credentials).toBe('omit');
  });
  it('maps save, check, submit, start, and restore to bounded RPC arguments', () => {
    expect(rpcRequest('start', { displayName: 'Guest' })).toEqual({ name: 'cw_start', params: { p_puzzle_id: PUZZLE_VERSION, p_display_name: 'Guest' } });
    expect(rpcRequest('resume', { attemptId: 'a', token: 't' }).name).toBe('cw_attempt');
    const save = rpcRequest('submit', { attemptId: 'a', token: 't', responses: {}, revision: 2, claimedScore: 999 });
    expect(save.params).toEqual({ p_attempt_id: 'a', p_token: 't', p_responses: {}, p_revision: 2, p_action: 'submit', p_event_id: null });
    expect(() => rpcRequest('arbitrary_function', {})).toThrow();
  });
  it('rejects secret keys and reports failed saves', async () => {
    await expect(resultsRequest('leaderboard', {}, { ...config, publishableKey: 'sb_secret_never_send' })).rejects.toThrow('public');
    const fetch = vi.fn().mockResolvedValue({ ok: false, json: async () => ({ message: 'Save failed' }) }); vi.stubGlobal('fetch', fetch);
    await expect(resultsRequest('save', {}, config)).rejects.toThrow('Save failed');
  });
  it('handles invalid sessions', () => {
    localStorage.setItem(RESULTS_SESSION_KEY, '{bad json'); expect(readAttempt()).toBe(null);
    localStorage.setItem(RESULTS_SESSION_KEY, JSON.stringify({ attemptId: 'x', token: 'invalid' })); expect(readAttempt()).toBe(null);
  });
  it('formats elapsed times consistently', () => { expect(formatTime(65)).toBe('1:05'); expect(formatTime(3600)).toBe('60:00'); });
});
