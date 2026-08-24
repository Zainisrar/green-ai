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

/**
 * `InsightData` declares every field as required and non-null, but it describes
 * an untrusted CMS payload -- nothing validates the response against it. Treating
 * a fetched record as `Partial` makes the null checks below type-checked rather
 * than dead code, so TypeScript flags it if a new unguarded field is added.
 */
type RawInsight = Partial<InsightData>;

// The first slide is part of the shipped landing experience, so its Read More
// destination must remain available even when the CMS is temporarily offline.
// Keeping this record here also makes the carousel's local fallback and its
// detail route a matched pair.
const SOLAR_MINING_INSIGHT: RawInsight = {
  slug: "solar-mining",
  title: "The Carbon Footprint of Mining",
  subheadline: "How Solar Energy Reduces Emissions?",
  description:
    "Therefore, endeavored to provide individuals and communities with sustainable energy solutions. Our mission is to encourage the adoption of renewable energy and contribute to a cleaner, greener future for all..",
  name1: "Solar",
  name2: "Mining",
  cardTitle: "Sun-Powered Mining: Powering the Future, Sustainably.",
  bgImg: "/images/insight1/figma/mining-background.png",
  backgroundImg: "/images/insight1/figma/mining-background.png",
  imageDirection: "left",
  navigation: { items: [] },
  keypoints: [
    {
      icon: "/images/insight1/figma/renewable-energy.png",
      text: "Total emissions: 4–7% of global greenhouse emissions",
    },
    {
      icon: "/images/insight1/figma/automation.png",
      text: "Direct operations (Scope 1 & 2): ~1%",
    },
    {
      icon: "/images/insight1/figma/mining-3.png",
      text: "Fugitive methane emissions from coal mining 3–6%",
    },
    {
      icon: "/images/insight1/figma/save-the-world.png",
      text: "Downstream emissions (Scope 3): ~28% (mainly from coal use)",
    },
  ],
};

const fallbackInsight = (slug: string): RawInsight | null =>
  slug === SOLAR_MINING_INSIGHT.slug ? SOLAR_MINING_INSIGHT : null;

async function getInsight(slug: string): Promise<RawInsight | null> {
  try {
    const response = await fetch(
      "https://g-stack.green.com.pg/api/insight-details",
      { next: { revalidate: 300 }, signal: AbortSignal.timeout(8000) },
    );
    if (!response.ok) return fallbackInsight(slug);

    const payload = (await response.json()) as Partial<InsightResponse>;
    const records: RawInsight[] = Array.isArray(payload?.data)
      ? payload.data
      : [];

    return (
      records.find((item) => {
        // Coerce before calling string methods: a single record with a null
        // slug would otherwise throw here, and the catch below would turn that
        // into a 404 for *every* insight URL with no log line to explain it.
        const itemSlug = String(item?.slug ?? "").replace(/^\/+|\/+$/g, "");
        if (!itemSlug) return false;
        return itemSlug === slug || itemSlug.endsWith(`/${slug}`);
      }) ?? fallbackInsight(slug)
    );
  } catch (error) {
    console.error(`[insights] Failed to resolve insight "${slug}":`, error);
    return fallbackInsight(slug);
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const insight = await getInsight(slug);
  if (!insight) return { title: "Insight not found" };

  const name = insight.title?.trim();
  if (!name) return { title: "GREEN Limited Insights" };

  const title = `${name} | GREEN Limited Insights`;
  const description =
    insight.description ||
    `Discover insights about ${name} from GREEN Limited.`;
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

  // Normalise every CMS field consumed below. The downstream Insight1/Insight24
  // components call .slice/.trim/.toLowerCase on these directly, so a record
  // with a missing or null field renders a 500 instead of a page.
  const keypoints = Array.isArray(insightData.keypoints)
    ? insightData.keypoints
    : [];
  const keypoints1 = keypoints.slice(0, 2);
  const keypoints2 = keypoints.slice(2);
  const title = insightData.title ?? "";
  const subheadline = insightData.subheadline ?? "";
  const description = insightData.description ?? "";
  const name1 = insightData.name1 ?? "";
  const name2 = insightData.name2 ?? "";
  const cardTitle = insightData.cardTitle ?? "";
  const bgImg = insightData.bgImg ?? "";
  const navigation = insightData.navigation ?? { items: [] };

  const url = `${SITE_URL}/insights/${encodeURIComponent(slug)}`;
  const structuredData = articleStructuredData({
    title,
    description,
    url,
    datePublished: insightData.createdAt,
    dateModified: insightData.updatedAt,
    image: bgImg,
  });

  const toPoint = (point: { icon: string; text: string }) => ({
    icon: point.icon,
    text: point.text,
  });

  return (
    <div>
      <StructuredData data={structuredData} />
      {insightData.imageDirection === "left" ? (
        <Insight1
          bgImg={bgImg}
          backgroundImg={bgImg}
          navigation={navigation}
          title={title}
          subheadline={subheadline}
          description={description}
          name1={name1}
          name2={name2}
          cardTitle={cardTitle}
          keypoints={keypoints.map(toPoint)}
        />
      ) : (
        <Insight24
          backroundImg={bgImg}
          navigation={navigation}
          title={title}
          subheadline={subheadline}
          description={description}
          name1={name1}
          name2={name2}
          cardTitle={cardTitle}
          keypoints1={keypoints1.map(toPoint)}
          keypoints2={keypoints2.map(toPoint)}
        />
      )}
    </div>
  );
}
