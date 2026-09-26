"use client";

import Link from "next/link";
import { useState } from "react";
import { useIndustryAffiliationsCertifications } from "@/app/hooks/useIndustryAffiliationsCertifications";
import D6Chatbot from "../D6Chatbot";
import SiteHeader from "../SiteHeader/SiteHeader";
import FigmaPageCanvas from "../shared/FigmaPageCanvas";
import IndustryAffiliations from "./Dialog/IndustryAffiliations";
import OurCurrentCertifications from "./Dialog/OurCurrentCertifications";
import WhatThisMeansforClients from "./Dialog/WhatThisMeansforClients";
import WhyCertificationAffiliationMatter from "./Dialog/WhyCertificationAffiliationMatter";
import FigmaAngledCta from "../FigmaAngledCta/FigmaAngledCta";
import styles from "./IndustryAffiliationsCertifications.module.css";
import ProductEnquiry from "../Product/Modals/ProductEnquiry";

const FALLBACK_TITLE = "Industry Affiliations & Certifications";
const FALLBACK_SUBHEADLINE =
  "Built to Global Standards. Certified for Real-World Delivery.";
const FALLBACK_DESCRIPTION =
  "From engineering compliance to workforce accreditation, GREEN’s excellence is independently verified and globally recognized. We don’t just meet the standard — we often help define it.";
const FALLBACK_QUOTE = [
  { text: "We don’t chase compliance.", highlighted: false },
  { text: "We build with it", highlighted: false },
  { text: "— because infrastructure only", highlighted: true },
  { text: "matters if it lasts.", highlighted: true },
];
const FALLBACK_BOTTOM_QUOTE =
  "In energy infrastructure, trust is engineered — through compliance, peer validation, and continuous improvement.";

function PageTitle({ title }: { title: string }) {
  const parts = title.match(/^(.*?)(affiliations)(.*)$/i);
  if (!parts) return <>{title}</>;
  return (
    <>
      {parts[1]}
      <span>{parts[2]}</span>
      {parts[3]}
    </>
  );
}

function BottomQuote({ quote }: { quote: string }) {
  const match = quote.match(/^(.*?)(engineered)(.*)$/i);
  return (
    <blockquote className={styles.bottomQuote}>
      “
      {match ? (
        <>
          {match[1]}
          <em>{match[2]}</em>
          {match[3]}
        </>
      ) : (
        quote
      )}
      ”
    </blockquote>
  );
}

