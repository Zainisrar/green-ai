"use client";

import React from "react";
import { handleImageError } from "../../lib/utils";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subHeadline?: string;
  description?: string;
  img?: { alt: string; src: string };
  fallbackImg: string;
  keys?: { text: string; highlighted?: string }[];
  quote?: { text: string; highlighted: string };
  imageFirst?: boolean;
}

const TechInfoModal = ({
  isOpen,
  onClose,
  title,
  subHeadline,
  description,
  img,
  fallbackImg,
  keys,
  quote,
  imageFirst = false,
}: Props) => {
  if (!isOpen) return null;

  const imageBlock = (
    <div className="w-full shrink-0 lg:w-5/12">
      <img
        src={img?.src || fallbackImg}
        alt={img?.alt || title}
        className="h-auto w-full"
        onError={(e) => handleImageError(e, fallbackImg)}
      />
    </div>
  );

  const keysBlock = (
    <div className="flex-1 space-y-5">
      {keys?.map((k, i) => (
        <div key={i} className="flex items-start gap-3">
          <span className="shrink-0">
            <img src="/images/grid-intel/lighting.png" className="-mt-3 w-12 sm:w-14" alt="lighting" />
          </span>
          <div className="text-sm text-gray-700 sm:text-base">
            <span>{k.text}</span>
            {k.highlighted && <span className="text-green-600"> {k.highlighted}</span>}
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="scrollbar-hide fixed inset-0 z-[9999999999999999999] flex items-start justify-center overflow-y-auto bg-black/20 p-3 sm:items-center sm:p-4">
      <div className="relative my-2 w-full max-w-6xl sm:my-auto">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-2 z-30 cursor-pointer p-1.5 text-gray-700 transition hover:text-gray-900 sm:right-8 sm:top-4"
          aria-label="Close modal"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 sm:h-8 sm:w-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>

        <div className="scrollbar-hide max-h-[calc(100dvh-1.5rem)] overflow-y-auto sm:max-h-[90dvh]">
          <div className="relative mx-2 rounded-lg border-2 border-[#4CAF50] bg-gray-100 px-6 py-10 pr-12 shadow-2xl sm:mx-3 sm:px-12 sm:py-12 sm:pr-16 lg:px-16 lg:pr-20">
            <div className="mb-6 sm:mb-8">
              <h2 className="text-2xl font-black text-gray-800 sm:text-3xl">{title.trim() || ""}</h2>
              {subHeadline && (
                <h3 className="mt-1">
                  <span className="text-green-600">{subHeadline}</span>
                </h3>
              )}
              {description && (
                <p className="mt-4 text-base leading-relaxed text-gray-700 sm:text-lg">
                  {description}
                </p>
              )}
              <div className="mt-4 h-0.5 w-full bg-gray-300" />
            </div>

            <div className="flex flex-col items-start gap-8 lg:flex-row">
              {imageFirst ? (
                <>
                  {imageBlock}
                  {keysBlock}
                </>
              ) : (
                <>
                  {keysBlock}
                  {imageBlock}
                </>
              )}
            </div>

            {quote?.text && (
              <div className="mt-10 border-t border-gray-300 pt-8">
                <blockquote className="text-lg font-bold capitalize italic leading-relaxed text-gray-800 sm:text-center sm:text-xl">
                  {quote.text.split(quote.highlighted).map((seg, idx) => (
                    <React.Fragment key={idx}>
                      {seg}
                      {idx === 0 && quote.highlighted && (
                        <span className="text-green-600">{quote.highlighted}</span>
                      )}
                    </React.Fragment>
                  ))}
                </blockquote>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TechInfoModal;
