"use client";

import { useState } from "react";
import { useKeySupplyCategories } from "@/hooks/useKeySupplyCategories";
import D6Chatbot from "../D6Chatbot";
import FigmaAngledCta from "../FigmaAngledCta/FigmaAngledCta";
import ProductEnquiry from "../Product/Modals/ProductEnquiry";
import SiteHeader from "../SiteHeader/SiteHeader";
import BalanceofSystem from "./BalanceofSystem";
import EnergyStorageSystems from "./EnergyStorageSystems";
import styles from "./KeySupplyCategories.module.css";
import PowerConversionSystems from "./PowerConversionSystems";
import ProcurementNotes from "./ProcurementNotes";
import SolarGenerationEquipment from "./SolarGenerationEquipment";
import SystemIntelligence from "./SystemIntelligence";

interface KeySupplyCategoriesProps {
  canvas?: boolean;
}

export default function KeySupplyCategories({
  canvas = false,
}: KeySupplyCategoriesProps) {
  const { data: apiData } = useKeySupplyCategories();
  const [isSolarOpen, setIsSolarOpen] = useState(false);
  const [isPowerOpen, setIsPowerOpen] = useState(false);
  const [isEnergyOpen, setIsEnergyOpen] = useState(false);
  const [isSystemOpen, setIsSystemOpen] = useState(false);
  const [isBalanceOpen, setIsBalanceOpen] = useState(false);
  const [isProcurementOpen, setIsProcurementOpen] = useState(false);
  const [isSupplyingOpen, setIsSupplyingOpen] = useState(false);

  const title = apiData?.mainPage?.title || "KEY SUPPLY CATEGORIES";
  const subHeadline =
    apiData?.mainPage?.subHeadline || "What We Source — And Why It Matters.";
  const description =
    apiData?.mainPage?.description?.text ||
    "GREEN procures across a disciplined matrix of technologies and components — each category evaluated for compatibility, field performance, grid resilience, and long-term support.";

  const categories = [
    {
      id: "solar",
      name: "Solar Generation Equipment",
      className: styles.categoryRow1,
      onExplore: () => setIsSolarOpen(true),
    },
    {
      id: "power",
      name: "Power Conversion Systems",
      className: styles.categoryRow2,
      onExplore: () => setIsPowerOpen(true),
    },
    {
      id: "storage",
      name: "Energy Storage Systems",
      className: styles.categoryRow3,
      onExplore: () => setIsEnergyOpen(true),
    },
    {
      id: "intelligence",
      name: "System Intelligence & Data",
      className: styles.categoryRow4,
      onExplore: () => setIsSystemOpen(true),
    },
    {
      id: "bos",
      name: "Balance of System (BoS)",
      className: styles.categoryRow5,
      onExplore: () => setIsBalanceOpen(true),
    },
    {
      id: "procurement",
      name: "Supply Chain & Procurement Notes",
      className: styles.categoryRow6,
      onExplore: () => setIsProcurementOpen(true),
    },
  ];

  return (
    <main
      className={`${styles.page} ${canvas ? styles.canvasPage : ""}`}
      data-node-id="7077:27873"
    >
      <SiteHeader layout={canvas ? "figmaCanvas" : "viewport"} />

      {/* Existing Figma canvas background artwork */}
      <img
        src="/images/key-supplier-categories/bg.jpg"
        alt=""
        className={styles.backgroundArtwork}
        aria-hidden="true"
      />

      {/* Vertical Side Title */}
      <img
        src="/images/key-supplier-categories/figma-vertical-title.svg"
        alt="Key Supply Categories"
        className={styles.verticalTitle}
      />

      {/* Top Header Content */}
      <div className={styles.topSection}>
        <h1 className={styles.mainTitle}>
          KEY <span className={styles.greenText}>SUPPLY</span> CATEGORIES
        </h1>
        <h2>{subHeadline}</h2>
        <p>{description}</p>
      </div>

      {/* 6 Category Rows */}
      <section
        className={styles.categoriesContainer}
        aria-label="Key Supply Categories"
      >
        {categories.map((cat) => (
          <article
            key={cat.id}
            className={`${styles.categoryRow} ${cat.className}`}
          >
            <h3 className={styles.categoryName}>{cat.name}</h3>
            <FigmaAngledCta
              className={styles.categoryCta}
              onClick={cat.onExplore}
            >
              Explore
            </FigmaAngledCta>
          </article>
        ))}

        {/* Divider lines between categories */}
        <div
          className={`${styles.dividerLine} ${styles.divider1}`}
          aria-hidden="true"
        />
        <div
          className={`${styles.dividerLine} ${styles.divider2}`}
          aria-hidden="true"
        />
        <div
          className={`${styles.dividerLine} ${styles.divider3}`}
          aria-hidden="true"
        />
        <div
          className={`${styles.dividerLine} ${styles.divider4}`}
          aria-hidden="true"
        />
        <div
          className={`${styles.dividerLine} ${styles.divider5}`}
          aria-hidden="true"
        />
      </section>

      {/* Left Bottom Quote Block */}
      <div className={styles.leftQuoteBlock}>
        <img
          src="/images/handbook/figma-quote-left.svg"
          alt=""
          className={styles.quoteShapeLeft}
          aria-hidden="true"
        />
        <p className={styles.quoteText}>
          We Don’t Tell Stories To Impress.
          <br />
          We Share Stories That Prove What <span className={styles.greenText}>Energy</span> Can Do.
        </p>
        <img
          src="/images/handbook/figma-quote-right.svg"
          alt=""
          className={styles.quoteShapeRight}
          aria-hidden="true"
        />
      </div>

      {/* Desktop Bottom Right CTAs */}
      <div className={styles.desktopCtas}>
        <FigmaAngledCta
          className={styles.supplyingCta}
          onClick={() => setIsSupplyingOpen(true)}
        >
          Supplying to GREEN?
        </FigmaAngledCta>
        <FigmaAngledCta
          className={styles.downloadCta}
          icon="download"
          href="/supply-partners/full-supply-category-technical-pack.pdf"
        >
          Full Supply Category Technical Pack (PDF)
        </FigmaAngledCta>
      </div>

      {/* Mobile Flow (< 1200px) */}
      <div className={styles.mobileElements}>
        <div className={styles.mobileQuoteBox}>
          <p>
            “We Don’t Tell Stories To Impress. We Share Stories That Prove What Energy Can Do.”
          </p>
        </div>
        <div className={styles.mobileCtas}>
          <FigmaAngledCta onClick={() => setIsSupplyingOpen(true)}>
            Supplying to GREEN?
          </FigmaAngledCta>
          <FigmaAngledCta
            icon="download"
            href="/supply-partners/full-supply-category-technical-pack.pdf"
          >
            Full Supply Category Technical Pack (PDF)
          </FigmaAngledCta>
        </div>
      </div>

      {/* Chatbot */}
      {canvas ? (
        <D6Chatbot
          canvasAnchored
          triggerVariant="figmaCanvas"
          figmaPlaceholder="Let’s Talk Energy"
          triggerStyle={{
            top: 853,
            right: "auto",
            bottom: "auto",
            left: 1499,
            width: 418,
          }}
        />
      ) : (
        <D6Chatbot />
      )}

      {/* Category Modals */}
      <SolarGenerationEquipment
        isOpen={isSolarOpen}
        onClose={() => setIsSolarOpen(false)}
        data={apiData?.modals?.[0]}
      />
      <PowerConversionSystems
        isOpen={isPowerOpen}
        onClose={() => setIsPowerOpen(false)}
        data={apiData?.modals?.[1]}
      />
      <EnergyStorageSystems
        isOpen={isEnergyOpen}
        onClose={() => setIsEnergyOpen(false)}
        data={apiData?.modals?.[2]}
      />
      <SystemIntelligence
        isOpen={isSystemOpen}
        onClose={() => setIsSystemOpen(false)}
        data={apiData?.modals?.[3]}
      />
      <BalanceofSystem
        isOpen={isBalanceOpen}
        onClose={() => setIsBalanceOpen(false)}
        data={apiData?.modals?.[4]}
      />
      <ProcurementNotes
        isOpen={isProcurementOpen}
        onClose={() => setIsProcurementOpen(false)}
      />

      {/* Supplier Inquiry / Application Modal */}
      <ProductEnquiry
        isOpen={isSupplyingOpen}
        onClose={() => setIsSupplyingOpen(false)}
        titlePrefix="SUPPLYING TO"
        titleAccent="GREEN"
        interestLabel="WHAT CATEGORY DO YOU SUPPLY?"
        interestOptions={[
          "Solar Generation Equipment",
          "Power Conversion Systems",
          "Energy Storage Systems",
          "System Intelligence & Data",
          "Balance of System (BoS)",
          "Supply Chain & BOS Hardware",
        ]}
        defaultInterest="Solar Generation Equipment"
      />
    </main>
  );
}
