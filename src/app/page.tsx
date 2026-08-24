"use client";

import { useQuery } from "@tanstack/react-query";
import React from "react";
import Header, { type SlideProps } from "@/app/components/Header";
import StructuredData from "@/app/components/StructuredData";
import { queryKeys } from "@/app/hooks/useQuery";
import { api, type Insight } from "@/app/lib/api";
import {
  organizationStructuredData,
  websiteStructuredData,
} from "@/app/lib/structured-data";

const FALLBACK_INSIGHT_SLIDES: SlideProps[] = [
  {
    id: 1,
    slug: "solar-mining",
    headline: "The Carbon Footprint of Mining",
    subheadline: "How Solar Energy Reduces Emissions?",
    highlighted: "Solar Energy",
    description:
      "Therefore, endeavored to provide individuals and communities with sustainable energy solutions. Our mission is to encourage the adoption of renewable energy and contribute to a cleaner, greener future for all..",
    backgroundImage: "/images/insight1/figma/mining-background.png",
    tag: "# Mining Insight 01",
    keys: [
      {
        icon: "/images/insight1/figma/renewable-energy.png",
        description: "Total emissions: 4–7% of global greenhouse emissions",
      },
      {
        icon: "/images/insight1/figma/automation.png",
        description: "Direct operations (Scope 1 & 2): ~1%",
      },
      {
        icon: "/images/insight1/figma/save-the-world.png",
        description:
          "Downstream emissions (Scope 3): ~28% (mainly from coal use)",
      },
    ],
    cta: {
      button1: "Read More..",
      link1: "/insights/solar-mining",
      button2: "Explore",
      link2: "/home/renewable-energy-the-core",
    },
  },
  {
    id: 2,
    slug: "solar-powered-homes",
    headline: "Powering Homes with Solar",
    subheadline: "Clean Energy for Every Community",
    highlighted: "Clean Energy",
    description:
      "Delivering access to clean energy, fostering decent work and innovation, promoting sustainable consumption, and driving climate action.",
    backgroundImage: "/images/insight1/figma/slide-2.png",
    figmaExport: true,
    tag: "# Home Insight 02",
    keys: [
      {
        icon: "/images/insight1/figma/renewable-energy.png",
        description:
          "Solar reduces CO₂ emissions, supporting net-zero targets globally and in PNG.",
      },
      {
        icon: "/images/insight1/figma/automation.png",
        description:
          "Homes powered by solar contribute to the global clean energy transition.",
      },
      {
        icon: "/images/insight1/figma/save-the-world.png",
        description: "Improves quality of life and fosters economic growth.",
      },
    ],
    cta: {
      button1: "Read More..",
      link1: "/insights/solar-powered-homes",
      button2: "Explore",
      link2: "/home/renewable-energy-the-core",
    },
  },
  {
    id: 3,
    slug: "powering-urban-futures",
    headline: "Powering Urban Futures",
    subheadline: "Cities at the Centre of Change",
    highlighted: "Cities",
    description:
      "Delivering access to clean energy, fostering decent work and innovation, promoting sustainable consumption, and driving climate action.",
    backgroundImage: "/images/insight1/figma/slide-3.png",
    figmaExport: true,
    tag: "# Urban Insight 03",
    keys: [
      {
        icon: "/images/insight1/figma/renewable-energy.png",
        description:
          "70% of global energy-related emissions originate in urban areas.",
      },
      {
        icon: "/images/insight1/figma/automation.png",
        description: "75% of global energy demand is concentrated in cities.",
      },
      {
        icon: "/images/insight1/figma/save-the-world.png",
        description: "Cities are at the centre of energy-climate challenges.",
      },
    ],
    cta: {
      button1: "Read More..",
      link1: "/insights/powering-urban-futures",
      button2: "Explore",
      link2: "/home/renewable-energy-the-core",
    },
  },
  {
    id: 4,
    slug: "hotel-net-zero",
    headline:
      "What Does It Take for Hotels to Reach Net-Zero and Sustainability Goals?",
    subheadline: "Net-Zero and Sustainability Goals?",
    highlighted: "Net-Zero",
    description:
      "Delivering access to clean energy, fostering decent work and innovation, promoting sustainable consumption, and driving climate action.",
    backgroundImage: "/images/insight1/figma/slide-4.png",
    figmaExport: true,
    tag: "# Hotel Insight 04",
    keys: [
      {
        icon: "/images/insight1/figma/renewable-energy.png",
        description:
          "Net-Zero aligns with ESG goals, reducing risks and boosting brand value.",
      },
      {
        icon: "/images/insight1/figma/automation.png",
        description: "Hotels consume high energy, driving carbon emissions.",
      },
      {
        icon: "/images/insight1/figma/save-the-world.png",
        description: "Rising demand for ESG compliance.",
      },
      {
        icon: "/images/insight1/figma/mining-3.png",
        description:
          "Empower hotels to lead in sustainability and climate responsibility.",
      },
    ],
    cta: {
      button1: "Read More..",
      link1: "/insights/hotel-net-zero",
      button2: "Explore",
      link2: "/home/renewable-energy-the-core",
    },
  },
];

export default function HomePage() {
  const { data: insightsData } = useQuery({
    queryKey: queryKeys.insights(),
    queryFn: api.getInsights,
    // These previously forced staleTime/gcTime to 0 with refetchOnMount, which
    // meant every single return to the homepage re-fetched the insights feed
    // from the CMS and blocked the carousel on a network round trip -- the
    // cached copy was thrown away the moment the user navigated away.
    // The shared defaults in lib/queryClient.ts (60s stale, 5min gc) are the
    // right behaviour for marketing content that changes a few times a week.
  });

  const cmsInsights =
    insightsData?.success && Array.isArray(insightsData.data)
      ? insightsData.data
      : [];
  const slides =
    cmsInsights.length > 0
      ? cmsInsights.map((item: Insight) => {
          const slug = item.cta1?.link?.includes("/insights/")
            ? item.cta1.link.split("/insights/")[1]
            : item.headline
                .toLowerCase()
                .replace(/[^a-z0-9\s-]/g, "")
                .replace(/\s+/g, "-")
                .replace(/-+/g, "-")
                .trim();

          const getCategoryTag = (id: number, headline: string) => {
            const normalizedHeadline = headline.toLowerCase();
            if (normalizedHeadline.includes("mining"))
              return `# Mining  Insight 0${id}`;
            if (
              normalizedHeadline.includes("home") ||
              normalizedHeadline.includes("solar")
            )
              return `# Home  Insight 0${id}`;
            if (
              normalizedHeadline.includes("cities") ||
              normalizedHeadline.includes("urban") ||
              normalizedHeadline.includes("electricity")
            )
              return `# Urban  Insight 0${id}`;
            if (normalizedHeadline.includes("hotel"))
              return `# Hotel  Insight 0${id}`;
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
              link2: item.cta2.link || "/home/renewable-energy-the-core",
            },
            logo: "/images/heroSection/logo.png",
          };
        })
      : FALLBACK_INSIGHT_SLIDES;

  return (
    <React.Fragment>
      <StructuredData data={organizationStructuredData} />
      <StructuredData data={websiteStructuredData} />
      <Header slides={slides} />
    </React.Fragment>
  );
}
