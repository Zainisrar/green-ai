"use client";

import React from "react";
import ClientInfoModal from "@/app/components/ClientPartnerships/Dialog/ClientInfoModal";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const points = [
  {
    title: "100% On-Ground Delivery In PNG",
    description: "From Concept To Commissioning",
  },
  {
    title: "Proven EPCM Capacity",
    description: "Design, Procurement, Project Execution, O&M",
  },
  {
    title: "Certified And Audited",
    description: "ISO 9001, 14001, 45001; CEC; NEIA-Compliant",
  },
  {
    title: "Impact-Anchored",
    description: "ESG-Aligned, Gender Inclusive, Community Embedded",
  },
  {
    title: "Digital By Design",
    description: "GRID-INTEL™ Platform For Monitoring, Reporting, And Diagnostics",
  },
];

const WhyGreen = ({ isOpen, onClose }: Props) => {
  return (
    <ClientInfoModal isOpen={isOpen} onClose={onClose} geometry="consultation">
      <div className="mb-6 sm:mb-8">
        <h2 className="text-2xl font-black text-gray-800 sm:text-3xl">
          Why <span className="text-green-600">GREEN</span>?
        </h2>
        <div className="mt-2 flex items-center">
          <span className="mr-2 text-2xl font-bold text-black">-</span>
          <h3 className="text-lg font-semibold text-[#4CAF50] sm:text-xl">
            We don&apos;t just build solar systems — we engineer energy impact.
          </h3>
        </div>
        <div className="mt-4 h-0.5 w-full bg-gray-300" />
      </div>

      <div className="space-y-5">
        {points.map((point, idx) => (
          <div key={idx} className="flex items-start gap-3">
            <img loading="lazy" decoding="async"
              src="/images/grid-intel/lighting.png"
              className="-mt-3 w-12 shrink-0"
              alt="lighting"
            />
            <p className="text-base text-gray-800 sm:text-lg">
              <span className="font-bold">{point.title}</span> — {point.description}
            </p>
          </div>
        ))}
      </div>

      <p className="mt-8 text-base font-bold text-gray-800 sm:text-lg">
        <span className="text-green-600">GREEN</span> is not an idea-stage partner.
        We&apos;re a results-stage partner.
      </p>
    </ClientInfoModal>
  );
};

export default WhyGreen;
