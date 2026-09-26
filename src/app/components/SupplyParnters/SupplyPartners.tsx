"use client";

import React, { useState } from "react";
import Link from "next/link";
import SiteHeader from "../SiteHeader/SiteHeader";
import FigmaAngledCta from "../FigmaAngledCta/FigmaAngledCta";
import D6Chatbot from "../D6Chatbot";
import Enquiry from "./Modals/Enquiry";
import { useSupplyPartners, type SupplyPartnersData } from "@/hooks/useSupplyPartners";
import styles from "./SupplyPartners.module.css";

interface SupplyPartnersProps {
  canvas?: boolean;
  initialData?: SupplyPartnersData | null;
}

interface ProcurementItem {
  category: string;
  example: string;
}

interface SupplierStep {
  step: string;
  action: string;
}

const FALLBACK_DATA = {
  mainPage: {
    title: "SUPPLY PARTNERS",
    subHeadline: "Technology You Can Trust. Partners Who Deliver.",
    description:
      "GREEN sources only from proven, Tier-1 suppliers — because our systems depend on performance, durability, and trust. We don’t just buy parts. We build partnerships that power nations",
    partnerSpotlight: {
      title: "Partner Spotlight",
      text: "OSDA | Reno Dee | Fimer | PowerPlus | Clenergy | Grace Solar | Tecnocraft | Danish",
    },
  },
  globalSourcingStrategy: {
    title: "Global Sourcing Strategy",
    headline: "Quality Isn’t an Option. It’s a Requirement.",
    description:
      "Our global supply chain is built on partnerships with manufacturers who meet strict technical benchmarks, environmental compliance, and long-term support reliability. Every inverter, panel, controller, and battery we install must",
    keyPoints: [
      "Perform in high-humidity, off-grid, and remote conditions",
      "Comply with international safety and interoperability standards",
      "Have predictable lifecycle economics and bankability",
    ],
  },
  whatWeProcure: {
    title: "What We Procure",
    item: [
      { category: "Solar Modules", example: "Mono PERC, Bifacial, Flexible PV" },
      { category: "Inverters", example: "On-grid, Hybrid, Off-grid, Microinverters" },
      { category: "Batteries", example: "Grid-scale BESS, LFP, Lead-carbon, Flow" },
      { category: "Controllers & ATS", example: "MPPT, Smart Load Controllers, ATS units" },
      { category: "Mounting Structures", example: "Fixed, Tracker, Modular Kits" },
      { category: "Data & IoT Systems", example: "Smart meters, SCADA, GRID-INTEL™-compatible" },
    ],
  },
  howBecomeGreenSupplier: {
    title: "How to Become a GREEN Supplier",
    subHeadline: "Join the Network That Builds the Future.",
    item: [
      { step: "1", action: "Submit your Supplier Introduction Form" },
      { step: "2", action: "Undergo technical and commercial review" },
      { step: "3", action: "Get listed as an Approved Supply Partner" },
      { step: "4", action: "Receive GREEN’s Supplier Code & Onboarding Pack" },
    ],
  },
};

const TABS_CONFIG = [
  { id: 0, label: "Global Sourcing Strategy", activeWidth: 340, inactiveWidth: 100 },
  { id: 1, label: "What We Procure", activeWidth: 230, inactiveWidth: 95 },
  { id: 2, label: "How to Become a GREEN Supplier", activeWidth: 395, inactiveWidth: 95 },
  {
    id: 3,
    label: "Supply Partner Login Portal",
    activeWidth: 330,
    inactiveWidth: 95,
    href: "/ecosystem/supply-partners/login",
  },
];

const PARTNER_LOGOS = [
  {
    name: "Clenergy",
    src: "/images/supply-partners/clenergy.png",
    className: styles.logoClenergy,
  },
  {
    name: "Fimer",
    src: "/images/supply-partners/fimer.png",
    className: styles.logoFimer,
  },
  {
    name: "Technocraft",
    src: "/images/supply-partners/tecnocraft.png",
    className: styles.logoTechnocraft,
  },
  {
    name: "CATL",
    src: "/images/supply-partners/catl.png",
    className: styles.logoCatl,
  },
  {
    name: "Grace Solar",
    src: "/images/supply-partners/grace-solar.png",
    className: styles.logoGrace,
  },
];

