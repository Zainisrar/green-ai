"use client";

import { useWomenInEnergy } from "@/hooks/useWomenInEnergy";
import WomenEnergyModalShell from "./WomenEnergyModalShell";
import styles from "./WomenEnergyModals.module.css";

interface Props { isOpen: boolean; onClose: () => void; }

export default function VoicesofPower({ isOpen, onClose }: Props) {
  const { data } = useWomenInEnergy();
  if (!data) return null;
  const modal = data.modal.voicesOfPower;

  return (
    <WomenEnergyModalShell isOpen={isOpen} onClose={onClose} variant="voices">
      <header className={styles.voicesHeader}><h2 className={styles.heading}>Voices of Power</h2></header>
      <div className={`${styles.rule} ${styles.voicesRule}`} />
      <div className={styles.voicesGrid}>
        {modal.items.slice(0, 4).map((voice, index) => (
          <article className={styles.voiceCard} key={`${voice.title}-${voice.description}-${index}`}>
            <div className={styles.voiceImage}><img src={voice.img.src} alt={voice.img.alt} /></div>
            <p className={styles.voiceQuote}>{voice.title}</p>
            <p className={styles.voiceByline}>{voice.description}</p>
          </article>
        ))}
      </div>
    </WomenEnergyModalShell>
  );
}
