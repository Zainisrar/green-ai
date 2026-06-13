import { useQuery } from '@tanstack/react-query';

interface CTA {
  href: string;
  text: string;
}

interface Quote {
  text: string;
  highlighted: string;
}

interface Description {
  text: string;
  highlighted: string;
}

interface MainPage {
  cta: CTA[];
  quote: Quote;
  title: string;
  description: Description;
  subHeadline: string;
}

interface ModalItem {
  component: string;
  technicalNotes: string;
}

interface Modal {
  item: ModalItem[];
  title: string;
}

interface KeySupplyCategoriesData {
  id: number;
  mainPage: MainPage;
  modals: Modal[];
  createdAt: string;
  updatedAt: string;
}

const fetchKeySupplyCategories = async (): Promise<KeySupplyCategoriesData> => {
  const response = await fetch('https://g-stack.green.com.pg/api/ecosystem/key-supply-categories');
  
  if (!response.ok) {
    throw new Error('Failed to fetch key supply categories data');
  }
  
  return response.json();
};

export const useKeySupplyCategories = () => {
  return useQuery<KeySupplyCategoriesData>({
    queryKey: ['keySupplyCategories'],
    queryFn: fetchKeySupplyCategories,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};