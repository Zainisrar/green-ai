"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useState } from "react";
import { useFlagshipProject } from "../../../hooks/useFlagshipProject";
import D6Chatbot from "../D6Chatbot";
import FigmaAngledCta from "../FigmaAngledCta/FigmaAngledCta";
import SiteHeader from "../SiteHeader/SiteHeader";
import FigmaPageCanvas from "../shared/FigmaPageCanvas";
import styles from "./FlagShip.module.css";

const ProductEnquiry = dynamic(
  () => import("../Product/Modals/ProductEnquiry"),
  { ssr: false },
);

const fallbackProjectData = {
  title:
    "PNG’s First Utility-Scale Grid-Connected Solar Power Plant, 3MW, Baiyer (2025)",
  subheadline:
    "PNG’s First Utility-Scale Grid-Connected Solar Power Plant, 3MW, Baiyer (2025)",
  key: {
    title: "This isn't a vision. This is delivery",
    subtitle: "structured, scalable, and underway",
  },
  icons: [
    {
      title: "Total Population",
      description: "500000",
      src: "/images/flagship-projects/population.png",
    },
    {
      title: "Total Power Generation",
      description: "3000 kWh",
      src: "/images/flagship-projects/generation.png",
    },
    {
      title: "Total Storage Battery Capacity",
      description: "2500 kWh",
      src: "/images/flagship-projects/storage.png",
    },
  ],
  description:
    "The future of energy is not only about capacity. It is about capability. GREEN Limited brings the credibility of experience, the rigor of engineering, and the discipline of execution to the global energy table. Our teams, systems, and strategies are ready to support governments, industries, and developers facing the energy transition.",
  footer: {
    title:
      "Step into the minds of GREEN’s engineers, innovators, and on-ground teams. This is where ideas are not just imagined",
    subheadline:
      "they’re shaped by experience, tested in PNG terrain, and shared to push the industry forward.",
  },
} as const;

interface FlagShipProps {
  mode?: "desktop" | "mobile";
}

