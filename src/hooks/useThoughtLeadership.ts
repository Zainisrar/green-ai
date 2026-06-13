import { useQuery } from '@tanstack/react-query';

interface EditorialImage {
  alt: string;
  src: string;
}

interface EditorialCTA {
  href: string;
  text: string;
}

interface Editorial {
  cta: EditorialCTA;
  title: string;
  writer: number;
  categories: string[];
  description: string;
  featuredImg: EditorialImage;
}

interface MainPageCTA {
  href: string;
  text: string;
}

interface MainPageQuote {
  text: string;
  highlighted: string;
}

interface MainPage {
  cta: MainPageCTA[];
  quote: MainPageQuote;
  title: string;
  subTitle: string;
  description: string;
  editorialsTitle: string;
}

interface ThoughtLeadershipData {
  id: number;
  editorials: Editorial[];
  mainPage: MainPage;
  createdAt: string;
  updatedAt: string;
}

interface ThoughtLeadershipResponse {
  success: boolean;
  data: ThoughtLeadershipData;
}

const fetchThoughtLeadership = async (): Promise<ThoughtLeadershipData> => {
  const response = await fetch('https://g-stack.green.com.pg/api/enlighten/thought-leadership');
  
  if (!response.ok) {
    throw new Error('Failed to fetch thought leadership data');
  }
  
  const result: ThoughtLeadershipResponse = await response.json();
  return result.data;
};

export const useThoughtLeadership = () => {
  return useQuery({
    queryKey: ['thought-leadership'],
    queryFn: fetchThoughtLeadership,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};