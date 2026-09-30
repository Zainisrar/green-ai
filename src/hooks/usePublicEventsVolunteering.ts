import { useQuery } from "@tanstack/react-query";

interface PublicEventsResponse {
  success: boolean;
  data: {
    mainPage: {
      cta: Array<{ href: string; text: string }>;
      quote: { text: string; highlighted: string };
      title: string;
      description: { text: string; highlighted: string };
      subHeadline: string;
    };
  };
}

const fetchPublicEvents = async (): Promise<PublicEventsResponse> => {
  const response = await fetch(
    "https://greencms.percepco.co.uk/api/engage/public-events-volunteering",
    { cache: "no-store" },
  );
  if (!response.ok) {
    throw new Error(`Failed to fetch public events data: ${response.status}`);
  }
  return response.json();
};

export const usePublicEventsVolunteering = () =>
  useQuery({
    queryKey: ["public-events-volunteering"],
    queryFn: fetchPublicEvents,
    staleTime: 0,
    refetchOnMount: "always",
  });
