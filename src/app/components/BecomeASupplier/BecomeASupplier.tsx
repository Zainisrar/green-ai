"use client";

import React, { useState } from "react";
import TopNavigation from "../TopNavigation/TopNavigation";
import Chatbot from "../Chatbot";
import WhatWeLookFor from "./Dialog/WhatWeLookFor";
import KeySupplyCategories from "./Dialog/KeySupplyCategories";
import HowToGetStarted from "./Dialog/HowToGetStarted";
import TendersAndRFQs from "./Dialog/TendersAndRFQs";
import RegisterInquiry from "./Modals/RegisterInquiry";

const cards = [
  {
    key: "whatWeLookFor",
    title: "What We Look For",
    description: "We don't chase trends. We co-create breakthroughs",
    image: "/images/projects/featuredProjectImg1.png",
  },
  {
    key: "keySupplyCategories",
    title: "Key Supply Categories",
    description: "GREEN's active and future procurement includes:",
    image: "/images/home/DJI_0870 1.png",
  },
  {
    key: "howToGetStarted",
    title: "How to Get Started",
    description: "We don't chase trends. We co-create breakthroughs",
    image: "/images/client-partnerships/future-visions-business-technology.png",
  },
  {
    key: "tendersAndRfqs",
    title: "Tenders and RFQs",
    description: "We don't chase trends. We co-create breakthroughs",
    image: "/images/home/DJI_0444 1.png",
  },
];

const renderGreen = (text: string) =>
  text.split("GREEN").map((part, i, arr) => (
    <React.Fragment key={i}>
      {part}
      {i < arr.length - 1 && <span className="text-[#23B14D]">GREEN</span>}
    </React.Fragment>
  ));

const BecomeASupplier = () => {
  const [openModal, setOpenModal] = useState<string | null>(null);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  return (
    <React.Fragment>
      <div className="relative min-h-screen">
        <TopNavigation />

        <div className="flex h-full">
          {/* Left vertical label */}
          <div className="hidden w-1/12 items-center justify-center lg:flex">
            <div className="fixed left-6 top-1/4">
              <span className="block -rotate-90 whitespace-nowrap text-3xl font-black tracking-widest text-gray-200">
                BECOME A SUPPLIER
              </span>
            </div>
          </div>

          {/* Main content */}
          <div className="min-w-0 flex-1 px-4 pt-8 sm:px-8">
            {/* Title block */}
            <div className="mb-8">
              <h1 className="mb-3 text-2xl font-black text-gray-800 lg:text-3xl">
                BECOME A <span className="text-[#23B14D]">SUPPLIER</span>
              </h1>
              <h2 className="mb-4 text-xl font-bold italic text-[#23B14D] lg:text-2xl">
                Supply Us. Be an Impact Partner.
              </h2>
              <p className="mb-8 max-w-4xl text-base text-gray-600 lg:text-lg">
                Join <span className="font-semibold text-[#23B14D]">GREEN</span>&apos;s
                trusted network of global and local vendors delivering mission-critical
                energy infrastructure across Papua New Guinea and the Pacific. If you bring
                quality, transparency, and speed — we&apos;re ready to do business.
              </p>
            </div>

            {/* Cards grid */}
            <div className="grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2">
              {cards.map((card) => (
                <button
                  key={card.key}
                  type="button"
                  onClick={() => setOpenModal(card.key)}
                  className="group flex h-36 items-stretch overflow-hidden border border-[#a3d977] bg-gradient-to-r from-[#23B14D]/10 to-[#FFFE50]/10 text-left shadow-sm transition hover:shadow-md hover:brightness-[1.02]"
                  style={{ clipPath: "polygon(5% 0, 100% 0, 95% 100%, 0 100%)" }}
                >
                  <img
                    src={card.image}
                    alt={card.title}
                    className="h-full w-2/5 shrink-0 object-cover"
                  />
                  <div className="flex flex-1 flex-col justify-center px-4 py-3 pr-6">
                    <h3 className="text-base font-bold text-gray-800 sm:text-lg">
                      {card.title}
                    </h3>
                    <p className="mt-1 text-xs text-gray-600 sm:text-sm">
                      {renderGreen(card.description)}
                    </p>
                    <span className="mt-3 inline-flex w-fit items-center gap-1 bg-gradient-to-r from-[#23B14D]/25 to-[#FFFE50]/25 px-4 py-1 text-xs font-bold text-gray-800">
                      Explore <span className="text-[#23B14D]">›</span>
                    </span>
                  </div>
                </button>
              ))}
            </div>

            {/* Quote */}
            <div className="my-10 max-w-md">
              <p className="text-lg font-bold italic text-gray-800">
                &quot;<span className="text-[#23B14D]">GREEN</span> vendors become part of
                our extended ecosystem.&quot;
              </p>
            </div>

            {/* Bottom row */}
            <div className="mb-32 lg:flex lg:items-end lg:justify-between">
              <h3 className="max-w-xl text-lg font-bold text-gray-800 lg:text-xl">
                Supplying <span className="text-[#23B14D]">GREEN</span> means more than
                shipping goods. It means joining a supply chain that powers clinics,
                schools, and futures.
              </h3>

              <div className="mt-8 flex flex-col items-stretch gap-4 lg:mt-0 lg:items-end">
                <a
                  href="#"
                  className="flex items-center justify-between gap-4 border border-[#4CAF50] bg-gradient-to-r from-[#23B14D]/15 to-[#FFFE50]/15 px-6 py-3 text-sm font-bold text-gray-800 shadow-sm transition hover:brightness-105 sm:text-base"
                  style={{ clipPath: "polygon(6% 0, 100% 0, 94% 100%, 0 100%)" }}
                >
                  <span>Download Handbook</span>
                  <span className="text-[#23B14D]">⤓</span>
                </a>
                <button
                  type="button"
                  onClick={() => setIsRegisterOpen(true)}
                  className="flex items-center justify-between gap-4 border border-[#4CAF50] bg-gradient-to-r from-[#23B14D]/15 to-[#FFFE50]/15 px-6 py-3 text-sm font-bold text-gray-800 shadow-sm transition hover:brightness-105 sm:text-base"
                  style={{ clipPath: "polygon(6% 0, 100% 0, 94% 100%, 0 100%)" }}
                >
                  <span>Register Now | Send an Inquiry</span>
                  <span className="text-[#23B14D]">›</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Chatbot />

      {/* Content modals */}
      <WhatWeLookFor
        isOpen={openModal === "whatWeLookFor"}
        onClose={() => setOpenModal(null)}
      />
      <KeySupplyCategories
        isOpen={openModal === "keySupplyCategories"}
        onClose={() => setOpenModal(null)}
      />
      <HowToGetStarted
        isOpen={openModal === "howToGetStarted"}
        onClose={() => setOpenModal(null)}
        onRegister={() => {
          setOpenModal(null);
          setIsRegisterOpen(true);
        }}
      />
      <TendersAndRFQs
        isOpen={openModal === "tendersAndRfqs"}
        onClose={() => setOpenModal(null)}
      />

      {/* Form modal */}
      <RegisterInquiry
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
      />
    </React.Fragment>
  );
};

export default BecomeASupplier;
