"use client";

import React from "react";
import GridIntelInfoModal from "./GridIntelInfoModal";
import SlantedCardImage from "./SlantedCardImage";
import styles from "./GridIntelModalContent.module.css";

interface ScenarioItem {
  icon?: string;
  text: string;
}

interface ScenariosData {
  image?: {
    alt?: string;
    src?: string;
  };
  title?: string;
  tagline?: string;
  subtitle?: string;
  scenarios?: ScenarioItem[];
  description?: string;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  data?: ScenariosData;
}

const LOCAL_SCENARIOS_IMAGE = "/images/grid-intel/scenerios.png";

const DEFAULT_SCENARIOS = [
  "Solar-diesel hybrid mini-grids for rural and island communities",
  "Off-grid telecommunications infrastructure",
  "Remote institutional microgrids (schools, health centers)",
  "Agricultural processing and storage systems",
  "Government-backed electrification pilots with uptime KPIs",
];

const SCENARIO_OFFSETS = [0, 0, 0, 0, 0];

export default function Scenerios({ isOpen, onClose, data }: Props) {
  if (!isOpen) return null;

  const scenariosList = data?.scenarios?.length
    ? data.scenarios.map((s) => s.text)
    : DEFAULT_SCENARIOS;

  const title = data?.title || "Built for These Scenarios";
  const subtitle =
    data?.subtitle || "Where GRID-INTEL™ Is Already Running";

  const footerQuote = data?.tagline ? (
    <>
      <span className={styles.greenHighlight}>GRID-INTEL™</span>{" "}
      {data.tagline.replace(/^GRID-INTEL™\s*/i, "")}
    </>
  ) : (
    <>
      <span className={styles.greenHighlight}>GRID-INTEL™</span> is deployed
      where energy failure is unacceptable — and intelligence is essential.
    </>
  );

  return (
    <GridIntelInfoModal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      subtitle={subtitle}
      footerQuote={footerQuote}
    >
      <div className={styles.scenariosLayout}>
        <div className={styles.scenariosLeft}>
          {scenariosList.map((text, idx) => (
            <div
              key={`scenario-item-${idx}-${text}`}
              className={styles.bulletItem}
              style={{
                transform: `translateX(${SCENARIO_OFFSETS[idx] ?? -idx * 20}px)`,
              }}
            >
              <img
                src="/images/grid-intel/lighting.png"
                alt=""
                className={styles.boltIcon}
                loading="lazy"
                decoding="async"
                width={36}
                height={36}
              />
              <p className={styles.scenariosBulletText}>{text}</p>
            </div>
          ))}
        </div>

        <SlantedCardImage
          src={data?.image?.src}
          fallbackSrc={LOCAL_SCENARIOS_IMAGE}
          alt={data?.image?.alt || "Built for These Scenarios"}
        />
      </div>
    </GridIntelInfoModal>
  );
}