export default function FlagShip({ mode }: FlagShipProps = {}) {
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const { data } = useFlagshipProject();
  const project = data ?? fallbackProjectData;
  const icons = project.icons.length
    ? project.icons
    : fallbackProjectData.icons;
  const keySubtitle = project.key.subtitle || fallbackProjectData.key.subtitle;
  const hasStandardKeySubtitle = isStandardKeySubtitle(keySubtitle);

  const displayProjectTitle =
    (project.subheadline && project.title?.toLowerCase() === "flagship projects"
      ? project.subheadline
      : project.title) || fallbackProjectData.title;

  const desktop = (
    <main className={styles.page} data-node-id="7077:14937">
      <SiteHeader layout="figmaCanvas" figmaPanelVariant="flagship" />

      <Image
        className={styles.verticalTitle}
        src="/images/flagship-projects/global.png"
        alt="Global Snapshot"
        width={59}
        height={723}
        priority
      />

      <h1 className={styles.pageTitle}>
        <span>Flagship</span> Projects
      </h1>

      <h2 className={styles.projectTitle}>
        {renderProjectTitle(displayProjectTitle)}
      </h2>

      <section className={styles.metrics} aria-label="Flagship project metrics">
        {icons.slice(0, 3).map((icon, index) => {
          const fallback = fallbackProjectData.icons[index];
          const label = icon.title || fallback.title;
          const description = icon.description || fallback.description;
          return (
            <article
              className={`${styles.metric} ${styles[`metric${index}`]}`}
              key={label}
            >
              <Image
                src={
                  "img" in icon && icon.img?.src
                    ? icon.img.src
                    : fallback.src
                }
                alt={"img" in icon ? icon.img.alt || label : label}
                width={index === 1 ? 101 : index === 2 ? 105 : 98}
                height={index === 1 ? 110 : index === 2 ? 80 : 98}
              />
              <h3>{label}</h3>
              <p>{formatMetric(description)}</p>
            </article>
          );
        })}
      </section>

      <section
        className={styles.keyMessage}
        aria-label="GREEN delivery message"
      >
        <Image
          className={styles.keyShapeLeft}
          src="/images/flagship-projects/shape1.png"
          alt=""
          width={93}
          height={134}
        />
        <div className={styles.keyCopy}>
          <p>
            {renderKeyTitle(project.key.title || fallbackProjectData.key.title)}
          </p>
          <p>
            —{" "}
            <span>
              {hasStandardKeySubtitle ? "structured, scalable," : keySubtitle}
            </span>
          </p>
          {hasStandardKeySubtitle ? (
            <p className={styles.keyContinuation}>
              <span>and underway</span>.
            </p>
          ) : null}
        </div>
        <Image
          className={styles.keyShapeRight}
          src="/images/flagship-projects/shape2.png"
          alt=""
          width={94}
          height={136}
        />
      </section>

      <p className={styles.description}>
        {renderGreenText(
          project.description || fallbackProjectData.description,
        )}
      </p>

      <section className={styles.footerMessage}>
        <p>{project.footer.title || fallbackProjectData.footer.title}</p>
        <p>
          —{" "}
          <span>
            {cleanFooterSubheadline(
              project.footer.subheadline ||
                fallbackProjectData.footer.subheadline,
            )}
          </span>
        </p>
      </section>

      <button
        type="button"
        className={styles.consultationButton}
        onClick={() => setIsConsultationOpen(true)}
      >
        <Image
          src="/images/flagship-projects/report.png"
          alt="Request a Consultation"
          width={301}
          height={54}
        />
        <span className={styles.srOnly}>Request a Consultation</span>
      </button>

      <a className={styles.portfolioButton} href="/endeavors/project-portfolio">
        <Image
          src="/images/flagship-projects/explore.png"
          alt="Explore our global project portfolio"
          width={350}
          height={54}
        />
      </a>

      <D6Chatbot
        canvasAnchored
        triggerVariant="figmaCanvas"
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
    <main className={styles.mobilePage} data-node-id="7077:14937-mobile">
      <Image
        className={styles.mobileBackgroundArt}
        src="/images/flagship-projects/mainImg.png"
        alt=""
        width={1045}
        height={970}
        priority
      />

      <SiteHeader panel="logoOnly" />

      <Image
        className={styles.mobileVerticalTitle}
        src="/images/flagship-projects/global.png"
        alt="Global Snapshot"
        width={34}
        height={420}
      />

      <div className={styles.mobileContent}>
        <h1 className={styles.mobilePageTitle}>
          <span>Flagship</span> Projects
        </h1>

        <h2 className={styles.mobileProjectTitle}>
          {renderProjectTitle(displayProjectTitle)}
        </h2>

        <section
          className={styles.mobileMetrics}
          aria-label="Flagship project metrics"
        >
          {icons.slice(0, 3).map((icon, index) => {
            const fallback = fallbackProjectData.icons[index];
            const label = icon.title || fallback.title;
            const description = icon.description || fallback.description;
            return (
              <article className={styles.mobileMetric} key={label}>
                <Image
                  src={
                    "img" in icon && icon.img?.src
                      ? icon.img.src
                      : fallback.src
                  }
                  alt={"img" in icon ? icon.img.alt || label : label}
                  width={index === 1 ? 64 : index === 2 ? 68 : 62}
                  height={index === 1 ? 70 : index === 2 ? 52 : 62}
                  className={styles.mobileMetricIcon}
                />
                <h3>{label}</h3>
                <p>{formatMetric(description)}</p>
              </article>
            );
          })}
        </section>

        <section
          className={styles.mobileKeySection}
          aria-label="GREEN delivery message"
        >
          <Image
            className={styles.mobileKeyShapeLeft}
            src="/images/flagship-projects/shape1.png"
            alt=""
            width={48}
            height={69}
          />
          <div className={styles.mobileKeyCopy}>
            <p>
              {renderKeyTitle(
                project.key.title || fallbackProjectData.key.title,
              )}
            </p>
            <p>
              —{" "}
              <span>
                {hasStandardKeySubtitle ? "structured, scalable," : keySubtitle}
              </span>
            </p>
            {hasStandardKeySubtitle ? (
              <p className={styles.mobileKeyContinuation}>
                <span>and underway</span>.
              </p>
            ) : null}
          </div>
          <Image
            className={styles.mobileKeyShapeRight}
            src="/images/flagship-projects/shape2.png"
            alt=""
            width={48}
            height={70}
          />
        </section>

        <p className={styles.mobileDescription}>
          {renderGreenText(
            project.description || fallbackProjectData.description,
          )}
        </p>

        <section className={styles.mobileFooterMessage}>
          <p>{project.footer.title || fallbackProjectData.footer.title}</p>
          <p>
            —{" "}
            <span>
              {cleanFooterSubheadline(
                project.footer.subheadline ||
                  fallbackProjectData.footer.subheadline,
              )}
            </span>
          </p>
        </section>

        <div className={styles.mobileActions}>
          <FigmaAngledCta
            className={styles.mobileCtaBtn}
            onClick={() => setIsConsultationOpen(true)}
          >
            Request a Consultation
          </FigmaAngledCta>
          <FigmaAngledCta
            className={styles.mobileCtaBtn}
            href="/endeavors/project-portfolio"
          >
            Explore our global project portfolio
          </FigmaAngledCta>
        </div>
      </div>

      <D6Chatbot />
    </main>
  );

  const enquiryModal = (
    <ProductEnquiry
      productName="Flagship Projects"
      isOpen={isConsultationOpen}
      onClose={() => setIsConsultationOpen(false)}
      titlePrefix="REQUEST A"
      titleAccent="CONSULTATION"
      interestLabel="SERVICE NEEDED"
      interestOptions={[
        "Flagship Projects",
        "Solar EPCM",
        "Hybrid microgrid",
        "Energy storage",
        "Grid integration",
        "O&M and monitoring",
        "Other",
      ]}
      defaultInterest="Flagship Projects"
      submitButtonText="Submit Request"
    />
  );

  if (mode === "desktop") {
    return (
      <>
        {desktop}
        {enquiryModal}
      </>
    );
  }

  if (mode === "mobile") {
    return (
      <>
        {mobile}
        {enquiryModal}
      </>
    );
  }

  return (
    <>
      <FigmaPageCanvas
        desktop={desktop}
        mobile={mobile}
        nodeId="7077:14937"
        fitCanvasHeight
      />
      {enquiryModal}
    </>
  );
}

