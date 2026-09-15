"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import HowToGetStarted from "../BecomeASupplier/Dialog/HowToGetStarted";
import RegisterInquiry from "../BecomeASupplier/Modals/RegisterInquiry";
import WhatYouNeed from "./Dialog/What-you-need";
import WhyGreen from "./Dialog/Why-Green";
import D6Chatbot from "../D6Chatbot";
import FigmaAngledCta from "../FigmaAngledCta/FigmaAngledCta";
import SiteHeader from "../SiteHeader/SiteHeader";
import Enquiry from "../SupplyParnters/Modals/Enquiry";
import FigmaPageCanvas from "../shared/FigmaPageCanvas";
import styles from "./BecomeSupplierCanvas.module.css";

const cards = [
  {
    key: "login",
    image: "/images/supplier/card1.png",
    title: "Supplier Login & Registration Panel",
    description:
      "Infrastructure without integrity is a risk. With GREEN, resilience is engineered.",
    imgWidth: 242,
    imgHeight: 100,
    rowTop: 346,
  },
  {
    key: "need",
    image: "/images/supplier/card2.png",
    title: "What You’ll Need",
    description: "Financial models and IRR simulations available on request",
    imgWidth: 242,
    imgHeight: 97,
    rowTop: 504,
  },
  {
    key: "why",
    image: "/images/supplier/card3.png",
    title: "Why GREEN?",
    description: "Engage in continuous improvement & collaboration",
    imgWidth: 242,
    imgHeight: 97,
    rowTop: 676,
  },
];

