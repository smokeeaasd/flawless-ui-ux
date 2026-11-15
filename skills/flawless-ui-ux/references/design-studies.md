# Design studies

Consult a relevant study only when a worked composition helps resolve a choice. These original fictional plates illustrate relationships, not templates, prescribed fonts, or a ceiling on visual ambition. Inspect the relevant image when possible; the anatomy below remains usable without it.

The library now includes ten original worked cases across four references: two [service/public software studies](service-studies.md), four [product studies](product-studies.md), the two executable reading/collection cases below, and two [native source studies](native-studies.md). Open the [web example index](../assets/examples/index.html) directly or use its optional dependency-free loopback server. The existing plates remain composition illustrations; they are not browser or native verification evidence.

## Service offer

[View the service study](../assets/design-studies/service.png).

A rider needs repair prices and arrival instructions. Both proposals use the same facts:

- The price-led structure puts comparable service/price rows before the visit information.
- The process-led structure explains arrival, assessment, and collection before the prices.

Aligned amounts and a clear next action make either readable. Carry the type roles into hours, location, details, and any requested form. On narrow screens, keep each service paired with its price.

**Transfer:** choose which visitor question leads. A bold typographic offer and a restrained ledger can both preserve comparison. Verify accurate prices and a real destination for the visit action; the fictional name and palette are not the design principle.

## Operational workspace

[View the workspace study](../assets/design-studies/workspace.png).

A receptionist finds a bicycle, understands repair status, and marks work ready for collection. Compact navigation, search, status filters, aligned records, and a selected-record panel keep identity, state, and the next action close.

Reuse type roles and spacing in details, errors, and empty results. Keep selection and keyboard focus distinct. At narrower widths, preserve key record information and a detail/return path. A status change can alter membership in a filtered queue; counts and feedback must follow the actual rules.

**Transfer:** useful density through grouping and alignment. Verify the record/action relationship; tiny type and repair-themed styling are not requirements for an operational interface.

## Editorial guide

[View the reading study](../assets/design-studies/reading.png).

A reader learns furniture care, jumps to a topic, and returns to the explanation. Distinct title/body/note roles, a bounded reading column, and supporting contents navigation establish the path. Figures and captions stay related.

At smaller widths, move the index without covering the article; retain anchors, readable measure, and enlarged-text access.

**Transfer:** the relationship between reading and wayfinding. Strong photography or a text-led composition can express the subject. Verify heading order, reading continuity, and return paths rather than copying serif type or paper colors.

### 7. Executable reading path

Open the [reading example](../assets/examples/reading.html). Its original shelf-organizing text supplies a title, introduction, three meaningful headings, an inline note and a return link. The weak alternative would stretch paragraphs across the entire viewport or turn each short section into an equal-height card. Both would prioritize page geometry over reading.

The example bounds the reading measure, separates title/body/note roles and places contents beside the article on wide screens. Contents moves above the article on phones; it never overlays the text. Heading anchors preserve a route into and through the explanation. It uses system/Georgia fallbacks without remote font loading, so font selection is honest and inspectable rather than a claim about a downloaded family.

Check every contents destination, heading order and the return link. Enlarge text and verify the reading column can grow without fixed-height clipping. At intermediate widths, inspect both the index and article rather than assuming the desktop split scales indefinitely. If adapting to technical documentation, use actual examples, code overflow and reference needs; this short prose case does not establish those additional behaviors.

## Visual collection

[View the collection study](../assets/design-studies/collection.png).

A visitor explores fictional graphic works. A leading artifact, varied aligned image sizes, and adjacent title/category/year metadata let the work carry character without losing orientation.

Details preserve item identity and provide next/previous and return actions. On narrow screens, preserve order and readable metadata. Keep essential information available beyond hover and useful context on return.

**Transfer:** artifact scale, sequence, and navigation. Verify finding, opening, understanding, and leaving an item; the plate's palette and geometric artworks are examples, not assets to insert into unrelated products.

### 8. Executable collection and return

Open the [collection example](../assets/examples/collection.html). Three original inline vector compositions provide actual inspectable material. A larger leading artifact and smaller supporting works create rhythm; title/category/year roles remain adjacent and consistent. The weak alternative would use identically cropped thumbnails with essential information available only on hover.

Every work has a visible action and an image alternative describing its visual information. A native HTML dialog opens the selected work and note; Close and Escape should dismiss it and return focus. The small collection does not need search, pagination or an invented exhibition booking. It preserves metadata beyond hover and does not depend on a remote image service.

Test opening the first and last work with keyboard and pointer, verify title and note match the selected artwork, dismiss with both Close and Escape, and check returned focus and scroll context. Repeat at a phone width and enlarged text. Dialog behavior still needs target-browser and assistive-technology verification in a real project. A screenshot alone cannot establish the return path.

## Applying a study

Transfer the useful relationship to actual content and available resources. Supplied brand material or a mockup may be a better basis. Keep any rationale in working notes, not visitor-facing slogans.

Carry the chosen relationships into lower regions and relevant states. Compare the implemented result when tools permit; the plate itself proves neither responsive behavior nor working interactions.
