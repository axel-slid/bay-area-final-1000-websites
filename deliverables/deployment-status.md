# Deployment Status

Date: 2026-05-20

## Current Source Of Truth

- GitHub/local bundle is current for the refreshed 1000-row package.
- Current GitHub branch: `main`.
- Current data-cleanup commit: `eb9f1ce`; later status-only commits may be newer.
- Latest successful production deployment: `dpl_Dm893G8qppsiVDnkwGgEkLvYPKLK`.
- Public URL: `https://bay-area-final-1000-websites.vercel.app/`.
- Latest local deliverables include 1000 rows, 62 confirmed owned-site/stale removals, 678 validated profile links, 321 direct profile images, zero owned-site search error rows, zero profile-search error rows, and a 1000-row drive-radius audit.
- Current route integrity covers stops 1-1000 exactly once. OSRM segment total is 654.4 road miles / 29.6 drive hours before stops, traffic, and in-person time.

## Public Vercel Alias

- Production Vercel now serves deployment `dpl_Dm893G8qppsiVDnkwGgEkLvYPKLK`.
- The public alias serves the latest stricter cleanup package, including all 62 owned-site/stale removals.
- The committed `public-page-http-audit.csv` records 1000/1000 final Vercel links returning HTTP 200.
- No redeploy is pending for the latest stricter cleanup package.
- A manual CLI redeploy attempt on 2026-05-20 was rejected with `api-deployments-free-per-day`, but Vercel Git deployment completed successfully and aliased production to `dpl_Dm893G8qppsiVDnkwGgEkLvYPKLK`.
- A later Git deployment after commit `eb9f1ce` completed successfully as `dpl_Dm893G8qppsiVDnkwGgEkLvYPKLK`.

## Verification Notes

- Content completeness: 1000 PASS, 0 FAIL.
- Brand styling: 1000 PASS, 0 FAIL.
- Hero images: 1000 audited rows.
- Profile links: 678 accepted links.
- Profile images: 321 embedded direct profile images.
- Owned-site audit: 969 no likely owned-site hit, 31 raw hits reviewed as not confirmed owned sites.
- Drive-radius audit: 1000 rows within 90 minutes from San Carlos.
- Route-integrity audit: 100 segment rows plus summary, all PASS.
