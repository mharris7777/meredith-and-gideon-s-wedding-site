import { PGlite } from '@electric-sql/pglite';
import { readFileSync } from 'node:fs';
export async function createTestDatabase() {
  const db = new PGlite();
  await db.exec('create role anon; create role authenticated;');
  for (const name of ['202611110001_crossword_results.sql', '202611110002_seed_crossword.sql']) {
    await db.exec(readFileSync(new URL('../migrations/'+name, import.meta.url), 'utf8'));
  }
  const puzzle = (await db.query('select * from crossword_private.puzzles')).rows[0];
  await db.exec('set role anon');
  return { db, puzzle };
}
export const calls = {
  cw_start: ['select public.cw_start($1,$2) as result', ['p_puzzle_id','p_display_name']],
  cw_attempt: ['select public.cw_attempt($1,$2) as result', ['p_attempt_id','p_token']],
  cw_save: ['select public.cw_save($1,$2,$3::jsonb,$4,$5,$6) as result', ['p_attempt_id','p_token','p_responses','p_revision','p_action','p_event_id']],
  cw_leaderboard: ['select public.cw_leaderboard($1) as result', ['p_puzzle_id']],
};
export async function rpc(db, name, params) {
  const [sql, keys] = calls[name] ?? [];
  if (!sql) throw new Error('Unknown RPC');
  const values = keys.map(k => k === 'p_responses' ? JSON.stringify(params[k]) : params[k] ?? null);
  return (await db.query(sql, values)).rows[0].result;
}
