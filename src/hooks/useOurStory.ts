import { useQuery } from "@tanstack/react-query";
import { api, type OurStoryResponse, type OurStoryData } from "../app/lib/api";
import { queryKeys } from "../app/hooks/useQuery";

export const useOurStory = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: queryKeys.ourStory(),
    queryFn: api.getOurStory,
  });

  return {
    ourStoryData: data,
    isLoading,
    error,
    hasData: !!data,
  };
};

export type { OurStoryData, OurStoryResponse };