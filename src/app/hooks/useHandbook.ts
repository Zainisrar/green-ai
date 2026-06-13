import { useEffect, useState } from "react";

export interface HandbookResponse {
  id: number;
  mainPage: {
    cta: { href: string; text: string }[];
    quote: { text: string; highlighted: string }[];
    title: string;
    description: string;
    subHeadline: string;
  };
  ourProcurementEthos: {
    img: { alt: string; src: string };
    keys: string[];
    title: string;
    description: string;
  };
  codeOfConduct: {
    item: { category: string; requiredStandard: string }[];
    title: string;
  };
  createdAt: string;
  updatedAt: string;
}

export const useHandbook = () => {
  const [data, setData] = useState<HandbookResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch("https://g-stack.green.com.pg/api/ecosystem/handbook", { next: { revalidate: 60 } as any });
        if (!res.ok) throw new Error(`HTTP error ${res.status}`);
        const json: HandbookResponse = await res.json();
        if (mounted) setData(json);
      } catch (e: any) {
        if (mounted) setError(e?.message || "Failed to load handbook data");
      } finally {
        if (mounted) setLoading(false);
      }
    };
    fetchData();
    return () => { mounted = false; };
  }, []);

  return { data, loading, error };
};

export default useHandbook;
