"use client";
import React, { useState } from "react";
import TopNavigation from "../TopNavigation/TopNavigation";
import Chatbot from "../Chatbot";
import Link from "next/link";
import { useWomenInEnergy } from "../../../hooks/useWomenInEnergy";
import WhyThisMatters from "./Dialog/WhyThisMatters";
import InitiativesUnderway from "./Dialog/InitiativesUnderway";
import VoicesofPower from "./Dialog/VoicesofPower";
import PartnerwithUs from "./Dialog/PartnerwithUs";

const WomenInEnergy = () => {
  const { data, error } = useWomenInEnergy();
  const [openModal, setOpenModal] = useState<string | null>(null);
  const escapeRegExp = (string: string) => {
    return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); // escape special chars
  };

  // Helper function to highlight text
  const highlightText = (text: string, highlight: string) => {
    if (!highlight) return text;

    // Check if highlight is a number
    const highlightIndex = parseInt(highlight);
    if (!isNaN(highlightIndex)) {
      const words = text.split(/(\s+)/);
      let wordCount = 0;
      return words.map((word, index) => {
        if (!/^\s+$/.test(word)) {
          wordCount++;
          if (wordCount === highlightIndex) {
            return (
              <span key={index} className="text-[#23B14D]">
                {word}
              </span>
            );
          }
        }
        return <span key={index}>{word}</span>;
      });
    }

    // Split highlight by spaces to handle multiple terms like "GREEN's 22%"
    const highlightTerms = highlight.trim().split(/\s+/);
    
    // Create a regex pattern that matches any of the terms
    const pattern = highlightTerms
      .map(term => escapeRegExp(term))
      .join('|');
    
    const parts = text.split(new RegExp(`(${pattern})`, "gi"));
    
    return parts.map((part, index) => {
      // Check if this part matches any of the highlight terms
      const shouldHighlight = highlightTerms.some(
        term => part.toLowerCase() === term.toLowerCase()
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
  const [cards, setCards] = useState([
    {
      img: "/images/women-in-energy/card1.png",
      description:
        "Energy access is only transformational if it includes everyone.",
    },
    {
      img: "/images/women-in-energy/card2.png",
      description: "Precision design. Terrain-smart. Load-aware.",
    },
    {
      img: "/images/women-in-energy/card3.png",
      description: "  Executed in-house. Built to endure.",
    },
    {
      img: "/images/women-in-energy/card4.png",
      description: "  Executed in-house. Built to endure.",
    },
  ]);

  if (error || !data) {
    return null;
  }
  

  return (
    <React.Fragment>
      <TopNavigation />
      <div className="flex h-full">
        <div className="w-1/6 flex items-center justify-center">
          <div className="fixed top-4/12 lg:top-1/3 left-4 lg:left-14">
            <img
              src="/images/women-in-energy/women-in-energy.png"
              alt="women-in-energy"
              className="w-6 lg:w-8"
            />
          </div>
        </div>

        <div className="w-full lg:px-8  pt-8 ">
          {/* Main Title */}
          <div className="mb-8 ">
            <h1 className="lg:text-3xl text-2xl font-black text-gray-800 mb-4">
              {data.mainPage.title.toUpperCase()}
            </h1>
            <h2 className=" text-xl lg:text-2xl font-bold text-[#23B14D] italic mb-4">
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
          <div className="my-10 relative z-40">
            {/* Card */}
            <div className="flex  justify-center lg:justify-start   lg:flex-nowrap  lg:space-x-10 flex-wrap space-y-20 lg:space-y-0 ">
              {/* Why This Matters Card */}
              <div
                className="w-[250px] relative cursor-pointer"
                onClick={() => setOpenModal("whyThisMatters")}
              >
                <h3 className="text-lg font-bold flex justify-center">
                  {data.modal.whyThisMatters.title}
                </h3>
                <div>
                  <div className="absolute -bottom-8 -left-14">
                    <img
                      src="/images/women-in-energy/shape1.png"
                      alt="vector"
                      className="w-14"
                    />
                  </div>
                  <div className="absolute -top-2 -right-4">
                    <img
                      src="/images/women-in-energy/shape2.png"
                      alt="vector"
                      className="w-14"
                    />
                  </div>
                </div>
                <img
                  src={cards[0].img}
                  className="w-9/12 mx-auto"
                  alt={data.modal.whyThisMatters.img.alt}
                />
                <div className="flex justify-between relative space-x-4">
                  <p className="w-6/12 text-xs">{cards[0].description}</p>
                  <button className="absolute bottom-0 right-4">
                    <img
                      src="/images/women-in-energy/cta.png"
                      className="w-28"
                      alt="Cta"
                    />
                  </button>
                </div>
              </div>

              {/* Initiatives Underway Card */}
              <div
                className="w-[250px] relative cursor-pointer"
                onClick={() => setOpenModal("initiativesUnderway")}
              >
                <h3 className="text-lg font-bold flex justify-center">
                  {data.modal.initiativesUnderway.title}
                </h3>
                <div>
                  <div className="absolute -bottom-8 -left-14">
                    <img
                      src="/images/women-in-energy/shape1.png"
                      alt="vector"
                      className="w-14"
                    />
                  </div>
                  <div className="absolute -top-2 -right-4">
                    <img
                      src="/images/women-in-energy/shape2.png"
                      alt="vector"
                      className="w-14"
                    />
                  </div>
                </div>
                <img
                  src={cards[1].img}
                  className="w-9/12 mx-auto"
                  alt={cards[1].description}
                />
                <div className="flex justify-between relative space-x-4">
                  <p className="w-6/12 text-xs">{cards[1].description}</p>
                  <button className="absolute bottom-0 right-4">
                    <img
                      src="/images/women-in-energy/cta.png"
                      className="w-28"
                      alt="Cta"
                    />
                  </button>
                </div>
              </div>

              {/* Voices of Power Card */}
              <div
                className="w-[250px] relative cursor-pointer"
                onClick={() => setOpenModal("voicesOfPower")}
              >
                <h3 className="text-lg font-bold flex justify-center">
                  {data.modal.voicesOfPower.title}
                </h3>
                <div>
                  <div className="absolute -bottom-8 -left-14">
                    <img
                      src="/images/women-in-energy/shape1.png"
                      alt="vector"
                      className="w-14"
                    />
                  </div>
                  <div className="absolute -top-2 -right-4">
                    <img
                      src="/images/women-in-energy/shape2.png"
                      alt="vector"
                      className="w-14"
                    />
                  </div>
                </div>
                <img
                  src={cards[2].img}
                  className="w-9/12 mx-auto"
                  alt={cards[2].description}
                />
                <div className="flex justify-between relative space-x-4">
                  <p className="w-6/12 text-xs">{cards[2].description}</p>
                  <button className="absolute bottom-0 right-4">
                    <img
                      src="/images/women-in-energy/cta.png"
                      className="w-28"
                      alt="Cta"
                    />
                  </button>
                </div>
              </div>

              {/* Partner with Us Card */}
              <div
                className="w-[250px] relative cursor-pointer"
                onClick={() => setOpenModal("partnerWithUs")}
              >
                <h3 className="text-lg font-bold flex justify-center">
                  {data.modal.partnerWithUs.title}
                </h3>
                <div>
                  <div className="absolute -bottom-8 -left-14">
                    <img
                      src="/images/women-in-energy/shape1.png"
                      alt="vector"
                      className="w-14"
                    />
                  </div>
                  <div className="absolute -top-2 -right-4">
                    <img
                      src="/images/women-in-energy/shape2.png"
                      alt="vector"
                      className="w-14"
                    />
                  </div>
                </div>
                <img
                  src={cards[3].img}
                  className="w-9/12 mx-auto"
                  alt={cards[3].description}
                />
                <div className="flex justify-between relative space-x-4">
                  <p className="w-6/12 text-xs">{cards[3].description}</p>
                  <button className="absolute bottom-0 right-4">
                    <img
                      src="/images/women-in-energy/cta.png"
                      className="w-28"
                      alt="Cta"
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute  right-0 -z-10">
            <img src="/images/women-in-energy/mainImg.png" alt="" />
          </div>
          <div className="my-20 flex justify-end relative">
            <div className="lg:block hidden absolute -bottom-4 left-[70%]">
              <img src="/images/women-in-energy/shape1.png" alt="vector" />
            </div>
            <div className="lg:block hidden absolute -top-8 -right-4">
              <img src="/images/women-in-energy/shape2.png" alt="vector" />
            </div>
            <div className=" capitalize lg:text-xl font-bold whitespace-pre-line">
              {data.mainPage.quote1.text}
            </div>
          </div>
          <div className="my-20 mb-32">
            <div className=" lg:flex space-x-4 justify-between">
              <div className="my-8 lg:my-0">
                <h3 className="text-xl lg:text-2xl font-bold   whitespace-pre-line">
                  
                  {highlightText(data.mainPage.quote2.text, data.mainPage.quote2.highlighted)}
                </h3>
              </div>
              <div className="space-y-8  ">
                <div>
                  <Link
                    href={data.mainPage.cta[0].href || "#"}
                    className="relative cursor-pointer"
                  >
                    <img
                      src="/images/women-in-energy/womenBtn.png"
                      alt={"submit interest"}
                    />
                    <div className="absolute top-3 left-8 text-sm lg:text-lg font-semibold ">
                      {data.mainPage.cta[0].text}
                    </div>
                  </Link>
                </div>
                <div>
                  <Link
                    href={data.mainPage.cta[1].href || "#"}
                    className="relative cursor-pointer"
                  >
                    <img
                      src="/images/women-in-energy/joinNetworkBtn.png"
                      alt={"submit interest"}
                    />
                    <div className="absolute top-3 lg:top-4 lg:text-base text-xs left-4 lg:left-10  font-semibold ">
                      {data.mainPage.cta[1].text}
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <Chatbot />
        </div>
      </div>

      {/* Modals */}
      <WhyThisMatters
        isOpen={openModal === "whyThisMatters"}
        onClose={() => setOpenModal(null)}
      />
      <InitiativesUnderway
        isOpen={openModal === "initiativesUnderway"}
        onClose={() => setOpenModal(null)}
      />
      <VoicesofPower
        isOpen={openModal === "voicesOfPower"}
        onClose={() => setOpenModal(null)}
      />
      <PartnerwithUs
        isOpen={openModal === "partnerWithUs"}
        onClose={() => setOpenModal(null)}
      />
    </React.Fragment>
  );
};

export default WomenInEnergy;
