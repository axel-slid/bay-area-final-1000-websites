# Deployment Status

Date: 2026-05-20

## Current Source Of Truth

- GitHub/local bundle is current for the refreshed 1000-row package.
- Current GitHub branch: `main`.
- Latest successful production deployment: `dpl_EvQYdozCKYCD6kFCUwufkecdu4v5`.
- Public URL: `https://bay-area-final-1000-websites.vercel.app/`.
- Latest local deliverables include 1000 rows, 53 confirmed owned-site/stale removals, 679 validated profile links, 324 direct profile images, zero owned-site search error rows, zero profile-search error rows, and a 1000-row drive-radius audit.
- Current route integrity covers stops 1-1000 exactly once. OSRM segment total is 654.3 road miles / 29.5 drive hours before stops, traffic, and in-person time.

## Public Vercel Alias

- Production Vercel now serves deployment `dpl_EvQYdozCKYCD6kFCUwufkecdu4v5`.
- The public alias serves the current GitHub/local package, including the additional owned-site/stale-row removals.
- The committed `public-page-http-audit.csv` records 1000/1000 final Vercel links returning HTTP 200 after the refreshed deployment.
- No redeploy is currently pending for the refreshed final CSV/data. The live copy of status-only audit artifacts can lag until the next docs/artifact deployment.
- A manual CLI redeploy attempt on 2026-05-20 was rejected with `api-deployments-free-per-day`, but Vercel Git deployment completed successfully and aliased production to `dpl_EvQYdozCKYCD6kFCUwufkecdu4v5`.

## Verification Notes

- Content completeness: 1000 PASS, 0 FAIL.
- Brand styling: 1000 PASS, 0 FAIL.
- Hero images: 1000 audited rows.
- Profile links: 679 accepted links.
- Profile images: 324 embedded direct profile images.
- Owned-site audit: 964 no likely owned-site hit, 36 raw hits reviewed as not confirmed owned sites.
- Drive-radius audit: 1000 rows within 90 minutes from San Carlos.
- Route-integrity audit: 100 segment rows plus summary, all PASS.
