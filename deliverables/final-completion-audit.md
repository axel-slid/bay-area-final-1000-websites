# Final 1000 Completion Audit

Date: 2026-05-20

## Verified in Current State

- Final website CSV has 1000 rows: `build-tools/bay-area-final-1000-websites.csv`.
- Each row has a nonblank GitHub link, Vercel link, business name, address, phone, category, evidence, description, and generated site path.
- Content-completeness audit validates 1000/1000 rows for required fields, description length, evidence length, Google Maps link, aggregate GitHub/Vercel links, and numeric coordinates.
- Each row has a nonblank hero image URL, hero image source, and photo/profile source field in the final CSV.
- Hero-image HTTP audit fetched all 1000 hero image URLs and returned 1000 HTTP 200 responses, all with `image/jpeg` content type and 0 fetch errors.
- Profile image extraction was attempted for the first 180 third-party profile links and added `Profile image URL` / `Profile image source` columns. Direct profile-page image extraction yielded 0 usable image URLs because most profile hosts blocked direct HTML fetches or did not expose usable Open Graph images. A stricter image-search pass then checked all 683 validated profile-linked rows, followed by HTTP content validation. The final package accepts 326 business-specific direct Yelp/Fresha image URLs that return HTTP 200 with image content types; 19 prior candidates were rejected because they returned HTML/XML or 403.
- Each row has a nonblank brand palette and style rationale field in the final CSV; the deployed shell reads the palette from CSV data and renders the rationale on each business page.
- Brand-styling audit validates 1000/1000 rows: each row has a parseable `primary/surface/accent/ink` palette and a business-specific style rationale.
- Deployed business pages render source cards for lead evidence, Google Maps, profile/photo source status, and hero image source.
- Generated site paths exist for all 1000 rows.
- Static bundle build produced 1001 HTML entry points: one bundle index plus 1000 active business slug pages, plus `data.json` and `robots.txt`.
- Public-page HTTP audit fetched all 1000 final Vercel links and returned 1000 HTTP 200 responses with 0 fetch errors. Results are in `public-page-http-audit.csv`.
- Live Vercel checks returned HTTP 200 for:
  - `https://bay-area-final-1000-websites.vercel.app/`
  - `https://bay-area-final-1000-websites.vercel.app/plantation-coffee-roastery-bay-area/`
  - `https://bay-area-final-1000-websites.vercel.app/tzintzun-auto-repair-bay-area/`
- The 67 rows that previously had blank address fields now have reverse-geocoded approximate addresses marked in the address text.
- Driving segment CSV has 100 Google Maps driving segments and OSRM road estimates for every segment.
- Route-integrity audit validates 100/100 route segments plus a summary row: stops 1-1000 are covered exactly once, with no missing, extra, or duplicate stops.
- OSRM segment totals: 673.1 road miles and 30.4 drive hours before stops, traffic, and in-person time.
- Drive-radius audit checked all 1000 final rows from San Carlos with OSRM direct routes; all 1000 are within 90 minutes, and the slowest checked row was 61.6 minutes. Results are in `final-drive-radius-audit.csv`.
- GitHub repo is pushed at `axel-slid/bay-area-final-1000-websites`.

## Remaining Caveats

- The no-owned-website status is based on OSM missing website tags plus search heuristics and pruning; it is not legal-proof or exhaustive proof that no site exists.
- `Yelp or booking link` is populated for 683 of 1000 rows after targeted Yelp/Booksy/Fresha/Vagaro/Facebook/Instagram/Toast/OpenTable enrichment and cleanup. Rows without a profile link either did not surface a high-confidence third-party profile or still need deeper manual/profile-specific research.
- Profile-link search status for all 1000 rows is documented in `profile-link-search-audit.csv`: 683 accepted profile links and 317 searched with no high-confidence matching profile found.
- Owned-website search status for all 1000 final rows is documented in `owned-website-search-audit.csv`: 959 rows had no likely owned-site hit, 41 raw hits were reviewed with explicit review notes and not confirmed as owned sites, and 0 rows had search-provider errors during the final audit. Confirmed owned-site removals remain recorded separately in `confirmed-owned-site-removals.csv`.
- Business-specific direct Yelp/Fresha images are now embedded for 326 rows whose image-search result page matched the validated profile URL and whose image URL passed HTTP content validation. The remaining rows use category-relevant public hero images plus explicit hero image URLs/sources, profile-photo source notes, and profile-image extraction fields; rows with profile links point users to the relevant Yelp/Booksy/social profile photos.
- Profile image search status for all 1000 rows is documented in `profile-image-search-audit.csv`: 326 accepted profile images, 338 profile-linked rows searched with no safe matching image, 317 rows with no validated profile link, and 19 rejected because candidate URL did not return direct image content.
- Requirement-by-requirement proof and caveats are summarized in `requirements-verification-audit.md`.
- The route is a deterministic nearest-neighbor plus bounded 2-opt route with OSRM segment estimates, not a paid road-network TSP optimization.
