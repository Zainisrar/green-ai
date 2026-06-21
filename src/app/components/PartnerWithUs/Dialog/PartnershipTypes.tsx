"use client";

import React from "react";
import ClientInfoModal from "@/app/components/ClientPartnerships/Dialog/ClientInfoModal";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const types = [
  {
    title: "Government Ministries",
    description:
      "Electrification rollouts, health & education infrastructure, climate-aligned energy transitions",
  },
  {
    title: "Donor & NGO Programs",
    description:
      "Last-mile energy access, humanitarian logistics, livelihood-linked energy assets",
  },
  {
    title: "Climate Funds & MDB",
    description:
      "Capital deployment via ready EPCM with transparency & compliance built-in",
  },
  {
    title: "Fossil Fuels Displaced",
    description:
      "Smart microgrids, distributed storage, AI-enabled diagnostics, inclusive energy models",
  },
];

const PartnershipTypes = ({ isOpen, onClose }: Props) => {
  return (
    <ClientInfoModal isOpen={isOpen} onClose={onClose}>
      <div className="mb-6 sm:mb-8">
        <h2 className="text-2xl font-black text-gray-800 sm:text-3xl">
          Partnership Types We Support
        </h2>
        <div className="mt-2 flex items-center">
          <span className="mr-2 text-2xl font-bold text-black">-</span>
          <h3 className="text-lg font-semibold text-[#4CAF50] sm:text-xl">
            We don&apos;t just build solar systems — we engineer energy impact.
          </h3>
        </div>
        <div className="mt-4 h-0.5 w-full bg-gray-300" />
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {types.map((type, idx) => (
          <div key={idx} className="flex items-start gap-4">
            <img
              src="/images/grid-intel/lighting.png"
              className="-mt-3 w-12 shrink-0"
              alt="lighting"
            />
            <div>
              <h4 className="mb-1 text-lg font-bold text-gray-800">
                {type.title}
              </h4>
              <p className="text-sm text-gray-600 sm:text-base">
                {type.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </ClientInfoModal>
  );
};

export default PartnershipTypes;
