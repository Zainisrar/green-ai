"use client";

import ClientInfoModal from "@/app/components/ClientPartnerships/Dialog/ClientInfoModal";
import styles from "./PartnerWithUsDialogs.module.css";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const points = [
  {
    title: "100% on-ground delivery in PNG",
    description: "from concept to commissioning",
  },
  {
    title: "Proven EPCM capacity",
    description: "design, procurement, project execution, O&M",
  },
  {
    title: "Certified and audited",
    description: "ISO 9001, 14001, 45001; CEC; NEIA-compliant",
  },
  {
    title: "Impact-Anchored",
    description: "ESG-aligned, gender inclusive, community embedded",
  },
  {
    title: "Digital by design",
    description:
      "GRID-INTEL™ platform for monitoring, reporting, and diagnostics",
  },
];

const WhyGreen = ({ isOpen, onClose }: Props) => {
  return (
    <ClientInfoModal
      isOpen={isOpen}
      onClose={onClose}
      height={700}
      closeRight={38}
      closeTop={15}
      geometry="partnerWithUs"
    >
      <div className={styles.dialogContainer}>
        <header className={styles.dialogHeader}>
          <h2 className={styles.dialogTitle}>
            Why <span className={styles.dialogTitleAccent}>GREEN</span>?
          </h2>
          <p className={styles.dialogSubtitle}>
            - We don&apos;t just build solar systems — we engineer energy
            impact.
          </p>
        </header>

        <div className={styles.whyList}>
          {points.map((point, idx) => (
            <div key={idx} className={styles.whyRow}>
              <img
                loading="lazy"
                decoding="async"
                src="/images/collaboration-innovation/bolt.png"
                className={styles.whyIcon}
                alt=""
              />
              <p>
                <strong>{point.title}</strong> — {point.description}
              </p>
            </div>
          ))}
        </div>

        <p className={styles.whyFooter}>
          <span className={styles.dialogFooterAccent}>GREEN</span> is not an
          idea-stage partner. We&apos;re a results-stage partner.
        </p>
      </div>
    </ClientInfoModal>
  );
};

export default WhyGreen;
