---
name: TWG programmatic scrolling with Lenis
description: How to scroll programmatically in the tgw-network app (Lenis hijacks native scroll)
---

The tgw-network app runs Lenis smooth-scroll (created in `useSmoothScroll.ts`, driven by a RAF loop in App). Lenis takes over the scroll position, so `window.scrollTo(...)` does NOT behave reliably for programmatic scrolling (scroll-to-top, anchor/section jumps, "back to top" buttons).

**Rule:** route any programmatic scroll through the shared Lenis instance. `useSmoothScroll.ts` exports `scrollToTop(immediate)` which calls `lenis.scrollTo(0, { immediate })` and falls back to `window.scrollTo` only when Lenis isn't initialized yet. For arbitrary targets use `lenis.scrollTo(target, opts)` — add a getter/helper rather than touching `window.scroll*` directly.

**Why:** Lenis intercepts wheel/scroll and animates transform-based position; native scroll calls fight it or get overridden. Verified when adding scroll-to-top on nav.

**How to apply:** Scroll-to-top on route change lives in `Layout.tsx` (`useEffect` on `[location]` → `scrollToTop(true)`). Same-page nav clicks (e.g. logo while already home) don't change wouter's `location`, so they won't trigger the route effect — they're handled by `onClick` guards (`location === href → scrollToTop(false)`). Effect ordering note: Layout's child effect runs before App's parent `useSmoothScroll` effect on first mount, so `lenisInstance` is null then and the window fallback covers initial load.
