import { useQuery } from "@tanstack/react-query";
import { api, type EnergyStorageSmartGridResponse, type EnergyStorageSmartGridData } from "../app/lib/api";
import { queryKeys } from "../app/hooks/useQuery";

export const useEnergyStorageSmartGrid = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: queryKeys.energyStorageSmartGrid(),
    queryFn: api.getEnergyStorageSmartGrid,
  });

  return {
    smartGridData: data,
    isLoading,
    error,
    hasData: !!data,
  };
};

export type { EnergyStorageSmartGridData, EnergyStorageSmartGridResponse };