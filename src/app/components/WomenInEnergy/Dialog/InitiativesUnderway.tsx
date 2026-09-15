"use client";

import { useWomenInEnergy } from "@/hooks/useWomenInEnergy";
import WomenEnergyModalShell from "./WomenEnergyModalShell";
import styles from "./WomenEnergyModals.module.css";

interface Props { isOpen: boolean; onClose: () => void; }

export default function InitiativesUnderway({ isOpen, onClose }: Props) {
  const { data } = useWomenInEnergy();
  if (!data) return null;
  const modal = data.modal.initiativesUnderway;

  return (
    <WomenEnergyModalShell isOpen={isOpen} onClose={onClose}>
      <header className={styles.standardHeader}>
        <h2 className={styles.heading}>Initiatives Underway</h2>
        <p className={styles.subheading}>- Energy access is only transformational if it includes everyone</p>
      </header>
      <div className={styles.rule} />
      <div className={styles.tableHeader}><span>Program</span><span>Description</span></div>
      <div className={styles.tableRows}>
        {modal.key.map((initiative) => (
          <div className={styles.tableRow} key={`${initiative.program}-${initiative.description}`}>
            <p>{initiative.program}</p><p>{initiative.description}</p>
          </div>
        ))}
      </div>
      <blockquote className={styles.quote}>
        “<strong>GREEN’s workforce is now 39% female</strong> in technical roles — and growing”
      </blockquote>
    </WomenEnergyModalShell>
  );
}
