# Deployment Status

Date: 2026-05-20

## Current Source Of Truth

- Latest verified GitHub commit: `03d4531`
- Latest GitHub deliverables include 1000 final rows, 682 validated profile links, 345 validated profile images, zero profile-search error rows, zero owned-site search error rows, and a 1000-row drive-radius audit.
- Local `dist/` and `.vercel/output/` builds have been verified with the same 1000 rows, 682 profile links, and 345 profile images.

## Public Vercel Alias

- Public URL: `https://bay-area-final-1000-websites.vercel.app/`
- The live alias currently serves the full 1000-row drive-radius audit and 1000 generated business pages.
- The live alias is still one artifact revision behind for profile-image/profile-link audit data, serving 330 profile images instead of the latest 345 profile images.
- Direct production deploy attempts are blocked by the Vercel daily deployment limit: `api-deployments-free-per-day`.

## Verification Notes

- GitHub raw artifact checks confirmed the latest profile audit counts:
  - Profile links: 682 accepted, 318 searched with no high-confidence profile found.
  - Profile images: 345 accepted, 337 searched with no safe matching image, 318 rows with no validated profile link.
- Live Vercel artifact checks confirmed:
  - Drive-radius audit: 1000 rows within 90 minutes from San Carlos.
  - Live data currently has 1000 rows, 682 profile links, and 330 profile images.
