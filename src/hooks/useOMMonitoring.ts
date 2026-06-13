import { useQuery } from "@tanstack/react-query";
import { api, type OMMonitoringResponse, type OMMonitoringData } from "../app/lib/api";
import { queryKeys } from "../app/hooks/useQuery";

export const useOMMonitoring = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: queryKeys.omMonitoring(),
    queryFn: api.getOMMonitoring,
  });

  return {
    omData: data,
    isLoading,
    error,
    hasData: !!data,
  };
};

export type { OMMonitoringData, OMMonitoringResponse };