export default function SupplyPartners({
  canvas = false,
  initialData = null,
}: SupplyPartnersProps) {
  const { data: apiData } = useSupplyPartners(initialData);
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);

  // Safely extract API data or fall back to Figma authentic defaults
  const subHeadline = (
    apiData?.mainPage?.subHeadline || FALLBACK_DATA.mainPage.subHeadline
  ).trim();

  const rawDescription =
    apiData?.mainPage?.description?.text ||
    (typeof apiData?.mainPage?.description === "string"
      ? apiData.mainPage.description
      : FALLBACK_DATA.mainPage.description);
  const descTrimmed = rawDescription.trim();
  const highlightedWord =
    apiData?.mainPage?.description?.highlighted?.trim() || "GREEN";

  const renderDescriptionContent = () => {
    if (descTrimmed.startsWith(highlightedWord)) {
      return (
        <>
          <span className={styles.greenTextBold}>{highlightedWord}</span>
          {descTrimmed.slice(highlightedWord.length)}
        </>
      );
    }
    return descTrimmed;
  };

  const spotlightText = (
    apiData?.mainPage?.partnerSpotlight?.text ||
    FALLBACK_DATA.mainPage.partnerSpotlight.text
  ).trim();

  const sourcing = {
    title: (
      apiData?.globalSourcingStrategy?.title ||
      FALLBACK_DATA.globalSourcingStrategy.title
    ).trim(),
    headline: (
      apiData?.globalSourcingStrategy?.headline ||
      FALLBACK_DATA.globalSourcingStrategy.headline
    ).trim(),
    description: (
      apiData?.globalSourcingStrategy?.description ||
      FALLBACK_DATA.globalSourcingStrategy.description
    ).trim(),
    keyPoints: (
      apiData?.globalSourcingStrategy?.keyPoints?.length
        ? apiData.globalSourcingStrategy.keyPoints
        : FALLBACK_DATA.globalSourcingStrategy.keyPoints
    ).map((p: string) => p.trim()),
  };

  const procureTitle = (
    apiData?.whatWeProcure?.title || FALLBACK_DATA.whatWeProcure.title
  ).trim();

  const procureItems: ProcurementItem[] = (
    apiData?.whatWeProcure?.item?.length
      ? apiData.whatWeProcure.item
      : FALLBACK_DATA.whatWeProcure.item
  ).map((item) => ({
    category: item.category.trim(),
    example: item.example.trim(),
  }));

  const howBecomeTitle = (
    apiData?.howBecomeGreenSupplier?.title ||
    FALLBACK_DATA.howBecomeGreenSupplier.title
  ).trim();

  const howBecomeSubHeadline = (
    apiData?.howBecomeGreenSupplier?.subHeadline ||
    FALLBACK_DATA.howBecomeGreenSupplier.subHeadline
  ).trim();

  const supplierSteps: SupplierStep[] = (
    apiData?.howBecomeGreenSupplier?.item?.length
      ? apiData.howBecomeGreenSupplier.item
      : FALLBACK_DATA.howBecomeGreenSupplier.item
  ).map((item) => ({
    step: String(item.step).trim(),
    action: item.action.trim(),
  }));

  // Render Right Tab Content
  const renderTabContent = (isMobile = false) => {
    switch (activeTabIndex) {
      case 0:
        return (
          <div>
            <h3 className={isMobile ? styles.mobileContentTitle : styles.contentTitle}>
              {sourcing.title}
            </h3>
            <h4
              className={
                isMobile ? styles.mobileContentSubtitle : styles.contentSubtitle
              }
            >
              {sourcing.headline}
            </h4>
            <p
              className={
                isMobile ? styles.mobileContentBody : styles.contentBody
              }
            >
              {sourcing.description}
            </p>
            <ul className={styles.bulletList}>
              {sourcing.keyPoints.map((point: string, idx: number) => (
                <li key={idx} className={styles.bulletItem}>
                  {point}
                </li>
              ))}
            </ul>
          </div>
        );
      case 1:
        return (
          <div>
            <h3 className={isMobile ? styles.mobileContentTitle : styles.contentTitle}>
              {procureTitle}
            </h3>
            <div className={styles.procureTable}>
              <div className={styles.procureHeader}>Category</div>
              <div className={styles.procureHeader}>Examples</div>
              {procureItems.map((item, idx) => (
                <React.Fragment key={idx}>
                  <div className={styles.procureCategory}>{item.category}</div>
                  <div className={styles.procureExample}>{item.example}</div>
                </React.Fragment>
              ))}
            </div>
          </div>
        );
      case 2:
        return (
          <div>
            <h3 className={isMobile ? styles.mobileContentTitle : styles.contentTitle}>
              {howBecomeTitle}
            </h3>
            <h4
              className={
                isMobile ? styles.mobileContentSubtitle : styles.contentSubtitle
              }
            >
              {howBecomeSubHeadline}
            </h4>
            <div className={styles.stepsTable}>
              <div className={styles.stepHeader}>Step</div>
              <div className={styles.stepHeader}>Action</div>
              {supplierSteps.map((item, idx) => (
                <React.Fragment key={idx}>
                  <div className={styles.stepNumber}>Step {item.step}</div>
                  <div className={styles.stepAction}>{item.action}</div>
                </React.Fragment>
              ))}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  // =========================================================================
  // Desktop Canvas View (1920x970)
  // =========================================================================
  if (canvas) {
    return (
      <main className={styles.desktopCanvas} data-node-id="7077:15173">
        <SiteHeader layout="figmaCanvas" figmaPanelVariant="flagship" />

        {/* Vertical side title "SUPPLY PARTNERS" */}
        <img
          loading="lazy"
          decoding="async"
          src="/images/supply-partners/supply-partner.png"
          alt="SUPPLY PARTNERS"
          className={styles.verticalTitle}
          aria-hidden="true"
        />

        {/* Solar technician background image */}
        <img
          fetchPriority="high"
          decoding="async"
          src="/images/supply-partners/mainImg.png"
          alt=""
          className={styles.bgMaskImage}
          aria-hidden="true"
        />

        {/* Top Header Block */}
        <header className={styles.headerBlock}>
          <h1 className={styles.mainTitle}>
            SUPPLY <span className={styles.greenText}>PARTNERS</span>
          </h1>
          <h2 className={styles.subHeadline}>{subHeadline}</h2>
          <p className={styles.description}>{renderDescriptionContent()}</p>
        </header>

        {/* Left Interactive Tabs with authentic diagonal brackets */}
        <nav aria-label="Supply Partners Navigation">
          {TABS_CONFIG.map((tab, index) => {
            const isActive = activeTabIndex === tab.id;
            const currentWidth = isActive ? tab.activeWidth : tab.inactiveWidth;

            if (tab.href) {
              return (
                <Link
                  key={tab.id}
                  href={tab.href}
                  className={`${styles.tabItem} ${styles[`tab${index}`]}`}
                >
                  <svg
                    className={styles.tabSvg}
                    width={tab.activeWidth + 40}
                    height="64"
                    viewBox={`0 0 ${tab.activeWidth + 40} 64`}
                    fill="none"
                  >
                    <path
                      className={styles.tabPath}
                      d={`M 44 2 L 2 60 L ${currentWidth} 60`}
                    />
                  </svg>
                  <span className={styles.tabLabel}>{tab.label}</span>
                </Link>
              );
            }

            return (
              <button
                key={tab.id}
                type="button"
                className={`${styles.tabItem} ${styles[`tab${index}`]} ${isActive ? styles.tabActive : ""}`}
                onClick={() => setActiveTabIndex(tab.id)}
              >
                <svg
                  className={styles.tabSvg}
                  width={tab.activeWidth + 40}
                  height="64"
                  viewBox={`0 0 ${tab.activeWidth + 40} 64`}
                  fill="none"
                >
                  <path
                    className={styles.tabPath}
                    d={`M 44 2 L 2 60 L ${currentWidth} 60`}
                  />
                </svg>
                <span className={styles.tabLabel}>{tab.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Center Bracketed Quote Block */}
        <div className={styles.centerQuoteBlock}>
          <img
            src="/images/supply-partners/shape1.png"
            alt=""
            className={styles.quoteBracketLeft}
            aria-hidden="true"
          />
          <p className={styles.centerQuoteText}>
            <span className={styles.greenText}>Technology</span> You Can Trust.
            <br />
            Partners Who Deliver.
          </p>
          <img
            src="/images/supply-partners/shape2.png"
            alt=""
            className={styles.quoteBracketRight}
            aria-hidden="true"
          />
        </div>

        {/* Right Tab Content Panel */}
        <section className={styles.contentPanel} aria-live="polite">
          {renderTabContent(false)}
        </section>

        {/* Bottom Partner Spotlight Slanted Parallelogram Banner */}
        <section
          className={styles.spotlightCard}
          aria-label="Partner Spotlight"
        >
          <img
            src="/images/supply-partners/spotlight-bg.png"
            alt=""
            className={styles.spotlightSvgBg}
            aria-hidden="true"
          />
          <div className={styles.spotlightContent}>
            <h3 className={styles.spotlightTitle}>Partner Spotlight</h3>
            <p className={styles.spotlightSubtitle}>{spotlightText}</p>
            <div className={styles.spotlightLogosRow}>
              {PARTNER_LOGOS.map((logo) => (
                <img
                  key={logo.name}
                  loading="lazy"
                  decoding="async"
                  src={logo.src}
                  alt={`${logo.name} logo`}
                  className={`${styles.partnerLogo} ${logo.className}`}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Bottom Right Action CTAs */}
        <FigmaAngledCta
          size="lg"
          icon="chevron"
          className={styles.ctaBtn1}
          onClick={() => setIsEnquiryOpen(true)}
        >
          Contact Supply Chain Team
        </FigmaAngledCta>
        <FigmaAngledCta
          size="lg"
          icon="download"
          className={styles.ctaBtn2}
          href="/ecosystem/become-a-supplier"
        >
          Become a Supply Partner
        </FigmaAngledCta>

        {/* Chatbot trigger positioned in canonical slot */}
        <D6Chatbot
          canvasAnchored
          triggerVariant="figmaCanvas"
          triggerStyle={{
            position: "absolute",
            top: 899,
            left: 1475,
          }}
          figmaPlaceholder="Let's Talk Energy"
        />

        {/* Enquiry Modal */}
        <Enquiry isOpen={isEnquiryOpen} onClose={() => setIsEnquiryOpen(false)} />
      </main>
    );
  }

  // =========================================================================
  // Mobile Responsive View (canvas = false)
  // =========================================================================
  return (
    <main className={styles.mobileContainer}>
      <SiteHeader layout="viewport" />

      {/* Mobile Header */}
      <header className={styles.mobileHeader}>
        <h1 className={styles.mobileMainTitle}>
          SUPPLY <span className={styles.greenText}>PARTNERS</span>
        </h1>
        <h2 className={styles.mobileSubHeadline}>{subHeadline}</h2>
        <p className={styles.mobileDescription}>{renderDescriptionContent()}</p>
      </header>

      {/* Mobile Tabs Bar */}
      <nav className={styles.mobileTabsBar} aria-label="Supply Partners Navigation">
        <button
          type="button"
          className={`${styles.mobileTabButton} ${activeTabIndex === 0 ? styles.mobileTabActive : ""}`}
          onClick={() => setActiveTabIndex(0)}
        >
          <span>Global Sourcing Strategy</span>
          <svg
            className={styles.mobileTabChevron}
            viewBox="0 0 8 12"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M1.5 1.5L6.5 6L1.5 10.5"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <button
          type="button"
          className={`${styles.mobileTabButton} ${activeTabIndex === 1 ? styles.mobileTabActive : ""}`}
          onClick={() => setActiveTabIndex(1)}
        >
          <span>What We Procure</span>
          <svg
            className={styles.mobileTabChevron}
            viewBox="0 0 8 12"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M1.5 1.5L6.5 6L1.5 10.5"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <button
          type="button"
          className={`${styles.mobileTabButton} ${activeTabIndex === 2 ? styles.mobileTabActive : ""}`}
          onClick={() => setActiveTabIndex(2)}
        >
          <span>How to Become a GREEN Supplier</span>
          <svg
            className={styles.mobileTabChevron}
            viewBox="0 0 8 12"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M1.5 1.5L6.5 6L1.5 10.5"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <Link
          href="/ecosystem/supply-partners/login"
          className={styles.mobileTabButton}
        >
          <span>Supply Partner Login Portal</span>
          <svg
            className={styles.mobileTabChevron}
            viewBox="0 0 8 12"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M1.5 1.5L6.5 6L1.5 10.5"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Link>
      </nav>

      {/* Mobile Active Content Card */}
      <section className={styles.mobileContentCard} aria-live="polite">
        {renderTabContent(true)}
      </section>

      {/* Mobile Quote Banner */}
      <div className={styles.mobileQuoteBanner}>
        <img
          src="/images/supply-partners/shape1.png"
          alt=""
          className={styles.mobileQuoteBracket}
          aria-hidden="true"
        />
        <p className={styles.mobileQuoteText}>
          <span className={styles.greenText}>Technology</span> You Can Trust.
          <br />
          Partners Who Deliver.
        </p>
        <img
          src="/images/supply-partners/shape2.png"
          alt=""
          className={styles.mobileQuoteBracket}
          aria-hidden="true"
        />
      </div>

      {/* Mobile Partner Spotlight Card */}
      <section className={styles.mobileSpotlightCard}>
        <h3 className={styles.mobileSpotlightTitle}>Partner Spotlight</h3>
        <p className={styles.mobileSpotlightSubtitle}>{spotlightText}</p>
        <div className={styles.mobileLogosGrid}>
          {PARTNER_LOGOS.map((logo) => (
            <img
              key={logo.name}
              loading="lazy"
              decoding="async"
              src={logo.src}
              alt={`${logo.name} logo`}
              className={styles.mobileLogoItem}
            />
          ))}
        </div>
      </section>

      {/* Mobile Actions */}
      <div className={styles.mobileActions}>
        <FigmaAngledCta
          size="md"
          icon="chevron"
          className={styles.mobileActionCta}
          onClick={() => setIsEnquiryOpen(true)}
        >
          Contact Supply Chain Team
        </FigmaAngledCta>
        <FigmaAngledCta
          size="md"
          icon="download"
          className={styles.mobileActionCta}
          href="/ecosystem/become-a-supplier"
        >
          Become a Supply Partner
        </FigmaAngledCta>
      </div>

      {/* Chatbot */}
      <D6Chatbot triggerVariant="default" />

      {/* Enquiry Modal */}
      <Enquiry isOpen={isEnquiryOpen} onClose={() => setIsEnquiryOpen(false)} />
    </main>
  );
}
