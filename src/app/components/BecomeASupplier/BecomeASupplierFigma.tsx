"use client";

import { useState } from "react";
import D6Chatbot from "../D6Chatbot";
import FigmaAngledCta from "../FigmaAngledCta/FigmaAngledCta";
import SiteHeader from "../SiteHeader/SiteHeader";
import FigmaPageCanvas from "../shared/FigmaPageCanvas";
import styles from "./BecomeASupplierFigma.module.css";
import HowToGetStarted from "./Dialog/HowToGetStarted";
import KeySupplyCategories from "./Dialog/KeySupplyCategories";
import TendersAndRFQs from "./Dialog/TendersAndRFQs";
import WhatWeLookFor from "./Dialog/WhatWeLookFor";
import RegisterInquiry from "./Modals/RegisterInquiry";

const cards = [
  {
    key: "what-we-look-for",
    title: "What We Look For",
    description: "We don’t chase trends. We co-create breakthroughs",
    image: "/images/become-supplier/figma-what-we-look-for.jpeg",
    position: styles.cardOne,
  },
  {
    key: "key-supply-categories",
    title: "Key Supply Categories",
    description: "GREEN’s active and future procurement includes:",
    image: "/images/become-supplier/figma-key-supply-categories.png",
    position: styles.cardTwo,
  },
  {
    key: "how-to-get-started",
    title: "How to Get Started",
    description: "We don’t chase trends. We co-create breakthroughs",
    image: "/images/become-supplier/figma-how-to-get-started.jpeg",
    position: styles.cardThree,
  },
  {
    key: "tenders-and-rfqs",
    title: "Tenders and RFQs",
    description: "We don’t chase trends. We co-create breakthroughs",
    image: "/images/become-supplier/figma-tenders-rfqs.jpeg",
    position: styles.cardFour,
  },
];

