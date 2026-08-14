import { test, expect, type Page, type ConsoleMessage } from '@playwright/test';
import * as fs from 'node:fs';
import * as path from 'node:path';

const BASE_URL = 'http://127.0.0.1:5005';

export interface BugReport {
  id: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  category: string;
  title: string;
  url: string;
  description: string;
  stepsToReproduce?: string;
  expected?: string;
  actual?: string;
}

const bugs: BugReport[] = [];
let bugCounter = 0;

function addBug(bug: Omit<BugReport, 'id'>) {
  bugCounter += 1;
  bugs.push({ id: `BUG-${String(bugCounter).padStart(3, '0')}`, ...bug });
}

function collectStaticRoutes(): string[] {
  const appDir = path.join(process.cwd(), 'src', 'app');
  const routes: string[] = ['/'];

  function walk(dir: string, routePrefix: string) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    const hasPage = entries.some((e) => e.isFile() && e.name === 'page.tsx');
    const isDynamic = routePrefix.includes('[');

    if (hasPage && !isDynamic) {
      routes.push(routePrefix || '/');
    }

    for (const entry of entries) {
      if (!entry.isDirectory()) continue;
      if (entry.name === 'api' || entry.name === 'components') continue;

      const segment = entry.name;
      const isDyn = segment.startsWith('[');
      const nextPrefix =
        routePrefix === '/'
          ? isDyn
            ? `/${segment}`
            : `/${segment}`
          : `${routePrefix}/${segment}`;

      walk(path.join(dir, segment), nextPrefix);
    }
  }

  walk(appDir, '/');
  return [...new Set(routes)].sort();
}

async function fetchDynamicSlugs(): Promise<string[]> {
  const routes: string[] = [];

  const apiFetches: Array<{ pattern: string; url: string; slugKey?: string }> = [
    { pattern: '/home/[slug]', url: 'https://g-stack.green.com.pg/api/home', slugKey: 'slug' },
    { pattern: '/expertise/[slug]', url: 'https://g-stack.green.com.pg/api/expertise' },
    { pattern: '/engineering/products/[slug]', url: 'https://g-stack.green.com.pg/api/engineering/products' },
    { pattern: '/enlighten/insights-articles/[slug]', url: 'https://g-stack.green.com.pg/api/enlighten/insights-articles' },
    { pattern: '/insights/[slug]', url: 'https://g-stack.green.com.pg/api/insights' },
  ];

  for (const { pattern, url, slugKey } of apiFetches) {
    try {
      const res = await fetch(url);
      if (!res.ok) continue;
      const json = await res.json();
      const items = Array.isArray(json?.data) ? json.data : [];
      const prefix = pattern.replace('/[slug]', '');

      for (const item of items.slice(0, 5)) {
        const rawSlug = slugKey ? item[slugKey] : item.slug;
        if (!rawSlug) continue;
        const slug = String(rawSlug).startsWith('/') ? String(rawSlug) : `${prefix}/${rawSlug}`;
        routes.push(slug.replace(/\/+/g, '/'));
      }
    } catch {
      // API unavailable — skip dynamic routes for this pattern
    }
  }

  return routes;
}

