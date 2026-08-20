"use client";

import Link from "next/link";
import { useState } from "react";
import { useGlobalSnapshot } from "../../../hooks/useGlobalSnapshot";
import type {
  GlobalSnapshotActionButtons,
  GlobalSnapshotContentBlock,
  GlobalSnapshotHeroSection,
  GlobalSnapshotHighlightSection,
  GlobalSnapshotLocationsSection,
  GlobalSnapshotStatsSection,
} from "../../lib/api";
import D6Chatbot from "../D6Chatbot";
import SiteHeader from "../SiteHeader/SiteHeader";
import FigmaPageCanvas from "../shared/FigmaPageCanvas";
import styles from "./GlobalSnapshot.module.css";
import RequestConsultation from "./Modals/RequestConsultation";

const FALLBACK_STATS = [
  {
    value: "3.913 MW+",
    label: "Installed",
    image: "/images/global-snapshot/mw.png",
    alt: "Solar capacity",
  },
  {
    value: "200,014",
    label: "homes energized",
    image: "/images/global-snapshot/home.png",
    alt: "Homes energized",
  },
  {
    value: "796,270",
    label: "lives transformed",
    image: "/images/global-snapshot/people.png",
    alt: "People reached",
  },
  {
    value: "6,126",
    label: "tonnes CO₂ avoided annually",
    image: "/images/global-snapshot/co2.png",
    alt: "Carbon emissions avoided",
  },
] as const;

const FALLBACK_FEATURES = [
  "End-to-end EPC execution—from feasibility to commissioning.",
  "Adaptive product platforms (SunShine, Em’Pawa) engineered for deployment in weeks.",
  "Global procurement integrated with local deployment networks.",
  "Project design rooted in data, geography, and long-term asset performance.",
  "Cultural and social engagement integrated into technical delivery.",
] as const;

const FALLBACK_DESCRIPTION = [
  "Global energy demand is rising. Fossil reliance persists. Climate pressure intensifies.",
  "And over 700 million people remain without access to reliable power.",
] as const;

const FALLBACK_CREDIBILITY =
  "The future of energy is not only about capacity. It is about capability. GREEN Limited brings the credibility of experience, the rigor of engineering, and the discipline of execution to the global energy table. Our teams, systems, and strategies are ready to support governments, industries, and developers facing the energy transition.";

