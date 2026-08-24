"use client";
import React, { useEffect, useState } from "react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}
const WhyWeEngage = ({ isOpen, onClose }: Props) => {
  if (!isOpen) return null;

  return (
    <React.Fragment>
      {/* Modal Overlay */}
      <div className="fixed inset-0 bg-black/20 z-[99999999999999] flex items-center justify-center">
        {/* Modal Container */}
        <div className="relative w-full max-w-6xl mx-4">
          {/* Skewed Modal Background */}
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
                className="   cursor-pointer text-gray-600 hover:text-gray-800 text-2xl z-10 transform "
              >
                <img loading="lazy" decoding="async" src="/images/join-us/xicon.png" alt="Close Icon" />
              </button>
            </div>
            {/* Modal Content */}
            <div
            style={{
              transform:"skewX(6deg)"
            }}
            className="transform  max-w-5xl mx-auto">
              {/* Header */}
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-4">
                  Why We Engage
                </h2>
                <div className="flex items-center mb-6">
                  <span className="text-xl font-black mr-2">-</span>
                  <p className="text-[#23B14D] text-lg font-medium italic">
                    "Our mission isn't just to install systems — it's to shift systems"
                  </p>
                </div>
              </div>

              {/* Main Content Layout */}
              <div className="flex gap-8 items-start">
                {/* Left Column - Text Content */}
                <div className="flex-1">
                  <div className="space-y-4 mb-8">
                    <p className="text-gray-700 leading-relaxed">
                      Our mission isn't just to install systems<br />
                      — <span className="font-semibold">it's to shift systems</span>. And for that, we need people power:<br />
                      informed, inspired, and involved.
                    </p>
                    
                    <p className="text-gray-700 leading-relaxed">
                      Whether you're a student, teacher, village leader, or climate advocate<br />
                      — <span className="font-semibold">there's a place for you in GREEN's growing movement</span>.
                    </p>
                  </div>

                  {/* Bottom Quote */}
                 
                </div>

                {/* Right Column - Solar Panel Image */}
                <div className="flex-shrink-0">
                  <img loading="lazy" decoding="async" 
                    src="/images/public-events-volunteering/why-we-engage-model.png" 
                    alt="Solar panel installation" 
                    className="w-96"
                  />
                </div>
              </div>
               <div className="mt-12 text-center">
                    <p className="text-gray-800 font-medium italic text-lg">
                      "Our Mission Isn't Just To Install Systems — It's To Shift Systems"
                    </p>
                  </div>
            </div>
          
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default WhyWeEngage;
