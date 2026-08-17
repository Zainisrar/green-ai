import MediaMentions from "@/app/components/MediaMentions/MediaMentions";
import FigmaPageCanvas from "@/app/components/shared/FigmaPageCanvas";

export default function MediaMentionsPage() {
  return (
    <FigmaPageCanvas
      desktop={<MediaMentions canvas />}
      mobile={<MediaMentions />}
      nodeId="7077:5840"
      fitCanvasHeight
    />
  );
}
