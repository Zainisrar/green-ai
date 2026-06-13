import { useQuery } from "@tanstack/react-query";
import { api, type CertificationsAccreditationsResponse, type CertificationsAccreditationsData } from "../app/lib/api";
import { queryKeys } from "../app/hooks/useQuery";

export const useCertificationsAccreditations = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: queryKeys.certificationsAccreditations(),
    queryFn: api.getCertificationsAccreditations,
  });

  return {
    certificationsData: data,
    isLoading,
    error,
    hasData: !!data,
  };
};

export type { CertificationsAccreditationsData, CertificationsAccreditationsResponse };