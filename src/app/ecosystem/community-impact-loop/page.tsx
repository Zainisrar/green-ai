import CommunityImpactLoop from "@/app/components/CommunityImpactLoop/CommunityImpactLoop";
import FigmaPageCanvas from "@/app/components/shared/FigmaPageCanvas";

export default function CommunityImpactLoopPage() {
  return (
    <FigmaPageCanvas
      desktop={<CommunityImpactLoop canvas />}
      mobile={<CommunityImpactLoop />}
      nodeId="7077:15645"
      fitCanvasHeight
    />
  );
}
