import type { Metadata } from "next";
import SupplyPartners from "@/app/components/SupplyParnters/SupplyPartners";
import FigmaPageCanvas from "@/app/components/shared/FigmaPageCanvas";
import type { SupplyPartnersData } from "@/hooks/useSupplyPartners";

export const metadata: Metadata = {
  title: "Supply Partners",
  description:
    "GREEN sources only from proven, Tier-1 suppliers — because our systems depend on performance, durability, and trust. We build partnerships that power nations.",
  openGraph: {
    title: "Supply Partners | GREEN Limited",
    description:
      "GREEN sources only from proven, Tier-1 suppliers — because our systems depend on performance, durability, and trust.",
    images: ["/images/supply-partners/mainImg.png"],
  },
};

// Revalidate data via ISR every 1 hour
export const revalidate = 3600;

async function getSupplyPartnersData(): Promise<SupplyPartnersData | null> {
  try {
    const res = await fetch(
      "https://greencms.percepco.co.uk/api/ecosystem/supply-partners",
      {
        next: { revalidate: 3600 },
      }
    );

    if (!res.ok) {
      return null;
    }

    return await res.json();
  } catch (error) {
    console.error("Failed to prefetch supply partners data for SSR/ISR:", error);
    return null;
  }
}

export default async function SupplyPartnersPage() {
  const initialData = await getSupplyPartnersData();

  return (
    <FigmaPageCanvas
      desktop={<SupplyPartners canvas initialData={initialData} />}
      mobile={<SupplyPartners initialData={initialData} />}
      nodeId="7077:15173"
      fitCanvasHeight
    />
  );
}

