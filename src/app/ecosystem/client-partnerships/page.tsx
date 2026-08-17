import ClientPartnerships from "@/app/components/ClientPartnerships/ClientPartnerships";
import FigmaPageCanvas from "@/app/components/shared/FigmaPageCanvas";

export default function ClientPartnershipsPage() {
  return (
    <FigmaPageCanvas
      desktop={<ClientPartnerships canvas />}
      mobile={<ClientPartnerships />}
      nodeId="7077:15858"
      fitCanvasHeight
    />
  );
}
