"use client";

import { useState } from "react";
import { useTechnologyInnovationAlliances } from "@/app/hooks/useTechnologyInnovationAlliances";
import D6Chatbot from "../D6Chatbot";
import FigmaAngledCta from "../FigmaAngledCta/FigmaAngledCta";
import SiteHeader from "../SiteHeader/SiteHeader";
import styles from "./TechnologyInnovationAlliances.module.css";
import WhyWePartner from "./Modals/WhyWePartner";
import CurrentTechnologyCollaborators from "./Modals/CurrentTechnologyCollaborators";
import ResearchCoDevelopment from "./Modals/ResearchCoDevelopment";
import InnovativePartner from "./Modals/InnovativePartner";
import ProductEnquiry from "../Product/Modals/ProductEnquiry";

// Figma-locked design content (node 7077:22719).
const FALLBACK = {
  title: "TECHNOLOGY & INNOVATION ALLIANCES",
  subHeadline: "Built on Collaboration. Powered by Innovation.",
  description: {
    text: "At GREEN, we don\u2019t just adopt new technologies \u2014 we co-create them. Our alliances with world-class innovators, research labs, startups, and system integrators accelerate our ability to deliver smarter, faster, and more resilient energy systems across PNG and the South Pacific.",
    highlighted: "GREEN",
  },
  quote1: {
    text: "Join GREEN in building the technologies that will power the next frontier of energy access.",
    highlighted: "GREEN",
  },
  goal: {
    text: "Our Goal: Build A Future-Proof Ecosystem That Outperforms Today\u2019s Limitations.",
    highlighted: "Our Goal:",
  },
  cards: [
    {
      key: "whyWePartner",
      title: "Why We Partner",
      subtitle:
        "We believe that no single player has all the answers. That's why GREEN seeks out:",
      image: "/images/technology-innovation-alliances/card_why_we_partner.png",
      x: 198,
      y: 347,
      titleX: 531,
      titleY: 338,
      subY: 384,
      ctaX: 655,
      ctaY: 448,
    },
    {
      key: "currentTechnologyCollaborators",
      title: "Current Technology\nCollaborators",
      subtitle:
        "We believe that no single player has all the answers. That's why GREEN seeks out:",
      image:
        "/images/technology-innovation-alliances/card_current_collaborators.png",
      x: 883,
      y: 347,
      titleX: 1218,
      titleY: 344,
      subY: 396,
      ctaX: 1340,
      ctaY: 448,
    },
    {
      key: "researchCoDevelopment",
      title: "Research & Co-Development",
      subtitle:
        "We believe that no single player has all the answers. That's why GREEN seeks out:",
      image: "/images/technology-innovation-alliances/card_research_co_dev.png",
      x: 202,
      y: 549,
      titleX: 531,
      titleY: 535,
      subY: 581,
      ctaX: 666,
      ctaY: 645,
    },
    {
      key: "becomeInnovationPartner",
      title: "Become an Innovation\nPartner",
      subtitle:
        "We believe that no single player has all the answers. That's why GREEN seeks out:",
      image:
        "/images/technology-innovation-alliances/card_innovation_partner.png",
      x: 875,
      y: 541,
      titleX: 1218,
      titleY: 538,
      subY: 588,
      ctaX: 1351,
      ctaY: 645,
    },
  ],
};

interface TechnologyInnovationAlliancesProps {
  canvas?: boolean;
}

