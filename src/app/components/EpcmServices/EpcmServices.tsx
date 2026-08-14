"use client";

import Link from "next/link";
import { useState } from "react";
import { useSolarEPCMServices } from "../../../hooks/useSolarEPCMServices";
import D6Chatbot from "../D6Chatbot";
import SiteHeader from "../SiteHeader/SiteHeader";
import FigmaPageCanvas from "../shared/FigmaPageCanvas";
import styles from "./EpcmServices.module.css";
import DiscoveryConsultation from "./Modals/DiscoveryConsultation";
import TechnicalDebrief from "./Modals/TechnicalDebrief";

const FALLBACK_SERVICES = [
  {
    heading: "Engineering",
    points: [
      "Site-specific feasibility and load modeling",
      "Climate-resilient system architecture",
      "Grid, off-grid, and hybrid design specialization",
    ],
    nodeId: "7077:6639",
  },
  {
    heading: "Procurement",
    points: [
      "Global supplier network with delivery certainty",
      "Cost-stabilized sourcing and inventory control",
      "Compliance with IEC, AS/NZS, and local utility specs",
    ],
    nodeId: "7077:6648",
  },
  {
    heading: "Construction",
    points: [
      "In-house deployment: civil, electrical, mechanical",
      "Remote and difficult terrain execution experts",
      "Schedule-bound, safety-prioritized site delivery",
    ],
    nodeId: "7077:6643",
  },
  {
    heading: "Management",
    points: [
      "Project lifecycle leadership: plan to performance",
      "Embedded risk tracking and response automation",
      "Stakeholder reporting, permitting, and governance",
    ],
    nodeId: "7077:6652",
  },
] as const;

interface ServiceCardProps {
  heading: string;
  points: readonly string[];
  nodeId: string;
  mobile?: boolean;
}

