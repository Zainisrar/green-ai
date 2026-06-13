import { useQuery } from '@tanstack/react-query';

interface CTA {
  href: string;
  text: string;
}

interface Quote {
  text: string;
  highlighted: string;
}

interface MainPage {
  cta: CTA[];
  quote: Quote[];
  title: string;
  description: string;
  subHeadline: string;
}

interface CorePrincipleItem {
  principle: string;
  statement: string;
}

interface CorePrinciples {
  items: CorePrincipleItem[];
  title: string;
  subHeadline: string;
}

interface Image {
  alt: string;
  src: string;
}

interface WhatWeWontCompromise {
  img: Image;
  keys: string[];
  quote: Quote;
  title: string;
}

interface ProcurementAlignedImpact {
  img: Image;
  keys: string[];
  quote: Quote;
  title: string;
  description: string;
}

interface VendorRelationshipKey {
  text: string;
  highlighted: string;
}

interface StrategicVendorRelationships {
  img: Image;
  keys: VendorRelationshipKey[];
  title: string;
}

interface OurProcurementPhilosophyData {
  id: number;
  mainPage: MainPage;
  corePrinciples: CorePrinciples;
  whatWeWontCompromise: WhatWeWontCompromise;
  procurementAlignedImpact: ProcurementAlignedImpact;
  strategicVendorRelationships: StrategicVendorRelationships;
  createdAt: string;
  updatedAt: string;
}

const fetchOurProcurementPhilosophy = async (): Promise<OurProcurementPhilosophyData> => {
  const response = await fetch('https://g-stack.green.com.pg/api/ecosystem/our-procurement-philosophy');
  
  if (!response.ok) {
    throw new Error('Failed to fetch our procurement philosophy data');
  }
  
  return response.json();
};

export const useOurProcurementPhilosophy = () => {
  return useQuery<OurProcurementPhilosophyData>({
    queryKey: ['ourProcurementPhilosophy'],
    queryFn: fetchOurProcurementPhilosophy,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};