import { useQuery } from "@tanstack/react-query";
import { api, type VisionMissionResponse, type VisionMissionData } from "../app/lib/api";
import { queryKeys } from "../app/hooks/useQuery";

export const useVisionMission = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: queryKeys.visionMission(),
    queryFn: api.getVisionMission,
  });

  const visionMissionSection = data?.sections?.[0];

  return {
    visionMissionData: data,
    visionMissionSection,
    isLoading,
    error,
    hasData: !!data,
  };
};

export type { VisionMissionData, VisionMissionResponse };