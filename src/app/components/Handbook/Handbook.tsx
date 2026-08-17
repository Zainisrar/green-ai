"use client";

import { useState } from "react";
import { useHandbook } from "@/app/hooks/useHandbook";
import D6Chatbot from "../D6Chatbot";
import FigmaAngledCta from "../FigmaAngledCta/FigmaAngledCta";
import SiteHeader from "../SiteHeader/SiteHeader";
import CodeOfConduct from "./Dialog/CodeofConduct";
import OurProcurementEthos from "./Dialog/OurProcurementEthos";
import styles from "./Handbook.module.css";

interface HandbookProps {
  canvas?: boolean;
}

export default function Handbook({ canvas = false }: HandbookProps) {
  const [isOurProcurementEthosOpen, setIsOurProcurementEthosOpen] =
    useState(false);
  const [isCodeOfConductOpen, setIsCodeOfConductOpen] = useState(false);
  const { data } = useHandbook();

  const title = data?.mainPage?.title || "Supplier Code of Conduct / Handbook";
  const subHeadline =
    data?.mainPage?.subHeadline || "We don’t buy parts. We procure proof.";
  const description =
    data?.mainPage?.description ||
    "At GREEN, every vendor is expected to perform under field pressure, not policy pressure.";

  return (
    <main
      className={`${styles.page} ${canvas ? styles.canvasPage : ""}`}
      data-node-id="7077:28846"
    >
      <SiteHeader layout={canvas ? "figmaCanvas" : "viewport"} />

      {/* Background Mask Artwork */}
      <img
        src="/images/handbook/figma-mask-bg.png"
        alt=""
        className={styles.maskBg}
        aria-hidden="true"
      />

      {/* Vertical Side Title */}
      <img
        src="/images/handbook/figma-vertical-title.svg"
        alt="Supplier Code of Conduct / Handbook"
        className={styles.verticalTitle}
      />

      {/* Top Header Content */}
      <div className={styles.topSection}>
        <h1>{title}</h1>
        <h2>{subHeadline}</h2>
        <p>{description}</p>
      </div>

      {/* 4 Handbook Cards (2x2 Grid) */}
      <section className={styles.cardsSection} aria-label="Handbook Documents">
        {/* Row 1 */}
        <div className={styles.cardRow}>
          {/* Card 1: Our Procurement Ethos */}
          <article className={styles.card} data-node-id="7077:28889">
            <img
              src="/images/handbook/figma-card-1.png"
              alt="Our Procurement Ethos"
              className={styles.cardThumb}
            />
            <div className={styles.cardContent}>
              <h3>
                {data?.ourProcurementEthos?.title || "Our Procurement Ethos"}
              </h3>
              <FigmaAngledCta
                className={styles.exploreCta}
                onClick={() => setIsOurProcurementEthosOpen(true)}
              >
                Explore
              </FigmaAngledCta>
            </div>
          </article>

          {/* Card 2: Code of Conduct */}
          <article className={styles.card} data-node-id="7077:28890">
            <img
              src="/images/handbook/figma-card-2.png"
              alt="Code of Conduct"
              className={styles.cardThumb}
            />
            <div className={styles.cardContent}>
              <h3>
                {data?.codeOfConduct?.title || "Code of Conduct (Rewritten)"}
              </h3>
              <FigmaAngledCta
                className={styles.exploreCta}
                onClick={() => setIsCodeOfConductOpen(true)}
              >
                Explore
              </FigmaAngledCta>
            </div>
          </article>
        </div>

        {/* Row 2 */}
        <div className={styles.cardRow}>
          {/* Card 3: The GREEN Vendor Checklist */}
          <article className={styles.card} data-node-id="7077:28891">
            <img
              src="/images/handbook/figma-card-3.png"
              alt="The GREEN Vendor Checklist"
              className={styles.cardThumb}
            />
            <div className={styles.cardContent}>
              <h3>The GREEN Vendor Checklist (Editable PDF style)</h3>
              <FigmaAngledCta className={styles.exploreCta}>
                Explore
              </FigmaAngledCta>
            </div>
          </article>

          {/* Card 4: Certification & Signature Page */}
          <article className={styles.card} data-node-id="7077:28892">
            <img
              src="/images/handbook/figma-card-4.png"
              alt="Certification & Signature Page"
              className={styles.cardThumb}
            />
            <div className={styles.cardContent}>
              <h3>Certification & Signature Page</h3>
              <FigmaAngledCta className={styles.exploreCta}>
                Explore
              </FigmaAngledCta>
            </div>
          </article>
        </div>
      </section>

      {/* Left Quote Block */}
      <div className={styles.leftQuoteBlock}>
        <img
          src="/images/handbook/figma-quote-left.svg"
          alt=""
          className={styles.quoteShapeLeft}
          aria-hidden="true"
        />
        <p className={styles.quoteText}>
          You Call Them Projects.
          <br />
          We Call Them People.
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
        When the lights come on, the real story begins. And <span>GREEN</span>{" "}
        is honored to power every chapter.
      </p>

      {/* Desktop CTA: Supplier Login */}
      <div className={styles.desktopCtas}>
        <FigmaAngledCta
          className={styles.loginBtn}
          href="/supply-partners/login"
        >
          Supplier Login
        </FigmaAngledCta>
      </div>

      {/* Mobile Flow (< 1200px) */}
      <div className={styles.mobileElements}>
        <div className={styles.mobileQuoteBox}>
          <p>“You Call Them Projects. We Call Them People.”</p>
        </div>
        <div className={styles.mobileCtas}>
          <FigmaAngledCta
            className={styles.loginBtn}
            href="/supply-partners/login"
          >
            Supplier Login
          </FigmaAngledCta>
        </div>
      </div>

      {/* Chatbot */}
      {canvas ? (
        <D6Chatbot
          canvasAnchored
          triggerVariant="figmaCanvas"
          triggerStyle={{
            top: 889,
            right: "auto",
            bottom: "auto",
            left: 1500,
            width: 418,
          }}
        />
      ) : (
        <D6Chatbot />
      )}

      {/* Dialogs */}
      {data?.ourProcurementEthos ? (
        <OurProcurementEthos
          isOpen={isOurProcurementEthosOpen}
          onClose={() => setIsOurProcurementEthosOpen(false)}
          title={data.ourProcurementEthos.title}
          description={data.ourProcurementEthos.description}
          keys={data.ourProcurementEthos.keys}
          img={data.ourProcurementEthos.img}
        />
      ) : null}

      {data?.codeOfConduct ? (
        <CodeOfConduct
          isOpen={isCodeOfConductOpen}
          onClose={() => setIsCodeOfConductOpen(false)}
          title={data.codeOfConduct.title}
          items={data.codeOfConduct.item}
        />
      ) : null}
    </main>
  );
}
