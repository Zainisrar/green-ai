"use client";
import React, { useEffect, useState } from "react";
import { useInvestorRelations } from "../../../../hooks/useInvestorRelations";

interface WhyInvestGreenProps {
  isOpen: boolean;
  onClose: () => void;
}

const WhyInvestGreen: React.FC<WhyInvestGreenProps> = ({ isOpen, onClose }) => {
  const { data } = useInvestorRelations();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!isOpen || !data) return null;

  const modalData = data.whyInvestGreen;

  const highlightText = (text: string, highlight: string) => {
    if (!highlight) return text;
    const highlightTerms = highlight.trim().split(/\s+/);
    const pattern = highlightTerms
      .map((term) => term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
      .join("|");
    const parts = text.split(new RegExp(`(${pattern})`, "gi"));
    return parts.map((part, index) => {
      const shouldHighlight = highlightTerms.some(
        (term) => part.toLowerCase() === term.toLowerCase()
      );
      return shouldHighlight ? (
        <span key={index} className="text-[#23B14D] font-bold">
          {part}
        </span>
      ) : (
        part
      );
    });
  };

  const renderContent = () => (
    <>
      {/* Title Section */}
      <div className="mb-8">
        <h2 className="text-2xl lg:text-3xl font-black text-gray-800 mb-4">
          {modalData.title}
        </h2>
        <div className="lg:flex items-center">
          {!isMobile && (
            <span className="text-2xl text-black font-bold mr-2">-</span>
          )}
          <h3 className="text-xl text-[#23B14D] font-semibold">
            {highlightText(modalData.headline, "GREEN")}
          </h3>
        </div>
        <div className="w-full h-0.5 bg-gray-300 mt-4"></div>
      </div>

      {/* Key Points Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-14 mb-8">
        {modalData.key.map((item, idx) => (
          <div
            key={idx}
            className="flex items-start gap-4"
          >
            <div className="">
              {item.icon.src ? (
                <img loading="lazy" decoding="async"
                  src={item.icon.src}
                  alt={item.icon.alt}
                  className="w-10"
                />
              ) : (
                <span className="text-2xl text-[#23B14D]">✓</span>
              )}
            </div>
            <p className="text-gray-800 font-medium flex-1">{item.text}</p>
          </div>
        ))}
      </div>

      {/* Quote Section */}
      <div className="mt-8 pt-6 text-center border-t border-gray-300">
        <p className="text-gray-800 font-bold text-lg italic">
          {highlightText(modalData.quote.text, modalData.quote.highlighted)}
        </p>
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
            <div className="bg-gray-100 h-[80vh] p-3 overflow-y-auto py-14 border-2 border-[#23B14D] relative shadow-2xl">
              {/* Close Button */}
              <div className="flex justify-end w-full">
                <button
                  onClick={onClose}
                  className="cursor-pointer text-gray-600 hover:text-gray-800 text-2xl z-10"
                >
                  <img loading="lazy" decoding="async" src="/images/join-us/xicon.png" alt="Close Icon" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="mx-auto">{renderContent()}</div>
            </div>
          ) : (
            /* Desktop Layout */
            <div
              className="bg-gray-100 transform  py-14 border-2 border-[#23B14D] px-16 relative shadow-2xl"
              style={{ clipPath: "polygon(0 0, 95% 0, 100% 100%, 5% 100%)",
                transform:"skewX(-12deg)"
               }}
            >
              {/* Close Button */}
              <div className="flex justify-end w-full">
                <button
                  onClick={onClose}
                  style={{
                    transform:"skewX(12deg)"
                  }}
                  className="cursor-pointer text-gray-600 hover:text-gray-800 text-2xl z-10 transform "
                >
                  <img loading="lazy" decoding="async" src="/images/join-us/xicon.png" alt="Close Icon" />
                </button>
              </div>

              {/* Modal Content */}
              <div
              style={{
                transform:"skeX(6deg)"
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

export default WhyInvestGreen;
