import CommunityVoices from "@/app/components/CommunityVoices/CommunityVoices";
import FigmaPageCanvas from "@/app/components/shared/FigmaPageCanvas";

export default function CommunityVoicesPage() {
  return (
    <FigmaPageCanvas
      desktop={<CommunityVoices canvas />}
      mobile={<CommunityVoices />}
      nodeId="7077:21678"
      fitCanvasHeight
    />
  );
}
