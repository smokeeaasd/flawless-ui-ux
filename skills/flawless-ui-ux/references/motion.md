# Motion with a job and a fallback

Use when a change of state, spatial relationship or expressive moment would benefit from motion. A static interface does not need animation merely because the implementation supports it. Preserve the project's established motion language during focused work. Read [Performance](performance.md) for rendering cost and platform references for native behavior.

## Identify what motion explains

Name the transition in user terms: a record moved to another group, a panel opened beside its source, a save completed, a selected image became the detail view. If removing the movement makes no information or character harder to understand, ask whether the effect earns its complexity.

Operational surfaces usually benefit from quick, predictable feedback that does not delay work. A public page or collection can support a more expressive authored sequence where the subject and material justify it. Do not impose a page-load performance on a dashboard that users reopen dozens of times a day. Repeated entrances can make a screen feel slower without changing network time.

Choose one focal moment rather than scattering unrelated effects. Its choreography should support hierarchy: what appears first, what remains visible and when the action becomes usable. A hero must not be blank until an observer fires. A user who scrolls quickly, presses Tab immediately or disables animation should still reach the content.

## Define the behavior before the easing

Specify trigger, start and end state, duration range, interruption behavior, reduced-motion alternative and the result if the script fails. For a disclosure, the authoritative state is open or closed; animation is a representation of that state. Rapid toggling must not leave content visually closed but keyboard-focusable.

For an interface transition, investigate roughly a few hundred milliseconds as a starting range, then test the task and distance. A tiny hover response can be shorter; a large spatial change may need more continuity. These are calibration ranges, not universal values. Do not simulate network latency to make a loading animation visible.

Use a shared easing and duration vocabulary where the project owns one. Avoid inventing a different spring or overshoot for every component. Springs should settle and remain interruptible; a control should not travel away from the pointer while the user tries to click it. Touch feedback and keyboard focus need their own visible responses beyond hover.

## Implement an already-usable default

Start from visible, functional content. Add enhancement only when its preconditions exist. For a small local transition, CSS can be enough; use the project's existing animation library when its capabilities are needed. Do not add a large runtime for a two-property hover.

```css
.action { transition: background-color 150ms ease, transform 150ms ease; }
.action:hover { transform: translateY(-1px); }
.action:active { transform: translateY(0); }
@media (prefers-reduced-motion: reduce) {
  .action { transition: none; transform: none; }
}
```

This example is appropriate only where a lift does not imply incorrect affordance or disturb layout. A static button can be equally good. Do not animate layout with margins to achieve this effect. Keep focus indicators stable and avoid removing them to protect an animation.

## Layout change and presence

For expanding content, preserve meaningful reading and focus order. A visual transform does not change DOM position. If a menu remains in the accessibility tree after its exit animation, it can trap navigation in invisible controls. Coordinate hidden/inert state with the component's actual semantics and existing accessible primitive.

An optimistic row removal needs feedback and focus handling even when its motion is smooth. A crossfade between chart ranges must still expose the selected period and exact values. Motion cannot substitute for the labels and state logic described in [States](states.md).

Avoid scroll-jacking and pointer effects that obscure controls. Scroll-linked sequences need a usable reading path, especially on small screens and with reduced motion. Do not use a scroll trigger as the only way for essential information to appear. Sticky scenes can consume large portions of the page; test whether users can pass through, navigate by keyboard and return without getting lost.

## Reduced motion and continuous effects

Respect the user's motion preference using an intentional alternative. Remove unnecessary spatial movement while preserving meaningful state feedback. For video and long-running movement, evaluate the applicable pause/stop requirements and provide controls where needed. Do not assume that a loop is harmless because each cycle is short.

Check flashing, rapid contrast changes and parallax separately from average frame rate. A smooth effect can still be uncomfortable. Autoplay audio requires explicit product justification and user control; a decorative visual pass does not authorize it.

Test with scripts disabled when the page should remain useful without them. If an enhancement fails, show a still, meaningful content rather than an empty canvas or invisible image. Native platforms use their own reduced-motion mechanisms and transition expectations; a CSS media query is not native verification.

## Performance and verification

Prefer changes the rendering engine can handle efficiently for the actual surface, but do not assume every transform is cheap or every filter acceptable. Large blur, shadows, excessive layers and many simultaneous animations can be expensive. Profile the real page on a representative environment when performance matters. See Performance for measurements and limitations.

Exercise repeated input, immediate navigation, interrupted transitions, reduced motion, narrow width and a slow or failed asset. Check that controls can be used before visual sequencing ends and that no final state depends on an animation event that may not fire. Compare before and after with the same task: an effect that makes a recording impressive but slows ordinary work should be revised or removed.
