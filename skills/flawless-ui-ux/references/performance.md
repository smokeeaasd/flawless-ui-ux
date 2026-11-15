# Performance as part of the interface

Use when loading, instability or interaction latency affects the task, or when new imagery and motion materially change its cost. Measure a concrete surface rather than optimizing an abstract bundle. A local browser sample is not field performance, and one fast load is not a reliable benchmark.

## Establish the symptom and conditions

Identify what the user experiences: waiting for meaningful content, a button reacting late, content shifting during entry, scrolling stuttering or a device becoming hot. Record route, build type, viewport, browser, device or emulation, network conditions, cache state and relevant interaction. A development server's transformation cost can differ from a production build.

Use available browser performance tools, network inspection and project bundle reports. Start with a small number of representative measurements and inspect their spread. A busy host or cold font cache can dominate a sample. Do not report a percentage improvement from one noisy before/after observation.

Separate initial loading, rendering and interaction. LCP can indicate when a major visible element rendered; it does not prove the primary task is ready. INP is a field metric over interactions and should not be claimed from a single scripted click. CLS indicates layout instability under its definition; a screenshot cannot measure it. Refer to current [Web Vitals guidance](https://web.dev/articles/vitals) for definitions and tools when making metric claims.

## Images and fonts

Inspect the image actually delivered at each size. A 4000px source displayed in a small card wastes bytes; a tiny thumbnail stretched across a hero loses quality. Use responsive sources and modern encodings supported by the project. Keep dimensions or aspect-ratio space reserved to avoid moving content after loading. The principal first-view image generally should not be lazy-loaded; below-the-fold images often should be.

```html
<img src="room-960.webp" srcset="room-480.webp 480w, room-960.webp 960w"
     sizes="(max-width: 40rem) 100vw, 50vw" width="960" height="640"
     alt="Sample room layout" loading="lazy" decoding="async">
```

Use this pattern with real files and a truthful alternative. Do not insert nonexistent responsive variants or mark a hero lazy merely because a template does. Verify the request selected by the browser and the crop at narrow sizes.

Load only needed font files and weights. Confirm compression, caching and fallback behavior. Avoid a sequence of blocking stylesheets that postpones text. A custom display face may be worth its cost for a public page; a compact operational tool may benefit from a system family. Typography quality and delivery cost should be judged together, not by a universal ban on external fonts.

## JavaScript and rendering

Find large or repeated work on the critical path. Defer nonessential work, split routes when the project supports it and avoid importing a full visualization runtime for a static thumbnail. Reuse a dependency already present when appropriate instead of adding another library for the same responsibility.

Inspect long tasks during actual input. Filtering thousands of records on every keystroke, synchronously measuring many elements or rebuilding a large chart can block interaction. Debouncing may reduce repeated work but also delays feedback; choose it from the task. Memoization cannot fix an algorithm that does unnecessary work or stale state logic. Use virtualization only with a validated accessibility and focus model.

Batch layout reads and writes where possible. A pointer handler repeatedly reading geometry after changing styles can force expensive layout. Prefer CSS for simple visual relationships and use browser-native scrolling and positioning when they meet the requirement. Do not apply `will-change` to everything; excessive layers consume memory and can harm the device you were trying to help.

## Prevent instability

Reserve space for media, banners and asynchronous panels. Do not move the submit action under the pointer as an error appears. Keep skeleton dimensions representative when a skeleton is appropriate, and retain a meaningful loading description. A fake skeleton for synchronous content adds delay rather than communicating an actual state.

Test late-loading fonts, long content, expanded validation messages and a missing image. For a fixed header or bottom bar, inspect the scroll and focus path after content changes. Layout stability includes the user not losing their place, even when a metric does not capture every shift they notice.

## Set a budget from the project

Record practical limits for the affected surface: media bytes, font variants, additional script weight, requests and the interaction delay users can tolerate. Use existing project budgets before inventing new thresholds. A rich portfolio and a low-bandwidth appointment tool can justify different tradeoffs. Keep any initial numerical budget explicitly provisional until measured in the target context.

When adding an effect, account for its fallback, runtime and device cost. Do not ship an empty slot if a GPU feature fails. Profile the surface with and without the effect and verify that the useful content remains available. This skill does not include a shader library or require a particular performance tool.

## Acceptance and reporting

Repeat relevant measurements under comparable conditions after the change. Retain raw observations and report absolute values, conditions and variation rather than only an improvement percentage. Verify that the task, data and visual quality remain correct: removing the chart makes a page faster but may remove the reason people open it.

Use the local CLI for the coverage it provides, such as runtime errors and broken media, not as a substitute for a performance profiler. Its clean report does not establish Web Vitals or interaction latency. If measurement tools are unavailable, describe the source-level optimization and leave its speed effect unverified. Avoid shipping a new dependency or a large asset merely to demonstrate that a performance pass occurred.
