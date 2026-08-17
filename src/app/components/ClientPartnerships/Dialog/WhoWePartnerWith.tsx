"use client";

import React from "react";
import type { ClientPartnershipsWhoWePartnerWith } from "../../../lib/api";
import ClientInfoModal from "./ClientInfoModal";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  data?: ClientPartnershipsWhoWePartnerWith;
}

const defaultItems = [
  {
    clientType: "Government Ministries & Utilities",
    valueDelivered: "Grid expansion, off-grid programs, energy access delivery",
  },
  {
    clientType: "Multilateral Donors & Development Banks",
    valueDelivered:
      "Policy-aligned execution, transparent compliance, verified impact",
  },
  {
    clientType: "Private Sector Enterprises",
    valueDelivered:
      "Clean power, hybrid resilience, ESG-integrated infrastructure",
  },
  {
    clientType: "Institutions (Health, Education, Telecom)",
    valueDelivered:
      "Reliable systems, custom-engineered uptime, long-term O&M models",
  },
];

const WhoWePartnerWith = ({ isOpen, onClose, data }: Props) => {
  const items = data?.items ?? defaultItems;
  const title = data?.title ?? "Who We Partner With";
  const subHeadline =
    data?.subHeadline ?? "Strategic Clients. Transformational Outcomes.";

  return (
    <ClientInfoModal isOpen={isOpen} onClose={onClose}>
      <div className="mb-6 sm:mb-8">
        <h2 className="text-2xl font-black text-gray-800 sm:text-3xl">
          {title}
        </h2>
        <div className="mt-2 flex items-center">
          <span className="mr-2 text-2xl font-bold text-black">-</span>
          <h3 className="text-lg font-semibold text-[#4CAF50] sm:text-xl">
            {subHeadline}
          </h3>
        </div>
        <div className="mt-4 h-0.5 w-full bg-gray-300" />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[480px]">
          <thead>
            <tr>
              <th className="px-4 py-3 text-left text-base font-bold text-[#4CAF50] sm:px-6 sm:py-4 sm:text-lg">
                Client Type
              </th>
              <th className="px-4 py-3 text-left text-base font-bold text-[#4CAF50] sm:px-6 sm:py-4 sm:text-lg">
                Value Delivered
              </th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, idx) => (
              <tr key={idx}>
                <td className="px-4 py-3 font-semibold text-gray-800 sm:px-6 sm:py-4">
                  {item.clientType}
                </td>
                <td className="px-4 py-3 text-gray-700 sm:px-6 sm:py-4">
                  {item.valueDelivered}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </ClientInfoModal>
  );
};

export default WhoWePartnerWith;
