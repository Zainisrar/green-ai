# BUG FIX TASK STATE (canonical)

## Done — ALL bugs 60–100 complete (latest commit aab543e)
Bugs 72, 75, 78, 80, 81, 82, 83, 84/85, 86, 87, 91, 92, 93, 94 (earlier), 95/96 Partner With Us & Become a Supplier, 97 Investor Relations, 99 Request a Proposal, 100 Find Us Globally (reach-us), 71/98 Contact Us (popup form verified).

## Working pattern (proven)
1. Dump node subtree: python script walking /tmp/reach_file.json (root = d['document']), start at target node, emit REL coords + text/font/fill (scripts like /tmp/*dump*.py exist from earlier bugs; write new one per bug at /tmp/dumpN.py).
2. Render: curl Figma images API "https://api.figma.com/v1/images/s4XHMhWuuo8LMFx2ojKFRI?ids=<urlenc-id>&scale=2" with token from .env.local FIGMA_ACCESS_TOKEN (also /home/ubuntu/.user_env). Download JSON URL to /tmp/render.png.
3. Route component → screenshot via playwright: `npx playwright screenshot --browser=chromium --viewport-size=1920,970 --wait-for-timeout=8000 "http://127.0.0.1:5005/ROUTE?v=N" /tmp/cur.png`. Dev server on 5005 (restart if dead: `pnpm dev > /tmp/dev2.log 2>&1 &`).
4. Compare with sidebyside.py / diff_overlay.py (both in /home/ubuntu) and tight bbox scripts in /tmp (tight.py pattern: thr=730 color masks).
5. Fix TSX/CSS in src/app/components/<Name>/*.tsx|.css (canvas pages use absolute positioning matching Figma; shared components SiteHeader, FigmaAngledCta, D6Chatbot — chatbar placeholder figmaPlaceholder prop per spec, triggerVariant="figmaCanvas" canonical top:899 left:1498 w418 h52).
6. Vertical Raleway titles: use Figma-extracted PNG (render TEXT node via images API, Next.js img). CSS text-stroke never works in headless.
7. Typecheck `npx tsc --noEmit`, iterate screenshots, commit: `source /home/ubuntu/.user_env && cd /home/ubuntu/green-ai && git add -A && git commit -m "..." && git pull --rebase fork main && git push fork main`.

## Notes
- Node dump REL coords for node 7077:4218 subtree were RELATIVE to subtree root — absolute coords verified by measuring rendered image instead. Always sanity-check a few known landmarks (nav, logo, title) against render before trusting REL.
- Chatbar defaults: figmaPlaceholder 'Type your words....'; homepage + solar EPCM = 'Let's Talk Energy'.
