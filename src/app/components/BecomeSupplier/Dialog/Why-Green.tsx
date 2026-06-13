"use client";
import React, { useEffect } from "react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  keys?: string[];
  imgSrc?: string;
  imgAlt?: string;
}
const WhyGreen = ({
  isOpen,
  onClose,
  title = "Why GREEN?",
  keys,
  imgSrc = "/images/become-supplier/why-green-modal.png",
  imgAlt = "Why GREEN",
}: Props) => {
  if (!isOpen) return null;
  const [isMobile, setIsMobile] = React.useState(false);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // Example breakpoint for mobile
    };
    handleResize(); // Check on mount
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <React.Fragment>
      {/* Modal Overlay */}
      <div className="fixed inset-0 bg-black/20 z-50 flex items-center justify-center">
        {/* Modal Container */}
        <div className="relative w-full max-w-6xl mx-4">
          {/* Skewed Modal Background */}
     {
      isMobile?
           <div
            className="bg-gray-100 transform  py-14 border-2 border-[#4CAF50] px-4 relative shadow-2xl"
           
          >
            {/* Close Button */}
            <div className="flex justify-end w-full">
              <button
                onClick={onClose}
                className="   cursor-pointer text-gray-600 hover:text-gray-800 text-2xl z-10 "
              >
                <img src="/images/join-us/xicon.png" alt="Close Icon" />
              </button>
            </div>
            {/* Modal Content */}
            <div className="lg:max-w-5xl lg:mx-auto">
              {/* Title Section */}
              <div className="mb-8">
                <h2 className="text-3xl font-black text-gray-800 mb-4">
                  {title}
                </h2>
                <div className="w-full h-0.5 bg-gray-300 mt-4"></div>
              </div>

              {/* Content Layout - Text and Image */}
              <div className="flex flex-col lg:flex-row items-start gap-8">
                {/* Left Column - Benefits List */}
                <div className="flex-1 space-y-5">
                  {(keys && keys.length
                    ? keys
                    : [
                        "Supply certified, field-proven products",
                        "Demonstrate transparency, traceability, and reliability",
                        "Share our commitment to climate-resilient infrastructure",
                        "Can deliver to or within the Pacific region",
                        "Engage in continuous improvement & collaboration",
                      ]
                  ).map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <div className="flex-shrink-0 mt-1">
                        <img
                          src="/images/grid-intel/lighting.png"
                          className="w-14 -mt-4"
                          alt="lighting"
                        />
                      </div>
                      <span className="text-gray-700 text-sm leading-relaxed">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Right Column - Image */}
                <div className="lg:flex-shrink-0  lg:w-[450px] mt-10">
                  <img src={imgSrc} alt={imgAlt} className="w-full h-full" />
                </div>
              </div>
            </div>
          </div>:
               <div
            className="bg-gray-100 transform  py-14 border-2 border-[#4CAF50] px-16 relative shadow-2xl"
            style={{ clipPath: "polygon(0 0, 95% 0, 100% 100%, 5% 100%)",transform:"skewX(-12deg)" }}
          >
            {/* Close Button */}
            <div className="flex justify-end w-full">
              <button
                onClick={onClose}
                className="   cursor-pointer text-gray-600 hover:text-gray-800 text-2xl z-10 transform "
                style={{transform:"skewX(12deg)"}}
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
              {/* Title Section */}
              <div className="mb-8">
                <h2 className="text-3xl font-black text-gray-800 mb-4">
                  {title}
                </h2>
                <div className="w-full h-0.5 bg-gray-300 mt-4"></div>
              </div>

              {/* Content Layout - Text and Image */}
              <div className="flex flex-col lg:flex-row items-start gap-8">
                {/* Left Column - Benefits List */}
                <div className="flex-1 space-y-5">
                  {(keys && keys.length
                    ? keys
                    : [
                        "Supply certified, field-proven products",
                        "Demonstrate transparency, traceability, and reliability",
                        "Share our commitment to climate-resilient infrastructure",
                        "Can deliver to or within the Pacific region",
                        "Engage in continuous improvement & collaboration",
                      ]
                  ).map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <div className="flex-shrink-0 mt-1">
                        <img
                          src="/images/grid-intel/lighting.png"
                          className="w-14 -mt-4"
                          alt="lighting"
                        />
                      </div>
                      <span className="text-gray-700 text-sm leading-relaxed">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Right Column - Image */}
                <div className="flex-shrink-0 lg:w-[450px] mt-10">
                  <img src={imgSrc} alt={imgAlt} className="" />
                </div>
              </div>
            </div>
          </div>
     }
        </div>
      </div>
    </React.Fragment>
  );
};

export default WhyGreen;