export default function TechnologyInnovationAlliances({
  canvas = false,
}: TechnologyInnovationAlliancesProps) {
  const { data } = useTechnologyInnovationAlliances();
  const [openModal, setOpenModal] = useState<string | null>(null);
  const [isBecomeTechnologyPartnerOpen, setIsBecomeTechnologyPartnerOpen] =
    useState(false);

  const highlightText = (text: string, highlight: string) => {
    if (!text) return "";
    if (!highlight || !highlight.trim()) return text;
    const highlightTerms = highlight
      .trim()
      .split(/\s+/)
      .map((term) => term.trim())
      .filter(Boolean);
    if (highlightTerms.length === 0) return text;
    const pattern = highlightTerms
      .map((term) => term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
      .join("|");
    const parts = text.split(new RegExp(`(${pattern})`, "gi"));
    return parts.map((part, index) => {
      const shouldHighlight = highlightTerms.some(
        (term) => part.toLowerCase() === term.toLowerCase(),
      );
      return shouldHighlight ? (
        <span key={index} className={styles.highlight}>
          {part}
        </span>
      ) : (
        part
      );
    });
  };

  const cmsQuotes = data?.mainPage?.quote ?? [];
  const d = data
    ? {
        ...FALLBACK,
        title: data.mainPage.title,
        subHeadline: data.mainPage.subHeadline,
        description: data.mainPage.description,
        goal: cmsQuotes[0] ?? FALLBACK.goal,
        quote1: cmsQuotes[1] ?? FALLBACK.quote1,
        cards: FALLBACK.cards.map((card, index) => ({
          ...card,
          title: data.modals[index]?.title?.trim() || card.title,
          subtitle: data.modals[index]?.subHeadline || card.subtitle,
          image: data.modals[index]?.img?.src || card.image,
        })),
      }
    : FALLBACK;
  const ctaLinks = {
    innovationFramework:
      "mailto:innovation@green.com.pg?subject=Innovation%20Partnership%20Framework%20Request",
  };

  return (
    <main className={styles.page} data-node-id="7077:22719">
      <SiteHeader
        layout={canvas ? "figmaCanvas" : "viewport"}
        figmaPanelVariant={canvas ? "flagship" : "default"}
      />

      {/* Vertical outlined side title image — desktop only */}
      <img
        src="/images/technology-innovation-alliances/technology-innovation-alliances.png"
        alt="Technology & Innovation Alliances"
        className={`${styles.verticalTitleImg} ${styles.desktopOnly}`}
        loading="lazy"
        decoding="async"
      />

      {/* Right-side solar farm collage background — desktop only */}
      <div
        className={`${styles.rightCollage} ${styles.desktopOnly}`}
        aria-hidden="true"
      >
        <img
          loading="lazy"
          decoding="async"
          src="/images/technology-innovation-alliances/collage_bg.png"
          alt=""
        />
      </div>

      {/* Header section — desktop only */}
      <div className={`${styles.headerBlock} ${styles.desktopOnly}`}>
        <h1 className={styles.mainTitle}>{d.title}</h1>
        <p className={styles.subHeadline}>{d.subHeadline}</p>
        <p className={styles.description}>
          {highlightText(d.description.text, d.description.highlighted)}
        </p>
      </div>

      {/* Partnership pillars — desktop only */}
      {d.cards.map((card) => (
        <div
          key={card.key}
          className={`${styles.card} ${styles.desktopOnly}`}
          style={{ top: card.y, left: 0 }}
        >
          <button
            type="button"
            className={styles.cardImage}
            style={{ position: "absolute", left: card.x, top: 0 }}
            onClick={() => setOpenModal(card.key)}
            aria-label={`Open ${card.title.replace("\n", " ")}`}
          >
            <img
              loading="lazy"
              decoding="async"
              src={card.image}
              alt={card.title.replace("\n", " ")}
            />
          </button>

          <div
            className={styles.cardText}
            style={{
              position: "absolute",
              left: card.titleX,
              top: card.titleY - card.y,
            }}
          >
            <h3
              className={styles.cardTitle}
              onClick={() => setOpenModal(card.key)}
              style={{ cursor: "pointer" }}
            >
              {card.title}
            </h3>
            <p
              className={styles.cardSubtitle}
              style={{
                position: "absolute",
                left: 0,
                top: card.subY - card.titleY,
              }}
            >
              {highlightText(card.subtitle, "GREEN")}
            </p>
          </div>

          <FigmaAngledCta
            className={styles.cardCta}
            style={{
              position: "absolute",
              left: card.ctaX,
              top: card.ctaY - card.y,
            }}
            onClick={() => setOpenModal(card.key)}
          >
            Explore
          </FigmaAngledCta>
        </div>
      ))}

      {/* Goal note — desktop only */}
      <p className={`${styles.goalNote} ${styles.desktopOnly}`}>
        {highlightText(d.goal.text, d.goal.highlighted)}
      </p>

      {/* Bottom quote — desktop only */}
      <div className={`${styles.bottomQuote} ${styles.desktopOnly}`}>
        <img
          loading="lazy"
          decoding="async"
          src="/images/technology-innovation-alliances/quote_left.png"
          alt=""
          className={styles.quoteBracketLeft}
          aria-hidden="true"
        />
        <h2>{highlightText(d.quote1.text, d.quote1.highlighted)}</h2>
        <img
          loading="lazy"
          decoding="async"
          src="/images/technology-innovation-alliances/quote_right.png"
          alt=""
          className={styles.quoteBracketRight}
          aria-hidden="true"
        />
      </div>

      {/* Bottom-right CTAs — desktop only */}
      <FigmaAngledCta
        className={`${styles.partnerCta} ${styles.desktopOnly}`}
        style={{ position: "absolute", left: 1501, top: 746 }}
        onClick={() => setIsBecomeTechnologyPartnerOpen(true)}
      >
        {data?.mainPage?.cta?.[0]?.text ?? "Become a Technology Partner"}
      </FigmaAngledCta>
      <FigmaAngledCta
        className={`${styles.frameworkCta} ${styles.desktopOnly}`}
        style={{ position: "absolute", left: 1428, top: 824 }}
        icon="download"
        href={
          data?.mainPage?.cta?.[1]?.href ||
          "/green-innovation-partnership-framework.pdf"
        }
      >
        {data?.mainPage?.cta?.[1]?.text ??
          "GREEN Innovation Partnership Framework (PDF)"}
      </FigmaAngledCta>

      {/* ===== MOBILE-ONLY LAYOUT ===== */}
      {!canvas && (
        <div className={styles.mobileLayout}>
          {/* Hero */}
          <div className={styles.mobileHero}>
            <h1 className={styles.mobileH1}>{d.title}</h1>
            <p className={styles.mobileTagline}>{d.subHeadline}</p>
            <p className={styles.mobileBlurb}>
              {highlightText(d.description.text, d.description.highlighted)}
            </p>
          </div>

          {/* Cards as tappable rows */}
          <div className={styles.mobileCardList}>
            {d.cards.map((card) => (
              <button
                key={card.key}
                type="button"
                className={styles.mobileCard}
                onClick={() => setOpenModal(card.key)}
              >
                <img
                  src={card.image}
                  alt={card.title.replace("\n", " ")}
                  className={styles.mobileCardThumb}
                  loading="lazy"
                  decoding="async"
                />
                <div className={styles.mobileCardBody}>
                  <span className={styles.mobileCardTitle}>
                    {card.title.replace("\n", " ")}
                  </span>
                  <span className={styles.mobileCardSub}>{card.subtitle}</span>
                </div>
                <span className={styles.mobileChevron} aria-hidden="true">
                  ›
                </span>
              </button>
            ))}
          </div>

          {/* Goal note */}
          <p className={styles.mobileGoal}>
            {highlightText(d.goal.text, d.goal.highlighted)}
          </p>

          {/* Quote */}
          <div className={styles.mobileQuote}>
            <p>{highlightText(d.quote1.text, d.quote1.highlighted)}</p>
          </div>

          {/* CTAs — same FigmaAngledCta as desktop for exact design parity */}
          <div className={styles.mobileCtaBar}>
            <FigmaAngledCta
              className={styles.mobilePartnerCta}
              onClick={() => setIsBecomeTechnologyPartnerOpen(true)}
            >
              Become a Technology Partner
            </FigmaAngledCta>
            <FigmaAngledCta
              className={styles.mobileFrameworkCta}
              icon="download"
              href="/green-innovation-partnership-framework.pdf"
            >
              GREEN Innovation Partnership Framework (PDF)
            </FigmaAngledCta>
          </div>
        </div>
      )}

      {/* Chatbot */}
      {canvas ? (
        <D6Chatbot
          canvasAnchored
          triggerVariant="figmaCanvas"
          triggerStyle={{
            top: 904,
            right: "auto",
            bottom: "auto",
            left: 1489,
            width: 418,
          }}
        />
      ) : (
        <D6Chatbot />
      )}

      {/* Pop-up Windows matching Figma nodes */}
      <WhyWePartner
        isOpen={openModal === "whyWePartner"}
        onClose={() => setOpenModal(null)}
        data={data?.modals?.[0]}
      />
      <CurrentTechnologyCollaborators
        isOpen={openModal === "currentTechnologyCollaborators"}
        onClose={() => setOpenModal(null)}
        data={data?.modals?.[1]}
      />
      <ResearchCoDevelopment
        isOpen={openModal === "researchCoDevelopment"}
        onClose={() => setOpenModal(null)}
        data={data?.modals?.[2]}
      />
      <InnovativePartner
        isOpen={openModal === "becomeInnovationPartner"}
        onClose={() => setOpenModal(null)}
        data={data?.modals?.[3]}
      />

      {/* Elements page enquiry component reused for "Become a Technology Partner" */}
      <ProductEnquiry
        isOpen={isBecomeTechnologyPartnerOpen}
        onClose={() => setIsBecomeTechnologyPartnerOpen(false)}
        productName="Technology & Innovation Alliances"
        titlePrefix="BECOME A"
        titleAccent="TECHNOLOGY PARTNER"
        interestLabel="TECHNOLOGY AREA OF INTEREST"
        interestOptions={["Technology Alliances"]}
        defaultInterest="Technology Alliances"
      />
    </main>
  );
}
