"use client";

import React, { useState } from "react";
import SiteHeader from "../SiteHeader/SiteHeader";
import FigmaAngledCta from "../FigmaAngledCta/FigmaAngledCta";
import D6Chatbot from "../D6Chatbot";
import styles from "./BecomeSupplierCanvas.module.css";
import WhatWeLookFor from "../BecomeASupplier/Dialog/WhatWeLookFor";
import KeySupplyCategories from "../BecomeASupplier/Dialog/KeySupplyCategories";
import HowToGetStarted from "../BecomeASupplier/Dialog/HowToGetStarted";
import RegisterInquiry from "../BecomeASupplier/Modals/RegisterInquiry";

const cards = [
  {
    key: "login",
    image: "/images/supplier/card1.png",
    title: "Supplier Login & Registration Panel",
    description: "Infrastructure without integrity is a risk. With GREEN, resilience is engineered.",
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
  const [openModal, setOpenModal] = useState<string | null>(null);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  const renderGreen = (text: string, cls = styles.green) =>
    text.split("GREEN").map((part, i, arr) => (
      <React.Fragment key={i}>
        {part}
        {i < arr.length - 1 && <span className={cls}>GREEN</span>}
      </React.Fragment>
    ));

  return (
    <main className={styles.canvasPage} data-node-id="7077:28549">
      <SiteHeader layout="figmaCanvas" figmaPanelVariant="flagship" />

      <img loading="lazy" decoding="async"
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
        Become a <span>SUPPLIER</span>
      </h1>
      <p className={styles.canvasSubtitle}>Partner with GREEN. Build What Matters.</p>
      <p className={styles.canvasDescription}>
        {renderGreen(
          "GREEN Limited sources only from trusted suppliers who meet our uncompromising standards. This portal is your first step toward becoming part of our global energy supply network.",
        )}
      </p>

      {/* Figma brackets sit behind the card photos */}
      <img loading="lazy" decoding="async"
        className={styles.canvasBracketL}
        src="/images/rfp/quote_bracket_l.png"
        alt=""
        style={{ top: 356, left: 275 }}
      />
      <img loading="lazy" decoding="async"
        className={styles.canvasBracketL}
        src="/images/rfp/quote_bracket_l.png"
        alt=""
        style={{ top: 513, left: 275 }}
      />
      <img loading="lazy" decoding="async"
        className={styles.canvasBracketL}
        src="/images/rfp/quote_bracket_l.png"
        alt=""
        style={{ top: 686, left: 275 }}
      />

      {cards.map((card) => (
        <div className={styles.canvasCard} key={card.key} style={{ top: card.rowTop }}>
          <img loading="lazy" decoding="async"
            className={styles.canvasCardImg}
            src={card.image}
            alt=""
            width={card.imgWidth}
            height={card.imgHeight}
          />
          <h2 className={styles.canvasCardTitle}>{renderTitle(card.title)}</h2>
          <p className={styles.canvasCardDesc}>{card.description}</p>
          <FigmaAngledCta
            className={styles.canvasExploreCta}
            onClick={() => {
              if (card.key === "login") {
                setIsRegisterOpen(true);
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

      <img loading="lazy" decoding="async"
        className={styles.canvasQuoteBracketL}
        src="/images/rfp/quote_bracket_l.png"
        alt=""
      />
      <img loading="lazy" decoding="async"
        className={styles.canvasQuoteBracketR}
        src="/images/rfp/quote_bracket_r.png"
        alt=""
      />
      <p className={styles.canvasQuote}>
        This Portal Is Your First Step Toward Becoming Part Of Our Global Energy Supply
        Network
      </p>

      <FigmaAngledCta
        className={styles.canvasProcurementCta}
        href="mailto:procurement@green.com.pg"
        icon="chevron"
      >
        Procurement Contact
      </FigmaAngledCta>
      <FigmaAngledCta
        className={styles.canvasProspectusCta}
        href="mailto:procurement@green.com.pg?subject=GREEN%20Supplier%20Prospectus%20Request"
        icon="chevron"
      >
        Request GREEN Supplier Prospectus
      </FigmaAngledCta>

      <p className={styles.canvasBottomText}>
        {renderGreen(
          "Your Capital Can Build Megawatts — Or It Can Build Movements. With GREEN, You Can Do Both.",
          styles.bottomGreen,
        )}
      </p>

      <D6Chatbot
        canvasAnchored
        triggerVariant="figmaCanvas"
        figmaPlaceholder="Let&rsquo;s Talk Energy"
      />

      <KeySupplyCategories
        isOpen={openModal === "need"}
        onClose={() => setOpenModal(null)}
      />
      <WhatWeLookFor
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
    </main>
  );
};

const renderTitle = (title: string) =>
  title.split("GREEN").map((part, i, arr) => (
    <React.Fragment key={i}>
      {part}
      {i < arr.length - 1 && <span className={styles.green}>GREEN</span>}
    </React.Fragment>
  ));

export default BecomeSupplierCanvas;
