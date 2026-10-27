# Brand logo sources

Files here are trimmed/normalised copies used only by the "Automobile Brands We Represent" section
(`BrandsSection` in `src/routes/index.tsx`). Logos are scaled by visible artwork area onto an identical
600x400 canvas; aspect ratios are preserved (no stretching or cropping).

| Brand | File | Source | Status |
|---|---|---|---|
| Hero | `hero.png` | Existing project asset (`src/assets/hero.png`) | Reused |
| Honda | `honda.png` | Existing project asset | Reused |
| TVS | `tvs.png` | Existing project asset | Reused |
| Bajaj | `bajaj.png` | Existing project asset | Reused |
| Champion | `champion.png` | Existing project asset | Reused |
| Uno Minda | `uno-minda.png` | Existing project asset | Reused |
| NGK Spark | `ngk-spark.png` | Existing project asset | Reused |
| USHA | `usha.png` | Existing project asset | Reused |
| Spark Minda | `spark-minda.png` | Official site, sparkminda.com (`/images/logo.png`); matches the logo already shown in the project's partner-brands artwork | Verified |
| Rockman | `rockman.png` | Wikimedia Commons "Rockman-Industries-Logo.jpg", the logo used on Wikipedia for Rockman Industries (Hero Group, rockman.in). rockman.in blocks automated access | Verified (reliable source) |
| Steel Bird | `steel-bird.png` | steelbird.com (Steelbird International / Steelbird Auto Parts). Source file is small (150x100), so it is slightly soft | **Confirm**: this is the auto-parts company, not the helmet maker Steelbird Hi-Tech India |
| MK Lights | `mk-lights.png` | Supplied by the client (replaces the former "MK Lights" and "MK" name tiles) | Client-supplied |
| India Nippon | `india-nippon.png` | Supplied by the client; original was white on dark, recoloured to black | Client-supplied |
| Zeto | _none_ | No brand found (possibly "Xeto"?) | **Unverified, name tile shown** |

To add a missing logo: drop the file into this folder, import it in `src/routes/index.tsx`, and set it as the
`logo` for that brand in `aftermarketBrands`.
