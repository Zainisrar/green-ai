"use client";

import type { CSSProperties, ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import styles from "./HandbookModalFrame.module.css";

type Variant = "ethos" | "conduct" | "procurement";

const FRAME = {
  ethos: {
    width: 1866.185,
    height: 699.575,
    leftInset: 304.84,
    rightInset: 357.45,
  },
  conduct: {
    width: 1835.185,
    height: 601.575,
    leftInset: 273,
    rightInset: 326,
  },
  procurement: {
    width: 1826.185,
    height: 579.575,
    leftInset: 273,
    rightInset: 326,
  },
} as const;

interface HandbookModalFrameProps {
  isOpen: boolean;
  onClose: () => void;
  variant: Variant;
  children: ReactNode;
  label: string;
}

/** Exact Figma Vector 7376 frame used by the supplier handbook dialogs. */
export default function HandbookModalFrame({
  isOpen,
  onClose,
  variant,
  children,
  label,
}: HandbookModalFrameProps) {
  const [mounted, setMounted] = useState(false);
  const [scale, setScale] = useState(1);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previouslyFocusedRef = useRef<HTMLElement | null>(null);
  const stageRef = useRef<HTMLElement>(null);
  const frame = FRAME[variant];

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!isOpen || !mounted) return;

    previouslyFocusedRef.current = document.activeElement as HTMLElement | null;
    const frameId = requestAnimationFrame(() =>
      closeButtonRef.current?.focus(),
    );

    return () => {
      cancelAnimationFrame(frameId);
      previouslyFocusedRef.current?.focus();
    };
  }, [isOpen, mounted]);

  useEffect(() => {
    if (!isOpen) return;

    const updateScale = () => {
      setScale(
        Math.min(
          1,
          (window.innerWidth - 36) / frame.width,
          (window.innerHeight - 36) / frame.height,
        ),
      );
    };
    const previousOverflow = document.body.style.overflow;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }

      if (event.key !== "Tab" || !stageRef.current) return;

      const focusable = Array.from(
        stageRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
        ),
      ).filter(
        (element) =>
          !element.hasAttribute("disabled") &&
          element.getAttribute("aria-hidden") !== "true" &&
          element.offsetParent !== null,
      );

      if (focusable.length === 0) return;

      const firstElement = focusable[0];
      const lastElement = focusable[focusable.length - 1];
      const activeElement = document.activeElement;

      if (event.shiftKey) {
        if (
          activeElement === firstElement ||
          !stageRef.current.contains(activeElement)
        ) {
          event.preventDefault();
          lastElement.focus();
        }
      } else if (
        activeElement === lastElement ||
        !stageRef.current.contains(activeElement)
      ) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    updateScale();
    document.body.style.overflow = "hidden";
    window.addEventListener("resize", updateScale);
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("resize", updateScale);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [frame.height, frame.width, isOpen, onClose]);

  if (!isOpen || !mounted) return null;

  const frameStyle = {
    "--frame-scale": scale,
    "--frame-width": `${frame.width}px`,
    "--frame-height": `${frame.height}px`,
  } as CSSProperties;

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
        className={styles.stage}
        style={frameStyle}
        role="dialog"
        aria-modal="true"
        aria-label={label}
      >
        <div className={styles.frame}>
          <svg
            className={styles.vector}
            viewBox={`0 0 ${frame.width} ${frame.height}`}
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <defs>
              <linearGradient
                id={`handbook-border-${variant}`}
                x1="0"
                y1="0"
                x2="1"
                y2="1"
              >
                <stop offset="0" stopColor="#23b14d" />
                <stop offset="1" stopColor="#fffe50" />
              </linearGradient>
            </defs>
            <path
              d={`M ${frame.leftInset} 0 H ${frame.width} L ${frame.width - frame.rightInset} ${frame.height} H 0 Z`}
              fill="#fff"
              stroke={`url(#handbook-border-${variant})`}
              strokeWidth="3"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
          <button
            ref={closeButtonRef}
            type="button"
            className={styles.close}
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
                d="M6 6l12 12M18 6 6 18"
                strokeLinecap="round"
                strokeWidth="2"
              />
            </svg>
          </button>
          <div
            className={`${styles.content} ${
              variant === "conduct" ? styles.conductContent : ""
            } ${variant === "procurement" ? styles.procurementContent : ""}`}
          >
            {children}
          </div>
        </div>
      </section>
    </div>,
    document.body,
  );
}
