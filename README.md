# Meredith & Gideon — Wedding Website

React/Vite website deployed with GitHub Pages. The active app is `src/main.tsx` → `src/App.tsx`; root-level uploaded component copies are not build inputs. Edit components under `src/`.

## Develop and validate

Use Node 20 (matching Actions) and npm:

```sh
npm ci
npm run typecheck
npm test
npm run build
npm run preview
```

Local Vite commands read `.env.production` for production and `.env.local` for local overrides (copy `.env.example`). The Apps Script URL is a public form endpoint, not a credential. Never put Sheet API keys or service-account credentials in the frontend.

## Photos and migration

HeroSection, PageHero, PhotoGrid and their lightboxes import the six actual `src/assets/meredith-gideon-*.jpg` files. Vite emits hashed JPEGs with the configured base path. Previously these components imported JSON metadata and read its Lovable `/__l5e/assets-v1/...` URL directly; no Vite plugin was rewriting imports. Those unused pointer files and the obsolete Lovable plan have been removed. There is no Lovable runtime/build dependency in package.json; regenerating the lockfile also removes its stale lovable-tagger package tree. The obsolete Bun lock and root deployment copy have also been removed; npm/package-lock.json and `.github/workflows/deploy.yml` are authoritative.

## GitHub Pages and future custom domain

In Settings → Pages, select GitHub Actions. Pull requests validate without deploying. Pushes to main build with `npm ci`, typecheck, test, and publish `dist`. The default Vite base is `/meredith-and-gideon-s-wedding-site/`. HashRouter keeps navigation and refresh working at `.../#/rsvp`, `.../#/hotel` and `.../#/registry` without a server fallback. Keep the hash in bookmarked routes. The 404 home link uses the router too.

When a custom domain is ready (no domain is configured by this change):

1. Verify domain ownership and configure GitHub Pages DNS/custom-domain settings using GitHub's instructions; enable HTTPS when available.
2. Set the Actions repository variable `GITHUB_PAGES_BASE` to `/` and redeploy. For local domain-build testing, run `GITHUB_PAGES_BASE=/ npm run build`.
3. Keep HashRouter initially. Removing hashes would require a separate static-host routing strategy. Verify all links, photos, refreshes and RSVP from the new origin.

## RSVP integration and required live check

The active RSVP form posts URL-encoded fields to the configured Apps Script `/exec` endpoint. `Code.gs` is the reference backend source; its deployed version has **not** been inspected or updated. It opens only `Website RSVPs` in spreadsheet `10CN5CMjuJwtqT0e-azg8Ofe6_n_ep4IFiFk7ApxFPWM`; it does not modify `Guest Tracker`.

| Sheet column | Source |
| --- | --- |
| Submitted At | Server timestamp |
| Full Name | name (trimmed) |
| Email | email (trimmed) |
| Attendance | attending: accepts / declines |
| Number of Guests | guests (including the existing 5+ option), or 0 for declines |
| Dietary Restrictions | dietary, or blank for declines |
| Personal Message | message |
| Submission ID | submissionId (UUID retained for retries in this mounted form) |

The browser displays success **only** after an HTTP success response with body `OK`. It does not use `no-cors`: an opaque response cannot prove a write. Network errors, timeouts, CORS failures, server `ERROR`, invalid submissions and sign-in pages keep the form and show an unconfirmed-save error. The reference script deduplicates retries by Submission ID under a lock. Reloading the page generates a new ID. If values are edited after an ambiguous failure, confirm the saved row before retrying: an already-saved ID will acknowledge the original row rather than update it.

No live RSVP was submitted and no private guest data was accessed during migration. To verify end to end:

1. In Apps Script, compare the existing deployment with `Code.gs`. Confirm it targets only the `Website RSVPs` tab (gid 734219006), with these eight headers in this order. Keep the master Guest Tracker untouched. If needed, update the existing deployment version; execute as owner, access Anyone. Do not create a different endpoint unless you also update `.env.production` and the workflow.
2. From the deployed GitHub Pages origin, enter a clearly marked test name, an email you control, accepts, 2 guests, a dietary note and a test message. Submit once. Inspect browser Network for the POST/redirect and a readable `OK` response. A CORS failure is not a verified save even if a row arrived.
3. With authorized Sheet access, confirm exactly one row in Website RSVPs, the eight field values, server timestamp and nonempty Submission ID. Repeat with declines and verify 0 guests/blank dietary. Remove only these test rows afterward.
4. Test offline mode: no Thank You screen, an error appears, and entries remain available. Retry without reloading. Confirm no duplicate ID row if the first attempt reached the script.
5. If the deployed Apps Script cannot return readable CORS responses to the site, verified browser confirmations require an appropriate backend/form service that relays and acknowledges writes. Do not switch to opaque `no-cors` and claim receipt. This is a remaining live-integration check, not a verified production submission.
