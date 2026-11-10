# Crossword results and leaderboard

The GitHub Pages site stays on its current URL. A Firebase HTTPS function named `crosswordApi` stores private responses in Cloud Firestore and returns public leaderboard summaries.

## Ranking and guest flow

Guests choose a display name and deliberately start a fresh ranked puzzle. Answers autosave after one second of inactivity. Server time starts on entry and includes breaks; the final submitted score cannot be modified. Rank uses correct complete words, then fewer answer checks, then elapsed seconds. Ties share a rank. Every submitted attempt is eligible, and the page shows the top 50.

Guests may still solve casually without starting a ranked attempt. The display name and scores are public; raw answers and attempt tokens never appear in leaderboard responses. A random, hashed token protects each anonymous attempt. Direct Firestore reads and writes are denied. Saved ranked attempts resume in the same browser. Failed requests display an error and a retry control rather than claiming a save succeeded.

## Deployment

1. Authenticate Firebase and choose the owner's project. Inspect any existing Firestore rules and merge the two new collection rules without overwriting unrelated access rules. Provision Firestore only if this project does not already have a database. Cloud Functions deployment requires a Firebase project with billing enabled; do not change its billing plan automatically.
2. Run `npm ci --prefix functions`, `node scripts/sync-crossword-puzzle.mjs`, and the checks below.
3. Deploy to the selected real project with `firebase deploy --project PROJECT_ID --only firestore:rules,firestore:indexes,functions:crosswordApi`. `PROJECT_ID` is a documented placeholder, not a configured project. Wait for the composite index to become ready.
4. Copy the exact HTTPS URL returned by Firebase to `FIREBASE_RESULTS_API_URL` in `src/lib/crossword-results-config.ts`. The optional `VITE_CROSSWORD_API_URL` environment variable overrides it. Both are public configuration, never credentials. Publish the GitHub Pages build after the live endpoint works.
5. Verify using an ordinary browser: start, save, reload, check answers, submit, and read the resulting row. Remove any live QA attempts with authenticated administrator access. No production test attempts have been created by this change.

The leaderboard UI remains hidden while no endpoint is configured. This branch is pending authenticated Firebase access and live deployment.

## Verification

- `npm run typecheck`
- `npm test`
- `npm test --prefix functions`
- `npm run build`

Emulator integration tests require Java 21 and the Firebase CLI. Use an isolated demo project, never a production endpoint:

```sh
firebase emulators:start --project demo-wedding-crossword --only firestore,functions
CROSSWORD_TEST_API_URL=http://127.0.0.1:5001/demo-wedding-crossword/us-central1/crosswordApi node --test functions/src/emulator.test.js
```

For a local browser preview, launch Vite with `VITE_CROSSWORD_API_URL` set to that same demo endpoint. Localhost CORS is allowed only when `FUNCTIONS_EMULATOR=true`; production allows only `https://mharris7777.github.io`.

## Future grid changes

Increment `PUZZLE_VERSION` in the results client when the grid changes, along with browser progress/session version keys. Run `node scripts/sync-crossword-puzzle.mjs` and redeploy the function before the frontend. Scores are grouped by puzzle version, so results for incompatible layouts are never mixed. Clue-text-only edits do not require a new version.

The hourly new-attempt throttle stores hashed network buckets, not raw IP addresses. Enable a TTL policy on `crosswordRateLimits.expiresAt` to remove expired buckets; access is denied to guests regardless of cleanup. Never commit service-account keys or Firebase login tokens.
