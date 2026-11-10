import { onRequest } from 'firebase-functions/v2/https';
import { initializeApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { randomBytes, randomUUID, createHash, timingSafeEqual } from 'node:crypto';
import { puzzleVersion } from './puzzle.js';
import { scoreResponses, validateResponses, publicResult, rankedRows } from './scoring.js';
initializeApp();
const db = getFirestore();
const attempts = db.collection('crosswordAttempts');
const hash = value => createHash('sha256').update(value).digest('hex');
const uuid = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const fail = (message, status = 400) => { throw Object.assign(new Error(message), { status }); };
function authorize(data, token) {
  if (!data || data.puzzleVersion !== puzzleVersion || typeof token !== 'string' || !/^[0-9a-f]{64}$/.test(token)) fail('Attempt not found', 404);
  const expected = Buffer.from(data.tokenHash, 'hex'), provided = Buffer.from(hash(token), 'hex');
  if (expected.length !== provided.length || !timingSafeEqual(expected, provided)) fail('Attempt not found', 404);
}

export const crosswordApi = onRequest({
  cors: process.env.FUNCTIONS_EMULATOR === 'true'
    ? ['https://mharris7777.github.io', /^http:\/\/(localhost|127\.0\.0\.1):\d+$/]
    : ['https://mharris7777.github.io'],
  region: 'us-central1',
  maxInstances: 5, concurrency: 20, timeoutSeconds: 30, memory: '256MiB',
}, async (req, res) => {
  res.set('Cache-Control', 'no-store');
  if (req.method !== 'POST') { res.status(405).json({ error: 'Use POST' }); return; }
  if ((req.rawBody?.length ?? 0) > 20000) { res.status(413).json({ error: 'Request too large' }); return; }
  try {
    const body = req.body;
    if (!body || typeof body !== 'object' || body.puzzleVersion !== puzzleVersion) fail('Puzzle version unavailable');
    if (body.action === 'leaderboard') {
      const query = attempts.where('puzzleVersion', '==', puzzleVersion).where('submitted', '==', true);
      const [scores, total] = await Promise.all([
        query.orderBy('correctWords', 'desc').orderBy('checks', 'asc').orderBy('elapsedSeconds', 'asc').limit(50).get(),
        query.count().get(),
      ]);
      res.json({ total: total.data().count, rows: rankedRows(scores.docs.map(doc => ({ id: doc.id, data: doc.data() }))) });
      return;
    }
    if (body.action === 'start') {
      const name = typeof body.displayName === 'string' ? body.displayName.trim() : '';
      if (name.length < 2 || name.length > 32 || /[\u0000-\u001f\u007f]/.test(name)) fail('Choose a display name between 2 and 32 characters');
      const now = Date.now();
      // Generous per-network limit for a shared wedding Wi-Fi; no raw IPs are stored.
      const rateKey = hash(`${req.ip ?? 'unknown'}/${Math.floor(now / 3600000)}`);
      const rateRef = db.collection('crosswordRateLimits').doc(rateKey);
      const id = randomUUID(), token = randomBytes(32).toString('hex');
      const data = { puzzleVersion, displayName: name, tokenHash: hash(token), responses: {}, revision: 0,
        startedAt: now, submittedAt: null, submitted: false, checks: 0, checkEvents: [], elapsedSeconds: 0, ...scoreResponses({}) };
      await db.runTransaction(async tx => {
        const rate = await tx.get(rateRef);
        if ((rate.data()?.count ?? 0) >= 1000) fail('Too many new attempts. Please try again later.', 429);
        tx.set(rateRef, { count: (rate.data()?.count ?? 0) + 1, expiresAt: new Date(now + 86400000) });
        tx.create(attempts.doc(id), data);
      });
      res.json({ ...publicResult(id, data), token, responses: {} });
      return;
    }
    if (!['resume', 'save', 'check', 'submit'].includes(body.action)) fail('Invalid action');
    if (typeof body.attemptId !== 'string' || !uuid.test(body.attemptId)) fail('Invalid attempt');
    const ref = attempts.doc(body.attemptId);
    if (body.action === 'resume') {
      const doc = await ref.get(), data = doc.data(); authorize(data, body.token);
      res.json({ ...publicResult(doc.id, data), responses: data.responses }); return;
    }
    if (!Number.isInteger(body.revision) || body.revision < 1 || body.revision > 1000000) fail('Invalid revision');
    try { validateResponses(body.responses); } catch (error) { fail(error.message); }
    if (body.action === 'check' && (typeof body.eventId !== 'string' || !uuid.test(body.eventId))) fail('Check event required');
    const result = await db.runTransaction(async tx => {
      const doc = await tx.get(ref), existing = doc.data(); authorize(existing, body.token);
      if (existing.submitted) return publicResult(doc.id, existing, true);
      const data = { ...existing };
      if (body.revision >= existing.revision) { data.responses = body.responses; data.revision = body.revision; }
      if (body.action === 'check' && !data.checkEvents.includes(body.eventId)) {
        if (data.checkEvents.length >= 1000) fail('Check limit reached');
        data.checkEvents = [...data.checkEvents, body.eventId]; data.checks = data.checkEvents.length;
      }
      Object.assign(data, scoreResponses(data.responses));
      if (body.action === 'submit') {
        data.submitted = true; data.submittedAt = Date.now();
        data.elapsedSeconds = Math.max(1, Math.floor((data.submittedAt - data.startedAt) / 1000));
      }
      tx.set(ref, data);
      return publicResult(doc.id, data, body.action === 'check' || body.action === 'submit');
    });
    res.json(result);
  } catch (error) {
    if (!error.status) console.error('Crossword request failed', error.message);
    res.status(error.status ?? 500).json({ error: error.status ? error.message : 'Unable to save results right now. Please try again.' });
  }
});
