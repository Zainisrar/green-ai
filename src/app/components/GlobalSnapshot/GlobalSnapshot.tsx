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
import ProductEnquiry from "../Product/Modals/ProductEnquiry";
import SiteHeader from "../SiteHeader/SiteHeader";
import FigmaAngledCta from "../FigmaAngledCta/FigmaAngledCta";
import FigmaPageCanvas from "../shared/FigmaPageCanvas";
import styles from "./GlobalSnapshot.module.css";

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

interface LocationLine {
  primary: string;
  secondary?: string;
}

function getGroupedLocations(rawLocations?: string[]): LocationLine[] {
  if (!rawLocations || rawLocations.length === 0) {
    return [
      { primary: "Papua New Guinea" },
      { primary: "India", secondary: "Australia" },
      { primary: "Singapore", secondary: "USA" },
    ];
  }

  if (rawLocations.some((loc) => loc.includes("|"))) {
    return rawLocations.map((loc) => {
      const [p, s] = loc.split("|").map((str) => str.trim());
      return { primary: p, secondary: s };
    });
  }

  const [first, ...remaining] = rawLocations;
  const grouped: LocationLine[] = [{ primary: first }];

  for (let index = 0; index < remaining.length; index += 2) {
    grouped.push({
      primary: remaining[index],
      secondary: remaining[index + 1],
    });
  }

  return grouped;
}

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
  const groupedLocations = getGroupedLocations(locationsSection?.locations);
  const credibility = locationsSection?.description || FALLBACK_CREDIBILITY;
  const exploreHref =
    actions?.buttons[0]?.link || "/endeavors/project-portfolio";
  const portfolioHref =
    actions?.buttons[2]?.link || "/endeavors/project-portfolio";

  const frameworkTitleText =
    framework?.title?.text || "The GREEN Delivery Framework";
  const frameworkHighlight = framework?.title?.highlight || "GREEN";

  const renderFrameworkTitle = () => {
    if (frameworkTitleText.includes(frameworkHighlight)) {
      return frameworkTitleText.split(frameworkHighlight).map((part, i, arr) => (
        <span key={i}>
          {part}
          {i < arr.length - 1 && <strong>{frameworkHighlight}</strong>}
        </span>
      ));
    }
    return (
      <>
        The <strong>{frameworkHighlight}</strong> {frameworkTitleText}
      </>
    );
  };

  const renderCredibility = (text: string) => {
    const formatted = text.replace(/capacity\.\s*(It is)/i, "capacity.\n$1");
    return formatted.split("GREEN").map((part, i, arr) => (
      <span key={i}>
        {part}
        {i < arr.length - 1 && (
          <strong className={styles.greenText}>GREEN</strong>
        )}
      </span>
    ));
  };

  const desktop = (
    <main className={styles.desktopPage} data-node-id="7077:14856">
      <div className={styles.network} aria-hidden="true">
        <img
          loading="lazy"
          decoding="async"
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
        loading="lazy"
        decoding="async"
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
            <img
              loading="lazy"
              decoding="async"
              src={stat.image}
              alt={stat.alt}
            />
            <p>
              <strong>{stat.value}</strong> <span>{stat.label}</span>
            </p>
          </article>
        ))}
      </section>

      <FigmaAngledCta
        className={styles.exploreCta}
        href={exploreHref}
        size="sm"
        data-node-id="7077:14920"
      >
        {actions?.buttons[0]?.text || "Explore"}
      </FigmaAngledCta>

      <section className={styles.highlight} data-node-id="7077:14908">
        <img
          loading="lazy"
          decoding="async"
          src="/images/global-snapshot/sh1.png"
          alt=""
        />
        <div>
          {highlightLines.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>
        <img
          loading="lazy"
          decoding="async"
          src="/images/global-snapshot/sh2.png"
          alt=""
        />
      </section>

      <section className={styles.locations} data-node-id="7077:14912">
        <h2>{locationsSection?.title || "Global Delivery Sites"}</h2>
        {groupedLocations.map((loc, idx) => (
          <p key={idx}>
            {loc.primary}
            {loc.secondary && (
              <>
                {" "}
                <span className={styles.locationPipe}>|</span> {loc.secondary}
              </>
            )}
          </p>
        ))}
      </section>

      <section className={styles.framework} data-node-id="7077:14909">
        <h2>{renderFrameworkTitle()}</h2>
        <div className={styles.featureList}>
          {features.map((feature) => (
            <article key={feature}>
              <img
                loading="lazy"
                decoding="async"
                src="/images/global-snapshot/lighting.png"
                alt=""
              />
              <p>{feature}</p>
            </article>
          ))}
        </div>
      </section>

      <p className={styles.credibility} data-node-id="7077:14914">
        {renderCredibility(credibility)}
      </p>

      <div className={styles.actions}>
        <FigmaAngledCta
          className={styles.consultationCta}
          onClick={() => setIsConsultationOpen(true)}
          data-node-id="7077:14892"
        >
          {actions?.buttons[1]?.text || "Request a Consultation"}
        </FigmaAngledCta>
        <FigmaAngledCta
          className={styles.portfolioCta}
          href={portfolioHref}
          data-node-id="7077:14886"
        >
          {actions?.buttons[2]?.text ||
            "Explore Our Global Project Portfolio"}
        </FigmaAngledCta>
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
        loading="lazy"
        decoding="async"
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
              <img loading="lazy" decoding="async" src={stat.image} alt="" />
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
          {groupedLocations.map((loc, idx) => (
            <p key={idx}>
              {loc.primary}
              {loc.secondary && (
                <>
                  {" "}
                  <span className={styles.locationPipe}>|</span> {loc.secondary}
                </>
              )}
            </p>
          ))}
        </section>
        <section className={styles.mobileFramework}>
          <h2>{renderFrameworkTitle()}</h2>
          {features.map((feature) => (
            <article key={feature}>
              <img
                loading="lazy"
                decoding="async"
                src="/images/global-snapshot/lighting.png"
                alt=""
              />
              <p>{feature}</p>
            </article>
          ))}
        </section>
        <p className={styles.mobileCredibility}>
          {renderCredibility(credibility)}
        </p>
        <div className={styles.mobileActions}>
          <FigmaAngledCta
            className={styles.mobileConsultation}
            onClick={() => setIsConsultationOpen(true)}
          >
            {actions?.buttons[1]?.text || "Request a Consultation"}
          </FigmaAngledCta>
          <FigmaAngledCta
            className={styles.mobilePortfolio}
            href={portfolioHref}
          >
            {actions?.buttons[2]?.text ||
              "Explore our global project portfolio"}
          </FigmaAngledCta>
        </div>
      </div>
      <D6Chatbot />
    </main>
  );

  return (
    <>
      <FigmaPageCanvas desktop={desktop} mobile={mobile} nodeId="7077:14856" />
      <ProductEnquiry
        productName="Global Snapshot"
        isOpen={isConsultationOpen}
        onClose={() => setIsConsultationOpen(false)}
        titlePrefix="REQUEST A"
        titleAccent="CONSULTATION"
        interestLabel="WHAT DO YOU NEED HELP WITH?"
        interestOptions={[
          "Global Snapshot",
          "Project planning",
          "Solar EPCM advisory",
          "Policy and energy access",
          "Donor and development",
          "Technology vendors",
          "Other",
        ]}
        defaultInterest="Global Snapshot"
        submitButtonText="Submit Request"
      />
    </>
  );
}