async function auditPage(page: Page, url: string) {
  const consoleErrors: string[] = [];
  const consoleWarnings: string[] = [];
  const failedRequests: string[] = [];

  const onConsole = (msg: ConsoleMessage) => {
    const text = msg.text();
    if (msg.type() === 'error') consoleErrors.push(text);
    if (msg.type() === 'warning') consoleWarnings.push(text);
  };

  const onRequestFailed = (request: { url: () => string; failure: () => { errorText: string } | null }) => {
    const failure = request.failure();
    if (failure) {
      failedRequests.push(`${request.url()} — ${failure.errorText}`);
    }
  };

  page.on('console', onConsole);
  page.on('requestfailed', onRequestFailed);

  const response = await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 45_000 }).catch(() => null);
  await page.waitForTimeout(2000);

  if (!response) {
    addBug({
      severity: 'critical',
      category: 'Navigation',
      title: 'Page failed to load',
      url,
      description: 'Navigation timed out or threw before a response was received.',
      stepsToReproduce: `Navigate to ${url}`,
      expected: 'Page loads within timeout',
      actual: 'Navigation failed or timed out',
    });
    return;
  }

  const status = response.status();
  if (status >= 400) {
    addBug({
      severity: status >= 500 ? 'critical' : 'high',
      category: 'HTTP',
      title: `HTTP ${status} response`,
      url,
      description: `Server returned status ${status}.`,
      stepsToReproduce: `Navigate to ${url}`,
      expected: 'HTTP 200',
      actual: `HTTP ${status}`,
    });
  }

  const title = await page.title();
  if (!title || title.trim() === '') {
    addBug({
      severity: 'low',
      category: 'SEO / Accessibility',
      title: 'Missing page title',
      url,
      description: 'Document has an empty or missing <title>.',
    });
  }

  const bodyText = await page.locator('body').innerText().catch(() => '');
  const errorPatterns = [
    /application error/i,
    /something went wrong/i,
    /unhandled runtime error/i,
    /failed to fetch/i,
    /error loading/i,
    /cannot read propert/i,
    /is not defined/i,
    /hydration failed/i,
  ];

  for (const pattern of errorPatterns) {
    if (pattern.test(bodyText)) {
      addBug({
        severity: 'high',
        category: 'Runtime',
        title: 'Visible error message on page',
        url,
        description: `Page body contains error text matching: ${pattern}`,
        actual: bodyText.slice(0, 300),
      });
      break;
    }
  }

  const images = page.locator('img');
  const imgCount = await images.count();
  let brokenImages = 0;
  let missingAlt = 0;
  for (let i = 0; i < Math.min(imgCount, 30); i++) {
    const img = images.nth(i);
    const src = await img.getAttribute('src');
    const alt = await img.getAttribute('alt');
    const naturalWidth = await img.evaluate((el: HTMLImageElement) => el.naturalWidth).catch(() => 1);

    if (src && !src.startsWith('data:') && naturalWidth === 0) {
      brokenImages += 1;
      if (brokenImages <= 3) {
        addBug({
          severity: 'medium',
          category: 'Assets',
          title: 'Broken image',
          url,
          description: `Image failed to load: src="${src}"`,
        });
      }
    }

    if ((alt === null || alt === '') && missingAlt < 2) {
      const isDecorative = await img.getAttribute('role');
      if (isDecorative !== 'presentation') {
        missingAlt += 1;
        addBug({
          severity: 'low',
          category: 'Accessibility',
          title: 'Image missing alt text',
          url,
          description: `Image without alt attribute: src="${src?.slice(0, 80)}"`,
        });
      }
    }
  }
  if (brokenImages > 3) {
    addBug({
      severity: 'medium',
      category: 'Assets',
      title: 'Multiple broken images',
      url,
      description: `${brokenImages} images failed to load on this page (showing first 3 above).`,
    });
  }

  for (const err of consoleErrors) {
    if (err.includes('favicon') || err.includes('DevTools')) continue;
    addBug({
      severity: 'medium',
      category: 'Console',
      title: 'JavaScript console error',
      url,
      description: err.slice(0, 500),
    });
  }

  for (const req of failedRequests) {
    if (
      req.includes('favicon') ||
      req.includes('hot-update') ||
      req.includes('webpack') ||
      req.includes('_rsc=') ||
      req.includes('g-stack.green.com.pg') ||
      (req.includes('ERR_ABORTED') && req.includes('cloudinary'))
    ) continue;
    addBug({
      severity: 'medium',
      category: 'Network',
      title: 'Failed network request',
      url,
      description: req.slice(0, 500),
    });
  }

  page.off('console', onConsole);
  page.off('requestfailed', onRequestFailed);
}

