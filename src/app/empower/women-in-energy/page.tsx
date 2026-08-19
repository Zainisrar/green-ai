import WomenInEnergy from "@/app/components/WomenInEnergy/WomenInEnergy";
import FigmaPageCanvas from "@/app/components/shared/FigmaPageCanvas";

export default function WomenInEnergyPage() {
  return (
    <FigmaPageCanvas
      desktop={<WomenInEnergy canvas />}
      mobile={<WomenInEnergy canvas />}
      nodeId="7077:19753"
      fitCanvasHeight
    />
  );
}
