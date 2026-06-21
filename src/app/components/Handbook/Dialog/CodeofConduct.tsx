"use client";
import React from "react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  items: { category: string; requiredStandard: string }[];
}

const CodeOfConduct = ({ isOpen, onClose, title, items }: Props) => {
  if (!isOpen) return null;

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
            {/* Title Section */}
            <div className="mb-6 sm:mb-8">
              <h2 className="text-2xl font-black text-gray-800 sm:text-3xl">
                {title || "Code of Conduct"}
              </h2>
              <div className="mt-4 h-0.5 w-full bg-gray-300" />
            </div>

            {/* Code of Conduct Table */}
            <div className="overflow-x-auto">
              <table className="w-full min-w-[480px]">
                <thead>
                  <tr>
                    <th className="px-4 py-3 text-left text-base font-bold text-[#4CAF50] sm:px-6 sm:py-4 sm:text-lg">
                      Category
                    </th>
                    <th className="px-4 py-3 text-left text-base font-bold text-[#4CAF50] sm:px-6 sm:py-4 sm:text-lg">
                      Required Standard
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {items?.map((row, idx) => (
                    <tr key={`${row.category}-${idx}`}>
                      <td className="px-4 py-3 font-semibold text-gray-800 sm:px-6 sm:py-4">
                        {row.category}
                      </td>
                      <td className="px-4 py-3 text-gray-700 sm:px-6 sm:py-4">
                        {row.requiredStandard}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeOfConduct;
