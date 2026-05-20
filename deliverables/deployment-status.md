# Deployment Status

Date: 2026-05-20

## Current Source Of Truth

- Latest verified package/data commit before audit-only updates: `7e5d03f`
- This deployment-status file is maintained on the current `main` branch.
- Latest GitHub deliverables include 1000 final rows, 42 confirmed owned-site removals, 683 validated profile links, 326 validated direct profile images, zero profile-search error rows, zero owned-site search error rows, and a 1000-row drive-radius audit.
- Public-page HTTP audit confirmed 1000/1000 corrected final Vercel links return HTTP 200 after correcting the two replacement-row links to the aggregate deployment paths.
- Local `dist/`, `.vercel/output/`, and GitHub have been verified with the corrected 1000 rows, 683 profile links, 326 direct profile images, 326 profile-image HTTP 200 results, 1000 hero-image HTTP 200 results, 1000 public page HTTP 200 results, and 1000 brand-styling audit passes.

## Public Vercel Alias

- Public URL: `https://bay-area-final-1000-websites.vercel.app/`
- Vercel inspect on 2026-05-20 showed the public alias pointing to deployment `dpl_4sjHjMGPkbs3fhwVUr4ansD4Unzw`, created at Wed May 20 2026 01:37:35 PDT.
- The live alias currently serves the 1000 generated business pages and the full 1000-row drive-radius audit.
- The live alias no longer includes Cafe Bunn Mi or Mission Curry House.
- Latest production deployment verified: `https://bay-area-final-1000-websites.vercel.app/`
- The live copy of this `deployment-status.md` file, other Markdown audit files, and public CSV/data JSON may lag this GitHub version until the next successful deploy. Current GitHub has corrected Vercel/GitHub links for Fruitas Regionales Magui and Lucky Hair & Nails; the public alias still serves those two business pages at the corrected aggregate paths.
- Production redeploy attempts on 2026-05-20 were blocked by Vercel free-tier caps: first `api-upload-free`, then `api-deployments-free-per-day` after retrying with `--archive=tgz`.
- Later GitHub-only audit commits added `completion-proof-audit.md`, `public-page-http-audit.csv`, and two corrected replacement-row links; those artifacts are available in GitHub but may return not found or stale values on the public Vercel alias until another successful deployment publishes the updates.

## Verification Notes

- GitHub raw artifact checks confirmed the latest profile audit counts:
  - Profile links: 683 accepted, 317 searched with no high-confidence profile found.
  - Profile images: 326 accepted direct images, 338 searched with no safe matching image, 317 rows with no validated profile link, 19 rejected by HTTP image validation.
  - Hero images: 1000 HTTP 200, all image/jpeg.
  - Brand styling: 1000 rows pass palette/rationale audit.
- Live Vercel artifact checks confirmed before the latest GitHub-only link correction:
  - Drive-radius audit: 1000 rows within 90 minutes from San Carlos.
  - Live data currently has 1000 rows and 683 profile links. Public profile-image count may lag GitHub until the next successful deploy; GitHub now has 326 direct profile images after HTTP validation.
  - Live data does not contain Cafe Bunn Mi or Mission Curry House.
