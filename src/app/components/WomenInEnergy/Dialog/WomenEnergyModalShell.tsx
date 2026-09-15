"use client";

import { createPortal } from "react-dom";
import { useEffect, useState, type ReactNode } from "react";
import styles from "./WomenEnergyModals.module.css";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  variant?: "standard" | "voices";
};

const dimensions = {
  standard: { width: 1866.185, height: 699.575, offset: 21 },
  voices: { width: 1846.185, height: 619.575, offset: 56 },
};

export default function WomenEnergyModalShell({
  isOpen,
  onClose,
  children,
  variant = "standard",
}: Props) {
  const [mounted, setMounted] = useState(false);
  const [scale, setScale] = useState(1);
  const { width, height, offset } = dimensions[variant];

  useEffect(() => setMounted(true), []);
  useEffect(() => {
    if (!isOpen) return;
    const updateScale = () =>
      setScale(
        Math.min(1, (window.innerWidth - 48) / width, (window.innerHeight - 48) / height),
      );
    updateScale();
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, [height, isOpen, width]);

  if (!isOpen || !mounted) return null;

  return createPortal(
    <div className={styles.overlay} role="presentation">
      <button className={styles.backdrop} type="button" aria-label="Close dialog overlay" onClick={onClose} />
      <section
        className={styles.stage}
        role="dialog"
        aria-modal="true"
        style={{
          "--modal-height": `${height}px`,
          "--modal-offset": `${offset}px`,
          "--modal-scale": scale,
          "--modal-width": `${width}px`,
        } as React.CSSProperties}
      >
        <div className={styles.panel}>
          <button className={styles.close} type="button" aria-label="Close dialog" onClick={onClose}>×</button>
          {children}
        </div>
      </section>
    </div>,
    document.body,
  );
}
