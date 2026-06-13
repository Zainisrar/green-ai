"use client";
import React, { useEffect } from "react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  keys?: string[];
}
const WhatYouNeed = ({ isOpen, onClose, title = "What You'll Need", keys }: Props) => {
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
        {isMobile? 
         <div className="relative w-full max-w-6xl mx-4">
          {/* Skewed Modal Background */}
          
          <div
            className="bg-gray-100 py-14 border-2 border-[#4CAF50] px-4 relative shadow-2xl"
            
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
            <div className="max-w-5xl mx-auto">
              {/* Title Section */}
              <div className="mb-8">
                <h2 className="text-3xl font-black text-gray-800 mb-4">
                  {title}
                </h2>
                <div className="w-full h-0.5 bg-gray-300 mt-4"></div>
              </div>

              {/* Requirements Grid (dynamic two-column) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {(keys && keys.length ? keys : [
                  "Company registration details & country of operation",
                  "Product categories & technical datasheets",
                  "ISO/IEC certifications (if available)",
                  "Previous EPC or supply chain experience",
                  "Warranty and after-sales support details",
                  "Sustainability credentials (optional)",
                ]).map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-1">
                      <img src="/images/grid-intel/lighting.png" className="w-14 -mt-4" alt="lighting" />
                    </div>
                    <span className="text-gray-700 text-sm leading-relaxed">{item}</span>
                  </div>
                ))}
              </div>
            </div>
        
          </div>
        </div>:
        <div className="relative w-full max-w-6xl mx-4">
          {/* Skewed Modal Background */}
          
          <div
            className="bg-gray-100 transform  py-14 border-2 border-[#4CAF50] px-16 relative shadow-2xl"
            style={{ clipPath: "polygon(0 0, 95% 0, 100% 100%, 5% 100%)",transform:"skewX(-12deg)" }}
          >
            {/* Close Button */}
            <div className="flex justify-end w-full">
              <button
                onClick={onClose}
                style={{transform:"skewX(12deg)"}}
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
            className="transform  max-w-5xl mx-auto">
              {/* Title Section */}
              <div className="mb-8">
                <h2 className="text-3xl font-black text-gray-800 mb-4">
                  {title}
                </h2>
                <div className="w-full h-0.5 bg-gray-300 mt-4"></div>
              </div>

              {/* Requirements Grid (dynamic two-column) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {(keys && keys.length ? keys : [
                  "Company registration details & country of operation",
                  "Product categories & technical datasheets",
                  "ISO/IEC certifications (if available)",
                  "Previous EPC or supply chain experience",
                  "Warranty and after-sales support details",
                  "Sustainability credentials (optional)",
                ]).map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-1">
                      <img src="/images/grid-intel/lighting.png" className="w-14 -mt-4" alt="lighting" />
                    </div>
                    <span className="text-gray-700 text-sm leading-relaxed">{item}</span>
                  </div>
                ))}
              </div>
            </div>
        
          </div>
        </div>
      }
        
      </div>
    </React.Fragment>
  );
};

export default WhatYouNeed;
