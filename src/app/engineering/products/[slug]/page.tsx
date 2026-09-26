import Product from "@/app/components/Product/Product";
import React from "react";

export const revalidate = 3600;

const FALLBACK_PRODUCT_SLUGS = [
  "lighting-up-and-lifting-up-living-standards",
  "green-empawa",
  "green-sunsmart",
  "green-sunshine",
];

export async function generateStaticParams() {
  try {
    const res = await fetch(
      "https://greencms.percepco.co.uk/api/engineering/products",
      {
        next: { revalidate: 3600 },
        signal: AbortSignal.timeout(5000),
      },
    );
    if (!res.ok) return FALLBACK_PRODUCT_SLUGS.map((slug) => ({ slug }));
    const data = await res.json();
    const slugs = Array.isArray(data)
      ? data
          .map((p) => (p?.slug ? String(p.slug).replace(/^\/+|\/+$/g, "") : ""))
          .filter(Boolean)
      : [];
    const combined = Array.from(new Set([...FALLBACK_PRODUCT_SLUGS, ...slugs]));
    return combined.map((slug) => ({ slug }));
  } catch {
    return FALLBACK_PRODUCT_SLUGS.map((slug) => ({ slug }));
  }
}

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

const page = async ({ params }: PageProps) => {
  const { slug } = await params;

  return (
    <React.Fragment>
      <Product slug={slug} />
    </React.Fragment>
  );
};

export default page;

