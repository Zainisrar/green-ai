"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import Header from "@/app/components/Header";
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

    return {
      slug,
      title: (
        <div>
          <div className=" text-left uppercase  font-bold text-3xl md:text-4xl lg:text-5xl 2xl:text-7xl my-4 md:my-8 lg:my-10">
            {item.headline}
          </div>
          <div className=" text-xl md:text-3xl  lg:text-3xl 2xl:text-5xl font-semibold italic">
            {(() => {
              if (
                item.subheadline.trim().toLowerCase() ===
                item.highlighted.trim().toLowerCase()
              ) {
                return (
                  <span className="text-green-600 uppercase">
                    {item.subheadline}
                  </span>
                );
              }
              const parts = item.subheadline.split(
                new RegExp(`(${item.highlighted})`, "gi")
              );
              return parts.map((part, idx) =>
                part.toLowerCase() === item.highlighted.toLowerCase() ? (
                  <span key={idx} className="text-green-600 uppercase">
                    {part}
                  </span>
                ) : (
                  <React.Fragment key={idx}>{part}</React.Fragment>
                )
              );
            })()}
          </div>
        </div>
      ),
      description: item.description,
      backgroundImage: item.bgImg,
      keys: item.keys.map((key) => ({
        icon: (
          <React.Fragment>
            <img
              className="w-16 aspect-square md:w-22 lg:w-24  2xl:w-auto"
              src={key.icon}
              alt={key.text}
            />
          </React.Fragment>
        ),
        description: key.text,
      })),
      button1: item.cta1.text,
      link1: item.cta1.link,
      button2: item.cta2.text,
      link2: item.cta2.link,
      logo: "/images/heroSection/logo.png",
      carouselLeft: (
        <div>
          <img src="/images/heroSection/carouselLeft.svg" alt="arrowleft" />
        </div>
      ),
      carouselRight: (
        <div>
          <img src="/images/heroSection/carouselRight.svg" alt="arrowright" />
        </div>
      ),
      cta: {
        button1: <React.Fragment>{item.cta1.text}</React.Fragment>,
        link1: item.cta1.link,
        button2: <React.Fragment>{item.cta2.text}</React.Fragment>,
        link2: item.cta2.link,
      },
    };
  });

  return (
    <React.Fragment>
      <StructuredData data={organizationStructuredData} />
      <StructuredData data={websiteStructuredData} />
      <Header slides={slides || []} />
    </React.Fragment>
  );
};

export default page;
