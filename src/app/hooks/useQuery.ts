import { useMutation, useQueryClient } from '@tanstack/react-query';

// Custom hook for mutations with common patterns
export const useMutationWithInvalidation = (
  mutationFn: (variables: any) => Promise<any>,
  options?: {
    onSuccess?: (data: any) => void;
    onError?: (error: any) => void;
    invalidateQueries?: string[];
  }
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn,
    onSuccess: (data) => {
      // Invalidate specified queries
      if (options?.invalidateQueries) {
        options.invalidateQueries.forEach((queryKey) => {
          queryClient.invalidateQueries({ queryKey: [queryKey] });
        });
      }
      options?.onSuccess?.(data);
    },
    onError: options?.onError,
  });
};

// Query keys factory for consistent key management
export const queryKeys = {
  all: ['queries'] as const,
  insights: () => [...queryKeys.all, 'insights'] as const,
  energyServices: () => [...queryKeys.all, 'energy-services'] as const,
  aboutUs: () => [...queryKeys.all, 'about-us'] as const,
  whyGreen: () => [...queryKeys.all, 'why-green'] as const,
  globalSnapshot: () => [...queryKeys.all, 'global-snapshot'] as const,
  fastFactStats: () => [...queryKeys.all, 'fast-fact-stats'] as const,
  ourStory: () => [...queryKeys.all, 'our-story'] as const,
  visionMission: () => [...queryKeys.all, 'vision-mission'] as const,
  leadershipTeam: () => [...queryKeys.all, 'leadership-team'] as const,
  certificationsAccreditations: () => [...queryKeys.all, 'certifications-accreditations'] as const,
  sustainabilityESG: () => [...queryKeys.all, 'sustainability-esg'] as const,
  solarEPCMServices: () => [...queryKeys.all, 'solar-epcm-services'] as const,
  hybridMicrogridSolutions: () => [...queryKeys.all, 'hybrid-microgrid-solutions'] as const,
  energyStorageSmartGrid: () => [...queryKeys.all, 'energy-storage-smart-grid'] as const,
  omMonitoring: () => [...queryKeys.all, 'om-monitoring'] as const,
  gridIntel: () => [...queryKeys.all, 'grid-intel'] as const,
  becomeSupplier: () => [...queryKeys.all, 'become-a-supplier'] as const,
  clientPartnerships: () => [...queryKeys.all, 'client-partnerships'] as const,
  collaborationInnovation: () => [...queryKeys.all, 'collaboration-innovation'] as const,
  communityImpactLoop: () => [...queryKeys.all, 'community-impact-loop'] as const,
} as const;