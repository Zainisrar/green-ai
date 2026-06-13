import { useQuery } from '@tanstack/react-query';

interface ProjectData {
  id: number;
  title: string;
  slug: string;
  featuredImg: string;
  numberofsystems: string;
  noofdays: string;
  totalgeneration: string;
  battery: string;
  coalA: string;
  emissionreduction: string;
  treesplanted: string;
  capacity: string;
  todateproduct: string;
  consumption: string;
  totalenergydaily: string;
  createdAt: string;
  updatedAt: string;
}

const fetchProjects = async (): Promise<ProjectData[]> => {
  const response = await fetch('https://g-stack.green.com.pg/api/endeavors/projects');
  
  if (!response.ok) {
    throw new Error('Failed to fetch projects data');
  }
  
  return response.json();
};

export const useProjects = () => {
  return useQuery({
    queryKey: ['projects'],
    queryFn: fetchProjects,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};