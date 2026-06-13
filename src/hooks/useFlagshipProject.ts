import { useQuery } from '@tanstack/react-query';

interface FlagshipProjectIcon {
  img: {
    alt: string;
    src: string;
  };
  title: string;
  description: string;
}

interface FlagshipProjectCTA {
  href: string;
  text: string;
}

interface FlagshipProjectData {
  id: number;
  title: string;
  subheadline: string;
  key: {
    title: string;
    subtitle: string;
  };
  icons: FlagshipProjectIcon[];
  description: string;
  footer: {
    title: string;
    subheadline: string;
  };
  cta: FlagshipProjectCTA[];
  createdAt: string;
  updatedAt: string;
}

const fetchFlagshipProject = async (): Promise<FlagshipProjectData> => {
  const response = await fetch('https://g-stack.green.com.pg/api/endeavors/flagship-projects/get');
  
  if (!response.ok) {
    throw new Error('Failed to fetch flagship project data');
  }
  
  return response.json();
};

export const useFlagshipProject = () => {
  return useQuery({
    queryKey: ['flagship-project'],
    queryFn: fetchFlagshipProject,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};