import { useQuery } from "@tanstack/react-query";
import { api, type GridIntelResponse, type GridIntelData } from "../app/lib/api";
import { queryKeys } from "../app/hooks/useQuery";

export const useGridIntel = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: queryKeys.gridIntel(),
    queryFn: api.getGridIntel,
  });

  return {
    gridIntelData: data,
    isLoading,
    error,
    hasData: !!data,
  };
};

export type { GridIntelData, GridIntelResponse };