"use client";
import styles from "./CareersModal.module.css";
import CareersModalShell from "./CareersModalShell";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  data?: {
    title: string;
    roles: Array<{ name: string; place: string; closing: string }>;
  };
}
const fallback = [
  ["Site Engineer", "Western Highlands", "Closing: 12 Aug 2025"],
  ["Solar CAD Designer", "Port Moresby", "Open"],
  ["Finance & Grants Coordinator", "Hybrid", "Closing: 18 Aug 2025"],
  ["Field Technician Trainee", "Nationwide Intake", "Apply Anytime"],
];
export default function OpenRoles({ isOpen, onClose, data }: Props) {
  const roles =
    data?.roles && data.roles.length > 0
      ? data.roles
      : fallback.map(([name, place, closing]) => ({ name, place, closing }));
  return (
    <CareersModalShell
      isOpen={isOpen}
      onClose={onClose}
      panelClassName={styles.rolesPanel}
    >
      <h2 className={styles.heading}>Open Roles</h2>
      <div className={styles.rule} />
      <div className={styles.rolesGrid}>
        {roles.map((role) => (
          <article className={styles.role} key={role.name}>
            <img src="/images/book-consulation/figma-bolt.png" alt="" />
            <div>
              <h3>{role.name}</h3>
              <p className={styles.place}>— {role.place}</p>
              <p className={styles.closing}>{role.closing}</p>
            </div>
          </article>
        ))}
      </div>
    </CareersModalShell>
  );
}
