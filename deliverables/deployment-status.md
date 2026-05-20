# Deployment Status

Date: 2026-05-20

## Current Source Of Truth

- Latest verified package/data commit before audit-only updates: `7e5d03f`
- This deployment-status file is maintained on the current `main` branch.
- Latest GitHub deliverables include 1000 final rows, 42 confirmed owned-site removals, 683 validated profile links, 345 validated profile images, zero profile-search error rows, zero owned-site search error rows, and a 1000-row drive-radius audit.
- Local `dist/`, `.vercel/output/`, GitHub, and the public Vercel alias have been verified with the same 1000 rows, 683 profile links, and 345 profile images.

## Public Vercel Alias

- Public URL: `https://bay-area-final-1000-websites.vercel.app/`
- The live alias currently serves the corrected 1000-row package, the full 1000-row drive-radius audit, and 1000 generated business pages.
- The live alias no longer includes Cafe Bunn Mi or Mission Curry House.
- Latest production deployment verified: `https://bay-area-final-1000-websites.vercel.app/`
- The live copy of this `deployment-status.md` file and other Markdown audit files may lag this GitHub version until the next successful status-only deploy; the live data JSON, CSV deliverables, and audit CSV artifacts above have been verified current.
- A production redeploy attempt on 2026-05-20 was blocked by Vercel's free-tier upload cap (`api-upload-free`); retrying with `--archive=tgz` hit the same 24-hour cap.

## Verification Notes

- GitHub raw artifact checks confirmed the latest profile audit counts:
  - Profile links: 683 accepted, 317 searched with no high-confidence profile found.
  - Profile images: 345 accepted, 338 searched with no safe matching image, 317 rows with no validated profile link.
- Live Vercel artifact checks confirmed:
  - Drive-radius audit: 1000 rows within 90 minutes from San Carlos.
  - Live data currently has 1000 rows, 683 profile links, and 345 profile images.
  - Live data does not contain Cafe Bunn Mi or Mission Curry House.
