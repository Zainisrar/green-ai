"use client";

import { useWomenInEnergy } from "@/hooks/useWomenInEnergy";
import WomenEnergyModalShell from "./WomenEnergyModalShell";
import styles from "./WomenEnergyModals.module.css";

interface Props { isOpen: boolean; onClose: () => void; }

const fallbackPoints = [
  "Active recruitment & retention of women in technical roles",
  "Purpose-built training and leadership pathways",
  "Gender-safe job sites and field deployment policies",
  "Highlighting & supporting women across every GREEN team",
];

export default function WhyThisMatters({ isOpen, onClose }: Props) {
  const { data } = useWomenInEnergy();
  if (!data) return null;
  const modal = data.modal.whyThisMatters;
  const points = modal.keys.length ? modal.keys : fallbackPoints;

  return (
    <WomenEnergyModalShell isOpen={isOpen} onClose={onClose}>
      <header className={styles.standardHeader}>
        <h2 className={styles.heading}>Why This Matters</h2>
        <p className={styles.subheading}>- “Energy access is only transformational if it includes everyone.”</p>
      </header>
      <div className={styles.rule} />
      <p className={styles.copyIntro}>{modal.description}</p>
      <div className={styles.boltList}>
        {points.slice(0, 4).map((point) => (
          <div className={styles.boltItem} key={point}>
            <img src="/images/shared/figma-brand-panel/bolt.png" alt="" />
            <p>{point}</p>
          </div>
        ))}
      </div>
      <figure className={styles.featureImage}>
        <img src={modal.img.src} alt={modal.img.alt} />
      </figure>
      <blockquote className={styles.quote}>
        “Energy access is only <strong>transformational</strong> if it includes everyone.”
      </blockquote>
    </WomenEnergyModalShell>
  );
}
