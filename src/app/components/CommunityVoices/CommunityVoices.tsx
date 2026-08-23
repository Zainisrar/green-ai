"use client";
import React, { useState } from "react";
import TopNavigation from "../TopNavigation/TopNavigation";
import Chatbot from "../Chatbot";
import SiteHeader from "../SiteHeader/SiteHeader";
import FigmaAngledCta from "../FigmaAngledCta/FigmaAngledCta";
import D6Chatbot from "../D6Chatbot";
import styles from "./CommunityVoices.module.css";
import { useCommunityVoices } from "../../../hooks/useCommunityVoices";
import VoicesFromField from "./Dialog/VoicesFromField";
import WhatMakesOurImpactDifferent from "./Dialog/WhatMakesOurImpactDifferent";
import SubmitTestimonial from "./Dialog/SubmitTestimonial";
import UploadPhotoVideo from "./Dialog/UploadPhotoVideo";

const CommunityVoices = ({ canvas = false }: { canvas?: boolean }) => {
  const { data } = useCommunityVoices();
  const [openModal, setOpenModal] = useState<string | null>(null);

  const highlightText = (text: string, highlight: string) => {
    if (!highlight) return text;
    const highlightTerms = highlight.trim().split(/\s+/);
    const pattern = highlightTerms
      .map((term) => term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
      .join("|");
    const parts = text.split(new RegExp(`(${pattern})`, "gi"));
    return parts.map((part, index) => {
      const shouldHighlight = highlightTerms.some(
        (term) => part.toLowerCase() === term.toLowerCase(),
      );
      return shouldHighlight ? (
        <span key={index} className="text-[#23B14D]">
          {part}
        </span>
      ) : (
        part
      );
    });
  };

  if (canvas) {
    const rows = [
      {
        title: "Voices from the Field",
        image: "/images/community-voices/figma/project-showcase.png",
        onClick: () => setOpenModal("voicesFromField"),
      },
      {
        title: "What Makes Our Impact Different?",
        image: "/images/community-voices/figma/voices-from-field.png",
        onClick: () => setOpenModal("whatMakesOurImpact"),
      },
      {
        title: "Project Showcase",
        image: "/images/community-voices/figma/impact-different.png",
        onClick: () => setOpenModal("projectShowcase"),
      },
    ];
    return (
      <main className={styles.canvasPage} data-node-id="7077:21678">
        <SiteHeader layout="figmaCanvas" figmaPanelVariant="flagship" />
        <div className={styles.canvasArtwork} aria-hidden="true">
          <img src="/images/community-voices/mainImg.png" alt="" />
        </div>
        <img
          className={styles.canvasVerticalTitle}
          src="/images/community-voices/community-voices.png"
          alt="Community Voices"
        />
        <h1 className={styles.canvasTitle}>
          Community <span>Voices</span>
        </h1>
        <p className={styles.canvasSubtitle}>
          You Call Them Projects. We Call Them People.
        </p>
        <p className={styles.canvasDescription}>
          From off-grid islands to inland clinics, <strong>GREEN’s</strong>{" "}
          systems don’t just power equipment — they power lives.
          <br />
          Here, the people speak. And the impact speaks for itself.
        </p>
        <div className={styles.canvasRows}>
          {rows.map((row, index) => (
            <div
              className={`${styles.canvasRow} ${styles[`canvasRow${index + 1}`]}`}
              key={row.title}
              role="button"
              tabIndex={0}
              onClick={row.onClick}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  row.onClick();
                }
              }}
            >
              <span className={styles.canvasRowImage} aria-hidden="true">
                <img src={row.image} alt="" />
              </span>
              <h2 className={styles.canvasRowTitle}>{row.title}</h2>
              <FigmaAngledCta
                className={styles.canvasRowCta}
                onClick={(event) => {
                  event.stopPropagation();
                  row.onClick();
                }}
              >
                Explore
              </FigmaAngledCta>
            </div>
          ))}
        </div>
        <p className={styles.canvasQuote}>
          You Call Them <span>Projects.</span>
          <br />
          We Call Them <span>People.</span>
        </p>
        <img
          className={styles.canvasQuoteFrameLeft}
          src="/images/community-voices/figma/quote-frame-left.svg"
          alt=""
          aria-hidden="true"
        />
        <img
          className={styles.canvasQuoteFrameRight}
          src="/images/community-voices/figma/quote-frame-right.svg"
          alt=""
          aria-hidden="true"
        />
        <p className={styles.canvasBottomQuote}>
          When the lights come on, the real story begins.
          <br />
          And <span>GREEN</span> is honored to power every chapter.
        </p>
        <div className={styles.canvasReadMore}>
          <span>Read more</span>
          <span aria-hidden="true">›</span>
        </div>
        <FigmaAngledCta
          className={styles.canvasSubmitCta}
          onClick={() => setOpenModal("submitTestimonial")}
        >
          Submit a Testimonial
        </FigmaAngledCta>
        <FigmaAngledCta
          className={styles.canvasUploadCta}
          onClick={() => setOpenModal("uploadPhotoVideo")}
          icon="download"
        >
          Upload a Photo / Video
        </FigmaAngledCta>
        <D6Chatbot canvasAnchored triggerVariant="figmaCanvas" />
        <VoicesFromField
          isOpen={openModal === "voicesFromField"}
          onClose={() => setOpenModal(null)}
        />
        <WhatMakesOurImpactDifferent
          isOpen={openModal === "whatMakesOurImpact"}
          onClose={() => setOpenModal(null)}
        />
        <SubmitTestimonial
          isOpen={openModal === "submitTestimonial"}
          onClose={() => setOpenModal(null)}
        />
        <UploadPhotoVideo
          isOpen={openModal === "uploadPhotoVideo"}
          onClose={() => setOpenModal(null)}
        />
      </main>
    );
  }

  if (!data) return null;
  return (
    <React.Fragment>
      <TopNavigation />
      <div className="flex h-full">
        <div className="w-1/6 flex items-center justify-center">
          <div className="fixed top-1/3 left-4 lg:left-14">
            <img
              src="/images/community-voices/community-voices.png"
              alt="community-voices"
              className="w-6 lg:w-8"
            />
          </div>
        </div>
        <div className="w-full lg:px-8 pt-8">
          <div className="mb-8">
            <h1 className="text-2xl lg:text-3xl font-black text-gray-800 mb-4">
              {data.mainPage.title.toUpperCase()}
            </h1>
            <h2 className="text-xl lg:text-2xl font-bold text-[#23B14D] italic mb-4">
              {data.mainPage.subHeadline}
            </h2>
            <div className="text-gray-600 text-base lg:text-lg mb-10">
              <p className="mb-2">
                {highlightText(
                  data.mainPage.description.text,
                  data.mainPage.description.highlighted,
                )}
              </p>
            </div>
          </div>
          <div className="lg:flex justify-between">
            <div>
              <div className="absolute  left-0 opacity-70">
                <img src="/images/community-voices/mainImg.png" alt="img" />
              </div>
              <div className="text-xl font-bold flex justify-center lg:h-[60vh] flex-col ">
                <div className="relative">
                  <div className="hidden absolute -left-20 lg:block ">
                    <img
                      src="/images/community-voices/shape1.png"
                      alt="vector"
                    />
                  </div>
                  <div>
                    {highlightText(
                      data.mainPage.quote1.text1,
                      data.mainPage.quote1.highlighted1,
                    )}
                  </div>
                  <div>
                    {highlightText(
                      data.mainPage.quote1.text2,
                      data.mainPage.quote1.highlighted2,
                    )}
                  </div>
                  <div className="hidden absolute -top-10 -right-20 lg:block ">
                    <img
                      src="/images/community-voices/shape2.png"
                      alt="vector"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="my-20">
              <div className="relative z-10 grid grid-cols-[auto_1fr_auto] items-center gap-x-4 lg:gap-x-10 gap-y-8 lg:gap-y-12">
                {data.mainPage.modals.map((modal, idx) => {
                  const onClick = () => {
                    if (idx === 0) setOpenModal("voicesFromField");
                    else if (idx === 1) setOpenModal("whatMakesOurImpact");
                    else if (idx === 2) setOpenModal("projectShowcase");
                  };
                  return (
                    <React.Fragment key={idx}>
                      <div className="cursor-pointer" onClick={onClick}>
                        <img src={modal.img.src} alt={modal.img.alt} />
                      </div>
                      <p
                        className="text-gray-800 font-bold text-lg cursor-pointer"
                        onClick={onClick}
                      >
                        {modal.cta}
                      </p>
                      <button className="cursor-pointer" onClick={onClick}>
                        <img
                          src="/images/community-voices/exploreBtn.png"
                          alt="exploreBtn"
                        />
                      </button>
                    </React.Fragment>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="lg:flex justify-between">
            <div className="my-20 ">
              <h3 className="text-lg lg:text-xl font-bold text-gray-800 mb-2">
                {data.mainPage.quote2.text.split("\n").map((line, idx) => (
                  <React.Fragment key={idx}>
                    {highlightText(line, data.mainPage.quote2.highlighted)}
                    {idx < data.mainPage.quote2.text.split("\n").length - 1 && (
                      <br />
                    )}
                  </React.Fragment>
                ))}
              </h3>
            </div>
            <div className="my-20 flex flex-col mb-32 lg:flex-row items-center justify-center gap-6">
              <div className="cursor-pointer relative z-50">
                <button
                  type="button"
                  onClick={() => setOpenModal("submitTestimonial")}
                  className="cursor-pointer relative"
                >
                  <img
                    src="/images/community-voices/submit.png"
                    alt="submit a testimonial"
                  />
                </button>
              </div>
              <div className="cursor-pointer relative z-50">
                <button
                  type="button"
                  onClick={() => setOpenModal("uploadPhotoVideo")}
                  className="cursor-pointer relative"
                >
                  <img
                    src="/images/community-voices/upload.png"
                    alt="upload a photo / video"
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Chatbot />
      <VoicesFromField
        isOpen={openModal === "voicesFromField"}
        onClose={() => setOpenModal(null)}
      />
      <WhatMakesOurImpactDifferent
        isOpen={openModal === "whatMakesOurImpact"}
        onClose={() => setOpenModal(null)}
      />
      <SubmitTestimonial
        isOpen={openModal === "submitTestimonial"}
        onClose={() => setOpenModal(null)}
      />
      <UploadPhotoVideo
        isOpen={openModal === "uploadPhotoVideo"}
        onClose={() => setOpenModal(null)}
      />
    </React.Fragment>
  );
};

export default CommunityVoices;
