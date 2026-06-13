import { useQuery } from '@tanstack/react-query';
import { api, type BecomeSupplierResponse } from '../app/lib/api';
import { queryKeys } from '../app/hooks/useQuery';

// Hook to fetch Become a Supplier data
export const useBecomeSupplier = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: queryKeys.becomeSupplier(),
    queryFn: api.getBecomeSupplier,
  });

  return {
    data,
    isLoading,
    error,
    hasData: !!data,
  };
};

export type { BecomeSupplierResponse };
