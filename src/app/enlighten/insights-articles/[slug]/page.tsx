import ArticlesDetail from "../../../components/Articles/ArticlesDetail";
import FigmaPageCanvas from "../../../components/shared/FigmaPageCanvas";

export const revalidate = 3600;

const FALLBACK_ARTICLE_SLUGS = [
  "field-tested-energy",
  "execution-on-png-terrain",
  "energy-for-communities",
];

export async function generateStaticParams() {
  try {
    const res = await fetch(
      "https://greencms.percepco.co.uk/api/enlighten/insights-articles",
      {
        next: { revalidate: 3600 },
        signal: AbortSignal.timeout(5000),
      },
    );
    if (!res.ok) return FALLBACK_ARTICLE_SLUGS.map((slug) => ({ slug }));
    const data = await res.json();
    const slugs = Array.isArray(data)
      ? data
          .map((a) => (a?.slug ? String(a.slug).replace(/^\/+|\/+$/g, "") : ""))
          .filter(Boolean)
      : [];
    const combined = Array.from(new Set([...FALLBACK_ARTICLE_SLUGS, ...slugs]));
    return combined.map((slug) => ({ slug }));
  } catch {
    return FALLBACK_ARTICLE_SLUGS.map((slug) => ({ slug }));
  }
}

export default async function ArticleDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return <ArticlesDetail slug={slug} />;
}

