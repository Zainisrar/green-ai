"use client";
import React, { useState } from "react";
import TopNavigation from "../TopNavigation/TopNavigation";
import Chatbot from "../Chatbot";
import { useGlobalSnapshot } from "../../../hooks/useGlobalSnapshot";
import type {
  GlobalSnapshotHeroSection,
  GlobalSnapshotStatsSection,
  GlobalSnapshotHighlightSection,
  GlobalSnapshotContentBlock,
  GlobalSnapshotLocationsSection,
  GlobalSnapshotActionButtons,
} from "../../lib/api";
import Link from "next/link";
import { handleImageError } from "../lib/utils";

const GlobalSnapshot = () => {
  const { globalSnapshotData,  error } = useGlobalSnapshot();

  // Fallback data - keeping the original structure for compatibility
  const [fallbackPoints] = useState([
    {
      id: 1,
      icon: {
        img: {
          src: "/images/global-snapshot/mw.png",
          alt: "megawatt",
        },
      },
      text: {
        heading: "3,912 MW+",
        highlighted: "Installed",
      },
    },
    {
      id: 2,
      icon: {
        img: {
          src: "/images/global-snapshot/mw.png",
          alt: "megawatt",
        },
      },
      text: {
        heading: "200,014 Homes",
        highlighted: "Energy Self-Sufficient",
      },
    },
    {
      id: 3,
      icon: {
        img: {
          src: "/images/global-snapshot/mw.png",
          alt: "megawatt",
        },
      },
      text: {
        heading: "796,270 Tons",
        highlighted: "CO2 Transformed",
      },
    },
    {
      id: 4,
      icon: {
        img: {
          src: "/images/global-snapshot/mw.png",
          alt: "megawatt",
        },
      },
      text: {
        heading: "6,126 Tons CO2",
        highlighted: "Avoided Annually",
      },
    },
  ]);

  // Extract sections from API data
  const heroSection = globalSnapshotData?.sections.find(
    (s) => s.type === "hero-section"
  ) as GlobalSnapshotHeroSection;
  const statsSection = globalSnapshotData?.sections.find(
    (s) => s.type === "statistics-grid"
  ) as GlobalSnapshotStatsSection;
  const highlightSection = globalSnapshotData?.sections.find(
    (s) => s.type === "highlight-box"
  ) as GlobalSnapshotHighlightSection;
  const frameworkSection = globalSnapshotData?.sections.find(
    (s) => s.type === "content-block"
  ) as GlobalSnapshotContentBlock;
  const locationsSection = globalSnapshotData?.sections.find(
    (s) => s.type === "locations-section"
  ) as GlobalSnapshotLocationsSection;
  const ctaSection = globalSnapshotData?.sections.find(
    (s) => s.type === "action-buttons"
  ) as GlobalSnapshotActionButtons;

  // Transform API data to match existing component structure
  const points =
    statsSection?.items.map((item, index) => ({
      id: index + 1,
      icon: {
        img: {
          src: item.icon.src,
          alt: item.icon.alt || item.label || "Statistic icon",
        },
      },
      text: {
        heading: item.value,
        highlighted: item.label,
      },
    })) || fallbackPoints;

  // Use API data or fallback to hardcoded values
  const title = heroSection?.title || {
    main: "GLOBAL SNAPSHOT",
    highlight: "GLOBAL",
  };
  const subtitle =
    heroSection?.subtitle ||
    "From the Highlands to the Horizon - Energy Built to Perform";
  const headline =
    heroSection?.headline ||
    "The Global Energy Shift Is Inevitable. The Execution Is Not.";
  const description = heroSection?.description || [
    "Global energy demand is rising. Fossil reliance persists. Climate pressure intensifies.",
    "And over 760 million people remain without access to reliable power.",
  ];

  const highlightLines = highlightSection?.content.lines || [
    "Where roads end, we delivered.",
    "Where diesel failed, we deployed solar.",
    "Where governments stalled, We executed.",
  ];

  const frameworkFeatures = frameworkSection?.features || [];
  const ctaButtons = ctaSection?.buttons || [];
  const locations = locationsSection?.locations || [
    "Papua New Guinea",
    "India / Australia",
    "Singapore / USA",
  ];
  const locationDescription =
    locationsSection?.description ||
    "The future of energy is not only about capacity. It is about capability. GREEN Limited brings the credibility of experience, the rigor of engineering, and the discipline of execution to the global energy table. Our teams, systems, and strategies are ready to support governments, industries, and developers facing the energy transition.";



  if (error) {
    console.error("GlobalSnapshot API Error:", error);
    // Continue with fallback data
  }

  return (
    <React.Fragment>
      <div className="relative z-[99999999999999999999]  ">
      <TopNavigation />
        {/* Background Image */}
        <div className="absolute top-0 left-1/3 -z-10 hidden lg:block pointer-events-none">
          <img
            src="/images/global-snapshot/mainImg.png"
            className="h-[70vh]"
            alt="globalsnapshot"
          />
        </div>

        {/* Mobile Layout */}
        <div className="lg:hidden  px-4 py-6 relative z-50">
          {/* Mobile Title */}
          <div className="text-center mb-6">
            <div className="text-3xl font-black text-[#23B14D]">
              {title.highlight}
            </div>
            <div className="text-2xl font-black text-gray-800">
              {title.main.replace(title.highlight, "").trim()}
            </div>
          </div>

          <p className="text-[#23B14D]  text-center mb-2">{subtitle}</p>

          <h2 className="text-xl font-bold text-center mb-4">{headline}</h2>

          <p className="text-gray-600  text-center mb-6">
            {description.join(" ")}
          </p>

          {/* Stats Points */}
          <div className="space-y-4 mb-6">
            {points.map((item) => (
              <div
                key={item.id}
                className="flex items-center space-x-3 bg-white/80 p-3 rounded-lg"
              >
                <img
                  className="w-14"
                  src={item.icon.img.src}
                  alt={item.icon.img.alt || item.text.heading || "Statistic"}
                  onError={(e) => handleImageError(e, "/images/global-snapshot/mw.png")}
                />
                <div className="text-lg">
                  <p className="font-bold text-gray-800">{item.text.heading}</p>
                  <p className="text-[#23B14D] font-semibold">
                    {item.text.highlighted}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Explore Button */}
          <div className="flex justify-center mb-6">
            <Link href={ctaButtons[0]?.link || "#"} className="relative inline-block">
              <img
                src="/images/global-snapshot/exploreBtn.png"
                alt="explore"
                className="w-40"
              />
              <div className="absolute inset-0 flex items-center justify-center px-3 font-bold text-sm whitespace-nowrap">
                {(ctaButtons[0]?.text || "Explore More") + " >"}
              </div>
            </Link>
          </div>

          {/* Where Roads End Section */}
          <div className="mb-6 text-center">
            <div className="font-bold space-y-1">
              {highlightLines.map((line, index) => (
                <p key={index}>{line}</p>
              ))}
            </div>
          </div>

          {/* Global Delivery Sites */}
          <div className="mb-6 text-center">
            <div className="text-[#23B14D] text-xl font-black italic mb-2">
              {locationsSection?.title || "Global Delivery Sites"}
            </div>
            <div className="text-lg font-bold text-gray-800 space-y-1">
              {locations.map((location, index) => (
                <div key={index}>{location}</div>
              ))}
            </div>
          </div>

          {/* GREEN Delivery Framework */}
          <div className="mb-6">
            <div className="font-semibold italic text-gray-800 mb-3 text-center">
              {frameworkSection?.title ? (
                <>
                  The{" "}
                  <span className="text-[#23B14D]">
                    {frameworkSection.title.highlight}
                  </span>{" "}
                  {frameworkSection.title.text || "Delivery Framework"}
                </>
              ) : (
                <>
                  The <span className="text-[#23B14D]">GREEN</span> Delivery
                  Framework
                </>
              )}
            </div>
            <div className="space-y-3 mt-8">
              {frameworkFeatures.length > 0 ? (
                frameworkFeatures.map((feature, index) => (
                  <div key={index} className="flex space-x-3 items-start">
                    <img
                      src={feature.icon.src}
                      alt={feature.icon.alt || feature.text || "Feature icon"}
                      className="w-10 mt-1 flex-shrink-0"
                      onError={(e) => handleImageError(e, "/images/global-snapshot/lighting.png")}
                    />
                    <div className="text-base">{feature.text}</div>
                  </div>
                ))
              ) : (
                // Fallback to original content
                <>
                  <div className="flex space-x-3 items-start">
                    <img
                      src="/images/global-snapshot/lighting.png"
                      alt="spark"
                      className="w-4 h-4 mt-1 flex-shrink-0"
                    />
                    <div className="text-xs">
                      End-to-end EPC execution—from feasibility to
                      commissioning.
                    </div>
                  </div>
                  <div className="flex space-x-3 items-start">
                    <img
                      src="/images/global-snapshot/lighting.png"
                      alt="spark"
                      className="w-4 h-4 mt-1 flex-shrink-0"
                    />
                    <div className="text-xs">
                      Adaptive product platforms (SunShine, Em'Pawa) engineered
                      for deployment in weeks.
                    </div>
                  </div>
                  <div className="flex space-x-3 items-start">
                    <img
                      src="/images/global-snapshot/lighting.png"
                      alt="spark"
                      className="w-4 h-4 mt-1 flex-shrink-0"
                    />
                    <div className="text-xs">
                      Global procurement integrated with local deployment
                      networks.
                    </div>
                  </div>
                  <div className="flex space-x-3 items-start">
                    <img
                      src="/images/global-snapshot/lighting.png"
                      alt="spark"
                      className="w-4 h-4 mt-1 flex-shrink-0"
                    />
                    <div className="text-xs">
                      Project design rooted in data, geography, and long-term
                      asset performance.
                    </div>
                  </div>
                  <div className="flex space-x-3 items-start">
                    <img
                      src="/images/global-snapshot/lighting.png"
                      alt="spark"
                      className="w-4 h-4 mt-1 flex-shrink-0"
                    />
                    <div className="text-xs">
                      Cultural and social engagement integrated into technical
                      delivery.
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Bottom Text */}
          <div className="mb-6 text-center">
            <div className="text-base leading-relaxed">
              {locationDescription}
            </div>
          </div>

          {/* Bottom Buttons */}
          <div className="mb-20 flex flex-col items-center space-y-8">
            <Link
              href={ctaButtons[1]?.link || "#"}
              className="relative inline-block w-full max-w-[300px]"
            >
              <img
                src="/images/global-snapshot/consulation.png"
                alt="consultation"
                className="w-full"
              />
              <div className="absolute inset-0 flex items-center justify-center px-4 font-bold text-sm sm:text-base whitespace-nowrap">
                {ctaButtons[1]?.text || "Request a Consultation"} {">"}
              </div>
            </Link>
            <Link
              href={ctaButtons[2]?.link || "#"}
              className="relative inline-block w-full max-w-[340px]"
            >
              <img
                src="/images/global-snapshot/globalprojectportfolioBtn.png"
                alt="project portfolio"
                className="w-full"
              />
              <div className="absolute inset-0 flex items-center justify-center px-4 font-bold text-sm sm:text-base whitespace-nowrap">
                {ctaButtons[2]?.text || "View Global Project Portfolio"} {">"}
              </div>
            </Link>
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden lg:flex h-full">
          {/* Left Sidebar - Desktop only */}
          <div className="lg:w-1/6 hidden lg:flex items-center justify-center">
            <div className="fixed top-1/4 -z-10 left-10">
              <img
                className="w-10"
                src="/images/global-snapshot/globalsnapshot.png"
                alt="globalsnapshot"
              />
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex flex-col flex-1 min-w-0 px-10 2xl:px-16 pb-24">
            {/* Header Section */}
            <div className="mb-8">
              <h1 className="text-3xl 2xl:text-4xl">
                <span className="text-[#23B14D] font-black">
                  {title.highlight}
                </span>{" "}
                <span className="text-gray-800 font-black">
                  {title.main.replace(title.highlight, "").trim()}
                </span>
              </h1>

              <p className="text-[#23B14D] mt-1">{subtitle}</p>
              <h2 className="my-2 text-2xl 2xl:text-3xl font-bold">{headline}</h2>
              <p className="text-gray-600 text-sm max-w-3xl">
                {description.join(" ")}
              </p>
            </div>

            <div className="relative z-50">
              <div className="w-full space-y-6">
                <div className="grid grid-cols-[1fr_2fr] gap-6">
                  <div className="space-y-4 my-4 min-w-0">
                    {points.map((item, index) => {
                      return (
                        <div
                          key={item.id}
                          className={`flex items-center space-x-4 ${
                            index == 1 ? "2xl:-ml-12" : ""
                          } ${index == 2 ? "2xl:-ml-20" : ""} ${
                            index == 3 ? "2xl:-ml-28" : ""
                          }`}
                        >
                          <div>
                            <img
                              className="w-14"
                              src={item.icon.img.src}
                              alt={item.icon.img.alt}
                            />
                          </div>
                          <div>
                            <p className="lg:text-xl 2xl:text-2xl font-bold text-gray-800">
                              {item.text.heading}{" "}
                              <span className="text-[#23B14D] lg:text-base 2xl:text-lg">
                                {item.text.highlighted}
                              </span>
                            </p>
                          </div>
                        </div>
                      );
                    })}
                    <Link
                      href={ctaButtons[0]?.link || "#"}
                      className="my-4 relative inline-block cursor-pointer"
                    >
                      <img
                        src="/images/global-snapshot/exploreBtn.png"
                        alt="explore"
                        className="w-auto"
                      />
                      <div className="absolute inset-0 flex items-center justify-center px-4 font-bold text-base lg:text-lg whitespace-nowrap">
                        {(ctaButtons[0]?.text || "Explore More") + " >"}
                      </div>
                    </Link>
                  </div>
                  <div className="flex flex-col min-w-0">
                    <div className="flex my-6 relative items-center">
                      <img
                        className="ml-0 flex-shrink-0 w-12 2xl:w-auto"
                        src="/images/global-snapshot/sh1.png"
                        alt="shape"
                      />
                      <div className="text-base 2xl:text-lg capitalize font-bold">
                        {highlightLines.map((line, index) => (
                          <p key={index}>{line}</p>
                        ))}
                      </div>
                      <img
                        className="-ml-8 flex-shrink-0 w-12 2xl:w-auto"
                        src="/images/global-snapshot/sh2.png"
                        alt="shape"
                      />
                    </div>
                    <div className="my-6 2xl:mx-12">
                      <div className="text-[#23B14D] text-xl 2xl:text-3xl font-black italic">
                        {locationsSection?.title || "Global Delivery Sites"}
                      </div>
                      {locations.map((location, index) => (
                        <div
                          key={index}
                          className={`text-xl 2xl:text-3xl font-bold text-gray-800 italic ${
                            index === 0
                              ? "2xl:-ml-10"
                              : index === 1
                              ? "2xl:-ml-12"
                              : "2xl:-ml-14"
                          }`}
                        >
                          {location}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-10">
                <div className="font-semibold italic text-gray-800 text-lg mb-4">
                  {frameworkSection?.title ? (
                    <>
                      The{" "}
                      <span className="text-[#23B14D]">
                        {frameworkSection.title.highlight}
                      </span>
                      {` `}
                      {frameworkSection.title.text || "Delivery Framework"}
                    </>
                  ) : (
                    <>
                      The <span className="text-[#23B14D]">GREEN</span>
                      {` `}
                      Delivery Framework
                    </>
                  )}
                </div>
                <div className="mb-4 lg:my-4 flex flex-col space-y-2">
                  {frameworkFeatures.length > 0 ? (
                    frameworkFeatures.map((feature, index) => (
                      <div
                        key={index}
                        className={`flex space-x-4 items-center ${
                          index === 1
                            ? "2xl:-ml-6"
                            : index === 2
                            ? "2xl:-ml-8"
                            : index === 3
                            ? "2xl:-ml-10"
                            : index === 4
                            ? "2xl:-ml-14"
                            : ""
                        }`}
                      >
                        <div>
                          <img
                            src={feature.icon.src}
                            alt={feature.icon.alt || feature.text || "Feature icon"}
                            className="w-6 flex-shrink-0"
                            onError={(e) => handleImageError(e, "/images/global-snapshot/lighting.png")}
                          />
                        </div>
                        <div>{feature.text}</div>
                      </div>
                    ))
                  ) : (
                    // Fallback to original content
                    <>
                      <div className="flex space-x-4 items-center">
                        <div>
                          <img
                            src="/images/global-snapshot/lighting.png"
                            alt="spark"
                            className="w-6 flex-shrink-0"
                          />
                        </div>
                        <div>
                          End-to-end EPC execution—from feasibility to
                          commissioning.
                        </div>
                      </div>
                      <div className="flex 2xl:-ml-6 space-x-4 items-center">
                        <div>
                          <img
                            src="/images/global-snapshot/lighting.png"
                            alt="spark"
                            className="w-6 flex-shrink-0"
                          />
                        </div>
                        <div>
                          Adaptive product platforms (SunShine, Em'Pawa)
                          engineered for deployment in weeks.
                        </div>
                      </div>
                      <div className="flex 2xl:-ml-8 space-x-4 items-center">
                        <div>
                          <img
                            src="/images/global-snapshot/lighting.png"
                            alt="spark"
                            className="w-6 flex-shrink-0"
                          />
                        </div>
                        <div>
                          Global procurement integrated with local deployment
                          networks.
                        </div>
                      </div>
                      <div className="flex 2xl:-ml-10 space-x-4 items-center">
                        <div>
                          <img
                            src="/images/global-snapshot/lighting.png"
                            alt="spark"
                            className="w-6 flex-shrink-0"
                          />
                        </div>
                        <div>
                          Project design rooted in data, geography, and
                          long-term asset performance.
                        </div>
                      </div>
                      <div className="flex 2xl:-ml-14 space-x-4 items-center">
                        <div>
                          <img
                            src="/images/global-snapshot/lighting.png"
                            alt="spark"
                            className="w-6 flex-shrink-0"
                          />
                        </div>
                        <div>
                          Cultural and social engagement integrated into
                          technical delivery.
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Desktop Bottom Content */}
            <div className="relative z-50 mt-12 ml-10">
              <div className="max-w-xl text-sm text-gray-700 leading-relaxed">
                {locationDescription}
              </div>
            </div>

            <div className="mt-10 mr-10 flex flex-col items-end space-y-8 z-50">
              <Link
                href={ctaButtons[1]?.link || "#"}
                className="relative inline-block cursor-pointer"
              >
                <img
                  src="/images/global-snapshot/consulation.png"
                  alt="consultation"
                />
                <div className="absolute inset-0 flex items-center justify-center px-6 text-base lg:text-lg font-bold whitespace-nowrap">
                  {ctaButtons[1]?.text || "Request a Consultation"} {` >`}
                </div>
              </Link>
              <Link
                href={ctaButtons[2]?.link || "#"}
                className="relative inline-block cursor-pointer"
              >
                <img
                  src="/images/global-snapshot/globalprojectportfolioBtn.png"
                  alt="project portfolio"
                />
                <div className="absolute inset-0 flex items-center justify-center px-6 text-base lg:text-lg font-bold whitespace-nowrap">
                  {ctaButtons[2]?.text || "View Global Project Portfolio"} {` >`}
                </div>
              </Link>
            </div>
          </div>
        </div>

        <Chatbot />
      </div>
    </React.Fragment>
  );
};

export default GlobalSnapshot;
