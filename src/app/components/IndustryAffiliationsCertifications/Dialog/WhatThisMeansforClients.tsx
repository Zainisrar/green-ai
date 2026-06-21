"use client";
import React from "react";
import CertInfoModal from "./CertInfoModal";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  keys: { title: string; description: string }[];
  img: { alt: string; src: string };
}

const WhatThisMeansforClients = ({ isOpen, onClose, title, keys, img }: Props) => {
  return (
    <CertInfoModal isOpen={isOpen} onClose={onClose}>
      <div className="mb-6 sm:mb-8">
        <h2 className="text-2xl font-black text-gray-800 sm:text-3xl">
          {title || "What This Means for Clients"}
        </h2>
        <div className="mt-4 h-0.5 w-full bg-gray-300" />
      </div>

      <div className="flex flex-col items-start gap-8 lg:flex-row">
        <div className="flex-1 space-y-5">
          {keys?.map((k, idx) => (
            <div key={`${k.title}-${idx}`} className="flex items-start gap-3">
              <span className="shrink-0">
                <img src="/images/grid-intel/lighting.png" className="-mt-3 w-12 sm:w-14" alt="lighting" />
              </span>
              <div>
                <h3 className="text-base font-bold text-gray-800 sm:text-lg">{k.title}</h3>
                <p className="text-sm italic leading-relaxed text-gray-600">{k.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="w-full shrink-0 lg:w-[400px]">
          <img
            src={img?.src || "/images/industry-affiliations-certifications/WhatThisMeansforClients.png"}
            alt={img?.alt || "Client Partnership"}
            className="h-auto w-full"
          />
        </div>
      </div>
    </CertInfoModal>
  );
};

export default WhatThisMeansforClients;
