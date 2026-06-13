import { useQuery } from '@tanstack/react-query';
import { api, type ClientPartnershipsResponse } from '../app/lib/api';
import { queryKeys } from '../app/hooks/useQuery';

// Hook to fetch Client Partnerships data
export const useClientPartnerships = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: queryKeys.clientPartnerships(),
    queryFn: api.getClientPartnerships,
  });

  return {
    data,
    isLoading,
    error,
    hasData: !!data,
  };
};

export type { ClientPartnershipsResponse };
