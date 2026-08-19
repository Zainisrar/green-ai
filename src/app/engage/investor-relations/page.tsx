import InvestorRelations from "@/app/components/InvestorRelations/InvestorRelations";
import FigmaPageCanvas from "@/app/components/shared/FigmaPageCanvas";

export default function InvestorRelationsPage() {
  return (
    <FigmaPageCanvas
      desktop={<InvestorRelations canvas />}
      mobile={<InvestorRelations canvas />}
      nodeId="7077:19989"
      fitCanvasHeight
    />
  );
}
