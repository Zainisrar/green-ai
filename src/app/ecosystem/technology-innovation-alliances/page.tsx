import TechnologyInnovationAlliances from "@/app/components/TechnologyInnovationAlliances/TechnologyInnovationAlliances";
import FigmaPageCanvas from "@/app/components/shared/FigmaPageCanvas";

export default function TechnologyInnovationAlliancesPage() {
  return (
    <FigmaPageCanvas
      desktop={<TechnologyInnovationAlliances canvas />}
      mobile={<TechnologyInnovationAlliances />}
      nodeId="7077:22719"
      fitCanvasHeight
    />
  );
}
