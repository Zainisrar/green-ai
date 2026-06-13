import { useQuery } from '@tanstack/react-query';

interface ReportImage {
  alt: string;
  src: string;
}

interface ReportData {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  featuredImg: ReportImage;
  year: string;
  pptx: string;
  createdAt: string;
  updatedAt: string;
}

const fetchReportsWhitepapers = async (): Promise<ReportData[]> => {
  const response = await fetch('https://g-stack.green.com.pg/api/enlighten/reports-whitepapers');
  
  if (!response.ok) {
    throw new Error('Failed to fetch reports and whitepapers data');
  }
  
  return response.json();
};

export const useReportsWhitepapers = () => {
  return useQuery({
    queryKey: ['reports-whitepapers'],
    queryFn: fetchReportsWhitepapers,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};