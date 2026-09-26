import ReachUs from "@/app/components/ReachUs/ReachUs";
import FigmaPageCanvas from "@/app/components/shared/FigmaPageCanvas";

export default function ReachUsPage() {
  return (
    <FigmaPageCanvas
      desktop={<ReachUs canvas />}
      mobile={<ReachUs canvas={false} />}
      nodeId="7077:13486"
      fitCanvasHeight
    />
  );
}
