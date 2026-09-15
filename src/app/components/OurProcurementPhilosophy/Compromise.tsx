"use client";

import HandbookModalFrame from "../Handbook/Dialog/HandbookModalFrame";
import styles from "./ProcurementModal.module.css";

interface Image {
  alt: string;
  src: string;
}
interface Quote {
  text: string;
  highlighted: string;
}
interface WhatWeWontCompromiseData {
  img: Image;
  keys: string[];
  quote: Quote;
  title: string;
}
interface Props {
  isOpen: boolean;
  onClose: () => void;
  data?: WhatWeWontCompromiseData;
}

const fallbackKeys = [
  "Unproven manufacturers",
  "Incomplete warranties or weak after-sales",
  "Lack of compliance with IEC, ISO, or local grid standards",
  "High failure rates in humid/tropical stress environments",
  "Vendor opacity or inconsistent documentation",
];

export default function Compromise({ isOpen, onClose, data }: Props) {
  const title = data?.title || "What We Won’t Compromise";
  const keys = data?.keys?.length ? data.keys : fallbackKeys;
  const quote =
    data?.quote?.text ||
    "If it can't stand the test of time, it doesn't belong in a GREEN system.";
  const highlight = data?.quote?.highlighted || "GREEN";
  const [before, after = ""] = quote.split(highlight);

  return (
    <HandbookModalFrame
      isOpen={isOpen}
      onClose={onClose}
      variant="ethos"
      label={title}
    >
      <section className={styles.compromise}>
        <h2 className={styles.contentTitle}>{title}</h2>
        <div className={styles.rule} />
        <div className={styles.boltList}>
          {keys.map((key) => (
            <div className={styles.boltItem} key={key}>
              <img
                className={styles.bolt}
                src="/images/our-procurement-philosophy/lighting.png"
                alt=""
                aria-hidden="true"
              />
              <p className={styles.boltCopy}>{key}</p>
            </div>
          ))}
        </div>
        <div className={styles.imagePanel}>
          <img
            src={
              data?.img?.src ||
              "/images/our-procurement-philosophy/compromiseDialog.png"
            }
            alt={data?.img?.alt || "Solar panel field"}
          />
        </div>
        <p className={styles.quote}>
          {before}
          <span>{highlight}</span>
          {after}
        </p>
      </section>
    </HandbookModalFrame>
  );
}
