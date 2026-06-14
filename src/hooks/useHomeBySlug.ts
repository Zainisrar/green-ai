import { useQuery } from "@tanstack/react-query";

interface Text1 {
  headline: string;
  description?: string;
}

interface Text2 {
  headline: string;
  description?: string;
}

interface Text3 {
  headline: string;
  description?: string;
}

interface Text4 {
  headline: string;
  description?: string;
}

interface Text5 {
  headline: string;
  description?: string;
}

export interface HomeData {
  id: number;
  text1: Text1;
  text2: Text2;
  text3: Text3;
  text4: Text4;
  text5: Text5;
  slug: string;
  createdAt: string;
  updatedAt: string;
}

interface HomeApiResponse {
  success: boolean;
  data: HomeData[];
}

const fetchHomeBySlug = async (slug: string): Promise<HomeData | null> => {
  const response = await fetch("https://g-stack.green.com.pg/api/home");

  if (!response.ok) {
    throw new Error("Failed to fetch home data");
  }

  const result: HomeApiResponse = await response.json();

  const homeData = result.data.find((item) => item.slug === slug);

  if (!homeData) {
    return null;
  }

  return homeData;
};

export const useHomeBySlug = (slug: string) => {
  return useQuery({
    queryKey: ["home", slug],
    queryFn: () => fetchHomeBySlug(slug),
    enabled: !!slug,
  });
};
