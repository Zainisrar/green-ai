"use client";

import React, { useState } from "react";
import TopNavigation from "../TopNavigation/TopNavigation";
import Chatbot from "../Chatbot";
import SiteHeader from "../SiteHeader/SiteHeader";
import FigmaAngledCta from "../FigmaAngledCta/FigmaAngledCta";
import D6Chatbot from "../D6Chatbot";
import styles from "./PartnerWithUs.module.css";
import WhyGreen from "./Dialog/WhyGreen";
import PartnershipTypes from "./Dialog/PartnershipTypes";
import WhatYouCanExpect from "./Dialog/WhatYouCanExpect";
import ApplicationChannels from "./Dialog/ApplicationChannels";
import TrustedBy from "./Dialog/TrustedBy";
import SubmitCollaborationBrief from "./Modals/SubmitCollaborationBrief";

const sections = [
  { key: "whyGreen", title: "Why GREEN?" },
  { key: "partnershipTypes", title: "Partnership Types We Support" },
  { key: "whatYouCanExpect", title: "What You Can Expect" },
  // Section 4 matches the Figma design text verbatim (designer placeholder)
  { key: "applicationChannels", title: "Abortion Channels Active Coll" },
  { key: "trustedBy", title: "Trusted By" },
];

const PartnerWithUs = ({ canvas = false }: { canvas?: boolean }) => {
  const [openModal, setOpenModal] = useState<string | null>(null);
  const [isBriefOpen, setIsBriefOpen] = useState(false);

  const renderTitle = (title: string) =>
    title.split("GREEN").map((part, i, arr) => (
      <React.Fragment key={i}>
        {part}
        {i < arr.length - 1 && <span className="text-[#23B14D]">GREEN</span>}
      </React.Fragment>
    ));

  if (canvas) {
    return (
      <main className={styles.canvasPage} data-node-id="7077:23359">
        <SiteHeader layout="figmaCanvas" figmaPanelVariant="flagship" />
        <img loading="lazy" decoding="async"
          className={styles.canvasArtwork}
          src="/images/partner/photo_card.png"
          alt=""
          width="621"
          height="250"
        />
        <div className={styles.canvasVerticalTitle} aria-hidden="true">
          <p>Partner With Us</p>
        </div>
        <h1 className={styles.canvasTitle}>PARTNER WITH <span>US</span></h1>
        <p className={styles.canvasSubtitle}>Your Mission, Delivered.</p>
        <p className={styles.canvasDescription}>Whether you&apos;re a donor, government, or global institution — if your goal is clean energy access, sustainable infrastructure, and real-world delivery — <span className={styles.descGreen}>GREEN</span> is your execution partner in Papua New Guinea and the South Pacific.</p>
        <div className={styles.canvasRows}>
          {sections.map((section, index) => (
            <div className={`${styles.canvasRow} ${styles[`canvasRow${index + 1}`]}`} key={section.key}>
              <h2>{renderTitle(section.title)}</h2>
              <p>We don&apos;t just build solar systems — we engineer energy impact.</p>
              <FigmaAngledCta className={styles.canvasRowCta} onClick={() => setOpenModal(section.key)}>Explore</FigmaAngledCta>
            </div>
          ))}
        </div>
        <p className={styles.canvasBottomQuote}>Let&apos;s turn shared goals into shared ground. With <span>GREEN</span>, you don&apos;t partner for plans, meetings and fun. You partner for outcomes and mission accomplishments.</p>
        <div className={styles.canvasReadMore}><span>Read more</span><span aria-hidden="true">›</span></div>
        <FigmaAngledCta className={styles.canvasSubmitCta} onClick={() => setIsBriefOpen(true)}>Submit a Collaboration Brief</FigmaAngledCta>
        <FigmaAngledCta className={styles.canvasDownloadCta} href="mailto:programs@green.com.pg?subject=Partnership%20Overview%20Request" icon="chevron">Request our Partnership Overview</FigmaAngledCta>
        <D6Chatbot
          canvasAnchored
          triggerVariant="figmaCanvas"
          figmaPlaceholder="Let&rsquo;s Talk Energy"
        />
        <WhyGreen isOpen={openModal === "whyGreen"} onClose={() => setOpenModal(null)} />
        <PartnershipTypes isOpen={openModal === "partnershipTypes"} onClose={() => setOpenModal(null)} />
        <WhatYouCanExpect isOpen={openModal === "whatYouCanExpect"} onClose={() => setOpenModal(null)} />
        <ApplicationChannels isOpen={openModal === "applicationChannels"} onClose={() => setOpenModal(null)} />
        <TrustedBy isOpen={openModal === "trustedBy"} onClose={() => setOpenModal(null)} />
        <SubmitCollaborationBrief isOpen={isBriefOpen} onClose={() => setIsBriefOpen(false)} />
      </main>
    );
  }

  return (
    <React.Fragment>
      <div className="relative">
        <TopNavigation />

        <div className="flex h-full">
          {/* Left vertical label */}
          <div className="hidden w-1/12 items-center justify-center lg:flex">
            <div className="fixed left-6 top-1/3">
              <span className="block -rotate-90 whitespace-nowrap text-3xl font-black tracking-widest text-gray-200">
                PARTNER WITH US
              </span>
            </div>
          </div>

          {/* Main content */}
          <div className="min-w-0 flex-1 px-4 pt-8 sm:px-8">
            {/* Title block */}
            <div className="mb-8">
              <h1 className="mb-3 text-2xl font-black text-gray-800 lg:text-3xl">
                PARTNER WITH <span className="text-[#23B14D]">US</span>
              </h1>
              <h2 className="mb-4 text-xl font-bold italic text-[#23B14D] lg:text-2xl">
                Your Mission, Delivered.
              </h2>
              <p className="mb-8 max-w-5xl text-base text-gray-600 lg:text-lg">
                Whether you&apos;re a donor, government, or global institution — if your
                goal is clean energy access, sustainable infrastructure, and real-world
                delivery — <span className="font-semibold text-[#23B14D]">GREEN</span> is
                your execution partner in Papua New Guinea and the South Pacific.
              </p>
            </div>

            <div className="lg:flex lg:gap-12">
              {/* Section list */}
              <div className="w-full space-y-8 lg:w-7/12">
                {sections.map((section) => (
                  <div
                    key={section.key}
                    className="flex items-center justify-between border-b border-[#4CAF50] pb-4"
                  >
                    <div>
                      <h3 className="text-lg font-bold text-gray-800 lg:text-xl">
                        {renderTitle(section.title)}
                      </h3>
                      <p className="text-sm italic text-[#23B14D]">
                        We don&apos;t just build solar systems — we engineer energy impact.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setOpenModal(section.key)}
                      className="shrink-0 cursor-pointer"
                    >
                      <img loading="lazy" decoding="async"
                        src="/images/client-partnerships/explore.png"
                        alt={`Explore ${section.title}`}
                      />
                    </button>
                  </div>
                ))}
              </div>

              {/* Right column - image */}
              <div className="my-10 lg:my-0 lg:w-5/12">
                <img loading="lazy" decoding="async"
                  src="/images/client-partnerships/future-visions-business-technology.png"
                  alt="GREEN energy infrastructure"
                  className="w-full rounded-lg object-cover shadow-lg"
                />
              </div>
            </div>

            {/* Bottom row */}
            <div className="my-16 mb-32 lg:flex lg:items-end lg:justify-between">
              <h3 className="max-w-xl text-lg font-bold text-gray-800 lg:text-xl">
                Let&apos;s turn shared goals into shared ground. With{" "}
                <span className="text-[#23B14D]">GREEN</span>, you don&apos;t partner for
                plans, meetings and fun. You partner for outcomes and mission
                accomplishments.
              </h3>

              <div className="mt-8 flex flex-col items-stretch gap-4 lg:mt-0 lg:items-end">
                <button
                  type="button"
                  onClick={() => setIsBriefOpen(true)}
                  className="group flex items-center justify-between gap-4 border border-[#4CAF50] bg-gradient-to-r from-[#23B14D]/15 to-[#FFFE50]/15 px-6 py-3 text-sm font-bold text-gray-800 shadow-sm transition hover:brightness-105 sm:text-base"
                  style={{ clipPath: "polygon(6% 0, 100% 0, 94% 100%, 0 100%)" }}
                >
                  <span>Submit a Collaboration Brief</span>
                  <span className="text-[#23B14D]">›</span>
                </button>
                <a
                  href="mailto:programs@green.com.pg?subject=Partnership%20Overview%20Request"
                  className="group flex items-center justify-between gap-4 border border-[#4CAF50] bg-gradient-to-r from-[#23B14D]/15 to-[#FFFE50]/15 px-6 py-3 text-sm font-bold text-gray-800 shadow-sm transition hover:brightness-105 sm:text-base"
                  style={{ clipPath: "polygon(6% 0, 100% 0, 94% 100%, 0 100%)" }}
                >
                  <span>Request our Partnership Overview</span>
                  <span className="text-[#23B14D]">›</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Chatbot />

      {/* Content modals */}
      <WhyGreen
        isOpen={openModal === "whyGreen"}
        onClose={() => setOpenModal(null)}
      />
      <PartnershipTypes
        isOpen={openModal === "partnershipTypes"}
        onClose={() => setOpenModal(null)}
      />
      <WhatYouCanExpect
        isOpen={openModal === "whatYouCanExpect"}
        onClose={() => setOpenModal(null)}
      />
      <ApplicationChannels
        isOpen={openModal === "applicationChannels"}
        onClose={() => setOpenModal(null)}
      />
      <TrustedBy
        isOpen={openModal === "trustedBy"}
        onClose={() => setOpenModal(null)}
      />

      {/* Form modal */}
      <SubmitCollaborationBrief
        isOpen={isBriefOpen}
        onClose={() => setIsBriefOpen(false)}
      />
    </React.Fragment>
  );
};

export default PartnerWithUs;
