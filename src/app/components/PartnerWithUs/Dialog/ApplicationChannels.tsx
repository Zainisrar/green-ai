"use client";

import React from "react";
import ClientInfoModal from "@/app/components/ClientPartnerships/Dialog/ClientInfoModal";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const channels = [
  { channel: "Joint Programs", accessPoint: "programs@green.com.pg" },
  { channel: "Ministry Coordination", accessPoint: "gov.relations@green.com.pg" },
  { channel: "Grant-Funded Projects", accessPoint: "dev.partners@green.com.pg" },
  { channel: "Co-branded Pilots", accessPoint: "innovation@green.com.pg" },
  { channel: "Custom RFQ/EOI Submissions", accessPoint: "rfq@green.com.pg" },
];

const ApplicationChannels = ({ isOpen, onClose }: Props) => {
  return (
    <ClientInfoModal isOpen={isOpen} onClose={onClose}>
      <div className="mb-6 sm:mb-8">
        <h2 className="text-2xl font-black text-gray-800 sm:text-3xl">
          Application Channels — Active Collaboration
        </h2>
        <div className="mt-2 flex items-center">
          <span className="mr-2 text-2xl font-bold text-black">-</span>
          <h3 className="text-lg font-semibold text-[#4CAF50] sm:text-xl">
            We don&apos;t just build solar systems — we engineer energy impact.
          </h3>
        </div>
        <div className="mt-4 h-0.5 w-full bg-gray-300" />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[480px]">
          <thead>
            <tr>
              <th className="px-4 py-3 text-left text-base font-bold text-[#4CAF50] sm:px-6 sm:py-4 sm:text-lg">
                Channel
              </th>
              <th className="px-4 py-3 text-left text-base font-bold text-[#4CAF50] sm:px-6 sm:py-4 sm:text-lg">
                Access Point
              </th>
            </tr>
          </thead>
          <tbody>
            {channels.map((item, idx) => (
              <tr key={idx}>
                <td className="px-4 py-3 font-semibold text-gray-800 sm:px-6 sm:py-4">
                  {item.channel}
                </td>
                <td className="px-4 py-3 text-gray-700 sm:px-6 sm:py-4">
                  {item.accessPoint}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </ClientInfoModal>
  );
};

export default ApplicationChannels;
