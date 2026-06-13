import { useQuery } from '@tanstack/react-query';
import { api, type CollaborationInnovationResponse } from '../app/lib/api';
import { queryKeys } from '../app/hooks/useQuery';

export const useCollaborationInnovation = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: queryKeys.collaborationInnovation(),
    queryFn: api.getCollaborationInnovation,
  });

  return {
    data,
    isLoading,
    error,
    hasData: !!data,
  };
};

export type { CollaborationInnovationResponse };
