import { QueryClient } from '@tanstack/react-query';

export const queryClientConfig = {
  defaultOptions: {
    queries: {
      // Time before data is considered stale
      staleTime: 60 * 1000, // 1 minute
      
      // Time before inactive queries are garbage collected
      gcTime: 5 * 60 * 1000, // 5 minutes (formerly cacheTime)
      
      // Number of retry attempts for failed queries
      retry: (failureCount: number, error: any) => {
        // Don't retry on 4xx errors
        if (error?.status >= 400 && error?.status < 500) {
          return false;
        }
        // Retry up to 3 times for other errors
        return failureCount < 3;
      },
      
      // Retry delay
      retryDelay: (attemptIndex: number) => Math.min(1000 * 2 ** attemptIndex, 30000),
      
      // Refetch on window focus
      refetchOnWindowFocus: false,
      
      // Refetch on reconnect
      refetchOnReconnect: true,
    },
    mutations: {
      // Retry mutations once
      retry: 1,
    },
  },
};

export function createQueryClient() {
  return new QueryClient(queryClientConfig);
}