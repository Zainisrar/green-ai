import Project from "@/app/components/Projects/Project";
import FigmaPageCanvas from "@/app/components/shared/FigmaPageCanvas";

export default function ProjectPortfolioPage() {
  return (
    <FigmaPageCanvas
      desktop={<Project />}
      mobile={<Project />}
      nodeId="7077:7011"
    />
  );
}
