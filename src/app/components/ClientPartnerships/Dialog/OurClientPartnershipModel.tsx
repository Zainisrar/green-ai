"use client";

import React from "react";
import type { ClientPartnershipsOurClientPartnership } from "../../../lib/api";
import ClientInfoModal from "./ClientInfoModal";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  data?: ClientPartnershipsOurClientPartnership;
}

const defaultItems = [
  {
    title: "Needs-Based Engineering",
    description: "Every solution designed around mission-critical needs",
  },
  {
    title: "Delivery Discipline",
    description: "Timelines. Compliance. Zero-excuse execution",
  },
  {
    title: "Transparency & Reporting",
    description: "Real-time monitoring, impact dashboards, partner visibility",
  },
  {
    title: "Post-Project Continuity",
    description: "Training, O&M, warranty coverage, GRID-INTEL™ support",
  },
];

const OurClientPartnershipModel = ({ isOpen, onClose, data }: Props) => {
  const title = data?.title ?? "Our Client Partnership Model";
  const subHeadline =
    data?.subHeadline ?? "Aligned by Design. Delivered with Accountability.";
  const description =
    data?.description ??
    "We co-create value with clients through a model that emphasises";
  const imgSrc =
    data?.img?.src ??
    "/images/client-partnerships/future-visions-business-technology.png";
  const imgAlt = data?.img?.alt ?? "Partnership handshake in business setting";
  const items = data?.items ?? defaultItems;
  const quoteText =
    data?.quote?.text ??
    "\"Our goal isn't just to deploy. It's to ensure your project is still running — 10 years later.\"";
  const quoteHighlighted = data?.quote?.highlighted?.split("\n") ?? [
    "goal",
    "project",
  ];

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

      <div className="mb-6">
        <p className="text-base font-medium text-gray-700 sm:text-lg">
          {description}
        </p>
      </div>

      <div className="flex flex-col items-start gap-8 lg:flex-row lg:gap-12">
        <div className="flex-1 space-y-5">
          {items.map((item, idx) => (
            <div
              key={idx}
              className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between sm:gap-4"
            >
              <div className="text-base font-bold text-gray-800 sm:text-lg">
                {item.title}
              </div>
              <div className="text-sm text-gray-700 sm:text-base">
                - {item.description}
              </div>
            </div>
          ))}
        </div>
        <div className="w-full shrink-0 lg:w-[300px]">
          <img src={imgSrc} alt={imgAlt} className="h-auto w-full" />
        </div>
      </div>

      <div className="mt-10 text-center">
        <p className="text-lg font-bold italic text-gray-800 sm:text-xl">
          {quoteText
            .split(new RegExp(`(${quoteHighlighted.join("|")})`, "gi"))
            .map((part, i) =>
              quoteHighlighted.some(
                (h) => h.toLowerCase() === part.toLowerCase(),
              ) ? (
                <span key={i} className="text-[#4CAF50]">
                  {part}
                </span>
              ) : (
                <React.Fragment key={i}>{part}</React.Fragment>
              ),
            )}
        </p>
      </div>
    </ClientInfoModal>
  );
};

export default OurClientPartnershipModel;
