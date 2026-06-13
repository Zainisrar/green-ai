"use client";
import { useEffect, useState } from "react";

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
  const [data, setData] = useState<WomenInEnergyData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "https://g-stack.green.com.pg/api/empower/women-in-energy",
          {
            next: { revalidate: 60 },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result: ApiResponse = await response.json();

        if (result.success && result.data) {
          setData(result.data);
        } else {
          throw new Error("Invalid API response structure");
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
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
