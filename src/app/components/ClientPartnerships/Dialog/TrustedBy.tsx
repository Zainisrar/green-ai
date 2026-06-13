"use client";

import React from "react";
import type { ClientPartnershipsTrustedBy } from "../../../lib/api";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  data?: ClientPartnershipsTrustedBy;
}
const TrustedBy = ({ isOpen, onClose, data }: Props) => {
  if (!isOpen) return null;

  const title = data?.title ?? "Trusted By";
  const subHeadline = data?.subHeadline ?? "We don't just build solar systems — we engineer energy impact.";
  
  const defaultIcons = [
    {
      alt: "Department of Petroleum and Energy PNG",
      src: "/images/client-partnerships/partners/dept-petroleum-energy.png"
    },
    {
      alt: "Department of National Planning and Monitoring PNG",
      src: "/images/client-partnerships/partners/dept-national-planning.png"
    },
    {
      alt: "United Nations Development Programme",
      src: "/images/client-partnerships/partners/undp.png"
    },
    {
      alt: "Pacific Power Association",
      src: "/images/client-partnerships/partners/pacific-power-association.png"
    },
    {
      alt: "Australian Aid",
      src: "/images/client-partnerships/partners/australian-aid.png"
    },
    {
      alt: "EU Green European Alliance",
      src: "/images/client-partnerships/partners/eu-green.png"
    }
  ];

  const icons = data?.icons ?? defaultIcons;
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
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
        <div className="relative w-full lg:max-w-6xl mx-4">
          {/* Skewed Modal Background */}
       {
        isMobile?
            <div 
            className="bg-white h-[80vh] overflow-y-auto py-14 border-2 border-[#4CAF50] px-4 relative shadow-2xl"
          >
            {/* Close Button */}
          <div className='flex justify-end w-full'>
            <button 
              onClick={onClose}
              className="cursor-pointer text-gray-600 hover:text-gray-800 text-2xl z-10 "
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
                <div className="flex items-center">
                  <span className="text-2xl text-black font-bold mr-2">-</span>
                  <h3 className="text-xl text-[#4CAF50] font-semibold">
                    {subHeadline}
                  </h3>
                </div>
                <div className="w-full h-0.5 bg-gray-300 mt-4"></div>
              </div>

              {/* Partners Logo Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-8 items-center justify-items-center">
                {icons.map((icon, idx) => (
                  <div key={idx} className="flex flex-col items-center">
                    <img 
                      src={icon.src}
                      alt={icon.alt}
                      className="h-20 object-contain"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>:
              <div
               
            className="bg-white transform  py-14 border-2 border-[#4CAF50] px-16 relative shadow-2xl"
            style={{ clipPath: 'polygon(0 0, 95% 0, 100% 100%, 5% 100%)',
              transform:"skewX(-12deg)"
             }}
          >
            {/* Close Button */}
          <div className='flex justify-end w-full'>
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
              {/* Title Section */}
              <div className="mb-8">
                <h2 className="text-3xl font-black text-gray-800 mb-4">
                  {title}
                </h2>
                <div className="flex items-center">
                  <span className="text-2xl text-black font-bold mr-2">-</span>
                  <h3 className="text-xl text-[#4CAF50] font-semibold">
                    {subHeadline}
                  </h3>
                </div>
                <div className="w-full h-0.5 bg-gray-300 mt-4"></div>
              </div>

              {/* Partners Logo Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-8 items-center justify-items-center">
                {icons.map((icon, idx) => (
                  <div key={idx} className="flex flex-col items-center">
                    <img 
                      src={icon.src}
                      alt={icon.alt}
                      className="h-20 object-contain"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
       }
        </div>
      </div>
    </React.Fragment>
  );
};

export default TrustedBy;
