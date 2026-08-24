"use client";

import { useState } from "react";
import { useOurValueChain } from "../../../hooks/useOurValueChain";
import D6Chatbot from "../D6Chatbot";
import FigmaAngledCta from "../FigmaAngledCta/FigmaAngledCta";
import ProductEnquiry from "../Product/Modals/ProductEnquiry";
import SiteHeader from "../SiteHeader/SiteHeader";
import styles from "./OurChainValue.module.css";

interface ValueChainItem {
  id: string;
  title: string;
  description: string;
  icon: string;
}

const fallbackCapabilities: ValueChainItem[] = [
  {
    id: "source",
    title: "Source",
    description: "Tier-1 tech. Global partners. Proven materials.",
    icon: "/images/our-value-chain/figma-icon-source.svg",
  },
  {
    id: "engineer",
    title: "Engineer",
    description: "Precision design. Terrain-smart. Load-aware.",
    icon: "/images/our-value-chain/figma-icon-engineer.svg",
  },
  {
    id: "build",
    title: "Build",
    description: "Executed in-house. Built to endure.",
    icon: "/images/our-value-chain/figma-icon-build.svg",
  },
  {
    id: "commission",
    title: "Commission",
    description: "Tested. Verified. Switched on with certainty.",
    icon: "/images/our-value-chain/figma-icon-commission.svg",
  },
  {
    id: "operate",
    title: "Operate",
    description: "Monitored via GRID-INTEL™. Maintained proactively.",
    icon: "/images/our-value-chain/figma-icon-operate.svg",
  },
  {
    id: "deliver-impact",
    title: "Deliver Impact",
    description: "Lowered costs. Reliable power. Local livelihoods",
    icon: "/images/our-value-chain/figma-icon-deliver-impact.svg",
  },
];

interface OurChainValueProps {
  canvas?: boolean;
}

export default function OurChainValue({ canvas = false }: OurChainValueProps) {
  const { data: apiData } = useOurValueChain();
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);

  // Map API data if present, or use Figma fallback
  const subHeadline =
    apiData?.subHeadline || "Built by Design. Delivered End-to-End.";

  return (
    <main
      className={`${styles.page} ${canvas ? styles.canvasPage : ""}`}
      data-node-id="7077:18325"
    >
      <SiteHeader
        layout={canvas ? "figmaCanvas" : "viewport"}
        panel="logoOnly"
      />

      {/* Background Artwork */}
      <img loading="lazy" decoding="async"
        src="/images/our-value-chain/bg.jpg"
        alt=""
        className={styles.maskBg}
        aria-hidden="true"
      />

      {/* Vertical Side Title */}
      <img loading="lazy" decoding="async"
        src="/images/our-value-chain/our-value-chain.png"
        alt="Our Value Chain"
        className={styles.verticalTitle}
      />

      {/* Top Header Content */}
      <div className={styles.topSection}>
        <div className={styles.headlineGroup}>
          <h1>
            OUR <span>VALUE</span> CHAIN
          </h1>
          <h2>{subHeadline}</h2>
        </div>
        <p className={styles.topDescription}>
          <strong>GREEN</strong> doesn’t outsource reliability — we engineer it.
          From sourcing to service, every step is owned, optimized, and
          accountable.
        </p>
      </div>

      {/* Left Elements (Desktop) */}
      <div className={styles.leftElements}>
        <div className={styles.ecosystemCard}>
          <img loading="lazy" decoding="async"
            src="/images/our-value-chain/figma-ecosystem-card.svg"
            alt=""
            className={styles.ecosystemCardBg}
            aria-hidden="true"
          />
          <h3 className={styles.ecosystemCardText}>
            End-To-End <span>Solution</span>
            <br />
            Ecosystem.
          </h3>
        </div>

        <div className={styles.quoteBox}>
          <p>“We don’t wait for things to break. We design them not to.”</p>
        </div>
      </div>

      {/* Value Chain Grid Section */}
      <section
        className={styles.valueChainSection}
        aria-label="Value Chain Capabilities"
      >
        <h2 className={styles.stripHeading}>Value Chain Strip</h2>
        <div className={styles.stripGrid}>
          {fallbackCapabilities.map((item) => (
            <article className={styles.stripItem} key={item.id}>
              <img loading="lazy" decoding="async"
                src={item.icon}
                alt=""
                className={styles.stripIcon}
                aria-hidden="true"
              />
              <div className={styles.stripItemContent}>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Bottom Statement */}
      <p className={styles.bottomStatement}>
        Every phase has one owner. <span>GREEN.</span>
        <br />
        Every project is more than delivered — it’s engineered for legacy.
      </p>

      {/* Desktop CTAs */}
      <div className={styles.desktopCtas}>
        <FigmaAngledCta
          className={styles.consultationBtn}
          onClick={() => setIsConsultationOpen(true)}
        >
          Request a Consultation
        </FigmaAngledCta>
        <FigmaAngledCta className={styles.frameworkBtn}>
          GREEN Project Delivery Framework (PDF)
        </FigmaAngledCta>
      </div>

      {/* Mobile Flow (< 1200px) */}
      <div className={styles.mobileElements}>
        <div className={styles.mobileEcosystemCard}>
          <p>
            End-To-End <span>Solution</span> Ecosystem.
          </p>
        </div>
        <div className={styles.mobileQuoteBox}>
          <p>“We don’t wait for things to break. We design them not to.”</p>
        </div>
        <div className={styles.mobileCtas}>
          <FigmaAngledCta onClick={() => setIsConsultationOpen(true)}>
            Request a Consultation
          </FigmaAngledCta>
          <FigmaAngledCta>
            GREEN Project Delivery Framework (PDF)
          </FigmaAngledCta>
        </div>
      </div>

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

      {/* Request Consultation Modal */}
      <ProductEnquiry
        isOpen={isConsultationOpen}
        onClose={() => setIsConsultationOpen(false)}
        titlePrefix="REQUEST A"
        titleAccent="CONSULTATION"
        interestLabel="WHAT DO YOU NEED HELP WITH?"
        defaultInterest="Our Value Chain"
      />
    </main>
  );
}