const BecomeSupplierCanvas = () => {
  const router = useRouter();
  const [openModal, setOpenModal] = useState<string | null>(null);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);

  const renderGreen = (text: string, cls = styles.green) =>
    text.split("GREEN").map((part, i, arr) => (
      // biome-ignore lint/suspicious/noArrayIndexKey: Static text segmentation by delimiter
      <React.Fragment key={i}>
        {part}
        {i < arr.length - 1 && <span className={cls}>GREEN</span>}
      </React.Fragment>
    ));

  const desktop = (
    <main className={styles.canvasPage} data-node-id="7077:28549">
      <SiteHeader layout="figmaCanvas" figmaPanelVariant="flagship" />

      <img
        loading="lazy"
        decoding="async"
        className={styles.canvasGhost}
        src="/images/supplier/bg_ghost.png"
        alt=""
        width="1590"
        height="1060"
      />

      <svg
        className={styles.canvasVerticalTitle}
        width="59"
        height="501"
        viewBox="0 0 59 501"
        aria-hidden="true"
      >
        <text
          fill="none"
          stroke="#d9d9d9"
          strokeWidth="1.2"
          fontFamily="'Raleway', Raleway, sans-serif"
          fontWeight="900"
          fontSize="50"
          transform="translate(52,485) rotate(-90)"
        >
          BECOME A SUPPLIER
        </text>
      </svg>

      <h1 className={styles.canvasTitle}>
        BECOME A <span>SUPPLIER</span>
      </h1>
      <p className={styles.canvasSubtitle}>
        Partner with GREEN. Build What Matters.
      </p>
      <p className={styles.canvasDescription}>
        {renderGreen(
          "GREEN Limited sources only from trusted suppliers who meet our uncompromising standards. This portal is your first step toward becoming part of our global energy supply network.",
        )}
      </p>

      {/* Figma brackets sit behind the card photos */}
      <img
        loading="lazy"
        decoding="async"
        className={styles.canvasBracketL}
        src="/images/rfp/quote_bracket_l.png"
        alt=""
        style={{ top: 356, left: 275 }}
      />
      <img
        loading="lazy"
        decoding="async"
        className={styles.canvasBracketL}
        src="/images/rfp/quote_bracket_l.png"
        alt=""
        style={{ top: 513, left: 275 }}
      />
      <img
        loading="lazy"
        decoding="async"
        className={styles.canvasBracketL}
        src="/images/rfp/quote_bracket_l.png"
        alt=""
        style={{ top: 686, left: 275 }}
      />

      {cards.map((card) => (
        <div
          className={styles.canvasCard}
          key={card.key}
          style={{ top: card.rowTop }}
        >
          <img
            loading="lazy"
            decoding="async"
            className={styles.canvasCardImg}
            src={card.image}
            alt=""
            width={card.imgWidth}
            height={card.imgHeight}
          />
          <h2 className={styles.canvasCardTitle}>{renderTitle(card.title)}</h2>
          <p className={styles.canvasCardDesc}>{card.description}</p>
          <FigmaAngledCta
            size="sm"
            className={styles.canvasExploreCta}
            onClick={() => {
              if (card.key === "login") {
                router.push("/ecosystem/supply-partners/login");
              } else if (card.key === "need") {
                setOpenModal("need");
              } else {
                setOpenModal(card.key);
              }
            }}
          >
            Explore
          </FigmaAngledCta>
        </div>
      ))}

      <img
        loading="lazy"
        decoding="async"
        className={styles.canvasQuoteBracketL}
        src="/images/rfp/quote_bracket_l.png"
        alt=""
      />
      <img
        loading="lazy"
        decoding="async"
        className={styles.canvasQuoteBracketR}
        src="/images/rfp/quote_bracket_r.png"
        alt=""
      />
      <p className={styles.canvasQuote}>
        This Portal Is Your First Step Toward Becoming Part Of Our Global Energy
        Supply Network
      </p>

      <FigmaAngledCta
        className={styles.canvasProcurementCta}
        icon="chevron"
        onClick={() => setIsEnquiryOpen(true)}
      >
        Procurement Contact
      </FigmaAngledCta>
      <FigmaAngledCta
        className={styles.canvasProspectusCta}
        icon="download"
        href="/GREEN-Supplier-Prospectus.pdf"
        download="GREEN-Supplier-Prospectus.pdf"
      >
        GREEN Supplier Prospectus (PDF)
      </FigmaAngledCta>

      <p className={styles.canvasBottomText}>
        {renderGreen(
          "Your Capital Can Build Megawatts — Or It Can Build Movements.\nWith GREEN, You Can Do Both.",
          styles.bottomGreen,
        )}
      </p>

      <D6Chatbot
        canvasAnchored
        triggerVariant="figmaCanvas"
        figmaPlaceholder="Let’s Talk Energy"
      />
    </main>
  );

  const mobile = (
    <main className={styles.mobilePage} data-node-id="7077:28549-mobile">
      <SiteHeader panel="logoOnly" />

      <div className={styles.mobileContainer}>
        <div className={styles.mobileIntro}>
          <span className={styles.mobileBadge}>BECOME A SUPPLIER</span>
          <h1 className={styles.mobileTitle}>
            BECOME A <span>SUPPLIER</span>
          </h1>
          <p className={styles.mobileSubtitle}>
            Partner with GREEN. Build What Matters.
          </p>
          <p className={styles.mobileDescription}>
            {renderGreen(
              "GREEN Limited sources only from trusted suppliers who meet our uncompromising standards. This portal is your first step toward becoming part of our global energy supply network.",
            )}
          </p>
        </div>

        <div className={styles.mobileCardsList}>
          {cards.map((card) => (
            <article className={styles.mobileCard} key={card.key}>
              <img
                loading="lazy"
                decoding="async"
                className={styles.mobileCardImg}
                src={card.image}
                alt={card.title}
              />
              <div className={styles.mobileCardBody}>
                <h2 className={styles.mobileCardTitle}>
                  {renderTitle(card.title)}
                </h2>
                <p className={styles.mobileCardDesc}>{card.description}</p>
                <FigmaAngledCta
                  size="sm"
                  className={styles.mobileExploreBtn}
                  onClick={() => {
                    if (card.key === "login") {
                      router.push("/ecosystem/supply-partners/login");
                    } else if (card.key === "need") {
                      setOpenModal("need");
                    } else {
                      setOpenModal(card.key);
                    }
                  }}
                >
                  Explore
                </FigmaAngledCta>
              </div>
            </article>
          ))}
        </div>

        <div className={styles.mobileQuoteBox}>
          <p>
            “This Portal Is Your First Step Toward Becoming Part Of Our Global
            Energy Supply Network”
          </p>
        </div>

        <p className={styles.mobileBottomText}>
          {renderGreen(
            "Your Capital Can Build Megawatts — Or It Can Build Movements.\nWith GREEN, You Can Do Both.",
            styles.bottomGreen,
          )}
        </p>

        <div className={styles.mobileActions}>
          <FigmaAngledCta
            className={styles.mobileActionBtn}
            icon="chevron"
            onClick={() => setIsEnquiryOpen(true)}
          >
            Procurement Contact
          </FigmaAngledCta>
          <FigmaAngledCta
            className={styles.mobileActionBtn}
            icon="download"
            href="/GREEN-Supplier-Prospectus.pdf"
            download="GREEN-Supplier-Prospectus.pdf"
          >
            GREEN Supplier Prospectus (PDF)
          </FigmaAngledCta>
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
        nodeId="7077:28549"
        fitCanvasHeight
      />
      <WhatYouNeed
        isOpen={openModal === "need"}
        onClose={() => setOpenModal(null)}
      />
      <WhyGreen
        isOpen={openModal === "why"}
        onClose={() => setOpenModal(null)}
      />
      <HowToGetStarted
        isOpen={openModal === "how"}
        onClose={() => setOpenModal(null)}
        onRegister={() => {
          setOpenModal(null);
          setIsRegisterOpen(true);
        }}
      />
      <RegisterInquiry
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
      />
      <Enquiry isOpen={isEnquiryOpen} onClose={() => setIsEnquiryOpen(false)} />
    </>
  );
};

const renderTitle = (title: string) =>
  title.split("GREEN").map((part, i, arr) => (
    // biome-ignore lint/suspicious/noArrayIndexKey: Static text segmentation by delimiter
    <React.Fragment key={i}>
      {part}
      {i < arr.length - 1 && <span className={styles.green}>GREEN</span>}
    </React.Fragment>
  ));

export default BecomeSupplierCanvas;
