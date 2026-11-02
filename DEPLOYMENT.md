# Deployment Notes

## Verified production configuration — 2 November 2026

GitHub Pages serves `https://www.homeenergyscout.co.uk/` from this repository's `main` branch, root directory. This was verified through the Pages API and live `Server: GitHub.com` headers. HTTPS is enforced. The Netlify recommendation below is historical; `netlify.toml` and `_headers` are not the active deployment configuration.

Publish approved changes by merging the checked branch into `main`, then wait for the GitHub Pages build/deployment to succeed and verify the actual live HTML and asset hashes. `.nojekyll` preserves the authored static output without Liquid/Jekyll processing of docs and template tokens. No domain/provider change is required.

Production responses currently advertise GitHub Pages caching (observed `max-age=600` on HTML). Shared JS/CSS use content fingerprints regardless of host caching. Run `node scripts/build.mjs`, `node --test tests/*.test.mjs`, `node scripts/check-idempotence.mjs` and the browser suite before release. Verify official tariff sources again at publication; change `checkedOn` only after that check.

The browser smoke suite can also inspect production: set `HES_BASE_URL=https://www.homeenergyscout.co.uk` and optionally `HES_EVIDENCE_DIR=test-results/live`, then run `node tests/browser-smoke.mjs`. This exercises client-only forms, not any outbound submission service. `node scripts/audit-live.mjs` checks all existing routes, source periods, deployed asset bytes, sitemap/robots/404 and response headers.

## Recommended host
Netlify is the simplest first host for this project because it serves directory-style routes cleanly, respects `404.html`, and supports the included `netlify.toml` and `_headers` files without extra build tooling.

## Included launch files
- `netlify.toml` sets the publish directory to the project root.
- `_headers` adds lightweight security headers and long-cache rules for static assets.
- `site.webmanifest` and the icon set support installability and platform icons.
- `assets/img/social-share.png` is used for Open Graph and Twitter cards.
- `scripts/scaffold-page.mjs` creates future pages inside the existing structure without rebuilding the stack by hand.
- `scripts/prepare-static-launch.mjs` refreshes the prerendered metadata, schema and shared shell fragments after structural edits.
- `scripts/build-sitemap.mjs` rebuilds `sitemap.xml` from the live HTML files.
- `scripts/validate-site.mjs` checks metadata, routes, anchors, sitemap coverage and launch-placeholder drift before deploy.

## Suggested deployment flow
1. If you added pages, run `node scripts/build-sitemap.mjs`.
2. If page metadata, navigation or shared shell output changed, run `node scripts/prepare-static-launch.mjs`.
3. Run `node scripts/validate-site.mjs`.
4. Upload or connect the project root as the Netlify publish directory.
5. Point the production domain at the host and confirm `https://www.homeenergyscout.co.uk/` is the canonical live URL.
6. After the first live deploy, submit `https://www.homeenergyscout.co.uk/sitemap.xml` in Google Search Console and Bing Webmaster Tools.

## Manual steps before public launch
- Confirm `hello@homeenergyscout.co.uk` is monitored or replace it on [contact/index.html](C:/Users/Jest/Desktop/home%20energy/home-energy-scout-batch-15/home%20energy%20project/contact/index.html).
- Add real analytics or ad tags only after updating [privacy/index.html](C:/Users/Jest/Desktop/home%20energy/home-energy-scout-batch-15/home%20energy%20project/privacy/index.html) to match the live setup.
- If monetisation goes live, add the publisher-provided `ads.txt` file at the root.
