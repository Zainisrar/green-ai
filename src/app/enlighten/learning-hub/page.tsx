import LearningHub from "@/app/components/LearningHub/LearningHub";
import FigmaPageCanvas from "@/app/components/shared/FigmaPageCanvas";

export default function LearningHubPage() {
  return (
    <FigmaPageCanvas
      desktop={<LearningHub canvas />}
      mobile={<LearningHub />}
      nodeId="pattern-derived-learning-hub"
      fitCanvasHeight
    />
  );
}
