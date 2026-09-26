import ExpertiseDetail from "../../components/Expertise/ExpertiseDetail";

export const revalidate = 3600;

const FALLBACK_EXPERTISE_SLUGS = [
  "powering-education",
  "powering-healthcare",
];

export async function generateStaticParams() {
  try {
    const res = await fetch("https://greencms.percepco.co.uk/api/expertise", {
      next: { revalidate: 3600 },
      signal: AbortSignal.timeout(5000),
    });
    if (!res.ok) return FALLBACK_EXPERTISE_SLUGS.map((slug) => ({ slug }));
    const payload = await res.json();
    const items = Array.isArray(payload?.data) ? payload.data : [];
    const slugs = items
      .map((item: { slug?: string }) =>
        item?.slug
          ? String(item.slug).replace(/^\/+|\/+$/g, "").replace(/^expertise\//, "")
          : "",
      )
      .filter(Boolean);
    const combined = Array.from(
      new Set([...FALLBACK_EXPERTISE_SLUGS, ...slugs]),
    );
    return combined.map((slug) => ({ slug }));
  } catch {
    return FALLBACK_EXPERTISE_SLUGS.map((slug) => ({ slug }));
  }
}

export default async function ExpertiseDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <ExpertiseDetail slug={slug} />;
}
