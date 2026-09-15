"use client";
import React from "react";
import HandbookModalFrame from "./HandbookModalFrame";
import styles from "./HandbookDialogs.module.css";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
  keys: string[];
  img: { alt: string; src: string };
}

const OurProcurementEthos = ({
  isOpen,
  onClose,
  title,
  description,
  keys,
  img,
}: Props) => {
  if (!isOpen) return null;

  return (
    <HandbookModalFrame
      isOpen={isOpen}
      onClose={onClose}
      variant="ethos"
      label={title || "Our Procurement Ethos"}
    >
      <div className={styles.ethosContent}>
        <h2 className={styles.ethosTitle}>
          {title || "Our Procurement Ethos"}
        </h2>
        <div className={styles.divider} aria-hidden="true" />
        <p className={styles.ethosLead}>{description}</p>

        {keys?.map((key, index) => (
          <div
            key={`${key}-${index}`}
            className={`${styles.ethosBullet} ${index === 0 ? styles.ethosBulletOne : styles.ethosBulletTwo
              }`}
          >
            <img
              loading="lazy"
              decoding="async"
              src="/images/technology-innovation-alliances/modal_bolt.png"
              className={styles.ethosBolt}
              alt=""
              aria-hidden="true"
            />
            <span>{key}</span>
          </div>
        ))}

        <img
          loading="lazy"
          decoding="async"
          src={img?.src || "/images/handbook/procrument-ethos.png"}
          alt={img?.alt || "Business Handshake"}
          className={styles.ethosImage}
        />
      </div>
    </HandbookModalFrame>
  );
};

export default OurProcurementEthos;
