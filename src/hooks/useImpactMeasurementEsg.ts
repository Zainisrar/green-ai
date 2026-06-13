"use client";
import { useEffect, useState } from "react";

interface HighlightedText {
  text: string;
  highlighted: string;
}

interface KeyItem {
  text: string;
  highlighted: string;
}

interface CTAItem {
  href: string;
  text: string;
}

interface MainPage {
  cta: CTAItem[];
  quote: HighlightedText;
  title: string;
  description: HighlightedText;
  subHeadline: string;
}

interface WhyEsgMattersGreen {
  keys: KeyItem[];
  title: string;
  description: string;
  subHeadline: string;
}

interface LifeCycleItem {
  title: string;
  description: string;
}

interface EsgIntegrationProjectLifeCycle {
  items: LifeCycleItem[];
  quote: HighlightedText;
  title: string;
}

interface TrustSignals {
  items: string[];
  quote: HighlightedText;
  title: string;
}

interface SampleMetricsSnapshot {
  keys: KeyItem[];
  title: string;
  description: HighlightedText;
}

interface MetricItem {
  category: string;
  keyMetricsTracked: string;
}

interface HowWeMeasureImpact {
  quote: HighlightedText;
  metrics: MetricItem[];
}

export interface ImpactMeasurementEsgData {
  id: number;
  mainPage: MainPage;
  whyEsgMattersGreen: WhyEsgMattersGreen;
  esgIntegrationProjectLifeCycle: EsgIntegrationProjectLifeCycle;
  trustSignals: TrustSignals;
  sampleMetricsSnapshot: SampleMetricsSnapshot;
  howWeMeasureImpact: HowWeMeasureImpact;
  createdAt: string;
  updatedAt: string;
}

export const useImpactMeasurementEsg = () => {
  const [data, setData] = useState<ImpactMeasurementEsgData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "https://g-stack.green.com.pg/api/ecosystem/impact-measurement-esg",
          {
            next: { revalidate: 60 },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch impact measurement ESG data");
        }

        const result = await response.json();
        setData(result);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
        console.error("Error fetching impact measurement ESG data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
};
