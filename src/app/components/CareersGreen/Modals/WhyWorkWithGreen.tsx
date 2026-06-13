"use client";
import React, { useState, useEffect } from "react";
import { useInteractiveZIndex } from "../../../../hooks/useInteractiveZIndex";

interface WhyWorkWithGreenData {
  icons: Array<{
    img: {
      alt: string;
      src: string;
    };
    title: string;
    description: string;
  }>;
  quote: {
    text1: string;
    text2: string;
    highlighted1: string;
    highlighted2: string;
  };
  title: string;
  description: string;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  data?: WhyWorkWithGreenData;
}

const WhyWorkWithGreen = ({ isOpen, onClose, data }: Props) => {
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
          {data?.title || "Why Work With GREEN?"}
        </h2>
        <div className="lg:flex items-center">
          <h3 className="text-lg text-[#4CAF50] font-semibold">
            {data?.description ||
              "We engineer energy. But our real asset is people."}
          </h3>
        </div>
        <div className="w-full h-0.5 bg-gray-300 mt-4"></div>
      </div>

      {/* Icons Grid - 2x2 layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {data?.icons?.map((icon, index) => (
          <div key={index} className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <img
                src={icon.img.src}
                alt={icon.img.alt}
                className="w-12 h-12"
              />
            </div>
            <div>
              <h4 className="font-bold text-gray-800 mb-2 text-lg">
                {icon.title}
              </h4>
              <p className="text-gray-600 text-sm">{icon.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Quote Section */}
      <div className="">
        <blockquote className="">
          <p className="text-lg font-bold text-gray-800 italic mb-2">
            {data?.quote?.text1 ||
              "\"At GREEN, I've grown faster in two years than I thought possible. Field-tested. Mission-driven. It's real work.\""}
          </p>
          <footer className="text-sm text-green-600">
            {data?.quote?.text2 || "— Field Engineer, GREEN Limited"}
          </footer>
        </blockquote>
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
            /* Desktop Layout - Skewed design like in the image */
            <div
              className="bg-white transform py-14 border-2 border-[#4CAF50] px-16 relative shadow-2xl"
              style={{
                clipPath: "polygon(0 0, 95% 0, 100% 100%, 5% 100%)",
                transform: "skewX(-12deg)",
              }}
            >
              {/* Close Button */}
              <div className="flex justify-end w-full mb-4">
                <div {...closeButtonProps.getContainerProps()}>
                  <button
                    onClick={onClose}
                    style={{
                      transform:"skewX(12deg)"
                    }}
                    className="cursor-pointer text-gray-600 hover:text-gray-800 text-2xl transform "
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
              className="transform max-w-5xl mx-auto">
                {renderContent()}
              </div>
            </div>
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

export default WhyWorkWithGreen;
