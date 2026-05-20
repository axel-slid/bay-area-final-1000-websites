# Final 1000 Completion Audit

Date: 2026-05-20

## Verified in Current State

- Final website CSV has 1000 rows: `build-tools/bay-area-final-1000-websites.csv`.
- Each row has a nonblank GitHub link, Vercel link, business name, address, phone, category, evidence, description, and generated site path.
- Each row has a nonblank hero image URL, hero image source, and photo/profile source field in the final CSV.
- Profile image extraction was attempted for the first 180 third-party profile links and added `Profile image URL` / `Profile image source` columns. Direct profile-page image extraction yielded 0 usable image URLs because most profile hosts blocked direct HTML fetches or did not expose usable Open Graph images. A stricter image-search pass then checked all 682 validated profile-linked rows and accepted 345 business-specific Yelp/Fresha/Facebook image URLs where the image result page matched the already-validated profile URL.
- Each row has a nonblank brand palette and style rationale field in the final CSV; the deployed shell reads the palette from CSV data and renders the rationale on each business page.
- Deployed business pages render source cards for lead evidence, Google Maps, profile/photo source status, and hero image source.
- Generated site paths exist for all 1000 rows.
- Static bundle build produced 1001 HTML entry points: one bundle index plus 1000 active business slug pages, plus `data.json` and `robots.txt`.
- Live Vercel checks returned HTTP 200 for:
  - `https://bay-area-final-1000-websites.vercel.app/`
  - `https://bay-area-final-1000-websites.vercel.app/plantation-coffee-roastery-bay-area/`
  - `https://bay-area-final-1000-websites.vercel.app/tzintzun-auto-repair-bay-area/`
- The 67 rows that previously had blank address fields now have reverse-geocoded approximate addresses marked in the address text.
- Driving segment CSV has 100 Google Maps driving segments and OSRM road estimates for every segment.
- OSRM segment totals: 672.2 road miles and 30.3 drive hours before stops, traffic, and in-person time.
- Drive-radius audit checked all 1000 final rows from San Carlos with OSRM direct routes; all 1000 are within 90 minutes, and the slowest checked row was 61.6 minutes. Results are in `final-drive-radius-audit.csv`.
- GitHub repo is pushed at `axel-slid/bay-area-final-1000-websites`.

## Remaining Caveats

- The no-owned-website status is based on OSM missing website tags plus search heuristics and pruning; it is not legal-proof or exhaustive proof that no site exists.
- `Yelp or booking link` is populated for 682 of 1000 rows after targeted Yelp/Booksy/Fresha/Vagaro/Facebook/Instagram/Toast/OpenTable enrichment and cleanup. Rows without a profile link either did not surface a high-confidence third-party profile or still need deeper manual/profile-specific research.
- Profile-link search status for all 1000 rows is documented in `profile-link-search-audit.csv`: 682 accepted profile links and 318 searched with no high-confidence matching profile found.
- Owned-website search status for all 1000 final rows is documented in `owned-website-search-audit.csv`: 957 rows had no likely owned-site hit, 43 raw hits were reviewed but not confirmed as owned sites, and 0 rows had search-provider errors during the final audit. Confirmed owned-site removals remain recorded separately in `confirmed-owned-site-removals.csv`.
- Business-specific Yelp/Fresha/Facebook images are now embedded for 345 rows whose image-search result page matched the validated profile URL. The remaining rows use category-relevant public hero images plus explicit hero image URLs/sources, profile-photo source notes, and profile-image extraction fields; rows with profile links point users to the relevant Yelp/Booksy/social profile photos.
- Profile image search status for all 1000 rows is documented in `profile-image-search-audit.csv`: 345 accepted profile images, 337 profile-linked rows searched with no safe matching image, and 318 rows with no validated profile link.
- Requirement-by-requirement proof and caveats are summarized in `requirements-verification-audit.md`.
- The route is a deterministic nearest-neighbor plus bounded 2-opt route with OSRM segment estimates, not a paid road-network TSP optimization.
