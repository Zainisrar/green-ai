import { useQuery } from '@tanstack/react-query';
import { api, type CommunityImpactLoopResponse } from '../app/lib/api';
import { queryKeys } from '../app/hooks/useQuery';

export const useCommunityImpactLoop = () => {
  const { data, isLoading, error } = useQuery<CommunityImpactLoopResponse | undefined>({
    queryKey: queryKeys.communityImpactLoop(),
    queryFn: api.getCommunityImpactLoop,
  });

  return {
    data,
    isLoading,
    error,
    hasData: !!data,
  };
};

export type { CommunityImpactLoopResponse };