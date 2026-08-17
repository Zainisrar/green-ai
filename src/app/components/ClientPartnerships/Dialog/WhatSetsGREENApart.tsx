"use client";

import React from "react";
import type { ClientPartnershipsWhatSetsGreenApart } from "../../../lib/api";
import ClientInfoModal from "./ClientInfoModal";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  data?: ClientPartnershipsWhatSetsGreenApart;
}

const defaultItems = [
  {
    greenDelivers: "Track record in hard-to-reach zones",
    othersPromise: "Marketing slides",
  },
  {
    greenDelivers: "In-house execution, no over-subcontracting",
    othersPromise: "Outsourced chaos",
  },
  {
    greenDelivers: "GRID-INTEL™ platform with every system",
    othersPromise: "Static installations",
  },
  {
    greenDelivers: "High uptime. Low maintenance. Localized O&M",
    othersPromise: "Unplanned breakdowns",
  },
  {
    greenDelivers: "Full post-handover support ecosystem",
    othersPromise: "Silence after delivery",
  },
];

const WhatSetsGREENApart = ({ isOpen, onClose, data }: Props) => {
  const title = data?.title ?? "What Sets GREEN Apart";
  const subHeadline =
    data?.subHeadline ?? "Strategic Clients. Transformational Outcomes.";
  const items = data?.items ?? defaultItems;

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

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
        <div>
          <h3 className="mb-4 text-xl font-bold text-[#4CAF50] sm:text-center sm:text-2xl">
            GREEN DELIVERS
          </h3>
          <div className="space-y-4">
            {items.map((item, idx) => (
              <p
                key={idx}
                className="text-base font-medium text-gray-800 sm:text-center sm:text-lg"
              >
                {item.greenDelivers}
              </p>
            ))}
          </div>
        </div>
        <div>
          <h3 className="mb-4 text-xl font-bold text-[#4CAF50] sm:text-center sm:text-2xl">
            OTHERS PROMISE
          </h3>
          <div className="space-y-4">
            {items.map((item, idx) => (
              <p
                key={idx}
                className="text-base font-medium text-gray-800 sm:text-center sm:text-lg"
              >
                {item.othersPromise}
              </p>
            ))}
          </div>
        </div>
      </div>
    </ClientInfoModal>
  );
};

export default WhatSetsGREENApart;
