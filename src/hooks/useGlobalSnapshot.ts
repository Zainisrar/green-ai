import { useQuery } from "@tanstack/react-query";
import { api, type GlobalSnapshotResponse, type GlobalSnapshotData } from "../app/lib/api";
import { queryKeys } from "../app/hooks/useQuery";

export const useGlobalSnapshot = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: queryKeys.globalSnapshot(),
    queryFn: api.getGlobalSnapshot,
  });

  const globalSnapshotData = data?.success && data.data.length > 0 ? data.data[0] : null;

  return {
    globalSnapshotData,
    isLoading,
    error,
    hasData: data?.success && data.data.length > 0,
  };
};

export type { GlobalSnapshotData, GlobalSnapshotResponse };