import JobOpenings from "@/app/components/JobOpenings/JobOpenings";
import FigmaPageCanvas from "@/app/components/shared/FigmaPageCanvas";

export default function JobOpeningsPage() {
  return (
    <FigmaPageCanvas
      desktop={<JobOpenings />}
      mobile={<JobOpenings />}
      nodeId="7077:17124"
      scaleMobileToViewport
    />
  );
}
