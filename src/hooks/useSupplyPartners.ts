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

interface PartnerIcon {
  alt: string;
  src: string;
}

interface PartnerSpotlight {
  text: string;
  icons: PartnerIcon[];
}

interface MainPage {
  cta: CTA[];
  quote: Quote;
  title: string;
  description: Description;
  subHeadline: string;
  partnerSpotlight: PartnerSpotlight;
}

interface GlobalSourcingStrategy {
  title: string;
  headline: string;
  keyPoints: string[];
  description: string;
}

interface ProcurementItem {
  example: string;
  category: string;
}

interface WhatWeProcure {
  item: ProcurementItem[];
  title: string;
}

interface SupplierStep {
  step: string;
  action: string;
}

interface HowBecomeGreenSupplier {
  item: SupplierStep[];
  title: string;
  subHeadline: string;
}

interface SupplyPartnersData {
  id: number;
  mainPage: MainPage;
  globalSourcingStrategy: GlobalSourcingStrategy;
  whatWeProcure: WhatWeProcure;
  howBecomeGreenSupplier: HowBecomeGreenSupplier;
  createdAt: string;
  updatedAt: string;
}

const fetchSupplyPartners = async (): Promise<SupplyPartnersData> => {
  const response = await fetch('https://g-stack.green.com.pg/api/ecosystem/supply-partners');
  
  if (!response.ok) {
    throw new Error('Failed to fetch supply partners data');
  }
  
  return response.json();
};

export const useSupplyPartners = () => {
  return useQuery<SupplyPartnersData>({
    queryKey: ['supplyPartners'],
    queryFn: fetchSupplyPartners,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
  });
};