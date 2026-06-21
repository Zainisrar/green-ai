"use client";

import React from "react";
import ClientInfoModal from "@/app/components/ClientPartnerships/Dialog/ClientInfoModal";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const expectations = [
  "Rapid Deployment In High-Need Zones",
  "Turnkey Infrastructure Delivery",
  "Verifiable Impact Data",
  "Zero Greenwashing — All Action, No Noise",
  "Built-In Community Engagement",
];

const WhatYouCanExpect = ({ isOpen, onClose }: Props) => {
  return (
    <ClientInfoModal isOpen={isOpen} onClose={onClose}>
      <div className="mb-6 sm:mb-8">
        <h2 className="text-2xl font-black text-gray-800 sm:text-3xl">
          What You Can Expect
        </h2>
        <div className="mt-2 flex items-center">
          <span className="mr-2 text-2xl font-bold text-black">-</span>
          <h3 className="text-lg font-semibold text-[#4CAF50] sm:text-xl">
            We don&apos;t just build solar systems — we engineer energy impact.
          </h3>
        </div>
        <div className="mt-4 h-0.5 w-full bg-gray-300" />
      </div>

      <div className="grid grid-cols-1 gap-x-10 gap-y-6 md:grid-cols-2">
        {expectations.map((item, idx) => (
          <div key={idx} className="flex items-center gap-3">
            <img
              src="/images/grid-intel/lighting.png"
              className="w-12 shrink-0"
              alt="lighting"
            />
            <p className="text-base font-semibold italic text-gray-800 sm:text-lg">
              {item}
            </p>
          </div>
        ))}
      </div>
    </ClientInfoModal>
  );
};

export default WhatYouCanExpect;
