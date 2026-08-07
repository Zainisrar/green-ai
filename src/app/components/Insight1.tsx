"use client";
import React from "react";
import TopNavigation from "./TopNavigation/TopNavigation";
import Chatbot from "./Chatbot";

type NavigationProps = {
  items: {
    name: string;
    link: string;
  }[];
};

type Keypoint = {
  icon: string;
  text: React.ReactNode;
};

interface Props {
  backgroundImg: string;
  navigation: NavigationProps;
  title: string;
  subheadline: string;
  description: string;
  name1: string;
  name2: string;
  bgImg?: string;
  cardTitle: string;
  keypoints: Keypoint[];
}

const formatCardTitle = (titleText: string) => {
  const cleanText = titleText.trim();
  if (cleanText.includes(":")) {
    const parts = cleanText.split(":");
    const headlinePart = parts[0].trim();
    const restPart = parts.slice(1).join(":").trim();

    if (restPart.includes(",")) {
      const restSubparts = restPart.split(",");
      return (
        <>
          <span className="text-[#23B14D] not-italic mr-0.5">&quot;</span>
          {headlinePart}:
          <br />
          {restSubparts[0].trim()},
          <br />
          {restSubparts.slice(1).join(",").trim()}
          <span className="text-[#23B14D] not-italic ml-0.5">&quot;</span>
        </>
      );
    }

    return (
      <>
        <span className="text-[#23B14D] not-italic mr-0.5">&quot;</span>
        {headlinePart}:
        <br />
        {restPart}
        <span className="text-[#23B14D] not-italic ml-0.5">&quot;</span>
      </>
    );
  }

  return (
    <>
      <span className="text-[#23B14D] not-italic mr-0.5">&quot;</span>
      {cleanText}
      <span className="text-[#23B14D] not-italic ml-0.5">&quot;</span>
    </>
  );
};

const Insight1: React.FC<Props> = ({
  name1,
  name2,
  cardTitle,
  title,
  subheadline,
  description,
  bgImg,
  keypoints,
}) => {
  return (
    <React.Fragment>
      <TopNavigation />
      <div className="relative w-full h-screen max-h-screen bg-white overflow-hidden flex flex-col justify-between select-none">
        
        {/* Left Side Background Diagonal Image Overlay */}
        <div className="absolute top-0 left-0 h-full -z-10 pointer-events-none overflow-hidden">
          <img
            src={bgImg || "/images/insight1/greenShape.png"}
            className="h-screen w-auto object-cover object-left"
            alt="Background banner"
          />
          <img
            src="/images/insight1/greenShape.png"
            className="absolute top-0 left-0 h-screen w-auto object-cover object-left -z-10"
            alt="Green shape overlay"
          />
        </div>

        {/* Main Viewport Content Grid */}
        <div className="relative z-20 w-full h-full max-w-[1850px] mx-auto px-6 md:px-12 lg:px-16 pt-16 lg:pt-20 pb-12 flex flex-col justify-between">
          
          <div className="grid lg:grid-cols-12 gap-6 items-start h-full">
            
            {/* Left Column: Title & Parallelogram Quote Card */}
            <div className="lg:col-span-5 flex flex-col justify-center h-full pt-2 lg:pt-6 pl-4 lg:pl-16">
              {/* Main Heading: SOLAR MINING */}
              <div className="uppercase text-4xl sm:text-5xl lg:text-6xl 2xl:text-[68px] font-black tracking-tight leading-[0.95] text-black">
                {name1}
              </div>
              <div className="uppercase text-4xl sm:text-5xl lg:text-6xl 2xl:text-[68px] font-black tracking-tight leading-[0.95] text-[#23B14D] mt-1">
                {name2}
              </div>

              {/* Quote Card: Solid White Parallelogram with Soft Shadow */}
              <div className="mt-8 lg:mt-14 mb-4">
                <div
                  style={{
                    transform: "skewX(-15deg)",
                  }}
                  className="transform w-full max-w-[340px] sm:max-w-[380px] lg:max-w-[440px] 2xl:max-w-[480px] px-6 py-5 lg:px-8 lg:py-6 bg-white shadow-[0_10px_30px_rgba(0,0,0,0.12)] rounded-sm border border-gray-200/80 text-lg sm:text-xl lg:text-2xl 2xl:text-[27px] font-semibold italic text-[#111111] leading-tight tracking-tight"
                >
                  <div style={{ transform: "skewX(0deg)" }}>
                    {formatCardTitle(cardTitle)}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Title, Description & 2x2 Keypoints Grid */}
            <div className="lg:col-span-7 flex flex-col justify-center h-full pl-2 lg:pl-8 pr-2 lg:pr-6 pt-2">
              
              {/* Title: THE CARBON FOOTPRINT OF MINING (Single Line) */}
              <h1 className="uppercase text-2xl sm:text-3xl lg:text-[34px] 2xl:text-[38px] font-black text-[#0a0a0a] tracking-tight leading-tight whitespace-nowrap mb-2">
                {title}
              </h1>

              {/* Subheadline: How Solar Energy Reduces Emissions? */}
              <h2 className="text-lg sm:text-xl lg:text-2xl 2xl:text-[28px] font-bold italic mb-3 text-[#23B14D]">
                {subheadline}
              </h2>

              {/* Description */}
              <p className="text-gray-700 font-normal text-xs sm:text-sm lg:text-base 2xl:text-lg leading-relaxed max-w-3xl mb-6 lg:mb-8">
                {description}
              </p>

              {/* Keypoints 2x2 Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-8 lg:gap-x-12 max-w-3xl">
                {keypoints.map((point, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center text-center group"
                  >
                    <div className="h-14 lg:h-18 2xl:h-20 w-14 lg:w-18 2xl:w-20 flex items-center justify-center mb-2">
                      <img
                        src={point.icon}
                        alt={`keypoint icon ${index + 1}`}
                        className="max-h-full max-w-full object-contain filter drop-shadow-sm"
                      />
                    </div>
                    <div className="font-semibold text-gray-800 text-xs sm:text-sm lg:text-base leading-snug max-w-[260px] text-center">
                      {point.text}
                    </div>
                  </div>
                ))}
              </div>

            </div>

          </div>

        </div>

        {/* Bottom-left Category Tag: # Mining Insight 01 */}
        <div className="absolute bottom-5 left-10 lg:left-20 z-30 hidden lg:block">
          <span className="font-bold italic text-sm lg:text-base 2xl:text-lg text-[#666666] tracking-wide">
            # Mining Insight 01
          </span>
        </div>

        {/* Chatbot Floating Input */}
        <Chatbot />
      </div>
    </React.Fragment>
  );
};

export default Insight1;



