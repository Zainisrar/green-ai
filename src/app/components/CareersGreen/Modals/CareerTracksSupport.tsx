"use client";
import styles from "./CareersModal.module.css";
import CareersModalShell from "./CareersModalShell";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  data?: { title: string; role: Array<{ type: string; description: string }> };
}
const fallback = [
  [
    "Engineering & Design",
    "Solar, hybrid, microgrid, and electrical design roles using real-world modeling",
  ],
  [
    "Project Delivery",
    "Site engineers, project managers, installers, commissioning experts",
  ],
  [
    "O&M & Grid Monitoring",
    "GRID-INTEL™ support, diagnostics, service technicians",
  ],
  ["Procurement & SCM", "Global sourcing, supplier interface, vendor audits"],
  ["Corporate Roles", "HR, Finance, Marketing, BD, ESG Compliance"],
  [
    "Internships / Trainees",
    "For students and young professionals — field learning included",
  ],
];
export default function CareerTracksSupport({ isOpen, onClose, data }: Props) {
  void data;
  const rows = fallback.map(([type, description]) => ({ type, description }));
  return (
    <CareersModalShell
      isOpen={isOpen}
      onClose={onClose}
      panelClassName={styles.tracksPanel}
    >
      <h2 className={styles.heading}>Career Tracks We Support</h2>
      <div className={styles.rule} />
      <div className={styles.tracksGrid}>
        <div>
          <h3>Role Type</h3>
          {rows.map((row) => (
            <p key={row.type}>{row.type}</p>
          ))}
        </div>
        <div>
          <h3>Description</h3>
          {rows.map((row) => (
            <p key={row.type}>{row.description}</p>
          ))}
        </div>
      </div>
    </CareersModalShell>
  );
}
