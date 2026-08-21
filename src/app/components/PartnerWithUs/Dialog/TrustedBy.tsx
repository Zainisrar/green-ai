"use client";

import React from "react";
import ClientInfoModal from "@/app/components/ClientPartnerships/Dialog/ClientInfoModal";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const logos = [
  {
    src: "/images/client-partnerships/department-of-petroleum-energy-of-papua-new-guinea.png",
    alt: "Department of Petroleum and Energy",
  },
  {
    src: "/images/client-partnerships/department-of-national-planning.png",
    alt: "Department of National Planning and Monitoring",
  },
  {
    src: "/images/client-partnerships/australian-aid.png",
    alt: "Australian Aid",
  },
  {
    src: "/images/client-partnerships/undp.png",
    alt: "UNDP",
  },
  {
    src: "/images/client-partnerships/pasic-power.png",
    alt: "Pacific Power Association",
  },
  {
    src: "/images/client-partnerships/eu-green.png",
    alt: "EU GREEN European Alliance",
  },
];

const TrustedBy = ({ isOpen, onClose }: Props) => {
  return (
    <ClientInfoModal isOpen={isOpen} onClose={onClose} geometry="consultation">
      <div className="mb-6 sm:mb-8">
        <h2 className="text-2xl font-black text-gray-800 sm:text-3xl">Trusted By</h2>
        <div className="mt-2 flex items-center">
          <span className="mr-2 text-2xl font-bold text-black">-</span>
          <h3 className="text-lg font-semibold text-[#4CAF50] sm:text-xl">
            We don&apos;t just build solar systems — we engineer energy impact.
          </h3>
        </div>
        <div className="mt-4 h-0.5 w-full bg-gray-300" />
      </div>

      <div className="grid grid-cols-2 items-center gap-8 md:grid-cols-4">
        {logos.map((logo, idx) => (
          <div key={idx} className="flex items-center justify-center">
            <img
              src={logo.src}
              alt={logo.alt}
              className="max-h-20 w-auto object-contain"
            />
          </div>
        ))}
      </div>
    </ClientInfoModal>
  );
};

export default TrustedBy;
