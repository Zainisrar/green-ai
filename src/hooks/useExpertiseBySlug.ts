import { useQuery } from '@tanstack/react-query';

interface ExpertiseImage {
  alt: string;
  src: string;
}

interface ExpertiseIcon {
  img: ExpertiseImage;
  title: string;
  description: string;
}

interface ExpertiseCarousel {
  img: ExpertiseImage;
}

interface ExpertiseKey {
  text: string;
}

interface ExpertiseDetailData {
  id: number;
  title: string;
  subtitle: string;
  highlighted: string;
  description: string;
  image: string;
  slug: string;
  highlightedTitle: string;
  subtitlePage: string;
  descriptionPage: string;
  icons: ExpertiseIcon[];
  carousel: ExpertiseCarousel[];
  keys: ExpertiseKey[];
  createdAt: string;
  updatedAt: string;
}

interface ExpertiseResponse {
  success: boolean;
  data: ExpertiseDetailData[];
}

const fetchExpertiseBySlug = async (slug: string): Promise<ExpertiseDetailData | null> => {
  const response = await fetch('https://g-stack.green.com.pg/api/expertise');
  
  if (!response.ok) {
    throw new Error('Failed to fetch expertise data');
  }
  
  const result: ExpertiseResponse = await response.json();
  
  // Try to match the slug in different ways
  const expertise = result.data.find(item => {
    // First try exact match
    if (item.slug === slug) return true;
    
    // Try matching with /expertise/ prefix
    if (item.slug === `/expertise/${slug}`) return true;
    
    // Try matching without /expertise/ prefix
    if (item.slug.replace('/expertise/', '') === slug) return true;
    
    return false;
  });
  
  if (!expertise) {
    throw new Error('Expertise not found');
  }
  
  return expertise;
};

export const useExpertiseBySlug = (slug: string) => {
  return useQuery({
    queryKey: ['expertise', slug],
    queryFn: () => fetchExpertiseBySlug(slug),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    enabled: !!slug, // Only run query if slug is provided
  });
};