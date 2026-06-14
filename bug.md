# GreenAI Application Bug Report

> **Status:** All reported bugs fixed (2026-06-14)  
> **Last audit:** 6/6 tests passed · 0 actionable issues remaining

## Fixes Applied

### Critical
- **Supply Partners crash** — Moved `useState`/`useEffect` above early return in `SupplyPartners.tsx` (Rules of Hooks violation)

### High
- **Broken `/elements` route** — Aligned `ProductNavigation` links with `TopNavigation`; added redirect in `next.config.ts`
- **Inconsistent nav URLs** — Product nav now uses same paths as top nav (`/empower/join-us`, `/engage/reach-us`, etc.)

### Medium
- **Handbook React key warning** — Moved `key` to `<h3>` in quote `.map()`
- **Broken Cloudinary/API images** — Added `handleImageError()` fallbacks across Supply Partners, Technology Innovation Alliances, Expertise, Flagship Projects, Fast Facts, Global Snapshot, and Our Value Chain
- **Map carousel aborts** — ReachUs now preloads maps and only rotates successfully loaded images

### Low (Accessibility)
- Added `role="presentation"` or descriptive `alt` text on decorative images across D6Template, Handbook, Women in Energy, Flagship Projects, Public Events, Reports, Leadership Team, Fast Facts, and Technology Innovation Alliances
- Global Snapshot API icons now have fallback alt text

## Re-run audit

```bash
pnpm run dev
npx playwright test tests/app-audit.spec.ts --workers=1
```