export default function GlobalSnapshot() {
  const { globalSnapshotData, error } = useGlobalSnapshot();
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const sections = globalSnapshotData?.sections ?? [];
  const hero = sections.find((section) => section.type === "hero-section") as
    | GlobalSnapshotHeroSection
    | undefined;
  const statsSection = sections.find(
    (section) => section.type === "statistics-grid",
  ) as GlobalSnapshotStatsSection | undefined;
  const highlightSection = sections.find(
    (section) => section.type === "highlight-box",
  ) as GlobalSnapshotHighlightSection | undefined;
  const framework = sections.find(
    (section) => section.type === "content-block",
  ) as GlobalSnapshotContentBlock | undefined;
  const locationsSection = sections.find(
    (section) => section.type === "locations-section",
  ) as GlobalSnapshotLocationsSection | undefined;
  const actions = sections.find(
    (section) => section.type === "action-buttons",
  ) as GlobalSnapshotActionButtons | undefined;

  if (error) console.error("GlobalSnapshot API Error:", error);

  const title = hero?.title ?? { main: "GLOBAL SNAPSHOT", highlight: "GLOBAL" };
  const titleRemainder = title.main.replace(title.highlight, "").trim();
  const subtitle =
    hero?.subtitle ??
    "From the Highlands to the Horizon – Energy Built to Perform";
  const headline =
    hero?.headline ??
    "The Global Energy Shift Is Inevitable. The Execution Is Not.";
  const description = hero?.description?.length
    ? hero.description.slice(0, 2)
    : FALLBACK_DESCRIPTION;
  const stats = FALLBACK_STATS.map((fallback, index) => ({
    ...fallback,
    value: statsSection?.items[index]?.value || fallback.value,
    label: statsSection?.items[index]?.label || fallback.label,
  }));
  const highlightLines = highlightSection?.content.lines?.length
    ? highlightSection.content.lines.slice(0, 4)
    : [
        "Where Roads End, We Delivered.",
        "Where Diesel Failed, We Deployed Solar.",
        "Where Governments Stalled,",
        "We Executed.",
      ];
  const features = FALLBACK_FEATURES.map(
    (fallback, index) => framework?.features[index]?.text || fallback,
  );
  const locations = locationsSection?.locations?.length
    ? locationsSection.locations.slice(0, 4)
    : ["Papua New Guinea", "India  |  Australia", "Singapore  |  USA"];
  const credibility = locationsSection?.description || FALLBACK_CREDIBILITY;
  const exploreHref =
    actions?.buttons[0]?.link || "/endeavors/project-portfolio";
  const portfolioHref =
    actions?.buttons[2]?.link || "/endeavors/project-portfolio";

  const desktop = (
    <main className={styles.desktopPage} data-node-id="7077:14856">
      <div className={styles.network} aria-hidden="true">
        <img
          src="/images/global-snapshot/figma-network.jpg"
          alt=""
          width="4096"
          height="2383"
        />
      </div>
      <SiteHeader layout="figmaCanvas" highlightActive={false} />

      <h1 className={styles.pageTitle} data-node-id="7077:14861">
        <strong>{title.highlight}</strong> {titleRemainder}
      </h1>
      <img
        className={styles.watermark}
        src="/images/global-snapshot/globalsnapshot.png"
        alt=""
        width="59"
        height="723"
        data-node-id="7077:14872"
      />

      <p className={styles.subtitle} data-node-id="7077:14926">
        {subtitle}
      </p>
      <h2 className={styles.headline} data-node-id="7077:14900">
        {headline}
      </h2>
      <div className={styles.description} data-node-id="7077:14913">
        {description.map((line) => (
          <p key={line}>{line}</p>
        ))}
      </div>

      <section className={styles.stats} aria-label="GREEN global impact">
        {stats.map((stat, index) => (
          <article
            className={styles.stat}
            key={stat.label}
            data-node-id={`7077:${14901 + index}`}
          >
            <img src={stat.image} alt={stat.alt} />
            <p>
              <strong>{stat.value}</strong> <span>{stat.label}</span>
            </p>
          </article>
        ))}
      </section>

      <Link
        className={styles.exploreButton}
        href={exploreHref}
        data-node-id="7077:14920"
      >
        <img src="/images/global-snapshot/exploreBtn.png" alt="" />
        <span>{actions?.buttons[0]?.text || "Explore"}</span>
        <b aria-hidden="true">›</b>
      </Link>

      <section className={styles.highlight} data-node-id="7077:14908">
        <img src="/images/global-snapshot/sh1.png" alt="" />
        <div>
          {highlightLines.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>
        <img src="/images/global-snapshot/sh2.png" alt="" />
      </section>

      <section className={styles.locations} data-node-id="7077:14912">
        <h2>{locationsSection?.title || "Global Delivery Sites"}</h2>
        {locations.map((location) => (
          <p key={location}>{location}</p>
        ))}
      </section>

      <section className={styles.framework} data-node-id="7077:14909">
        <h2>
          The <strong>{framework?.title.highlight || "GREEN"}</strong>{" "}
          {framework?.title.text || "Delivery Framework"}
        </h2>
        <div className={styles.featureList}>
          {features.map((feature) => (
            <article key={feature}>
              <img src="/images/global-snapshot/lighting.png" alt="" />
              <p>{feature}</p>
            </article>
          ))}
        </div>
      </section>

      <p className={styles.credibility} data-node-id="7077:14914">
        {credibility}
      </p>

      <div className={styles.actions}>
        <button
          type="button"
          onClick={() => setIsConsultationOpen(true)}
          data-node-id="7077:14892"
        >
          <img src="/images/global-snapshot/consulation.png" alt="" />
          <span>{actions?.buttons[1]?.text || "Request a Consultation"}</span>
          <b aria-hidden="true">›</b>
        </button>
        <Link href={portfolioHref} data-node-id="7077:14886">
          <img
            src="/images/global-snapshot/globalprojectportfolioBtn.png"
            alt=""
          />
          <span>
            {actions?.buttons[2]?.text ||
              "Explore our global project portfolio"}
          </span>
          <b aria-hidden="true">›</b>
        </Link>
      </div>

      <D6Chatbot
        canvasAnchored
        triggerVariant="figmaCanvas"
        figmaPlaceholder="Let's Talk Energy"
        triggerClassName={styles.chatTrigger}
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

  const mobile = (
    <main className={styles.mobilePage} data-node-id="7077:14856-mobile">
      <SiteHeader panel="logoOnly" />
      <img
        className={styles.mobileNetwork}
        src="/images/global-snapshot/mainImg.png"
        alt=""
      />
      <div className={styles.mobileContent}>
        <h1>
          <strong>{title.highlight}</strong> {titleRemainder}
        </h1>
        <p className={styles.mobileSubtitle}>{subtitle}</p>
        <h2>{headline}</h2>
        <div className={styles.mobileDescription}>
          {description.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>
        <div className={styles.mobileStats}>
          {stats.map((stat) => (
            <article key={stat.label}>
              <img src={stat.image} alt="" />
              <p>
                <strong>{stat.value}</strong> <span>{stat.label}</span>
              </p>
            </article>
          ))}
        </div>
        <div className={styles.mobileHighlight}>
          {highlightLines.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>
        <section className={styles.mobileLocations}>
          <h2>{locationsSection?.title || "Global Delivery Sites"}</h2>
          {locations.map((location) => (
            <p key={location}>{location}</p>
          ))}
        </section>
        <section className={styles.mobileFramework}>
          <h2>
            The <strong>{framework?.title.highlight || "GREEN"}</strong>{" "}
            {framework?.title.text || "Delivery Framework"}
          </h2>
          {features.map((feature) => (
            <article key={feature}>
              <img src="/images/global-snapshot/lighting.png" alt="" />
              <p>{feature}</p>
            </article>
          ))}
        </section>
        <p className={styles.mobileCredibility}>{credibility}</p>
        <button
          type="button"
          className={styles.mobileConsultation}
          onClick={() => setIsConsultationOpen(true)}
        >
          Request a Consultation
        </button>
      </div>
      <D6Chatbot />
    </main>
  );

  return (
    <>
      <FigmaPageCanvas desktop={desktop} mobile={mobile} nodeId="7077:14856" />
      <RequestConsultation
        isOpen={isConsultationOpen}
        onClose={() => setIsConsultationOpen(false)}
      />
    </>
  );
}
