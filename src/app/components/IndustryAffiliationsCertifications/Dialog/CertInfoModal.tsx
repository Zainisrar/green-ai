"use client";

import React, { useEffect, useState } from "react";
import styles from "./CertInfoModal.module.css";

interface CertInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const CertInfoModal = ({
  isOpen,
  onClose,
  children,
}: CertInfoModalProps) => {
  const [scale, setScale] = useState(1);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const update = () => {
      const mobile = window.innerWidth < 900;
      setIsMobile(mobile);
      setScale(mobile ? 1 : Math.min(1, window.innerWidth / 1920, window.innerHeight / 1023));
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previousOverflow; };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} role="presentation">
      <button className={styles.backdrop} type="button" onClick={onClose} aria-label="Close dialog backdrop" />
      <div className={styles.stage} role="dialog" aria-modal="true" aria-label="Industry information" style={{ "--modal-scale": scale, "--modal-left": "24px", "--modal-top": "139px" } as React.CSSProperties}>
        <div className={styles.window}>
          {!isMobile && <img className={styles.surface} src="/images/client-partnerships/dialog-surface.svg" alt="" aria-hidden="true" />}
        <button
          type="button"
          onClick={onClose}
          className={styles.close}
          aria-label="Close modal"
        >
          <svg
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 6l12 12M18 6L6 18"
            />
          </svg>
        </button>
        <div className={styles.content}>{children}</div>
        </div>
      </div>
    </div>
  );
};

export default CertInfoModal;
