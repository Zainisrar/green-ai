import NewsletterSignup from "@/app/components/Newsletter/NewsletterSignup";
import FigmaPageCanvas from "@/app/components/shared/FigmaPageCanvas";

export default function NewsletterPage() {
  return (
    <FigmaPageCanvas
      desktop={<NewsletterSignup canvas />}
      mobile={<NewsletterSignup canvas />}
      nodeId="7077:14996"
      fitCanvasHeight
    />
  );
}
