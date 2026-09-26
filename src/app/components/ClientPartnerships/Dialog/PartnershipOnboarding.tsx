"use client";

import ClientInfoModal from "./ClientInfoModal";
import styles from "./ClientPartnershipDialogs.module.css";

interface PartnerLogo {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}

interface PartnershipOnboardingData {
  title?: string;
  subHeadline?: string;
  partnersRow1?: PartnerLogo[];
  partnersRow2?: PartnerLogo[];
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  data?: PartnershipOnboardingData;
}

const defaultRow1: PartnerLogo[] = [
  {
    src: "/images/client-partnerships/department-of-petroleum-energy-of-papua-new-guinea.png",
    alt: "Department of Petroleum and Energy",
    width: 260,
    height: 160,
  },
  {
    src: "/images/client-partnerships/department-of-national-planning.png",
    alt: "Department of National Planning",
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
    alt: "United Nations Development Programme",
    width: 200,
    height: 160,
  },
];

const defaultRow2: PartnerLogo[] = [
  {
    src: "/images/client-partnerships/pasic-power.png",
    alt: "Pacific Power",
    width: 170,
    height: 130,
  },
  {
    src: "/images/client-partnerships/eu-green.png",
    alt: "EU Green",
    width: 340,
    height: 120,
  },
];

const PartnershipOnboarding = ({ isOpen, onClose, data }: Props) => {
  const title = data?.title ?? "Trusted By";
  const subHeadline =
    data?.subHeadline ??
    "We don’t just build solar systems — we engineer energy impact.";
  const row1 = data?.partnersRow1 ?? defaultRow1;
  const row2 = data?.partnersRow2 ?? defaultRow2;

  return (
    <ClientInfoModal isOpen={isOpen} onClose={onClose}>
      <div className={styles.onboardingWrapper}>
        <header className={styles.dialogHeader}>
          <h2 className={styles.dialogTitle}>{title}</h2>
          <p className={styles.dialogSubtitle}>- {subHeadline}</p>
        </header>

        <div className={styles.onboardingLogos}>
          <div className={styles.logoRow1}>
            {row1.map((p) => (
              <img
                key={p.src}
                loading="lazy"
                decoding="async"
                src={p.src}
                alt={p.alt}
                className={styles.partnerLogo}
                style={{
                  maxWidth: p.width ? `${p.width}px` : undefined,
                  maxHeight: p.height ? `${p.height}px` : undefined,
                }}
              />
            ))}
          </div>

          <div className={styles.logoRow2}>
            {row2.map((p) => (
              <img
                key={p.src}
                loading="lazy"
                decoding="async"
                src={p.src}
                alt={p.alt}
                className={styles.partnerLogo}
                style={{
                  maxWidth: p.width ? `${p.width}px` : undefined,
                  maxHeight: p.height ? `${p.height}px` : undefined,
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </ClientInfoModal>
  );
};

export default PartnershipOnboarding;
