"use client";
import React from "react";
import GridIntelInfoModal from "./GridIntelInfoModal";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const WhyIntel = ({ isOpen, onClose }: Props) => {
  if (!isOpen) return null;

  return (
    <GridIntelInfoModal isOpen={isOpen} onClose={onClose}>
      <div className="mb-8">
        <h2 className="mb-2 text-3xl font-black leading-tight text-gray-800 lg:text-4xl">
          Why GRID-INTEL™{" "}
          <span className="text-xl text-[#4CAF50] lg:text-2xl">- Is Different</span>
        </h2>
      </div>

      <div className="overflow-x-auto">
        <div className="min-w-[640px]">
          <div className="grid grid-cols-3">
            <div className="px-4 py-3 font-bold text-[#4CAF50] sm:px-6 sm:py-4">Feature</div>
            <div className="px-4 py-3 font-bold text-[#4CAF50] sm:px-6 sm:py-4">GRID-INTEL™</div>
            <div className="px-4 py-3 font-bold text-[#4CAF50] sm:px-6 sm:py-4">Conventional Controllers</div>
          </div>

          {[
            ["Predictive load forecasting", "Integrated", "Not Available"],
            ["Hybrid source optimization", "Multi-input real-time control", "Manual or static logic"],
            ["Remote telemetry & diagnostics", "Fully enabled", "Rare or unsupported"],
            ["Modular architecture", "Plug & scale", "Proprietary and rigid"],
            ["Renewable prioritization", "Configured as default logic", "Diesel-centric fallback"],
          ].map(([feature, gridIntel, conventional]) => (
            <div key={feature} className="grid grid-cols-3 border-t border-gray-200">
              <div className="px-4 py-3 font-medium text-gray-800 sm:px-6 sm:py-4">{feature}</div>
              <div className="px-4 py-3 text-gray-800 sm:px-6 sm:py-4">{gridIntel}</div>
              <div className="px-4 py-3 text-gray-800 sm:px-6 sm:py-4">{conventional}</div>
            </div>
          ))}
        </div>
      </div>
    </GridIntelInfoModal>
  );
};

export default WhyIntel;
