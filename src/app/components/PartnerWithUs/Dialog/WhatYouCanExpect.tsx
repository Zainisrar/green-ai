"use client";

import ClientInfoModal from "@/app/components/ClientPartnerships/Dialog/ClientInfoModal";
import styles from "./PartnerWithUsDialogs.module.css";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const expectations = [
  "Rapid Deployment In High-Need Zones",
  "Turnkey Infrastructure Delivery",
  "Verifiable Impact Data",
  "Zero Greenwashing — All Action, No Noise",
  "Built-In Community Engagement",
];

const WhatYouCanExpect = ({ isOpen, onClose }: Props) => {
  return (
    <ClientInfoModal
      isOpen={isOpen}
      onClose={onClose}
      height={700}
      closeRight={38}
      closeTop={15}
      geometry="partnerWithUsExpect"
    >
      <div className={`${styles.dialogContainer} ${styles.expectationsDialog}`}>
        <header className={styles.dialogHeader}>
          <h2 className={styles.dialogTitle}>What You Can Expect</h2>
          <p className={styles.dialogSubtitle}>
            - We don&apos;t just build solar systems — we engineer energy
            impact.
          </p>
        </header>

        <div className={styles.expectationsGrid}>
          {expectations.map((item, idx) => (
            <div key={idx} className={styles.expectationItem}>
              <img
                loading="lazy"
                decoding="async"
                src="/images/collaboration-innovation/bolt.png"
                className={styles.expectationIcon}
                alt=""
              />
              <p>{item}</p>
            </div>
          ))}
        </div>
      </div>
    </ClientInfoModal>
  );
};

export default WhatYouCanExpect;