export default function IndustryAffiliationsCertifications() {
  const [isWhyCertOpen, setIsWhyCertOpen] = useState(false);
  const [isOurCurrentCertOpen, setIsOurCurrentCertOpen] = useState(false);
  const [isIndustryAffiliationsOpen, setIsIndustryAffiliationsOpen] =
    useState(false);
  const [isWhatThisMeansForClientsOpen, setIsWhatThisMeansForClientsOpen] =
    useState(false);
  const [isIndividualCertOpen, setIsIndividualCertOpen] = useState(false);
  const { data } = useIndustryAffiliationsCertifications();

  const mainPage = data?.mainPage;
  const title = mainPage?.title?.trim() || FALLBACK_TITLE;
  const subtitle = mainPage?.subHeadline?.trim() || FALLBACK_SUBHEADLINE;
  const description =
    mainPage?.description?.text?.trim() || FALLBACK_DESCRIPTION;
  const quote = mainPage?.quote?.length
    ? mainPage.quote.map((item) => ({
        text: item.text,
        highlighted: Boolean(item.highlighted),
      }))
    : FALLBACK_QUOTE;
  const bottomQuote =
    data?.whyCertificationAffiliationMatter?.quote?.text?.trim() ||
    FALLBACK_BOTTOM_QUOTE;

  const closeDialogs = () => {
    setIsWhyCertOpen(false);
    setIsOurCurrentCertOpen(false);
    setIsIndustryAffiliationsOpen(false);
    setIsWhatThisMeansForClientsOpen(false);
  };

  const cards = [
    {
      label: "Why Certification & Affiliation Matter",
      onClick: () => setIsWhyCertOpen(true),
    },
    {
      label: "Our Current Certifications",
      onClick: () => setIsOurCurrentCertOpen(true),
    },
    {
      label: "Industry Affiliations",
      onClick: () => setIsIndustryAffiliationsOpen(true),
    },
    {
      label: "What This Means for Clients",
      onClick: () => setIsWhatThisMeansForClientsOpen(true),
    },
  ];

  const desktop = (
    <main className={styles.desktopPage} data-node-id="7077:15958">
      <img
        className={styles.background}
        src="/images/industry-affiliations-certifications/bg.jpg"
        alt=""
        aria-hidden="true"
        width="1920"
        height="970"
      />
      <SiteHeader
        layout="figmaCanvas"
        highlightActive={false}
        showBrand={false}
      />
      <img
        className={styles.pageLogo}
        src="/images/client-partnerships/logo_green.png"
        alt="GREEN — Futures Envisioned"
        width="255"
        height="67"
      />
      <img
        className={styles.verticalTitle}
        src="/images/industry-affiliations-certifications/industry-affiliations-certifications.png"
        alt=""
        aria-hidden="true"
        width="32"
        height="788"
      />
      <section className={styles.introduction}>
        <h1>
          <PageTitle title={title.toUpperCase()} />
        </h1>
        <h2>{subtitle}</h2>
        <p>{description}</p>
      </section>
      <section
        className={styles.cardList}
        aria-label="Industry affiliations and certifications"
      >
        {cards.map((card) => (
          <article className={styles.exploreCard} key={card.label}>
            <img
              className={styles.cardVector}
              src="/images/industry-affiliations-certifications/vector-7364.svg"
              alt=""
              aria-hidden="true"
            />
            <h3>{card.label}</h3>
            <button
              type="button"
              onClick={card.onClick}
              aria-label={`Explore ${card.label}`}
            >
              <img
                className={styles.exploreVector}
                src="/images/industry-affiliations-certifications/vector-7368.svg"
                alt=""
                aria-hidden="true"
              />
              <span>Explore</span>
              <svg viewBox="0 0 11 18" aria-hidden="true">
                <path d="M1.5 1.5 9 9l-7.5 7.5" />
              </svg>
            </button>
          </article>
        ))}
      </section>
      <section
        className={styles.complianceQuote}
        aria-label="GREEN compliance statement"
      >
        {quote.map((line, index) => (
          <p
            className={line.highlighted ? styles.highlighted : ""}
            key={`${line.text}-${index}`}
          >
            {line.text}
          </p>
        ))}
      </section>
      <BottomQuote quote={bottomQuote} />
      <div className={styles.actions}>
        {mainPage?.cta?.[0]?.href ? (
          <Link href={mainPage.cta[0].href} className={styles.dossierLink}>
            <img
              src="/images/industry-affiliations-certifications/green.png"
              alt={mainPage.cta[0].text || "GREEN Certification Dossier"}
              width="372"
              height="54"
            />
          </Link>
        ) : (
          <img
            className={styles.dossierLink}
            src="/images/industry-affiliations-certifications/green.png"
            alt="GREEN Certification Dossier"
            width="372"
            height="54"
          />
        )}
        <button
          type="button"
          className={styles.individualLink}
          onClick={() => setIsIndividualCertOpen(true)}
        >
          <img
            src="/images/industry-affiliations-certifications/individual.png"
            alt={
              mainPage?.cta?.[1]?.text ||
              "Individual Certificate or Verification Letter"
            }
            width="420"
            height="54"
          />
        </button>
      </div>
      <D6Chatbot
        canvasAnchored
        triggerVariant="figmaCanvas"
        figmaPlaceholder="Let’s Talk Energy"
        triggerClassName={styles.chatTrigger}
      />
    </main>
  );

  const mobile = (
    <main className={styles.mobilePage} data-node-id="7077:15958-mobile">
      <SiteHeader panel="logoOnly" />
      <div className={styles.mobileWatermark} aria-hidden="true">
        <img
          src="/images/industry-affiliations-certifications/mainImg.png"
          alt=""
          loading="lazy"
          decoding="async"
        />
      </div>
      <div className={styles.mobileContent}>
        <h1>
          <PageTitle title={title} />
        </h1>
        <h2>{subtitle}</h2>
        <p className={styles.mobileDescription}>{description}</p>
        <div className={styles.mobileCardList}>
          {cards.map((card) => (
            <article className={styles.mobileExploreCard} key={card.label}>
              <h3>{card.label}</h3>
              <button
                type="button"
                onClick={card.onClick}
                aria-label={`Explore ${card.label}`}
              >
                <span>Explore</span>
                <svg viewBox="0 0 11 18" aria-hidden="true">
                  <path d="M1.5 1.5 9 9l-7.5 7.5" />
                </svg>
              </button>
            </article>
          ))}
        </div>
        <section
          className={styles.mobileQuote}
          aria-label="GREEN compliance statement"
        >
          {quote.map((line, index) => (
            <p
              className={line.highlighted ? styles.highlighted : ""}
              key={`${line.text}-${index}`}
            >
              {line.text}
            </p>
          ))}
        </section>
        <BottomQuote quote={bottomQuote} />
        <div className={styles.mobileActions}>
          <FigmaAngledCta
            className={styles.mobileDossierCta}
            icon="download"
            href={mainPage?.cta?.[0]?.href || "/green-certification-dossier.pdf"}
            target="_blank"
            rel="noopener noreferrer"
          >
            {mainPage?.cta?.[0]?.text || "GREEN Certification Dossier (PDF)"}
          </FigmaAngledCta>
          <FigmaAngledCta
            className={styles.mobileIndividualCta}
            onClick={() => setIsIndividualCertOpen(true)}
          >
            {mainPage?.cta?.[1]?.text ||
              "Individual Certificate or Verification Letter"}
          </FigmaAngledCta>
        </div>
      </div>
      <D6Chatbot figmaPlaceholder="Let’s Talk Energy" />
    </main>
  );

  return (
    <>
      <FigmaPageCanvas desktop={desktop} mobile={mobile} nodeId="7077:15958" />
      <WhyCertificationAffiliationMatter
        isOpen={isWhyCertOpen}
        onClose={closeDialogs}
        title={data?.whyCertificationAffiliationMatter?.title || ""}
        description={data?.whyCertificationAffiliationMatter?.description || ""}
        keys={data?.whyCertificationAffiliationMatter?.keys || []}
        quoteText={data?.whyCertificationAffiliationMatter?.quote?.text || ""}
        img={
          data?.whyCertificationAffiliationMatter?.img || { alt: "", src: "" }
        }
      />
      <OurCurrentCertifications
        isOpen={isOurCurrentCertOpen}
        onClose={closeDialogs}
        title={
          data?.ourCurrentCertifications?.title || "Our Current Certifications"
        }
        items={data?.ourCurrentCertifications?.items || []}
      />
      <IndustryAffiliations
        isOpen={isIndustryAffiliationsOpen}
        onClose={closeDialogs}
        title={
          data?.industryAffiliations?.title?.trim() || "Industry Affiliations"
        }
        keys={data?.industryAffiliations?.keys || []}
      />
      <WhatThisMeansforClients
        isOpen={isWhatThisMeansForClientsOpen}
        onClose={closeDialogs}
        title={
          data?.whatThisMeansClients?.title || "What This Means for Clients"
        }
        keys={data?.whatThisMeansClients?.keys || []}
        img={data?.whatThisMeansClients?.img || { alt: "", src: "" }}
      />
      <ProductEnquiry
        isOpen={isIndividualCertOpen}
        onClose={() => setIsIndividualCertOpen(false)}
        productName="Industry Affiliations & Certifications"
        titlePrefix="INDIVIDUAL CERTIFICATION /"
        titleAccent="VERIFICATION LETTER"
        interestLabel="TYPE OF REQUEST"
        interestOptions={[
          "Individual Certification",
          "Verification Letter",
          "Certificate Copy",
          "Other",
        ]}
        subtitle="Request a certification record or verification letter from GREEN."
        submitButtonText="Submit Request"
      />
    </>
  );
}
