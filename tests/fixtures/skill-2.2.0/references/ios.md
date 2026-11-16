# Native iOS and iPadOS decisions

Use for SwiftUI, UIKit and cross-platform apps shipping on Apple mobile platforms. Web browser checks do not verify a native screen. Consult current [Apple Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines/) and project deployment targets when a platform detail is uncertain; do not assume every current API exists on the supported OS.

## Recover the native task

Identify the screen's role in the actual navigation hierarchy, supported device classes, orientation, input and state. Preserve system Back behavior, accessibility settings and the app's existing component vocabulary. Brand can influence tint, typography and content without replacing familiar controls with web-shaped imitations.

Distinguish a tab destination from an action. A top-level section belongs in navigation; creating a new record is an action. Use a navigation stack for hierarchy and a sheet or other bounded presentation when the task fits it. Do not default to a sheet for work that requires sustained comparison with the underlying screen. Preserve the return path and any unsaved input.

## Text, space and controls

Use platform text styles and support Dynamic Type. A fixed point-size screenshot may fit while accessibility text sizes clip labels or hide the primary action. Let rows grow, make secondary content wrap and choose an adaptive arrangement where adjacent values no longer fit. Keep semantic labels and values together. Use the platform's scaled metrics when custom typography is required rather than freezing every size.

Respect safe areas, the software keyboard and system bars. A bottom action must remain reachable when a field is focused and text is enlarged. Avoid putting a full-screen tap target over native navigation gestures. Use appropriate text content types, keyboards and submit behavior. A numeric-looking identifier may still require text entry and leading zeros.

Provide generous touch targets in line with platform guidance, and verify the hit area rather than only the visible symbol. Use consistent icons appropriate to the native context. A small visual mark can have a larger accessible hit region; adjacent targets still need separation. Do not rely on hover to expose an essential action.

## State and accessibility

Expose labels, values, traits and current state through the native accessibility APIs. Do not concatenate an entire complex screen into one accessibility label to silence missing-name warnings. Group information where it supports understanding, but keep independent actions reachable. Verify VoiceOver order, adjustable controls and focus after a state change on the actual platform.

Use semantic colors and verify light, dark and increased-contrast appearances where supported. Respect Reduce Motion and other relevant user settings. A brief that asks for a branded palette does not waive usable text and control contrast. Treat loss of identity and access as separate problems and find a solution that preserves both.

Empty, loading and failure states should follow real integration behavior. A local sample may validate input or update in-memory data but cannot claim a real reservation. During a record update, preserve selection and navigation context; a row disappearing under a filter needs meaningful feedback.

## Worked native pattern

For a reading list, begin with a native list: article title, category and a clear detail route. At larger text sizes, allow metadata to move below the title rather than shrinking it. A detail view can contain the reading content and a local saved-mark action. The [native study](native-studies.md) includes a SwiftUI source example illustrating these relationships; it is not a complete application or a claim of simulator validation.

If the same app supports iPad, decide what the additional space enables. A split view can preserve list/detail context, while a stretched phone card may waste space. Support keyboard and pointer input where the product targets them. Do not assume that device width alone tells you which input is active.

## Verify with platform evidence

Use the project's normal build and test commands. When a simulator or device is available, capture the actual native view, exercise the primary path, inspect accessibility and test relevant text sizes and appearances. A browser rendering of a mock iPhone frame is illustrative material, not native execution.

If Xcode, simulator, signing or hardware is unavailable, inspect source and identify likely risks, then report precisely which behavior remains unobserved. Do not mark a passing web CLI scan as native coverage. Preserve the implementation's current architecture; a design task does not authorize replacing the framework or adding a platform abstraction.
