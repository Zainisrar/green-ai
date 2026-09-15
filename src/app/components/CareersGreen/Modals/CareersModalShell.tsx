"use client";

import { createPortal } from "react-dom";
import { useEffect, useState, type ReactNode } from "react";
import styles from "./CareersModal.module.css";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  panelClassName?: string;
};

export default function CareersModalShell({
  isOpen,
  onClose,
  children,
  panelClassName = "",
}: Props) {
  const [mounted, setMounted] = useState(false);
  const [scale, setScale] = useState(1);

  useEffect(() => setMounted(true), []);
  useEffect(() => {
    if (!isOpen) return;
    const updateScale = () =>
      setScale(
        Math.min(
          1,
          (window.innerWidth - 48) / 1866.185,
          (window.innerHeight - 48) / 699.575,
        ),
      );
    updateScale();
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, [isOpen]);

  if (!isOpen || !mounted) return null;

  return createPortal(
    <div className={styles.overlay} role="presentation">
      <button
        type="button"
        className={styles.backdrop}
        aria-label="Close dialog overlay"
        onClick={onClose}
      />
      <section
        className={styles.stage}
        role="dialog"
        aria-modal="true"
        style={{ "--modal-scale": scale } as React.CSSProperties}
      >
        <div className={`${styles.panel} ${panelClassName}`}>
          <button
            className={styles.close}
            type="button"
            aria-label="Close dialog"
            onClick={onClose}
          >
            ×
          </button>
          {children}
        </div>
      </section>
    </div>,
    document.body,
  );
}
