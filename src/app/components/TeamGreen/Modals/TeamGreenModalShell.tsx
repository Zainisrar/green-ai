"use client";

import React, {
  type ReactNode,
  useEffect,
  useEffectEvent,
  useRef,
} from "react";
import styles from "./TeamGreenModalShell.module.css";

interface TeamGreenModalShellProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  headline?: string;
  quoteText?: string;
  quoteHighlight?: string;
  children: ReactNode;
  contentClassName?: string;
  bodyClassName?: string;
  cardClassName?: string;
}

export default function TeamGreenModalShell({
  isOpen,
  onClose,
  title,
  headline,
  quoteText,
  quoteHighlight,
  children,
  contentClassName = "",
  bodyClassName = "",
  cardClassName = "",
}: TeamGreenModalShellProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const previouslyFocusedElement = useRef<HTMLElement | null>(null);
  const handleClose = useEffectEvent(onClose);

  useEffect(() => {
    if (!isOpen) return;

    previouslyFocusedElement.current =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;

    const focusDialog = requestAnimationFrame(() => {
      dialogRef.current
        ?.querySelector<HTMLElement>(
          'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
        )
        ?.focus();
    });

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        handleClose();
        return;
      }

      if (event.key !== "Tab") return;

      const focusableElements =
        dialogRef.current?.querySelectorAll<HTMLElement>(
          'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
        );
      if (!focusableElements?.length) {
        event.preventDefault();
        dialogRef.current?.focus();
        return;
      }

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];
      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      cancelAnimationFrame(focusDialog);
      document.removeEventListener("keydown", handleKeyDown);
      previouslyFocusedElement.current?.focus();
    };
  }, [isOpen]);

  if (!isOpen) return null;

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

  return (
    <div className={styles.overlay}>
      <div
        ref={dialogRef}
        className={`${styles.modalCard} ${cardClassName}`.trim()}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        tabIndex={-1}
      >
        {/* Slanted Card SVG Background matching Figma */}
        <svg
          className={styles.bgSvg}
          viewBox="0 0 1866 700"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <defs>
            <linearGradient
              id="teamGreenModalBorderGrad"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="#23B14D" stopOpacity="0.75" />
              <stop offset="100%" stopColor="#FFFE50" stopOpacity="0.75" />
            </linearGradient>
          </defs>
          <path
            d="M265 1.5H1864.5L1600.5 698.5H1.5L265 1.5Z"
            fill="#FFFFFF"
            stroke="url(#teamGreenModalBorderGrad)"
            strokeWidth="3"
          />
        </svg>

        {/* Top-Right Close Button matching Figma */}
        <button
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

        {/* Content */}
        <div className={`${styles.contentWrap} ${contentClassName}`.trim()}>
          <div className={styles.header}>
            <h2 className={styles.title}>{title}</h2>
            {headline ? (
              <div className={styles.headlineRow}>
                <span className={styles.dash}>-</span>
                <span className={styles.headlineText}>
                  {headline.replace(/^-\s*/, "")}
                </span>
              </div>
            ) : null}
            <div className={styles.divider} />
          </div>

          <div className={`${styles.body} ${bodyClassName}`.trim()}>
            {children}
          </div>

          {quoteText ? (
            <div className={styles.quoteContainer}>{renderQuote()}</div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
