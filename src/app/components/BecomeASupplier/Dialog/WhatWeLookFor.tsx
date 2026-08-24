"use client";

import React from "react";
import ClientInfoModal from "@/app/components/ClientPartnerships/Dialog/ClientInfoModal";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const criteria = [
  "ISO-Compliant, Tested Technologies",
  "Competitive Pricing With Lifecycle Value",
  "Verified Supply Chain Traceability",
  "Clean Record In Ethical And Sustainable Practices",
  "Strong Logistics And Last-Mile Support",
];

const WhatWeLookFor = ({ isOpen, onClose }: Props) => {
  return (
    <ClientInfoModal isOpen={isOpen} onClose={onClose}>
      <div className="mb-6 sm:mb-8">
        <h2 className="text-2xl font-black text-gray-800 sm:text-3xl">
          What We Look For
        </h2>
        <div className="mt-2 flex items-center">
          <span className="mr-2 text-2xl font-bold text-black">-</span>
          <h3 className="text-lg font-semibold text-[#4CAF50] sm:text-xl">
            We work with vendors who deliver
          </h3>
        </div>
        <div className="mt-4 h-0.5 w-full bg-gray-300" />
      </div>

      <div className="grid grid-cols-1 gap-x-10 gap-y-6 md:grid-cols-2">
        {criteria.map((item, idx) => (
          <div key={idx} className="flex items-center gap-3">
            <img loading="lazy" decoding="async"
              src="/images/grid-intel/lighting.png"
              className="w-12 shrink-0"
              alt="lighting"
            />
            <p className="text-base font-semibold text-gray-800 sm:text-lg">
              {item}
            </p>
          </div>
        ))}
      </div>

      <p className="mt-8 max-w-2xl text-base font-semibold italic text-gray-800 sm:text-lg">
        We value partners, not just products.{" "}
        <span className="text-[#23B14D]">GREEN</span> vendors become part of our
        extended ecosystem.
      </p>
    </ClientInfoModal>
  );
};

export default WhatWeLookFor;
