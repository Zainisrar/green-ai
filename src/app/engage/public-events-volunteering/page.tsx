import PublicEventVolunteering from "@/app/components/PublicEventVolunteering/PublicEventVolunteering";
import FigmaPageCanvas from "@/app/components/shared/FigmaPageCanvas";

export default function PublicEventsVolunteeringPage() {
  return (
    <FigmaPageCanvas
      desktop={<PublicEventVolunteering canvas />}
      mobile={<PublicEventVolunteering canvas />}
      nodeId="7077:24270"
      fitCanvasHeight
    />
  );
}
