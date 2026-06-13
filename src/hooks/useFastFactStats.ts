import { useQuery } from "@tanstack/react-query";
import { api, type FastFactStatsResponse, type FastFactStatsData, type FastFactStatsSection, type FastFactStatsImpactSection } from "../app/lib/api";
import { queryKeys } from "../app/hooks/useQuery";

export const useFastFactStats = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: queryKeys.fastFactStats(),
    queryFn: api.getFastFactStats,
  });

  // Extract sections from the response
  const fastFactsSection = data?.sections?.find(section => section.id === 'fast-facts') as FastFactStatsSection | undefined;
  const impactSummarySection = data?.sections?.find(section => section.id === 'impact-summary') as FastFactStatsImpactSection | undefined;

  return {
    data,
    fastFactsSection,
    impactSummarySection,
    isLoading,
    error,
    hasData: !!data,
  };
};

export type { 
  FastFactStatsResponse, 
  FastFactStatsData, 
  FastFactStatsSection, 
  FastFactStatsImpactSection 
};