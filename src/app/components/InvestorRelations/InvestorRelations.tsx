"use client";

import { useState } from "react";
import { useInvestorRelations } from "../../../hooks/useInvestorRelations";
import D6Chatbot from "../D6Chatbot";
import FigmaAngledCta from "../FigmaAngledCta/FigmaAngledCta";
import SiteHeader from "../SiteHeader/SiteHeader";
import InvestmentFocusArea from "./Dialog/InvestmentFocusArea";
import InvestmentInstruments from "./Dialog/InvestmentInstruments";
import PerformanceSnapshots from "./Dialog/PerformanceSnapshots";
import WhyInvestGreen from "./Dialog/WhyInvestGreen";
import styles from "./InvestorRelations.module.css";
import SubmitEOI from "./Modals/SubmitEOI";

const FALLBACK = {
  cta: [],
  title: "INVESTOR RELATIONS",
  subHeadline: "Invest in Resilience. Deliver Real Returns.",
  description: {
    text: "GREEN is not just building solar — we’re building the energy backbone of an entire region. For investors seeking meaningful impact with measurable performance, we offer one thing: outcomes.",
    highlighted: "GREEN",
  },
  quote1: {
    text: "PNG Market Leader With Replicable Model Across The Pacific",
    highlighted: "PNG",
  },
  quote2: {
    text: "Your Capital Can Build Megawatts — Or It Can Build Movements. With GREEN, You Can Do Both.",
    highlighted: "GREEN",
  },
};

interface InvestorRelationsProps {
  canvas?: boolean;
}

