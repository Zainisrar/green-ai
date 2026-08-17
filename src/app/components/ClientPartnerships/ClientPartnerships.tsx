"use client";

import { useState } from "react";
import { useClientPartnerships } from "@/hooks/useClientPartnerships";
import D6Chatbot from "../D6Chatbot";
import FigmaAngledCta from "../FigmaAngledCta/FigmaAngledCta";
import ProductEnquiry from "../Product/Modals/ProductEnquiry";
import SiteHeader from "../SiteHeader/SiteHeader";
import styles from "./ClientPartnerships.module.css";
import OurClientPartnershipModel from "./Dialog/OurClientPartnershipModel";
import PartnershipOnboarding from "./Dialog/PartnershipOnboarding";
import UseCases from "./Dialog/UseCases";
import WhatSetsGREENApart from "./Dialog/WhatSetsGREENApart";
import WhoWePartnerWith from "./Dialog/WhoWePartnerWith";

interface ClientPartnershipsProps {
  canvas?: boolean;
}

export default function ClientPartnerships({
  canvas = false,
}: ClientPartnershipsProps) {
  const { data } = useClientPartnerships();
  const [isWhoWePartnerOpen, setIsWhoWePartnerOpen] = useState(false);
  const [isOurModelOpen, setIsOurModelOpen] = useState(false);
  const [isWhatSetsOpen, setIsWhatSetsOpen] = useState(false);
  const [isUseCasesOpen, setIsUseCasesOpen] = useState(false);
  const [isPartnershipOnboardingOpen, setIsPartnershipOnboardingOpen] =
    useState(false);
  const [isBookCallOpen, setIsBookCallOpen] = useState(false);

  const subHeadline =
    data?.mainPage?.subHeadline ||
    "We Don’t Just Serve Clients. We Scale Their Missions.";
  const description =
    data?.mainPage?.description ||
    "From electrifying rural provinces to powering national infrastructure, GREEN partners with clients whose ambitions match our execution. We don’t just deliver energy — we deliver outcomes that endure.";

  const quote1Text1 =
    data?.mainPage?.quote1?.text1 ||
    "“ISO Compliant • Donor Trusted • Built Across PNG”";
  const quote1Text2 =
    data?.mainPage?.quote1?.text2 || "From Brief to Commissioning in 90 Days";
  const quote2 =
    data?.mainPage?.quote2 ||
    "Let’s Build What Your Nation or Enterprise Needs Next.";

  return (
    <main
      className={`${styles.page} ${canvas ? styles.canvasPage : ""}`}
      data-node-id="7077:15858"
    >
      <SiteHeader layout={canvas ? "figmaCanvas" : "viewport"} />

      {/* Vertical Side Title */}
      <img
        src="/images/client-partnerships/client-partnerships.png"
        alt="Client Partnerships"
        className={styles.verticalTitle}
      />

      {/* Top Header Content */}
      <div className={styles.topSection}>
        <h1 className={styles.mainTitle}>
          CLIENT <span className={styles.greenText}>PARTNERSHIPS</span>
        </h1>
        <h2>{subHeadline}</h2>
        <p>{description}</p>
      </div>

      {/* 5 Partnership Rows */}
      <section
        className={styles.rowsContainer}
        aria-label="Client Partnership Opportunities"
      >
        {/* Row 1: Who We Partner With / Our Client Partnership Model */}
        <article className={styles.row}>
          <div className={styles.rowContent}>
            <h3 className={styles.rowTitle}>
              {data?.ourClientPartnership?.title ||
                "Our Client Partnership Model"}
            </h3>
            <p className={styles.rowSubtitle}>
              {data?.ourClientPartnership?.subHeadline ||
                "Aligned by Design. Delivered with Accountability."}
            </p>
          </div>
          <FigmaAngledCta
            className={styles.rowCta}
            onClick={() => setIsOurModelOpen(true)}
          >
            Explore
          </FigmaAngledCta>
        </article>

        {/* Row 2: What Sets GREEN Apart */}
        <article className={styles.row}>
          <div className={styles.rowContent}>
            <h3 className={styles.rowTitle}>
              {data?.whatSetsGreenApart?.title || "What Sets GREEN Apart"}
            </h3>
            <p className={styles.rowSubtitle}>
              {data?.whatSetsGreenApart?.subHeadline ||
                "Strategic Clients. Transformational Outcomes."}
            </p>
          </div>
          <FigmaAngledCta
            className={styles.rowCta}
            onClick={() => setIsWhatSetsOpen(true)}
          >
            Explore
          </FigmaAngledCta>
        </article>

        {/* Row 3: Client Testimonials / Use Cases */}
        <article className={styles.row}>
          <div className={styles.rowContent}>
            <h3 className={styles.rowTitle}>
              {data?.useCases?.title || "Client Testimonials / Use Cases"}
            </h3>
            <p className={styles.rowSubtitle}>
              Strategic Clients. Transformational Outcomes.
            </p>
          </div>
          <FigmaAngledCta
            className={styles.rowCta}
            onClick={() => setIsUseCasesOpen(true)}
          >
            Explore
          </FigmaAngledCta>
        </article>

        {/* Row 4: Partnership Onboarding */}
        <article className={styles.row}>
          <div className={styles.rowContent}>
            <h3 className={styles.rowTitle}>Partnership Onboarding</h3>
            <p className={styles.rowSubtitle}>
              Strategic Clients. Transformational Outcomes.
            </p>
          </div>
          <FigmaAngledCta
            className={styles.rowCta}
            onClick={() => setIsPartnershipOnboardingOpen(true)}
          >
            Explore
          </FigmaAngledCta>
        </article>

        {/* Row 5: CLIENT PARTNER LOGIN */}
        <article className={styles.row}>
          <div className={styles.rowContent}>
            <h3 className={styles.rowTitle}>CLIENT PARTNER LOGIN</h3>
            <p className={styles.rowSubtitle}>
              Let’s Build What Your Nation or Enterprise Needs Next.
            </p>
          </div>
          <FigmaAngledCta
            className={styles.rowCta}
            href="/client-value-engineering"
          >
            Login
          </FigmaAngledCta>
        </article>
      </section>

      {/* Right Side Quotes Container */}
      <div className={styles.quotesContainer}>
        <div className={styles.quoteCardTop}>
          <h3>{quote1Text1}</h3>
          <p>{quote1Text2}</p>
        </div>

        <div className={styles.quoteCalloutMiddle}>
          <img
            src="/images/handbook/figma-quote-left.svg"
            alt=""
            className={styles.quoteShapeLeft}
            aria-hidden="true"
          />
          <p>{quote2}</p>
          <img
            src="/images/handbook/figma-quote-right.svg"
            alt=""
            className={styles.quoteShapeRight}
            aria-hidden="true"
          />
        </div>
      </div>

      {/* Desktop Bottom Right CTAs */}
      <div className={styles.desktopCtas}>
        <FigmaAngledCta
          className={styles.bookCta}
          onClick={() => setIsBookCallOpen(true)}
        >
          Book a Discovery Call
        </FigmaAngledCta>
        <FigmaAngledCta
          className={styles.downloadCta}
          icon="download"
          href="/supply-partners/client-partnership-prospectus.pdf"
        >
          GREEN Client Partnership Prospectus (PDF)
        </FigmaAngledCta>
      </div>

      {/* Mobile Flow (< 1200px) */}
      <div className={styles.mobileElements}>
        <div className={styles.mobileQuoteBox}>
          <p>{quote1Text1}</p>
          <p style={{ color: "#23b14d", marginTop: "4px" }}>{quote1Text2}</p>
        </div>
        <div className={styles.mobileQuoteBox}>
          <p>“{quote2}”</p>
        </div>
        <div className={styles.mobileCtas}>
          <FigmaAngledCta onClick={() => setIsBookCallOpen(true)}>
            Book a Discovery Call
          </FigmaAngledCta>
          <FigmaAngledCta
            icon="download"
            href="/supply-partners/client-partnership-prospectus.pdf"
          >
            GREEN Client Partnership Prospectus (PDF)
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
      <WhoWePartnerWith
        isOpen={isWhoWePartnerOpen}
        onClose={() => setIsWhoWePartnerOpen(false)}
        data={data?.whoWePartnerWith}
      />
      <OurClientPartnershipModel
        isOpen={isOurModelOpen}
        onClose={() => setIsOurModelOpen(false)}
        data={data?.ourClientPartnership}
      />
      <WhatSetsGREENApart
        isOpen={isWhatSetsOpen}
        onClose={() => setIsWhatSetsOpen(false)}
        data={data?.whatSetsGreenApart}
      />
      <UseCases
        isOpen={isUseCasesOpen}
        onClose={() => setIsUseCasesOpen(false)}
        data={data?.useCases}
      />
      <PartnershipOnboarding
        isOpen={isPartnershipOnboardingOpen}
        onClose={() => setIsPartnershipOnboardingOpen(false)}
      />

      {/* Discovery Call Inquiry Modal */}
      <ProductEnquiry
        isOpen={isBookCallOpen}
        onClose={() => setIsBookCallOpen(false)}
        titlePrefix="BOOK A"
        titleAccent="DISCOVERY CALL"
        interestLabel="AREA OF INTEREST"
        interestOptions={[
          "Government & Utilities",
          "Donors & Development Banks",
          "Private Sector Enterprise",
          "Institutions (Health, Education, Telecom)",
          "Commercial & Industrial EPC",
          "Other",
        ]}
        defaultInterest="Government & Utilities"
      />
    </main>
  );
}
