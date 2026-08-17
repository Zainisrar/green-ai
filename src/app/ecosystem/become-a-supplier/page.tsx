import BecomeSupplier from "@/app/components/BecomeSupplier/BecomeSupplier";
import FigmaPageCanvas from "@/app/components/shared/FigmaPageCanvas";

export default function BecomeSupplierPage() {
  return (
    <FigmaPageCanvas
      desktop={<BecomeSupplier canvas />}
      mobile={<BecomeSupplier />}
      nodeId="7077:28549"
      fitCanvasHeight
    />
  );
}
