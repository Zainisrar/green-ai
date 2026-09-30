import { useQuery } from "@tanstack/react-query";

interface MediaPressMainPage {
  cta: Array<{ href: string; text: string }>;
  quote: { text: string; highlighted: string };
  title: string;
  description: { text: string; highlighted: string };
  subHeadline: string;
}

interface MediaPressResponse {
  success: boolean;
  data: {
    mainPage: MediaPressMainPage;
  };
}

const fetchMediaPress = async (): Promise<MediaPressResponse> => {
  const response = await fetch(
    "https://greencms.percepco.co.uk/api/engage/media-press",
    { cache: "no-store" },
  );
  if (!response.ok) {
    throw new Error(`Failed to fetch media and press data: ${response.status}`);
  }
  return response.json();
};

export const useMediaPress = () =>
  useQuery({
    queryKey: ["media-press"],
    queryFn: fetchMediaPress,
    staleTime: 0,
    refetchOnMount: "always",
  });
