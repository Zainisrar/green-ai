"use client";

import { useState } from "react";
import { useOurProcurementPhilosophy } from "@/hooks/useOurProcurementPhilosophy";
import D6Chatbot from "../D6Chatbot";
import FigmaAngledCta from "../FigmaAngledCta/FigmaAngledCta";
import ProductEnquiry from "../Product/Modals/ProductEnquiry";
import SiteHeader from "../SiteHeader/SiteHeader";
import Compromise from "./Compromise";
import CorePrinciples from "./CorePrinciples";
import styles from "./OurProcurementPhilosophy.module.css";
import Procrument from "./Procrument";
import Vendor from "./Vendor";

interface OurProcurementPhilosophyProps {
  canvas?: boolean;
}

export default function OurProcurementPhilosophy({
  canvas = false,
}: OurProcurementPhilosophyProps) {
  const { data: apiData } = useOurProcurementPhilosophy();
  const [isCorePrinciplesOpen, setIsCorePrinciplesOpen] = useState(false);
  const [isCompromiseOpen, setIsCompromiseOpen] = useState(false);
  const [isProcrumentOpen, setIsProcrumentOpen] = useState(false);
  const [isVendorOpen, setIsVendorOpen] = useState(false);
  const [isSubmitInterestOpen, setIsSubmitInterestOpen] = useState(false);

  const subHeadline =
    apiData?.mainPage?.subHeadline ||
    "Procurement by Purpose. Partnership by Proof.";
  const description = (
    apiData?.mainPage?.description ||
    "GREEN’s procurement approach isn’t driven by cost — it’s driven by consequence. Every product we source carries the weight of performance, reputation, and impact. That’s why we buy smart, selectively, and strategically."
  ).replace(" Every product", "\nEvery product");
  const pageTitle = apiData?.mainPage?.title || "Our Procurement Philosophy";
  const quotes = apiData?.mainPage?.quote;
  const interestCta = apiData?.mainPage?.cta?.[0];
  const conductCta = apiData?.mainPage?.cta?.[1];

  return (
    <main
      className={`${styles.page} ${canvas ? styles.canvasPage : ""}`}
      data-node-id="7080:73710"
    >
      <SiteHeader layout={canvas ? "figmaCanvas" : "viewport"} />

      {/* Background Mask Artwork */}
      <img
        loading="lazy"
        decoding="async"
        src="/images/our-procurement-philosophy/figma-mask-bg.png"
        alt=""
        className={styles.maskBg}
        aria-hidden="true"
      />

      {/* Vertical Side Title */}
      <img
        loading="lazy"
        decoding="async"
        src="/images/our-procurement-philosophy/figma-vertical-title.svg"
        alt="Our Procurement Philosophy"
        className={styles.verticalTitle}
      />

      {/* Top Header Content */}
      <div className={styles.topSection}>
        <h1 className={styles.mainTitle}>{pageTitle}</h1>
        <h2>{subHeadline}</h2>
        <p>{description}</p>
      </div>

      {/* 4 Philosophy Cards Grid */}
      <section
        className={styles.cardsSection}
        aria-label="Procurement Philosophy Pillars"
      >
        {/* Row 1 */}
        <div className={styles.cardRow}>
          {/* Card 1: Core Principles */}
          <article className={styles.card} data-node-id="7077:21825">
            <div className={styles.cardThumbWrapper}>
              <img
                src="/images/our-procurement-philosophy/card-border.svg"
                alt=""
                className={styles.cardBorder}
                aria-hidden="true"
              />
              <img
                loading="lazy"
                decoding="async"
                src="/images/our-procurement-philosophy/figma-card-1.png"
                alt="Core Principles"
                className={styles.cardThumb}
              />
            </div>
            <div className={styles.cardContent}>
              <h3>{apiData?.corePrinciples?.title || "Core Principles"}</h3>
              <p>
                {apiData?.corePrinciples?.subHeadline ||
                  "What Guides Our Procurement Decisions"}
              </p>
              <FigmaAngledCta
                className={styles.exploreCta}
                onClick={() => setIsCorePrinciplesOpen(true)}
              >
                Explore
              </FigmaAngledCta>
            </div>
          </article>

          {/* Card 2: What We Won't Compromise */}
          <article className={styles.card} data-node-id="7077:21827">
            <div className={styles.cardThumbWrapper}>
              <img
                src="/images/our-procurement-philosophy/card-border.svg"
                alt=""
                className={styles.cardBorder}
                aria-hidden="true"
              />
              <img
                loading="lazy"
                decoding="async"
                src={
                  apiData?.whatWeWontCompromise?.img?.src ||
                  "/images/our-procurement-philosophy/figma-card-2.png"
                }
                alt={
                  apiData?.whatWeWontCompromise?.img?.alt ||
                  "What We Won’t Compromise"
                }
                className={styles.cardThumb}
              />
            </div>
            <div className={styles.cardContent}>
              <h3>
                {apiData?.whatWeWontCompromise?.title ||
                  "What We Won’t Compromise"}
              </h3>
              <p>
                {apiData?.whatWeWontCompromise?.quote?.text ||
                  "If it can't stand the test of time, it doesn't belong in a GREEN system."}
              </p>
              <FigmaAngledCta
                className={styles.exploreCta}
                onClick={() => setIsCompromiseOpen(true)}
              >
                Explore
              </FigmaAngledCta>
            </div>
          </article>
        </div>

        {/* Row 2 */}
        <div className={styles.cardRow}>
          {/* Card 3: Procurement Aligned with Impact */}
          <article className={styles.card} data-node-id="7077:21826">
            <div className={styles.cardThumbWrapper}>
              <img
                src="/images/our-procurement-philosophy/card-border.svg"
                alt=""
                className={styles.cardBorder}
                aria-hidden="true"
              />
              <img
                loading="lazy"
                decoding="async"
                src={
                  apiData?.procurementAlignedImpact?.img?.src ||
                  "/images/our-procurement-philosophy/figma-card-3.png"
                }
                alt={
                  apiData?.procurementAlignedImpact?.img?.alt ||
                  "Procurement Aligned with Impact"
                }
                className={styles.cardThumb}
              />
            </div>
            <div className={styles.cardContent}>
              <h3>
                {apiData?.procurementAlignedImpact?.title ||
                  "Procurement Aligned with Impact"}
              </h3>
              <p>
                {apiData?.procurementAlignedImpact?.description ||
                  "We believe that no single player has all the answers. That's why GREEN seeks out:"}
              </p>
              <FigmaAngledCta
                className={styles.exploreCta}
                onClick={() => setIsProcrumentOpen(true)}
              >
                Explore
              </FigmaAngledCta>
            </div>
          </article>

          {/* Card 4: Strategic Vendor Relationships */}
          <article className={styles.card} data-node-id="7077:21828">
            <div className={styles.cardThumbWrapper}>
              <img
                src="/images/our-procurement-philosophy/card-border.svg"
                alt=""
                className={styles.cardBorder}
                aria-hidden="true"
              />
              <img
                loading="lazy"
                decoding="async"
                src={
                  apiData?.strategicVendorRelationships?.img?.src ||
                  "/images/our-procurement-philosophy/figma-card-4.png"
                }
                alt={
                  apiData?.strategicVendorRelationships?.img?.alt ||
                  "Strategic Vendor Relationships"
                }
                className={styles.cardThumb}
              />
            </div>
            <div className={styles.cardContent}>
              <h3>
                {apiData?.strategicVendorRelationships?.title ||
                  "Strategic Vendor Relationships"}
              </h3>
              <p>
                {apiData?.strategicVendorRelationships?.keys?.[0]?.text ||
                  "We don’t treat vendors as vendors. We treat them as partners in performance."}
              </p>
              <FigmaAngledCta
                className={styles.exploreCta}
                onClick={() => setIsVendorOpen(true)}
              >
                Explore
              </FigmaAngledCta>
            </div>
          </article>
        </div>
      </section>

      {/* Left Quote Block */}
      <div className={styles.leftQuoteBlock} data-node-id="7077:21801">
        <img
          loading="lazy"
          decoding="async"
          src="/images/handbook/figma-quote-left.svg"
          alt=""
          className={styles.quoteShapeLeft}
          aria-hidden="true"
        />
        <p className={styles.quoteText}>
          {quotes?.map((quote) => quote.text).join("\n") ||
            "You Call Them Projects. We Call Them People."}
        </p>
        <img
          loading="lazy"
          decoding="async"
          src="/images/handbook/figma-quote-right.svg"
          alt=""
          className={styles.quoteShapeRight}
          aria-hidden="true"
        />
      </div>

      {/* Bottom Statement */}
      <p className={styles.bottomStatement}>
        <span className={styles.greenText}>GREEN’s</span> Reputation Is Built On
        What We Build.
        <br />
        What We Build Is Only As Good As What We Procure.
      </p>

      {/* Desktop CTAs */}
      <div className={styles.desktopCtas}>
        <FigmaAngledCta
          className={styles.interestBtn}
          onClick={() => setIsSubmitInterestOpen(true)}
        >
          {interestCta?.text || "Submit Interest"}
        </FigmaAngledCta>
        <FigmaAngledCta
          className={styles.downloadBtn}
          icon="download"
          href={conductCta?.href || "/ecosystem/supplier-code-of-conduct"}
        >
          {conductCta?.text || "View GREEN Supplier Code of Conduct"}
        </FigmaAngledCta>
      </div>

      {/* Mobile Flow (< 1200px) */}
      <div className={styles.mobileElements}>
        <div className={styles.mobileQuoteBox}>
          <p>
            {quotes?.map((quote) => quote.text).join(" ") ||
              "You Call Them Projects. We Call Them People."}
          </p>
        </div>
        <div className={styles.mobileCtas}>
          <FigmaAngledCta onClick={() => setIsSubmitInterestOpen(true)}>
            {interestCta?.text || "Submit Interest"}
          </FigmaAngledCta>
          <FigmaAngledCta
            icon="download"
            href={conductCta?.href || "/ecosystem/supplier-code-of-conduct"}
          >
            {conductCta?.text || "View GREEN Supplier Code of Conduct"}
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

      {/* Reusable Modals & Dialogs */}
      <CorePrinciples
        isOpen={isCorePrinciplesOpen}
        onClose={() => setIsCorePrinciplesOpen(false)}
        data={apiData?.corePrinciples}
      />

      <Compromise
        isOpen={isCompromiseOpen}
        onClose={() => setIsCompromiseOpen(false)}
        data={apiData?.whatWeWontCompromise}
      />

      <Procrument
        isOpen={isProcrumentOpen}
        onClose={() => setIsProcrumentOpen(false)}
        data={apiData?.procurementAlignedImpact}
      />

      <Vendor
        isOpen={isVendorOpen}
        onClose={() => setIsVendorOpen(false)}
        data={apiData?.strategicVendorRelationships}
      />

      <ProductEnquiry
        isOpen={isSubmitInterestOpen}
        onClose={() => setIsSubmitInterestOpen(false)}
        titlePrefix="SUBMIT"
        titleAccent="INTEREST"
        interestLabel="WHAT DO YOU NEED HELP WITH?"
        defaultInterest="Procurement Partnership"
      />
    </main>
  );
}
