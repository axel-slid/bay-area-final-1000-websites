# Deployment Status

Date: 2026-05-20

## Current Source Of Truth

- Latest successful production deployment: `dpl_BeBNEFqTWX9qFD2JDxHBkuJ6NvSX`
- This deployment-status file is maintained on the current `main` branch.
- Latest deliverables include 1000 final rows, 45 confirmed owned-site/stale removals, 681 validated profile links, 326 validated direct profile images, zero profile-search error rows, zero owned-site search error rows, and a 1000-row drive-radius audit.
- Local public-page HTTP audit confirmed 1000/1000 final Vercel links return HTTP 200 after deploying the corrected replacement rows.
- Local `dist`, Vercel production pages/CSV, and GitHub have been verified with the corrected 1000 rows, 681 profile links, 326 direct profile images, 326 profile-image HTTP 200 results, 1000 hero-image HTTP 200 results, 1000 public page HTTP 200 results, 1000 content-completeness audit passes, 1000 brand-styling audit passes, and route-integrity coverage of stops 1-1000 exactly once.

## Public Vercel Alias

- Public URL: `https://bay-area-final-1000-websites.vercel.app/`
- Vercel deploy on 2026-05-20 completed successfully and aliased production to deployment `dpl_BeBNEFqTWX9qFD2JDxHBkuJ6NvSX`.
- The live alias currently serves the corrected 1000 generated business pages and final CSV.
- The live alias no longer includes Patio Español, Jang Soo BBQ, or Dean Real Estate Services.
- Latest production deployment verified: `https://bay-area-final-1000-websites.vercel.app/`
- Successful production deploy command: `npx --yes vercel deploy --prod --yes --archive=tgz`.
- A later redeploy attempt, after updating Markdown docs and the local public-page HTTP audit artifact, was blocked by Vercel free-tier cap `api-deployments-free-per-day`. GitHub/local files are current; the live public-page audit CSV may lag, but the final live pages and CSV are current.
- Public alias checks after deployment `dpl_BeBNEFqTWX9qFD2JDxHBkuJ6NvSX` found all 1000 final Vercel links returning HTTP 200.

## Verification Notes

- GitHub raw artifact checks confirmed the latest profile audit counts:
  - Profile links: 681 accepted, 319 searched with no high-confidence profile found.
  - Profile images: 326 accepted direct images, 355 searched with no safe matching image, 319 rows with no validated profile link.
  - Hero images: 1000 HTTP 200, all image/jpeg.
  - Brand styling: 1000 rows pass palette/rationale audit.
  - Content completeness: 1000 rows pass required-field/link/coordinate audit.
  - Route integrity: 100 segment rows plus summary pass; 1000 stops covered exactly once.
- Live Vercel artifact checks currently confirm:
  - Drive-radius audit: 1000 rows within 90 minutes from San Carlos.
  - Live data currently has 1000 rows and 681 profile links.
  - Live data does not contain Patio Español, Jang Soo BBQ, or Dean Real Estate Services.
  - Live brand-styling audit: 1000 rows.
  - Live hero-image HTTP audit: 1000 rows.
  - Live profile-image HTTP audit: 326 rows.
