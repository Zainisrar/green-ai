import { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://example.com'
  
  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/products`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/insights`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/careers`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/team`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/why-green`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/global-snapshot`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/our-story`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/our-vision`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/leadership`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/certifications`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/esg-commitments`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
  ]

  // Dynamic pages - fetch from APIs
  let dynamicPages: MetadataRoute.Sitemap = []

  try {
    // Fetch insights/articles
    const insightsResponse = await fetch('https://g-stack.green.com.pg/api/insights/articles')
    if (insightsResponse.ok) {
      const insightsData = await insightsResponse.json()
      const insightPages = insightsData.data?.map((insight: any) => ({
        url: `${baseUrl}/insights/${insight.slug}`,
        lastModified: new Date(insight.updatedAt || insight.createdAt),
        changeFrequency: 'weekly' as const,
        priority: 0.6,
      })) || []
      dynamicPages = [...dynamicPages, ...insightPages]
    }
  } catch (error) {
    console.error('Error fetching insights for sitemap:', error)
  }

  try {
    // Fetch products
    const productsResponse = await fetch('https://g-stack.green.com.pg/api/products')
    if (productsResponse.ok) {
      const productsData = await productsResponse.json()
      const productPages = productsData.data?.map((product: any) => ({
        url: `${baseUrl}/products/${product.slug}`,
        lastModified: new Date(product.updatedAt || product.createdAt),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
      })) || []
      dynamicPages = [...dynamicPages, ...productPages]
    }
  } catch (error) {
    console.error('Error fetching products for sitemap:', error)
  }

  try {
    // Fetch expertise areas
    const expertiseResponse = await fetch('https://g-stack.green.com.pg/api/expertise')
    if (expertiseResponse.ok) {
      const expertiseData = await expertiseResponse.json()
      const expertisePages = expertiseData.data?.map((expertise: any) => ({
        url: `${baseUrl}/expertise/${expertise.slug}`,
        lastModified: new Date(expertise.updatedAt || expertise.createdAt),
        changeFrequency: 'monthly' as const,
        priority: 0.6,
      })) || []
      dynamicPages = [...dynamicPages, ...expertisePages]
    }
  } catch (error) {
    console.error('Error fetching expertise for sitemap:', error)
  }

  return [...staticPages, ...dynamicPages]
}