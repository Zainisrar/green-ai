"use client";
import { useEffect, useState } from "react";

// Image Interface
interface Image {
  alt: string;
  src: string;
}

// CTA Interface
interface CTA {
  href: string;
  text: string;
}

// Modal Interface
interface Modal {
  cta: string;
  img: Image;
}

// Quote Interfaces
interface Quote1 {
  text1: string;
  text2: string;
  highlighted1: string;
  highlighted2: string;
}

interface Quote2 {
  text: string;
  highlighted: string;
}

// Description Interface
interface Description {
  text: string;
  highlighted: string;
}

// Main Page Interface
interface MainPage {
  cta: CTA[];
  title: string;
  modals: Modal[];
  quote1: Quote1;
  quote2: Quote2;
  description: Description;
  subHeadline: string;
}

// Voices Item Interface
interface VoiceItem {
  img: Image;
  title: string;
  description: string;
}

// Voices From Field Interface
interface VoicesFromField {
  items: VoiceItem[];
  title: string;
}

// Impact Difference Keys
interface ImpactKey {
  items: string[];
  title: string;
}

// What Makes Our Impact Different Interface
interface WhatMakesOurImpactDifferent {
  key1: ImpactKey;
  key2: ImpactKey;
  title: string;
}

// Modals Interface
interface Modals {
  voicesFromField: VoicesFromField;
  whatMakesOurImpactDifferent: WhatMakesOurImpactDifferent;
}

// Main Data Interface
interface CommunityVoicesData {
  id: number;
  mainPage: MainPage;
  modals: Modals;
  createdAt: string;
  updatedAt: string;
}

interface ApiResponse {
  success: boolean;
  data: CommunityVoicesData;
}

interface UseCommunityVoicesReturn {
  data: CommunityVoicesData | null;
  loading: boolean;
  error: string | null;
}

export const useCommunityVoices = (): UseCommunityVoicesReturn => {
  const [data, setData] = useState<CommunityVoicesData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "https://g-stack.green.com.pg/api/empower/community-voices",
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
  CommunityVoicesData,
  MainPage,
  Modals,
  VoicesFromField,
  WhatMakesOurImpactDifferent,
  VoiceItem,
  ImpactKey,
  CTA,
  Modal,
  Quote1,
  Quote2,
  Description,
  Image,
};
