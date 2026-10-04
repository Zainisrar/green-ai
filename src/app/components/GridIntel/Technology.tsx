"use client";

import React from "react";
import GridIntelInfoModal from "./GridIntelInfoModal";
import SlantedCardImage from "./SlantedCardImage";
import styles from "./GridIntelModalContent.module.css";

interface TechnologyFeature {
  icon?: string;
  text: string;
}

interface TechnologyData {
  image?: {
    alt?: string;
    src?: string;
  };
  title?: string;
  description?: string;
  features?: TechnologyFeature[];
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  data?: TechnologyData;
}

const LOCAL_TECHNOLOGY_IMAGE = "/images/grid-intel/technology.png";

const DEFAULT_FEATURES = [
  "Embedded IoT controller with field-grade resilience",
  "Solar, battery, diesel, and grid synchronization logic",
  "Remote-access dashboard with real-time insights",
  "Predictive fault detection and alerts",
  "Offline-operable with local override",
  "Optional satellite uplink for disconnected zones",
];

const TECH_OFFSETS = [0, 0, 0, 0, 0, 0];

export default function Technology({ isOpen, onClose, data }: Props) {
  if (!isOpen) return null;

  const featuresList = data?.features?.length
    ? data.features.map((f) => f.text)
    : DEFAULT_FEATURES;

  const title = data?.title || "Technology Stack Overview";

  return (
    <GridIntelInfoModal isOpen={isOpen} onClose={onClose} title={title}>
      <div className={styles.techLayout}>
        <SlantedCardImage
          src={data?.image?.src}
          fallbackSrc={LOCAL_TECHNOLOGY_IMAGE}
          alt={data?.image?.alt || "Technology Stack Overview"}
        />

        <div className={styles.techRight}>
          <h3 className={styles.techSubheading}>
            <span className={styles.techSubheadingGreen}>GRID-INTEL™</span>{" "}
            Includes:
          </h3>

          <div className={styles.techList}>
            {featuresList.map((text, idx) => (
              <div
                key={`tech-feature-${idx}-${text}`}
                className={styles.bulletItem}
                style={{
                  transform: `translateX(${TECH_OFFSETS[idx] ?? -idx * 18}px)`,
                }}
              >
                <img
                  src="/images/grid-intel/lighting.png"
                  alt=""
                  className={styles.boltIcon}
                  loading="lazy"
                  decoding="async"
                  width={57}
                  height={57}
                />

                <p className={styles.techBulletText}>{text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </GridIntelInfoModal>
  );
}
