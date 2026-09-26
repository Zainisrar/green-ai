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

const FIGMA_PRINCIPLES_MAP: Record<string, string> = {
  "our leadership is png-rooted and globally aligned":
    "Our Leadership Is PNG-Rooted And Globally Aligned",
  "we prioritize local capacity and decision-making autonomy":
    "We Prioritize Local Capacity And Decision-Making Autonomy",
  "every executive at green has field experience, not just boardroom time":
    "Every Executive At GREEN Has Field Experience, Not Just Boardroom Time",
  "no ivory towers — we build where we live, and we stay where we work":
    "No Ivory Towers — We Build Where We Live, And We Stay Where We Work",
};

const formatPrinciple = (text: string): string => {
  const normalized = text.toLowerCase().replace(/\s+/g, " ").trim();
  if (FIGMA_PRINCIPLES_MAP[normalized]) {
    return FIGMA_PRINCIPLES_MAP[normalized];
  }
  return text
    .split(" ")
    .map((word) => {
      if (word.toUpperCase() === "GREEN") return "GREEN";
      if (
        word.toUpperCase() === "PNG-ROOTED" ||
        word.toLowerCase() === "png-rooted"
      )
        return "PNG-Rooted";
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ");
};

const DEFAULT_PRINCIPLES = [
  "Our Leadership Is PNG-Rooted And Globally Aligned",
  "We Prioritize Local Capacity And Decision-Making Autonomy",
  "Every Executive At GREEN Has Field Experience, Not Just Boardroom Time",
  "No Ivory Towers — We Build Where We Live, And We Stay Where We Work",
];

const OurLeadershipPhilosophy = ({ isOpen, onClose, data }: Props) => {
  const title = data?.title || "Our Leadership Philosophy";
  const rawHeadline =
    data?.description ||
    "- We don't just work on infrastructure. We work on impact.";
  const cleanHeadline = rawHeadline
    .replace(/[”"“]/g, "")
    .replace(/^-\s*/, "")
    .trim();
  const headline = `- ${cleanHeadline}”`;

  const quoteText =
    "“We Don't Just Work On Infrastructure. We Work On Impact.”";
  const quoteHighlight = "infrastructure";

  const qualities =
    data?.qualities && data.qualities.length > 0
      ? data.qualities
      : DEFAULT_QUALITIES;

  const rawKeyPoints =
    data?.keyPoints && data.keyPoints.length > 0
      ? data.keyPoints
      : DEFAULT_PRINCIPLES;

  const keyPoints = rawKeyPoints.map((p) =>
    formatPrinciple(p.replace(/\n/g, " ").trim()),
  );

  return (
    <TeamGreenModalShell
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      headline={headline}
      quoteText={quoteText}
      quoteHighlight={quoteHighlight}
      layout="leadership"
      width={1866}
      height={691}
      bodyClassName={styles.leadershipBody}
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

        {/* 4 Leadership Principles Grid with Parallelogram Tilt */}
        <div className={styles.principlesGrid}>
          {keyPoints.map((point, idx) => {
            const isTopRow = idx < 2;
            return (
              <div
                key={point}
                className={`${styles.principleItem} ${
                  isTopRow ? styles.principleRowTop : styles.principleRowBottom
                }`}
              >
                <img
                  src="/images/why-esg-matters-to-green/green_bolt.png"
                  alt=""
                  className={styles.principleIcon}
                  loading="eager"
                  decoding="async"
                  width={32}
                  height={38}
                />
                <p className={styles.principleText}>{point}</p>
              </div>
            );
          })}
        </div>
      </div>
    </TeamGreenModalShell>
  );
};

export default OurLeadershipPhilosophy;
