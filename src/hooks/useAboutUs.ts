import { useQuery } from "@tanstack/react-query";
import { api, type AboutUsResponse, type AboutUsData } from "../app/lib/api";
import { queryKeys } from "../app/hooks/useQuery";

export const useAboutUs = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: queryKeys.aboutUs(),
    queryFn: api.getAboutUs,
  });

  const aboutUsData = data?.success && data.data.length > 0 ? data.data[0] : null;

  return {
    aboutUsData,
    isLoading,
    error,
    hasData: data?.success && data.data.length > 0,
  };
};

export type { AboutUsData, AboutUsResponse };