import CareersGreen from "@/app/components/CareersGreen/CareersGreen";
import FigmaPageCanvas from "@/app/components/shared/FigmaPageCanvas";

export default function CareersAtGreenPage() {
  return (
    <FigmaPageCanvas
      desktop={<CareersGreen canvas />}
      mobile={<CareersGreen />}
      nodeId="7077:16449"
      fitCanvasHeight
    />
  );
}
