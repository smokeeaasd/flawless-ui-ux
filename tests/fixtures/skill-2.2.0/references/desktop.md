# Desktop applications and working windows

Use for native desktop apps, Electron-style shells and cross-platform desktop interfaces. Identify operating systems, minimum window sizes, keyboard conventions and actual framework before choosing controls. A desktop browser fixture does not prove native menu, accessibility or window behavior.

## Start from the working scene

Desktop users may keep several windows open, resize a tool beside another application, use a keyboard throughout or work with a large dataset. A wide screenshot does not justify spreading a short form across the entire monitor. Choose a content width and density suited to the task, and let useful working regions use available space.

Differentiate navigation, tools and document content. A toolbar action acts on the current object; a sidebar destination changes the work area; an inspector edits properties of a selection. Mixing these roles into visually identical cards makes the interface harder to predict. Reuse established application conventions where they exist.

Preserve window controls, system menus and familiar shortcuts. A custom title bar must retain supported dragging, resizing and accessibility behavior; a visual refinement does not authorize replacing it. Do not intercept common text-editing shortcuts or system combinations for decorative commands. Provide discoverable menu labels or tooltips for supported shortcuts rather than requiring memorization.

## Density without miniaturization

Use stable type roles, alignment and grouping to support repeated use. Dense records can be appropriate, but small type and tightly packed click targets are not the only way to fit information. Reduce repeated explanatory chrome, keep units and periods attached, and place object actions near their object. Give a frequently used control a predictable location.

Consider narrow working windows and enlarged text. A 1440px layout may be used at half that width beside an editor. Choose whether an inspector collapses, becomes a separate view or remains visible while another region scrolls. Preserve selection and a return path. Check minimum-size behavior against the framework and supported operating systems.

## Input and focus

Ensure every required task has a keyboard path. Focus must remain visible through sidebars, toolbars, dialogs and nested panes. Arrow keys may navigate a composite control while Tab moves between controls; use the established accessible component behavior rather than inventing inconsistent interactions. Do not put every cell in a large read-only table into the tab sequence without a usable model.

Context menus and drag-and-drop can supplement a clear operation but should not be its only route. Explain where a dragged object can land and how failure is represented. Preserve keyboard alternatives for moving or selecting items where the product supports that task. Test focus after a pane closes or a selected record is removed.

In web-based shells, ordinary DOM semantics remain important, but native menus, file dialogs and operating-system permissions require host-specific testing. A browser automation pass cannot cover an unobserved native dialog. Avoid opening or modifying the user's real files solely to demonstrate an interface.

## States and persistence

Distinguish unsaved changes, local saves, synchronization and remote confirmation. A desktop app may remain open for hours; stale status and lost selection matter. Follow the product's persistence model and recovery behavior instead of adding a generic toast after every click.

Permission failures, unavailable files and disconnected devices need actionable explanations grounded in actual integration behavior. Keep working content available where safe. Do not label a missing file as an empty document. A retry path should preserve useful user work and avoid repeating a destructive operation blindly.

## Platform fit

Consult current platform guidance when the task depends on native behavior: [Windows app design](https://learn.microsoft.com/windows/apps/design/), [Apple platform design](https://developer.apple.com/design/human-interface-guidelines/) and the project's Linux toolkit conventions as applicable. Preserve the supported framework and versions. A local design improvement rarely justifies migrating a desktop application to another toolkit.

For a cross-platform product, define what is shared and what follows the host. Brand tokens and information structure can be common while menus, shortcuts, window handling and controls differ. Do not present one platform's screenshot as validation of all supported systems.

## Acceptance

Exercise the primary task in the actual application when available. Resize through supported working widths, test enlarged text, keyboard navigation, dialogs and relevant window states. Check focus and selection after changes, including failure and return paths. Record OS, toolkit and observations. If only source or a web companion can be inspected, report native behavior as unobserved rather than claiming desktop coverage from a browser scan.
