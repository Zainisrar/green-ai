"use client";

import { useInvestorRelations } from "../../../../hooks/useInvestorRelations";
import styles from "./InvestmentFocusArea.module.css";
import InvestorModalShell from "./InvestorModalShell";

interface InvestmentFocusAreaProps {
  isOpen: boolean;
  onClose: () => void;
}

const FALLBACK_ROWS = [
  {
    focusArea: "Mini-Grid Portfolios",
    capitalUse: "Cluster deployments in underserved regions",
    returnProfile: "Long-term cash flows & development impact",
  },
  {
    focusArea: "Energy Storage Expansion",
    capitalUse: "Battery banks, microgrid stability",
    returnProfile: "Grid service revenue, resilience metrics",
  },
  {
    focusArea: "O&M Platform Scaling",
    capitalUse: "Technician training, remote diagnostics",
    returnProfile: "Cost efficiency, regional service contracts",
  },
  {
    focusArea: "GRID-INTEL™ Technology",
    capitalUse: "AI + data infrastructure",
    returnProfile: "Monetizable IP, SaaS integration models",
  },
];

export default function InvestmentFocusArea({
  isOpen,
  onClose,
}: InvestmentFocusAreaProps) {
  const { data } = useInvestorRelations();
  const modalData = data?.investmentFocusArea;

  const title = modalData?.title?.trim() || "Our Investment Focus Areas";
  const headline =
    modalData?.headline ||
    "- Financial models and IRR simulations available on request";

  const focusAreaItems = modalData?.focusArea?.items;
  const capitalUseItems = modalData?.capitalUse?.items;
  const returnProfileItems = modalData?.returnProfile?.items;
  const rowCount = Math.max(
    focusAreaItems?.length ?? 0,
    capitalUseItems?.length ?? 0,
    returnProfileItems?.length ?? 0,
  );

  const rows =
    rowCount > 0
      ? Array.from({ length: rowCount }, (_, idx) => ({
          focusArea:
            focusAreaItems?.[idx]?.trim() ||
            FALLBACK_ROWS[idx]?.focusArea ||
            "",
          capitalUse:
            capitalUseItems?.[idx]?.trim() ||
            FALLBACK_ROWS[idx]?.capitalUse ||
            "",
          returnProfile:
            returnProfileItems?.[idx]?.trim() ||
            FALLBACK_ROWS[idx]?.returnProfile ||
            "",
        }))
      : FALLBACK_ROWS;

  return (
    <InvestorModalShell
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      headline={headline}
    >
      <div className={styles.tableWrap}>
        <div className={styles.tableHeader}>
          <h3 className={styles.colHeading}>Focus Area</h3>
          <h3 className={styles.colHeading}>Capital Use</h3>
          <h3 className={styles.colHeading}>Return Profile</h3>
        </div>

        <div className={styles.tableBody}>
          {rows.map((row, idx) => {
            const rowKey = `investment-focus-row-${idx}`;

            return (
              <div key={rowKey} className={styles.tableRow}>
                <div className={styles.focusAreaCell}>{row.focusArea}</div>
                <div className={styles.capitalUseCell}>{row.capitalUse}</div>
                <div className={styles.returnProfileCell}>
                  {row.returnProfile}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </InvestorModalShell>
  );
}
