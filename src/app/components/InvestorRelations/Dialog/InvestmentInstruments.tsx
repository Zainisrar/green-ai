"use client";

import { useInvestorRelations } from "../../../../hooks/useInvestorRelations";
import styles from "./InvestmentInstruments.module.css";
import InvestorModalShell from "./InvestorModalShell";

interface InvestmentInstrumentsProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function InvestmentInstruments({
  isOpen,
  onClose,
}: InvestmentInstrumentsProps) {
  const { data } = useInvestorRelations();
  const modalData = data?.investmentInstruments;

  const title = modalData?.title?.trim() || "Investment Instruments Supported";
  const quoteText =
    modalData?.quote?.text ||
    "Your capital can build megawatts — or it can build movements. With GREEN, you can do both.";
  const quoteHighlight = modalData?.quote?.highlighted || "GREEN";

  const col1Items = [
    {
      icon: "/images/grid-intel/lighting.png",
      text:
        modalData?.key?.[0]?.text || "Equity Stakes (Series A / Growth Equity)",
      cls: styles.row1,
    },
    {
      icon: "/images/grid-intel/lighting.png",
      text:
        modalData?.key?.[2]?.text || "Infrastructure Bonds (Project-Backed)",
      cls: styles.row2,
    },
    {
      icon: "/images/grid-intel/lighting.png",
      text:
        modalData?.key?.[4]?.text ||
        "Pay-For-Performance Models (OPEX Or Carbon-Linked)",
      cls: styles.row3,
    },
  ];

  const col2Items = [
    {
      icon: "/images/grid-intel/lighting.png",
      text: modalData?.key?.[1]?.text || "Climate & Catalytic Capital",
      cls: styles.row1,
    },
    {
      icon: "/images/grid-intel/lighting.png",
      text:
        modalData?.key?.[3]?.text ||
        "Blended Finance With Development Guarantees",
      cls: styles.row2,
    },
  ];

  return (
    <InvestorModalShell
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      quoteText={quoteText}
      quoteHighlight={quoteHighlight}
    >
      <div className={styles.columnsContainer}>
        <div className={styles.column}>
          {col1Items.map((item) => (
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

        <div className={styles.column}>
          {col2Items.map((item) => (
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
      </div>
    </InvestorModalShell>
  );
}
