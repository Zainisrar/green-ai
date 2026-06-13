"use client";
import React, { useEffect, useState } from "react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}
const WhyIntel = ({ isOpen, onClose }: Props) => {
  if (!isOpen) return null;

  return (
    <React.Fragment>
      {/* Modal Overlay */}
      <div className="fixed inset-0 bg-black/20 z-[99999999999999999999999999] flex items-center justify-center">
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
              {/* Title Section */}
              <div className="mb-8">
                <h2 className="text-4xl font-bold text-gray-800 mb-2">
                  Why GRID-INTEL™{" "}
                  <span className="text-[#4CAF50] text-2xl">
                    - Is Different
                  </span>
                </h2>
              </div>

              {/* Comparison Table */}
              <div className="overflow-hidden ">
                {/* Table Header */}
                <div className="grid grid-cols-3 ">
                  <div className="px-6 py-4 r font-bold text-[#4CAF50] ">
                    Feature
                  </div>
                  <div className="px-6 py-4  font-bold text-[#4CAF50] ">
                    GRID-INTEL™
                  </div>
                  <div className="px-6 py-4 r font-bold text-[#4CAF50]">
                    Conventional Controllers
                  </div>
                </div>

                {/* Table Rows */}
                <div className="">
                  {/* Row 1 */}
                  <div className="grid grid-cols-3 ">
                    <div className="px-6 py-4 font-medium text-gray-800 ">
                      Predictive load forecasting
                    </div>
                    <div className="px-6 py-4  text-gray-800 ">
                      Integrated
                    </div>
                    <div className="px-6 py-4  text-gray-800">
                      Not Available
                    </div>
                  </div>

                  {/* Row 2 */}
                  <div className="grid grid-cols-3 ">
                    <div className="px-6 py-4 font-medium text-gray-800 ">
                      Hybrid source optimization
                    </div>
                    <div className="px-6 py-4  text-gray-800 ">
                      Multi-input real-time control
                    </div>
                    <div className="px-6 py-4  text-gray-800">
                      Manual or static logic
                    </div>
                  </div>

                  {/* Row 3 */}
                  <div className="grid grid-cols-3 ">
                    <div className="px-6 py-4 font-medium text-gray-800 ">
                      Remote telemetry & diagnostics
                    </div>
                    <div className="px-6 py-4  text-gray-800 ">
                      Fully enabled
                    </div>
                    <div className="px-6 py-4  text-gray-800">
                      Rare or unsupported
                    </div>
                  </div>

                  {/* Row 4 */}
                  <div className="grid grid-cols-3 ">
                    <div className="px-6 py-4 font-medium text-gray-800 ">
                      Modular architecture
                    </div>
                    <div className="px-6 py-4  text-gray-800 ">
                      Plug & scale
                    </div>
                    <div className="px-6 py-4  text-gray-800">
                      Proprietary and rigid
                    </div>
                  </div>

                  {/* Row 5 */}
                  <div className="grid grid-cols-3">
                    <div className="px-6 py-4 font-medium text-gray-800 ">
                      Renewable prioritization
                    </div>
                    <div className="px-6 py-4  text-gray-800 ">
                      Configured as default logic
                    </div>
                    <div className="px-6 py-4  text-gray-800">
                      Diesel-centric fallback
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default WhyIntel;
