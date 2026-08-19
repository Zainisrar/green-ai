import EsgMatters from "@/app/components/EsgMatters/EsgMatters";
import FigmaPageCanvas from "@/app/components/shared/FigmaPageCanvas";

export default function WhyEsgMattersToGreenPage() {
  return (
    <FigmaPageCanvas
      desktop={<EsgMatters canvas />}
      mobile={<EsgMatters />}
      nodeId="7077:18427"
      fitCanvasHeight
    />
  );
}
