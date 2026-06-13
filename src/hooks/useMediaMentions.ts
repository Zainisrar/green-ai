import { useQuery } from '@tanstack/react-query';

interface MediaImage {
  alt: string;
  src: string;
}

interface RecentHighlight {
  year: string;
  title: string;
  video: string;
  datetime: string;
  description: string;
  featuredImg: MediaImage;
}

interface MainPageCTA {
  href: string;
  text: string;
}

interface MainPageKey {
  text: string;
  highlighted: string;
}

interface MainPage {
  cta: MainPageCTA[];
  key: MainPageKey;
  title: string;
  description: string;
  subHeadline: string;
  recentHighlights: RecentHighlight[];
}

interface MediaMentionsData {
  id: number;
  mainPage: MainPage;
  createdAt: string;
  updatedAt: string;
}

interface MediaMentionsResponse {
  success: boolean;
  data: MediaMentionsData;
}

const fetchMediaMentions = async (): Promise<MediaMentionsData> => {
  const response = await fetch('https://g-stack.green.com.pg/api/enlighten/media-mentions');
  
  if (!response.ok) {
    throw new Error('Failed to fetch media mentions data');
  }
  
  const result: MediaMentionsResponse = await response.json();
  return result.data;
};

export const useMediaMentions = () => {
  return useQuery({
    queryKey: ['media-mentions'],
    queryFn: fetchMediaMentions,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};