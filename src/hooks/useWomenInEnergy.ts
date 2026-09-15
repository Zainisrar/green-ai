"use client";
import { useQuery } from "@tanstack/react-query";

// Main Page Interfaces
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
  title: string;
  quote1: Quote;
  quote2: Quote;
  description: Description;
  subHeadline: string;
}

// Modal Interfaces
interface Image {
  alt: string;
  src: string;
}

interface WhyThisMatters {
  img: Image;
  keys: string[];
  quote: Quote;
  title: string;
  description: string;
  subHeadline: string;
}

interface InitiativesProgram {
  program: string;
  description: string;
}

interface InitiativesUnderway {
  key: InitiativesProgram[];
  quote: Quote;
  title: string;
  subHeadline: string;
}

interface VoiceItem {
  img: Image;
  title: string;
  description: string;
}

interface VoicesOfPower {
  items: VoiceItem[];
  title: string;
}

interface PartnerWithUs {
  img: Image;
  keys: string[];
  quote: Quote;
  title: string;
  description: string;
}

interface Modal {
  partnerWithUs: PartnerWithUs;
  voicesOfPower: VoicesOfPower;
  whyThisMatters: WhyThisMatters;
  initiativesUnderway: InitiativesUnderway;
}

// Main Data Interface
interface WomenInEnergyData {
  id: number;
  mainPage: MainPage;
  modal: Modal;
  createdAt: string;
  updatedAt: string;
}

interface ApiResponse {
  success: boolean;
  data: WomenInEnergyData;
}

interface UseWomenInEnergyReturn {
  data: WomenInEnergyData | null;
  loading: boolean;
  error: string | null;
}

export const useWomenInEnergy = (): UseWomenInEnergyReturn => {
  const query = useQuery({
    queryKey: ["women-in-energy"],
    queryFn: async ({ signal }): Promise<WomenInEnergyData> => {
      const response = await fetch(
        "https://greencms.percepco.co.uk/api/empower/women-in-energy",
        { signal },
      );
      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);
      const result: ApiResponse = await response.json();
      if (!result.success || !result.data) {
        throw new Error("Invalid API response structure");
      }
      return result.data;
    },
    staleTime: 60_000,
  });

  return {
    data: query.data ?? null,
    loading: query.isPending,
    error: query.error?.message ?? null,
  };
};

export type {
  WomenInEnergyData,
  MainPage,
  Modal,
  WhyThisMatters,
  InitiativesUnderway,
  VoicesOfPower,
  PartnerWithUs,
  CTA,
  Quote,
  Description,
  Image,
  InitiativesProgram,
  VoiceItem,
};
