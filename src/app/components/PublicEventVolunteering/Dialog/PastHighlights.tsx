"use client";
import React, { useEffect, useState } from "react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}
const PastHighlights = ({ isOpen, onClose }: Props) => {
  if (!isOpen) return null;

  return (
    <React.Fragment>
      {/* Modal Overlay */}
      <div className="fixed inset-0 bg-black/20 z-[999999999999999999] flex items-center justify-center">
        {/* Modal Container */}
        <div className="relative w-full max-w-6xl mx-4">
          {/* Skewed Modal Background */}
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
            className="transform  max-w-5xl mx-auto">
              {/* Header */}
              <div className="mb-10">
                <h2 className="text-4xl font-bold text-gray-800 mb-4">
                  Past Highlights
                </h2>
                <div className="w-full h-px bg-gray-400 mb-8"></div>
              </div>

              {/* Gallery Grid */}
              <div className="grid grid-cols-4 gap-6 mb-8">
                {/* Solar Literacy Drive */}
                <div className="space-y-3">
                  <div className="relative">
                    <img 
                      src="/images/public-events-volunteering/solar-literacy.png" 
                      alt="Solar Literacy Drive" 
                      
                    />
                    {/* Play Button Overlay */}
                    <div className="absolute inset-0  cursor-pointer flex items-center justify-center">
                      <div className="w-10 h-10 bg-white/80 rounded-full flex items-center justify-center">
                        <div className="w-0 h-0 border-l-[8px] border-l-gray-700 border-y-[6px] border-y-transparent ml-1"></div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 text-sm mb-1">
                      Solar Literacy Drive
                    </h3>
                    <p className="text-gray-600 text-xs italic mb-1">
                      – Eastern Highlands
                    </p>
                    <p className="text-[#23B14D] text-xs font-medium">
                      – 2024
                    </p>
                  </div>
                </div>

                {/* Women In Energy */}
                <div className="space-y-3">
                  <div className="relative">
                    <img 
                      src="/images/public-events-volunteering/women-in-energy.png" 
                      alt="Women In Energy" 
                    />
                    {/* Play Button Overlay */}
                    <div className="absolute inset-0 cursor-pointer flex items-center justify-center">
                      <div className="w-10 h-10 bg-white/80 rounded-full flex items-center justify-center">
                        <div className="w-0 h-0 border-l-[8px] border-l-gray-700 border-y-[6px] border-y-transparent ml-1"></div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 text-sm mb-1">
                      Women In Energy
                    </h3>
                    <p className="text-gray-600 text-xs italic mb-1">
                      – Madang Installation Workshop
                    </p>
                    <p className="text-[#23B14D] text-xs font-medium">
                      – 2023
                    </p>
                  </div>
                </div>

                {/* Village Grid Demo Days */}
                <div className="space-y-3">
                  <div className="relative">
                    <img 
                      src="/images/public-events-volunteering/grid-demo-guys.png" 
                      alt="Village Grid Demo Days" 
                    />
                    {/* Play Button Overlay */}
                    <div className="absolute inset-0 cursor-pointer flex items-center justify-center">
                      <div className="w-10 h-10  bg-white/80 rounded-full flex items-center justify-center">
                        <div className="w-0 h-0 border-l-[8px] border-l-gray-700 border-y-[6px] border-y-transparent ml-1"></div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 text-sm mb-1">
                      Village Grid Demo Days
                    </h3>
                    <p className="text-gray-600 text-xs italic mb-1">
                      – Milne Bay
                    </p>
                    <p className="text-[#23B14D] text-xs font-medium">
                      – 2022
                    </p>
                  </div>
                </div>

                {/* Plastic-To-Power Campaign */}
                <div className="space-y-3">
                  <div className="relative">
                    <img 
                      src="/images/public-events-volunteering/plastic-to-power-campaign.png" 
                      alt="Plastic-To-Power Campaign" 
                      
                    />
                    {/* Play Button Overlay */}
                    <div className="absolute inset-0 cursor-pointer flex items-center justify-center">
                      <div className="w-10 h-10 bg-white/80 rounded-full flex items-center justify-center">
                        <div className="w-0 h-0 border-l-[8px] border-l-gray-700 border-y-[6px] border-y-transparent ml-1"></div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 text-sm mb-1">
                      Plastic-To-Power Campaign
                    </h3>
                    <p className="text-gray-600 text-xs italic mb-1">
                      – Port Moresby
                    </p>
                    <p className="text-[#23B14D] text-xs font-medium">
                      – 2022
                    </p>
                  </div>
                </div>
              </div>

              {/* Bottom Link */}
              <div className="text-right mt-12">
                <p className="text-gray-700 text-lg">
                  <span className="italic">Browse the</span> <a href="#" className="text-[#23B14D] font-medium underline hover:text-[#1B8F3A]">GREEN Events Gallery →</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default PastHighlights;
