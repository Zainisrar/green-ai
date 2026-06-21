"use client";

import React from "react";

interface CertInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  maxWidthClass?: string;
}

const CertInfoModal = ({
  isOpen,
  onClose,
  children,
  maxWidthClass = "max-w-6xl",
}: CertInfoModalProps) => {
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
          <div className="relative mx-2 rounded-lg border-2 border-[#4CAF50] bg-gray-100 px-6 py-10 pr-12 shadow-2xl sm:mx-3 sm:px-12 sm:py-12 sm:pr-16 lg:px-16 lg:pr-20">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CertInfoModal;
