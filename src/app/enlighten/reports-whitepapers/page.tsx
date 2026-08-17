import ReportWhitePapers from "@/app/components/ReportWhitePapers/ReportWhitePapers";
import FigmaPageCanvas from "@/app/components/shared/FigmaPageCanvas";

export default function ReportsWhitepapersPage() {
  return (
    <FigmaPageCanvas
      desktop={<ReportWhitePapers canvas />}
      mobile={<ReportWhitePapers />}
      nodeId="7077:5298"
      fitCanvasHeight
    />
  );
}
