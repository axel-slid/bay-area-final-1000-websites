# Final 1000 Completion Audit

Date: 2026-05-20

## Verified In Current Local/GitHub State

- Final website CSV has 1000 rows and 1000 unique generated site paths.
- Each row has nonblank GitHub link, Vercel link, business name, address, phone, category, evidence, description, coordinates, hero image fields, brand palette, style rationale, and generated site path.
- Confirmed owned-site/stale removals recorded: 53.
- Owned-site audit rows: 964 `ATTEMPTED - no likely owned-site hit`, 36 `RAW HIT REVIEWED - not confirmed owned site`, 0 provider-error rows.
- Validated profile links: 679. Rows without a profile link are documented as no high-confidence profile found.
- Embedded business/profile images: 324. Remaining rows use category-relevant hero imagery and profile-source notes.
- Profile-link HTTP audit rows: 679. Profile-image HTTP audit rows: 324. Hero-image HTTP audit rows: 1000.
- Brand-styling audit passes 1000/1000 rows.
- Content-completeness audit passes 1000/1000 rows.
- Drive-radius audit checked all 1000 final rows from San Carlos with OSRM direct routes; all are within 90 minutes, and the slowest checked row is 61.6 minutes.
- Driving segment CSV has 100 Google Maps driving segments and OSRM road estimates for every segment.
- Route-integrity audit covers stops 1-1000 exactly once and passes its summary row.
- Current OSRM segment total: 654.3 road miles / 29.5 drive hours before stops, traffic, and in-person time.

## Deployment State

- GitHub/local files are current for the refreshed 1000-row package.
- Production Vercel deployment `dpl_BeBNEFqTWX9qFD2JDxHBkuJ6NvSX` is still the latest successful production deployment.
- The latest local/GitHub package replaces five additional live slugs, so `public-page-http-audit.csv` currently has 995 prior HTTP 200 rows and 5 `PENDING_DEPLOY` rows until Vercel accepts another production deploy.

## Remaining Caveats

- No-owned-website status is based on OSM tags, search heuristics, and manual pruning; it is not exhaustive legal proof.
- Profile links and profile images are included only where a high-confidence matching source was found.
- The route is a deterministic bounded 2-opt route with OSRM segment estimates, not a mathematically proven global optimum.
