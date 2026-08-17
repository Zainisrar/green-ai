import AboutUs from "@/app/components/AboutUs/AboutUs";
import FigmaPageCanvas from "@/app/components/shared/FigmaPageCanvas";

export default function WelcomeToGreenPage() {
  return (
    <FigmaPageCanvas
      desktop={<AboutUs canvas />}
      mobile={<AboutUs />}
      nodeId="7080:56378"
      fitCanvasHeight
    />
  );
}
