"use client";

import Image from "next/image";
import React, { useState } from "react";
import { useCollaborationInnovation } from "@/hooks/useCollaborationInnovation";
import D6Chatbot from "../D6Chatbot";
import FigmaAngledCta from "../FigmaAngledCta/FigmaAngledCta";
import ProductEnquiry from "../Product/Modals/ProductEnquiry";
import SiteHeader from "../SiteHeader/SiteHeader";
import styles from "./CollaborationInnovation.module.css";
import InnovationSpotlight from "./Dialog/InnovationSpotlight";
import OurPhilosophy from "./Dialog/OurPhilosophy";
import WhoWeCollaborateWith from "./Dialog/WhoWeCollaborateWith";

// Figma-locked design content (node 7077:18721).
const FALLBACK = {
  title: "COLLABORATION & INNOVATION",
  subHeadline: "Innovation Begins with Collaboration.",
  description: {
    text: "At GREEN, we believe the future of energy isn't invented in isolation.\nIt's co-engineered with the bold — researchers, technologists, funders, startups, and institutions who are building tomorrow today.",
    highlighted: "GREEN",
  },
  cards: [
    {
      key: "philosophy",
      title: "Our Philosophy",
      subtitle: "We don't chase trends.\nWe co-create breakthroughs",
      image: "/images/collaboration-innovation/card1_img.png",
    },
    {
      key: "collaborate",
      title: "Who We Collaborate With",
      subtitle: "Precision design.\nTerrain-smart. Load-aware.",
      image: "/images/collaboration-innovation/card2_img.png",
    },
    {
      key: "spotlight",
      title: "Innovation Spotlight",
      subtitle: "Executed in-house.\nBuilt to endure.",
      image: "/images/collaboration-innovation/card3_img.png",
    },
  ],
  quote1: {
    text: "“OPEN CALL: Tech Startups for Tropicalized BESS 2025”",
    highlighted: "BESS 2025",
  },
  quote2: {
    text: "Every phase has one owner. GREEN.\nEvery project is more than delivered — it’s engineered for legacy.",
    highlighted: "GREEN.",
  },
};

interface CollaborationInnovationProps {
  canvas?: boolean;
}

