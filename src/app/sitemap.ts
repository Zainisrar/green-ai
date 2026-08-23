import type { MetadataRoute } from "next";
import { SITE_URL } from "./lib/seo-config";

const staticRoutes = [
  "/home/renewable-energy-the-core",
  "/ecosystem/become-a-supplier",
  "/ecosystem/client-partnerships",
  "/ecosystem/collaboration-innovation",
  "/ecosystem/community-impact-loop",
  "/ecosystem/industry-affiliations-certifications",
  "/ecosystem/key-supply-categories",
  "/ecosystem/our-procurement-philosophy",
  "/ecosystem/our-value-chain",
  "/ecosystem/supplier-code-of-conduct",
  "/ecosystem/supply-partners",
  "/ecosystem/technology-innovation-alliances",
  "/ecosystem/why-esg-matters-to-green",
  "/empower/careers-at-green",
  "/empower/community-voices",
  "/empower/green-talent-incubator",
  "/empower/join-us",
  "/empower/team-green",
  "/empower/women-in-energy",
  "/endeavors/flagship-projects",
  "/endeavors/project-portfolio",
  "/engage/become-a-supplier",
  "/engage/book-a-consultation",
  "/engage/contact-us",
  "/engage/investor-relations",
  "/engage/media-press",
  "/engage/newsletter",
  "/engage/partner-with-us",
  "/engage/public-events-volunteering",
  "/engage/reach-us",
  "/engage/request-a-proposal",
  "/engineering/energy-storage-smart-grid",
  "/engineering/grid-intel",
  "/engineering/hybrid-microgrid-solutions",
  "/engineering/om-monitoring",
  "/engineering/products",
  "/engineering/products/green-empawa",
  "/engineering/products/green-sunsmart",
  "/engineering/solar-epcm-services",
  "/enlighten/events-webinars",
  "/enlighten/insights-articles",
  "/enlighten/learning-hub",
  "/enlighten/media-mentions",
  "/enlighten/reports-whitepapers",
  "/enlighten/thought-leadership",
  "/evolution/certifications-accreditations",
  "/evolution/leadership-team",
  "/evolution/mission-vision",
  "/evolution/our-story-milestones",
  "/evolution/sustainability-esg-commitments",
  "/expertise",
  "/explore/fast-facts-stats",
  "/explore/global-snapshot",
  "/explore/welcome-to-green",
  "/explore/why-green",
] as const;

interface ApiItem {
  slug?: string;
  createdAt?: string;
  updatedAt?: string;
}

interface ApiListResponse {
  data?: ApiItem[];
}

const safeDate = (value?: string) => {
  if (!value) return undefined;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? undefined : date;
};

async function fetchDynamicRoutes(
  endpoint: string,
  routePrefix: string,
): Promise<MetadataRoute.Sitemap> {
  try {
    const response = await fetch(endpoint, {
      next: { revalidate: 3600 },
      signal: AbortSignal.timeout(8000),
    });
    if (!response.ok) return [];

    const payload = (await response.json()) as ApiListResponse;
    return (payload.data ?? []).flatMap((item) => {
      if (!item.slug) return [];
      return [
        {
          url: `${SITE_URL}${routePrefix}/${encodeURIComponent(item.slug)}`,
          lastModified: safeDate(item.updatedAt || item.createdAt),
          changeFrequency: "weekly" as const,
          priority: 0.7,
        },
      ];
    });
  } catch {
    // A temporary CMS outage should not make /sitemap.xml fail entirely.
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${SITE_URL}${route}`,
    changeFrequency:
      route === "/home/renewable-energy-the-core" ? "daily" : "weekly",
    priority: route === "/home/renewable-energy-the-core" ? 1 : 0.7,
  }));

  const dynamicPages = await Promise.all([
    fetchDynamicRoutes(
      "https://g-stack.green.com.pg/api/enlighten/insights-articles",
      "/enlighten/insights-articles",
    ),
    fetchDynamicRoutes(
      "https://g-stack.green.com.pg/api/engineering/products",
      "/engineering/products",
    ),
    fetchDynamicRoutes(
      "https://g-stack.green.com.pg/api/expertise",
      "/expertise",
    ),
  ]);

  return [...staticPages, ...dynamicPages.flat()];
}
