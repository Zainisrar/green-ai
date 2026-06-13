"use client";
import React, { useState, useEffect } from "react";
import { useInteractiveZIndex } from "../../../../hooks/useInteractiveZIndex";

interface WhoWeAreData {
  img: {
    alt: string;
    src: string;
    highlighted: string;
  };
  quote: {
    text: string;
    highlighted: string;
  };
  title: string;
  title2: string;
  description: string;
  description2: string;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  data?: WhoWeAreData;
}

const WhoWeAre = ({ isOpen, onClose, data }: Props) => {
  const [isMobile, setIsMobile] = useState(false);
  const closeButtonProps = useInteractiveZIndex();

  // Mobile detection - initialize immediately
  useEffect(() => {
    const checkMobile = () => {
      if (typeof window !== 'undefined') {
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
    if (typeof window !== 'undefined' && window.innerWidth < 768) {
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

  const renderContent = () => (
    <>
      {/* Title Section */}
      <div className="mb-8">
        <h2 className="text-2xl lg:text-3xl font-black text-gray-800 mb-4">
          {data?.title || "Who We Are"}
        </h2>
        <div className="lg:flex items-center">
          {!isMobile && (
            <span className="text-2xl text-black font-bold mr-2">-</span>
          )}
          <h3 className="text-xl text-[#4CAF50] font-semibold">
            {data?.quote ? renderHighlightedText(data.quote.text, data.quote.highlighted) : 
             "We don't just work on infrastructure. We work on impact."}
          </h3>
        </div>
        <div className="w-full h-0.5 bg-gray-300 mt-4"></div>
      </div>

      {/* Content Layout - Text and Image */}
      <div className={`${isMobile ? 'flex flex-col space-y-6' : 'flex flex-col lg:flex-row items-start gap-8'}`}>
        {/* Image Column */}
        <div className={`${isMobile ? 'w-full' : 'w-5/12'}`}>
          <img
            src={data?.img?.src || "/images/team-green/who-we-are.png"}
            alt={data?.img?.alt || "Who We Are"}
            className="w-full rounded-lg"
          />
        </div>

        {/* Content Column */}
        <div className="flex-1 space-y-5">
          {/* Main Title */}
          <div className="flex items-start gap-3">
            <div className={`${isMobile ? 'text-base' : 'text-lg'} font-bold`}>
              <span className="text-gray-700">
                {data?.title2 || "GREEN is not just a solar EPC. We're a systems company built by thinkers and doers."}
              </span>
            </div>
          </div>

          {/* Description */}
          <div className="flex items-start gap-3">
            <div>
              <span className={`text-gray-700 ${isMobile ? 'text-sm' : 'text-base'}`}>
                {data?.description2 || "From mechatronics specialists and off-grid strategists to supply chain experts and field electricians, our team brings together world-class expertise and on-the-ground pragmatism — purpose-built for the Pacific."}
              </span>
            </div>
          </div>

          {/* Additional Description if available */}
          {data?.description && (
            <div className="flex items-start gap-3">
              <div>
                <span className={`text-gray-700 ${isMobile ? 'text-sm' : 'text-base'}`}>
                  {data.description}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Quote Section */}
      <div className="mt-12 pt-8 border-t border-gray-300">
        <blockquote className={`${isMobile ? 'text-base' : 'text-xl'} capitalize font-bold text-center text-gray-800 italic leading-relaxed`}>
          {data?.quote ? renderHighlightedText(data.quote.text, data.quote.highlighted) : 
           <>"We don't just work on <span className="text-green-600">infrastructure.</span> We work on impact."</>
          }
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
                transform:"skewX(6deg)"
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

export default WhoWeAre;