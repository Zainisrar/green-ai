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

interface Props {
  backroundImg: string;
  navigation: NavigationProps;
  title: string;
  subheadline: string;
  italic?: boolean;
  description: React.ReactNode;
  name1: string;
  name2: string;
  cardTitle: string;
  keypoints1: { icon: string; text: React.ReactNode }[];
  keypoints2: { icon: string; text: React.ReactNode }[];
}

const formatCardTitle = (titleText: string) => {
  const cleanText = titleText.trim();
  if (cleanText.includes(":")) {
    const parts = cleanText.split(":");
    return (
      <>
        <span className="text-[#23B14D] not-italic mr-0.5">&quot;</span>
        {parts[0].trim()}:
        <br />
        {parts.slice(1).join(":").trim()}
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

const Insight24: React.FC<Props> = ({
  title,
  subheadline,
  description,
  name1,
  name2,
  cardTitle,
  backroundImg,
  keypoints1,
  keypoints2,
}) => {
  const allKeypoints = [...keypoints1, ...keypoints2];

  return (
    <React.Fragment>
      <TopNavigation />
      <div className="relative w-full h-screen max-h-screen bg-white overflow-hidden flex flex-col justify-between select-none">
        
        {/* Right Side Background Diagonal Image */}
        <div className="absolute top-0 right-0 w-full h-full -z-10 pointer-events-none">
          <img
            src={backroundImg}
            className="w-full h-full object-cover object-right-top"
            alt="Background banner"
          />
        </div>

        {/* Main 100vh Viewport Grid */}
        <div className="relative z-20 w-full h-full max-w-[1850px] mx-auto px-6 md:px-12 lg:px-16 pt-16 lg:pt-20 pb-12 flex flex-col justify-between">
          <div className="grid lg:grid-cols-12 gap-6 items-start h-full">
            
            {/* Left Column: Heading, Subheadline, Description & Keypoints */}
            <div className="lg:col-span-7 flex flex-col justify-center h-full pl-2 lg:pl-6 pr-2 lg:pr-8 pt-2">
              
              {/* SOLAR HOME */}
              <div className="uppercase text-4xl sm:text-5xl lg:text-6xl 2xl:text-[68px] font-black tracking-tight leading-[0.95] text-black mb-2">
                {name1} <span className="text-[#23B14D]">{name2}</span>
              </div>

              {/* Title & Subheadline */}
              <h1 className="uppercase text-2xl sm:text-3xl lg:text-4xl 2xl:text-[36px] font-black text-[#0a0a0a] tracking-tight leading-tight mb-1">
                {title}
              </h1>
              <h2 className="uppercase text-xl sm:text-2xl lg:text-3xl 2xl:text-[32px] font-bold text-[#23B14D] mb-3">
                {subheadline}
              </h2>

              {/* Description */}
              <p className="text-gray-700 font-normal text-xs sm:text-sm lg:text-base 2xl:text-lg leading-relaxed max-w-3xl mb-6 lg:mb-8">
                {description}
              </p>

              {/* Keypoints 2x2 Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-8 lg:gap-x-10 max-w-3xl">
                {allKeypoints.map((point, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="h-10 lg:h-14 w-10 lg:w-14 flex-shrink-0 flex items-center justify-center">
                      <img
                        src={point.icon}
                        alt={`keypoint icon ${index + 1}`}
                        className="max-h-full max-w-full object-contain filter drop-shadow-sm"
                      />
                    </div>
                    <div className="font-semibold text-gray-800 text-xs sm:text-sm lg:text-base leading-snug">
                      {point.text}
                    </div>
                  </div>
                ))}
              </div>

            </div>

            {/* Right Column: Parallelogram Quote Card */}
            <div className="lg:col-span-5 flex flex-col justify-center items-end h-full pt-4 lg:pt-8 pr-4 lg:pr-12">
              <div
                style={{
                  transform: "skewX(-15deg)",
                }}
                className="transform w-full max-w-[340px] sm:max-w-[380px] lg:max-w-[420px] 2xl:max-w-[460px] px-6 py-5 lg:px-8 lg:py-6 bg-white shadow-[0_10px_30px_rgba(0,0,0,0.12)] rounded-sm border border-gray-200/80 text-lg sm:text-xl lg:text-2xl 2xl:text-[28px] font-extrabold italic text-[#111111] leading-tight tracking-tight"
              >
                <div style={{ transform: "skewX(0deg)" }}>
                  {formatCardTitle(cardTitle)}
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Bottom-left Category Tag: # Home Insight 02 */}
        <div className="absolute bottom-4 left-8 lg:left-16 z-30 hidden lg:block">
          <span className="font-bold italic text-sm lg:text-base 2xl:text-lg text-[#666666] tracking-wide">
            # {name2} Insight 02
          </span>
        </div>

        {/* Chatbot Floating Input */}
        <Chatbot />
      </div>
    </React.Fragment>
  );
};

export default Insight24;

