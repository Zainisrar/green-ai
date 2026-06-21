"use client";

import React from "react";
import ClientInfoModal from "@/app/components/ClientPartnerships/Dialog/ClientInfoModal";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const documents = [
  "Supplier Code of Conduct (PDF)",
  "Procurement Overview (PDF)",
  "Supply Category Briefing Deck (PDF)",
  "EOI Form for New Vendors",
  "Procurement Overview (PDF)",
  "Supply Category Briefing Deck (PDF)",
  "Supplier Code of Conduct (PDF)",
  "Procurement Overview (PDF)",
  "Supply Category Briefing Deck (PDF)",
];

const TendersAndRFQs = ({ isOpen, onClose }: Props) => {
  return (
    <ClientInfoModal isOpen={isOpen} onClose={onClose}>
      <div className="mb-6 sm:mb-8">
        <h2 className="text-2xl font-black text-gray-800 sm:text-3xl">
          Tenders and RFQs
        </h2>
        <div className="mt-2 flex items-center">
          <span className="mr-2 text-2xl font-bold text-black">-</span>
          <h3 className="text-lg font-semibold text-[#4CAF50] sm:text-xl">
            We engineer energy. But our real asset is people.
          </h3>
        </div>
        <div className="mt-4 h-0.5 w-full bg-gray-300" />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {documents.map((doc, idx) => (
          <a
            key={idx}
            href="#"
            className="flex items-center justify-between gap-3 border border-[#4CAF50] bg-gradient-to-r from-[#23B14D]/15 to-[#FFFE50]/15 px-4 py-3 text-xs font-semibold text-gray-800 shadow-sm transition hover:brightness-105 sm:text-sm"
            style={{ clipPath: "polygon(4% 0, 100% 0, 96% 100%, 0 100%)" }}
          >
            <span>{doc}</span>
            <span className="shrink-0 text-[#23B14D]">⤓</span>
          </a>
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

export default TendersAndRFQs;
