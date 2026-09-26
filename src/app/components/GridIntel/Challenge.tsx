"use client";

import React from "react";
import GridIntelInfoModal from "./GridIntelInfoModal";
import SlantedCardImage from "./SlantedCardImage";
import styles from "./GridIntelModalContent.module.css";

interface ChallengeItem {
  icon?: string;
  text: string;
}

interface ChallengeData {
  image?: {
    alt?: string;
    src?: string;
  };
  title?: string;
  subtitle?: string;
  challenges?: ChallengeItem[];
  resultText?: string;
  description?: string;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  data?: ChallengeData;
}

const LOCAL_CHALLENGE_IMAGE = "/images/grid-intel/challenge.png";

const DEFAULT_CHALLENGES = [
  "Uncoordinated power sources",
  "High reliance on diesel during solar drop-offs",
  "Manual switching and reactive maintenance",
  "Zero visibility into system health and efficiency",
];

const OFFSETS = [0, 0, 0, 0];

export default function Challenge({ isOpen, onClose, data }: Props) {
  if (!isOpen) return null;

  const challengesList = data?.challenges?.length
    ? data.challenges.map((c) => c.text)
    : DEFAULT_CHALLENGES;

  const title = data?.title || "The Challenge";
  const subtitle =
    data?.subtitle || "Energy Systems Are Being Installed Without Intelligence";
  const description =
    data?.description ||
    "Across emerging markets and decentralized energy deployments, key problems persist:";
  const resultText =
    data?.resultText ||
    "The result: energy loss, operational downtime, and high cost of ownership.";

  return (
    <GridIntelInfoModal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      subtitle={subtitle}
      footerQuote={resultText}
    >
      <div className={styles.challengeLayout}>
        <SlantedCardImage
          src={data?.image?.src}
          fallbackSrc={LOCAL_CHALLENGE_IMAGE}
          alt={data?.image?.alt || "The Challenge"}
        />

        <div className={styles.challengeRight}>
          <h3 className={styles.challengeHeading}>{description}</h3>

          <div className={styles.challengeList}>
            {challengesList.map((text, idx) => (
              <div
                key={`challenge-item-${idx}-${text}`}
                className={styles.bulletItem}
                style={{
                  transform: `translateX(${OFFSETS[idx] ?? -idx * 25}px)`,
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
                <p className={styles.challengeBulletText}>{text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </GridIntelInfoModal>
  );
}
