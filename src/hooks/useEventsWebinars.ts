import { useQuery } from '@tanstack/react-query';

interface EventImage {
  alt: string;
  src: string;
}

interface EventCTA {
  href: string;
  text: string;
}

interface UpcomingEvent {
  cta: EventCTA;
  slug: string;
  year: string;
  title: string;
  location: string;
  description: string;
  featuredImg: EventImage;
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
  description: string;
  subHeadline: string;
}

interface EventsWebinarsData {
  id: number;
  upcomingEvents: UpcomingEvent[];
  mainPage: MainPage;
  createdAt: string;
  updatedAt: string;
}

interface EventsWebinarsResponse {
  success: boolean;
  data: EventsWebinarsData;
}

const fetchEventsWebinars = async (): Promise<EventsWebinarsData> => {
  const response = await fetch('https://g-stack.green.com.pg/api/enlighten/events-webinars');
  
  if (!response.ok) {
    throw new Error('Failed to fetch events and webinars data');
  }
  
  const result: EventsWebinarsResponse = await response.json();
  return result.data;
};

export const useEventsWebinars = () => {
  return useQuery({
    queryKey: ['events-webinars'],
    queryFn: fetchEventsWebinars,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};