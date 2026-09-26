"use client";
import React from "react";
import CertInfoModal from "./CertInfoModal";
import styles from "./CertDialogContent.module.css";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  keys: { title: string; description: string }[];
  img: { alt: string; src: string };
}

const WhatThisMeansforClients = ({
  isOpen,
  onClose,
  title,
  keys,
  img,
}: Props) => {
  const clientBenefits = keys.length ? keys : [
    { title: "Globally Tender-Ready", description: "Fully certified to execute donor-funded and multilateral energy projects." },
    { title: "Standards You Can Trust", description: "Every system is built to verified international codes — no shortcuts." },
    { title: "Built for ESG Reporting", description: "Seamless integration with donor metrics, compliance, and audits" },
    { title: "Audit-Proof Delivery", description: "Transparent, documented, and defensible at every project stage." },
  ];
  return (
    <CertInfoModal isOpen={isOpen} onClose={onClose}>
      <div className={styles.header}>
        <h2 className={styles.title}>
          {title || "What This Means for Clients"}
        </h2>
      </div>

      <div className={styles.clientGrid}>
        <div>
          {clientBenefits.map((k, idx) => (
            <div key={`${k.title}-${idx}`} className={styles.clientItem}>
                <img
                  loading="lazy"
                  decoding="async"
                  src="/images/grid-intel/lighting.png"
                  alt="lighting"
                />
              <div>
                <h3>{k.title}</h3>
                <p>{k.description}</p>
              </div>
            </div>
          ))}
        </div>

          <img
            loading="lazy"
            decoding="async"
            src={
              img?.src ||
              "/images/industry-affiliations-certifications/WhatThisMeansforClients.png"
            }
            alt={img?.alt || "Client Partnership"}
            className={styles.featureImage}
          />
      </div>
    </CertInfoModal>
  );
};

export default WhatThisMeansforClients;
