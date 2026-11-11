# Supabase crossword results and leaderboard

The website stays on GitHub Pages. Supabase Postgres stores private answers and exposes four bounded RPCs for starting, restoring, saving/submitting, and reading leaderboard summaries. No paid plan, separate edge-function service, or Firebase service is required by this design.

## Guest flow and ranking

Starting ranked play deliberately clears the local puzzle and starts a server timer. Answers autosave after one second of inactivity. Guests can restore their attempt in the same browser, check answers, and submit a final score. Final submitted results cannot be changed. The top 50 attempts rank by correct complete words, then fewer answer checks, then elapsed seconds. Equal results share a rank. Time includes breaks.

The leaderboard shares only display names and scores. Raw responses and hashed attempt tokens live in `crossword_private`, with no `anon` or `authenticated` schema/table access. Security-definer RPCs use a fixed empty search path and validate every write. A random per-attempt token is required for restoration or modification. Check events are idempotent, and older revisions cannot overwrite newer saves. Auto-save responses do not disclose correctness before an explicit check or submission.

## Live setup — pending Supabase connection

1. Connect the owner's Supabase account and inspect available projects/organizations. Use an existing suitable free project or create a free project. Do not upgrade the plan or add paid services.
2. Inspect for conflicting `cw_*` functions and the `crossword_private` schema. Apply `supabase/migrations/202611110001_crossword_results.sql` and then `202611110002_seed_crossword.sql` through Supabase migrations. Do not rerun already applied migrations or overwrite unrelated tables/policies.
3. Obtain the exact project URL and its public `sb_publishable_...` key. Set `SUPABASE_PROJECT_URL` and `SUPABASE_PUBLISHABLE_KEY` in `src/lib/crossword-results-config.ts`. The optional `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY` build environment variables override these settings. Never put secret keys, service-role keys, or management tokens in the client or source control.
4. Verify the four RPCs with the public key. Confirm raw answer tables are not exposed in the Data API. Verify a named test attempt through an ordinary browser; remove that test attempt using authenticated administrator access afterward. Publish the GitHub Pages build only once the live backend works.

The leaderboard UI stays hidden when project settings are empty. No live database or production test scores have been created by this draft.

## Local verification

- `npm ci`
- `npm run typecheck`
- `npm test`
- `npm run test:database`
- `npm run build`

Database tests use PGlite (real Postgres execution) in memory. They apply the actual migrations, run as `anon`, and verify private data access is denied, grading is correct, check retries are idempotent, stale saves are ignored, and finalized scores cannot be modified. No hosted Supabase account is used by tests.

For browser QA against those same database functions:

```sh
node supabase/tests/dev-rpc-server.mjs
VITE_SUPABASE_URL=http://127.0.0.1:54322 VITE_SUPABASE_PUBLISHABLE_KEY=sb_publishable_local_test npm run dev -- --port 5174
```

The loopback adapter is test-only and contains no live credentials. It is not a deployment alternative.

## Updating the puzzle

For a changed grid, increment `PUZZLE_VERSION` in `src/lib/crossword-results.ts` and browser progress/session keys, then run `node scripts/sync-crossword-puzzle.mjs`. The script writes the seed for review. Once a migration is applied, never edit it: add a new migration for the new puzzle version. Apply that migration before publishing the matching frontend. Clue-text-only changes do not require new scoring data.

New-attempt throttling hashes network/hour buckets and automatically removes expired buckets during new starts; it does not retain raw IP addresses. The free plan can pause after inactivity; check the project is active before guests play.
