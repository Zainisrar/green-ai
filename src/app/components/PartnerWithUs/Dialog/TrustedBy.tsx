"use client";

import ClientInfoModal from "@/app/components/ClientPartnerships/Dialog/ClientInfoModal";
import styles from "./PartnerWithUsDialogs.module.css";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const row1 = [
  {
    src: "/images/client-partnerships/department-of-petroleum-energy-of-papua-new-guinea.png",
    alt: "Department of Petroleum and Energy",
    width: 260,
    height: 160,
  },
  {
    src: "/images/client-partnerships/department-of-national-planning.png",
    alt: "Department of National Planning and Monitoring",
    width: 190,
    height: 150,
  },
  {
    src: "/images/client-partnerships/australian-aid.png",
    alt: "Australian Aid",
    width: 250,
    height: 140,
  },
  {
    src: "/images/client-partnerships/undp.png",
    alt: "UNDP",
    width: 200,
    height: 160,
  },
];

const row2 = [
  {
    src: "/images/client-partnerships/pasic-power.png",
    alt: "Pacific Power Association",
    width: 170,
    height: 130,
  },
  {
    src: "/images/client-partnerships/eu-green.png",
    alt: "EU GREEN European Alliance",
    width: 340,
    height: 120,
  },
];

const TrustedBy = ({ isOpen, onClose }: Props) => {
  return (
    <ClientInfoModal
      isOpen={isOpen}
      onClose={onClose}
      height={700}
      closeRight={38}
      closeTop={15}
      geometry="partnerWithUsChannels"
    >
      <div className={`${styles.dialogContainer} ${styles.trustedDialog}`}>
        <header className={styles.dialogHeader}>
          <h2 className={styles.dialogTitle}>Trusted By</h2>
          <p className={styles.dialogSubtitle}>
            - We don&apos;t just build solar systems — we engineer energy
            impact.
          </p>
        </header>

        <div className={styles.trustedLogos}>
          <div className={styles.trustedRow1}>
            {row1.map((logo) => (
              <img
                key={logo.src}
                loading="lazy"
                decoding="async"
                src={logo.src}
                alt={logo.alt}
                className={styles.trustedLogo}
                style={{
                  maxWidth: `${logo.width}px`,
                  maxHeight: `${logo.height}px`,
                }}
              />
            ))}
          </div>

          <div className={styles.trustedRow2}>
            {row2.map((logo) => (
              <img
                key={logo.src}
                loading="lazy"
                decoding="async"
                src={logo.src}
                alt={logo.alt}
                className={styles.trustedLogo}
                style={{
                  maxWidth: `${logo.width}px`,
                  maxHeight: `${logo.height}px`,
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </ClientInfoModal>
  );
};

export default TrustedBy;
