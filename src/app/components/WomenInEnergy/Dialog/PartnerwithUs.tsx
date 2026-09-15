"use client";

import { useWomenInEnergy } from "@/hooks/useWomenInEnergy";
import WomenEnergyModalShell from "./WomenEnergyModalShell";
import styles from "./WomenEnergyModals.module.css";

interface Props { isOpen: boolean; onClose: () => void; }

const fallbackPartners = [
  "Women’s rights and advocacy groups",
  "Government & education ministries",
  "Engineering & STEM institutions",
  "ESG-conscious donors and investors",
];

export default function PartnerwithUs({ isOpen, onClose }: Props) {
  const { data } = useWomenInEnergy();
  if (!data) return null;
  const modal = data.modal.partnerWithUs;
  const partners = modal.keys.length ? modal.keys : fallbackPartners;

  return (
    <WomenEnergyModalShell isOpen={isOpen} onClose={onClose}>
      <header className={styles.partnerHeader}><h2 className={styles.heading}>Partner with Us</h2></header>
      <div className={`${styles.rule} ${styles.partnerRule}`} />
      <p className={`${styles.copyIntro} ${styles.partnerIntro}`}>{modal.description}</p>
      <div className={styles.boltList}>
        {partners.slice(0, 4).map((partner) => (
          <div className={styles.boltItem} key={partner}>
            <img src="/images/shared/figma-brand-panel/bolt.png" alt="" />
            <p>{partner}</p>
          </div>
        ))}
      </div>
      <figure className={styles.featureImage}><img src={modal.img.src} alt={modal.img.alt} /></figure>
      <blockquote className={styles.quote}>
        “Energy access is only <strong>transformational</strong> if it includes everyone.”
      </blockquote>
    </WomenEnergyModalShell>
  );
}
