"use client";

import React from "react";
import GridIntelInfoModal from "./GridIntelInfoModal";
import styles from "./GridIntelModalContent.module.css";

interface ComparisonRow {
  feature: string;
  gridIntel: string;
  conventional: string;
}

interface WhyIntelData {
  title?: string;
  subtitle?: string;
  description?: string;
  comparisonTable?: ComparisonRow[];
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  data?: WhyIntelData;
}

const TABLE_ROWS = [
  {
    feature: "Predictive load forecasting",
    gridIntel: "Integrated",
    conventional: "Not Available",
    offset: 100,
  },
  {
    feature: "Hybrid source optimization",
    gridIntel: "Multi-input real-time control",
    conventional: "Manual or static logic",
    offset: 75,
  },
  {
    feature: "Remote telemetry & diagnostics",
    gridIntel: "Fully enabled",
    conventional: "Rare or unsupported",
    offset: 50,
  },
  {
    feature: "Modular architecture",
    gridIntel: "Plug & scale",
    conventional: "Proprietary and rigid",
    offset: 25,
  },
  {
    feature: "Renewable prioritization",
    gridIntel: "Configured as default logic",
    conventional: "Diesel-centric fallback",
    offset: 0,
  },
];

export default function WhyIntel({ isOpen, onClose, data }: Props) {
  if (!isOpen) return null;

  const title = data?.title || "Why GRID-INTEL™";
  const subtitle = data?.subtitle || "- Is Different";

  const rows =
    data?.comparisonTable && data.comparisonTable.length > 0
      ? data.comparisonTable.map((row, idx) => ({
          feature: row.feature,
          gridIntel: row.gridIntel,
          conventional: row.conventional,
          offset: TABLE_ROWS[idx]?.offset ?? Math.max(0, 100 - idx * 25),
        }))
      : TABLE_ROWS;

  return (
    <GridIntelInfoModal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      subtitle={subtitle}
    >
      <div className={styles.tableContainer}>
        <div className={styles.tableHeaderRow}>
          <div className={styles.tableHeaderCol1}>Feature</div>
          <div className={styles.tableHeaderCol2}>GRID-INTEL™</div>
          <div className={styles.tableHeaderCol3}>
            Conventional Controllers
          </div>
        </div>

        <div className={styles.tableBody}>
          {rows.map((row, idx) => (
            <div
              key={`why-intel-row-${idx}-${row.feature}`}
              className={styles.tableRow}
              style={{
                transform: `translateX(${row.offset}px)`,
              }}
            >
              <div className={styles.tableCellCol1}>{row.feature}</div>
              <div className={styles.tableCellCol2}>{row.gridIntel}</div>
              <div className={styles.tableCellCol3}>{row.conventional}</div>
            </div>
          ))}
        </div>
      </div>
    </GridIntelInfoModal>
  );
}
