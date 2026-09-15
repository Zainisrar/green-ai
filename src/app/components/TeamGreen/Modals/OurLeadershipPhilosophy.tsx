"use client";

import React from "react";
import TeamGreenModalShell from "./TeamGreenModalShell";
import styles from "./TeamGreenModals.module.css";

interface LeadershipData {
  icon?: unknown[];
  quote?: {
    text?: string;
    highlighted?: string;
    highlightedText?: string;
  };
  title?: string;
  keyPoints?: string[];
  qualities?: string[];
  description?: string;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  data?: LeadershipData;
}

const DEFAULT_QUALITIES = ["Accountable", "Adaptive", "Accessible"];

const DEFAULT_PRINCIPLES = [
  "Our Leadership Is PNG-Rooted And Globally Aligned",
  "We Prioritize Local Capacity And Decision-Making Autonomy",
  "Every Executive At GREEN Has Field Experience, Not Just Boardroom Time",
  "No Ivory Towers — We Build Where We Live, And We Stay Where We Work",
];

const OurLeadershipPhilosophy = ({ isOpen, onClose, data }: Props) => {
  const title = data?.title || "Our Leadership Philosophy";
  const headline =
    data?.description ||
    "- We don't just work on infrastructure. We work on impact.\"";
  const quoteText =
    data?.quote?.text ||
    "“We Don't Just Work On Infrastructure. We Work On Impact.”";
  const quoteHighlight =
    data?.quote?.highlightedText ||
    data?.quote?.highlighted ||
    "Infrastructure";

  const qualities =
    data?.qualities && data.qualities.length > 0
      ? data.qualities
      : DEFAULT_QUALITIES;

  const rawKeyPoints =
    data?.keyPoints && data.keyPoints.length > 0
      ? data.keyPoints
      : DEFAULT_PRINCIPLES;

  const keyPoints = rawKeyPoints.map((p) => p.replace(/\n/g, " ").trim());

  return (
    <TeamGreenModalShell
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      headline={headline}
      quoteText={quoteText}
      quoteHighlight={quoteHighlight}
    >
      <div className={styles.leadershipWrap}>
        {/* Qualities bar */}
        <div className={styles.qualitiesRow}>
          {qualities.map((quality, idx) => (
            <React.Fragment key={quality}>
              <span className={styles.qualityItem}>{quality}</span>
              {idx < qualities.length - 1 && (
                <span className={styles.qualityDivider}>|</span>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* 4 Leadership Principles Grid */}
        <div className={styles.principlesGrid}>
          {keyPoints.map((point) => (
            <div key={point} className={styles.principleItem}>
              <img
                src="/images/why-esg-matters-to-green/green_bolt.png"
                alt=""
                className={styles.principleIcon}
                loading="eager"
                decoding="async"
              />
              <p className={styles.principleText}>{point}</p>
            </div>
          ))}
        </div>
      </div>
    </TeamGreenModalShell>
  );
};

export default OurLeadershipPhilosophy;
