"use client";
import React from "react";
import CertInfoModal from "./CertInfoModal";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
  keys: { text: string; highlighted: string }[];
  quoteText: string;
  img: { alt: string; src: string };
}

const WhyCertificationAffiliationMatter = ({
  isOpen,
  onClose,
  title,
  description,
  keys,
  quoteText,
  img,
}: Props) => {
  return (
    <CertInfoModal isOpen={isOpen} onClose={onClose}>
      <div className="mb-6 sm:mb-8">
        <h2 className="text-2xl font-black text-gray-800 sm:text-3xl">
          {title || "Why Certification & Affiliation Matter"}
        </h2>
        <div className="mt-4 h-0.5 w-full bg-gray-300" />
      </div>

      <div className="mb-6 sm:mb-8">
        <p className="text-base leading-relaxed text-gray-700 sm:text-lg">{description}</p>
      </div>

      <div className="flex flex-col items-start gap-8 lg:flex-row">
        <div className="flex-1 space-y-5">
          {keys?.map((k, idx) => (
            <div key={idx} className="flex items-start gap-3">
              <span className="shrink-0">
                <img loading="lazy" decoding="async" src="/images/grid-intel/lighting.png" className="-mt-3 w-12 sm:w-14" alt="lighting" />
              </span>
              <div className="text-sm sm:text-base">
                <span className="font-bold text-gray-800">{k.highlighted}</span>
                <span className="ml-2 text-gray-700">
                  {k.text.replace(k.highlighted, "").trim() || k.text}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="w-full shrink-0 lg:w-[400px]">
          <img loading="lazy" decoding="async"
            src={img?.src || "/images/industry-affiliations-certifications/why-certification-model.png"}
            alt={img?.alt || "Standards and Certification"}
            className="h-auto w-full"
          />
        </div>
      </div>

      {quoteText && (
        <div className="mt-10 border-t border-gray-300 pt-8">
          <blockquote className="text-lg font-medium italic leading-relaxed text-gray-800 sm:text-xl">
            {quoteText}
          </blockquote>
        </div>
      )}
    </CertInfoModal>
  );
};

export default WhyCertificationAffiliationMatter;
