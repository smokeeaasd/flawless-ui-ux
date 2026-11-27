# Performance as part of the interface

Measure real surfaces before claiming improvements. Local dev-server samples do not establish production [Web Vitals guidance](https://web.dev/articles/vitals) (LCP, INP, CLS).

## High-impact visual and runtime checks

- **Images & stability:** serve sized responsive images (`srcset`/`sizes`) with explicit `width`/`height` or `aspect-ratio` to prevent layout shift. Eager-load the primary above-the-fold hero image; lazy-load below-the-fold media (`loading="lazy" decoding="async"`).
- **Fonts:** load only required weights and subsets; set `font-display: swap` (or `optional` for dense utility tools) and metric-compatible fallbacks so text stays readable immediately without jarring reflow.
- **Interactions & layout:** avoid synchronous layout thrashing, full-library chart imports for tiny thumbnails, or `will-change` sprawl. Keep error banners and async panels from shifting submit buttons under the pointer. Do not add fake skeletons to synchronous local operations.
- **Effects budget:** verify graceful static fallbacks for WebGL, heavy blurs, or motion when GPU/scripts are constrained. Never claim percentage speedups without comparable before/after measurements.
