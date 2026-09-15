"use client";

import { useInvestorRelations } from "../../../../hooks/useInvestorRelations";
import InvestorModalShell from "./InvestorModalShell";
import styles from "./PerformanceSnapshots.module.css";

interface PerformanceSnapshotsProps {
  isOpen: boolean;
  onClose: () => void;
}

const FALLBACK_ROWS = [
  { metric: "Systems Deployed", value: "300+" },
  { metric: "Uptime Performance", value: "99.2%" },
  { metric: "Field Technicians", value: "180+ trained" },
  { metric: "ESG Impact Verified", value: "100% of major projects" },
  { metric: "Audit Readiness", value: "Quarterly reporting structure" },
  { metric: "Pipeline Value", value: "> PGK 350 million over 3 years" },
];

export default function PerformanceSnapshots({
  isOpen,
  onClose,
}: PerformanceSnapshotsProps) {
  const { data } = useInvestorRelations();
  const modalData = data?.performanceSnapshots;

  const title = modalData?.title?.trim() || "Performance Snapshots";
  const headline =
    modalData?.headline || "- Annual Reports and ESG Dashboards available";

  const rows =
    modalData?.metric?.items?.map((item, idx) => ({
      id: `performance-snapshot-row-${idx}`,
      metric: item?.trim() || FALLBACK_ROWS[idx]?.metric || "",
      value:
        modalData?.value?.items?.[idx]?.trim() ||
        FALLBACK_ROWS[idx]?.value ||
        "",
    })) ||
    FALLBACK_ROWS.map((row, idx) => ({
      ...row,
      id: `performance-snapshot-row-${idx}`,
    }));

  return (
    <InvestorModalShell
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      headline={headline}
    >
      <div className={styles.tableWrap}>
        <div className={styles.tableHeader}>
          <h3 className={styles.colHeading}>Metric</h3>
          <h3 className={styles.colHeading}>Value</h3>
        </div>

        <div className={styles.tableBody}>
          {rows.map((row, idx) => (
            <div
              key={row.id}
              className={`${styles.tableRow} ${styles[`row${idx}`] || ""}`.trim()}
            >
              <div className={styles.metricCell}>{row.metric}</div>
              <div className={styles.valueCell}>{row.value}</div>
            </div>
          ))}
        </div>
      </div>
    </InvestorModalShell>
  );
}
