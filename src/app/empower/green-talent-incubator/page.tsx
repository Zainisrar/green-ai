import GreenTalentIncubator from "@/app/components/GreenTalentIncubator/GreenTalentIncubator";
import FigmaPageCanvas from "@/app/components/shared/FigmaPageCanvas";

export default function GreenTalentIncubatorPage() {
  return (
    <FigmaPageCanvas
      desktop={<GreenTalentIncubator canvas />}
      mobile={<GreenTalentIncubator />}
      nodeId="7077:15370"
      fitCanvasHeight
    />
  );
}
