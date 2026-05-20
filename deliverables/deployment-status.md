# Deployment Status

Date: 2026-05-20

## Current Source Of Truth

- GitHub/local bundle is current for the refreshed 1000-row package.
- Latest successful production deployment: `dpl_BeBNEFqTWX9qFD2JDxHBkuJ6NvSX`.
- Public URL: `https://bay-area-final-1000-websites.vercel.app/`.
- Latest local deliverables include 1000 rows, 53 confirmed owned-site/stale removals, 679 validated profile links, 324 direct profile images, zero owned-site search error rows, zero profile-search error rows, and a 1000-row drive-radius audit.
- Current route integrity covers stops 1-1000 exactly once. OSRM segment total is 654.3 road miles / 29.5 drive hours before stops, traffic, and in-person time.

## Public Vercel Alias

- Production Vercel still serves the last successful deployment, `dpl_BeBNEFqTWX9qFD2JDxHBkuJ6NvSX`.
- The current GitHub/local package removes additional owned-site/stale rows after that deployment.
- `public-page-http-audit.csv` therefore records 995 prior HTTP 200 rows and 5 `PENDING_DEPLOY` rows for newly replaced slugs until the next production deploy succeeds.
- A redeploy is required before the public alias is fully current with the latest local/GitHub CSV.

## Verification Notes

- Content completeness: 1000 PASS, 0 FAIL.
- Brand styling: 1000 PASS, 0 FAIL.
- Hero images: 1000 audited rows.
- Profile links: 679 accepted links.
- Profile images: 324 embedded direct profile images.
- Owned-site audit: 964 no likely owned-site hit, 36 raw hits reviewed as not confirmed owned sites.
- Drive-radius audit: 1000 rows within 90 minutes from San Carlos.
- Route-integrity audit: 100 segment rows plus summary, all PASS.
