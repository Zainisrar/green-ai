"use client";
import styles from "./CareersModal.module.css";
import CareersModalShell from "./CareersModalShell";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  data?: {
    title: string;
    keyPoints: Array<{ text1: string; text2: string }>;
    featuredImg?: { src: string; alt: string };
  };
}
const fallback = [
  ["You deploy what you design", "— real exposure"],
  ["We hire for attitude and potential", "— not just degrees"],
  ["We grow talent from within", "— clear internal promotion paths"],
  ["You’re never just a number", "— you’re part of a transformation"],
];
export default function WhatMakesGreenDifferent({
  isOpen,
  onClose,
  data,
}: Props) {
  const points = fallback.map(([text1, text2]) => ({ text1, text2 }));
  return (
    <CareersModalShell
      isOpen={isOpen}
      onClose={onClose}
      panelClassName={styles.differentPanel}
    >
      <h2 className={styles.heading}>What Makes GREEN Different</h2>
      <div className={styles.rule} />
      <div className={styles.differentContent}>
        <div className={styles.points}>
          {points.map((point) => (
            <article className={styles.point} key={point.text1}>
              <img src="/images/book-consulation/figma-bolt.png" alt="" />
              <div>
                <h3>{point.text1}</h3>
                <p>{point.text2}</p>
              </div>
            </article>
          ))}
        </div>
        {data?.featuredImg && (
          <img
            className={styles.featureImage}
            src={data.featuredImg.src}
            alt={data.featuredImg.alt}
          />
        )}
      </div>
    </CareersModalShell>
  );
}
