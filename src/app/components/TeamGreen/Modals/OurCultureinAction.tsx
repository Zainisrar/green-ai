"use client";
import React, { useState, useEffect } from "react";
import { useInteractiveZIndex } from "../../../../hooks/useInteractiveZIndex";

interface CultureActionData {
  img: string;
  keys: any[];
  quote: string;
  title: string;
  keypoint: string[];
  description: string;
  quoteHighlighted: string;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  data?: CultureActionData;
}

const OurCultureinAction = ({ isOpen, onClose, data }: Props) => {
  const [isMobile, setIsMobile] = useState(false);
  const closeButtonProps = useInteractiveZIndex();

  // Mobile detection
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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

  const renderContent = () => (
    <>
      {/* Title Section */}
      <div className="mb-8">
        <h2 className="text-2xl lg:text-3xl font-black text-gray-800 mb-4">
          {data?.title || "Our Culture in Action"}
        </h2>
        <div className="lg:flex items-center">
          {!isMobile && (
            <span className="text-2xl text-black font-bold mr-2">-</span>
          )}
          <h3 className="text-xl text-[#4CAF50] font-semibold">
            {data?.description || "What defines Team GREEN?"}
          </h3>
        </div>
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
        {/* Image Column */}
      

        {/* Content Column */}
        <div className="flex-1 space-y-5">
          {/* Key Points */}
          {data?.keypoint && data.keypoint.length > 0 ? (
            data.keypoint.map((point, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="flex-shrink-0 mt-1">
                  <span>
                    <img
                      src="/images/grid-intel/lighting.png"
                      className="w-14 -mt-4"
                      alt="lighting"
                    />
                  </span>{" "}
                </div>
                <div>
                  <span
                    className={`text-gray-700 ${
                      isMobile ? "text-sm" : "text-lg"
                    } font-semibold`}
                  >
                    {point}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <>
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 mt-1">
                  <span className="text-green-600 text-xl">•</span>
                </div>
                <div>
                  <span
                    className={`text-gray-700 ${
                      isMobile ? "text-sm" : "text-lg"
                    } font-semibold`}
                  >
                    Precision with humility
                  </span>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 mt-1">
                  <span className="text-green-600 text-xl">•</span>
                </div>
                <div>
                  <span
                    className={`text-gray-700 ${
                      isMobile ? "text-sm" : "text-lg"
                    } font-semibold`}
                  >
                    Skilling the next gen
                  </span>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 mt-1">
                  <span className="text-green-600 text-xl">•</span>
                </div>
                <div>
                  <span
                    className={`text-gray-700 ${
                      isMobile ? "text-sm" : "text-lg"
                    } font-semibold`}
                  >
                    Celebrating system switch-ons
                  </span>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 mt-1">
                  <span className="text-green-600 text-xl">•</span>
                </div>
                <div>
                  <span
                    className={`text-gray-700 ${
                      isMobile ? "text-sm" : "text-lg"
                    } font-semibold`}
                  >
                    Solving in real-time
                  </span>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 mt-1">
                  <span className="text-green-600 text-xl">•</span>
                </div>
                <div>
                  <span
                    className={`text-gray-700 ${
                      isMobile ? "text-sm" : "text-lg"
                    } font-semibold`}
                  >
                    Showing up — rain or remote
                  </span>
                </div>
              </div>
            </>
          )}
        </div>
          {data?.img && (
          <div className={`${isMobile ? "w-full" : "w-7/12"}`}>
            <img
              src={data.img}
              alt="Our Culture in Action"
              className="w-full "
            />
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
            renderHighlightedText(data.quote, data.quoteHighlighted)
          ) : (
            <>
              "Team <span className="text-green-600">GREEN</span> doesn't clock
              in. We show up — because lives depend on it."
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

export default OurCultureinAction;
