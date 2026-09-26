import LearningHub from "@/app/components/LearningHub/LearningHub";
import FigmaPageCanvas from "@/app/components/shared/FigmaPageCanvas";

export const revalidate = 86400;

export function generateStaticParams() {
  return [
    { slug: "training-certifications" },
    { slug: "knowledge-base" },
    { slug: "green-academy" },
  ];
}

export default function LearningHubSubPage() {
  return (
    <FigmaPageCanvas
      desktop={<LearningHub canvas />}
      mobile={<LearningHub />}
      nodeId="pattern-derived-learning-hub"
      fitCanvasHeight
    />
  );
}
