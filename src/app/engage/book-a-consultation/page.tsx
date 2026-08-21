import BookAConsultation from "@/app/components/BookAConsultation/BookAConsultation";
import FigmaPageCanvas from "@/app/components/shared/FigmaPageCanvas";

export default function BookAConsultationPage() {
  return (
    <FigmaPageCanvas
      desktop={<BookAConsultation canvas />}
      mobile={<BookAConsultation canvas />}
      nodeId="7077:19924"
      fitCanvasHeight
      scaleMobileToViewport
    />
  );
}
