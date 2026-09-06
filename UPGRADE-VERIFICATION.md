# Dependency upgrade and production verification — 2026-09-05

## Deployment update — 05:42 UTC

Following the user's explicit instruction to deploy despite the previously reported CMS failures, the latest website was built on the server and deployed to https://greenai.percepco.co.uk/.

- Release: `/opt/greenai-releases/20260905-upgrade`.
- Image: `greenai:20260905-next16` (32a6c2d174b9).
- Live container: `greenai-next16-20260905`, listening on host loopback port 3002.
- Nginx configuration tested successfully, then gracefully reloaded from upstream 3001 to 3002.
- Previous `greenai` container remains running on port 3001 for rollback. Original Nginx configuration is saved at `/opt/greenai-releases/20260905-upgrade/nginx-green-before.conf`. To roll back, restore that file to `/etc/nginx/sites-enabled/green`, run `nginx -t`, then reload Nginx.
- Candidate has a 15-second HTTP health check, restart-unless-stopped policy, and logs capped at three 10MB files. Docker health checks report health; they do not themselves restart an unhealthy but running process.
- Server production build and TypeScript passed. Six candidate routes and an optimized-image request returned 200; image-cache permissions are writable.
- Twelve consecutive public availability checks passed after cutover. Through approximately 05:43:40 UTC, the container remained healthy with zero restarts, no OOM, and no application errors in its logs. This short observation does not establish long-term crash freedom.
- Public browser checks at 1440px and 390px: all eight document responses 200, no uncaught JavaScript errors, no horizontal overflow. Observed TTFB 213–237ms and DOMContentLoaded 1296–1639ms from the test machine.
- The browser test still exits nonzero because the pre-existing g-stack CMS endpoints return HTTP 500. No CMS hostname, database, or CMS deployment was changed. Full CMS functionality remains unresolved.

The notes below record the earlier local verification, before deployment was authorized again.

The website dependencies were upgraded to npm's current stable releases, including Next.js 16.3.4, React/React DOM 19.2.8, TypeScript 7.0.2 and Tailwind 4.3.3. Both website lockfiles were synchronized. The separate figma-mcp helper was also upgraded; its CommonJS callers now dynamically import node-fetch 3. Both npm audits report zero vulnerabilities. Existing user changes were preserved.

Astra reviewed the frontend's CMS consumption. No separate CMS implementation or SQL dump was found in the repository or the searched Downloads, Desktop, Documents and Projects folders. Claude Code is installed but `claude auth status` reports loggedIn=false, so the fixes were applied by Codex, not Claude.

Applied findings:
- Women in Energy and Community Voices share TanStack Query requests across page/dialog instances, with cancellation and a 60-second stale time.
- Navigation requests abort on cleanup and ignore stale state writes.
- Navigation dispatch callbacks remain stable across renders.
- Removed redundant per-render mobile state effects from three Team Green dialogs.
- Community Voices now selects its existing responsive component for mobile rather than the desktop canvas.

Production verification:
- `npm run build` passed, including TypeScript and 73 generated static pages.
- `npm run start -- --hostname 127.0.0.1` serves port 3001.
- `node scripts/verify-production.mjs` checked home, Join Us, Women in Energy and Community Voices at 1440px and 390px.
- All eight document responses were HTTP 200, with no uncaught page errors and no horizontal document overflow after the mobile fix.
- Observed local HTML TTFB: 3–59ms; DOMContentLoaded: 41–345ms. These are smoke-test observations, not a complete performance benchmark or production-network guarantee.
- The browser verification correctly exits nonzero: the external g-stack CMS returns HTTP 500 for all three tested empower endpoints. Query retry attempts are visible. Full data-driven functionality and end-to-end performance remain unverified.
- Figma helper JavaScript syntax checks pass; live Figma mutation/generation was not exercised.

No deployment was performed. The user's deployment condition (healthy full application with local database verification) has not been met. The supplied deployment host responds to SSH but BatchMode key authentication was rejected. A SQL dump and CMS source location are required to complete local database setup and diagnose the upstream failures. Claude authentication is required for the specifically requested Claude workflow.
