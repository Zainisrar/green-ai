import { SITE_URL } from "./seo-config";

const DEFAULT_IMAGE_URL = `${SITE_URL}/images/heroSection/logo.png`;

export const organizationStructuredData = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "GREEN Limited",
  alternateName: "GREEN",
  description:
    "Leading provider of sustainable energy solutions, specializing in solar power, energy storage, and renewable energy infrastructure across the Pacific region.",
  url: SITE_URL,
  logo: DEFAULT_IMAGE_URL,
  image: DEFAULT_IMAGE_URL,
  sameAs: [
    "https://www.linkedin.com/company/green-limited",
    "https://twitter.com/green_limited",
    "https://www.facebook.com/greenlimited",
  ],
  email: "info@green.com.pg",
  address: {
    "@type": "PostalAddress",
    addressCountry: "PG",
    addressRegion: "National Capital District",
    addressLocality: "Port Moresby",
  },
  foundingDate: "2020",
  industry: "Renewable Energy",
  numberOfEmployees: {
    "@type": "QuantitativeValue",
    value: "50-100",
  },
  keywords:
    "renewable energy, solar power, energy storage, sustainable energy, Pacific energy solutions, clean energy, solar installation, energy infrastructure",
};

export const websiteStructuredData = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "GREEN Limited",
  alternateName: "GREEN",
  url: SITE_URL,
  description:
    "Leading provider of sustainable energy solutions, specializing in solar power, energy storage, and renewable energy infrastructure across the Pacific region.",
  publisher: {
    "@type": "Organization",
    name: "GREEN Limited",
    logo: {
      "@type": "ImageObject",
      url: DEFAULT_IMAGE_URL,
    },
  },
};

export const breadcrumbStructuredData = (
  items: Array<{ name: string; url: string }>,
) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.name,
    item: item.url,
  })),
});

export const articleStructuredData = (article: {
  title: string;
  description: string;
  url: string;
  // Optional: the CMS does not guarantee these. Emitting an empty string here
  // produces invalid schema.org output, so omit the keys instead.
  datePublished?: string;
  dateModified?: string;
  author?: string;
  image?: string;
}) => ({
  "@context": "https://schema.org",
  "@type": "Article",
  headline: article.title,
  description: article.description,
  url: article.url,
  ...(article.datePublished
    ? { datePublished: article.datePublished }
    : undefined),
  ...(article.dateModified
    ? { dateModified: article.dateModified }
    : undefined),
  author: {
    "@type": "Organization",
    name: article.author || "GREEN Limited",
  },
  publisher: {
    "@type": "Organization",
    name: "GREEN Limited",
    logo: {
      "@type": "ImageObject",
      url: DEFAULT_IMAGE_URL,
    },
  },
  image: article.image || DEFAULT_IMAGE_URL,
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": article.url,
  },
});

export const serviceStructuredData = (service: {
  name: string;
  description: string;
  url: string;
  image?: string;
}) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  name: service.name,
  description: service.description,
  url: service.url,
  image: service.image,
  provider: {
    "@type": "Organization",
    name: "GREEN Limited",
    url: SITE_URL,
  },
  serviceType: "Renewable Energy Solutions",
  category: "Energy & Utilities",
});
