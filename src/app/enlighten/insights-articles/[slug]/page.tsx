"use client";
import { useParams } from "next/navigation";
import ArticlesDetail from "../../../components/Articles/ArticlesDetail";
import FigmaPageCanvas from "../../../components/shared/FigmaPageCanvas";

export default function ArticleDetailPage() {
  const params = useParams();
  const slug = params.slug as string;

  return (
    <FigmaPageCanvas
      desktop={<ArticlesDetail slug={slug} canvas />}
      mobile={<ArticlesDetail slug={slug} />}
      nodeId="7077:6405"
      designHeight={1450}
      desktopBreakpoint={1200}
      scaleToViewport="width"
    />
  );
}
