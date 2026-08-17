"use client";

import { useState } from "react";
import { useBecomeSupplier } from "@/hooks/useBecomeSupplier";
import D6Chatbot from "../D6Chatbot";
import FigmaAngledCta from "../FigmaAngledCta/FigmaAngledCta";
import ProductEnquiry from "../Product/Modals/ProductEnquiry";
import SiteHeader from "../SiteHeader/SiteHeader";
import styles from "./BecomeSupplier.module.css";
import WhatYouNeed from "./Dialog/What-you-need";
import WhyGreen from "./Dialog/Why-Green";

interface BecomeSupplierProps {
  canvas?: boolean;
}

export default function BecomeSupplier({
  canvas = false,
}: BecomeSupplierProps) {
  const { data } = useBecomeSupplier();
  const [isWhatYouNeedOpen, setIsWhatYouNeedOpen] = useState(false);
  const [isWhyGreenOpen, setIsWhyGreenOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  const subHeadline =
    data?.mainPage?.subHeadline || "Partner with GREEN. Build What Matters.";
  const description =
    data?.mainPage?.description?.text ||
    "GREEN Limited sources only from trusted suppliers who meet our uncompromising standards. This portal is your first step toward becoming part of our global energy supply network.";

  return (
    <main
      className={`${styles.page} ${canvas ? styles.canvasPage : ""}`}
      data-node-id="7077:28549"
    >
      <SiteHeader layout={canvas ? "figmaCanvas" : "viewport"} />

      {/* Vertical Side Title */}
      <img
        src="/images/become-supplier/become-supplier.png"
        alt="Become a Supplier"
        className={styles.verticalTitle}
      />

      {/* Top Header Content */}
      <div className={styles.topSection}>
        <h1 className={styles.mainTitle}>
          BECOME A <span className={styles.greenText}>SUPPLIER</span>
        </h1>
        <h2>{subHeadline}</h2>
        <p>{description}</p>
      </div>

      {/* 3 Supplier Cards */}
      <section
        className={styles.cardsSection}
        aria-label="Supplier Qualification Steps"
      >
        {/* Card 1: Supplier Login & Registration */}
        <article className={styles.card}>
          <img
            src="/images/become-supplier/supplierlogin.png"
            alt="Supplier Login & Registration"
            className={styles.cardThumb}
          />
          <div className={styles.cardContent}>
            <h3>Supplier Login &amp; Registration Panel</h3>
            <p>
              Infrastructure without integrity is a risk. With GREEN, resilience
              is engineered.
            </p>
          </div>
          <FigmaAngledCta
            className={styles.cardCta}
            href="/ecosystem/supply-partners/login"
          >
            Explore
          </FigmaAngledCta>
        </article>

        {/* Card 2: What You'll Need */}
        <article className={styles.card}>
          <img
            src="/images/become-supplier/what-you-need.png"
            alt="What You'll Need"
            className={styles.cardThumb}
          />
          <div className={styles.cardContent}>
            <h3>What You’ll Need</h3>
            <p>Financial models and IRR simulations available on request</p>
          </div>
          <FigmaAngledCta
            className={styles.cardCta}
            onClick={() => setIsWhatYouNeedOpen(true)}
          >
            Explore
          </FigmaAngledCta>
        </article>

        {/* Card 3: Why GREEN? */}
        <article className={styles.card}>
          <img
            src="/images/become-supplier/why-green.png"
            alt="Why GREEN?"
            className={styles.cardThumb}
          />
          <div className={styles.cardContent}>
            <h3>Why GREEN?</h3>
            <p>Engage in continuous improvement &amp; collaboration</p>
          </div>
          <FigmaAngledCta
            className={styles.cardCta}
            onClick={() => setIsWhyGreenOpen(true)}
          >
            Explore
          </FigmaAngledCta>
        </article>
      </section>

      {/* Middle Right Quote Callout */}
      <div className={styles.quoteCallout}>
        <img
          src="/images/handbook/figma-quote-left.svg"
          alt=""
          className={styles.quoteShapeLeft}
          aria-hidden="true"
        />
        <p>
          “This portal is your first step toward becoming part of our global
          energy supply network.”
        </p>
        <img
          src="/images/handbook/figma-quote-right.svg"
          alt=""
          className={styles.quoteShapeRight}
          aria-hidden="true"
        />
      </div>

      {/* Bottom Statement */}
      <p className={styles.bottomStatement}>
        Your capital can build megawatts — or it can build movements. With
        GREEN, you can do both.
      </p>

      {/* Desktop CTAs */}
      <div className={styles.desktopCtas}>
        <FigmaAngledCta
          className={styles.contactCta}
          onClick={() => setIsContactModalOpen(true)}
        >
          Procurement Contact
        </FigmaAngledCta>
        <FigmaAngledCta
          className={styles.downloadCta}
          icon="download"
          href="/supply-partners/green-supplier-prospectus.pdf"
        >
          GREEN Supplier Prospectus (PDF)
        </FigmaAngledCta>
      </div>

      {/* Mobile Flow (< 1200px) */}
      <div className={styles.mobileElements}>
        <div className={styles.mobileQuoteBox}>
          <p>
            “This portal is your first step toward becoming part of our global
            energy supply network.”
          </p>
        </div>
        <p className={styles.mobileBottomStatement}>
          Your capital can build megawatts — or it can build movements. With
          GREEN, you can do both.
        </p>
        <div className={styles.mobileCtas}>
          <FigmaAngledCta onClick={() => setIsContactModalOpen(true)}>
            Procurement Contact
          </FigmaAngledCta>
          <FigmaAngledCta
            icon="download"
            href="/supply-partners/green-supplier-prospectus.pdf"
          >
            GREEN Supplier Prospectus (PDF)
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

      {/* Modals & Dialogs */}
      <WhatYouNeed
        isOpen={isWhatYouNeedOpen}
        onClose={() => setIsWhatYouNeedOpen(false)}
        title={data?.whatYouNeed?.title}
        keys={data?.whatYouNeed?.keys}
      />
      <WhyGreen
        isOpen={isWhyGreenOpen}
        onClose={() => setIsWhyGreenOpen(false)}
        title={data?.whyGreen?.title}
        keys={data?.whyGreen?.keys}
        imgSrc={data?.whyGreen?.img?.src}
        imgAlt={data?.whyGreen?.img?.alt}
      />
      <ProductEnquiry
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
        titlePrefix="BECOME A"
        titleAccent="SUPPLIER"
        interestLabel="WHAT CATEGORY DO YOU SUPPLY?"
        interestOptions={[
          "Supplier Onboarding",
          "Solar Generation Equipment",
          "Power Conversion Systems",
          "Energy Storage Systems",
          "Balance of System (BoS)",
          "Procurement Inquiry",
        ]}
        defaultInterest="Supplier Onboarding"
      />
    </main>
  );
}
