"use client";

import HandbookModalFrame from "../Handbook/Dialog/HandbookModalFrame";
import styles from "./ProcurementModal.module.css";

interface Image {
  alt: string;
  src: string;
}
interface VendorRelationshipKey {
  text: string;
  highlighted: string;
}
interface StrategicVendorRelationshipsData {
  img: Image;
  keys: VendorRelationshipKey[];
  title: string;
}
interface Props {
  isOpen: boolean;
  onClose: () => void;
  data?: StrategicVendorRelationshipsData;
}

const fallbackKeys: VendorRelationshipKey[] = [
  {
    text: "We don’t treat vendors as vendors. We treat them as partners in performance.",
    highlighted: "partners in performance.",
  },
  {
    text: "If you're a manufacturer or supplier who believes in quality, transparency, and shared mission, we welcome your collaboration.",
    highlighted: "quality, transparency, and shared mission",
  },
];

function highlightedCopy({ text, highlighted }: VendorRelationshipKey) {
  if (!highlighted || !text.includes(highlighted)) return text;
  const [before, after] = text.split(highlighted);
  return (
    <>
      {before}
      <strong>{highlighted}</strong>
      {after}
    </>
  );
}

export default function Vendor({ isOpen, onClose, data }: Props) {
  const title = data?.title || "Strategic Vendor Relationships";
  const keys = data?.keys?.length ? data.keys : fallbackKeys;

  return (
    <HandbookModalFrame
      isOpen={isOpen}
      onClose={onClose}
      variant="ethos"
      label={title}
    >
      <section className={styles.vendor}>
        <h2 className={styles.contentTitle}>{title}</h2>
        <div className={styles.rule} />
        <div className={styles.copyStack}>
          {keys.map((item) => (
            <div className={styles.boltItem} key={item.text}>
              <img
                className={styles.bolt}
                src="/images/our-procurement-philosophy/lighting.png"
                alt=""
                aria-hidden="true"
              />
              <p className={styles.boltCopy}>{highlightedCopy(item)}</p>
            </div>
          ))}
        </div>
        <div className={styles.imagePanel}>
          <img
            src={
              data?.img?.src ||
              "/images/our-procurement-philosophy/handshake.png"
            }
            alt={data?.img?.alt || "Business handshake partnership"}
          />
        </div>
        <p className={styles.quote}>
          “Sustainable Choices. Long-Term Results.”
        </p>
      </section>
    </HandbookModalFrame>
  );
}
