import OurProcurementPhilosophy from "@/app/components/OurProcurementPhilosophy/OurProcurementPhilosophy";
import FigmaPageCanvas from "@/app/components/shared/FigmaPageCanvas";

export default function OurProcurementPhilosophyPage() {
  return (
    <FigmaPageCanvas
      desktop={<OurProcurementPhilosophy canvas />}
      mobile={<OurProcurementPhilosophy />}
      nodeId="7080:73710"
      fitCanvasHeight
    />
  );
}
