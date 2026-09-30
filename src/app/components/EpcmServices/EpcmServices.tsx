"use client";

import { useState } from "react";
import { useSolarEPCMServices } from "@/hooks/useSolarEPCMServices";
import FigmaPageCanvas from "../shared/FigmaPageCanvas";
import FigmaAngledCta from "../FigmaAngledCta/FigmaAngledCta";
import D6Chatbot from "../D6Chatbot";
import SiteHeader from "../SiteHeader/SiteHeader";
import DiscoveryConsultation from "./Modals/DiscoveryConsultation";
import TechnicalDebrief from "./Modals/TechnicalDebrief";
import styles from "./EpcmServices.module.css";

const features = [
  {
    name: "Engineering",
    points: [
      "Site-specific feasibility and load modeling",
      "Climate-resilient system architecture",
      "Grid, off-grid, and hybrid design specialization",
    ],
  },
  {
    name: "Procurement",
    points: [
      "Global supplier network with delivery certainty",
      "Cost-stabilized sourcing and inventory control",
      "Compliance with IEC, AS/NZS, and local utility specs",
    ],
  },
  {
    name: "Construction",
    points: [
      "In-house deployment: civil, electrical, mechanical",
      "Remote and difficult terrain execution experts",
      "Schedule-bound, safety-prioritized site delivery",
    ],
  },
  {
    name: "Management",
    points: [
      "Project lifecycle leadership: plan to performance",
      "Embedded risk tracking and response automation",
      "Stakeholder reporting, permitting, and governance",
    ],
  },
];

