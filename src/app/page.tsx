"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import Header from "@/app/components/Header";
import SiteHeader from "@/app/components/SiteHeader/SiteHeader";
import { api } from "@/app/lib/api";
import { queryKeys } from "@/app/hooks/useQuery";
import type { Insight } from "@/app/lib/api";
import StructuredData from "@/app/components/StructuredData";
import { organizationStructuredData, websiteStructuredData } from "@/app/lib/structured-data";

const page = () => {
  const { data: insightsData } = useQuery({
    queryKey: queryKeys.insights(),
    queryFn: api.getInsights,
    staleTime: 0,
    gcTime: 0,
    refetchOnWindowFocus: true,
    refetchOnMount: true,
  });

  const slides = insightsData?.data?.map((item: Insight) => {
    const slug = item.cta1?.link?.includes("/insights/")
      ? item.cta1.link.split("/insights/")[1]
      : item.headline
          .toLowerCase()
          .replace(/[^a-z0-9\s-]/g, "")
          .replace(/\s+/g, "-")
          .replace(/-+/g, "-")
          .trim();

    const getCategoryTag = (id: number, headline: string) => {
      const h = headline.toLowerCase();
      if (h.includes("mining")) return `# Mining  Insight 0${id}`;
      if (h.includes("home") || h.includes("solar")) return `# Home  Insight 0${id}`;
      if (h.includes("cities") || h.includes("urban") || h.includes("electricity")) return `# Urban  Insight 0${id}`;
      if (h.includes("hotel")) return `# Hotel  Insight 0${id}`;
      return `# Insight 0${id}`;
    };

    return {
      id: item.id,
      slug,
      headline: item.headline,
      subheadline: item.subheadline,
      highlighted: item.highlighted,
      tag: getCategoryTag(item.id, item.headline),
      description: item.description,
      backgroundImage: item.bgImg,
      keys: item.keys.map((key) => ({
        icon: key.icon,
        description: key.text,
      })),
      cta: {
        button1: item.cta1.text,
        link1: item.cta1.link,
        button2: item.cta2.text,
        link2: item.cta2.link,
      },
      logo: "/images/heroSection/logo.png",
    };
  });

  return (
    <React.Fragment>
      <StructuredData data={organizationStructuredData} />
      <StructuredData data={websiteStructuredData} />
      <SiteHeader />
      <Header slides={slides || []} />
    </React.Fragment>
  );
};

export default page;
