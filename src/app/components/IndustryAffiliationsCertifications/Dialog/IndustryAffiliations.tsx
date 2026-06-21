"use client";
import React from "react";
import CertInfoModal from "./CertInfoModal";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  keys: { purpose: string; organization: string }[];
}

const IndustryAffiliations = ({ isOpen, onClose, title, keys }: Props) => {
  return (
    <CertInfoModal isOpen={isOpen} onClose={onClose}>
      <div className="mb-6 sm:mb-8">
        <h2 className="text-2xl font-black text-gray-800 sm:text-3xl">
          {title || "Industry Affiliations"}
        </h2>
        <div className="mt-4 h-0.5 w-full bg-gray-300" />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[480px]">
          <thead>
            <tr>
              <th className="px-4 py-3 text-left text-base font-bold text-[#4CAF50] sm:px-6 sm:py-4 sm:text-lg">
                Organization
              </th>
              <th className="px-4 py-3 text-left text-base font-bold text-[#4CAF50] sm:px-6 sm:py-4 sm:text-lg">
                Purpose / Engagement
              </th>
            </tr>
          </thead>
          <tbody>
            {keys?.map((k, idx) => (
              <tr key={`${k.organization}-${idx}`}>
                <td className="px-4 py-3 font-semibold text-gray-800 sm:px-6 sm:py-4">
                  {k.organization}
                </td>
                <td className="px-4 py-3 text-gray-700 sm:px-6 sm:py-4">{k.purpose}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </CertInfoModal>
  );
};

export default IndustryAffiliations;
