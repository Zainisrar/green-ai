import { useQuery } from "@tanstack/react-query";

interface ReportImage {
  alt: string;
  src: string;
}

interface ReportData {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  featuredImg: ReportImage;
  year: string;
  pptx: string;
  createdAt: string;
  updatedAt: string;
  /**
   * Optional sidebar classification supplied by the CMS. `groupId` is the
   * canonical value; the archive flags support older CMS payloads.
   */
  groupId?: "2025-current" | "2024" | "2023-primary" | "2023-archive";
  archived?: boolean;
  isArchived?: boolean;
}

const fetchReportsWhitepapers = async (): Promise<ReportData[]> => {
  const response = await fetch(
    "https://greencms.percepco.co.uk/api/enlighten/reports-whitepapers",
  );

  if (!response.ok) {
    throw new Error("Failed to fetch reports and whitepapers data");
  }

  return response.json();
};

export const useReportsWhitepapers = () => {
  return useQuery({
    queryKey: ["reports-whitepapers"],
    queryFn: fetchReportsWhitepapers,
    staleTime: 0,
    refetchOnMount: "always",
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};
