import { useQuery } from "@tanstack/react-query";
import { CMS_BASE_URL } from "@/config/cms";

export interface ProjectPhotograph {
  url: string;
  alt: string;
  dashboardFrame?: { left: number; top: number; width: number; height: number };
}

export interface ProjectMotionFrame extends ProjectPhotograph {
  photoIndex: number;
}

export interface ProjectDetails {
  sourceNumber: number;
  slug: string;
  siteName: string;
  clientName: string;
  projectScope: string;
  listedCapacity: string;
  completionYear: string;
  dashboardTitle: string;
  sourceNote?: string;
  gallery?: ProjectPhotograph[];
  dashboardSequence?: ProjectMotionFrame[];
  population?: string;
}

export interface ProjectData extends Partial<ProjectDetails> {
  id: number;
  title: string;
  slug: string;
  featuredImg: string;
  numberofsystems: string;
  noofdays: string;
  totalgeneration: string;
  battery: string;
  coalA: string;
  emissionreduction: string;
  treesplanted: string;
  capacity: string;
  todateproduct: string;
  consumption: string;
  totalenergydaily: string;
  createdAt: string;
  updatedAt: string;
}

const fetchProjectDetails = async (): Promise<ProjectDetails[]> => {
  const response = await fetch(
    `${CMS_BASE_URL}/api/media/documents?search=project-portfolio-content.json&limit=10`,
  );
  if (!response.ok)
    throw new Error("Failed to fetch project portfolio details");
  const data = await response.json();
  const document = data.files?.find(
    (file: { id: number; originalFilename: string; folder: string }) =>
      file.originalFilename === "project-portfolio-content.json" &&
      file.folder === "endeavors/project-portfolio",
  );
  if (!document || !Number.isInteger(document.id)) {
    throw new Error("Project portfolio content document is unavailable");
  }
  const content = await fetch(
    `${CMS_BASE_URL}/api/media/download/${document.id}`,
  );
  if (!content.ok) throw new Error("Failed to load project portfolio content");
  const manifest = await content.json();
  if (manifest.schemaVersion !== 1 || !Array.isArray(manifest.projects)) {
    throw new Error("Invalid project portfolio content document");
  }
  return manifest.projects;
};

const fetchProjects = async (): Promise<ProjectData[]> => {
  const [response, details] = await Promise.all([
    fetch(`${CMS_BASE_URL}/api/endeavors/projects`),
    fetchProjectDetails(),
  ]);

  if (!response.ok) {
    throw new Error("Failed to fetch projects data");
  }

  const projects: ProjectData[] = await response.json();
  const bySlug = new Map(details.map((detail) => [detail.slug, detail]));
  return projects
    .map((project) => ({ ...bySlug.get(project.slug), ...project }))
    .sort(
      (a, b) =>
        (a.sourceNumber ?? Number.MAX_SAFE_INTEGER) -
        (b.sourceNumber ?? Number.MAX_SAFE_INTEGER),
    );
};

export const useProjects = () => {
  return useQuery({
    queryKey: ["projects"],
    queryFn: fetchProjects,
    staleTime: 0,
    refetchOnMount: "always",
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};
