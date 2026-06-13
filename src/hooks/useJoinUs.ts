import { useQuery } from '@tanstack/react-query';

export interface JoinUsData {
  success: boolean;
  data: {
    id: number;
    title: string;
    subHeadline: string;
    description: string;
    existingUsersCtaLink: string;
    newUsersCtaLink: string;
    quote: {
      link: string;
      text: string;
    };
    cta: Array<{
      href: string;
      text: string;
    }>;
    keys: any[];
    dataPolicyEthics: {
      title: string;
      description: string;
    };
    email: {
      href: string;
      text: string;
    };
    phone: {
      href: string;
      text: string;
    };
    createdAt: string;
    updatedAt: string;
  };
}

const fetchJoinUs = async (): Promise<JoinUsData> => {
  const response = await fetch('https://g-stack.green.com.pg/api/empower/join-us');
  
  if (!response.ok) {
    throw new Error(`Failed to fetch join us data: ${response.status}`);
  }
  
  return response.json();
};

export const useJoinUs = () => {
  return useQuery({
    queryKey: ['join-us'],
    queryFn: fetchJoinUs,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    refetchOnWindowFocus: false,
    retry: 3,
  });
};