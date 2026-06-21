"use client";
import React, { useState, useEffect } from "react";
import { useInteractiveZIndex } from "../../../../hooks/useInteractiveZIndex";

interface LeadershipData {
  icon: any[];
  quote: {
    text: string;
    highlighted: string;
    highlightedText: string;
  };
  title: string;
  keyPoints: string[];
  qualities: string[];
  description: string;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  data?: LeadershipData;
}

const OurLeadershipPhilosophy = ({ isOpen, onClose, data }: Props) => {
  const [isMobile, setIsMobile] = useState(false);
  const closeButtonProps = useInteractiveZIndex();

  // Mobile detection - initialize immediately
  useEffect(() => {
    const checkMobile = () => {
      if (typeof window !== "undefined") {
        const mobile = window.innerWidth < 768;
        setIsMobile(mobile);
      }
    };

    // Check immediately
    checkMobile();

    // Add resize listener
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Also check on every render as backup
  useEffect(() => {
    if (typeof window !== "undefined" && window.innerWidth < 768) {
      setIsMobile(true);
    }
  });

  // Helper function to render highlighted text
  const renderHighlightedText = (text: string, highlighted: string) => {
    if (!highlighted || !text.includes(highlighted)) {
      return text;
    }

    const parts = text.split(highlighted);
    return (
      <>
        {parts.map((part, index) => (
          <React.Fragment key={index}>
            {part}
            {index < parts.length - 1 && (
              <span className="text-green-600">{highlighted}</span>
            )}
          </React.Fragment>
        ))}
      </>
    );
  };

  if (!isOpen) return null;

  console.log("Rendering modal, isMobile:", isMobile);

  const renderContent = () => (
    <>
      {/* Title Section */}
      <div className="mb-8">
        <h2 className="text-2xl lg:text-3xl font-black text-gray-800 mb-4">
          {data?.title || "Our Leadership Philosophy"}
        </h2>
        <div className="lg:flex items-center">
          {!isMobile && (
            <span className="text-2xl text-black font-bold mr-2">-</span>
          )}
          <h3 className="text-xl text-[#4CAF50] font-semibold">
            {data?.quote
              ? renderHighlightedText(
                  data.quote.text,
                  data.quote.highlightedText || data.quote.highlighted
                )
              : "We don't just work on infrastructure. We work on impact."}
          </h3>
        </div>

        {/* Leadership Qualities */}
        <div
          className={`${
            isMobile
              ? "flex flex-wrap gap-2 justify-center mt-4"
              : "flex space-x-4 text-xl font-bold my-4 items-center justify-center"
          }`}
        >
          {data?.qualities && data.qualities.length > 0 ? (
            data.qualities.map((quality, index) => (
              <React.Fragment key={index}>
                <div
                  className={`${
                    isMobile ? "px-3 py-1 bg-green-50 rounded-full text-sm" : ""
                  }`}
                >
                  {quality}
                  {!isMobile && index < data.qualities.length - 1 && (
                    <span className="text-green-600 mx-4 text-3xl">|</span>
                  )}
                </div>
              </React.Fragment>
            ))
          ) : (
            <>
              <div
                className={`${
                  isMobile ? "px-3 py-1 bg-green-50 rounded-full text-sm" : ""
                }`}
              >
                Accountable
                {!isMobile && (
                  <span className="text-green-600 mx-4 text-3xl">|</span>
                )}
              </div>
              <div
                className={`${
                  isMobile ? "px-3 py-1 bg-green-50 rounded-full text-sm" : ""
                }`}
              >
                Adaptive
                {!isMobile && (
                  <span className="text-green-600 mx-4 text-3xl">|</span>
                )}
              </div>
              <div
                className={`${
                  isMobile
                    ? "px-3 py-1 bg-green-50 rounded-full text-sm"
                    : "mt-2"
                }`}
              >
                Accessible
              </div>
            </>
          )}
        </div>
        <div className="w-full h-0.5 bg-gray-300 mt-4"></div>
      </div>

      {/* Key Points Section */}
      <div className="space-y-6">
        <h3
          className={`${
            isMobile ? "text-lg" : "text-xl"
          } font-bold text-gray-800 mb-4`}
        >
          {data?.description || "Leadership Principles"}
        </h3>

        {data?.keyPoints && data.keyPoints.length > 0 ? (
          <div className="space-y-4">
            {data.keyPoints.map((point, index) => (
              <div key={index} className="flex items-start gap-3">
                <span>
                  <img
                    src="/images/grid-intel/lighting.png"
                    className="w-14 -mt-4"
                    alt="lighting"
                  />
                </span>{" "}
                <span
                  className={`text-gray-700 ${
                    isMobile ? "text-sm" : "text-lg"
                  }`}
                >
                  {point.replace(/\n/g, " ")}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <span className="text-green-600 text-xl mt-1">•</span>
              <span
                className={`text-gray-700 ${isMobile ? "text-sm" : "text-lg"}`}
              >
                Our leadership is PNG-rooted and globally aligned
              </span>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-green-600 text-xl mt-1">•</span>
              <span
                className={`text-gray-700 ${isMobile ? "text-sm" : "text-lg"}`}
              >
                We prioritize local capacity and decision-making autonomy
              </span>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-green-600 text-xl mt-1">•</span>
              <span
                className={`text-gray-700 ${isMobile ? "text-sm" : "text-lg"}`}
              >
                Every executive at GREEN has field experience, not just
                boardroom time
              </span>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-green-600 text-xl mt-1">•</span>
              <span
                className={`text-gray-700 ${isMobile ? "text-sm" : "text-lg"}`}
              >
                No ivory towers — we build where we live, and we stay where we
                work
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Quote Section */}
      <div className="mt-12 pt-8 border-t border-gray-300">
        <blockquote
          className={`${
            isMobile ? "text-base" : "text-xl"
          } capitalize font-bold text-center text-gray-800 italic leading-relaxed`}
        >
          {data?.quote ? (
            renderHighlightedText(
              data.quote.text,
              data.quote.highlightedText || data.quote.highlighted
            )
          ) : (
            <>
              "We don't just work on{" "}
              <span className="text-green-600">infrastructure.</span> We work on
              impact."
            </>
          )}
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
            <div className="bg-gray-100 h-[80vh] p-3 overflow-y-auto py-14 border-2 border-[#4CAF50] relative shadow-2xl">
              {/* Close Button */}
              <div className="flex justify-end w-full">
                <div {...closeButtonProps.getContainerProps()}>
                  <button
                    onClick={onClose}
                    className="cursor-pointer text-gray-600 hover:text-gray-800 text-2xl z-10"
                  >
                    <img src="/images/join-us/xicon.png" alt="Close Icon" />
                  </button>
                </div>
              </div>

              {/* Modal Content */}
              <div className="mx-auto">{renderContent()}</div>
            </div>
          ) : (
            /* Desktop Layout */
            <div
              className="bg-gray-100 transform  py-14 border-2 border-[#4CAF50] px-16 relative shadow-2xl"
              style={{ clipPath: "polygon(0 0, 95% 0, 100% 100%, 5% 100%)",
                transform:"skewX(-12deg)"
               }}
            >
              {/* Close Button */}
              <div className="flex justify-end w-full">
                <div {...closeButtonProps.getContainerProps()}>
                  <button
                    onClick={onClose}
                    style={{
                      transform:"skewX(12deg)"
                    }}
                    className="cursor-pointer text-gray-600 hover:text-gray-800 text-2xl z-10 transform "
                  >
                    <img src="/images/join-us/xicon.png" alt="Close Icon" />
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

export default OurLeadershipPhilosophy;
