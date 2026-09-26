import FigmaPageCanvas from "@/app/components/shared/FigmaPageCanvas";
import WomenInEnergy from "@/app/components/WomenInEnergy/WomenInEnergy";

export default function WomenInEnergyPage() {
  return (
    <FigmaPageCanvas
      desktop={<WomenInEnergy canvas />}
      mobile={<WomenInEnergy />}
      nodeId="7077:19753"
      fitCanvasHeight
    />
  );
}
