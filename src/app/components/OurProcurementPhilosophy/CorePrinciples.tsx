"use client";

import HandbookModalFrame from "../Handbook/Dialog/HandbookModalFrame";
import styles from "./ProcurementModal.module.css";

interface CorePrincipleItem {
  principle: string;
  statement: string;
}

interface CorePrinciplesData {
  items: CorePrincipleItem[];
  title: string;
  subHeadline: string;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  data?: CorePrinciplesData;
}

const fallbackItems: CorePrincipleItem[] = [
  {
    principle: "Performance First",
    statement:
      "Every component must perform in real field conditions — not just on paper.",
  },
  {
    principle: "Value over Price",
    statement: "We invest in lifecycle value, not just low upfront costs.",
  },
  {
    principle: "Fit-for-Environment",
    statement:
      "Equipment must withstand PNG’s terrain, humidity, and intermittency.",
  },
  {
    principle: "Partner Reliability",
    statement:
      "We choose partners who stand behind their products — long after shipping.",
  },
  {
    principle: "Scalability Ready",
    statement:
      "What we deploy today must be compatible with tomorrow’s growth.",
  },
];

export default function CorePrinciples({ isOpen, onClose, data }: Props) {
  const title = data?.title || "Core Principles";
  const subtitle = data?.subHeadline || "What Guides Our Procurement Decisions";
  const items = data?.items?.length ? data.items : fallbackItems;

  return (
    <HandbookModalFrame
      isOpen={isOpen}
      onClose={onClose}
      variant="conduct"
      label={title}
    >
      <section className={styles.header}>
        <h2 className={styles.title}>
          <span className={styles.titleMain}>{title}</span>
          <span className={styles.subtitle}>— {subtitle}</span>
        </h2>
      </section>
      <section className={styles.table} aria-label={title}>
        <div className={styles.tableHeadRow}>
          <span className={styles.tableHead}>Principle</span>
          <span className={styles.tableHead}>Statement</span>
        </div>
        <div className={styles.tableBody}>
          {items.map((item) => (
            <div
              className={styles.tableRow}
              key={`${item.principle}-row`}
            >
              <span className={`${styles.tableCell} ${styles.principle}`}>
                {item.principle}
              </span>
              <span className={`${styles.tableCell} ${styles.statement}`}>
                {item.statement}
              </span>
            </div>
          ))}
        </div>
      </section>
    </HandbookModalFrame>
  );
}
