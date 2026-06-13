export const organizationStructuredData = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "GREEN Limited",
  "alternateName": "GREEN",
  "description": "Leading provider of sustainable energy solutions, specializing in solar power, energy storage, and renewable energy infrastructure across the Pacific region.",
  "url": "https://example.com",
  "logo": "https://example.com/images/heroSection/logo.png",
  "image": "https://example.com/images/heroSection/logo.png",
  "sameAs": [
    "https://www.linkedin.com/company/green-limited",
    "https://twitter.com/green_limited",
    "https://www.facebook.com/greenlimited"
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+675-XXX-XXX-XXX",
    "contactType": "customer service",
    "availableLanguage": ["English"]
  },
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "PG",
    "addressRegion": "National Capital District",
    "addressLocality": "Port Moresby"
  },
  "foundingDate": "2020",
  "industry": "Renewable Energy",
  "numberOfEmployees": {
    "@type": "QuantitativeValue",
    "value": "50-100"
  },
  "keywords": "renewable energy, solar power, energy storage, sustainable energy, Pacific energy solutions, clean energy, solar installation, energy infrastructure"
}

export const websiteStructuredData = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "GREEN Limited",
  "alternateName": "GREEN",
  "url": "https://example.com",
  "description": "Leading provider of sustainable energy solutions, specializing in solar power, energy storage, and renewable energy infrastructure across the Pacific region.",
  "publisher": {
    "@type": "Organization",
    "name": "GREEN Limited",
    "logo": {
      "@type": "ImageObject",
      "url": "https://example.com/images/heroSection/logo.png"
    }
  },
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": "https://example.com/search?q={search_term_string}"
    },
    "query-input": "required name=search_term_string"
  }
}

export const breadcrumbStructuredData = (items: Array<{name: string, url: string}>) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": items.map((item, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "name": item.name,
    "item": item.url
  }))
})

export const articleStructuredData = (article: {
  title: string
  description: string
  url: string
  datePublished: string
  dateModified: string
  author?: string
  image?: string
}) => ({
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": article.title,
  "description": article.description,
  "url": article.url,
  "datePublished": article.datePublished,
  "dateModified": article.dateModified,
  "author": {
    "@type": "Organization",
    "name": article.author || "GREEN Limited"
  },
  "publisher": {
    "@type": "Organization",
    "name": "GREEN Limited",
    "logo": {
      "@type": "ImageObject",
      "url": "https://example.com/images/heroSection/logo.png"
    }
  },
  "image": article.image || "https://example.com/images/heroSection/logo.png",
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": article.url
  }
})

export const serviceStructuredData = (service: {
  name: string
  description: string
  url: string
  image?: string
}) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  "name": service.name,
  "description": service.description,
  "url": service.url,
  "image": service.image,
  "provider": {
    "@type": "Organization",
    "name": "GREEN Limited",
    "url": "https://example.com"
  },
  "serviceType": "Renewable Energy Solutions",
  "category": "Energy & Utilities"
})