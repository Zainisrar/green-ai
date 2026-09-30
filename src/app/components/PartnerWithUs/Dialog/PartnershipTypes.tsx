"use client";

import ClientInfoModal from "@/app/components/ClientPartnerships/Dialog/ClientInfoModal";
import styles from "./PartnerWithUsDialogs.module.css";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const types = [
  {
    title: "Government Ministries",
    description:
      "Electrification rollouts, health & education infrastructure, climate-aligned energy transitions",
    icon: "/images/partner/icon-government.png",
  },
  {
    title: "Donor & NGO Programs",
    description:
      "Last-mile energy access, humanitarian logistics, livelihood-linked energy assets",
    icon: "/images/partner/icon-donor-ngo.png",
  },
  {
    title: "Climate Funds & MDB",
    description:
      "Capital deployment via ready EPCM with transparency & compliance built-in",
    icon: "/images/partner/icon-climate-funds.png",
  },
  {
    title: "Fossil Fuels Displaced",
    description:
      "Smart microgrids, distributed storage, AI-enabled diagnostics, inclusive energy models",
    icon: "/images/partner/icon-fossil-fuels.png",
  },
];

const PartnershipTypes = ({ isOpen, onClose }: Props) => {
  return (
    <ClientInfoModal
      isOpen={isOpen}
      onClose={onClose}
      height={700}
      closeRight={38}
      closeTop={15}
      geometry="partnerWithUsPartnership"
    >
      <div className={`${styles.dialogContainer} ${styles.partnershipDialog}`}>
        <header className={styles.dialogHeader}>
          <h2 className={styles.dialogTitle}>Partnership Types We Support</h2>
          <p className={styles.dialogSubtitle}>
            - We don&apos;t just build solar systems — we engineer energy
            impact.
          </p>
        </header>

        <div className={styles.partnershipGrid}>
          {types.map((type, idx) => (
            <div key={idx} className={styles.partnershipCard}>
              <img
                loading="lazy"
                decoding="async"
                src={type.icon}
                className={styles.partnershipIcon}
                alt=""
              />
              <div>
                <h3>{type.title}</h3>
                <p>{type.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </ClientInfoModal>
  );
};

export default PartnershipTypes;
