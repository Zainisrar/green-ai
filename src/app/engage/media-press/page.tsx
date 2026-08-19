import MediaPress from "@/app/components/MediaPress/MediaPress";
import FigmaPageCanvas from "@/app/components/shared/FigmaPageCanvas";

export default function MediaPressPage() {
  return (
    <FigmaPageCanvas
      desktop={<MediaPress canvas />}
      mobile={<MediaPress canvas />}
      nodeId="7077:23952"
      fitCanvasHeight
    />
  );
}
