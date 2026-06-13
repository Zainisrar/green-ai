import { useState, useEffect } from "react";

interface DescriptionWithHighlight {
  text: string;
  highlighted: string;
}

interface QuoteWithHighlight {
  text: string;
  highlighted: string;
}

interface MainPage {
  cta: any[];
  title: string;
  quote1: {
    text: string;
    highlighted: string;
  };
  quote2: {
    text: string;
    highlighted: string;
  };
  description: {
    text: string;
    headline: string;
  };
  subHeadline: string;
}

interface OurModel {
  key: Array<{
    title: string;
    description: string;
  }>;
  quote: QuoteWithHighlight;
  title: {
    step1: string;
    step2: string;
    step3: string;
  };
  description: string;
}

interface WhatWeOffer {
  items: Array<{
    title: string;
    description: DescriptionWithHighlight;
  }>;
  title: string;
}

interface AlumniVoices {
  title: string;
  voices: {
    text1: string;
    text2: string;
  };
}

interface PartnerWithUs {
  keys: Array<{
    title: string;
    description: string;
  }>;
  title: string;
  description: string;
}

interface WhyWeBuiltThis {
  key: {
    items: string[];
    title: string;
  };
  quote: QuoteWithHighlight;
  title: string;
  description: string;
}

interface Modals {
  ourModel: OurModel;
  whatWeOffer: WhatWeOffer;
  alumniVoices: AlumniVoices;
  partnerWithUs: PartnerWithUs;
  whyWeBuiltThis: WhyWeBuiltThis;
}

interface GreenTalentIncubatorData {
  id: number;
  mainPage: MainPage;
  modals: Modals;
  createdAt: string;
  updatedAt: string;
}

interface ApiResponse {
  success: boolean;
  data: GreenTalentIncubatorData;
}

export const useGreenTalentIncubator = () => {
  const [data, setData] = useState<GreenTalentIncubatorData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "https://g-stack.green.com.pg/api/empower/green-talent-incubator"
        );
        
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const result: ApiResponse = await response.json();
        
        if (result.success) {
          setData(result.data);
        } else {
          throw new Error("API returned unsuccessful response");
        }
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Unknown error"));
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
};
