"use client";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import TopNavigation from "../TopNavigation/TopNavigation";
import Chatbot from "../Chatbot";
import { useExpertise } from "../../../hooks/useExpertise";

interface DataProps {
  name1: string;
  name2: string;
  title: React.ReactNode;
  description: React.ReactNode;
  description2: string;
  cta: string;
  active?: boolean;
  imgs: {
    path: string;
    active: boolean;
  }[];
}

// Reusable segmented control for switching between Grid and Slider views.
const ViewTabs = ({
  view,
  onChange,
  className = "",
}: {
  view: "grid" | "slider";
  onChange: (v: "grid" | "slider") => void;
  className?: string;
}) => {
  const tabs: { key: "grid" | "slider"; label: string }[] = [
    { key: "grid", label: "Grid" },
    { key: "slider", label: "Slider" },
  ];
  return (
    <div
      className={`inline-flex items-center gap-1 rounded-full border border-[#70ac82]/40 bg-white/80 p-1 shadow-sm backdrop-blur ${className}`}
    >
      {tabs.map((tab) => {
        const active = view === tab.key;
        return (
          <button
            key={tab.key}
            type="button"
            onClick={() => onChange(tab.key)}
            aria-pressed={active}
            className={`cursor-pointer rounded-full px-5 py-2 text-sm font-bold transition-all lg:px-7 lg:text-base ${
              active
                ? "bg-[#23B14D] text-white shadow"
                : "text-gray-600 hover:text-[#23B14D]"
            }`}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
};

const Expertise = () => {
  const { data: apiExpertise } = useExpertise();
  const router = useRouter();

  // All hooks must be called before any conditional returns
  const [view, setView] = useState<"grid" | "slider">("grid");
  const [paused, setPaused] = useState(false);
  const sliderRef = useRef<HTMLDivElement | null>(null);

  // Transform API data to match component structure
  const transformedData = React.useMemo(() => {
    if (!apiExpertise) return [];

    return apiExpertise.map((item, index) => {
      const titleParts = item.title.split(" ");
      const name1 = titleParts[0] || "POWERING";
      const name2 = titleParts[1] || "HEALTHCARE";

      return {
        name1,
        name2,
        title: (
          <>
            A <span className=" text-[#23B14D] ">{item.highlighted}</span>{" "}
            FUTURE, <br /> An Ultimate Target
          </>
        ),
        description: <>{item.description}</>,
        description2: item.description,
        cta: item.slug,
        active: index === 0, // Make first item active by default
        imgs: item.carousel.map((carouselItem, imgIndex) => ({
          path: carouselItem.img.src,
          active: imgIndex === 0, // Make first image active
        })),
      };
    });
  }, [apiExpertise]);

  const [data, setData] = useState<DataProps[]>(transformedData);

  // Update data when API data changes
  React.useEffect(() => {
    if (transformedData.length > 0) {
      setData(transformedData);
    }
  }, [transformedData]);

  // All other hooks and functions
  const handleActiveSolution = (index: number) => {
    const newData = data.map((item, i) => {
      if (i == index) {
        return { ...item, active: true };
      }
      return { ...item, active: false };
    });
    setData(newData);
  };

  const active =
    data.length > 0
      ? data
          .filter((item) => item.active)[0]
          ?.imgs.findIndex((img) => img.active) || 0
      : 0;

  const handleViewChange = (viewType: "grid" | "slider") => {
    setView(viewType);
  };

  // Continuous marquee-style auto-scroll for the slider. The cards are
  // rendered twice (see render below), so once we've scrolled past the first
  // copy we can reset to the start seamlessly. This works even when the cards
  // would otherwise fit on screen, which is why the old interval never moved.
  useEffect(() => {
    if (view !== "slider") return;
    const container = sliderRef.current;
    if (!container) return;

    let raf = 0;
    const speed = 0.6; // pixels per frame

    const tick = () => {
      if (!paused) {
        const half = container.scrollWidth / 2;
        let next = container.scrollLeft + speed;
        if (half > 0 && next >= half) next -= half;
        container.scrollLeft = next;
      }
      raf = window.requestAnimationFrame(tick);
    };

    raf = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(raf);
  }, [view, paused, apiExpertise]);

  if (data.length === 0) {
    return null;
  }

  if (view === "grid") {
    return (
      <React.Fragment>
        <div className="min-h-screen relative pb-20 lg:pb-0">
          <div className="absolute  left-0 top-0 inset-0 w-full overflow-hidden -z-10">
            <img
              src="/images/expertise/img.png"
              className="object-cover lg:w-full lg:h-full"
              alt="mainBg"
            />
          </div>
          <TopNavigation />

          <div className="grid grid-cols-1 lg:grid-cols-2 mt-10 gap-8 lg:gap-0">
            {/* Mobile: Images first, Desktop: Text first */}
            <div className="order-2 lg:order-1 relative lg:left-32 font-bold mt-8 lg:mt-20 px-4 lg:px-0">
              <div className="text-2xl lg:text-3xl ml-0 lg:ml-20 uppercase  lg:text-left">
                {data.filter((item) => item.active)[0].name1}{" "}
                <span className="text-[#23B14D]">
                  {data.filter((item) => item.active)[0].name2}
                </span>
              </div>
              <div className="font-light mt-8 lg:mt-40 text-base lg:text-lg">
                <div className="text-2xl lg:text-3xl uppercase font-bold text-left">
                  {data.filter((item) => item.active)[0].title}
                </div>
                <div className="mt-6 lg:mt-10 w-full lg:w-8/12 text-left">
                  {data.filter((item) => item.active)[0].description}
                </div>
              </div>
              <div className="flex justify-end lg:justify-start lg:ml-20 pt-6 lg:pt-10">
                <img
                  onClick={() => {
                    const cta = data.filter((item) => item.active)[0]?.cta;
                    if (cta) router.push(cta);
                  }}
                  src="/images/expertise/exploreBtn.svg"
                  className="w-32 lg:w-40 cursor-pointer"
                  alt="btn"
                />
              </div>
            </div>

            {/* Mobile: Images second, Desktop: Images second */}
            <div className="order-1 lg:order-2 relative px-4 lg:px-0">
              <div className="flex justify-center items-center">
                {(() => {
                  const activeItem = data.filter((item) => item.active)[0];
                  const activeImg = activeItem?.imgs.find((img) => img.active);

                  if (!activeImg) return null;

                  return (
                    <div className="cursor-pointer relative">
                      <img
                        src={activeImg.path}
                        className="w-full lg:w-72 p-2 lg:p-4"
                        alt="active slide"
                      />
                      <div className="absolute top-2 lg:top-10">
                        <div
                        style={{
                          transform:"skewX(-22deg)"
                        }}
                        className="transform text-white  ml-2 lg:ml-12 font-bold mt-1 lg:mt-4 text-center w-full lg:w-[200px] p-1 lg:p-3 bg-white/40 shadow-sm text-xs lg:text-2xl">
                          {activeItem.name1 + ` ` + activeItem.name2}
                        </div>
                      </div>
                    </div>
                  );
                })()}
              </div>
              <div className="lg:hidden flex justify-center mt-6 mb-2">
                <ViewTabs view={view} onChange={handleViewChange} />
              </div>
            </div>
          </div>

          {/* All solution cards — click a card to feature it, or use its
              "View" link to open the detail page. */}
          <div className="px-4 lg:px-32 mt-10 lg:mt-16">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
              {data.map((item, index) => {
                const thumb = item.imgs[0]?.path;
                return (
                  <div
                    key={index}
                    onClick={() => handleActiveSolution(index)}
                    className={`group relative cursor-pointer overflow-hidden rounded-lg border-2 transition-all ${
                      item.active
                        ? "border-[#23B14D] shadow-lg"
                        : "border-transparent hover:border-[#70ac82]"
                    }`}
                  >
                    {thumb && (
                      <img
                        src={thumb}
                        alt={`${item.name1} ${item.name2}`}
                        className="h-28 lg:h-36 w-full object-cover"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 p-3">
                      <span className="text-xs lg:text-sm font-bold uppercase text-white drop-shadow">
                        {item.name1} {item.name2}
                      </span>
                      <Link
                        href={item.cta}
                        onClick={(e) => e.stopPropagation()}
                        className="shrink-0 text-xs font-semibold text-[#23B14D] underline-offset-2 hover:underline"
                      >
                        View →
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="lg:flex hidden justify-center mt-12 lg:mt-16 pb-10">
            <ViewTabs view={view} onChange={handleViewChange} />
          </div>
          <div className="fixed lg:block hidden bottom-4 left-2 lg:left-8">
            <img
              src="/images/expertise/SOLUTIONS.png"
              alt="solution"
              className="w-16 lg:w-auto"
            />
          </div>
        </div>
        <Chatbot />
      </React.Fragment>
    );
  } else {
    return (
      <React.Fragment>
        <div className=" relative bg-gradient-to-br from-green-100 to-white">
          <TopNavigation />

          {/* Background Image */}
          <div className="absolute inset-0 w-full overflow-hidden -z-10">
            <img
              src="/images/expertise/img.png"
              className="object-cover w-full h-full opacity-30"
              alt="mainBg"
            />
          </div>

          {/* Vertical page watermark */}
          <div className="pointer-events-none fixed left-2 top-1/2 z-10 hidden -translate-y-1/2 md:block lg:left-6">
            <img
              src="/images/expertise/sliderSolution.png"
              alt="solution"
              className="w-24 lg:w-28 -rotate-90 object-contain opacity-80"
            />
          </div>

          {/* Header Section */}
          <div className="relative z-10 px-8 lg:px-52 font-bold mt-20">
            <div className="text-4xl lg:text-5xl uppercase text-center lg:text-left">
              {data.filter((item) => item.active)[0].name1}{" "}
              <span className="text-[#23B14D]">
                {data.filter((item) => item.active)[0].name2}
              </span>
            </div>
            <div className="text-base lg:text-lg font-normal mt-6 text-center lg:text-left max-w-4xl">
              {data.filter((item) => item.active)[0].description2}
            </div>
          </div>

          {/* Slider Section - continuous auto-scrolling marquee */}
          <div className="mt-16 relative z-10">
            <div
              ref={sliderRef}
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
              className="flex flex-row items-center justify-start gap-6 overflow-x-hidden pb-8 px-8"
              style={{
                scrollbarWidth: "none",
                msOverflowStyle: "none",
              }}
            >
              {/* Cards rendered twice so the marquee can loop seamlessly */}
              {[...(apiExpertise ?? []), ...(apiExpertise ?? [])].map(
                (item, idx) => (
                  <div
                    key={idx}
                    data-slide
                    className="flex-shrink-0 w-80 lg:w-96 relative"
                  >
                    {/* Whole card (heading included) links to the expertise page */}
                    <Link
                      href={item.slug}
                      className="block cursor-pointer group"
                    >
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-48 lg:h-64 object-cover"
                        style={{
                          display: "block",
                          border: "none",
                          outline: "none",
                          boxShadow: "none",
                        }}
                      />
                      {/* Text overlay directly on image */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                      <div className="absolute bottom-4 left-4 right-4">
                        <h3 className="text-white font-bold text-xl lg:text-2xl drop-shadow-lg group-hover:text-[#23B14D] transition-colors">
                          {item.title}
                        </h3>
                      </div>
                    </Link>
                  </div>
                )
              )}
            </div>
          </div>

          {/* Bottom Section */}
          <div className="flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-10 px-8 pb-20 mt-16">
            <ViewTabs view={view} onChange={handleViewChange} />

            <Chatbot />
          </div>
        </div>
      </React.Fragment>
    );
  }
};

export default Expertise;