function ServiceCard({
  heading,
  points,
  nodeId,
  mobile = false,
}: ServiceCardProps) {
  return (
    <article
      className={`${styles.serviceCard} ${mobile ? styles.mobileCard : ""}`}
      data-node-id={nodeId}
    >
      <img
        className={styles.cardShape}
        src="/images/epcm-services/figma-service-card.svg"
        alt=""
        width="536.496"
        height="215"
      />
      <div className={styles.cardContent}>
        <h2>{heading}</h2>
        <ul>
          {points.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
      </div>
    </article>
  );
}

export default function EpcmServices() {
  const { epcmData } = useSolarEPCMServices();
  const [isDebriefOpen, setIsDebriefOpen] = useState(false);
  const [isDiscoveryOpen, setIsDiscoveryOpen] = useState(false);
  const services = FALLBACK_SERVICES.map((fallback, index) => ({
    ...fallback,
    heading: epcmData?.services?.[index]?.heading || fallback.heading,
    points: epcmData?.services?.[index]?.points?.length
      ? epcmData.services[index].points
      : fallback.points,
  }));
  const title = epcmData?.header?.title || "Solar EPCM Services";
  const subtitle =
    epcmData?.header?.subtitle ||
    "Designed for Complexity. Delivered with Precision. Managed to Scale";
  const introduction =
    epcmData?.introduction?.text ||
    "At GREEN, EPCM is not coordination — it’s control. We transform technical ambition into clean energy infrastructure through a seamless, standards-driven delivery model. From feasibility to commissioning, we manage every milestone with zero compromise.";
  const quote =
    epcmData?.quote?.text ||
    "We embed it — into every process, every panel, every kilowatt.";

  const desktop = (
    <main className={styles.desktopPage} data-node-id="7077:6595">
      <div className={styles.backgroundVisual} aria-hidden="true">
        <div className={styles.solarLayer}>
          <img
            src="/images/epcm-services/figma-solar-background.png"
            alt=""
            width="967"
            height="1326"
          />
        </div>
        <div className={styles.engineeringLayer}>
          <img
            src="/images/epcm-services/figma-engineering-overlay.png"
            alt=""
            width="1024"
            height="1024"
          />
        </div>
      </div>
      <SiteHeader layout="figmaCanvas" highlightActive={false} />
      <img
        className={styles.verticalTitle}
        src="/images/epcm-services/solarEpcmServices.png"
        alt=""
        width="57"
        height="701"
      />
      <h1 className={styles.pageTitle} data-node-id="7077:6602">
        {title.includes("EPCM") ? (
          <>
            {title.split("EPCM")[0]}
            <span>EPCM</span>
            {title.split("EPCM")[1]}
          </>
        ) : (
          title
        )}
      </h1>
      <p className={styles.subtitle} data-node-id="7077:6596">
        {subtitle}
      </p>
      <p className={styles.introduction} data-node-id="7077:6656">
        {introduction}
      </p>
      <section className={styles.serviceGrid} aria-label="EPCM capabilities">
        {services.map((service) => (
          <ServiceCard key={service.heading} {...service} />
        ))}
      </section>
      <section className={styles.quotePanel} data-node-id="7077:6621">
        <img
          src="/images/epcm-services/figma-quote-panel.svg"
          alt=""
          width="607.597"
          height="196"
        />
        <p>{quote}</p>
      </section>
      <p className={styles.delivery} data-node-id="7077:6597">
        You Don’t Engage <strong>GREEN to Oversee Solar.</strong>
        <br />
        You Engage Us to Deliver It.
      </p>
      <div className={styles.actions}>
        <Link
          href={epcmData?.callToActions?.[0]?.href || "#"}
          className={styles.briefButton}
        >
          <img
            src="/images/epcm-services/epcmBtn.png"
            alt=""
            width="341"
            height="53"
          />
          <span>
            {epcmData?.callToActions?.[0]?.text ||
              "Download EPCM Capabilities Brief"}
          </span>
        </Link>
        <button type="button" onClick={() => setIsDebriefOpen(true)}>
          <img
            src="/images/epcm-services/technicalBtn.png"
            alt=""
            width="301"
            height="53"
          />
          <span>Request a Technical Debrief</span>
        </button>
        <button type="button" onClick={() => setIsDiscoveryOpen(true)}>
          <img
            src="/images/epcm-services/bookingBtn.png"
            alt=""
            width="331"
            height="53"
          />
          <span>Book a Discovery Consultation</span>
        </button>
      </div>
      <D6Chatbot
        canvasAnchored
        triggerVariant="figmaCanvas"
        triggerClassName={styles.chatTrigger}
        triggerStyle={{
          top: 885,
          right: "auto",
          bottom: "auto",
          left: 1498,
          width: 418,
        }}
      />
    </main>
  );

  const mobile = (
    <main className={styles.mobilePage} data-node-id="7077:6595-mobile">
      <SiteHeader panel="logoOnly" />
      <div className={styles.mobileContent}>
        <h1>
          Solar <span>EPCM</span> Services
        </h1>
        <h2>{subtitle}</h2>
        <p>{introduction}</p>
        <div className={styles.mobileGrid}>
          {services.map((service) => (
            <ServiceCard key={service.heading} {...service} mobile />
          ))}
        </div>
        <blockquote>{quote}</blockquote>
        <p className={styles.mobileDelivery}>
          You Don’t Engage <strong>GREEN to Oversee Solar.</strong>
          <br />
          You Engage Us to Deliver It.
        </p>
        <div className={styles.mobileActions}>
          <button type="button" onClick={() => setIsDebriefOpen(true)}>
            Request a Technical Debrief
          </button>
          <button type="button" onClick={() => setIsDiscoveryOpen(true)}>
            Book a Discovery Consultation
          </button>
        </div>
      </div>
      <D6Chatbot />
    </main>
  );

  return (
    <>
      <FigmaPageCanvas desktop={desktop} mobile={mobile} nodeId="7077:6595" />
      <TechnicalDebrief
        isOpen={isDebriefOpen}
        onClose={() => setIsDebriefOpen(false)}
      />
      <DiscoveryConsultation
        isOpen={isDiscoveryOpen}
        onClose={() => setIsDiscoveryOpen(false)}
      />
    </>
  );
}
