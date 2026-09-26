import ReachUs from "@/app/components/ReachUs/ReachUs";
import FigmaPageCanvas from "@/app/components/shared/FigmaPageCanvas";

export default function ContactUsPage() {
  return (
    <FigmaPageCanvas
      desktop={<ReachUs canvas initialFormOpen />}
      mobile={<ReachUs canvas={false} initialFormOpen />}
      nodeId="7077:13486"
      fitCanvasHeight
    />
  );
}
