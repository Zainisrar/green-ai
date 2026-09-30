import { useQuery } from "@tanstack/react-query";

export interface MediaImage {
  alt: string;
  src: string;
}

export interface RecentHighlight {
  year: string;
  title: string;
  video: string;
  datetime: string;
  description: string;
  featuredImg: MediaImage;
}

export interface MainPageCTA {
  href: string;
  text: string;
}

export interface MainPageKey {
  text: string;
  highlighted: string;
}

export interface MainPage {
  cta: MainPageCTA[];
  key: MainPageKey;
  title: string;
  description: string;
  subHeadline: string;
  recentHighlights: RecentHighlight[];
}

export interface MediaMentionsData {
  id: number;
  mainPage: MainPage;
  createdAt: string;
  updatedAt: string;
}

export interface MediaMentionsResponse {
  success: boolean;
  data: MediaMentionsData;
}

const fetchMediaMentions = async (): Promise<MediaMentionsData> => {
  const response = await fetch(
    "https://greencms.percepco.co.uk/api/enlighten/media-mentions",
  );

  if (!response.ok) {
    throw new Error("Failed to fetch media mentions data");
  }

  const result: MediaMentionsResponse = await response.json();
  return result.data;
};

export const useMediaMentions = () => {
  return useQuery({
    queryKey: ["media-mentions"],
    queryFn: fetchMediaMentions,
    staleTime: 0,
    refetchOnMount: "always",
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};
