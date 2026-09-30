import { useQuery } from "@tanstack/react-query";

export interface EventImage {
  alt: string;
  src: string;
}

export interface EventCTA {
  href: string;
  text: string;
}

export interface UpcomingEvent {
  cta: EventCTA;
  slug: string;
  year: string;
  title: string;
  location: string;
  description: string;
  featuredImg: EventImage;
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
  description: string;
  subHeadline: string;
}

export interface EventsWebinarsData {
  id: number;
  upcomingEvents: UpcomingEvent[];
  mainPage: MainPage;
  createdAt: string;
  updatedAt: string;
}

export interface EventsWebinarsResponse {
  success: boolean;
  data: EventsWebinarsData;
}

const fetchEventsWebinars = async (): Promise<EventsWebinarsData> => {
  const response = await fetch(
    "https://greencms.percepco.co.uk/api/enlighten/events-webinars",
  );

  if (!response.ok) {
    throw new Error("Failed to fetch events and webinars data");
  }

  const result: EventsWebinarsResponse = await response.json();
  return result.data;
};

export const useEventsWebinars = () => {
  return useQuery({
    queryKey: ["events-webinars"],
    queryFn: fetchEventsWebinars,
    staleTime: 0,
    refetchOnMount: "always",
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};
