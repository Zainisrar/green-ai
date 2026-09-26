"use client";
import styles from "./HandbookDialogs.module.css";
import HandbookModalFrame from "./HandbookModalFrame";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  items: { category: string; requiredStandard: string }[];
}

const defaultConductItems = [
  {
    category: "Integrity",
    requiredStandard:
      "Zero tolerance for bribery, misrepresentation, or falsified credentials",
  },
  {
    category: "Compliance",
    requiredStandard:
      "Full alignment with ISO, IEC, PNG national code, and GREEN-specific specs",
  },
  {
    category: "Workforce Ethics",
    requiredStandard:
      "No exploitation. No informal labor. Training and fair pay mandatory",
  },
  {
    category: "Environmental",
    requiredStandard:
      "Products with RoHS, recyclable elements, and responsible sourcing are prioritized",
  },
  {
    category: "Technical Readiness",
    requiredStandard:
      "Vendors must support lifecycle diagnostics and provide API/open data standards",
  },
];

const CodeOfConduct = ({ isOpen, onClose, title, items }: Props) => {
  if (!isOpen) return null;
  const displayItems = items && items.length > 0 ? items : defaultConductItems;

  return (
    <HandbookModalFrame
      isOpen={isOpen}
      onClose={onClose}
      variant="conduct"
      label={title || "Code of Conduct (Rewritten)"}
    >
      <div className={styles.conductContent}>
        <h2 className={styles.conductTitle}>
          {title || "Code of Conduct (Rewritten)"}
        </h2>
        <div
          className={`${styles.divider} ${styles.conductDivider}`}
          aria-hidden="true"
        />

        <table className={styles.conductTable}>
          <colgroup>
            <col className={styles.conductCategoryColumn} />
            <col />
          </colgroup>
          <thead>
            <tr>
              <th scope="col">Category</th>
              <th scope="col">Required Standard</th>
            </tr>
          </thead>
          <tbody>
            {displayItems.map((row) => (
              <tr key={`${row.category}-${row.requiredStandard}`}>
                <th scope="row">{row.category}</th>
                <td>{row.requiredStandard}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </HandbookModalFrame>
  );
};

export default CodeOfConduct;
