import ThoughtsLeadership from "@/app/components/ThoughtsLeadership/ThoughtsLeadership";
import FigmaPageCanvas from "@/app/components/shared/FigmaPageCanvas";

export default function ThoughtsLeadershipPage() {
  return (
    <FigmaPageCanvas
      desktop={<ThoughtsLeadership canvas />}
      mobile={<ThoughtsLeadership />}
      nodeId="7077:15063"
      fitCanvasHeight
    />
  );
}
