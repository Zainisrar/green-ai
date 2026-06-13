"use client";
import React, { useEffect, useRef, useState } from "react";
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

const Expertise = () => {
  const { data: apiExpertise } = useExpertise();

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

  useEffect(() => {
    const container = sliderRef.current;
    if (!container) return;
    let interval: number | undefined;
    const slide = container.querySelector("[data-slide]") as HTMLElement | null;
    const computeGap = () => {
      const cs = window.getComputedStyle(container);
      const gap = cs.gap || cs.columnGap || cs.rowGap || "0px";
      return parseInt(gap || "0", 10) || 0;
    };

    const scrollOnce = () => {
      if (!container) return;
      const firstSlide = container.querySelector(
        "[data-slide]"
      ) as HTMLElement | null;
      if (!firstSlide) return;
      const gap = computeGap();
      const step = firstSlide.offsetWidth + gap;
      const maxScroll = container.scrollWidth - container.clientWidth;
      const next = Math.min(container.scrollLeft + step, container.scrollWidth);
      if (container.scrollLeft + step > maxScroll) {
        container.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        container.scrollTo({
          left: container.scrollLeft + step,
          behavior: "smooth",
        });
      }
    };

    if (!paused) {
      interval = window.setInterval(scrollOnce, 1000);
    }
    return () => {
      if (interval) window.clearInterval(interval);
    };
  }, [data, paused]);

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
              <div className="flex justify-end  lg:justify-center lg:absolute lg:right-82 pt-6 lg:pt-10">
                <img
                  onClick={() => {
                    window.location.href = data.filter(
                      (item) => item.active
                    )[0].cta;
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
              <div className="relative lg:hidden flex justify-center mb-8 lg:mt-0">
                <div className="text-center flex  pt-6 lg:pt-10 absolute pb-10">
                  <div
                    onClick={() => handleViewChange("grid")}
                    className="bg-[#70ac82] cursor-pointer text-sm lg:text-lg p-2 px-3 lg:px-4 w-auto font-bold"
                  >
                    Grid
                  </div>
                  <div
                    onClick={() => handleViewChange("slider")}
                    className="bg-[#DDEBE1] cursor-pointer text-sm lg:text-lg p-2 px-3 lg:px-4 w-auto font-bold"
                  >
                    Slider
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="relative lg:flex hidden justify-center mt-8 lg:mt-0">
            <div className="text-center flex pt-6 lg:pt-10 absolute pb-10">
              <div
                onClick={() => handleViewChange("grid")}
                className="bg-[#70ac82] cursor-pointer text-sm lg:text-lg p-2 px-3 lg:px-4 w-auto font-bold"
              >
                Grid
              </div>
              <div
                onClick={() => handleViewChange("slider")}
                className="bg-[#DDEBE1] cursor-pointer text-sm lg:text-lg p-2 px-3 lg:px-4 w-auto font-bold"
              >
                Slider
              </div>
            </div>
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

          {/* Header Section */}
          <div className="z-[99999999999999999] relative px-8 lg:px-52 font-bold mt-20">
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

          {/* Slider Section - Clean horizontal layout */}
          <div className="mt-16 relative z-[99999999999999999]">
            <div
              ref={sliderRef}
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
              className="flex flex-row items-center justify-start gap-2 overflow-x-auto pb-8 scrollbar-hide px-8"
              style={{
                scrollSnapType: "x mandatory",
                scrollbarWidth: "none",
                msOverflowStyle: "none",
              }}
            >
              {/* Clean slider cards from API data */}
              {apiExpertise?.map((item, idx) => (
                <div
                  key={idx}
                  data-slide
                  className="cursor-pointer flex-shrink-0 w-80 lg:w-96 snap-start relative"
                  style={{ scrollSnapAlign: "start" }}
                  onClick={() => {
                    window.location.href = item.slug;
                  }}
                >
                  {/* Direct image without any card wrapper */}
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
                    <h3 className="text-white font-bold text-xl lg:text-2xl drop-shadow-lg">
                      {item.title}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Section */}
          <div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-10 px-8 pb-20 mt-16">
            <div className="mb-8 md:block hidden lg:mb-0">
              <img
                src="/images/expertise/sliderSolution.png"
                alt="solution"
                className="w-20 lg:w-28 object-contain"
              />
            </div>

            <div className="text-center flex">
              <div
                onClick={() => handleViewChange("grid")}
                className="bg-[#DDEBE1] cursor-pointer text-lg p-2 px-4 font-bold"
              >
                Grid
              </div>
              <div
                onClick={() => handleViewChange("slider")}
                className="bg-[#70ac82] cursor-pointer text-lg p-2 px-4 font-bold"
              >
                Slider
              </div>
            </div>

            <Chatbot />
          </div>
        </div>
      </React.Fragment>
    );
  }
};

export default Expertise;
