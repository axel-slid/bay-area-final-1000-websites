# Deployment Status

Date: 2026-05-20

## Current Source Of Truth

- Latest verified data/build commit: `5412aa6`
- This deployment-status file is maintained on the current `main` branch.
- Latest GitHub deliverables include 1000 final rows, 42 confirmed owned-site removals, 683 validated profile links, 345 validated profile images, zero profile-search error rows, zero owned-site search error rows, and a 1000-row drive-radius audit.
- Local `dist/` and `.vercel/output/` builds have been verified with the same 1000 rows, 683 profile links, and 345 profile images.

## Public Vercel Alias

- Public URL: `https://bay-area-final-1000-websites.vercel.app/`
- The live alias currently serves the full 1000-row drive-radius audit and 1000 generated business pages.
- The live alias is behind the latest GitHub deliverables: it still includes the removed Cafe Bunn Mi and Mission Curry House rows, and serves 330 profile images instead of the latest 345 profile images.
- Direct production deploy attempts are blocked by the Vercel daily deployment limit: `api-deployments-free-per-day`.

## Verification Notes

- GitHub raw artifact checks confirmed the latest profile audit counts:
  - Profile links: 683 accepted, 317 searched with no high-confidence profile found.
  - Profile images: 345 accepted, 338 searched with no safe matching image, 317 rows with no validated profile link.
- Live Vercel artifact checks confirmed:
  - Drive-radius audit: 1000 rows within 90 minutes from San Carlos.
  - Live data currently has 1000 rows, 682 profile links, and 330 profile images, and still contains Cafe Bunn Mi and Mission Curry House.
