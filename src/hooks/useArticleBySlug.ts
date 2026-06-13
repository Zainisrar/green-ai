import { useQuery } from "@tanstack/react-query";

interface ArticleImage {
  alt: string;
  src: string;
}

interface ArticleCTA {
  href: string;
  text: string;
}

interface ArticleQuote {
  text: string;
  highlighted: string;
}

interface ArticleDetailData {
  id: number;
  title: string;
  description: string;
  slug: string;
  featuredImg: ArticleImage;
  cta: ArticleCTA;
  content: string;
  quote: ArticleQuote;
  createdAt: string;
  updatedAt: string;
}

const fetchArticleBySlug = async (
  slug: string
): Promise<ArticleDetailData | null> => {
  const response = await fetch(
    "https://g-stack.green.com.pg/api/enlighten/insights-articles"
  );

  if (!response.ok) {
    throw new Error("Failed to fetch articles data");
  }

  const articles: ArticleDetailData[] = await response.json();
  const article = articles.find((article) => article.slug === slug);

  if (!article) {
    throw new Error("Article not found");
  }

  return article;
};

export const useArticleBySlug = (slug: string) => {
  return useQuery({
    queryKey: ["article", slug],
    queryFn: () => fetchArticleBySlug(slug),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    enabled: !!slug, // Only run query if slug is provided
  });
};
