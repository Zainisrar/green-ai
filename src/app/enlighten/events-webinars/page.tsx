import EventsWebinars from "@/app/components/EventsWebinars/EventsWebinars";
import FigmaPageCanvas from "@/app/components/shared/FigmaPageCanvas";

export default function EventsWebinarsPage() {
  return (
    <FigmaPageCanvas
      desktop={<EventsWebinars canvas />}
      mobile={<EventsWebinars />}
      nodeId="7080:57600"
      fitCanvasHeight
    />
  );
}
