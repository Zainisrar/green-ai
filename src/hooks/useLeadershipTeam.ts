import { useQuery } from "@tanstack/react-query";
import { api, type LeadershipTeamResponse, type LeadershipTeamData } from "../app/lib/api";
import { queryKeys } from "../app/hooks/useQuery";

export const useLeadershipTeam = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: queryKeys.leadershipTeam(),
    queryFn: api.getLeadershipTeam,
  });

  const leadershipSection = data?.sections?.[0];

  return {
    leadershipTeamData: data,
    leadershipSection,
    isLoading,
    error,
    hasData: !!data,
  };
};

export type { LeadershipTeamData, LeadershipTeamResponse };