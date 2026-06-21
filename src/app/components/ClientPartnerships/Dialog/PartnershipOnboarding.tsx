"use client";

import React from "react";
import ClientInfoModal from "./ClientInfoModal";

interface PartnerLogo {
  src: string;
  alt: string;
}

interface PartnershipOnboardingData {
  title?: string;
  subHeadline?: string;
  partners?: PartnerLogo[];
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  data?: PartnershipOnboardingData;
}

const defaultPartners = [
  { src: "/images/client-partnerships/department-of-petroleum-energy-of-papua-new-guinea.png", alt: "Department of Petroleum and Energy" },
  { src: "/images/client-partnerships/department-of-national-planning.png", alt: "Department of National Planning" },
  { src: "/images/client-partnerships/australian-aid.png", alt: "Australian Aid" },
  { src: "/images/client-partnerships/undp.png", alt: "United Nations Development Programme" },
  { src: "/images/client-partnerships/pasic-power.png", alt: "Pacific Power" },
  { src: "/images/client-partnerships/eu-green.png", alt: "EU Green" },
];

const PartnershipOnboarding = ({ isOpen, onClose, data }: Props) => {
  const title = data?.title ?? "Trusted By";
  const subHeadline =
    data?.subHeadline ?? "We don't just build solar systems — we engineer energy impact.";
  const partners = data?.partners ?? defaultPartners;

  return (
    <ClientInfoModal isOpen={isOpen} onClose={onClose}>
      <div className="mb-6 sm:mb-8">
        <h2 className="text-2xl font-black text-gray-800 sm:text-3xl">{title}</h2>
        <div className="mt-2 flex items-center">
          <span className="mr-2 text-2xl font-bold text-black">-</span>
          <h3 className="text-base font-semibold text-[#4CAF50] sm:text-xl">{subHeadline}</h3>
        </div>
        <div className="mt-4 h-0.5 w-full bg-gray-300" />
      </div>

      <div className="grid grid-cols-2 items-center justify-items-center gap-8 md:grid-cols-3">
        {partners.map((partner, idx) => (
          <img
            key={idx}
            src={partner.src}
            alt={partner.alt}
            className="h-24 object-contain sm:h-32 lg:h-40"
          />
        ))}
      </div>
    </ClientInfoModal>
  );
};

export default PartnershipOnboarding;
