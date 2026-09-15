"use client";

import { useInvestorRelations } from "../../../../hooks/useInvestorRelations";
import InvestorModalShell from "./InvestorModalShell";
import styles from "./WhyInvestGreen.module.css";

interface WhyInvestGreenProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function WhyInvestGreen({
  isOpen,
  onClose,
}: WhyInvestGreenProps) {
  const { data } = useInvestorRelations();
  const modalData = data?.whyInvestGreen;

  const title = modalData?.title?.trim() || "Why Invest in GREEN?";
  const headline =
    modalData?.headline ||
    "- Infrastructure without integrity is a risk. With GREEN, resilience is engineered.";
  const quoteText =
    modalData?.quote?.text ||
    "PNG market leader with replicable model across the Pacific";
  const quoteHighlight = modalData?.quote?.highlighted || "PNG";

  // Map CMS keys or use fallback with local crisp Figma SVGs
  const items = [
    {
      icon: "/images/investor-relations/icons/technical-support.svg",
      text:
        modalData?.key?.[0]?.text ||
        "Proven execution in last-mile and frontier markets",
      cls: styles.leftItem1,
    },
    {
      icon: "/images/investor-relations/icons/globe-intel.svg",
      text:
        modalData?.key?.[1]?.text || "Digitally monitored impact (GRID-INTEL™)",
      cls: styles.rightItem1,
    },
    {
      icon: "/images/investor-relations/icons/graph.svg",
      text:
        modalData?.key?.[2]?.text ||
        "Certified EPCM systems and internal controls",
      cls: styles.leftItem2,
    },
    {
      icon: "/images/investor-relations/icons/target-mission.svg",
      text:
        modalData?.key?.[3]?.text ||
        "ESG-aligned, donor-compatible business model",
      cls: styles.rightItem2,
    },
    {
      icon: "/images/investor-relations/icons/target-mission.svg",
      text:
        modalData?.key?.[4]?.text ||
        "Scalable platform with growing regional pipeline",
      cls: styles.leftItem3,
    },
  ];

  return (
    <InvestorModalShell
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      headline={headline}
      quoteText={quoteText}
      quoteHighlight={quoteHighlight}
    >
      <div className={styles.grid}>
        {items.map((item) => (
          <div
            key={item.text}
            className={`${styles.item} ${item.cls || ""}`.trim()}
          >
            <div className={styles.iconWrapper}>
              <img
                src={item.icon}
                alt=""
                className={styles.icon}
                loading="lazy"
                decoding="async"
              />
            </div>
            <p className={styles.itemText}>{item.text}</p>
          </div>
        ))}
      </div>
    </InvestorModalShell>
  );
}
