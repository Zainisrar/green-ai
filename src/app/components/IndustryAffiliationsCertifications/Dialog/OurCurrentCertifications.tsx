"use client";
import React from "react";
import CertInfoModal from "./CertInfoModal";
import styles from "./CertDialogContent.module.css";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  items: { scope: string; issuingBody: string; certification: string }[];
}

const OurCurrentCertifications = ({ isOpen, onClose, title, items }: Props) => {
  const certifications = items.length ? items : [
    { certification: "ISO 9001:2015", issuingBody: "SGS / Bureau Veritas", scope: "Quality Management System (QMS)" },
    { certification: "ISO 14001:2015", issuingBody: "Bureau Veritas", scope: "Environmental Management System (EMS)" },
    { certification: "ISO 45001:2018", issuingBody: "Bureau Veritas", scope: "Occupational Health & Safety (OHSMS)" },
    { certification: "ISO 50001:2018", issuingBody: "Bureau Veritas", scope: "Energy Management Systems (EMS)" },
    { certification: "Clean Energy Council (CEC)", issuingBody: "Australia", scope: "Approved Solar Installer & Designer" },
    { certification: "NEIA PNG", issuingBody: "National Energy Installation Authority", scope: "Local compliance for energy projects" },
    { certification: "Green Star Building Cert", issuingBody: "(Pending/Select Sites)", scope: "Energy-efficient facility deployment" },
    { certification: "GRID-INTEL™ Certified Op", issuingBody: "Internal (Benchmarked to IEC)", scope: "System-level monitoring & smart integration" },
  ];
  return (
    <CertInfoModal isOpen={isOpen} onClose={onClose}>
      <div className={styles.header}>
        <h2 className={styles.title}>
          {title || "Our Current Certifications"}
        </h2>
      </div>

        <table className={`${styles.table} ${styles.certTable}`}>
          <thead>
            <tr>
              <th>
                Certification
              </th>
              <th>
                Issuing Body
              </th>
              <th>
                Scope
              </th>
            </tr>
          </thead>
          <tbody>
            {certifications.map((item, idx) => (
              <tr key={`${item.certification}-${idx}`}>
                <td>
                  {item.certification}
                </td>
                <td>
                  {item.issuingBody}
                </td>
                <td>
                  {item.scope}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
    </CertInfoModal>
  );
};

export default OurCurrentCertifications;
