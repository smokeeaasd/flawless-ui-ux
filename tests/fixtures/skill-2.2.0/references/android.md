# Native Android decisions

Use for Jetpack Compose, Android Views and cross-platform apps shipping on Android. Start from the project's supported SDKs and current [Android design guidance](https://developer.android.com/design/ui). The platform's navigation, input and accessibility behavior matters more than copying the silhouette of a web page or another operating system.

## Structure and adaptation

Identify primary destinations, hierarchical navigation and bounded actions. Use the app's established navigation model and handle system Back consistently, including the behavior supported by its target versions. Do not trap users in a custom overlay or intercept a familiar gesture merely to preserve an animation.

Choose compact and expanded layouts from the task. A phone destination bar can become a rail or another appropriate model on larger windows. A list/detail relationship can use extra space to preserve context. The transition must keep selected record, state and return behavior coherent; swapping layouts should not duplicate a save or reset a form.

Respect window insets, edge-to-edge content, display cutouts and the input method editor. Test focused fields with the keyboard open. A bottom submit action that disappears beneath the keyboard is a functional issue even if the closed-keyboard screenshot looks complete. Support resizable windows and foldable postures when they are within the product's supported scope.

## Typography and controls

Use scalable text and semantic component roles. Do not equate CSS pixels, Android density-independent pixels and text scale units. Test large font settings with actual content, long labels and numerical values. Let containers grow and reconsider rows before clipping text or reducing the user's chosen scale.

Use the project's reliable Material or platform components where they fit. Theme their roles rather than drawing unrelated control families for each screen. A switch needs a clear label and state; a text field needs persistent explanation and associated error; a selection control should announce its actual value. Provide hit areas consistent with current platform guidance and inspect the real target, not just the icon dimensions.

Preserve familiar interaction expectations in a cross-platform app. Sharing code does not make an iOS-shaped Back model appropriate on Android. Conversely, not every visual element must be a stock component: brand can appear through deliberate color, type, imagery and content within the platform's usable structure.

## Semantics and state

Expose useful semantics to TalkBack and other assistive technology. Group a record's name and status when it helps comprehension, but retain separately operable actions. Decorative icons should not repeat the visible label as unnecessary announcements. Do not apply a generic content description to every nested element without listening to the resulting sequence.

Keep selected, disabled, pending and error states accurate. A failed save should preserve data where supported and offer a safe recovery. A local demonstration must not report a remote completion. A status change that moves a record out of a filter should explain the result and leave focus somewhere meaningful.

Verify themes and dynamic color behavior when the app supports them. Semantic roles should retain their meaning in light, dark and higher-contrast conditions. Respect motion preferences and keep useful feedback available when spatial animation is reduced.

## Worked adaptation

A reading list can keep an article's title, category and local saved-mark action together. On a narrow screen, allow titles and action labels to wrap rather than placing them at the far edge of an overflowing row. On an expanded window, use the host's existing layout and navigation model. The [native study](native-studies.md) includes a Compose source fragment demonstrating a simple searchable list, not a fully integrated application.

Do not add a filter, export or account menu solely because a dashboard template has one. If filtering is requested, verify its interaction with status updates and accessible result feedback. The data and action rules remain the product's own.

## Verification boundary

Build with the project's supported toolchain and test on an emulator or device where available. Exercise system Back, keyboard visibility, text scaling, semantics, themes and the supported window classes. A source check cannot establish that an inset or focus transition works on a device.

When Gradle, an SDK, emulator or project shell is unavailable, inspect useful source behavior and state the limit. Do not report compilation or native screenshots that did not happen. The web inspection CLI is still useful for a web companion but is not an Android accessibility or performance engine.
