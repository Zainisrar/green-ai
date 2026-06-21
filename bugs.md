# GreenAI Application Bug Report

> **Generated:** 2026-06-16T19:05:00.000Z  
> **Status:** All 9 bugs fixed (2026-06-16)  
> **Test tools:** Playwright MCP (browser automation) + `@playwright/test` audit suite  
> **Base URL:** http://localhost:5000

## Summary

| Severity | Found | Fixed |
|----------|-------|-------|
| Critical | 0 | 0 |
| High     | 4 | 4 |
| Medium   | 3 | 3 |
| Low      | 2 | 2 |
| **Total** | **9** | **9** |

---

## Fixes Applied

### High

#### BUG-001: Newsletter page has no signup form
- Added `NewsletterSignupModal.tsx` with email, optional name, captcha, and API submission
- Wired "Sign up" button in `NewsletterSignup.tsx` to open the modal

#### BUG-002: Request a Proposal page has no functional form
- Added `Proposal.tsx` modal with contact, organization, project type, and description fields
- Wired CTA image in `RequestProposal.tsx` to open the proposal modal

#### BUG-003: Supplier Partner login form is non-functional
- Replaced test placeholder with proper email + password fields in `Login.tsx`
- Added form submit handler posting to `app-gsolve.green.com.pg/login/supply_partner/`
- Added success/error feedback messages

#### BUG-004: Book Consultation form does not persist submissions
- Updated `Booking.tsx` to submit via shared `submitReachUs()` API helper
- Added success/error messages and form reset on successful submission

### Medium

#### BUG-005: Broken Cloudinary icon on Global Snapshot
- Added `SafeImage` component that preloads API icons and falls back before render
- Applied to stat and feature icons in `GlobalSnapshot.tsx`

#### BUG-006: Booking form uses static hardcoded captcha
- Replaced static `1 2 4 5` captcha with randomized `generateCaptcha()` in `Booking.tsx`

#### BUG-007: Supplier login enquiry button is non-interactive
- Wired enquiry button in `Login.tsx` to open the shared Reach Us contact form modal

### Low

#### BUG-008: Book Consultation background image path has trailing space
- Fixed `src` in `BookConsulation.tsx`: `/images/book-consulation/mainImg.png`

#### BUG-009: Newsletter page decorative overlay blocks interactions
- Added `pointer-events-none` to newsletter background image layer
- Added `relative z-10` to content wrapper
- Added `pointer-events-none` to decorative `greenShape.png` in `TopNavigation.tsx`

---

## New shared utilities

- `src/app/lib/forms.ts` — captcha generation, reach-us submission, supplier login helpers
- `src/app/components/shared/SafeImage.tsx` — preload + fallback for API-sourced images

---

## Re-run audit

```bash
npm run dev
npx playwright test tests/app-audit.spec.ts --workers=1
```
