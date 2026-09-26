"use client";

import type React from "react";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import styles from "./ClientInfoModal.module.css";

interface ClientInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  width?: number;
  height?: number;
  closeRight?: number;
  closeTop?: number;
  contentClassName?: string;
  geometry?:
    | "default"
    | "consultation"
    | "supplier"
    | "handbook"
    | "clientPartnership"
    | "testimonials";
}

const ClientInfoModal = ({
  isOpen,
  onClose,
  children,
  width = 1866,
  height = 700,
  closeRight = 48,
  closeTop = 20,
  contentClassName,
  geometry = "default",
}: ClientInfoModalProps) => {
  const [scale, setScale] = useState(1);
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const updateScale = () => {
      const mobile = window.innerWidth < 900;
      setIsMobile(mobile);
      if (mobile) {
        setScale(1);
        return;
      }

      // The dialogs are positioned on the shared 1920 × 1023 Figma canvas.
      // Scaling each dialog independently clips the right-hand slant on
      // shorter or wider dialogs, so scale the whole canvas instead.
      const computedScale = Math.min(
        1,
        window.innerWidth / 1920,
        window.innerHeight / 1023,
      );
      setScale(computedScale);
    };

    updateScale();
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, [width, height]);

  useEffect(() => {
    if (!isOpen) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }
      if (event.key !== "Tab") return;

      const focusable = dialogRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (!focusable?.length) {
        event.preventDefault();
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
      previouslyFocused?.focus();
    };
  }, [isOpen, onClose]);

  if (!isOpen || !mounted) return null;

  return createPortal(
    <div className={styles.overlay} role="presentation">
      <button
        type="button"
        className={styles.backdropClose}
        onClick={onClose}
        aria-label="Close dialog backdrop"
      />
      <div
        ref={dialogRef}
        className={styles.stage}
        role="dialog"
        aria-modal="true"
        aria-label="Information dialog"
        style={
          {
            "--modal-width": `${width}px`,
            "--modal-height": `${height}px`,
            "--modal-scale": scale,
            "--modal-left": `${
              geometry === "testimonials"
                ? 31
                : geometry === "clientPartnership"
                  ? 23
                  : 19
            }px`,
            "--modal-top": `${
              geometry === "testimonials"
                ? 198
                : geometry === "clientPartnership"
                  ? 138
                  : 161
            }px`,
          } as React.CSSProperties
        }
      >
        <div className={styles.modalWindow}>
          {/* Background SVG matching Figma Vector 7376 */}
          {!isMobile && (
            <img
              src="/images/client-partnerships/dialog-surface.svg"
              alt=""
              className={styles.backgroundVector}
              aria-hidden="true"
            />
          )}

          {/* Close button inside modal at Figma exact coordinates */}
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            className={styles.closeButton}
            style={
              !isMobile
                ? { right: `${closeRight}px`, top: `${closeTop}px` }
                : undefined
            }
            aria-label="Close modal"
          >
            <svg
              className={styles.closeIcon}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          {/* Modal Content */}
          <div className={`${styles.contentViewport} ${contentClassName ?? ""}`}>
            {children}
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
};

export default ClientInfoModal;
