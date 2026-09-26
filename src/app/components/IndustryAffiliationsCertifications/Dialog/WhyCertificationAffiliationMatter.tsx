"use client";
import React from "react";
import CertInfoModal from "./CertInfoModal";
import styles from "./CertDialogContent.module.css";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
  keys: { text: string; highlighted: string }[];
  quoteText: string;
  img: { alt: string; src: string };
}

const WhyCertificationAffiliationMatter = ({
  isOpen,
  onClose,
  title,
  description,
  keys,
  quoteText,
  img,
}: Props) => {
  const principles = keys.length ? keys : [
    { highlighted: "Sustainability", text: "of components and practices" },
    { highlighted: "Performance", text: "of systems under tropical, island, and remote conditions" },
    { highlighted: "Transparency", text: "for donors, governments, and global clients" },
  ];
  return (
    <CertInfoModal isOpen={isOpen} onClose={onClose}>
      <div className={styles.header}>
        <h2 className={styles.title}>
          {title || "Why Certification & Affiliation Matter"}
        </h2>
      </div>

      <p className={styles.whyIntro}>{description || "GREEN Limited holds and pursues certifications that ensure:"}</p>

      <div className={styles.whyGrid}>
        <div className={styles.keyList}>
          {principles.map((k, idx) => (
            <div key={idx} className={styles.key}>
                <img
                  loading="lazy"
                  decoding="async"
                  src="/images/grid-intel/lighting.png"
                  alt="lighting"
                />
              <div>
                <strong>{k.highlighted}</strong>
                <span>
                  {k.text.replace(k.highlighted, "").trim() || k.text}
                </span>
              </div>
            </div>
          ))}
        </div>

          <img
            loading="lazy"
            decoding="async"
            src={
              img?.src ||
              "/images/industry-affiliations-certifications/why-certification-model.png"
            }
            alt={img?.alt || "Standards and Certification"}
            className={styles.featureImage}
          />
      </div>

      <blockquote className={styles.quote}>{quoteText || "“In energy infrastructure, trust is engineered — through compliance, peer validation, and continuous improvement.”"}</blockquote>
    </CertInfoModal>
  );
};

export default WhyCertificationAffiliationMatter;
