import Handbook from "@/app/components/Handbook/Handbook";
import FigmaPageCanvas from "@/app/components/shared/FigmaPageCanvas";

export default function SupplierCodeOfConductPage() {
  return (
    <FigmaPageCanvas
      desktop={<Handbook canvas />}
      mobile={<Handbook />}
      nodeId="7077:28846"
      fitCanvasHeight
    />
  );
}
