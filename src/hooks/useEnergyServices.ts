import { useQuery } from "@tanstack/react-query";
import { api, type EnergyServicesResponse, type EnergyServiceData } from "../app/lib/api";
import { queryKeys } from "../app/hooks/useQuery";

export const useEnergyServices = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: queryKeys.energyServices(),
    queryFn: api.getEnergyServices,
  });

  const energyData = data?.success && data.data.length > 0 ? data.data[0] : null;

  return {
    energyData,
    isLoading,
    error,
    hasData: data?.success && data.data.length > 0,
  };
};

export type { EnergyServiceData, EnergyServicesResponse };