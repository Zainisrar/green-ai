"use client";
import React from "react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  keys: { title: string; description: string }[];
  img: { alt: string; src: string };
}
const WhatThisMeansforClients = ({ isOpen, onClose, title, keys, img }: Props) => {
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // Example breakpoint for mobile
    };
    handleResize(); // Check on mount
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!isOpen) return null;

  return (
    <React.Fragment>
      {/* Modal Overlay */}
      <div className="fixed inset-0 bg-black/20 z-50 flex items-center justify-center">
        {/* Modal Container */}
        <div className="relative w-full lg:max-w-6xl mx-4">
          {/* Skewed Modal Background */}
        {
          isMobile?
            <div
            className="bg-gray-100 h-[80vh] overflow-y-auto py-14 border-2 border-[#4CAF50] px-4 relative shadow-2xl"
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
            <div className="">
              {/* Title Section */}
              <div className="mb-8">
                <h2 className="text-3xl font-black text-gray-800 mb-4">
                  {title || "What This Means for Clients"}
                </h2>
                <div className="w-full h-0.5 bg-gray-300 mt-4"></div>
              </div>

              {/* Content Layout - Text and Image */}
              <div className="flex flex-col lg:flex-row items-start gap-8">
                {/* Left Column - Client Benefits */}
                <div className="flex-1 space-y-6">
                  {keys?.map((k, idx) => (
                    <div key={`${k.title}-${idx}`} className="">
                      <div className="flex items-start ">
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
                          <h3 className="text-lg font-bold text-gray-800">
                            {k.title}
                          </h3>
                          <p className="text-gray-600 text-sm leading-relaxed italic ">
                            {k.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Right Column - Handshake Image */}
                <div className="flex-shrink-0 lg:w-[400px] mt-8">
                  {img?.src ? (
                    <img src={img.src} alt={img.alt || "Client Partnership"} />
                  ) : (
                    <img 
                      src="/images/industry-affiliations-certifications/WhatThisMeansforClients.png" 
                      alt="Client Partnership"
                    />
                  )}
                </div>
              </div>
            </div>
          
          </div>
          :
            <div
            
            className="bg-gray-100 transform py-14 border-2 border-[#4CAF50] px-16 relative shadow-2xl"
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
                className="   cursor-pointer text-gray-600 hover:text-gray-800 text-2xl z-10 transform "
              >
                <img src="/images/join-us/xicon.png" alt="Close Icon" />
              </button>
            </div>
            {/* Modal Content */}
            <div
            style={{
              transform:"skewX(6deg)"
            }}
            className="transform max-w-5xl mx-auto">
              {/* Title Section */}
              <div className="mb-8">
                <h2 className="text-3xl font-black text-gray-800 mb-4">
                  {title || "What This Means for Clients"}
                </h2>
                <div className="w-full h-0.5 bg-gray-300 mt-4"></div>
              </div>

              {/* Content Layout - Text and Image */}
              <div className="flex flex-col lg:flex-row items-start gap-8">
                {/* Left Column - Client Benefits */}
                <div className="flex-1 space-y-6">
                  {keys?.map((k, idx) => (
                    <div key={`${k.title}-${idx}`} className="">
                      <div className="flex items-start ">
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
                          <h3 className="text-lg font-bold text-gray-800">
                            {k.title}
                          </h3>
                          <p className="text-gray-600 text-sm leading-relaxed italic ">
                            {k.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Right Column - Handshake Image */}
                <div className="flex-shrink-0 lg:w-[400px] mt-8">
                  {img?.src ? (
                    <img src={img.src} alt={img.alt || "Client Partnership"} />
                  ) : (
                    <img 
                      src="/images/industry-affiliations-certifications/WhatThisMeansforClients.png" 
                      alt="Client Partnership"
                    />
                  )}
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

export default WhatThisMeansforClients;
