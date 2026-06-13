import { useQuery } from "@tanstack/react-query";

interface NavigationItem {
  name: string;
  link: string;
}

interface Keypoint {
  icon: string;
  text: string;
}

export interface InsightData {
  id: number;
  bgImg: string;
  backgroundImg: string;
  navigation: {
    items: NavigationItem[];
  };
  title: string;
  subheadline: string;
  description: string;
  name1: string;
  name2: string;
  cardTitle: string;
  keypoints: Keypoint[];
  slug: string;
  imageDirection: string;
  createdAt: string;
  updatedAt: string;
}

interface ApiResponse {
  success: boolean;
  data: InsightData[];
}

const fetchInsightDetails = async (): Promise<ApiResponse> => {
  const response = await fetch(
    "https://g-stack.green.com.pg/api/insight-details"
  );
  if (!response.ok) {
    throw new Error("Failed to fetch insight details");
  }
  return response.json();
};

export const useInsightDetails = (slug: string) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["insight-details"],
    queryFn: fetchInsightDetails,
  });

  const insightData =
    data?.success && data.data.length > 0
      ? data.data.find((item) => item.slug.includes(slug))
      : null;

  return {
    insightData,
    isLoading,
    error,
    hasData: data?.success && data.data.length > 0,
  };
};
