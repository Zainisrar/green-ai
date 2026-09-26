"use client";

import type { ClientPartnershipsWhatSetsGreenApart } from "../../../lib/api";
import ClientInfoModal from "./ClientInfoModal";
import styles from "./ClientPartnershipDialogs.module.css";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  data?: ClientPartnershipsWhatSetsGreenApart;
}

const defaultItems = [
  {
    greenDelivers: "Track record in hard-to-reach zones",
    othersPromise: "Marketing slides",
  },
  {
    greenDelivers: "In-house execution, no over-subcontracting",
    othersPromise: "Outsourced chaos",
  },
  {
    greenDelivers: "GRID-INTEL™ platform with every system",
    othersPromise: "Static installations",
  },
  {
    greenDelivers: "High uptime. Low maintenance. Localized O&M",
    othersPromise: "Unplanned breakdowns",
  },
  {
    greenDelivers: "Full post-handover support ecosystem",
    othersPromise: "Silence after delivery",
  },
];

const WhatSetsGREENApart = ({ isOpen, onClose, data }: Props) => {
  const title = data?.title ?? "What Sets GREEN Apart";
  const subHeadline =
    data?.subHeadline ?? "Strategic Clients. Transformational Outcomes.";
  const items = data?.items ?? defaultItems;

  return (
    <ClientInfoModal isOpen={isOpen} onClose={onClose}>
      <div className={styles.apartWrapper}>
        <header className={styles.dialogHeader}>
          <h2 className={styles.dialogTitle}>{title}</h2>
          <p className={styles.dialogSubtitle}>- {subHeadline}</p>
        </header>

        <div className={styles.comparisonGrid}>
          <div className={styles.comparisonCol}>
            <h3 className={styles.comparisonHeaderTitle}>GREEN DELIVERS</h3>
            <div className={styles.comparisonList}>
              {items.map((item, idx) => (
                <p key={idx} className={styles.comparisonItem}>
                  {item.greenDelivers}
                </p>
              ))}
            </div>
          </div>
          <div className={styles.comparisonCol}>
            <h3 className={styles.comparisonHeaderTitle}>OTHERS PROMISE</h3>
            <div className={styles.comparisonList}>
              {items.map((item, idx) => (
                <p key={idx} className={styles.comparisonItem}>
                  {item.othersPromise}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </ClientInfoModal>
  );
};

export default WhatSetsGREENApart;
