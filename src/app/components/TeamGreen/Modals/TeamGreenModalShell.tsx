"use client";

import React, {
  type ReactNode,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import styles from "./TeamGreenModalShell.module.css";

interface TeamGreenModalShellProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  headline?: string;
  quoteText?: string;
  quoteHighlight?: string;
  children: ReactNode;
  bodyClassName?: string;
  cardClassName?: string;
  layout?: "whoWeAre" | "leadership" | "team" | "culture";
  width?: number;
  height?: number;
}

interface ModalGeometry {
  width: number;
  height: number;
  path: string;
  viewBox: string;
}

const MODAL_CONFIGS: Record<string, ModalGeometry> = {
  team: {
    width: 1906,
    height: 801,
    path: "M 374.93 0 H 1906.18 L 1531.25 801 H 0 Z",
    viewBox: "0 0 1906.2 801",
  },
  culture: {
    width: 1665,
    height: 691,
    path: "M 323.44 0 H 1665.0 L 1341.56 691 H 0 Z",
    viewBox: "0 0 1665 691",
  },
  leadership: {
    width: 1866,
    height: 691,
    path: "M 323.44 0 H 1866.18 L 1542.74 691 H 0 Z",
    viewBox: "0 0 1866.2 691",
  },
  whoWeAre: {
    width: 1866,
    height: 691,
    path: "M 323.44 0 H 1866.18 L 1542.74 691 H 0 Z",
    viewBox: "0 0 1866.2 691",
  },
};

export default function TeamGreenModalShell({
  isOpen,
  onClose,
  title,
  headline,
  quoteText,
  quoteHighlight,
  children,
  bodyClassName = "",
  cardClassName = "",
  layout,
  width: customWidth,
  height: customHeight,
}: TeamGreenModalShellProps) {
  const config = (layout && MODAL_CONFIGS[layout]) || {
    width: customWidth || 1866,
    height: customHeight || 700,
    path: "M 323.44 0 H 1866.18 L 1542.74 691 H 0 Z",
    viewBox: "0 0 1866.2 691",
  };

  const modalWidth = config.width;
  const modalHeight = config.height;

  const [scale, setScale] = useState(1);
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previouslyFocusedRef = useRef<HTMLElement | null>(null);
  const borderGradId = useId();

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

      // Responsive scale based on viewport dimensions
      const availableWidth = window.innerWidth - 48;
      const availableHeight = window.innerHeight - 48;
      const computedScale = Math.min(
        1,
        availableWidth / modalWidth,
        availableHeight / modalHeight,
      );
      setScale(Math.max(0.35, computedScale));
    };

    updateScale();
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, [modalWidth, modalHeight]);

  // Manage body scroll lock independently
  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  // Manage focus and keyboard trap
  useEffect(() => {
    if (!isOpen) return;

    previouslyFocusedRef.current = document.activeElement as HTMLElement | null;
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
      if (previouslyFocusedRef.current?.isConnected) {
        previouslyFocusedRef.current.focus();
      }
    };
  }, [isOpen, onClose]);

  const renderQuote = () => {
    if (!quoteText) return null;
    if (!quoteHighlight) {
      return <p className={styles.quoteText}>{quoteText}</p>;
    }
    const highlightTerms = quoteHighlight.trim().split(/\s+/);
    const pattern = highlightTerms
      .map((term) => term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
      .join("|");
    const parts = quoteText.split(new RegExp(`(${pattern})`, "gi"));
    return (
      <p className={styles.quoteText}>
        {parts.map((part, idx) => {
          const isHighlight = highlightTerms.some(
            (term) => part.toLowerCase() === term.toLowerCase(),
          );
          return isHighlight ? (
            // biome-ignore lint/suspicious/noArrayIndexKey: parts from string split
            <span key={`${part}-${idx}`} className={styles.greenHighlight}>
              {part}
            </span>
          ) : (
            // biome-ignore lint/suspicious/noArrayIndexKey: parts from string split
            <React.Fragment key={`${part}-${idx}`}>{part}</React.Fragment>
          );
        })}
      </p>
    );
  };

  // Portals must not be added until the component is mounted and explicitly
  // opened. Without this guard, every Team GREEN dialog renders on page load
  // and the later dialogs stack on top of the page.
  if (!mounted || !isOpen) return null;

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
        className={`${styles.stage} ${cardClassName}`.trim()}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        style={
          {
            "--modal-width": `${modalWidth}px`,
            "--modal-height": `${modalHeight}px`,
            "--modal-scale": scale,
          } as React.CSSProperties
        }
      >
        <div
          className={`${styles.modalWindow} ${layout ? styles[layout] : ""}`.trim()}
        >
          {/* Slanted Parallelogram SVG Background matching Figma */}
          {!isMobile && (
            <svg
              className={styles.bgSvg}
              viewBox={config.viewBox}
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <defs>
                <linearGradient
                  id={borderGradId}
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="#23B14D" stopOpacity="0.75" />
                  <stop offset="100%" stopColor="#FFFE50" stopOpacity="0.75" />
                </linearGradient>
              </defs>
              <path
                d={config.path}
                fill="#FFFFFF"
                stroke={`url(#${borderGradId})`}
                strokeWidth="3"
                vectorEffect="non-scaling-stroke"
              />
            </svg>
          )}

          {/* Top-Right Close Button matching Figma */}
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            className={styles.closeBtn}
            aria-label="Close modal"
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          {/* Header */}
          <header className={styles.header}>
            <div className={styles.titleRow}>
              <h2 className={styles.title}>{title}</h2>
              {headline ? (
                <span className={styles.headlineText}>
                  {headline.startsWith("-") ? headline : `- ${headline}`}
                </span>
              ) : null}
            </div>
          </header>

          {/* Gradient Divider */}
          <div className={styles.divider} aria-hidden="true" />

          {/* Body */}
          <div className={`${styles.bodyArea} ${bodyClassName}`.trim()}>
            {children}
          </div>

          {/* Bottom Quote */}
          {quoteText ? (
            <footer className={styles.footerArea}>
              <div className={styles.quoteText}>{renderQuote()}</div>
            </footer>
          ) : null}
        </div>
      </div>
    </div>,
    document.body,
  );
}
