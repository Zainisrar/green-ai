"use client";

import type { ClientPartnershipsWhoWePartnerWith } from "../../../lib/api";
import ClientInfoModal from "./ClientInfoModal";
import styles from "./ClientPartnershipDialogs.module.css";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  data?: ClientPartnershipsWhoWePartnerWith;
}

const defaultItems = [
  {
    clientType: "Government Ministries & Utilities",
    valueDelivered: "Grid expansion, off-grid programs, energy access delivery",
  },
  {
    clientType: "Multilateral Donors & Development Banks",
    valueDelivered:
      "Policy-aligned execution, transparent compliance, verified impact",
  },
  {
    clientType: "Private Sector Enterprises",
    valueDelivered:
      "Clean power, hybrid resilience, ESG-integrated infrastructure",
  },
  {
    clientType: "Institutions (Health, Education, Telecom)",
    valueDelivered:
      "Reliable systems, custom-engineered uptime, long-term O&M models",
  },
];

const WhoWePartnerWith = ({ isOpen, onClose, data }: Props) => {
  const items = data?.items ?? defaultItems;
  const title = data?.title ?? "Who We Partner With";
  const subHeadline =
    data?.subHeadline ?? "Strategic Clients. Transformational Outcomes.";

  return (
    <ClientInfoModal isOpen={isOpen} onClose={onClose}>
      <div className={styles.whoWrapper}>
        <header className={styles.dialogHeader}>
          <h2 className={styles.dialogTitle}>{title}</h2>
          <p className={styles.dialogSubtitle}>- {subHeadline}</p>
        </header>

        <table className={styles.whoTable}>
          <thead>
            <tr>
              <th>Client Type</th>
              <th>Value Delivered</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, idx) => (
              <tr key={idx}>
                <td>{item.clientType}</td>
                <td>{item.valueDelivered}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </ClientInfoModal>
  );
};

export default WhoWePartnerWith;