export default function InvestorRelations({
  canvas = false,
}: InvestorRelationsProps) {
  const { data: investorRelationsData } = useInvestorRelations();
  const [openModal, setOpenModal] = useState<string | null>(null);
  const [isEoiOpen, setIsEoiOpen] = useState(false);
  const ctaLinks = {
    investorPack:
      "mailto:info@green.com.pg?subject=GREEN%20Investor%20Pack%20Request",
    partnershipFramework:
      "mailto:innovation@green.com.pg?subject=Innovation%20Partnership%20Framework%20Request",
  };

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
        <span key={index} className={styles.highlight}>
          {part}
        </span>
      ) : (
        part
      );
    });
  };

  const d = investorRelationsData?.mainPage ?? FALLBACK;
  const titleWords = d.title.trim().split(/\s+/);
  const titleAccent = titleWords.pop() ?? "";
  const titlePrefix = titleWords.join(" ");
  const investorPackCta = d.cta?.[0];
  const expressionOfInterestCta = d.cta?.[1];

  const rows = [
    {
      key: "whyInvestGreen",
      title:
        investorRelationsData?.whyInvestGreen.title || "Why Invest in GREEN?",
      subtitle:
        investorRelationsData?.whyInvestGreen.headline ||
        "Infrastructure without integrity is a risk. With GREEN, resilience is engineered.",
      image: "/images/investor-relations/card1.png",
      x: 291,
      y: 330,
      titleX: 579,
      titleY: 329,
      subY: 373,
      ctaX: 1046,
      ctaY: 382,
    },
    {
      key: "investmentFocusArea",
      title:
        investorRelationsData?.investmentFocusArea.title ||
        "Our Investment Focus Areas",
      subtitle:
        investorRelationsData?.investmentFocusArea.headline ||
        "Financial models and IRR simulations available on request",
      image: "/images/investor-relations/card2.png",
      x: 414,
      y: 448,
      titleX: 700,
      titleY: 446,
      subY: 490,
      ctaX: 1167,
      ctaY: 500,
    },
    {
      key: "performanceSnapshots",
      title:
        investorRelationsData?.performanceSnapshots.title ||
        "Performance Snapshots",
      subtitle:
        investorRelationsData?.performanceSnapshots.headline ||
        "Annual Reports and ESG Dashboards available",
      image: "/images/investor-relations/card3.png",
      x: 287,
      y: 577,
      titleX: 579,
      titleY: 583,
      subY: 625,
      ctaX: 1046,
      ctaY: 629,
    },
    {
      key: "investmentInstruments",
      title:
        investorRelationsData?.investmentInstruments.title ||
        "Investment Instruments Supported",
      subtitle:
        investorRelationsData?.investmentInstruments.headline ||
        "Pay-for-performance models (OPEX or carbon-linked)",
      image: "/images/investor-relations/card4.png",
      x: 397,
      y: 705,
      titleX: 689,
      titleY: 712,
      subY: 754,
      ctaX: 1156,
      ctaY: 757,
    },
  ];

  if (!canvas) {
    return (
      <main className={styles.mobilePage} data-node-id="7077:19989">
        <SiteHeader layout="viewport" figmaPanelVariant="flagship" />

        {/* Ambient background decoration */}
        <div className={styles.mobileBgDecor} aria-hidden="true">
          <img
            loading="lazy"
            decoding="async"
            src="/images/investor-relations/figma-background.jpg"
            alt=""
          />
        </div>

        {/* Hero Section */}
        <div className={styles.mobileHero}>
          <h1 className={styles.mobileTitle}>
            {titlePrefix}{" "}
            <span className={styles.greenText}>{titleAccent}</span>
          </h1>
          <p className={styles.subHeadline}>{d.subHeadline}</p>
          <p className={styles.mobileDescription}>
            {highlightText(d.description.text, d.description.highlighted)}
          </p>
        </div>

        {/* Rows List */}
        <div className={styles.mobileRowsList}>
          {rows.map((row) => (
            <div key={row.key} className={styles.mobileRowCard}>
              <div className={styles.mobileRowTop}>
                <div className={styles.mobileRowThumb}>
                  <img
                    loading="lazy"
                    decoding="async"
                    src={row.image}
                    alt={row.title}
                  />
                </div>
                <div className={styles.mobileRowHeading}>
                  <h3 className={styles.mobileRowCardTitle}>{row.title}</h3>
                  <p className={styles.mobileRowCardSub}>{row.subtitle}</p>
                </div>
              </div>
              <FigmaAngledCta
                className={styles.mobileExploreBtn}
                onClick={() => setOpenModal(row.key)}
              >
                Explore
              </FigmaAngledCta>
            </div>
          ))}
        </div>

        {/* Quote Block 1 */}
        <div className={styles.mobileQuoteBlock}>
          <p className={styles.mobileQuoteText}>
            {highlightText(d.quote1.text, d.quote1.highlighted)}
          </p>
        </div>

        {/* Quote Block 2 */}
        <div className={styles.mobileQuoteBlock}>
          <p className={styles.mobileQuoteText}>
            {highlightText(d.quote2.text, d.quote2.highlighted)}
          </p>
        </div>

        {/* CTAs */}
        <div className={styles.mobileCtas}>
          <a
            href={investorPackCta?.href || ctaLinks.investorPack}
            className={styles.mobileCtaBtn}
          >
            <span>
              {investorPackCta?.text || "Download Investor Pack (PDF)"}
            </span>
            <span aria-hidden="true">›</span>
          </a>

          <button
            type="button"
            className={styles.mobileCtaBtn}
            onClick={() => setIsEoiOpen(true)}
          >
            <span>
              {expressionOfInterestCta?.text ||
                "Submit an Expression of Interest (EOI)"}
            </span>
            <span aria-hidden="true">›</span>
          </button>
        </div>

        <D6Chatbot />

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
        <SubmitEOI isOpen={isEoiOpen} onClose={() => setIsEoiOpen(false)} />
      </main>
    );
  }

  return (
    <main className={styles.page} data-node-id="7077:19989">
      <SiteHeader
        layout={canvas ? "figmaCanvas" : "viewport"}
        figmaPanelVariant="flagship"
      />

      {/* Left vertical side title */}
      <img
        loading="lazy"
        decoding="async"
        src="/images/investor-relations/investor-relations.png"
        alt="Investor Relations"
        className={styles.verticalTitle}
      />

      {/* Figma's masked investor background artwork. */}
      <img
        loading="lazy"
        decoding="async"
        className={styles.rightCollageImg}
        src="/images/investor-relations/figma-background.jpg"
        alt=""
        aria-hidden="true"
      />

      {/* Header section */}
      <div className={styles.headerSection}>
        <h1 className={styles.mainTitle}>
          {titlePrefix} <span className={styles.greenText}>{titleAccent}</span>
        </h1>
        <p className={styles.subHeadline}>{d.subHeadline}</p>
        <p className={styles.description}>
          {highlightText(d.description.text, d.description.highlighted)}
        </p>
      </div>

      {/* Staggered investment rows (exact Figma coordinates) */}
      {rows.map((row) => (
        <div
          key={row.key}
          className={styles.row}
          style={{ top: row.y, left: 0 }}
        >
          <button
            type="button"
            className={styles.rowImage}
            style={{ position: "absolute", left: row.x, top: 0 }}
            onClick={() => setOpenModal(row.key)}
            aria-label={`Open ${row.title}`}
          >
            <img
              loading="lazy"
              decoding="async"
              src={row.image}
              alt={row.title}
            />
          </button>

          <div
            className={styles.rowText}
            style={{
              position: "absolute",
              left: row.titleX,
              top: row.titleY - row.y,
            }}
          >
            <button
              type="button"
              className={styles.rowTitleBtn}
              onClick={() => setOpenModal(row.key)}
            >
              <h3 className={styles.rowTitle}>{row.title}</h3>
            </button>
            <p
              className={styles.rowSubtitle}
              style={{
                position: "absolute",
                left: 0,
                top: row.subY - row.titleY,
              }}
            >
              {row.subtitle}
            </p>
          </div>

          <FigmaAngledCta
            className={styles.rowCta}
            style={{
              position: "absolute",
              left: row.ctaX,
              top: row.ctaY - row.y,
            }}
            onClick={() => setOpenModal(row.key)}
          >
            Explore
          </FigmaAngledCta>
        </div>
      ))}

      {/* Right quote card */}
      <img
        loading="lazy"
        decoding="async"
        className={styles.quoteBracketL}
        src="/images/rfp/quote_bracket_l.png"
        alt=""
        aria-hidden="true"
      />
      <img
        loading="lazy"
        decoding="async"
        className={styles.quoteBracketR}
        src="/images/rfp/quote_bracket_r.png"
        alt=""
        aria-hidden="true"
      />
      <div className={styles.quoteCard}>
        <p>{highlightText(d.quote1.text, d.quote1.highlighted)}</p>
      </div>

      {/* Bottom-left closing quote */}
      <div className={styles.bottomQuote}>
        <h2>{highlightText(d.quote2.text, d.quote2.highlighted)}</h2>
      </div>

      {/* Bottom-right CTAs */}
      <FigmaAngledCta
        className={styles.downloadCta}
        style={{ position: "absolute", left: 1569, top: 741 }}
        icon="download"
        href={investorPackCta?.href || ctaLinks.investorPack}
      >
        {investorPackCta?.text || "Download Investor Pack (PDF)"}
      </FigmaAngledCta>
      <FigmaAngledCta
        className={styles.eoiCta}
        style={{ position: "absolute", left: 1541, top: 819 }}
        onClick={() => setIsEoiOpen(true)}
      >
        {expressionOfInterestCta?.text || "Submit an Expression of Interest"}
      </FigmaAngledCta>

      {/* Chatbot */}
      {canvas ? (
        <D6Chatbot
          canvasAnchored
          triggerVariant="figmaCanvas"
          figmaPlaceholder="Let&rsquo;s Talk Energy"
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
      <SubmitEOI isOpen={isEoiOpen} onClose={() => setIsEoiOpen(false)} />
    </main>
  );
}
