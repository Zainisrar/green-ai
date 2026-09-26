"use client";
import React from "react";
import CertInfoModal from "./CertInfoModal";
import styles from "./CertDialogContent.module.css";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  keys: { purpose: string; organization: string }[];
}

const IndustryAffiliations = ({ isOpen, onClose, title, keys }: Props) => {
  const affiliations = keys.length ? keys : [
    { organization: "Solar Energy Industries Association (SEIA, US)", purpose: "Global policy alignment, market insights" },
    { organization: "Sustainable Energy for All (SEforALL)", purpose: "Partnership alignment for island electrification" },
    { organization: "Pacific Power Association (PPA)", purpose: "Regional collaboration on standards & training" },
    { organization: "PNG Electrical Contractors Association", purpose: "National contractor network & safety auditing" },
    { organization: "REEEP (Renewable Energy & Energy Efficiency Partnership)", purpose: "Knowledge exchange, project co-design" },
    { organization: "IRENA (Observer Level)", purpose: "International Renewable Energy Agency forum access" },
  ];
  return (
    <CertInfoModal isOpen={isOpen} onClose={onClose}>
      <div className={`${styles.header} ${styles.affiliationHeader}`}>
        <h2 className={styles.title}>
          {title || "Industry Affiliations"}
        </h2>
      </div>

        <table className={`${styles.table} ${styles.affiliationTable}`}>
          <thead>
            <tr>
              <th>
                Organization
              </th>
              <th>
                Purpose / Engagement
              </th>
            </tr>
          </thead>
          <tbody>
            {affiliations.map((k, idx) => (
              <tr key={`${k.organization}-${idx}`}>
                <td>
                  {k.organization}
                </td>
                <td>
                  {k.purpose}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      <blockquote className={styles.affiliationQuote}>
        “Our <strong>team</strong> also regularly contributes to whitepapers,
        policy consultations, and <strong>EPCM</strong> benchmarking studies.”
      </blockquote>
    </CertInfoModal>
  );
};

export default IndustryAffiliations;
