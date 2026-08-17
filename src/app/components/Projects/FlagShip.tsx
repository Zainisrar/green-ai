"use client";

import Image from "next/image";
import { useState } from "react";
import { useFlagshipProject } from "../../../hooks/useFlagshipProject";
import D6Chatbot from "../D6Chatbot";
import SiteHeader from "../SiteHeader/SiteHeader";
import styles from "./FlagShip.module.css";
import RequestConsultation from "./Modals/RequestConsultation";

const fallbackProjectData = {
  title:
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

export default function FlagShip() {
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const { data } = useFlagshipProject();
  const project = data ?? fallbackProjectData;
  const icons = project.icons.length
    ? project.icons
    : fallbackProjectData.icons;
  const keySubtitle = project.key.subtitle || fallbackProjectData.key.subtitle;
  const hasStandardKeySubtitle = isStandardKeySubtitle(keySubtitle);

  return (
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
        {renderProjectTitle(project.title)}
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
                src={fallback.src}
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
            {project.footer.subheadline ||
              fallbackProjectData.footer.subheadline}
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

      <RequestConsultation
        isOpen={isConsultationOpen}
        onClose={() => setIsConsultationOpen(false)}
      />
    </main>
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
