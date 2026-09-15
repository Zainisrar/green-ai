"use client";

import HandbookModalFrame from "../Handbook/Dialog/HandbookModalFrame";
import styles from "./ProcurementNotes.module.css";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const notes = [
  {
    title: "Prequalified Vendor Requirement:",
    description:
      "All categories require documentation of IEC/UL certification, product test reports, and after-sales service presence in APAC or Pacific.",
  },
  {
    title: "Lead Time Sensitivity:",
    description:
      "All critical components tracked in GREEN’s ERP for staggered delivery schedules and JIT staging.",
  },
  {
    title: "Sustainability Factor:",
    description:
      "Preference given to recyclable or low-impact manufacturing processes.",
  },
  {
    title: "Warranty Requirements:",
    description:
      "Minimum 5 years for electronics, 10 years for structural/solar, 3 years for BoS.",
  },
];

export default function ProcurementNotes({ isOpen, onClose }: Props) {
  const title = "Supply Chain & Procurement Notes";

  return (
    <HandbookModalFrame
      isOpen={isOpen}
      onClose={onClose}
      variant="procurement"
      label={title}
    >
      <div className={styles.dialog}>
        <h2 className={styles.title}>{title}</h2>
        <div className={styles.divider} />
        <div className={styles.notes}>
          {notes.map((note) => (
            <article className={styles.note} key={note.title}>
              <span className={styles.bolt} aria-hidden="true" />
              <p>
                <strong>{note.title}</strong> {note.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </HandbookModalFrame>
  );
}
