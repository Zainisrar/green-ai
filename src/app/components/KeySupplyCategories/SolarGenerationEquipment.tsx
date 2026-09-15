"use client";

import HandbookModalFrame from "../Handbook/Dialog/HandbookModalFrame";
import styles from "./SolarGenerationEquipment.module.css";

interface ModalItem {
  component: string;
  technicalNotes: string;
}

interface ModalData {
  item: ModalItem[];
  title: string;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  data?: ModalData;
}

const fallbackItems: ModalItem[] = [
  {
    component: "PV Modules",
    technicalNotes:
      "Tier-1 rated only (BloombergNEF), min. 25-year linear warranty, Mono PERC, Bifacial, or N-type; IEC 61215 / 61730 compliance",
  },
  {
    component: "Mounting Structures",
    technicalNotes:
      "Hot-dip galvanized steel or anodized aluminum; Wind load ≥160km/h, terrain-agnostic profiles; ground and rooftop variants",
  },
  {
    component: "DC Cabling",
    technicalNotes:
      "UV-resistant, halogen-free, ≥4mm² for interconnections; TUV-certified cable assemblies",
  },
];

export default function SolarGenerationEquipment({
  isOpen,
  onClose,
  data,
}: Props) {
  const title = data?.title || "Solar Generation Equipment";
  const items = data?.item?.length ? data.item : fallbackItems;

  return (
    <HandbookModalFrame
      isOpen={isOpen}
      onClose={onClose}
      variant="conduct"
      label={title}
    >
      <div className={styles.dialog}>
        <h2 className={styles.title}>{title}</h2>
        <div className={styles.divider} />

        <div className={styles.headings}>
          <h3>Component</h3>
          <h3>Technical Notes</h3>
        </div>

        <div className={styles.rows}>
          {items.map((item) => (
            <div
              className={styles.row}
              key={`${item.component}-${item.technicalNotes}`}
            >
              <p className={styles.component}>{item.component}</p>
              <p className={styles.note}>{item.technicalNotes}</p>
            </div>
          ))}
        </div>
      </div>
    </HandbookModalFrame>
  );
}
