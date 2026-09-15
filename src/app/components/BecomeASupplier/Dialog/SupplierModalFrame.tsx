"use client";

import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import styles from "./SupplierModalFrame.module.css";

interface SupplierModalFrameProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  titleDash?: string;
  children: React.ReactNode;
  className?: string;
}

export default function SupplierModalFrame({
  isOpen,
  onClose,
  title,
  titleDash,
  children,
  className = "",
}: SupplierModalFrameProps) {
  const [scale, setScale] = useState(1);
  const [mounted, setMounted] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previouslyFocusedRef = useRef<HTMLElement | null>(null);
  const stageRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!isOpen || !mounted) return;

    previouslyFocusedRef.current = document.activeElement as HTMLElement | null;

    const timer = requestAnimationFrame(() => {
      closeButtonRef.current?.focus();
    });

    return () => {
      cancelAnimationFrame(timer);
      previouslyFocusedRef.current?.focus();
    };
  }, [isOpen, mounted]);

  useEffect(() => {
    if (!isOpen) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const handleResize = () => {
      if (window.innerWidth < 768) {
        setScale(1);
        return;
      }
      const availableWidth = window.innerWidth - 48;
      const availableHeight = window.innerHeight - 48;
      const computedScale = Math.min(
        1,
        availableWidth / 1866.2,
        availableHeight / 699.6,
      );
      setScale(Math.max(0.35, computedScale));
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }

      if (e.key === "Tab" && stageRef.current) {
        const focusableElements =
          stageRef.current.querySelectorAll<HTMLElement>(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
          );
        const focusable = Array.from(focusableElements).filter(
          (el) =>
            !el.hasAttribute("disabled") &&
            el.getAttribute("aria-hidden") !== "true" &&
            el.offsetParent !== null,
        );

        if (focusable.length === 0) return;

        const firstElement = focusable[0];
        const lastElement = focusable[focusable.length - 1];

        if (e.shiftKey) {
          if (
            document.activeElement === firstElement ||
            !stageRef.current.contains(document.activeElement)
          ) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (
            document.activeElement === lastElement ||
            !stageRef.current.contains(document.activeElement)
          ) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !mounted) return null;

  return createPortal(
    <div className={styles.overlay} role="presentation">
      <button
        type="button"
        className={styles.backdrop}
        onClick={onClose}
        aria-label="Close dialog overlay"
      />
      <section
        ref={stageRef}
        className={`${styles.stage} ${className}`}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        style={{ "--modal-scale": scale } as React.CSSProperties}
      >
        <div className={styles.modal}>
          {/* Vector 7376 frame with SVG gradient border */}
          <svg
            className={styles.frameSvg}
            viewBox="0 0 1866.2 699.6"
            preserveAspectRatio="none"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <defs>
              <linearGradient
                id="supplierModalBorderGrad"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#23B14D" stopOpacity="0.85" />
                <stop offset="100%" stopColor="#FFFE50" stopOpacity="0.85" />
              </linearGradient>
            </defs>
            <path
              d="M 304.84 0 H 1866.2 L 1508.74 699.6 H 0 Z"
              fill="#ffffff"
              stroke="url(#supplierModalBorderGrad)"
              strokeWidth="3"
              vectorEffect="non-scaling-stroke"
            />
          </svg>

          <button
            ref={closeButtonRef}
            type="button"
            className={styles.closeBtn}
            onClick={onClose}
            aria-label="Close dialog"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          <header className={styles.header}>
            <div className={styles.titleRow}>
              <h2 className={styles.mainTitle}>{title}</h2>
              {titleDash && (
                <span className={styles.titleDash}>
                  {titleDash.includes("GREEN") ? (
                    <>
                      {titleDash.split("GREEN").map((part, i, arr) => (
                        <React.Fragment key={`part-${i}`}>
                          {part}
                          {i < arr.length - 1 && <strong>GREEN</strong>}
                        </React.Fragment>
                      ))}
                    </>
                  ) : (
                    titleDash
                  )}
                </span>
              )}
            </div>
          </header>

          <div className={styles.divider} aria-hidden="true" />

          <div className={styles.bodyArea}>{children}</div>
        </div>
      </section>
    </div>,
    document.body,
  );
}
