# Deployment Notes

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
