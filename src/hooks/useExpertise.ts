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

interface ExpertiseData {
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
  data: ExpertiseData[];
}

const fetchExpertise = async (): Promise<ExpertiseData[]> => {
  const response = await fetch('https://g-stack.green.com.pg/api/expertise');
  
  if (!response.ok) {
    throw new Error('Failed to fetch expertise data');
  }
  
  const result: ExpertiseResponse = await response.json();
  return result.data;
};

export const useExpertise = () => {
  return useQuery({
    queryKey: ['expertise'],
    queryFn: fetchExpertise,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};