function formatMetric(value: string) {
  const match = value.match(/^(.*?)(?:\s+(kWh))?$/i);
  if (!match) return value;
  return (
    <>
      {match[1]} {match[2] && <small>{match[2]}</small>}
    </>
  );
}

function renderProjectTitle(value: string) {
  const marker = ", 3MW";
  const markerIndex = value.indexOf(marker);
  if (markerIndex < 0) return value;

  return (
    <>
      {value.slice(0, markerIndex)},
      <br />
      {value.slice(markerIndex + 2)}
    </>
  );
}

function renderKeyTitle(value: string) {
  const normalized = value.replace(/\s+/g, " ").trim();
  if (
    normalized.includes("This isn't a vision") &&
    normalized.includes("This is delivery")
  ) {
    return (
      <>
        This isn&apos;t a vision.
        <br />
        This is delivery
      </>
    );
  }
  return value;
}

function isStandardKeySubtitle(value: string) {
  const normalized = value.replace(/\s+/g, " ").trim().toLowerCase();
  return normalized.includes("structured, scalable");
}

function renderGreenText(value: string) {
  const parts = value.split(/(GREEN)/g);
  return parts.map((part) =>
    part === "GREEN" ? <strong key={part}>{part}</strong> : part,
  );
}

function cleanFooterSubheadline(value: string) {
  return value.replace(/^[—–-]\s*/, "");
}

