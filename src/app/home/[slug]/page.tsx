import GreenHeroSection from "@/app/components/home/Home";

export const revalidate = 86400;

export function generateStaticParams() {
  return [
    { slug: "renewable-energy-the-core" },
    { slug: "energy-augmentation-for-industry-transformation" },
    { slug: "energy-engineering-from-turnkey-project-deliveries" },
    { slug: "net-zero-an-innate-commitment" },
  ];
}

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  return <GreenHeroSection slug={`/home/${slug}`} />;
}
