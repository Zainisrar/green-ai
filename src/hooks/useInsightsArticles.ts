import { CMS_BASE_URL } from "@/config/cms";
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

interface ArticleData {
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

const fetchInsightsArticles = async (): Promise<ArticleData[]> => {
  const response = await fetch(
    `${CMS_BASE_URL}/api/enlighten/insights-articles`,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch insights articles data");
  }

  return response.json();
};

export const useInsightsArticles = () => {
  return useQuery({
    queryKey: ["insights-articles"],
    queryFn: fetchInsightsArticles,
    staleTime: 0,
    refetchOnMount: "always",
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};
