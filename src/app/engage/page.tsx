import FigmaPageCanvas from "@/app/components/shared/FigmaPageCanvas";
import ReachUs from "@/app/components/ReachUs/ReachUs";

export default function EngagePage() {
  return (
    <FigmaPageCanvas
      desktop={<ReachUs canvas />}
      mobile={<ReachUs canvas={false} />}
      nodeId="7077:13486"
      fitCanvasHeight
    />
  );
}

