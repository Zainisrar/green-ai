"use client";

import React from "react";
import GridIntelInfoModal from "./GridIntelInfoModal";
import styles from "./GridIntelModalContent.module.css";

interface SolutionItem {
  icon?: string;
  text?: string;
  title?: string;
  description?: string;
}

interface SolvesData {
  title?: string;
  subtitle?: string;
  description?: string;
  solutions?: SolutionItem[];
  tagline?: string;
  bottomStatement?: {
    highlight?: string;
    text?: string;
  };
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  data?: SolvesData;
}

const ROWS = [
  {
    col1: "Predicts and maps demand patterns",
    col2: "Switches sources dynamically and instantly",
  },
  {
    col1: "Prioritizes renewable energy intelligently",
    col2: "Reduces diesel runtime and fuel consumption",
  },
  {
    col1: "Provides remote monitoring and diagnostics",
    col2: "Delivers full performance visibility to stakeholders",
  },
];

const ROW_OFFSETS = [0, -31, -64];

export default function Solves({ isOpen, onClose, data }: Props) {
  if (!isOpen) return null;

  const title = data?.title || "What GRID-INTEL™ Solves";
  const subtitle =
    data?.subtitle ||
    "GRID-INTEL™ Is Built to Solve This — With Embedded Intelligence.";

  // If dynamic data solutions exist, map pairs or fallback to exact Figma content
  const rows = (() => {
    if (data?.solutions && data.solutions.length >= 2) {
      const texts = data.solutions
        .map((s) => s.text || s.title || s.description || "")
        .filter(Boolean);
      if (texts.length >= 2) {
        const pairs: { col1: string; col2: string }[] = [];
        for (let i = 0; i < texts.length; i += 2) {
          pairs.push({
            col1: texts[i],
            col2: texts[i + 1] || "",
          });
        }
        return pairs;
      }
    }
    return ROWS;
  })();

  const footerQuote = data?.bottomStatement?.text ? (
    <>
      <span className={styles.greenHighlight}>
        {data.bottomStatement.highlight || "GRID-INTEL™"}
      </span>{" "}
      {data.bottomStatement.text}
    </>
  ) : (
    <>
      <span className={styles.greenHighlight}>GRID-INTEL™</span> turns
      distributed power systems into orchestrated, intelligent infrastructure.
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
      <div className={styles.solvesGrid}>
        {rows.map((row, idx) => (
          <div
            key={`solves-row-${idx}-${row.col1}`}
            className={styles.solvesRow}
            style={{
              transform: `translateX(${ROW_OFFSETS[idx] ?? -idx * 31}px)`,
            }}
          >
            <div className={`${styles.bulletItem} ${styles.solvesCol}`}>
              <img
                src="/images/grid-intel/lighting.png"
                alt=""
                className={styles.boltIcon}
                loading="lazy"
                decoding="async"
                width={36}
                height={36}
              />
              <p className={styles.solvesBulletText}>{row.col1}</p>
            </div>

            <div className={`${styles.bulletItem} ${styles.solvesCol}`}>
              <img
                src="/images/grid-intel/lighting.png"
                alt=""
                className={styles.boltIcon}
                loading="lazy"
                decoding="async"
                width={36}
                height={36}
              />
              <p className={styles.solvesBulletText}>{row.col2}</p>
            </div>
          </div>
        ))}
      </div>
    </GridIntelInfoModal>
  );
}
