import CollaborationInnovation from "@/app/components/CollaborationInnovation/CollaborationInnovation";
import FigmaPageCanvas from "@/app/components/shared/FigmaPageCanvas";

export default function CollaborationInnovationPage() {
  return (
    <FigmaPageCanvas
      desktop={<CollaborationInnovation canvas />}
      mobile={<CollaborationInnovation />}
      nodeId="7077:18721"
      fitCanvasHeight
    />
  );
}

