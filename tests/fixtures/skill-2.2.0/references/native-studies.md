# Native code studies

These original source examples illustrate platform decisions. They are **not compiled, simulator-tested, emulator-tested or device-tested in this repository**. No native screenshots or passing build claims are supplied. Integrate into an existing project with compatible dependencies and verify there. A web rendering of similar content cannot establish native behavior.

## 9. iOS: reading, detail and a local mark

Read [ReadingList.swift](../assets/examples/native/ReadingList.swift). The study targets an iOS 16+ SwiftUI host because it uses `NavigationStack`. It contains a list, native search, addressable item identity within the list, a pushed reading detail and an in-memory saved mark. It is a view to integrate, not an Xcode project or complete persistence implementation.

**Before:** a web-shaped imitation could place a custom back icon over a fixed-height panel, clip large text, and show an unlabeled bookmark. Copying a CSS pixel target into SwiftUI would not resolve those platform problems.

**Chosen relationships:** `List`, `NavigationLink` and `NavigationStack` supply the navigation structure instead of a hand-built overlay. Semantic font styles follow the user's text size. Text can grow vertically and the article scrolls. The article title, category and marked state are actual text. The mark action describes its current result, and a nearby note makes its local lifetime clear.

The list uses stable identifiers; marking one article does not identify it by its current filtered index. Search returns a clear zero-match message. The saved set belongs to this view's state: it is neither account sync nor durable storage. In a production project, resolve persistence and synchronization separately from visual presentation. Do not claim the study survives process termination.

**Integration:** add the file to the target and present `ReadingListStudy()` from a suitable screen. Reuse the host navigation stack if one already owns that route rather than blindly nesting stacks. Confirm the deployment target and project conventions before adapting the example. Replace illustrative content from confirmed sources and use the existing model if present.

**Required verification:** build with the project's Xcode/Swift settings, open the screen, search a title, open detail, mark it and return. Check that the same item shows the mark. Exercise Back and the platform back gesture. At accessibility text sizes, read the full title and locate the action without clipping. Use VoiceOver to inspect order, names, selected state and navigation, then test relevant orientations, safe areas and device sizes. Record actual device/OS conditions and unobserved combinations. See [iOS](ios.md) for the owning guidance.

## 10. Android: searchable records and restoration boundaries

Read [ReadingList.kt](../assets/examples/native/ReadingList.kt). The source is a composable for an existing Jetpack Compose/Material 3 host. It deliberately avoids pretending to include an application, Gradle configuration or a navigation graph. There is no detail route; the supported local task is finding an article and changing its saved mark.

**Before:** fixed-height rows and abbreviated titles can conceal which item an action affects, especially at larger font scales. An icon-only star with an unchanged accessible name can also leave its current state unclear.

**Chosen relationships:** a `LazyColumn` uses stable item keys, rows grow with content, and text follows Material theme roles. The mark action is named with its article and changes to a removal action. A visible local-only note avoids implying account behavior. Search is separate from saved IDs, so filtering does not move a mark to another article.

`rememberSaveable` supports the values that the host can restore through its saved-state mechanism. It is not a durable repository, multi-device sync or a promise of recovery in every termination condition. Keep that boundary explicit. The source applies safe drawing padding; when integrated inside a scaffold that already consumes insets, adapt the padding rather than doubling it.

**Integration:** add the source to the compatible module, adapt its package, confirm Compose/Material versions and call `ReadingListStudy()` within the app's theme. Reuse host state and navigation ownership where present. Do not add an entire dependency stack just to use this small study.

**Required verification:** compile with the project's Gradle toolchain, run on an emulator or device, filter the list, mark an article, clear the query and confirm identity. Test large font scale, landscape/window resizing, edge-to-edge content and the on-screen keyboard. Exercise TalkBack and switch/keyboard access where relevant. Rotate or recreate the activity to observe the actual saved-state behavior; separately test process recreation if it matters. Verify the host Back behavior rather than assuming this isolated composable owns it. See [Android](android.md).

## Keep evidence platform-specific

These examples make decisions inspectable in source, but source cannot show whether an SDK version compiles them or how a reader announces them. Report “source reviewed; platform run pending” until those checks occur. Native work may need platform-specific corrections even when a visually similar browser example passes. For a desktop adaptation, use [Desktop](desktop.md) and the actual framework's navigation, menu, focus and window tools rather than wrapping either mobile example in a larger frame.
