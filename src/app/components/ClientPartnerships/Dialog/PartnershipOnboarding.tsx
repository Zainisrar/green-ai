"use client";

import ClientInfoModal from "./ClientInfoModal";
import styles from "./ClientPartnershipDialogs.module.css";

interface PartnerLogo {
  src: string;
  alt: string;
}

interface PartnershipOnboardingData {
  title?: string;
  subHeadline?: string;
  partners?: PartnerLogo[];
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  data?: PartnershipOnboardingData;
}

const defaultPartners = [
  {
    src: "/images/client-partnerships/department-of-petroleum-energy-of-papua-new-guinea.png",
    alt: "Department of Petroleum and Energy",
  },
  {
    src: "/images/client-partnerships/department-of-national-planning.png",
    alt: "Department of National Planning",
  },
  {
    src: "/images/client-partnerships/australian-aid.png",
    alt: "Australian Aid",
  },
  {
    src: "/images/client-partnerships/undp.png",
    alt: "United Nations Development Programme",
  },
  { src: "/images/client-partnerships/pasic-power.png", alt: "Pacific Power" },
  { src: "/images/client-partnerships/eu-green.png", alt: "EU Green" },
];

const PartnershipOnboarding = ({ isOpen, onClose, data }: Props) => {
  const title = data?.title ?? "Trusted By";
  const subHeadline =
    data?.subHeadline ??
    "We don't just build solar systems — we engineer energy impact.";
  const partners = data?.partners ?? defaultPartners;

  return (
    <ClientInfoModal isOpen={isOpen} onClose={onClose}>
      <div className={styles.trusted}>
        <header className={styles.dialogHeader}>
          <h2 className={styles.dialogTitle}>{title}</h2>
          <p className={styles.dialogSubtitle}>- {subHeadline}</p>
        </header>

        <div className={styles.logoGrid}>
          {partners.map((partner) => (
            <img
              loading="lazy"
              decoding="async"
              key={partner.src}
              src={partner.src}
              alt={partner.alt}
              className={styles.partnerLogo}
            />
          ))}
        </div>
      </div>
    </ClientInfoModal>
  );
};

export default PartnershipOnboarding;
