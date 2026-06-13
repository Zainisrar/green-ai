"use client";
import React, { useState } from "react";
import TopNavigation from "../TopNavigation/TopNavigation";
import Chatbot from "../Chatbot";
import Link from "next/link";
import { useCommunityVoices } from "../../../hooks/useCommunityVoices";
import VoicesFromField from "./Dialog/VoicesFromField";
import WhatMakesOurImpactDifferent from "./Dialog/WhatMakesOurImpactDifferent";

const CommunityVoices = () => {
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
        (term) => part.toLowerCase() === term.toLowerCase()
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

    if (!data) return null;
  return (
    <React.Fragment>
      <TopNavigation />
      <div className="flex h-full">
        <div className="w-1/6 flex items-center justify-center">
          <div className="fixed top-4/12 lg:top-1/3 left-4 lg:left-14">
            <img
              src="/images/community-voices/community-voices.png"
              alt="community-voices"
              className="w-6 lg:w-8"
            />
          </div>
        </div>
        <div className="w-full lg:px-8 pt-8">
          <div className="mb-8">
            <h1 className="lg:text-3xl text-2xl font-black text-gray-800 mb-4">
              {data.mainPage.title.toUpperCase()}
            </h1>
            <h2 className="text-xl lg:text-2xl font-bold text-[#23B14D] italic mb-4">
              {data.mainPage.subHeadline}
            </h2>
            <div className="text-gray-600 lg:text-lg mb-10">
              <p className="mb-2">
                {highlightText(
                  data.mainPage.description.text,
                  data.mainPage.description.highlighted
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
                      data.mainPage.quote1.highlighted1
                    )}
                  </div>
                  <div>
                    {highlightText(
                      data.mainPage.quote1.text2,
                      data.mainPage.quote1.highlighted2
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
              <div className="relative z-10 flex flex-col items-center justify-center gap-8 lg:gap-12">
                {data.mainPage.modals.map((modal, idx) => (
                  <div
                    key={idx}
                    className="relative group cursor-pointer flex"
                    onClick={() => {
                      if (idx === 0) setOpenModal("voicesFromField");
                      else if (idx === 1) setOpenModal("whatMakesOurImpact");
                      else if (idx === 2) setOpenModal("projectShowcase");
                    }}
                  >
                    <div className="lg:flex space-x-4  items-center">
                      <div className="">
                        <img src={modal.img.src} alt={modal.img.alt} />
                      </div>
                      <div className="space-x-4 my-4 lg:space-x-20 flex lg:text-center">
                        <p className="text-gray-800 font-bold text-lg mb-3">
                          {modal.cta}
                        </p>
                        <button className="cursor-pointer">
                          <img
                            src="/images/community-voices/exploreBtn.png"
                            alt="exploreBtn"
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
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
                <Link
                  href={data.mainPage.cta[0].href || "#"}
                  className="cursor-pointer relative"
                >
                  <button className=" cursor-pointer">
                    <img
                      src="/images/community-voices/submit.png"
                      alt="submit"
                    />
                  </button>
                </Link>
              </div>
              <div className="cursor-pointer relative z-50">
                <Link
                  href={data.mainPage.cta[1].href || "#"}
                  className="cursor-pointer relative"
                >
                  <button className=" cursor-pointer">
                    <img
                      src="/images/community-voices/upload.png"
                      alt="upload"
                    />
                  </button>
                </Link>
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
    </React.Fragment>
  );
};

export default CommunityVoices;
