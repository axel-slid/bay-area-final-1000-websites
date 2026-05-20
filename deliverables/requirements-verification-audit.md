# Requirement Verification Audit

Date: 2026-05-20

This audit maps the original 1000-business website-generation request to current evidence. Status values intentionally distinguish proved requirements from audited partial coverage.

| Requirement | Status | Evidence | Source |
|---|---|---|---|
| 1000 companies | PROVED | Final CSV has 1000 rows and 1000 unique generated site paths. | `build-tools/bay-area-final-1000-websites.csv` |
| Within 1.5 hour drive from San Carlos | PROVED | Drive-radius audit checked all 1000 rows with direct OSRM routes from San Carlos; all 1000 are within 90 minutes, and the slowest route is 61.6 minutes. | `build-tools/final-drive-radius-audit.csv` |
| Do not have a website | PARTIAL / HEURISTIC | OSM/search heuristic used; 42 confirmed owned-site rows were removed. Final 1000 owned-site status is documented in owned-website-search-audit.csv, including explicit review notes for all 41 raw candidates, but remains heuristic rather than legal-proof. | `build-tools/confirmed-owned-site-removals.csv; build-tools/owned-website-search-audit.csv` |
| Generated website for each company | PROVED | Static build has 1001 index.html files: directory index plus 1000 business pages. Public-page HTTP audit fetched 1000/1000 final Vercel links with HTTP 200 and 0 fetch errors. | `websites/bay-area-final-1000/dist; deliverables/public-page-http-audit.csv` |
| Relevant information on each site | PROVED | Each row has business name, address, phone, category, evidence, hours/status where available, Google Maps link, and description fields. Content-completeness audit passes 1000/1000 rows. | `deliverables/bay-area-final-1000-websites.csv; deliverables/content-completeness-audit.csv` |
| Images from Yelp/Booksy/etc where possible | PARTIAL / AUDITED | 326 rows have embedded direct profile images accepted from matched Yelp/Fresha results and verified by HTTP content audit; 19 prior candidates were rejected because they returned HTML/XML or 403. All 1000 rows have reachable hero images verified by HTTP audit. | `deliverables/profile-image-search-audit.csv; deliverables/profile-image-http-audit.csv; deliverables/hero-image-http-audit.csv` |
| Creative brand styling | PROVED | 1000 rows have parseable `primary/surface/accent/ink` brand palettes and business-specific style rationales; brand-styling audit passes 1000/1000 rows. | `deliverables/bay-area-final-1000-websites.csv; deliverables/brand-styling-audit.csv` |
| Link Yelp/Booksy/profile if available | PARTIAL / AUDITED | 683 rows have accepted profile links. Audit: {'ACCEPTED - profile link in final CSV': 683, 'ATTEMPTED - no high-confidence profile found': 317}. | `build-tools/profile-link-search-audit.csv` |
| CSV similar format with GitHub and Vercel links | PROVED | 1000 GitHub links and 1000 Vercel links. | `build-tools/bay-area-final-1000-websites.csv` |
| Include description | PROVED | 1000 rows have descriptions. | `build-tools/bay-area-final-1000-websites.csv` |
| Driving report and route | PROVED | Driving report plus 100 segment rows; route-integrity audit covers stops 1-1000 exactly once with no missing/extra/duplicate stops. OSRM total is 673.1 miles / 30.4 drive hours before stops/traffic. | `deliverables/bay-area-final-1000-driving-report.md; deliverables/bay-area-final-1000-driving-segments.csv; deliverables/route-integrity-audit.csv` |
| Live deployment of deliverables | PARTIAL / GITHUB CURRENT | Live Vercel serves the 1000 generated business pages, and the corrected GitHub CSV links fetch 1000/1000 HTTP 200. Latest GitHub CSV/data/audit files include corrected replacement-row links, but the public Vercel CSV/data JSON and Markdown audit files may lag until the next successful deploy. | `https://bay-area-final-1000-websites.vercel.app/` |

## Key Counts

- Final rows: 1000
- Unique generated site paths: 1000
- Validated profile links: 683
- Embedded direct profile images: 326
- Profile-link audit counts: {'ACCEPTED - profile link in final CSV': 683, 'ATTEMPTED - no high-confidence profile found': 317}
- Profile-image audit counts: {'ACCEPTED - profile image embedded': 326, 'ATTEMPTED - no safe matching image found': 338, 'NO PROFILE LINK - category image used': 317, 'ATTEMPTED - image URL did not return direct image content': 19}
- Profile-image HTTP audit: 326 HTTP 200, 0 fetch errors, all image/jpeg or image/png
- Hero-image HTTP audit: 1000 HTTP 200, 0 fetch errors, all image/jpeg
- Confirmed owned-site removals recorded: 42
- Owned-website final-row audit counts: {'ATTEMPTED - no likely owned-site hit': 959, 'RAW HIT REVIEWED - not confirmed owned site': 41}
- Driving segments: 100
- Public page HTTP audit: 1000 HTTP 200, 0 fetch errors
- Brand-styling audit: 1000 PASS, 0 FAIL
- Content-completeness audit: 1000 PASS, 0 FAIL
- Route-integrity audit: 101 PASS, 0 FAIL; 1000 stops covered exactly once

## Remaining Non-Proof Caveats

- No-owned-website status is based on OSM tags, search heuristics, and manual/pruned audits, not exhaustive legal proof.
- Profile links and business-specific images are included only where high-confidence matching passed; remaining rows use audited category imagery/profile-source fallbacks.
- Route is a deterministic nearest-neighbor plus bounded 2-opt route with OSRM estimates, not a paid traffic-aware field-sales optimizer.
