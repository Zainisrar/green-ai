"use client";
import React, { useEffect, useState } from "react";

interface Image {
  alt: string;
  src: string;
}

interface Quote {
  text: string;
  highlighted: string;
}

interface WhatWeWontCompromiseData {
  img: Image;
  keys: string[];
  quote: Quote;
  title: string;
}

interface Props {
    isOpen: boolean;
    onClose: () => void;
    data?: WhatWeWontCompromiseData;
}
const Compromise = (
    { isOpen, onClose, data }: Props
) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const renderContent = () => (
    <>
      {/* Title Section */}
      <div className="mb-8">
        <h2 className="text-2xl lg:text-3xl font-black text-gray-800 mb-4">
          {data?.title || "What We Won't Compromise"}
        </h2>
        <div className="w-full h-0.5 bg-gray-300 mt-4"></div>
      </div>

      {/* Main Content */}
      <div className={`${isMobile ? 'space-y-8' : 'flex items-start space-x-12'}`}>
        {/* Content List */}
        <div className="flex-1">
          <div className="space-y-6">
            {(data?.keys || [
              "Unproven manufacturers",
              "Incomplete warranties or weak after-sales",
              "Lack of compliance with IEC, ISO, or local grid standards",
              "High failure rates in humid/tropical stress environments",
              "Vendor opacity or inconsistent documentation"
            ]).map((key, index) => (
              <div key={index} className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <img src="/images/grid-intel/lighting.png" className='w-10 lg:w-14 -mt-2 lg:-mt-4' alt="lighting" />
                </div>
                <p className="text-gray-800 font-medium text-base lg:text-lg">
                  {key}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Image */}
        <div className="flex-shrink-0">
          <div className="relative">
            <img 
              src={data?.img?.src || "/images/our-procurement-philosophy/compromiseDialog.png"}
              alt={data?.img?.alt || "Solar panel field"}
              className={`${isMobile ? 'w-full max-w-sm mx-auto' : 'w-[500px]'} ${!isMobile && 'mt-10'}`}
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = "/images/our-procurement-philosophy/compromiseDialog.png";
              }}
            />
          </div>
        </div>
      </div>

      {/* Bottom Quote */}
      <div className="mt-8 lg:mt-12 text-center">
        <p className="text-gray-800 font-bold text-lg lg:text-xl italic">
          {data?.quote?.highlighted ? (
            <>
              {data.quote.text.split(data.quote.highlighted)[0]}
              <span className="text-[#4CAF50]">{data.quote.highlighted}</span>
              {data.quote.text.split(data.quote.highlighted)[1]}
            </>
          ) : (
            <>If it can't stand the test of time, it doesn't belong in a <span className="text-[#4CAF50]">GREEN</span> system.</>
          )}
        </p>
      </div>
    </>
  );

  if (!isOpen) return null;

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
                <button
                  onClick={onClose}
                  className="cursor-pointer text-gray-600 hover:text-gray-800 text-2xl z-10"
                >
                  <img src="/images/join-us/xicon.png" alt="Close Icon" />
                </button>
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
  )
}

export default Compromise