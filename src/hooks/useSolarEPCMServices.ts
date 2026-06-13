import { useQuery } from "@tanstack/react-query";
import { api, type SolarEPCMServicesResponse, type SolarEPCMServicesData } from "../app/lib/api";
import { queryKeys } from "../app/hooks/useQuery";

export const useSolarEPCMServices = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: queryKeys.solarEPCMServices(),
    queryFn: api.getSolarEPCMServices,
  });

  return {
    epcmData: data,
    isLoading,
    error,
    hasData: !!data,
  };
};

export type { SolarEPCMServicesData, SolarEPCMServicesResponse };