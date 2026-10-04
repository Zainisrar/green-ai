"use client";

import type React from "react";
import ClientInfoModal from "@/app/components/ClientPartnerships/Dialog/ClientInfoModal";
import type { CollaborationInnovationWhoWeCelebrateWith } from "../../../lib/api";
import styles from "./CollaborationDialogs.module.css";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  data?: CollaborationInnovationWhoWeCelebrateWith;
}

const defaultItems = [
  {
    partnerType: "Academic Institutions",
    engagementScope: "Field research, pilots, training, co-publishing",
  },
  {
    partnerType: "Tech Developers & Startups",
    engagementScope:
      "Hardware co-design, data integration, GRID-INTEL™ applications",
  },
  {
    partnerType: "NGOs & Impact Networks",
    engagementScope:
      "Decentralized infrastructure rollouts, last-mile innovation",
  },
  {
    partnerType: "Multilateral & Government Bodies",
    engagementScope:
      "Policy-aligned innovation, national demonstration projects",
  },
  {
    partnerType: "Climate Finance & Donors",
    engagementScope: "Grant-backed pilots, milestone-based tech scale-ups",
  },
];

const WhoWeCollaborateWith = ({ isOpen, onClose, data }: Props) => {
  const title = data?.title ?? "Who We Collaborate With";
  const items = data?.items ?? defaultItems;

  return (
    <ClientInfoModal isOpen={isOpen} onClose={onClose} height={570}>
      <div className={styles.collaborateWrapper}>
        <header className={styles.dialogHeader}>
          <h2 className={styles.dialogTitle}>{title}</h2>
        </header>

        <table className={styles.collaborateTable}>
          <thead>
            <tr>
              <th>Partner Type</th>
              <th>Engagement Scope</th>
            </tr>
          </thead>
          <tbody>
            {items.map((row, idx) => {
              const offsets = [0, -22, -44, -66, -88];
              const offset = offsets[idx] ?? -idx * 22;
              return (
                <tr
                  key={idx}
                  className={styles.collaborateRow}
                  style={
                    { "--row-offset": `${offset}px` } as React.CSSProperties
                  }
                >
                  <td className={styles.partnerTypeCell}>{row.partnerType}</td>
                  <td className={styles.scopeCell}>{row.engagementScope}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </ClientInfoModal>
  );
};

export default WhoWeCollaborateWith;
