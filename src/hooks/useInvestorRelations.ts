import { useEffect, useState } from "react";

// TypeScript Interfaces
export interface Icon {
  alt: string;
  src: string;
}

export interface KeyItem {
  icon: Icon;
  text: string;
}

export interface Quote {
  text: string;
  highlighted: string;
}

export interface CTA {
  href: string;
  text: string;
}

export interface Description {
  text: string;
  highlighted: string;
}

export interface MainPage {
  cta: CTA[];
  title: string;
  quote1: Quote;
  quote2: Quote;
  description: Description;
  subHeadline: string;
}

export interface WhyInvestGreen {
  key: KeyItem[];
  quote: Quote;
  title: string;
  headline: string;
}

export interface InvestmentInstruments {
  key: KeyItem[];
  quote: Quote;
  title: string;
  headline: string;
}

export interface FocusAreaData {
  items: string[];
}

export interface InvestmentFocusArea {
  title: string;
  headline: string;
  focusArea: FocusAreaData;
  capitalUse: FocusAreaData;
  returnProfile: FocusAreaData;
}

export interface PerformanceData {
  items: string[];
}

export interface PerformanceSnapshots {
  title: string;
  value: PerformanceData;
  metric: PerformanceData;
  headline: string;
}

export interface InvestorRelationsData {
  id: number;
  mainPage: MainPage;
  whyInvestGreen: WhyInvestGreen;
  investmentInstruments: InvestmentInstruments;
  investmentFocusArea: InvestmentFocusArea;
  performanceSnapshots: PerformanceSnapshots;
  createdAt: string;
  updatedAt: string;
}

export interface ApiResponse {
  success: boolean;
  data: InvestorRelationsData;
}

export const useInvestorRelations = () => {
  const [data, setData] = useState<InvestorRelationsData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "https://g-stack.green.com.pg/api/engage/investor-relations",
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
          throw new Error("Invalid data structure");
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
