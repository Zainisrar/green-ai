"use client";

import React from "react";
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

interface CardRow {
  key: string;
  img: string;
  imgAlt: string;
  maskX: number;
  maskY: number;
  outlineX: number;
  outlineY: number;
  titleX: number;
  titleY: number;
  title: string;
  ctaX: number;
  ctaY: number;
  dialogKey?: "ethos" | "conduct";
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

  const cards: CardRow[] = [
    {
      key: "ethos",
      img: "/images/supplier-code-of-conduct/card_ethos.png",
      imgAlt: "Our Procurement Ethos",
      maskX: 719,
      maskY: 314,
      outlineX: 730,
      outlineY: 306,
      titleX: 1059,
      titleY: 297,
      title: "Our Procurement Ethos",
      ctaX: 1014,
      ctaY: 394,
      dialogKey: "ethos",
    },
    {
      key: "conduct",
      img: "/images/supplier-code-of-conduct/card_conduct.png",
      imgAlt: "Code of Conduct (Rewritten)",
      maskX: 1346,
      maskY: 314,
      outlineX: 1357,
      outlineY: 306,
      titleX: 1694,
      titleY: 303,
      title: data?.codeOfConduct?.title || "Code of Conduct (Rewritten)",
      ctaX: 1641,
      ctaY: 397,
      dialogKey: "conduct",
    },
    {
      key: "checklist",
      img: "/images/supplier-code-of-conduct/card_checklist.png",
      imgAlt: "The GREEN Vendor Checklist (Editable PDF Style)",
      maskX: 596,
      maskY: 545,
      outlineX: 607,
      outlineY: 538,
      titleX: 936,
      titleY: 538,
      title: "The GREEN Vendor Checklist (Editable PDF Style)",
      ctaX: 882,
      ctaY: 633,
    },
    {
      key: "certification",
      img: "/images/supplier-code-of-conduct/card_certification.png",
      imgAlt: "Certification & Signature Page",
      maskX: 1247,
      maskY: 536,
      outlineX: 1258,
      outlineY: 528,
      titleX: 1594,
      titleY: 536,
      title: "Certification & Signature Page",
      ctaX: 1532,
      ctaY: 622,
    },
  ];

  return (
    <main
      className={`${styles.page} ${canvas ? styles.canvasPage : ""}`}
      data-node-id="7077:28846"
    >
      <SiteHeader
        layout={canvas ? "figmaCanvas" : "viewport"}
        panel={canvas ? "logoOnly" : "full"}
      />

      {/* Left gradient panel */}
      <div className={styles.leftPanel} />

      {/* Vertical outlined side title */}
      <h2 className={styles.verticalTitle}>{title}</h2>

      {/* Washed left collage (mask group at -472,408) */}
      <div className={styles.leftCollage}>
        <img
          src="/images/supplier-code-of-conduct/collage.png"
          alt=""
          aria-hidden="true"
        />
      </div>

      {/* Header block */}
      <div className={styles.headerBlock}>
        <h1>
          <span className={styles.h1Black}>SUPPLIER CODE OF </span>
          <span className={styles.h1Green}>CONDUCT</span>
          <span className={styles.h1Black}> / HANDBOOK</span>
        </h1>
        <h2>{subHeadline}</h2>
        <p>{description}</p>
      </div>

      {/* Cards: parallelogram image masks, headings, Explore pills */}
      {cards.map((card) => (
        <React.Fragment key={card.key}>
          <img
            src={card.img}
            alt={card.imgAlt}
            className={styles.cardImg}
            style={{ left: card.maskX, top: card.maskY }}
          />
          <h3
            className={styles.cardTitle}
            style={{ left: card.titleX, top: card.titleY }}
          >
            {card.title}
          </h3>
          <FigmaAngledCta
            className={styles.cardCta}
            style={{ position: "absolute", left: card.ctaX, top: card.ctaY }}
            onClick={
              card.dialogKey === "ethos"
                ? () => setIsOurProcurementEthosOpen(true)
                : card.dialogKey === "conduct"
                  ? () => setIsCodeOfConductOpen(true)
                  : undefined
            }
          >
            Explore
          </FigmaAngledCta>
        </React.Fragment>
      ))}

      {/* Left statement with angled brackets */}
      <div className={styles.statementBlock}>
        <img
          src="/images/supplier-code-of-conduct/quote_left.png"
          alt=""
          className={styles.statementBracketLeft}
          aria-hidden="true"
        />
        <img
          src="/images/supplier-code-of-conduct/quote_right.png"
          alt=""
          className={styles.statementBracketRight}
          aria-hidden="true"
        />
        <p className={styles.statementText}>
          You Call Them <span>Projects.</span>
          <br />
          We Call Them <span>People.</span>
        </p>
      </div>

      {/* Right closing quote */}
      <p className={styles.rightQuote}>
        When The Lights Come On, The Real Story Begins.
        <br />
        And <span>GREEN</span> Is Honored To Power Every Chapter.
      </p>

      {/* Supplier Login pill + Read more */}
      <FigmaAngledCta
        className={styles.loginCta}
        style={{ position: "absolute", left: 1650, top: 792 }}
        href="/supply-partners/login"
      >
        Supplier Login
      </FigmaAngledCta>
      <a className={styles.readMore} href="/supply-partners/login">
        Read more
        <svg
          width="25"
          height="7"
          viewBox="0 0 25 7"
          fill="none"
          aria-hidden="true"
        >
          <path d="M0 3.5H23M23 3.5L19 0.5M23 3.5L19 6.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </a>

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
