# Meredith & Gideon — Wedding Website

Independent React/Vite website deployed with GitHub Pages. Original photo assets are stored locally under `src/assets`.

## Local development

```bash
npm ci
npm run dev
```

## Connect RSVPs to the existing Guest Tracker spreadsheet

A `Website RSVPs` tab has been added to the existing Google Sheet. The original `Guest Tracker` tab remains unchanged.

1. Open the Google Sheet, select **Extensions → Apps Script**.
2. Replace the default script with `google-apps-script/Code.gs` from this repository, and save.
3. Select **Deploy → New deployment → Web app**. Set **Execute as: Me** and **Who has access: Anyone**. Authorize the script. This public endpoint accepts RSVP submissions; it does not make your Sheet public.
4. Copy the deployment URL ending in `/exec`.
5. The deployed endpoint is already configured in `.env.production` and `.github/workflows/deploy.yml`; no GitHub secret is needed for this public endpoint.
6. Trigger a new GitHub Pages deployment. Submit a test RSVP and **verify a new row appears in `Website RSVPs`** before sharing the site.

**Important:** The browser cannot verify a Google Apps Script write because of CORS restrictions. The UI acknowledges the send attempt, but the first end-to-end test is essential. If you need verified per-submission confirmations and rate limiting, use a backend or dedicated form service instead. Do not put spreadsheet API keys or service-account credentials in frontend code.

## GitHub Pages

1. Upload/commit this repository to the `main` branch.
2. In **Settings → Pages**, select **Source: GitHub Actions**.
3. The workflow `.github/workflows/deploy.yml` builds and publishes the site.
4. While using the default `username.github.io/repository` address, keep the workflow's default `GITHUB_PAGES_BASE` value. When you connect a custom domain, create the Actions **repository variable** `GITHUB_PAGES_BASE` with value `/`.
5. The app uses `HashRouter` to ensure all pages work on GitHub Pages, with URLs such as `/#/rsvp`. You can migrate to clean URLs later with a static-site fallback strategy.
6. For a custom domain, follow GitHub Pages domain verification and DNS instructions. Purchase the domain separately.

The Google Apps Script web app URL is not a secret credential, but keep the Sheet itself private. Public forms can be spammed; monitor the responses tab.
