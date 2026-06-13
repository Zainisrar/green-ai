import { useQuery } from "@tanstack/react-query";
import { api, type WhyGreenResponse, type WhyGreenData } from "../app/lib/api";
import { queryKeys } from "../app/hooks/useQuery";

export const useWhyGreen = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: queryKeys.whyGreen(),
    queryFn: api.getWhyGreen,
  });

  const whyGreenData = data?.success && data.data.length > 0 ? data.data[0] : null;

  return {
    whyGreenData,
    isLoading,
    error,
    hasData: data?.success && data.data.length > 0,
  };
};

export type { WhyGreenData, WhyGreenResponse };