"use client";

import React from "react";

interface EngineeringFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: React.ReactNode;
  subtitle?: string;
  children: React.ReactNode;
  maxWidthClass?: string;
}

const EngineeringFormModal = ({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  maxWidthClass = "max-w-5xl",
}: EngineeringFormModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="scrollbar-hide fixed inset-0 z-[9999999999999999999] flex items-start justify-center overflow-y-auto bg-black/20 p-3 sm:items-center sm:p-4">
      <div className={`relative my-2 w-full ${maxWidthClass} sm:my-auto`}>
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
          <div className="relative mx-2 sm:mx-3">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 rounded-lg border border-lime-300 bg-[#eff5f1] shadow-2xl"
            />
            <div className="relative z-10 min-w-0 px-6 py-8 pr-12 sm:px-12 sm:py-12 sm:pr-16 lg:px-14 lg:pr-20">
              <div className="mb-5 sm:mb-6">
                <h2 className="text-xl font-black leading-tight text-gray-800 sm:text-2xl lg:text-3xl">
                  {title}
                </h2>
                {subtitle && (
                  <p className="mt-2 text-sm font-semibold italic text-[#23B14D] sm:text-base lg:text-lg">
                    {subtitle}
                  </p>
                )}
              </div>
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const formFieldClass =
  "w-full min-w-0 rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-700 placeholder-gray-500 focus:border-green-500 focus:outline-none sm:px-4 sm:py-3 sm:text-base";

export const formGridClass = "grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2";

export const captchaRowClass =
  "flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between";

export const captchaInputGroupClass =
  "flex min-w-0 flex-col gap-3 sm:flex-row sm:items-center sm:gap-4";

export default EngineeringFormModal;
