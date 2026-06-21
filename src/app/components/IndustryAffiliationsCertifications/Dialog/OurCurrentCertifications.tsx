"use client";
import React from "react";
import CertInfoModal from "./CertInfoModal";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  items: { scope: string; issuingBody: string; certification: string }[];
}

const OurCurrentCertifications = ({ isOpen, onClose, title, items }: Props) => {
  return (
    <CertInfoModal isOpen={isOpen} onClose={onClose}>
      <div className="mb-6 sm:mb-8">
        <h2 className="text-2xl font-black text-gray-800 sm:text-3xl">
          {title || "Our Current Certifications"}
        </h2>
        <div className="mt-4 h-0.5 w-full bg-gray-300" />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[560px]">
          <thead>
            <tr>
              <th className="px-4 py-3 text-left text-base font-bold text-[#4CAF50] sm:px-6 sm:py-4 sm:text-lg">
                Certification
              </th>
              <th className="px-4 py-3 text-left text-base font-bold text-[#4CAF50] sm:px-6 sm:py-4 sm:text-lg">
                Issuing Body
              </th>
              <th className="px-4 py-3 text-left text-base font-bold text-[#4CAF50] sm:px-6 sm:py-4 sm:text-lg">
                Scope
              </th>
            </tr>
          </thead>
          <tbody>
            {items?.map((item, idx) => (
              <tr key={`${item.certification}-${idx}`}>
                <td className="px-4 py-3 font-semibold text-gray-800 sm:px-6 sm:py-4">
                  {item.certification}
                </td>
                <td className="px-4 py-3 text-gray-700 sm:px-6 sm:py-4">{item.issuingBody}</td>
                <td className="px-4 py-3 text-gray-700 sm:px-6 sm:py-4">{item.scope}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </CertInfoModal>
  );
};

export default OurCurrentCertifications;