export default function CollaborationInnovation({
  canvas = false,
}: CollaborationInnovationProps) {
  const { data } = useCollaborationInnovation();
  const [openModal, setOpenModal] = useState<string | null>(null);
  const [isProposalOpen, setIsProposalOpen] = useState(false);

  const cmsCards = data
    ? [
        {
          title: data.ourPhilosophy.title,
          subtitle: data.ourPhilosophy.subHeadline,
          image: data.ourPhilosophy.img?.src,
        },
        {
          title: data.whoWeCelebrateWith.title,
          subtitle: data.whoWeCelebrateWith.items?.[0]?.engagementScope,
        },
        {
          title: data.innovationSpotlight.title,
          subtitle: data.innovationSpotlight.keys?.[0]?.description,
        },
      ]
    : [];
  const d = data
    ? {
        ...FALLBACK,
        title: data.mainPage.title,
        subHeadline: data.mainPage.subHeadline,
        description: data.mainPage.description,
        cards: FALLBACK.cards.map((card, index) => ({
          ...card,
          title: cmsCards[index]?.title?.trim() || card.title,
          subtitle: cmsCards[index]?.subtitle || card.subtitle,
          image: cmsCards[index]?.image || card.image,
        })),
        quote1: data.mainPage.quote?.[0] ?? FALLBACK.quote1,
        quote2: {
          text:
            data.mainPage.quote
              ?.slice(1)
              .map((quote) => quote.text)
              .join("\n") || FALLBACK.quote2.text,
          highlighted:
            data.mainPage.quote?.[1]?.highlighted ||
            FALLBACK.quote2.highlighted,
        },
      }
    : FALLBACK;

  const highlightText = (
    text: string,
    highlight: string,
  ): React.ReactNode | string => {
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
        <span key={index} className={styles.greenHighlight}>
          {part}
        </span>
      ) : (
        part
      );
    });
  };

  const splitLines = (text: string) =>
    text.split("\n").map((line, i, arr) => (
      <React.Fragment key={i}>
        {line}
        {i < arr.length - 1 ? <br /> : null}
      </React.Fragment>
    ));

  return (
    <main
      className={`${styles.page} ${canvas ? styles.canvasPage : ""}`}
      data-node-id="7077:18721"
    >
      <SiteHeader layout={canvas ? "figmaCanvas" : "viewport"} />

      {/* ── DESKTOP CANVAS (Exact 1920x970 Figma layout) ── */}
      <div className={styles.desktopCanvas} aria-hidden={!canvas}>
        {/* Background atom / orbital glow graphic (node 7077:18730, 680x563 at 0,408) */}
        <div className={styles.bgAtom} aria-hidden="true">
          <img
            loading="lazy"
            decoding="async"
            src="/images/collaboration-innovation/mainImg.png"
            alt=""
          />
        </div>

        {/* Vertical outlined side title (Raleway 900, 50px, stroke #989898) */}
        <h2 className={styles.verticalTitle}>{d.title}</h2>

        {/* Header section */}
        <div className={styles.headerBlock}>
          <h1 className={styles.mainTitle}>{d.title}</h1>
          <p className={styles.subHeadline}>{d.subHeadline}</p>
          <p className={styles.description}>
            {highlightText(
              d.description.text.replace(/\r?\n/g, " "),
              d.description.highlighted,
            )}
          </p>
        </div>

        {/* Three slanted feature cards (Vectors 7362 / 7363 / 7364 with card-vector.svg) */}
        {d.cards.map((card, idx) => {
          const cardLeft = [588, 972, 1359][idx];
          const imgLeft = [682, 1063, 1451][idx];
          const imgTop = [421, 424, 421][idx];
          const titleX = [774, 1154, 1551][idx];
          const titleY = [356, 354, 354][idx];
          const subX = [653, 1053, 1448][idx];
          const subY = [590, 586, 583][idx];
          return (
            <div
              key={card.key}
              className={styles.card}
              style={{ top: [341, 338, 339][idx], left: cardLeft }}
            >
              {/* Slanted gradient card boundary & drop shadow from Figma */}
              <img
                src="/images/collaboration-innovation/card-vector.svg"
                alt=""
                className={styles.cardVectorBg}
                aria-hidden="true"
              />
              <h3
                className={styles.cardTitle}
                style={{
                  position: "absolute",
                  left: titleX - cardLeft,
                  top: titleY - [341, 338, 339][idx],
                }}
              >
                {card.title}
              </h3>
              <button
                type="button"
                className={styles.cardImage}
                style={{
                  position: "absolute",
                  left: imgLeft - cardLeft,
                  top: imgTop - [341, 338, 339][idx],
                }}
                onClick={() => setOpenModal(card.key)}
                aria-label={`Open ${card.title} popup`}
              >
                <img
                  loading="lazy"
                  decoding="async"
                  src={card.image}
                  alt={card.title}
                />
                <span className={styles.cardImageAccent} aria-hidden="true" />
              </button>
              <p
                className={`${styles.cardSubtitle} ${
                  idx === 2 ? styles.cardSubtitleDense : ""
                }`}
                style={{
                  position: "absolute",
                  left: subX - cardLeft,
                  top: subY - [341, 338, 339][idx],
                }}
              >
                {splitLines(card.subtitle)}
              </p>
              <FigmaAngledCta
                size="sm"
                className={styles.cardCta}
                onClick={() => setOpenModal(card.key)}
              >
                Explore
              </FigmaAngledCta>
            </div>
          );
        })}

        {/* Bottom-left quote callout (OPEN CALL) */}
        <button
          type="button"
          className={styles.bottomQuote}
          onClick={() => setIsProposalOpen(true)}
          aria-label="Open Call: Submit Proposal"
        >
          <img
            loading="lazy"
            decoding="async"
            src="/images/collaboration-innovation/quote_left.png"
            alt=""
            className={styles.quoteBracketLeft}
            aria-hidden="true"
          />
          <span className={styles.quoteText}>
            {highlightText(
              d.quote1.text.slice(1, d.quote1.text.length - 1),
              d.quote1.highlighted,
            )}
          </span>
          <img
            loading="lazy"
            decoding="async"
            src="/images/collaboration-innovation/quote_right.png"
            alt=""
            className={styles.quoteBracketRight}
            aria-hidden="true"
          />
        </button>

        {/* Legacy statement */}
        <p className={styles.legacyQuote}>
          {highlightText(
            d.quote2.text.replace(/\r?\n/g, " "),
            d.quote2.highlighted,
          )}
        </p>

        {/* Bottom-right CTAs: Proposal opens modal; Framework PDF is direct link/download with NO pop window */}
        <FigmaAngledCta
          className={styles.submitCta}
          style={{ position: "absolute", left: 1498, top: 741 }}
          onClick={() => setIsProposalOpen(true)}
        >
          {data?.mainPage?.cta?.[0]?.text ??
            "Submit Proposal / Collaboration Inquiry"}
        </FigmaAngledCta>
        <FigmaAngledCta
          className={styles.frameworkCta}
          style={{ position: "absolute", left: 1428, top: 819 }}
          icon="download"
          href={
            data?.mainPage?.cta?.[1]?.href ||
            "/green-innovation-partnership-framework.pdf"
          }
          target="_blank"
          rel="noopener noreferrer"
        >
          {data?.mainPage?.cta?.[1]?.text ??
            "GREEN Innovation Partnership Framework (PDF)"}
        </FigmaAngledCta>

        {/* Chatbot */}
        {canvas ? (
          <D6Chatbot
            canvasAnchored
            triggerVariant="figmaCanvas"
            triggerStyle={{
              top: 899,
              right: "auto",
              bottom: "auto",
              left: 1498,
              width: 418,
            }}
          />
        ) : (
          <D6Chatbot />
        )}
      </div>

      {/* ── MOBILE RESPONSIVE LAYOUT (< 1024px) ── */}
      <div className={styles.mobileLayout}>
        <div className={styles.mobileHero}>
          <h1 className={styles.mobileTitle}>{d.title}</h1>
          <p className={styles.mobileSubtitle}>{d.subHeadline}</p>
          <p className={styles.mobileDescription}>
            {highlightText(
              d.description.text.replace(/\r?\n/g, " "),
              d.description.highlighted,
            )}
          </p>
        </div>

        {/* Open Call Bracketed Quote on Mobile */}
        <button
          type="button"
          className={styles.mobileOpenCall}
          onClick={() => setIsProposalOpen(true)}
          aria-label="Open Call: Submit Proposal"
        >
          <img
            loading="lazy"
            decoding="async"
            src="/images/collaboration-innovation/quote_left.png"
            alt=""
            className={styles.mobileQuoteBracketLeft}
            aria-hidden="true"
          />
          <span className={styles.mobileOpenCallText}>
            {highlightText(
              d.quote1.text.slice(1, d.quote1.text.length - 1),
              d.quote1.highlighted,
            )}
          </span>
          <img
            loading="lazy"
            decoding="async"
            src="/images/collaboration-innovation/quote_right.png"
            alt=""
            className={styles.mobileQuoteBracketRight}
            aria-hidden="true"
          />
        </button>

        {/* Cards list on Mobile */}
        <div className={styles.mobileCardsList}>
          {d.cards.map((card) => (
            <div key={card.key} className={styles.mobileCard}>
              <h3 className={styles.mobileCardTitle}>{card.title}</h3>
              <div
                className={styles.mobileCardImage}
                onClick={() => setOpenModal(card.key)}
                onKeyDown={(e) => e.key === "Enter" && setOpenModal(card.key)}
                role="button"
                tabIndex={0}
              >
                <img
                  loading="lazy"
                  decoding="async"
                  src={card.image}
                  alt={card.title}
                />
              </div>
              <p className={styles.mobileCardSubtitle}>
                {splitLines(card.subtitle)}
              </p>
              <FigmaAngledCta
                size="sm"
                className={styles.mobileCardCta}
                onClick={() => setOpenModal(card.key)}
              >
                Explore
              </FigmaAngledCta>
            </div>
          ))}
        </div>

        {/* Mobile Legacy Statement */}
        <p className={styles.mobileLegacy}>
          {highlightText(
            d.quote2.text.replace(/\r?\n/g, " "),
            d.quote2.highlighted,
          )}
        </p>

        {/* Mobile CTAs */}
        <div className={styles.mobileCtas}>
          <FigmaAngledCta
            className={styles.mobileSubmitCta}
            onClick={() => setIsProposalOpen(true)}
          >
            Submit Proposal / Collaboration Inquiry
          </FigmaAngledCta>
          <FigmaAngledCta
            className={styles.mobileFrameworkCta}
            icon="download"
            href="/green-innovation-partnership-framework.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            GREEN Innovation Partnership Framework (PDF)
          </FigmaAngledCta>
        </div>

        <D6Chatbot />
      </div>

      {/* ── THREE EXPLORE POP WINDOWS (Figma Nodes 7077:18808, 7077:18915, 7077:19015) ── */}
      <OurPhilosophy
        isOpen={openModal === "philosophy"}
        onClose={() => setOpenModal(null)}
        data={data?.ourPhilosophy}
      />
      <WhoWeCollaborateWith
        isOpen={openModal === "collaborate"}
        onClose={() => setOpenModal(null)}
        data={data?.whoWeCelebrateWith}
      />
      <InnovationSpotlight
        isOpen={openModal === "spotlight"}
        onClose={() => setOpenModal(null)}
        data={data?.innovationSpotlight}
      />

      {/* ── REUSABLE PROPOSAL INQUIRY MODAL (Last PDF button has NO pop window) ── */}
      <ProductEnquiry
        isOpen={isProposalOpen}
        onClose={() => setIsProposalOpen(false)}
        productName="Collaboration & Innovation"
        titlePrefix="COLLABORATION"
        titleAccent="INQUIRY"
        interestLabel="COLLABORATION INITIATIVE"
        interestOptions={[
          "Tech Startups for Tropicalized BESS 2025",
          "Academic & Research Pilot",
          "GRID-INTEL™ Integration",
          "Modular Microgrid Deployment",
          "Community-Tied Energy Business Models",
          "General Innovation Proposal",
        ]}
        defaultInterest="Tech Startups for Tropicalized BESS 2025"
      />
    </main>
  );
}
