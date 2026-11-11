import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createTestDatabase, rpc } from './helpers.mjs';

test('Postgres enforces private responses, server scores, immutable results, and ranking', async () => {
  const { db, puzzle } = await createTestDatabase();
  try {
    const start = name => rpc(db, 'cw_start', { p_puzzle_id: puzzle.id, p_display_name: name });
    const save = (a, responses, revision, action='save', eventId=null) => rpc(db,'cw_save', {
      p_attempt_id:a.attemptId,p_token:a.token,p_responses:responses,p_revision:revision,p_action:action,p_event_id:eventId,
    });
    const a = await start('Guest One');
    assert.match(a.token, /^[a-f0-9]{64}$/); assert.equal(typeof a.startedAt, 'number');
    await assert.rejects(() => db.query('select responses from crossword_private.attempts'));
    await assert.rejects(() => rpc(db,'cw_attempt',{p_attempt_id:a.attemptId,p_token:'wrong-token'}));
    assert.equal((await save(a,puzzle.solution,2)).correctWords,undefined);
    await save(a,{},1);
    const restored=await rpc(db,'cw_attempt',{p_attempt_id:a.attemptId,p_token:a.token});
    assert.deepEqual(restored.responses,puzzle.solution);
    const eventId='00000000-0000-4000-8000-000000000001';
    assert.equal((await save(a,puzzle.solution,3,'check',eventId)).checks,1);
    assert.equal((await save(a,puzzle.solution,3,'check',eventId)).checks,1);
    const submitted=await save(a,puzzle.solution,4,'submit');
    assert.equal(submitted.correctWords,33); assert.equal(submitted.totalWords,33); assert.ok(submitted.submittedAt);
    assert.ok(submitted.elapsedSeconds>=1);
    assert.equal((await save(a,{},5)).correctWords,33);
    const b=await start('Partial Guest');
    const partial=Object.fromEntries(puzzle.words[0].cells.map(k=>[k,puzzle.solution[k]]));
    await assert.rejects(()=>save(b,{bad:'A'},1));
    await assert.rejects(()=>save(b,{'0,0':'<script>'},1));
    assert.equal((await save(b,partial,2,'submit')).correctWords,1);
    const c=await start('No Checks'); await save(c,puzzle.solution,1,'submit');
    const board=await rpc(db,'cw_leaderboard',{p_puzzle_id:puzzle.id});
    assert.equal(board.rows[0].displayName,'No Checks'); assert.equal(board.rows[1].displayName,'Guest One');
    assert.equal(board.rows[0].responses,undefined); assert.equal(board.rows[0].token,undefined); assert.equal(board.total,3);
    assert.equal(board.rows[2].correctWords,1);
    console.log('Passed: SQL permissions, attempt tokens, private saves, stale writes, idempotent checks, 33-word grading, immutable submissions, leaderboard.');
  } finally { await db.close(); }
});

test('database scoring seed matches the current browser puzzle', async () => {
  const { db, puzzle } = await createTestDatabase();
  try {
    const source=readFileSync(new URL('../../src/lib/crossword-data.ts',import.meta.url),'utf8');
    const data=JSON.parse(source.slice(source.indexOf('{\n')).trim().replace(/;$/,''));
    const expected={};
    for(const entry of data.entries) for(const [i,letter]of Array.from(entry.answer).entries()) {
      expected[`${entry.row+(entry.direction==='down'?i:0)},${entry.col+(entry.direction==='across'?i:0)}`]=letter;
    }
    assert.deepEqual(puzzle.solution,expected); assert.equal(puzzle.words.length,data.entries.length);
  } finally { await db.close(); }
});
