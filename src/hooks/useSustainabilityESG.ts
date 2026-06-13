import { useQuery } from "@tanstack/react-query";
import { api, type SustainabilityESGResponse, type SustainabilityESGData } from "../app/lib/api";
import { queryKeys } from "../app/hooks/useQuery";

export const useSustainabilityESG = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: queryKeys.sustainabilityESG(),
    queryFn: api.getSustainabilityESG,
  });

  return {
    sustainabilityData: data,
    isLoading,
    error,
    hasData: !!data,
  };
};

export type { SustainabilityESGData, SustainabilityESGResponse };