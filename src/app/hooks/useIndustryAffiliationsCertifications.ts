import { useEffect, useState } from "react";

export interface IndustryAffiliationsCertificationsResponse {
  id: number;
  mainPage: {
    cta: { href: string; text: string }[];
    quote: { text: string; highlighted: string }[];
    title: string;
    description: { text: string };
    subHeadline: string;
  };
  whyCertificationAffiliationMatter: {
    img: { alt: string; src: string };
    keys: { text: string; highlighted: string }[];
    quote: { text: string; highlighted: string };
    title: string;
    points: string[];
    description: string;
  };
  ourCurrentCertifications: {
    items: { scope: string; issuingBody: string; certification: string }[];
    title: string;
    certifications: {
      logo: { alt: string; src: string };
      name: string;
      year: string;
      description: string;
    }[];
  };
  industryAffiliations: {
    keys: { purpose: string; organization: string }[];
    quote: { text: string; highlighted: string };
    title: string;
    affiliations: {
      logo: { alt: string; src: string };
      name: string;
      role: string;
      description: string;
    }[];
  };
  whatThisMeansClients: {
    img: { alt: string; src: string };
    keys: { title: string; description: string }[];
    title: string;
    benefits: string[];
    description: string;
  };
  createdAt: string;
  updatedAt: string;
}

export const useIndustryAffiliationsCertifications = () => {
  const [data, setData] = useState<IndustryAffiliationsCertificationsResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(
          "https://g-stack.green.com.pg/api/ecosystem/industry-affiliations-certifications",
          { next: { revalidate: 60 } as any }
        );

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const json = (await res.json()) as IndustryAffiliationsCertificationsResponse;
        if (isMounted) setData(json);
      } catch (e: any) {
        if (isMounted) setError(e?.message ?? "Failed to load data");
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, []);

  return { data, loading, error };
};

export default useIndustryAffiliationsCertifications;
