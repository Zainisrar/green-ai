export const seoConfig = {
  defaultTitle: "GREEN Limited - Sustainable Energy Solutions",
  titleTemplate: "%s | GREEN Limited",
  defaultDescription: "Leading provider of sustainable energy solutions, specializing in solar power, energy storage, and renewable energy infrastructure across the Pacific region.",
  siteUrl: "https://example.com",
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
      phone: "+675-XXX-XXX-XXX",
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
}

export const generatePageMetadata = (page: {
  title?: string
  description?: string
  keywords?: string[]
  image?: string
  url?: string
  type?: "website" | "article"
  publishedTime?: string
  modifiedTime?: string
}) => {
  const title = page.title 
    ? `${page.title} | ${seoConfig.siteName}`
    : seoConfig.defaultTitle
    
  const description = page.description || seoConfig.defaultDescription
  const image = page.image || seoConfig.defaultImage
  const url = page.url ? `${seoConfig.siteUrl}${page.url}` : seoConfig.siteUrl
  const keywords = page.keywords 
    ? [...seoConfig.keywords, ...page.keywords]
    : seoConfig.keywords

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
  }
}