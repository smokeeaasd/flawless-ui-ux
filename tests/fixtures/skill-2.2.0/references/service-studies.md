# Service and public software studies

These are original fictional cases. The [example index](../assets/examples/index.html) opens directly in a browser. For an HTTP preview with Node, run `node /path/to/skill/assets/examples/serve.mjs`; it prints a loopback URL and defaults to port 4178. Pass a different port as the first argument if occupied. No build, dependency installation, remote font or network service is needed. Stop the process after review. Read source alongside the rendered result.

## 1. A café visit: from a slogan to a decision

Open [Alder café](../assets/examples/cafe.html). The visitor needs the menu, prices, hours and address. The source deliberately has no reviews, booking service or mailing list. Supplied facts are enough to make an honest small page. A typographic direction also avoids implying an unavailable photograph of an actual place.

**Weak starting relationship:** a large promotional opening followed by three equal “quality / community / craft” cards would repeat a mood while delaying the useful facts. A smaller button or a different gradient would not fix the information order.

**Chosen relationship:** the opening names the offer; the next region pairs each item with its price and subordinate description; a contrasting visit region groups hours and arrival information. The menu leads because it answers a likely first decision. The warm palette and expressive type treatment remain supporting character. None is required for another café or service.

Compare alternatives using the same facts. A transit-adjacent shop with a time-sensitive audience could lead with hours and an abbreviated offer. A destination café with suitable licensed photography could lead with the place. A repair service may need comparable prices or an explanation of assessment. Transfer the question that leads, not this page's nouns or colors.

**Implementation:** examine the `.pair`, `.list`, `.split` and `.band` relationships in [shared CSS](../assets/examples/shared.css). Names and prices share a row; descriptions remain with their item. At small widths the two-column regions stack without creating a card for each sentence. Text and actions are ordinary HTML. The menu action has a real section destination.

**Check:** use a phone width and enlarged text, read every price with its item, follow the menu action, locate the closed day and verify the stated integration boundary. Inspect long service names if adapting the pattern. Do not add a reservation action unless the project actually supports one. A visually convincing local example cannot establish real hours, accessibility of a building or ingredient safety; replace fictional facts from confirmed sources.

## 2. A software offer: demonstrate a job

Open [Patchnote](../assets/examples/software.html). The fictional product relates a release change, owner and next check. The page demonstrates that job with an expandable local release note. It does not claim a shipped service.

**Weak starting relationship:** an abstract headline, generic feature grid and invented adoption numbers would ask visitors to trust a product they cannot inspect. Repeating “work faster” in every region would not explain what changes in their workflow.

**Chosen relationship:** explanation and a concrete release example share the opening. A real disclosure exposes the handoff detail. The following sequence gives three different answers—change, owner, next check—and the final boundary says precisely what the demonstration can do. The copy is allowed to be compact because it carries distinct information.

**Implementation:** the disclosure is a button with synchronized `aria-expanded`, `aria-controls` and a hidden region in [shared JavaScript](../assets/examples/shared.js). No fake installation command, unsupported integration or dead “Get started” action is included. This does not require replacing a real product's working signup: preserve and test it if supplied.

**Check:** activate the disclosure with keyboard and pointer, verify state and detail agree, and follow both section links at narrow width. Read the opening, sequence and boundary as one argument. Confirm every product claim against the implementation. In a real product, prefer an honest screenshot, runnable example or documentation destination to fabricated customer proof.

## Use the pattern without cloning it

Both cases make the next decision reachable, but one organizes comparable offerings and the other demonstrates a workflow. Sharing a font or button style is not their substantive similarity. Before adapting, write what the actual visitor needs to decide and identify the content that answers it. If a region has no new answer, revise or remove it within scope rather than filling its space with decorative reassurance. Use [Direction](direction.md), [Copy](copy.md) and [Layout](layout.md) for unresolved choices.
