# Requirement Verification Audit

Date: 2026-05-20

This audit maps the original 1000-business website-generation request to current evidence. Status values intentionally distinguish proved requirements from audited partial coverage.

| Requirement | Status | Evidence | Source |
|---|---|---|---|
| 1000 companies | PROVED | Final CSV has 1000 rows and 1000 unique generated site paths. | `build-tools/bay-area-final-1000-websites.csv` |
| Within 1.5 hour drive from San Carlos | PROVED | Drive-radius audit checked all 1000 rows with direct OSRM routes from San Carlos; all 1000 are within 90 minutes, and the slowest route is 61.6 minutes. | `build-tools/final-drive-radius-audit.csv` |
| Do not have a website | PARTIAL / HEURISTIC | OSM/search heuristic used; 45 confirmed owned-site/stale rows were removed. Final 1000 owned-site status is documented in owned-website-search-audit.csv, including explicit review notes for all 41 raw candidates, but remains heuristic rather than legal-proof. | `deliverables/confirmed-owned-site-removals.csv; deliverables/owned-website-search-audit.csv` |
| Generated website for each company | PROVED | Static build has 1001 index.html files: directory index plus 1000 business pages. Public-page HTTP audit fetched 1000/1000 final Vercel links with HTTP 200 and 0 fetch errors. | `websites/bay-area-final-1000/dist; deliverables/public-page-http-audit.csv` |
| Relevant information on each site | PROVED | Each row has business name, address, phone, category, evidence, hours/status where available, Google Maps link, and description fields. Content-completeness audit passes 1000/1000 rows. | `deliverables/bay-area-final-1000-websites.csv; deliverables/content-completeness-audit.csv` |
| Images from Yelp/Booksy/etc where possible | PARTIAL / AUDITED | 326 rows have embedded direct profile images accepted from matched Yelp/Fresha results and verified by HTTP content audit; 19 prior candidates were rejected because they returned HTML/XML or 403. All 1000 rows have reachable hero images verified by HTTP audit. | `deliverables/profile-image-search-audit.csv; deliverables/profile-image-http-audit.csv; deliverables/hero-image-http-audit.csv` |
| Creative brand styling | PROVED | 1000 rows have parseable `primary/surface/accent/ink` brand palettes and business-specific style rationales; brand-styling audit passes 1000/1000 rows. | `deliverables/bay-area-final-1000-websites.csv; deliverables/brand-styling-audit.csv` |
| Link Yelp/Booksy/profile if available | PARTIAL / AUDITED | 681 rows have accepted profile links. Audit: {'ACCEPTED - profile link in final CSV': 681, 'ATTEMPTED - no high-confidence profile found': 319}. | `deliverables/profile-link-search-audit.csv` |
| CSV similar format with GitHub and Vercel links | PROVED | 1000 GitHub links and 1000 Vercel links. | `build-tools/bay-area-final-1000-websites.csv` |
| Include description | PROVED | 1000 rows have descriptions. | `build-tools/bay-area-final-1000-websites.csv` |
| Driving report and route | PROVED | Driving report plus 100 segment rows; route-integrity audit covers stops 1-1000 exactly once with no missing/extra/duplicate stops. OSRM total is 673.7 miles / 30.3 drive hours before stops/traffic. | `deliverables/bay-area-final-1000-driving-report.md; deliverables/bay-area-final-1000-driving-segments.csv; deliverables/route-integrity-audit.csv` |
| Live deployment of pages/CSV | PROVED WITH AUDIT-ARTIFACT CAVEAT | Production Vercel deployment `dpl_BeBNEFqTWX9qFD2JDxHBkuJ6NvSX` serves the corrected 1000 generated business pages and final CSV; local public-page HTTP audit fetched 1000/1000 final Vercel links with HTTP 200 and 0 fetch errors. A later redeploy of updated Markdown/audit artifacts was blocked by Vercel's daily deployment cap, so live audit files may lag GitHub/local. | `https://bay-area-final-1000-websites.vercel.app/; deliverables/public-page-http-audit.csv` |

## Key Counts

- Final rows: 1000
- Unique generated site paths: 1000
- Validated profile links: 681
- Embedded direct profile images: 326
- Profile-link audit counts: {'ACCEPTED - profile link in final CSV': 681, 'ATTEMPTED - no high-confidence profile found': 319}
- Profile-image audit counts: {'ACCEPTED - profile image embedded': 326, 'ATTEMPTED - no safe matching image found': 355, 'SKIPPED - no profile link': 319}
- Profile-image HTTP audit: 326 HTTP 200, 0 fetch errors, all image/jpeg or image/png
- Hero-image HTTP audit: 1000 HTTP 200, 0 fetch errors, all image/jpeg
- Confirmed owned-site/stale removals recorded: 45
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
