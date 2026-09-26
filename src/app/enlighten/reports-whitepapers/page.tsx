"use client";

import { useState } from "react";
import ReportWhitePapers from "@/app/components/ReportWhitePapers/ReportWhitePapers";
import FigmaPageCanvas from "@/app/components/shared/FigmaPageCanvas";

export default function ReportsWhitepapersPage() {
  const [nodeId, setNodeId] = useState("7077:5298");

  return (
    <FigmaPageCanvas
      desktop={<ReportWhitePapers canvas onNodeChange={setNodeId} />}
      mobile={<ReportWhitePapers onNodeChange={setNodeId} />}
      nodeId={nodeId}
      fitCanvasHeight
    />
  );
}
