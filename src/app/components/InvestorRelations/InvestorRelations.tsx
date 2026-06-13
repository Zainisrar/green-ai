"use client";
import React, { useState } from "react";
import TopNavigation from "../TopNavigation/TopNavigation";
import Chatbot from "../Chatbot";
import Link from "next/link";
import { useInvestorRelations } from "../../../hooks/useInvestorRelations";
import WhyInvestGreen from "./Dialog/WhyInvestGreen";
import InvestmentFocusArea from "./Dialog/InvestmentFocusArea";
import PerformanceSnapshots from "./Dialog/PerformanceSnapshots";
import InvestmentInstruments from "./Dialog/InvestmentInstruments";

const InvestorRelations = () => {
  const { data } = useInvestorRelations();
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
        <span key={index} className="text-[#23B14D] font-semibold">
          {part}
        </span>
      ) : (
        part
      );
    });
  };


if (!data) return null;

  const investmentCards = [
    {
      title: data.whyInvestGreen.title,
      description: data.whyInvestGreen.headline,
      image: "/images/investor-relations/card1.png",
      modalKey: "whyInvestGreen",
    },
    {
      title: data.investmentFocusArea.title,
      description: data.investmentFocusArea.headline,
      image: "/images/investor-relations/card2.png",
      modalKey: "investmentFocusArea",
    },
    {
      title: data.performanceSnapshots.title,
      description: data.performanceSnapshots.headline,
      image: "/images/investor-relations/card3.png",
      modalKey: "performanceSnapshots",
    },
    {
      title: data.investmentInstruments.title,
      description: data.investmentInstruments.headline,
      image: "/images/investor-relations/card4.png",
      modalKey: "investmentInstruments",
    },
  ];

  return (
    <React.Fragment>
      <TopNavigation />
      <div className="z-50 flex h-full min-h-screen bg-gradient-to-br from-[#E8F5E9] via-white to-white">
        {/* Left Sidebar - Vertical Text */}
        <div className="w-1/6 flex items-center justify-center">
          <div className="fixed top-4/12 lg:top-1/3 left-4 lg:left-14 z-10">
            <img
              src="/images/investor-relations/investor-relations.png"
              alt="investor-relations"
              className="w-6 lg:w-8"
            />
          </div>
        </div>

        {/* Main Content */}
        <div className="w-full lg:px-8 pt-8 pb-20">
          {/* Header Section */}
          <div className="mb-12">
            <h1 className="text-2xl lg:text-3xl font-black text-gray-900 mb-4">
              {data.mainPage.title.toUpperCase().split(" ")[0]}{" "}
              <span className="text-[#23B14D]">
                {data.mainPage.title.toUpperCase().split(" ")[1]}
              </span>
            </h1>
            <h2 className="text-2xl lg:text-3xl font-bold text-[#23B14D] italic mb-6">
              {data.mainPage.subHeadline}
            </h2>
            <div className="text-gray-700 lg:text-lg mb-6 max-w-4xl">
              <p className="mb-2">
                {highlightText(
                  data.mainPage.description.text,
                  data.mainPage.description.highlighted
                )}
              </p>
            </div>
          </div>

          {/* Investment Cards Grid */}
          <div className="lg:flex justify-between">
            <div className="grid grid-cols-1 gap-8 ">
              {investmentCards.map((card, idx) => (
                <div
                  key={idx}
                  className="relative group cursor-pointer transform transition-all duration-300 hover:scale-105"
                  onClick={() => setOpenModal(card.modalKey)}
                >
                  <div className="flex">
                    {/* Image Section */}
                    <div className="">
                      <img src={card.image} alt={card.title} />
                    </div>

                    {/* Content Section */}
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-3">
                        {card.title}
                      </h3>
                      <div className="flex w-[300px]">
                        <p className="text-gray-600 mb-4">{card.description}</p>
                        <button className="w-full">
                          <img
                            src="/images/investor-relations/explore.png"
                            alt="exploreBtn"
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="">
              <div className="lg:block hidden absolute right-0 top-0 w-6/12 -z-10">
                <img
                  src="/images/investor-relations/mainImg.png"
                  className="h-[200vh]"
                  alt="mainImg"
                />
              </div>
              <div className=" relative capitalize flex flex-col  justify-center my-12 lg:my-0 lg:h-[40vh] font-bold text-base mr-10 italic ">
                <div className="lg:block hidden absolute bottom-24 -left-20">
                  <img
                    src="/images/investor-relations/shape1.png"
                    alt="vector"
                  />
                </div>
                <p className="text-gray-800 text-center lg:text-left text-lg">
                  {data.mainPage.quote1.text.split('\n').map((line, index) => (
                    <React.Fragment key={index}>
                      {highlightText(line, data.mainPage.quote1.highlighted)}
                      {index < data.mainPage.quote1.text.split('\n').length - 1 && <br />}
                    </React.Fragment>
                  ))}
                </p>
                <div className="lg:block hidden absolute top-16 -right-16">
                  <img
                    src="/images/investor-relations/shape2.png"
                    alt="vector"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="lg:flex">
            {/* Bottom Quote Section */}
            <div className="">
              <h2 className="text-xl lg:text-3xl font-bold text-gray-900 mb-4">
                {highlightText(
                  data.mainPage.quote2.text.split("\n")[0],
                  ""
                )}
              </h2>
              <h3 className="text-lg lg:text-2xl font-bold mb-6">
                {highlightText(
                  data.mainPage.quote2.text.split("\n")[1],
                  data.mainPage.quote2.highlighted
                )}
              </h3>
            </div>

            {/* CTA Buttons */}
            <div className="space-y-8">
              <div className="cursor-pointer">
                <Link href={data.mainPage.cta[0].href || "#"} className="relative group">
                  <button className="cursor-pointer">
                    <img
                      src="/images/investor-relations/download.png"
                      alt="download"
                    />
                  </button>
                </Link>
              </div>

              <div className="cursor-pointer">
                <Link href={data.mainPage.cta[1].href || "#"} className="relative group">
                  <button className="cursor-pointer">
                    <img
                      src="/images/investor-relations/submit.png"
                      alt="submit"
                    />
                  </button>
                </Link>
              </div>
            </div>
          </div>

          <Chatbot />
        </div>
      </div>

      {/* Modals */}
      <WhyInvestGreen
        isOpen={openModal === "whyInvestGreen"}
        onClose={() => setOpenModal(null)}
      />
      <InvestmentFocusArea
        isOpen={openModal === "investmentFocusArea"}
        onClose={() => setOpenModal(null)}
      />
      <PerformanceSnapshots
        isOpen={openModal === "performanceSnapshots"}
        onClose={() => setOpenModal(null)}
      />
      <InvestmentInstruments
        isOpen={openModal === "investmentInstruments"}
        onClose={() => setOpenModal(null)}
      />
    </React.Fragment>
  );
};

export default InvestorRelations;
