# Requirement Verification Audit

Date: 2026-05-20

This audit maps the original 1000-business website-generation request to current evidence. Status values intentionally distinguish proved requirements from audited partial coverage.

| Requirement | Status | Evidence | Source |
|---|---|---|---|
| 1000 companies | PROVED | Final CSV has 1000 rows and 1000 unique generated site paths. | `build-tools/bay-area-final-1000-websites.csv` |
| Within 1.5 hour drive from San Carlos | PROVED | Drive-radius audit checked all 1000 rows with direct OSRM routes from San Carlos; all 1000 are within 90 minutes, and the slowest route is 61.6 minutes. | `build-tools/final-drive-radius-audit.csv` |
| Do not have a website | PARTIAL / HEURISTIC | OSM/search heuristic used; 42 confirmed owned-site rows were removed. Final 1000 owned-site status is documented in owned-website-search-audit.csv, including explicit review notes for all 41 raw candidates, but remains heuristic rather than legal-proof. | `build-tools/confirmed-owned-site-removals.csv; build-tools/owned-website-search-audit.csv` |
| Generated website for each company | PROVED | Static build has 1001 index.html files: directory index plus 1000 business pages. | `websites/bay-area-final-1000/dist` |
| Relevant information on each site | PROVED | Each row has business name, address, phone, category, evidence, hours/status where available, Google Maps link, and description fields. | `build-tools/bay-area-final-1000-websites.csv` |
| Images from Yelp/Booksy/etc where possible | PARTIAL / AUDITED | 345 rows have embedded profile images accepted from matched Yelp/Fresha/Facebook profile results; remaining image statuses are documented. | `build-tools/profile-image-search-audit.csv` |
| Creative brand styling | PROVED | 1000 rows have brand palette and style rationale. | `build-tools/bay-area-final-1000-websites.csv` |
| Link Yelp/Booksy/profile if available | PARTIAL / AUDITED | 683 rows have accepted profile links. Audit: {'ACCEPTED - profile link in final CSV': 683, 'ATTEMPTED - no high-confidence profile found': 317}. | `build-tools/profile-link-search-audit.csv` |
| CSV similar format with GitHub and Vercel links | PROVED | 1000 GitHub links and 1000 Vercel links. | `build-tools/bay-area-final-1000-websites.csv` |
| Include description | PROVED | 1000 rows have descriptions. | `build-tools/bay-area-final-1000-websites.csv` |
| Driving report and route | PROVED | Driving report plus 100 segment rows; OSRM total 673.1 miles / 30.4 drive hours before stops/traffic. | `build-tools/bay-area-final-1000-driving-report.md; build-tools/bay-area-final-1000-driving-segments.csv` |
| Live deployment of deliverables | PROVED / STATUS FILE MAY LAG | Live Vercel site and data/audit artifacts are current for the corrected 1000-row package: 683 profile links, 345 profile images, 42 confirmed removals, and no Cafe Bunn Mi / Mission Curry House rows. The live copy of `deployment-status.md` may lag GitHub until the next status-only deploy. | `https://bay-area-final-1000-websites.vercel.app/` |

## Key Counts

- Final rows: 1000
- Unique generated site paths: 1000
- Validated profile links: 683
- Embedded profile images: 345
- Profile-link audit counts: {'ACCEPTED - profile link in final CSV': 683, 'ATTEMPTED - no high-confidence profile found': 317}
- Profile-image audit counts: {'ACCEPTED - profile image embedded': 345, 'ATTEMPTED - no safe matching image found': 338, 'NO PROFILE LINK - category image used': 317}
- Confirmed owned-site removals recorded: 42
- Owned-website final-row audit counts: {'ATTEMPTED - no likely owned-site hit': 959, 'RAW HIT REVIEWED - not confirmed owned site': 41}
- Driving segments: 100

## Remaining Non-Proof Caveats

- No-owned-website status is based on OSM tags, search heuristics, and manual/pruned audits, not exhaustive legal proof.
- Profile links and business-specific images are included only where high-confidence matching passed; remaining rows use audited category imagery/profile-source fallbacks.
- Route is a deterministic nearest-neighbor plus bounded 2-opt route with OSRM estimates, not a paid traffic-aware field-sales optimizer.
