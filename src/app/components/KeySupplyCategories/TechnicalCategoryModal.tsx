"use client";

import HandbookModalFrame from "../Handbook/Dialog/HandbookModalFrame";
import styles from "./SolarGenerationEquipment.module.css";

export interface TechnicalCategoryItem {
  component: string;
  technicalNotes: string;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  items: TechnicalCategoryItem[];
  compactTitle?: boolean;
}

/** Shared Figma Vector 7376 table dialog for all supply category details. */
export default function TechnicalCategoryModal({
  isOpen,
  onClose,
  title,
  items,
  compactTitle = false,
}: Props) {
  return (
    <HandbookModalFrame
      isOpen={isOpen}
      onClose={onClose}
      variant="conduct"
      label={title}
    >
      <div className={styles.dialog}>
        <h2
          className={`${styles.title} ${
            compactTitle ? styles.compactTitle : ""
          }`}
        >
          {title}
        </h2>
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
