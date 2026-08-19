import TeamGreen from "@/app/components/TeamGreen/TeamGreen";
import FigmaPageCanvas from "@/app/components/shared/FigmaPageCanvas";

export default function TeamGreenPage() {
  return (
    <FigmaPageCanvas
      desktop={<TeamGreen canvas />}
      mobile={<TeamGreen />}
      nodeId="7077:21015"
      fitCanvasHeight
    />
  );
}
