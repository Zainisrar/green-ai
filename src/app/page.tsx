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
    title: (
      <>
        <div className="text-[clamp(30px,3.96vw,76px)] font-bold leading-[1.05] tracking-tight text-white uppercase">
          Powering Homes with Solar :
        </div>
        <div className="mt-[0.75dvh] text-[clamp(25px,3.125vw,60px)] font-medium leading-[1] italic uppercase text-white">
          Achieving{" "}
          <span className="font-extrabold text-[#23B14D]">
            ESG &amp; Net-Zero
          </span>{" "}
          Targets
        </div>
      </>
    ),
    description:
      "Delivering access to clean energy, fostering decent work and innovation, promoting sustainable consumption, and driving climate action.",
    backgroundImage: "/images/insight1/figma/slider/slide-2-background.png",
    contentTop: "12.89dvh",
    descriptionMarginTop: "10.5dvh",
    keysTop: "37.73dvh",
    tag: "# Home Insight 02",
    keys: [
      {
        icon: "/images/insight1/figma/slider/slide-2-icon-1.png",
        description:
          "Solar reduces CO₂ emissions, supporting net-zero targets globally and in PNG.",
      },
      {
        icon: "/images/insight1/figma/slider/slide-2-icon-2.png",
        description:
          "Homes powered by solar contribute to the global clean energy transition.",
      },
      {
        icon: "/images/insight1/figma/slider/slide-2-icon-3.png",
        description: "Improves quality of life and fosters economic growth.",
      },
      {
        icon: "/images/insight1/figma/slider/slide-2-icon-4.png",
        description:
          "Driving Growth - Promotes energy equity and drives development across communities",
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
    title: (
      <>
        <div className="text-[clamp(30px,3.96vw,76px)] font-bold leading-[1.05] tracking-tight text-white uppercase">
          Why Does Reliable Electricity Remain
        </div>
        <div className="mt-[0.75dvh] text-[clamp(25px,3.33vw,64px)] font-semibold leading-[1] italic uppercase text-[#23B14D]">
          Out of Reach in Fast-Growing Cities?
        </div>
      </>
    ),
    description:
      "Delivering access to clean energy, fostering decent work and innovation, promoting sustainable consumption, and driving climate action.",
    backgroundImage: "/images/insight1/figma/slider/slide-3-background.png",
    contentTop: "14.64dvh",
    descriptionMarginTop: "8.7dvh",
    keysTop: "36dvh",
    tag: "# Urban Insight 03",
    keys: [
      {
        icon: "/images/insight1/figma/slider/slide-3-icon-1.png",
        description:
          "70% of global energy-related emissions originate in urban areas.",
      },
      {
        icon: "/images/insight1/figma/slider/slide-3-icon-2.png",
        description: "75% of global energy demand is concentrated in cities.",
      },
      {
        icon: "/images/insight1/figma/slider/slide-3-icon-3.png",
        description:
          "55% of city dwellers face frequent blackouts or lack reliable access.",
      },
      {
        icon: "/images/insight1/figma/slider/slide-3-icon-4.png",
        description:
          "Cities are at the center of the energy-climate challenges.",
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
    title: (
      <>
        <div className="text-[clamp(30px,3.96vw,76px)] font-bold leading-[1.05] tracking-tight text-white uppercase">
          What Does It Take for Hotels to Reach
        </div>
        <div className="mt-[0.75dvh] text-[clamp(25px,3.33vw,64px)] font-semibold leading-[1] italic uppercase text-[#23B14D]">
          Net-Zero and Sustainability Goals?
        </div>
      </>
    ),
    description:
      "Delivering access to clean energy, fostering decent work and innovation, promoting sustainable consumption, and driving climate action.",
    backgroundImage: "/images/insight1/figma/slider/slide-4-background.png",
    contentTop: "15.98dvh",
    descriptionMarginTop: "4.5dvh",
    keysTop: "34.64dvh",
    tag: "# Hotel Insight 04",
    keys: [
      {
        icon: "/images/insight1/figma/slider/slide-4-icon-1.png",
        description:
          "Net-Zero aligns with Environmental, Social and Governance (ESG) goals, reducing risks and boosting brand value.",
      },
      {
        icon: "/images/insight1/figma/slider/slide-4-icon-2.png",
        description: "Hotels consume high energy, driving carbon emissions.",
      },
      {
        icon: "/images/insight1/figma/slider/slide-4-icon-3.png",
        description: "Rising demand for ESG compliance.",
      },
      {
        icon: "/images/insight1/figma/slider/slide-4-icon-4.png",
        description:
          "Empower Hotels as leadership in sustainability and climate responsibility.",
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

const FIGMA_SLIDES_BY_SLUG = new Map(
  FALLBACK_INSIGHT_SLIDES.map((slide) => [slide.slug, slide]),
);

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

          // The CMS previously supplied exported Figma canvases as the image
          // source for these four stories. Keep CMS links/data fresh, but use
          // the clean Figma photo fills and responsive content layers instead.
          const figmaSlide = FIGMA_SLIDES_BY_SLUG.get(slug);
          if (figmaSlide) {
            return {
              ...figmaSlide,
              id: item.id,
              cta: {
                button1: item.cta1.text || figmaSlide.cta.button1,
                link1: item.cta1.link || figmaSlide.cta.link1,
                button2: item.cta2.text || figmaSlide.cta.button2,
                link2: item.cta2.link || figmaSlide.cta.link2,
              },
            };
          }

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
