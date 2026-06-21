"use client";

import React from "react";
import ClientInfoModal from "@/app/components/ClientPartnerships/Dialog/ClientInfoModal";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onRegister?: () => void;
}

const steps = [
  { step: "Step 1", action: "Create a Supplier Profile + [Register Here]", register: true },
  { step: "Step 2", action: "Review GREEN's Procurement Philosophy" },
  { step: "Step 3", action: "Sign & Accept Supplier Code of Conduct" },
  { step: "Step 4", action: "Upload Documents (Certifications, Catalogs, Past Work)" },
  { step: "Step 5", action: "Await Qualification / Tender Invitations" },
];

const renderGreen = (text: string) =>
  text.split("GREEN").map((part, i, arr) => (
    <React.Fragment key={i}>
      {part}
      {i < arr.length - 1 && <span className="text-[#23B14D]">GREEN</span>}
    </React.Fragment>
  ));

const HowToGetStarted = ({ isOpen, onClose, onRegister }: Props) => {
  return (
    <ClientInfoModal isOpen={isOpen} onClose={onClose}>
      <div className="mb-6 sm:mb-8">
        <h2 className="text-2xl font-black text-gray-800 sm:text-3xl">
          How to Get Started
        </h2>
        <div className="mt-4 h-0.5 w-full bg-gray-300" />
      </div>

      <div className="grid grid-cols-[auto_1fr] gap-x-10 gap-y-4 sm:gap-x-20">
        <span className="text-lg font-bold text-[#23B14D]">Step</span>
        <span className="text-lg font-bold text-[#23B14D]">Action</span>
        {steps.map((row, idx) => (
          <React.Fragment key={idx}>
            <span className="text-sm font-semibold text-gray-800 sm:text-base">
              {row.step}
            </span>
            <span className="text-sm text-gray-700 sm:text-base">
              {row.register && onRegister ? (
                <>
                  Create a Supplier Profile +{" "}
                  <button
                    type="button"
                    onClick={onRegister}
                    className="cursor-pointer font-semibold text-[#23B14D] underline"
                  >
                    [Register Here]
                  </button>
                </>
              ) : (
                renderGreen(row.action)
              )}
            </span>
          </React.Fragment>
        ))}
      </div>

      <p className="mt-8 text-base font-semibold italic text-gray-800 sm:text-lg">
        Already a supplier?{" "}
        <a
          href="/ecosystem/supply-partners/login"
          className="text-[#23B14D] underline"
        >
          Login to Supplier Portal
        </a>
      </p>
    </ClientInfoModal>
  );
};

export default HowToGetStarted;
