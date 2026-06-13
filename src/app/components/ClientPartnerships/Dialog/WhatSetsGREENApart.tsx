"use client";

import React, { useEffect, useState } from "react";
import type { ClientPartnershipsWhatSetsGreenApart } from "../../../lib/api";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  data?: ClientPartnershipsWhatSetsGreenApart;
}
const WhatSetsGREENApart = ({ isOpen, onClose, data }: Props) => {
  if (!isOpen) return null;

  const title = data?.title ?? "What Sets GREEN Apart";
  const subHeadline = data?.subHeadline ?? "Strategic Clients. Transformational Outcomes.";
  
  const defaultItems = [
    {
      greenDelivers: "Track record in hard-to-reach zones",
      othersPromise: "Marketing slides"
    },
    {
      greenDelivers: "In-house execution, no over-subcontracting",
      othersPromise: "Outsourced chaos"
    },
    {
      greenDelivers: "GRID-INTEL™ platform with every system",
      othersPromise: "Static installations"
    },
    {
      greenDelivers: "High uptime. Low maintenance. Localized O&M",
      othersPromise: "Unplanned breakdowns"
    },
    {
      greenDelivers: "Full post-handover support ecosystem",
      othersPromise: "Silence after delivery"
    }
  ];

  const items = data?.items ?? defaultItems;
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
            <div className="">
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

              {/* Main Content - Two Columns */}
              <div className="lg:flex space-x-12">
                {/* Left Column - GREEN DELIVERS */}
                <div className="flex-1">
                  <div className=" mb-6">
                    <h3 className="text-2xl font-bold text-[#4CAF50]">
                      GREEN DELIVERS
                    </h3>
                  </div>
                  
                  <div className="space-y-4 my-4">
                    {items.map((item, idx) => (
                      <div key={idx} className="">
                        <p className="text-gray-800 font-medium text-lg">
                          {item.greenDelivers}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right Column - OTHERS PROMISE */}
                <div className="flex-1">
                  <div className="mb-6">
                    <h3 className="text-2xl font-bold text-[#4CAF50]">
                      OTHERS PROMISE
                    </h3>
                  </div>
                  
                  <div className="space-y-4 my-4">
                    {items.map((item, idx) => (
                      <div key={idx} className="">
                        <p className="text-gray-800 font-medium text-lg">
                          {item.othersPromise}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          :
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

              {/* Main Content - Two Columns */}
              <div className="flex space-x-12">
                {/* Left Column - GREEN DELIVERS */}
                <div className="flex-1">
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold text-[#4CAF50]">
                      GREEN DELIVERS
                    </h3>
                  </div>
                  
                  <div className="space-y-4">
                    {items.map((item, idx) => (
                      <div key={idx} className="text-center">
                        <p className="text-gray-800 font-medium text-lg">
                          {item.greenDelivers}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right Column - OTHERS PROMISE */}
                <div className="flex-1">
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold text-[#4CAF50]">
                      OTHERS PROMISE
                    </h3>
                  </div>
                  
                  <div className="space-y-4">
                    {items.map((item, idx) => (
                      <div key={idx} className="text-center">
                        <p className="text-gray-800 font-medium text-lg">
                          {item.othersPromise}
                        </p>
                      </div>
                    ))}
                  </div>
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

export default WhatSetsGREENApart;
