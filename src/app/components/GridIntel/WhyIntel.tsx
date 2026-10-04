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
  },
  {
    feature: "Hybrid source optimization",
    gridIntel: "Multi-input real-time control",
    conventional: "Manual or static logic",
  },
  {
    feature: "Remote telemetry & diagnostics",
    gridIntel: "Fully enabled",
    conventional: "Rare or unsupported",
  },
  {
    feature: "Modular architecture",
    gridIntel: "Plug & scale",
    conventional: "Proprietary and rigid",
  },
  {
    feature: "Renewable prioritization",
    gridIntel: "Configured as default logic",
    conventional: "Diesel-centric fallback",
  },
];

export default function WhyIntel({ isOpen, onClose, data }: Props) {
  if (!isOpen) return null;

  const rows =
    data?.comparisonTable && data.comparisonTable.length > 0
      ? data.comparisonTable
      : TABLE_ROWS;

  const col1Lines =
    rows === TABLE_ROWS
      ? [
          "                    Predictive load forecasting",
          "               Hybrid source optimization",
          "          Remote telemetry & diagnostics",
          "      Modular architecture",
          "Renewable prioritization",
        ]
      : rows.map(
          (r, i) => `${" ".repeat(Math.max(0, 20 - i * 5))}${r.feature}`,
        );

  const col2Lines =
    rows === TABLE_ROWS
      ? [
          "                  Integrated",
          "              Multi-input real-time control",
          "           Fully enabled",
          "      Plug & scale",
          "Configured as default logic",
        ]
      : rows.map(
          (r, i) => `${" ".repeat(Math.max(0, 18 - i * 4))}${r.gridIntel}`,
        );

  const col3Lines =
    rows === TABLE_ROWS
      ? [
          "                Not Available",
          "             Manual or static logic",
          "          Rare or unsupported",
          "     Proprietary and rigid",
          "Diesel-centric fallback",
        ]
      : rows.map(
          (r, i) => `${" ".repeat(Math.max(0, 16 - i * 4))}${r.conventional}`,
        );

  return (
    <GridIntelInfoModal
      isOpen={isOpen}
      onClose={onClose}
      title={
        <>
          Why GRID-INTEL™ -{" "}
          <span className={styles.greenTitleAccent}>Is Different</span>
        </>
      }
      hideDivider={true}
    >
      <div className={styles.tableContainer}>
        {/* Desktop Exact Figma Slanted Layout */}
        <div className={styles.tableDesktopLayout}>
          <div className={styles.tableHeaderFeature}>Feature</div>
          <div className={styles.tableHeaderGridIntel}>GRID-INTEL™</div>
          <div className={styles.tableHeaderConventional}>
            Conventional Controllers
          </div>

          <div className={styles.predictiveLoadForecasting}>
            {col1Lines.map((line, idx) => (
              <React.Fragment key={`col1-${idx}`}>
                {line}
                {idx < col1Lines.length - 1 && <br />}
              </React.Fragment>
            ))}
          </div>

          <div className={styles.integratedMultiInputRealTi}>
            {col2Lines.map((line, idx) => (
              <React.Fragment key={`col2-${idx}`}>
                {line}
                {idx < col2Lines.length - 1 && <br />}
              </React.Fragment>
            ))}
          </div>

          <div className={styles.notAvailableManual}>
            {col3Lines.map((line, idx) => (
              <React.Fragment key={`col3-${idx}`}>
                {line}
                {idx < col3Lines.length - 1 && <br />}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Mobile Clean Table Layout */}
        <div className={styles.tableMobileLayout}>
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
              >
                <div className={styles.tableCellCol1}>{row.feature}</div>
                <div className={styles.tableCellCol2}>{row.gridIntel}</div>
                <div className={styles.tableCellCol3}>{row.conventional}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </GridIntelInfoModal>
  );
}