test.describe('GreenAI Application Audit', () => {
  test('audit all static routes', async ({ page }) => {
    test.setTimeout(600_000);
    const routes = collectStaticRoutes();
    for (const route of routes) {
      await auditPage(page, `${BASE_URL}${route}`);
    }
  });

  test('audit dynamic routes from API', async ({ page }) => {
    const routes = await fetchDynamicSlugs();
    for (const route of routes) {
      await auditPage(page, `${BASE_URL}${route}`);
    }
  });

  test('homepage hero and navigation', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const logo = page.locator('img[alt="logo"], img[alt="GREEN logo"], img[alt="GREEN"], img[alt*="GREEN"], a[href="/"] img').first();
    await expect(logo).toBeVisible({ timeout: 10_000 }).catch(() => {
      addBug({
        severity: 'high',
        category: 'UI',
        title: 'Logo not visible on homepage',
        url: '/',
        description: 'Main logo image is not visible after page load.',
      });
    });

    const navLinks = page.locator('a').filter({ hasText: /Explore|Energy|Expertise|Enlist|Engage|Elements/i });
    const count = await navLinks.count();
    if (count < 4) {
      addBug({
        severity: 'high',
        category: 'Navigation',
        title: 'Top navigation links missing',
        url: '/',
        description: `Expected at least 4 main nav links, found ${count}.`,
      });
    }
  });

  test('navigation modal opens', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const menuTrigger = page.locator('img[alt="lighting"]').first();
    if (await menuTrigger.isVisible()) {
      await menuTrigger.click();
      await page.waitForTimeout(1500);

      const navPanel = page.locator('button').filter({ hasText: /Explore|Energy|Evolution|Ecosystem/i });
      const visible = await navPanel.first().isVisible().catch(() => false);
      if (!visible) {
        addBug({
          severity: 'high',
          category: 'Navigation',
          title: 'Navigation modal does not open',
          url: '/',
          description: 'Clicking the menu icon does not reveal navigation sections.',
          stepsToReproduce: 'Go to homepage → click lighting/menu icon',
          expected: 'Full navigation panel with sections',
          actual: 'Navigation panel not visible',
        });
      }
    }
  });

  test('broken internal nav links in ProductNavigation', async ({ page }) => {
    const brokenRoutes = [
      { route: '/elements', expected: '/engineering/products/lighting-up-and-lifting-up-living-standards' },
      { route: '/enlist', expected: '/empower/join-us' },
      { route: '/engage', expected: '/engage/reach-us' },
    ];
    for (const { route } of brokenRoutes) {
      const res = await page.goto(`${BASE_URL}${route}`, { waitUntil: 'domcontentloaded' }).catch(() => null);
      const status = res?.status() ?? 0;
      if (status === 404) {
        addBug({
          severity: 'high',
          category: 'Navigation',
          title: `Broken nav route: ${route}`,
          url: route,
          description: `ProductNavigation links to ${route} but route returns 404. TopNavigation uses different paths (/empower/join-us, /engage/reach-us).`,
          stepsToReproduce: `Navigate to ${route}`,
          expected: 'Valid page or redirect',
          actual: 'HTTP 404',
        });
      }
    }
  });

  test('contact and form pages render', async ({ page }) => {
    const formPages = ['/engage/contact-us', '/engage/reach-us', '/engage/newsletter', '/engage/book-a-consultation'];
    for (const route of formPages) {
      await auditPage(page, `${BASE_URL}${route}`);
    }
  });

  test.afterAll(async () => {
    const deduped = dedupeBugs(bugs);
    const outPath = path.join(process.cwd(), 'bug.md');
    fs.writeFileSync(outPath, formatBugReport(deduped, collectStaticRoutes().length), 'utf-8');
    console.log(`\nWrote ${deduped.length} bugs to ${outPath}`);
  });
});

function dedupeBugs(items: BugReport[]): BugReport[] {
  const seen = new Set<string>();
  return items.filter((b) => {
    const key = `${b.url}|${b.title}|${b.description.slice(0, 100)}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function formatBugReport(items: BugReport[], routeCount: number): string {
  const bySeverity = {
    critical: items.filter((b) => b.severity === 'critical'),
    high: items.filter((b) => b.severity === 'high'),
    medium: items.filter((b) => b.severity === 'medium'),
    low: items.filter((b) => b.severity === 'low'),
  };

  const lines: string[] = [
    '# GreenAI Application Bug Report',
    '',
    `> Generated: ${new Date().toISOString()}`,
    `> Test tool: Playwright (@playwright/test)`,
    `> Base URL: ${BASE_URL}`,
    `> Static routes audited: ${routeCount}`,
    '',
    '## Summary',
    '',
    '| Severity | Count |',
    '|----------|-------|',
    `| Critical | ${bySeverity.critical.length} |`,
    `| High     | ${bySeverity.high.length} |`,
    `| Medium   | ${bySeverity.medium.length} |`,
    `| Low      | ${bySeverity.low.length} |`,
    `| **Total** | **${items.length}** |`,
    '',
  ];

  for (const severity of ['critical', 'high', 'medium', 'low'] as const) {
    const group = bySeverity[severity];
    if (group.length === 0) continue;

    lines.push(`## ${severity.charAt(0).toUpperCase() + severity.slice(1)} (${group.length})`);
    lines.push('');

    for (const bug of group) {
      lines.push(`### ${bug.id}: ${bug.title}`);
      lines.push('');
      lines.push(`- **Severity:** ${bug.severity}`);
      lines.push(`- **Category:** ${bug.category}`);
      lines.push(`- **URL:** \`${bug.url}\``);
      lines.push(`- **Description:** ${bug.description}`);
      if (bug.stepsToReproduce) lines.push(`- **Steps to reproduce:** ${bug.stepsToReproduce}`);
      if (bug.expected) lines.push(`- **Expected:** ${bug.expected}`);
      if (bug.actual) lines.push(`- **Actual:** ${bug.actual}`);
      lines.push('');
    }
  }

  if (items.length === 0) {
    lines.push('## No bugs found');
    lines.push('');
    lines.push('All audited routes loaded successfully with no console errors, broken images, or visible runtime failures.');
  }

  return lines.join('\n');
}
