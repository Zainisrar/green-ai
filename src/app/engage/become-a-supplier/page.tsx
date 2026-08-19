import BecomeSupplierCanvas from "@/app/components/BecomeSupplier/BecomeSupplierCanvas";
import FigmaPageCanvas from "@/app/components/shared/FigmaPageCanvas";

export default function BecomeASupplierPage() {
  return (
    <FigmaPageCanvas
      desktop={<BecomeSupplierCanvas />}
      mobile={<BecomeSupplierCanvas />}
      nodeId="7077:28549"
      fitCanvasHeight
    />
  );
}
