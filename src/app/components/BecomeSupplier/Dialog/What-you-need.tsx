"use client";

import type React from "react";
import { useEffect, useRef } from "react";
import styles from "./SupplierDialogs.module.css";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  keys?: string[];
}

const DEFAULT_LEFT_COLUMN = [
  "Company registration details & country of operation",
  "Product categories & technical datasheets",
  "ISO/IEC certifications (if available)",
];

const DEFAULT_RIGHT_COLUMN = [
  "Previous EPC or supply chain experience",
  "Warranty and after-sales support details",
  "Sustainability credentials (optional)",
];

const WhatYouNeed: React.FC<Props> = ({
  isOpen,
  onClose,
  title = "What You’ll Need",
  keys,
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

  const leftItems =
    keys && keys.length > 0
      ? keys.slice(0, Math.ceil(keys.length / 2))
      : DEFAULT_LEFT_COLUMN;

  const rightItems =
    keys && keys.length > 0
      ? keys.slice(Math.ceil(keys.length / 2))
      : DEFAULT_RIGHT_COLUMN;

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
        aria-labelledby="what-you-need-title"
      >
        <div className={styles.modalPanel}>
          <div className={styles.modalContent}>
            <div className={styles.modalHeader}>
              <h2 id="what-you-need-title" className={styles.modalTitle}>
                {title}
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

            <div className={styles.twoColGrid}>
              <div className="flex flex-col gap-6 sm:gap-8">
                {leftItems.map((item) => (
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

              <div className="flex flex-col gap-6 sm:gap-8">
                {rightItems.map((item) => (
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhatYouNeed;
