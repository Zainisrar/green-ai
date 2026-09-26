"use client";

import React, { useState } from "react";
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
  visualX: number;
  visualY: number;
  titleX: number;
  titleY: number;
  title: string;
  ctaX: number;
  ctaY: number;
  dialogKey?: "ethos" | "conduct";
  href?: string;
}

export default function Handbook({ canvas = false }: HandbookProps) {
  const [isOurProcurementEthosOpen, setIsOurProcurementEthosOpen] =
    useState(false);
  const [isCodeOfConductOpen, setIsCodeOfConductOpen] = useState(false);
  const { data } = useHandbook();

  const title = (
    data?.mainPage?.title || "Supplier Code of Conduct / Handbook"
  ).toUpperCase();
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
      visualX: 723,
      visualY: 303.5,
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
      visualX: 1350,
      visualY: 303.5,
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
      visualX: 600,
      visualY: 535,
      titleX: 936,
      titleY: 538,
      title: "The GREEN Vendor Checklist (Editable PDF Style)",
      ctaX: 882,
      ctaY: 633,
      href: "/supplier-handbook.pdf",
    },
    {
      key: "certification",
      img: "/images/supplier-code-of-conduct/card_certification.png",
      imgAlt: "Certification & Signature Page",
      visualX: 1251,
      visualY: 525,
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
      {canvas ? (
        <div className={styles.desktopCanvas}>
          <SiteHeader
            layout="figmaCanvas"
            panel="logoOnly"
          />

          {/* Left gradient panel */}
          <div className={styles.leftPanel} />

          {/* Vertical outlined side title */}
          <h2 className={styles.verticalTitle}>{title}</h2>

          {/* Figma's supplied washed background mask behind the side label. */}
          <div className={styles.leftCollage}>
            <img
              loading="lazy"
              decoding="async"
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

          {/* Cards: parallelogram border vectors, image masks, headings, Explore pills */}
          {cards.map((card) => (
            <React.Fragment key={card.key}>
              {/* Neon lime gradient card border with centered image (equal spacing, zero overflow) */}
              <div
                className={styles.cardVisual}
                style={{ left: card.visualX, top: card.visualY }}
              >
                <img
                  src="/images/supplier-code-of-conduct/card-border.svg"
                  alt=""
                  className={styles.cardBorder}
                  aria-hidden="true"
                />
                <img
                  loading="lazy"
                  decoding="async"
                  src={card.img}
                  alt={card.imgAlt}
                  className={styles.cardImg}
                />
              </div>
              <h3
                className={styles.cardTitle}
                style={{ left: card.titleX, top: card.titleY }}
              >
                {card.title}
              </h3>
              <FigmaAngledCta
                size="md"
                className={styles.cardCta}
                style={{ position: "absolute", left: card.ctaX, top: card.ctaY }}
                onClick={
                  card.dialogKey === "ethos"
                    ? () => setIsOurProcurementEthosOpen(true)
                    : card.dialogKey === "conduct"
                      ? () => setIsCodeOfConductOpen(true)
                      : undefined
                }
                href={card.href}
              >
                Explore
              </FigmaAngledCta>
            </React.Fragment>
          ))}

          {/* Left statement with angled brackets */}
          <div className={styles.statementBlock}>
            <img
              loading="lazy"
              decoding="async"
              src="/images/supplier-code-of-conduct/quote_left.png"
              alt=""
              className={styles.statementBracketLeft}
              aria-hidden="true"
            />
            <img
              loading="lazy"
              decoding="async"
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
            href="/ecosystem/supply-partners/login"
          >
            Supplier Login
          </FigmaAngledCta>
          <a className={styles.readMore} href="/ecosystem/supply-partners/login">
            Read more
            <svg
              width="25"
              height="7"
              viewBox="0 0 25 7"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M0 3.5H23M23 3.5L19 0.5M23 3.5L19 6.5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>

          {/* Chatbot */}
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
        </div>
      ) : (
        <div className={styles.mobileLayout}>
          <SiteHeader layout="viewport" panel="full" />

          {/* Mobile Header Block */}
          <header className={styles.mobileHeaderBlock}>
            <span className={styles.mobileEyebrow}>ECOSYSTEM • SUPPLY PARTNERS</span>
            <h1 className={styles.mobileTitle}>
              <span>SUPPLIER CODE OF </span>
              <span className={styles.greenText}>CONDUCT</span>
              <span> / HANDBOOK</span>
            </h1>
            <h2 className={styles.mobileSubtitle}>{subHeadline}</h2>
            <p className={styles.mobileDescription}>{description}</p>
          </header>

          {/* Mobile Cards Section: All 4 Cards with Images, Gradient Borders, Titles, and CTAs */}
          <section
            className={styles.mobileCardsSection}
            aria-label="Supplier Code of Conduct Sections"
          >
            {cards.map((card) => (
              <article key={`mobile-${card.key}`} className={styles.mobileCard}>
                <div className={styles.mobileCardImgWrapper}>
                  <img
                    src="/images/supplier-code-of-conduct/card-border.svg"
                    alt=""
                    className={styles.mobileCardBorderSvg}
                    aria-hidden="true"
                  />
                  <img
                    loading="lazy"
                    decoding="async"
                    src={card.img}
                    alt={card.imgAlt}
                    className={styles.mobileCardImg}
                  />
                </div>

                <div className={styles.mobileCardBody}>
                  <h3 className={styles.mobileCardTitle}>{card.title}</h3>
                  <div className={styles.mobileCardCtaWrapper}>
                    <FigmaAngledCta
                      size="md"
                      className={styles.mobileCardCta}
                      onClick={
                        card.dialogKey === "ethos"
                          ? () => setIsOurProcurementEthosOpen(true)
                          : card.dialogKey === "conduct"
                            ? () => setIsCodeOfConductOpen(true)
                            : undefined
                      }
                      href={
                        card.href ||
                        (card.key === "certification"
                          ? "/ecosystem/supply-partners/login"
                          : undefined)
                      }
                    >
                      Explore
                    </FigmaAngledCta>
                  </div>
                </div>
              </article>
            ))}
          </section>

          {/* Mobile Statement Block with Angled Graphic Brackets */}
          <div className={styles.mobileStatementBlock}>
            <img
              loading="lazy"
              decoding="async"
              src="/images/supplier-code-of-conduct/quote_left.png"
              alt=""
              className={styles.mobileQuoteBracketLeft}
              aria-hidden="true"
            />
            <p className={styles.mobileStatementText}>
              You Call Them <span className={styles.greenText}>Projects.</span>
              <br />
              We Call Them <span className={styles.greenText}>People.</span>
            </p>
            <img
              loading="lazy"
              decoding="async"
              src="/images/supplier-code-of-conduct/quote_right.png"
              alt=""
              className={styles.mobileQuoteBracketRight}
              aria-hidden="true"
            />
          </div>

          {/* Mobile Closing Value Quote */}
          <div className={styles.mobileClosingQuote}>
            <p>
              When The Lights Come On, The Real Story Begins.
              <br />
              And <span className={styles.greenText}>GREEN</span> Is Honored To Power Every Chapter.
            </p>
          </div>

          {/* Mobile Bottom Actions (Supplier Login & Read More) */}
          <div className={styles.mobileBottomActions}>
            <FigmaAngledCta
              className={styles.mobileLoginCta}
              href="/ecosystem/supply-partners/login"
            >
              Supplier Login
            </FigmaAngledCta>
            <a
              className={styles.mobileReadMore}
              href="/ecosystem/supply-partners/login"
            >
              Read more
              <svg
                width="25"
                height="7"
                viewBox="0 0 25 7"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M0 3.5H23M23 3.5L19 0.5M23 3.5L19 6.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </div>

          {/* Chatbot on mobile */}
          <D6Chatbot />
        </div>
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

      <CodeOfConduct
        isOpen={isCodeOfConductOpen}
        onClose={() => setIsCodeOfConductOpen(false)}
        title={data?.codeOfConduct?.title || "Code of Conduct (Rewritten)"}
        items={data?.codeOfConduct?.item || []}
      />
    </main>
  );
}
