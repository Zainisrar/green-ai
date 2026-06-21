"use client";

import React from "react";
import ClientInfoModal from "@/app/components/ClientPartnerships/Dialog/ClientInfoModal";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const categories = [
  { category: "Solar PV Modules", examples: "Tier 1 mono PERC, bifacial, floating PV" },
  { category: "Inverters & Controllers", examples: "Grid-tied, hybrid, off-grid, MPPTs" },
  { category: "Battery Storage Systems", examples: "LiFePO₄, Lithium-ion, flow batteries" },
  { category: "Mounting & Cabling", examples: "Structural steel/aluminum, weather-rated connectors" },
  { category: "Monitoring Systems", examples: "Smart meters, sensors, IoT gateways" },
  { category: "Mini-grid Hardware", examples: "Hybrid controllers, gensets, ATS" },
  { category: "AC Infrastructure", examples: "Switchgear, panels, protection relays" },
  { category: "Tools, PPE & Field Gear", examples: "Specialized equipment for field teams" },
  { category: "Electrical & Civil Works", examples: "Conduits, trenches, earthwork kits" },
];

const KeySupplyCategories = ({ isOpen, onClose }: Props) => {
  return (
    <ClientInfoModal isOpen={isOpen} onClose={onClose}>
      <div className="mb-6 sm:mb-8">
        <h2 className="text-2xl font-black text-gray-800 sm:text-3xl">
          Key Supply Categories
        </h2>
        <div className="mt-2 flex items-center">
          <span className="mr-2 text-2xl font-bold text-black">-</span>
          <h3 className="text-lg font-semibold text-[#4CAF50] sm:text-xl">
            We work with vendors who deliver
          </h3>
        </div>
        <div className="mt-4 h-0.5 w-full bg-gray-300" />
      </div>

      <div className="grid grid-cols-[auto_1fr] gap-x-8 gap-y-4 sm:gap-x-16">
        <span className="text-lg font-bold text-[#23B14D]">Category</span>
        <span className="text-lg font-bold text-[#23B14D]">Examples</span>
        {categories.map((row, idx) => (
          <React.Fragment key={idx}>
            <span className="text-sm font-semibold text-gray-800 sm:text-base">
              {row.category}
            </span>
            <span className="text-sm text-gray-600 sm:text-base">
              {row.examples}
            </span>
          </React.Fragment>
        ))}
      </div>
    </ClientInfoModal>
  );
};

export default KeySupplyCategories;
