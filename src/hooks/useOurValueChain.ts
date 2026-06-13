import { useQuery } from '@tanstack/react-query';

interface ValueChainItem {
  img: {
    alt: string;
    src: string;
  };
  title: string;
  description: string;
}

interface Quote {
  text: string;
  highlighted: string;
}

interface CTA {
  href: string;
  text: string;
}

interface Description {
  text: string;
  highlighted: string;
}

interface OurValueChainData {
  id: number;
  title: string;
  subHeadline: string;
  description: Description;
  quote: Quote[];
  cta: CTA[];
  valueChainStrip: ValueChainItem[];
  createdAt: string;
  updatedAt: string;
}

const fetchOurValueChain = async (): Promise<OurValueChainData> => {
  const response = await fetch('https://g-stack.green.com.pg/api/ecosystem/our-value-chain');
  
  if (!response.ok) {
    throw new Error('Failed to fetch our value chain data');
  }
  
  return response.json();
};

export const useOurValueChain = () => {
  return useQuery<OurValueChainData>({
    queryKey: ['ourValueChain'],
    queryFn: fetchOurValueChain,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    refetchOnWindowFocus: false,
    retry: 3,
  });
};