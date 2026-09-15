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
interface ProcurementAlignedImpactData {
  img: Image;
  keys: string[];
  quote: Quote;
  title: string;
  description: string;
}
interface Props {
  isOpen: boolean;
  onClose: () => void;
  data?: ProcurementAlignedImpactData;
}

const fallbackKeys = [
  ["Energy access reliability", "for remote communities"],
  ["O&M predictability", "for donor-funded projects"],
  ["Technical integrity", "for national infrastructure"],
  ["Carbon responsibility", "via recyclable or low-impact components"],
] as const;

function impactCopy(value: string, index: number) {
  const [emphasis, rest] = fallbackKeys[index] || ["", value];
  if (!value.startsWith(emphasis)) return value;
  return (
    <>
      <strong>{emphasis}</strong>
      {` ${rest}`}
    </>
  );
}

export default function Procrument({ isOpen, onClose, data }: Props) {
  const title = data?.title || "Procurement Aligned with Impact";
  const keys = data?.keys?.length
    ? data.keys
    : fallbackKeys.map(([emphasis, rest]) => `${emphasis} ${rest}`);

  return (
    <HandbookModalFrame
      isOpen={isOpen}
      onClose={onClose}
      variant="ethos"
      label={title}
    >
      <section>
        <h2 className={styles.contentTitle}>{title}</h2>
        <div className={styles.rule} />
        <p className={styles.lead}>
          {data?.description ||
            "GREEN’s procurement decisions are directly tied to:"}
        </p>
        <div className={styles.boltList}>
          {keys.map((key, index) => (
            <div className={styles.boltItem} key={key}>
              <img
                className={styles.bolt}
                src="/images/our-procurement-philosophy/lighting.png"
                alt=""
                aria-hidden="true"
              />
              <p className={styles.boltCopy}>{impactCopy(key, index)}</p>
            </div>
          ))}
        </div>
        <div className={styles.imagePanel}>
          <img
            src={
              data?.img?.src ||
              "/images/our-procurement-philosophy/procrumentDialog.png"
            }
            alt={data?.img?.alt || "Solar panels in field"}
          />
        </div>
        <p className={styles.quote}>
          {data?.quote?.text || "“Sustainable Choices. Long-Term Results.”"}
        </p>
      </section>
    </HandbookModalFrame>
  );
}
