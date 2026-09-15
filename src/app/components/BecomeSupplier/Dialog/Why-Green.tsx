"use client";

import type React from "react";
import { useEffect, useRef } from "react";
import styles from "./SupplierDialogs.module.css";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  keys?: string[];
  imgSrc?: string;
  imgAlt?: string;
}

const DEFAULT_WHY_ITEMS = [
  "Supply certified, field-proven products",
  "Demonstrate transparency, traceability, and reliability",
  "Share our commitment to climate-resilient infrastructure",
  "Can deliver to or within the Pacific region",
  "Engage in continuous improvement & collaboration",
];

const WhyGreen: React.FC<Props> = ({
  isOpen,
  onClose,
  title = "Why GREEN?",
  keys,
  imgSrc = "/images/become-supplier/why-green-card-photo.png",
  imgAlt = "Why GREEN Infrastructure",
}) => {
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeBtnRef.current?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const items = keys && keys.length > 0 ? keys : DEFAULT_WHY_ITEMS;

  const renderTitle = (text: string) => {
    if (text.includes("GREEN")) {
      const parts = text.split("GREEN");
      return (
        <>
          {parts[0]}
          <span className={styles.greenHighlight}>GREEN</span>
          {parts.slice(1).join("GREEN")}
        </>
      );
    }
    return text;
  };

  return (
    <div className={styles.overlay}>
      <button
        type="button"
        className="absolute inset-0 cursor-default"
        onClick={onClose}
        aria-label="Close dialog backdrop"
      />
      <div
        className={styles.modalWindow}
        role="dialog"
        aria-modal="true"
        aria-labelledby="why-green-title"
      >
        <div className={styles.modalPanel}>
          <div className={styles.modalContent}>
            <div className={styles.modalHeader}>
              <h2 id="why-green-title" className={styles.modalTitle}>
                {renderTitle(title)}
              </h2>
              <button
                ref={closeBtnRef}
                type="button"
                className={styles.closeBtn}
                onClick={onClose}
                aria-label="Close dialog"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    d="M3 3L17 17M17 3L3 17"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>

            <div className={styles.divider} />

            <div className={styles.whyGreenLayout}>
              <div className={styles.benefitsList}>
                {items.map((item) => (
                  <div key={item} className={styles.item}>
                    <img
                      src="/images/become-supplier/bolt.png"
                      alt=""
                      className={styles.boltIcon}
                      width={36}
                      height={36}
                      loading="lazy"
                      decoding="async"
                    />
                    <p className={styles.itemText}>{item}</p>
                  </div>
                ))}
              </div>

              <div className={styles.photoContainer}>
                <img
                  src={imgSrc}
                  alt={imgAlt}
                  className={styles.cardPhoto}
                  width={710}
                  height={276}
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyGreen;
