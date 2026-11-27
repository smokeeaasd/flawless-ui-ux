# States and interface resilience

Choose states from actual application behavior, never a checklist of fictional delays. Synchronous local filters update immediately; remote saves need real pending, success, and recoverable error paths. Coordinate with [Forms](forms.md), [Tables](tables.md), and [Interaction](interaction.md).

## Checklist

- **Single source of truth:** derive UI states from one state model; avoid contradictory boolean pairs (`isLoading && isSuccess`). Preserve the project's existing state architecture.
- **Distinguish empty from failed:**
  - *New account (0 records):* explain how to create the first item.
  - *Filtered/search zero-match:* explain no matches and keep search + a clear-filters action visible.
  - *Permission-limited:* state the access boundary and supported route without leaking data.
  - *Load failure:* state failure and provide a retry path without implying zero records exist.
- **Keep continuity and focus:** retain entered input and filter context across errors. When a selected item disappears or moves out of filter, choose a sensible fallback focus target (e.g., search input or list heading) instead of dropping focus to `document.body`.
- **Guard async races:** prevent stale search responses from overwriting newer input, and label local/demo boundaries honestly without fake spinners or fabricated persistence.
- **Verify extremes:** inspect empty, single-item, long-label, narrow (`390px`), and error states before delivering.
