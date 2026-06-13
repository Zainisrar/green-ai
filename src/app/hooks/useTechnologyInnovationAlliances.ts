import { useEffect, useState } from "react";

export interface TIAImage { alt: string; src: string }
export interface TIAKey { text: string; highlighted: string }
export interface TIAQuote { text: string; highlighted: string }
export interface TIAModal {
  img: TIAImage;
  keys: TIAKey[];
  quote: TIAQuote;
  title: string;
  description: string;
  subHeadline: string;
}
export interface TIAItem {
  id: number;
  mainPage: {
    cta: { href: string; text: string }[];
    quote: TIAQuote[];
    title: string;
    description: { text: string; highlighted: string };
    subHeadline: string;
  };
  modals: TIAModal[];
  createdAt: string;
  updatedAt: string;
}
export interface TIAResponse { success: boolean; data: TIAItem[] }

export const useTechnologyInnovationAlliances = () => {
  const [data, setData] = useState<TIAItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    const run = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch("https://g-stack.green.com.pg/api/ecosystem/technology-innovation-alliances", { next: { revalidate: 60 } as any });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json: TIAResponse = await res.json();
        const first = json?.data?.[0] ?? null;
        if (mounted) setData(first);
      } catch (e: any) {
        if (mounted) setError(e?.message || "Failed to load alliances data");
      } finally {
        if (mounted) setLoading(false);
      }
    };
    run();
    return () => { mounted = false };
  }, []);

  return { data, loading, error };
};

export default useTechnologyInnovationAlliances;
