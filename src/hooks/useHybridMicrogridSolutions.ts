import { useQuery } from "@tanstack/react-query";
import { api, type HybridMicrogridSolutionsResponse, type HybridMicrogridSolutionsData } from "../app/lib/api";
import { queryKeys } from "../app/hooks/useQuery";

export const useHybridMicrogridSolutions = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: queryKeys.hybridMicrogridSolutions(),
    queryFn: api.getHybridMicrogridSolutions,
  });

  return {
    microgridData: data,
    isLoading,
    error,
    hasData: !!data,
  };
};

export type { HybridMicrogridSolutionsData, HybridMicrogridSolutionsResponse };