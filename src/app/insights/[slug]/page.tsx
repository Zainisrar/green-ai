import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Insight1 from "@/app/components/Insight1";
import Insight24 from "@/app/components/Insight24";
import StructuredData from "@/app/components/StructuredData";
import { SITE_URL } from "@/app/lib/seo-config";
import { articleStructuredData } from "@/app/lib/structured-data";
import type { InsightData } from "@/hooks/useInsightDetails";

interface Props {
  params: Promise<{ slug: string }>;
}

interface InsightResponse {
  success: boolean;
  data: InsightData[];
}

async function getInsight(slug: string): Promise<InsightData | null> {
  try {
    const response = await fetch(
      "https://g-stack.green.com.pg/api/insight-details",
      { next: { revalidate: 300 }, signal: AbortSignal.timeout(8000) },
    );
    if (!response.ok) return null;

    const payload = (await response.json()) as InsightResponse;
    return (
      payload.data?.find((item) => {
        const itemSlug = item.slug.replace(/^\/+|\/+$/g, "");
        return itemSlug === slug || itemSlug.endsWith(`/${slug}`);
      }) ?? null
    );
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const insight = await getInsight(slug);
  if (!insight) return { title: "Insight not found" };

  const title = `${insight.title} | GREEN Limited Insights`;
  const description =
    insight.description ||
    `Discover insights about ${insight.title} from GREEN Limited.`;
  const url = `${SITE_URL}/insights/${encodeURIComponent(slug)}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      title,
      description,
      url,
      images: insight.bgImg ? [{ url: insight.bgImg }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: insight.bgImg ? [insight.bgImg] : undefined,
    },
  };
}

export default async function InsightPage({ params }: Props) {
  const { slug } = await params;
  const insightData = await getInsight(slug);
  if (!insightData) notFound();

  const keypoints1 = insightData.keypoints.slice(0, 2);
  const keypoints2 = insightData.keypoints.slice(2);
  const url = `${SITE_URL}/insights/${encodeURIComponent(slug)}`;
  const structuredData = articleStructuredData({
    title: insightData.title,
    description: insightData.description,
    url,
    datePublished: insightData.createdAt,
    dateModified: insightData.updatedAt,
    image: insightData.bgImg,
  });

  return (
    <div>
      <StructuredData data={structuredData} />
      {insightData.imageDirection === "left" ? (
        <Insight1
          bgImg={insightData.bgImg}
          backgroundImg={insightData.bgImg}
          navigation={insightData.navigation}
          title={insightData.title}
          subheadline={insightData.subheadline}
          description={insightData.description}
          name1={insightData.name1}
          name2={insightData.name2}
          cardTitle={insightData.cardTitle}
          keypoints={insightData.keypoints.map((point) => ({
            icon: point.icon,
            text: point.text,
          }))}
        />
      ) : (
        <Insight24
          backroundImg={insightData.bgImg}
          navigation={insightData.navigation}
          title={insightData.title}
          subheadline={insightData.subheadline}
          description={insightData.description}
          name1={insightData.name1}
          name2={insightData.name2}
          cardTitle={insightData.cardTitle}
          keypoints1={keypoints1.map((point) => ({
            icon: point.icon,
            text: point.text,
          }))}
          keypoints2={keypoints2.map((point) => ({
            icon: point.icon,
            text: point.text,
          }))}
        />
      )}
    </div>
  );
}
