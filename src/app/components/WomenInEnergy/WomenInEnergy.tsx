"use client";
import React, { useState } from "react";
import TopNavigation from "../TopNavigation/TopNavigation";
import Chatbot from "../Chatbot";
import SiteHeader from "../SiteHeader/SiteHeader";
import FigmaAngledCta from "../FigmaAngledCta/FigmaAngledCta";
import D6Chatbot from "../D6Chatbot";
import styles from "./WomenInEnergy.module.css";
import Link from "next/link";
import { useWomenInEnergy } from "../../../hooks/useWomenInEnergy";
import WhyThisMatters from "./Dialog/WhyThisMatters";
import InitiativesUnderway from "./Dialog/InitiativesUnderway";
import VoicesofPower from "./Dialog/VoicesofPower";
import PartnerwithUs from "./Dialog/PartnerwithUs";
import JoinTheNetwork from "./Dialog/JoinTheNetwork";

const WomenInEnergy = ({ canvas = false }: { canvas?: boolean }) => {
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
    const pattern = highlightTerms.map((term) => escapeRegExp(term)).join("|");

    const parts = text.split(new RegExp(`(${pattern})`, "gi"));

    return parts.map((part, index) => {
      // Check if this part matches any of the highlight terms
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

  if (canvas) {
    const canvasCards = [
      {
        title: "Why This Matters",
        image: "/images/women-in-energy/card1.png",
        description:
          "Energy access is only transformational if it includes everyone.",
        onClick: () => setOpenModal("whyThisMatters"),
      },
      {
        title: "Initiatives Underway",
        image: "/images/women-in-energy/card2.png",
        description: "Precision design.\nTerrain-smart. Load-aware.",
        onClick: () => setOpenModal("initiativesUnderway"),
      },
      {
        title: "Voices of Power",
        image: "/images/women-in-energy/card3.png",
        description: "Executed in-house.\nBuilt to endure.",
        onClick: () => setOpenModal("voicesOfPower"),
      },
      {
        title: "Partner with Us",
        image: "/images/women-in-energy/card4.png",
        description: "Executed in-house.\nBuilt to endure.",
        onClick: () => setOpenModal("partnerWithUs"),
      },
    ];

    return (
      <main className={styles.canvasPage} data-node-id="7077:19753">
        <SiteHeader layout="figmaCanvas" figmaPanelVariant="flagship" />
        <div className={styles.canvasArtwork} aria-hidden="true">
          <img loading="eager" decoding="async" src="/images/women-in-energy/mainImg.png" alt="" />
        </div>
        <img loading="lazy" decoding="async"
          className={styles.canvasVerticalTitle}
          src="/images/women-in-energy/women-in-energy.png"
          alt="Women in Energy"
        />
        <h1 className={styles.canvasTitle}>
          Women in <span>Energy</span>
        </h1>
        <p className={styles.canvasSubtitle}>
          Powering Equity. Engineering Inclusion.
        </p>
        <p className={styles.canvasDescription}>
          At <strong>GREEN</strong>, women are not just participants—they are
          pioneers.
          <br />
          From solar technicians to project engineers to regional leads, we’re
          breaking stereotypes and building a gender-equal energy future.
        </p>
        <div className={styles.canvasCards}>
          {canvasCards.map((card, index) => (
            <div
              className={`${styles.canvasCard} ${styles[`canvasCard${index + 1}`]}`}
              key={card.title}
              role="button"
              tabIndex={0}
              onClick={card.onClick}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  card.onClick();
                }
              }}
            >
              <h2>{card.title}</h2>
              <img loading="lazy" decoding="async"
                className={styles.canvasCardFrameStart}
                src="/images/women-in-energy/shape1.png"
                alt=""
                aria-hidden="true"
              />
              <img loading="lazy" decoding="async"
                className={styles.canvasCardFrameEnd}
                src="/images/women-in-energy/shape2.png"
                alt=""
                aria-hidden="true"
              />
              <img loading="eager" decoding="async" className={styles.canvasCardImage} src={card.image} alt="" />
              <p className={styles.canvasCardDescription}>{card.description}</p>
              <FigmaAngledCta
                className={styles.canvasCardCta}
                onClick={(event) => {
                  event.stopPropagation();
                  card.onClick();
                }}
              >
                Explore
              </FigmaAngledCta>
            </div>
          ))}
        </div>
        <img loading="lazy" decoding="async"
          className={styles.canvasQuoteFrameStart}
          src="/images/women-in-energy/figma/quote-frame-left.svg"
          alt=""
          aria-hidden="true"
        />
        <img loading="lazy" decoding="async"
          className={styles.canvasQuoteFrameEnd}
          src="/images/women-in-energy/figma/quote-frame-right.svg"
          alt=""
          aria-hidden="true"
        />
        <p className={styles.canvasRightQuote}>
          Because When Women
          <br />
          Build Energy Systems
          <br />— They Electrify Possibility.
        </p>
        <p className={styles.canvasBottomQuote}>
          <span>GREEN’s</span> Workforce Is Now <span>22%</span> Female In
          Technical Roles
          <br />— And Growing.
        </p>
        <div className={styles.canvasReadMore}>
          <span>Read more</span>
          <span aria-hidden="true">›</span>
        </div>
        <FigmaAngledCta
          className={styles.canvasProspectusCta}
          href={data?.mainPage?.cta?.[0]?.href || "#"}
          icon="download"
        >
          Women in Energy Program Brief (PDF)
        </FigmaAngledCta>
        <FigmaAngledCta
          className={styles.canvasJoinCta}
          onClick={() => setOpenModal("joinNetwork")}
          showArrow
        >
          Join the Network | Apply for Labs | Partner to Scale
        </FigmaAngledCta>
        <D6Chatbot canvasAnchored triggerVariant="figmaCanvas" />
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
        <JoinTheNetwork
          isOpen={openModal === "joinNetwork"}
          onClose={() => setOpenModal(null)}
        />
      </main>
    );
  }

  if (error || !data) {
    return null;
  }

  return (
    <React.Fragment>
      <TopNavigation />
      <div className="flex h-full">
        <div className="w-1/6 flex items-center justify-center">
          <div className="fixed top-1/3 left-4 lg:left-14">
            <img loading="lazy" decoding="async"
              src="/images/women-in-energy/women-in-energy.png"
              alt="women-in-energy"
              className="w-6 lg:w-8"
            />
          </div>
        </div>

        <div className="w-full lg:px-8  pt-8 ">
          {/* Main Title */}
          <div className="mb-8 ">
            <h1 className="text-2xl lg:text-3xl font-black text-gray-800 mb-4">
              {data.mainPage.title.toUpperCase()}
            </h1>
            <h2 className=" text-xl lg:text-2xl font-bold text-[#23B14D] italic mb-4">
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
          <div className="my-10 relative z-40">
            {/* Card */}
            <div className="flex  justify-center lg:justify-start   lg:flex-nowrap  lg:space-x-10 flex-wrap space-y-20 lg:space-y-0 ">
              {/* Why This Matters Card */}
              <div
                className="w-[250px] relative cursor-pointer"
                onClick={() => setOpenModal("whyThisMatters")}
              >
                <h3 className="text-lg lg:text-xl font-bold flex justify-center">
                  {data.modal.whyThisMatters.title}
                </h3>
                <div>
                  <div className="absolute -bottom-8 -left-14">
                    <img loading="lazy" decoding="async"
                      src="/images/women-in-energy/shape1.png"
                      alt="vector"
                      className="w-14"
                    />
                  </div>
                  <div className="absolute -top-2 -right-4">
                    <img loading="lazy" decoding="async"
                      src="/images/women-in-energy/shape2.png"
                      alt="vector"
                      className="w-14"
                    />
                  </div>
                </div>
                <img loading="lazy" decoding="async"
                  src={cards[0].img}
                  className="w-9/12 mx-auto"
                  alt={data.modal.whyThisMatters.img.alt}
                />
                <div className="flex justify-between relative space-x-4">
                  <p className="w-6/12 text-xs">{cards[0].description}</p>
                  <button className="absolute bottom-0 right-4">
                    <img loading="lazy" decoding="async"
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
                <h3 className="text-lg lg:text-xl font-bold flex justify-center">
                  {data.modal.initiativesUnderway.title}
                </h3>
                <div>
                  <div className="absolute -bottom-8 -left-14">
                    <img loading="lazy" decoding="async"
                      src="/images/women-in-energy/shape1.png"
                      alt="vector"
                      className="w-14"
                    />
                  </div>
                  <div className="absolute -top-2 -right-4">
                    <img loading="lazy" decoding="async"
                      src="/images/women-in-energy/shape2.png"
                      alt="vector"
                      className="w-14"
                    />
                  </div>
                </div>
                <img loading="lazy" decoding="async"
                  src={cards[1].img}
                  className="w-9/12 mx-auto"
                  alt={cards[1].description}
                />
                <div className="flex justify-between relative space-x-4">
                  <p className="w-6/12 text-xs">{cards[1].description}</p>
                  <button className="absolute bottom-0 right-4">
                    <img loading="lazy" decoding="async"
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
                <h3 className="text-lg lg:text-xl font-bold flex justify-center">
                  {data.modal.voicesOfPower.title}
                </h3>
                <div>
                  <div className="absolute -bottom-8 -left-14">
                    <img loading="lazy" decoding="async"
                      src="/images/women-in-energy/shape1.png"
                      alt="vector"
                      className="w-14"
                    />
                  </div>
                  <div className="absolute -top-2 -right-4">
                    <img loading="lazy" decoding="async"
                      src="/images/women-in-energy/shape2.png"
                      alt="vector"
                      className="w-14"
                    />
                  </div>
                </div>
                <img loading="lazy" decoding="async"
                  src={cards[2].img}
                  className="w-9/12 mx-auto"
                  alt={cards[2].description}
                />
                <div className="flex justify-between relative space-x-4">
                  <p className="w-6/12 text-xs">{cards[2].description}</p>
                  <button className="absolute bottom-0 right-4">
                    <img loading="lazy" decoding="async"
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
                <h3 className="text-lg lg:text-xl font-bold flex justify-center">
                  {data.modal.partnerWithUs.title}
                </h3>
                <div>
                  <div className="absolute -bottom-8 -left-14">
                    <img loading="lazy" decoding="async"
                      src="/images/women-in-energy/shape1.png"
                      alt="vector"
                      className="w-14"
                    />
                  </div>
                  <div className="absolute -top-2 -right-4">
                    <img loading="lazy" decoding="async"
                      src="/images/women-in-energy/shape2.png"
                      alt="vector"
                      className="w-14"
                    />
                  </div>
                </div>
                <img loading="lazy" decoding="async"
                  src={cards[3].img}
                  className="w-9/12 mx-auto"
                  alt={cards[3].description}
                />
                <div className="flex justify-between relative space-x-4">
                  <p className="w-6/12 text-xs">{cards[3].description}</p>
                  <button className="absolute bottom-0 right-4">
                    <img loading="lazy" decoding="async"
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
            <img loading="lazy" decoding="async"
              src="/images/women-in-energy/mainImg.png"
              alt=""
              role="presentation"
            />
          </div>
          <div className="my-20 flex justify-end relative">
            <div className="lg:block hidden absolute -bottom-4 left-[70%]">
              <img loading="lazy" decoding="async" src="/images/women-in-energy/shape1.png" alt="vector" />
            </div>
            <div className="lg:block hidden absolute -top-8 -right-4">
              <img loading="lazy" decoding="async" src="/images/women-in-energy/shape2.png" alt="vector" />
            </div>
            <div className=" capitalize lg:text-xl font-bold whitespace-pre-line">
              {data.mainPage.quote1.text}
            </div>
          </div>
          <div className="my-20 mb-32">
            <div className=" lg:flex space-x-4 justify-between">
              <div className="my-8 lg:my-0">
                <h3 className="text-xl lg:text-2xl font-bold   whitespace-pre-line">
                  {highlightText(
                    data.mainPage.quote2.text,
                    data.mainPage.quote2.highlighted,
                  )}
                </h3>
              </div>
              <div className="space-y-8  ">
                <div>
                  <Link
                    href={data.mainPage.cta[0].href || "#"}
                    className="relative cursor-pointer"
                  >
                    <img loading="lazy" decoding="async"
                      src="/images/women-in-energy/womenBtn.png"
                      alt={"submit interest"}
                    />
                    <div className="absolute inset-0 flex items-center pl-8 lg:pl-10 pr-12 lg:pr-16 text-sm lg:text-base font-semibold leading-tight">
                      {data.mainPage.cta[0].text}
                    </div>
                  </Link>
                </div>
                <div>
                  <button
                    type="button"
                    onClick={() => setOpenModal("joinNetwork")}
                    className="relative cursor-pointer"
                  >
                    <img loading="lazy" decoding="async"
                      src="/images/women-in-energy/joinNetworkBtn.png"
                      alt={"join the network"}
                    />
                    <div className="absolute inset-0 flex items-center pl-8 lg:pl-10 pr-12 lg:pr-16 text-xs lg:text-sm font-semibold leading-tight">
                      {data.mainPage.cta[1].text}
                    </div>
                  </button>
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
      <JoinTheNetwork
        isOpen={openModal === "joinNetwork"}
        onClose={() => setOpenModal(null)}
      />
    </React.Fragment>
  );
};

export default WomenInEnergy;
