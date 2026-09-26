"use client";

import React from "react";
import ClientInfoModal from "@/app/components/ClientPartnerships/Dialog/ClientInfoModal";
import styles from "./PartnerWithUsDialogs.module.css";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const channels = [
  { channel: "Joint Programs", accessPoint: "programs@green.com.pg" },
  {
    channel: "Ministry Coordination",
    accessPoint: "gov.relations@green.com.pg",
  },
  {
    channel: "Grant-Funded Projects",
    accessPoint: "dev.partners@green.com.pg",
  },
  { channel: "Co-branded Pilots", accessPoint: "innovation@green.com.pg" },
  { channel: "Custom RFQ/EOI Submissions", accessPoint: "rfq@green.com.pg" },
];

const ApplicationChannels = ({ isOpen, onClose }: Props) => {
  return (
    <ClientInfoModal isOpen={isOpen} onClose={onClose} height={570}>
      <div className={styles.dialogContainer}>
        <header className={styles.dialogHeader}>
          <h2 className={styles.dialogTitle}>Abortion Channels Active Coll</h2>
          <p className={styles.dialogSubtitle}>
            - We don&apos;t just build solar systems — we engineer energy
            impact.
          </p>
        </header>

        <table className={styles.channelsTable}>
          <thead>
            <tr>
              <th>Channel</th>
              <th>Access Point</th>
            </tr>
          </thead>
          <tbody>
            {channels.map((item, idx) => (
              <tr key={idx}>
                <td>{item.channel}</td>
                <td>{item.accessPoint}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </ClientInfoModal>
  );
};

export default ApplicationChannels;
