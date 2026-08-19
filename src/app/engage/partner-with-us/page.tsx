import PartnerWithUs from "@/app/components/PartnerWithUs/PartnerWithUs";
import FigmaPageCanvas from "@/app/components/shared/FigmaPageCanvas";

export default function PartnerWithUsPage() {
  return (
    <FigmaPageCanvas
      desktop={<PartnerWithUs canvas />}
      mobile={<PartnerWithUs canvas />}
      nodeId="7077:23359"
      fitCanvasHeight
    />
  );
}
