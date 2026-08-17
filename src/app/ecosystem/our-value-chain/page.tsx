import OurChainValue from "@/app/components/OurChainValue/OurChainValue";
import FigmaPageCanvas from "@/app/components/shared/FigmaPageCanvas";

export default function OurValueChainPage() {
  return (
    <FigmaPageCanvas
      desktop={<OurChainValue canvas />}
      mobile={<OurChainValue />}
      nodeId="7077:18325"
      fitCanvasHeight
    />
  );
}
