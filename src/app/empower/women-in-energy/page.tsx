import FigmaPageCanvas from "@/app/components/shared/FigmaPageCanvas";
import WomenInEnergy from "@/app/components/WomenInEnergy/WomenInEnergy";

export default function WomenInEnergyPage() {
  return (
    <FigmaPageCanvas
      desktop={<WomenInEnergy canvas />}
      mobile={<WomenInEnergy canvas />}
      nodeId="7077:19753"
      fitCanvasHeight
      scaleMobileToViewport
    />
  );
}
