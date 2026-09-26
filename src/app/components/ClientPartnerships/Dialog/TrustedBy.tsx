"use client";

import React from "react";
import type { ClientPartnershipsTrustedBy } from "../../../lib/api";
import ClientInfoModal from "./ClientInfoModal";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  data?: ClientPartnershipsTrustedBy;
}

const defaultIcons = [
  {
    alt: "Department of Petroleum and Energy PNG",
    src: "/images/client-partnerships/department-of-petroleum-energy-of-papua-new-guinea.png",
  },
  {
    alt: "Department of National Planning and Monitoring PNG",
    src: "/images/client-partnerships/department-of-national-planning.png",
  },
  {
    alt: "United Nations Development Programme",
    src: "/images/client-partnerships/undp.png",
  },
  {
    alt: "Pacific Power Association",
    src: "/images/client-partnerships/pasic-power.png",
  },
  {
    alt: "Australian Aid",
    src: "/images/client-partnerships/australian-aid.png",
  },
  {
    alt: "EU Green European Alliance",
    src: "/images/client-partnerships/eu-green.png",
  },
];

const TrustedBy = ({ isOpen, onClose, data }: Props) => {
  const title = data?.title ?? "Trusted By";
  const subHeadline =
    data?.subHeadline ??
    "We don't just build solar systems — we engineer energy impact.";
  const icons = data?.icons ?? defaultIcons;

  return (
    <ClientInfoModal isOpen={isOpen} onClose={onClose}>
      <div className="mb-6 sm:mb-8">
        <h2 className="text-2xl font-black text-gray-800 sm:text-3xl">
          {title}
        </h2>
        <div className="mt-2 flex items-center">
          <span className="mr-2 text-2xl font-bold text-black">-</span>
          <h3 className="text-base font-semibold text-[#4CAF50] sm:text-xl">
            {subHeadline}
          </h3>
        </div>
        <div className="mt-4 h-0.5 w-full bg-gray-300" />
      </div>

      <div className="grid grid-cols-2 items-center justify-items-center gap-8 md:grid-cols-3">
        {icons.map((icon, idx) => (
          <img
            loading="lazy"
            decoding="async"
            key={idx}
            src={icon.src}
            alt={icon.alt}
            className="h-16 object-contain sm:h-20"
          />
        ))}
      </div>
    </ClientInfoModal>
  );
};

export default TrustedBy;
