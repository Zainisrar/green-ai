"use client";
import { useState } from "react";
import Link from "next/link";
import D6Chatbot from "../D6Chatbot";
import FigmaAngledCta from "../FigmaAngledCta/FigmaAngledCta";
import SiteHeader from "../SiteHeader/SiteHeader";
import styles from "./InvestorRelations.module.css";
import WhyInvestGreen from "./Dialog/WhyInvestGreen";
import InvestmentFocusArea from "./Dialog/InvestmentFocusArea";
import PerformanceSnapshots from "./Dialog/PerformanceSnapshots";
import InvestmentInstruments from "./Dialog/InvestmentInstruments";
import SubmitEOI from "./Modals/SubmitEOI";

const FALLBACK = {
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
  const [openModal, setOpenModal] = useState<string | null>(null);
  const [isEoiOpen, setIsEoiOpen] = useState(false);
  const ctaLinks = {
    investorPack: "/investor-pack.pdf",
    partnershipFramework: "/green-innovation-partnership-framework.pdf",
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
        (term) => part.toLowerCase() === term.toLowerCase()
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

  // Static data (design is fixed in Figma; keep API hook import available for
  // future CMS wiring without changing the pixel geometry).
  const d = FALLBACK;

  const rows = [
    {
      key: "whyInvestGreen",
      title: "Why Invest in GREEN?",
      subtitle: "Infrastructure without integrity is a risk. With GREEN, resilience is engineered.",
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
      title: "Our Investment Focus Areas",
      subtitle: "Financial models and IRR simulations available on request",
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
      title: "Performance Snapshots",
      subtitle: "Annual Reports and ESG Dashboards available",
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
      title: "Investment Instruments Supported",
      subtitle: "Pay-for-performance models (OPEX or carbon-linked)",
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

  return (
    <main className={styles.page} data-node-id="7077:19989">
      <SiteHeader layout={canvas ? "figmaCanvas" : "viewport"} />

      {/* Left vertical side title */}
      <img
        src="/images/investor-relations/investor-relations.png"
        alt="Investor Relations"
        className={styles.verticalTitle}
      />

      {/* Faint right-side photo collage (baked from Figma render) */}
      <img
        className={styles.rightCollageImg}
        src="/images/investor-relations/collage.png"
        alt=""
        aria-hidden="true"
      />

      {/* Header section */}
      <div className={styles.headerSection}>
        <h1 className={styles.mainTitle}>
          INVESTOR <span className={styles.greenText}>RELATIONS</span>
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
            <img src={row.image} alt={row.title} />
            <span
              className={styles.rowBracket}
              aria-hidden="true"
              style={{ top: 10, left: -19 }}
            />
          </button>

          <div
            className={styles.rowText}
            style={{ position: "absolute", left: row.titleX, top: row.titleY - row.y }}
          >
            <h3
              className={styles.rowTitle}
              onClick={() => setOpenModal(row.key)}
              style={{ cursor: "pointer" }}
            >
              {row.title}
            </h3>
            <p
              className={styles.rowSubtitle}
              style={{ position: "absolute", left: 0, top: row.subY - row.titleY }}
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

          <div className={styles.rowDivider} />
        </div>
      ))}

      {/* Right quote card */}
      <img
        className={styles.quoteBracketL}
        src="/images/rfp/quote_bracket_l.png"
        alt=""
        aria-hidden="true"
      />
      <img
        className={styles.quoteBracketR}
        src="/images/rfp/quote_bracket_r.png"
        alt=""
        aria-hidden="true"
      />
      <div className={styles.quoteCard}>
        <p>
          {highlightText(d.quote1.text, d.quote1.highlighted)}
        </p>
      </div>

      {/* Bottom-left closing quote */}
      <div className={styles.bottomQuote}>
        <h2>
          {highlightText(d.quote2.text, d.quote2.highlighted)}
        </h2>
      </div>

      {/* Bottom-right CTAs */}
      <FigmaAngledCta
        className={styles.downloadCta}
        style={{ position: "absolute", left: 1569, top: 741 }}
        icon="download"
        href={ctaLinks.investorPack}
      >
        Download Investor Pack (PDF)
      </FigmaAngledCta>
      <FigmaAngledCta
        className={styles.eoiCta}
        style={{ position: "absolute", left: 1541, top: 819 }}
        onClick={() => setIsEoiOpen(true)}
      >
        Submit an Expression of Interest
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