export default function BecomeASupplierFigma() {
  const [dialog, setDialog] = useState<string | null>(null);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  const openCardDialog = (key: string) => setDialog(key);

  const desktop = (
    <main className={styles.page} data-node-id="7077:19121">
      <SiteHeader layout="figmaCanvas" figmaPanelVariant="flagship" />

      <img
        loading="lazy"
        decoding="async"
        className={styles.backgroundArtwork}
        src="/images/become-supplier/bg.jpg"
        alt=""
        aria-hidden="true"
      />

      <img
        loading="lazy"
        decoding="async"
        className={styles.verticalTitle}
        src="/images/become-supplier/figma-vertical-title.svg"
        alt=""
        width={49}
        height={623}
        aria-hidden="true"
      />

      <h1 className={styles.title}>
        Become a <span>Supplier</span>
      </h1>
      <p className={styles.subtitle}>Supply Us. Be an Impact Partner.</p>
      <p className={styles.description}>
        Join <strong>GREEN&apos;s</strong> trusted network of global and local
        vendors delivering mission-critical energy infrastructure across Papua
        New Guinea and the Pacific. If you bring quality, transparency, and
        speed — we&apos;re ready to do business.
      </p>

      {cards.map((card) => (
        <section className={`${styles.card} ${card.position}`} key={card.key}>
          <img
            loading="lazy"
            decoding="async"
            className={styles.cardImage}
            src={card.image}
            alt=""
          />
          <h2>{card.title}</h2>
          <p>{card.description}</p>
          <FigmaAngledCta
            className={styles.exploreButton}
            onClick={() => openCardDialog(card.key)}
          >
            Explore
          </FigmaAngledCta>
        </section>
      ))}

      <div className={styles.vendorQuote}>
        <img
          loading="lazy"
          decoding="async"
          src="/images/rfp/quote_bracket_l.png"
          alt=""
        />
        <p>
          “ <span>GREEN</span> vendors become part of our extended ecosystem.”
        </p>
        <img
          loading="lazy"
          decoding="async"
          src="/images/rfp/quote_bracket_r.png"
          alt=""
        />
      </div>

      <p className={styles.bottomStatement}>
        Supplying <span>GREEN</span> means more than shipping goods.
        <br />
        It means joining a supply chain that powers clinics, schools, and
        futures.
      </p>

      <FigmaAngledCta
        className={styles.handbookButton}
        icon="download"
        href="/supplier-handbook.pdf"
        download="GREEN-Supplier-Handbook.pdf"
      >
        Download Handbook
      </FigmaAngledCta>
      <FigmaAngledCta
        className={styles.registerButton}
        onClick={() => setIsRegisterOpen(true)}
      >
        Register Now | Send an Inquiry
      </FigmaAngledCta>

      <D6Chatbot
        canvasAnchored
        triggerVariant="figmaCanvas"
        figmaPlaceholder="Let’s Talk Energy"
      />
    </main>
  );

  const mobile = (
    <main className={styles.mobilePage} data-node-id="7077:19121-mobile">
      <SiteHeader panel="logoOnly" />

      <div className={styles.mobileContainer}>
        {/* Intro Section */}
        <div className={styles.mobileIntro}>
          <span className={styles.mobileBadge}>BECOME A SUPPLIER</span>
          <h1 className={styles.mobileTitle}>
            Become a <span>Supplier</span>
          </h1>
          <p className={styles.mobileSubtitle}>
            Supply Us. Be an Impact Partner.
          </p>
          <p className={styles.mobileDescription}>
            Join <strong>GREEN&apos;s</strong> trusted network of global and
            local vendors delivering mission-critical energy infrastructure
            across Papua New Guinea and the Pacific. If you bring quality,
            transparency, and speed — we&apos;re ready to do business.
          </p>
        </div>

        {/* 4 Cards Stack */}
        <div className={styles.mobileCardsList}>
          {cards.map((card) => (
            <article className={styles.mobileCard} key={card.key}>
              <div className={styles.mobileCardImageWrap}>
                <img
                  loading="lazy"
                  decoding="async"
                  className={styles.mobileCardImage}
                  src={card.image}
                  alt={card.title}
                />
              </div>
              <div className={styles.mobileCardBody}>
                <h2 className={styles.mobileCardTitle}>{card.title}</h2>
                <p className={styles.mobileCardDesc}>{card.description}</p>
                <button
                  type="button"
                  className={styles.mobileExploreBtn}
                  onClick={() => openCardDialog(card.key)}
                >
                  <span>Explore</span>
                  <span
                    className={styles.mobileExploreArrow}
                    aria-hidden="true"
                  >
                    ›
                  </span>
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* Quote Callout */}
        <div className={styles.mobileQuoteBox}>
          <p>
            “<span>GREEN</span> vendors become part of our extended ecosystem.”
          </p>
        </div>

        {/* Bottom Statement */}
        <p className={styles.mobileBottomStatement}>
          Supplying <span>GREEN</span> means more than shipping goods. It means
          joining a supply chain that powers clinics, schools, and futures.
        </p>

        {/* Mobile Supplier Actions */}
        <div className={styles.mobileActions}>
          <a
            href="/supplier-handbook.pdf"
            download="GREEN-Supplier-Handbook.pdf"
            className={styles.mobileHandbookBtn}
          >
            <span>Download Handbook</span>
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M8 2V11M8 11L4.5 7.5M8 11L11.5 7.5M2.5 14H13.5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>

          <button
            type="button"
            onClick={() => setIsRegisterOpen(true)}
            className={styles.mobileRegisterBtn}
          >
            <span>Register Now | Send an Inquiry</span>
            <svg
              width="11"
              height="18"
              viewBox="0 0 11 18"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M1.5 1.5L9 9L1.5 16.5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>

      <D6Chatbot />
    </main>
  );

  return (
    <>
      <FigmaPageCanvas
        desktop={desktop}
        mobile={mobile}
        nodeId="7077:19121"
        fitCanvasHeight
      />

      <WhatWeLookFor
        isOpen={dialog === "what-we-look-for"}
        onClose={() => setDialog(null)}
      />
      <KeySupplyCategories
        isOpen={dialog === "key-supply-categories"}
        onClose={() => setDialog(null)}
      />
      <HowToGetStarted
        isOpen={dialog === "how-to-get-started"}
        onClose={() => setDialog(null)}
        onRegister={() => {
          setDialog(null);
          setIsRegisterOpen(true);
        }}
      />
      <TendersAndRFQs
        isOpen={dialog === "tenders-and-rfqs"}
        onClose={() => setDialog(null)}
      />
      <RegisterInquiry
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
      />
    </>
  );
}