export default function EpcmServices() {
  const { epcmData } = useSolarEPCMServices();
  const [isTechnicalDebriefOpen, setIsTechnicalDebriefOpen] = useState(false);
  const [isDiscoveryConsultationOpen, setIsDiscoveryConsultationOpen] =
    useState(false);

  const cmsFeatures = epcmData?.services?.length
    ? epcmData.services.map((service) => ({
        name: service.heading,
        points: service.points,
      }))
    : features;
  const subtitle =
    epcmData?.header?.subtitle ??
    "Designed for Complexity. Delivered with Precision. Managed to Scale";
  const description =
    epcmData?.introduction?.text ??
    "At GREEN, EPCM is not coordination — it’s control.\nWe transform technical ambition into clean energy infrastructure through a seamless, standards-driven delivery model.\nFrom feasibility to commissioning, we manage every milestone with zero compromise.";
  const quote =
    epcmData?.quote?.text ??
    "We embed it — into every process, every panel, every kilowatt.";
  const tagline =
    epcmData?.tagline?.text ??
    "You Don’t Engage GREEN to Oversee Solar. You Engage Us to Deliver It.";
  const ctas = epcmData?.callToActions ?? [];

  const desktop = (
    <main className={styles.desktopPage} data-node-id="7077:6595">
      <SiteHeader
        layout="figmaCanvas"
        highlightActive={false}
        figmaPanelVariant="flagship"
      />
      <img
        loading="lazy"
        decoding="async"
        className={styles.collage}
        src="/images/solar-epcm/mask_composite_solar.png"
        alt=""
        width="1108"
        height="1297"
      />
      <img
        loading="lazy"
        decoding="async"
        className={styles.verticalTitle}
        src="/images/solar-epcm/title_vert.png"
        alt=""
        width="82"
        height="698"
      />
      <img
        loading="lazy"
        decoding="async"
        className={styles.pageTitle}
        src="/images/solar-epcm/title_h1.png"
        alt="Solar EPCM Services"
        width="737"
        height="68"
      />
      <p className={styles.subtitle}>{subtitle}</p>
      <p className={styles.description}>{description}</p>
      <section className={styles.cards}>
        {cmsFeatures.map((f, i) => (
          <div
            key={f.name}
            className={styles.card}
            style={
              [
                { top: 354, left: 255 },
                { top: 352, left: 773 },
                { top: 621, left: 188 },
                { top: 619, left: 706 },
              ][i]
            }
          >
            <img
              loading="lazy"
              decoding="async"
              className={styles.cardPanel}
              src="/images/solar-epcm/card_panel.png"
              alt=""
              width="537"
              height="215"
              style={{ top: -2.5, left: -4.25 }}
            />
            <h2 className={styles.cardTitle}>{f.name}</h2>
            <ul className={styles.cardPoints}>
              {f.points.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
          </div>
        ))}
      </section>
      <blockquote className={styles.embedQuote}>
        <img
          loading="lazy"
          decoding="async"
          className={styles.quotePanel}
          src="/images/solar-epcm/quote_panel.png"
          alt=""
          width="572"
          height="173"
          style={{ top: -9, left: -2.75 }}
        />
        <span>{quote}</span>
      </blockquote>
      <div className={styles.actions}>
        <FigmaAngledCta
          icon="download"
          style={{ position: "absolute", top: 681, left: 1545, width: 375 }}
        >
          {ctas[0]?.text ?? "Download EPCM Capabilities Brief"}
        </FigmaAngledCta>
        <FigmaAngledCta
          className={styles.sidebarCtaBtn}
          style={{ position: "absolute", top: 752, left: 1621, width: 299 }}
          onClick={() => setIsTechnicalDebriefOpen(true)}
        >
          {ctas[1]?.text ?? "Request a Technical Debrief"}
        </FigmaAngledCta>
        <FigmaAngledCta
          className={styles.sidebarCtaBtn}
          style={{ position: "absolute", top: 823, left: 1587, width: 329 }}
          onClick={() => setIsDiscoveryConsultationOpen(true)}
        >
          {ctas[2]?.text ?? "Book a Discovery Consultation"}
        </FigmaAngledCta>
      </div>
      <a className={styles.readMore} href="#epcm-details">
        <span>Read more</span>
      </a>
      <h2 className={styles.tagline}>{tagline}</h2>
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
    </main>
  );

  return (
    <>
      <FigmaPageCanvas
        desktop={desktop}
        nodeId="7077:6595"
        mobile={
          <main className={styles.mobilePage}>
            <SiteHeader layout="viewport" panel="logoOnly" />
            <h1>{epcmData?.header?.title ?? "Solar EPCM Services"}</h1>
            <p className={styles.mobileSubtitle}>{subtitle}</p>
            <p className={styles.mobileDescription}>{description}</p>
            {cmsFeatures.map((f) => (
              <section key={f.name}>
                <h2>{f.name}</h2>
                <ul>
                  {f.points.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
              </section>
            ))}
            <blockquote className={styles.mobileQuote}>{quote}</blockquote>
            <p className={styles.mobileTagline}>{tagline}</p>
            <div className={styles.mobileActions}>
              <a
                href="#download-epcm-brief"
                className={styles.mobileDownloadBtn}
                download
              >
                <span>
                  {ctas[0]?.text ?? "Download EPCM Capabilities Brief"}
                </span>
                <img
                  loading="lazy"
                  decoding="async"
                  src="/images/microgrid-solutions/figma-download-icon.png"
                  alt=""
                  aria-hidden="true"
                />
              </a>
              <button
                type="button"
                onClick={() => setIsTechnicalDebriefOpen(true)}
              >
                {ctas[1]?.text ?? "Request a Technical Debrief"}
              </button>
              <button
                type="button"
                onClick={() => setIsDiscoveryConsultationOpen(true)}
              >
                {ctas[2]?.text ?? "Book a Discovery Consultation"}
              </button>
            </div>
            <D6Chatbot />
          </main>
        }
      />
      <TechnicalDebrief
        isOpen={isTechnicalDebriefOpen}
        onClose={() => setIsTechnicalDebriefOpen(false)}
      />
      <DiscoveryConsultation
        isOpen={isDiscoveryConsultationOpen}
        onClose={() => setIsDiscoveryConsultationOpen(false)}
      />
    </>
  );
}
