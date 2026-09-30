import { useQuery } from "@tanstack/react-query";

export interface EditorialImage {
  alt: string;
  src: string;
}

export interface EditorialCTA {
  href: string;
  text: string;
}

export interface EditorialWriter {
  name?: string;
  email?: string;
}

export interface Editorial {
  cta: EditorialCTA;
  title: string;
  writer: EditorialWriter | number;
  categories: string[];
  description: string;
  featuredImg: EditorialImage;
}

export interface MainPageCTA {
  href: string;
  text: string;
}

export interface MainPageQuote {
  text: string;
  highlighted: string;
}

export interface MainPage {
  cta: MainPageCTA[];
  quote: MainPageQuote;
  title: string;
  subTitle: string;
  description: string;
  editorialsTitle: string;
}

export interface ThoughtLeadershipData {
  id: number;
  editorials: Editorial[];
  mainPage: MainPage;
  createdAt: string;
  updatedAt: string;
}

export interface ThoughtLeadershipResponse {
  success: boolean;
  data: ThoughtLeadershipData;
}

const fetchThoughtLeadership = async (): Promise<ThoughtLeadershipData> => {
  const response = await fetch(
    "https://greencms.percepco.co.uk/api/enlighten/thought-leadership",
  );

  if (!response.ok) {
    throw new Error("Failed to fetch thought leadership data");
  }

  const result: ThoughtLeadershipResponse = await response.json();
  return result.data;
};

export const useThoughtLeadership = () => {
  return useQuery({
    queryKey: ["thought-leadership"],
    queryFn: fetchThoughtLeadership,
    staleTime: 0,
    refetchOnMount: "always",
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};
