"use client";

import React from "react";
import FigmaAngledCta from "@/app/components/FigmaAngledCta/FigmaAngledCta";
import SupplierModalFrame from "./SupplierModalFrame";
import styles from "./SupplierDialogs.module.css";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

interface TenderItem {
  title: string;
  width: number;
}

const row1: TenderItem[] = [
  { title: "Supplier Code of Conduct (PDF)", width: 356 },
  { title: "Procurement Overview (PDF)", width: 356 },
  { title: "Supply Category Briefing Deck (PDF)", width: 406 },
];

const row2: TenderItem[] = [
  { title: "EOI Form for New Vendors", width: 356 },
  { title: "Procurement Overview (PDF)", width: 356 },
  { title: "Supply Category Briefing Deck (PDF)", width: 406 },
];

const row3: TenderItem[] = [
  { title: "Supplier Code of Conduct (PDF)", width: 356 },
  { title: "Procurement Overview (PDF)", width: 356 },
  { title: "Supply Category Briefing Deck (PDF)", width: 406 },
];

export default function TendersAndRFQs({ isOpen, onClose }: Props) {
  return (
    <SupplierModalFrame
      isOpen={isOpen}
      onClose={onClose}
      title="Tenders and RFQs"
      titleDash="- We engineer energy. But our real asset is people."
    >
      <div className={styles.tendersContainer}>
        <div className={styles.tendersRows}>
          <div className={styles.tendersRow1}>
            {row1.map((item, idx) => (
              <FigmaAngledCta
                key={idx}
                href={`mailto:procurement@green.com.pg?subject=${encodeURIComponent(
                  `${item.title} Request`,
                )}`}
                icon="download"
                className={styles.tenderCta}
                style={{ width: `${item.width}px` }}
              >
                {item.title}
              </FigmaAngledCta>
            ))}
          </div>

          <div className={styles.tendersRow2}>
            {row2.map((item, idx) => (
              <FigmaAngledCta
                key={idx}
                href={`mailto:procurement@green.com.pg?subject=${encodeURIComponent(
                  `${item.title} Request`,
                )}`}
                icon="download"
                className={styles.tenderCta}
                style={{ width: `${item.width}px` }}
              >
                {item.title}
              </FigmaAngledCta>
            ))}
          </div>

          <div className={styles.tendersRow3}>
            {row3.map((item, idx) => (
              <FigmaAngledCta
                key={idx}
                href={`mailto:procurement@green.com.pg?subject=${encodeURIComponent(
                  `${item.title} Request`,
                )}`}
                icon="download"
                className={styles.tenderCta}
                style={{ width: `${item.width}px` }}
              >
                {item.title}
              </FigmaAngledCta>
            ))}
          </div>
        </div>

        <div className={styles.tendersFooter}>
          <p className={styles.footerQuote}>
            We value partners, not just products.{" "}
            <span className={styles.greenText}>GREEN</span> vendors become part
            of our extended ecosystem.
          </p>
        </div>
      </div>
    </SupplierModalFrame>
  );
}
