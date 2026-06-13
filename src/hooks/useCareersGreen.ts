import { useQuery } from '@tanstack/react-query';

export interface CareersGreenData {
  success: boolean;
  data: {
    id: number;
    mainPage: {
      cta: Array<{
        href: string;
        text: string;
      }>;
      keys: Array<{
        cta: {
          href: string;
          text: string;
        };
        text: string;
      }>;
      title: string;
      quote1: {
        text: string;
        highlighted: string;
      };
      quote2: {
        text: string;
        highlighted: string;
      };
      description: {
        text: string;
        highlighted: string;
      };
      subHeadline: string;
    };
    whyWorkWithGreenModal: {
      icons: Array<{
        img: {
          alt: string;
          src: string;
        };
        title: string;
        description: string;
      }>;
      quote: {
        text1: string;
        text2: string;
        highlighted1: string;
        highlighted2: string;
      };
      title: string;
      description: string;
    };
    careerTrackSupport: {
      role: Array<{
        type: string;
        description: string;
      }>;
      title: string;
    };
    whatMakesGreenDifferent: {
      title: string;
      keyPoints: Array<{
        text1: string;
        text2: string;
      }>;
      featuredImg: {
        alt: string;
        src: string;
      };
    };
    openRoles: {
      roles: Array<{
        name: string;
        place: string;
        closing: string;
      }>;
      title: string;
    };
    createdAt: string;
    updatedAt: string;
  };
}

const fetchCareersGreen = async (): Promise<CareersGreenData> => {
  const response = await fetch('https://g-stack.green.com.pg/api/empower/careers-at-green');
  
  if (!response.ok) {
    throw new Error(`Failed to fetch careers green data: ${response.status}`);
  }
  
  return response.json();
};

export const useCareersGreen = () => {
  return useQuery({
    queryKey: ['careers-green'],
    queryFn: fetchCareersGreen,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    refetchOnWindowFocus: false,
    retry: 3,
  });
};