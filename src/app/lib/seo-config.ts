const FALLBACK_SITE_URL = "https://green.com.pg";

/**
 * Resolve the canonical site origin.
 *
 * `SITE_URL` is fed to `new URL()` in the root layout's `metadataBase`, which is
 * evaluated at module scope. A malformed value there (e.g. NEXT_PUBLIC_SITE_URL
 * set to "green.com.pg" with no scheme) throws while the layout module is being
 * imported -- a 500 on every route that no error boundary can catch. So validate
 * here and fall back rather than trusting the env var.
 */
const resolveSiteUrl = (): string => {
  const configured = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (!configured) return FALLBACK_SITE_URL;

  try {
    const parsed = new URL(configured);
    if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
      throw new Error(`unsupported protocol "${parsed.protocol}"`);
    }
    return configured.replace(/\/$/, "");
  } catch {
    console.warn(
      `[seo-config] Ignoring invalid NEXT_PUBLIC_SITE_URL ("${configured}"); ` +
        `falling back to ${FALLBACK_SITE_URL}. Expected an absolute http(s) URL.`,
    );
    return FALLBACK_SITE_URL;
  }
};

export const SITE_URL = resolveSiteUrl();

export const seoConfig = {
  defaultTitle: "GREEN Limited - Sustainable Energy Solutions",
  titleTemplate: "%s | GREEN Limited",
  defaultDescription:
    "Leading provider of sustainable energy solutions, specializing in solar power, energy storage, and renewable energy infrastructure across the Pacific region.",
  siteUrl: SITE_URL,
  siteName: "GREEN Limited",

  // Social media handles
  social: {
    twitter: "@green_limited",
    linkedin: "company/green-limited",
    facebook: "greenlimited",
  },

  // Default images
  defaultImage: "/images/heroSection/logo.png",
  defaultImageAlt: "GREEN Limited Logo",

  // Brand colors
  themeColor: "#4CAF50",
  backgroundColor: "#ffffff",

  // Organization info
  organization: {
    name: "GREEN Limited",
    alternateName: "GREEN",
    foundingDate: "2020",
    industry: "Renewable Energy",
    address: {
      country: "PG",
      region: "National Capital District",
      locality: "Port Moresby",
    },
    contact: {
      email: "info@green.com.pg",
    },
  },

  // Default keywords
  keywords: [
    "renewable energy",
    "solar power",
    "energy storage",
    "sustainable energy",
    "GREEN Limited",
    "Pacific energy solutions",
    "clean energy",
    "solar installation",
    "energy infrastructure",
    "microgrid solutions",
    "hybrid energy systems",
    "energy monitoring",
    "grid intelligence",
    "EPCM services",
    "sustainability",
    "ESG commitments",
  ],

  // Robots configuration
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const generatePageMetadata = (page: {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
}) => {
  const title = page.title
    ? `${page.title} | ${seoConfig.siteName}`
    : seoConfig.defaultTitle;

  const description = page.description || seoConfig.defaultDescription;
  const image = page.image || seoConfig.defaultImage;
  const url = page.url ? `${seoConfig.siteUrl}${page.url}` : seoConfig.siteUrl;
  const keywords = page.keywords
    ? [...seoConfig.keywords, ...page.keywords]
    : seoConfig.keywords;

  return {
    title,
    description,
    keywords,
    openGraph: {
      title,
      description,
      url,
      siteName: seoConfig.siteName,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: page.title || seoConfig.defaultImageAlt,
        },
      ],
      locale: "en_US",
      type: page.type || "website",
      ...(page.publishedTime && { publishedTime: page.publishedTime }),
      ...(page.modifiedTime && { modifiedTime: page.modifiedTime }),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
      site: seoConfig.social.twitter,
    },
    alternates: {
      canonical: url,
    },
    robots: seoConfig.robots,
  };
};
