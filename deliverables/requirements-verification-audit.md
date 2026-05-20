# Requirement Verification Audit

Date: 2026-05-20

| Requirement | Status | Evidence | Source |
|---|---|---|---|
| 1000 companies | PROVED | Final CSV has 1000 rows and 1000 unique generated site paths. | `build-tools/bay-area-final-1000-websites.csv` |
| Within 1.5 hour drive from San Carlos | PROVED | OSRM direct-route audit has 1000/1000 rows within 90 minutes; slowest row is 61.6 minutes. | `build-tools/final-drive-radius-audit.csv` |
| Do not have a website | PARTIAL / HEURISTIC | 62 confirmed owned-site/stale rows have been removed. Current audit has 969 rows with no likely owned-site hit and 31 reviewed raw hits not confirmed as owned sites. | `build-tools/confirmed-owned-site-removals.csv`; `build-tools/owned-website-search-audit.csv` |
| Generated website for each company | PROVED LOCALLY | Static build produces one directory index plus 1000 business pages. | `websites/bay-area-final-1000/dist` |
| Relevant information on each site | PROVED | 1000/1000 rows pass content completeness. | `build-tools/content-completeness-audit.csv` |
| Images from Yelp/Booksy/etc where possible | PARTIAL / AUDITED | 321 rows have embedded matched profile images; every row has a hero image and image-source fields. | `build-tools/profile-image-search-audit.csv`; `build-tools/hero-image-http-audit.csv` |
| Creative brand styling | PROVED | 1000/1000 rows have brand palette and rationale and pass brand audit. | `build-tools/brand-styling-audit.csv` |
| Link Yelp/Booksy/profile if available | PARTIAL / AUDITED | 678 rows have accepted profile links; 322 were searched with no high-confidence profile found. | `build-tools/profile-link-search-audit.csv` |
| CSV with GitHub and Vercel links | PROVED | 1000 GitHub links and 1000 Vercel links are populated. | `build-tools/bay-area-final-1000-websites.csv` |
| Include description | PROVED | 1000 rows have nonblank descriptions. | `build-tools/bay-area-final-1000-websites.csv` |
| Driving report and route | PROVED | 100 segment rows; route-integrity audit covers stops 1-1000 exactly once. Current OSRM segment total is 654.4 miles / 29.6 hours. | `build-tools/bay-area-final-1000-driving-report.md`; `build-tools/route-integrity-audit.csv` |
| Live deployment | PROVED FOR PAGES/DATA | Production Vercel deployment `dpl_EvQYdozCKYCD6kFCUwufkecdu4v5` serves the previous refreshed final CSV/data. The latest stricter cleanup is committed locally/GitHub and has 5 `PENDING_DEPLOY` rows until the next production deploy. | `websites/bay-area-final-1000/deliverables/deployment-status.md` |

## Key Counts

- Final rows: 1000
- Unique generated site paths: 1000
- Confirmed owned-site/stale removals recorded: 62
- Owned-website audit counts: 969 no likely owned-site hit, 31 raw hits reviewed
- Validated profile links: 678
- Embedded profile images: 321
- Driving segments: 100
- Route-integrity audit rows: 101, all PASS
- Public page audit: 995 HTTP 200, 5 pending deploy rows

## Caveats

- No-owned-website status remains a documented search/manual-review heuristic.
- Profile links and direct profile images are included only where high-confidence matches were found.
- The driving route is optimized heuristically and is not a paid traffic-aware global TSP proof.
