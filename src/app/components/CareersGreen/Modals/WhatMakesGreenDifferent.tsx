"use client";
import React, { useState, useEffect } from "react";
import { useInteractiveZIndex } from "../../../../hooks/useInteractiveZIndex";

interface WhatMakesGreenDifferentData {
  title: string;
  keyPoints: Array<{
    text1: string;
    text2: string;
  }>;
  featuredImg: {
    alt: string;
    src: string;
  };
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  data?: WhatMakesGreenDifferentData;
}

const WhatMakesGreenDifferent = ({ isOpen, onClose, data }: Props) => {
  const [isMobile, setIsMobile] = useState(false);
  const closeButtonProps = useInteractiveZIndex();

  useEffect(() => {
    const checkMobile = () => {
      if (typeof window !== "undefined") {
        const mobile = window.innerWidth < 768;
        setIsMobile(mobile);
      }
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  if (!isOpen) return null;

  const renderContent = () => (
    <>
      {/* Title Section */}
      <div className="mb-8">
        <h2 className="text-2xl lg:text-3xl font-black text-gray-800 mb-4">
          {data?.title || "What Makes GREEN Different"}
        </h2>
        <div className="w-full h-0.5 bg-gray-300 mt-4"></div>
      </div>

      {/* Content Layout - Text and Image */}
      <div
        className={`${
          isMobile
            ? "flex flex-col space-y-6"
            : "flex flex-col lg:flex-row items-start gap-8"
        }`}
      >
        {/* Key Points Column */}
        <div className="flex-1 space-y-6">
          {data?.keyPoints?.map((point, index) => (
            <div key={index} className="flex items-start gap-3">
              <div className="flex-shrink-0 mt-1">
                <span>
                  <img
                    src="/images/grid-intel/lighting.png"
                    className="w-14 -mt-4"
                    alt="lighting"
                  />
                </span>
              </div>
              <div>
                <div className="text-gray-800 font-bold text-lg mb-1">
                  {point.text1}
                </div>
                <div className="text-gray-600 text-sm">{point.text2}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Image Column */}
        {data?.featuredImg && (
          <div className={`${isMobile ? "w-full" : "w-7/12"}`}>
            <img
              src={data.featuredImg.src}
              alt={data.featuredImg.alt}
              className="w-full rounded-lg"
            />
          </div>
        )}
      </div>
    </>
  );

  return (
    <React.Fragment>
      {/* Modal Overlay */}
      <div className="fixed inset-0 bg-black/20 z-[99999999999999999999999999] flex items-center justify-center">
        {/* Modal Container */}
        <div className="relative w-full lg:max-w-6xl mx-4">
          {/* Mobile Layout */}
          {isMobile ? (
            <div className="bg-white h-[80vh] p-6 overflow-y-auto border-2 border-[#4CAF50] relative shadow-2xl">
              {/* Close Button */}
              <div className="flex justify-end w-full mb-4">
                <div {...closeButtonProps.getContainerProps()}>
                  <button
                    onClick={onClose}
                    className="cursor-pointer text-gray-600 hover:text-gray-800 text-2xl"
                  >
                    ✕
                  </button>
                </div>
              </div>

              {/* Modal Content */}
              <div className="mx-auto">{renderContent()}</div>
            </div>
          ) : (
            /* Desktop Layout - Skewed design */
            <div
              className="bg-white transform  py-14 border-2 border-[#4CAF50] px-16 relative shadow-2xl"
              style={{
                clipPath: "polygon(0 0, 95% 0, 100% 100%, 5% 100%)",
                transform: "skewX(-12deg)",
              }}
            >
              {/* Close Button */}
              <div className="flex justify-end w-full mb-4">
                <div {...closeButtonProps.getContainerProps()}>
                  <button
                  style={{
                     transform:"skewX(12deg)"
                  }}
                    onClick={onClose}
                    className="cursor-pointer text-gray-600 hover:text-gray-800 text-2xl transform"
                  >
                    ✕
                  </button>
                </div>
              </div>

              {/* Modal Content */}
              <div
              style={{
                transform:"skewX(12deg)"
              }}
              className="transform  max-w-5xl mx-auto">
                {renderContent()}
              </div>
            </div>
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

export default WhatMakesGreenDifferent;
