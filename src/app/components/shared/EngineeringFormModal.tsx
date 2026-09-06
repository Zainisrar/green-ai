"use client";

import type React from "react";
import { useEffect, useId, useRef } from "react";
import styles from "./EngineeringFormModal.module.css";

interface EngineeringFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: React.ReactNode;
  subtitle?: string;
  children: React.ReactNode;
  maxWidthClass?: string;
  /** Use the large angular window from the Book a Consultation Figma popup. */
  geometry?: "default" | "consultation" | "epcm" | "liveDemo" | "om" | "track";
  /** Decorative expand control used by the Solar EPCM Figma windows. */
  showExpandControl?: boolean;
  /** Optional custom ID for the modal */
  id?: string;
  /** Optional accessible name override */
  ariaLabel?: string;
}

const EngineeringFormModal = ({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  maxWidthClass = "max-w-5xl",
  geometry = "consultation",
  showExpandControl = false,
  id,
  ariaLabel,
}: EngineeringFormModalProps) => {
  const generatedId = useId();
  const titleId = id ? `${id}-title` : `modal-title-${generatedId.replace(/:/g, "")}`;
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const usesStandardCtaFrame =
    geometry === "consultation" && maxWidthClass === "max-w-5xl";

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

  if (!isOpen) return null;

  return (
    <div
      className={`scrollbar-hide fixed inset-0 z-[2147483647] flex items-start justify-center overflow-y-auto p-3 sm:items-center sm:p-4 ${
        geometry === "consultation" || geometry === "epcm"
          ? styles.consultationOverlay
          : "bg-black/20"
      }`}
    >
      <button
        type="button"
        className="absolute inset-0 cursor-default"
        onClick={onClose}
        aria-label="Close dialog"
      />
      <div
        ref={dialogRef}
        className={`relative z-10 my-2 sm:my-auto ${
          usesStandardCtaFrame
            ? styles.standardCtaWindow
            : geometry === "consultation"
              ? `w-full ${maxWidthClass} ${styles.consultationWindow}`
              : geometry === "epcm"
                ? `w-full ${maxWidthClass} ${styles.epcmWindow}`
                : geometry === "om"
                  ? styles.omWindow
                  : geometry === "liveDemo"
                      ? styles.liveDemoWindow
                      : geometry === "track"
                        ? styles.trackWindow
                      : `w-full ${maxWidthClass} ${styles.window}`
        }`}
        role="dialog"
        aria-modal="true"
        aria-labelledby={ariaLabel ? undefined : titleId}
        aria-label={ariaLabel}
      >
        <button
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          className={`absolute right-4 top-2 z-30 cursor-pointer p-1.5 text-gray-700 transition hover:text-gray-900 sm:right-8 sm:top-4 ${
            geometry === "epcm"
              ? styles.epcmClose
                : geometry === "om"
                  ? styles.standardCtaClose
                : geometry === "liveDemo"
                    ? styles.standardCtaClose
                    : geometry === "track"
                      ? styles.trackClose
                    : usesStandardCtaFrame
                      ? styles.standardCtaClose
                      : geometry === "consultation"
                        ? styles.standardCtaClose
                        : ""
          }`}
          aria-label="Close modal"
        >
          <img
            src={
              geometry === "track"
                ? "/images/job-openings/track-close.svg"
                : "/images/job-openings/job-query-close.svg"
            }
            alt=""
            className="h-6 w-6 sm:h-8 sm:w-8"
          />
        </button>

        {(showExpandControl ||
          geometry === "consultation" ||
          geometry === "epcm" ||
          geometry === "om" ||
          geometry === "liveDemo" ||
          geometry === "track") && (
          <span
            className={`${styles.expandControl} ${
              geometry === "track" ? styles.trackExpand : ""
            }`}
            aria-hidden="true"
          >
            <img
              src={
                geometry === "track"
                  ? "/images/job-openings/track-maximize.png"
                  : "/images/join-us/solar_maximize.png"
              }
              alt=""
            />
          </span>
        )}

        <div className="scrollbar-hide max-h-[calc(100dvh-1.5rem)] overflow-y-auto sm:max-h-[90dvh]">
          <div
            className={`relative mx-2 sm:mx-3 ${
              geometry === "consultation"
                ? usesStandardCtaFrame
                  ? styles.standardCtaPanel
                  : styles.consultationPanel
                : geometry === "epcm"
                  ? styles.epcmPanel
                  : geometry === "om"
                    ? styles.omPanel
                    : geometry === "liveDemo"
                        ? styles.liveDemoPanel
                        : geometry === "track"
                          ? styles.trackPanel
                        : ""
            }`}
          >
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 rounded-lg border border-lime-300 bg-[#eff5f1] shadow-2xl"
            />
            <div
              className={`relative z-10 min-w-0 px-6 py-8 pr-12 sm:px-12 sm:py-12 sm:pr-16 lg:px-14 lg:pr-20 ${
                geometry === "epcm"
                  ? styles.epcmContent
                  : geometry === "om"
                    ? styles.omContent
                    : geometry === "liveDemo"
                        ? styles.liveDemoContent
                        : geometry === "track"
                          ? styles.trackContent
                        : usesStandardCtaFrame
                          ? styles.standardCtaContent
                          : ""
              }`}
            >
              <div className="mb-5 sm:mb-6">
                <h2
                  id={titleId}
                  className="text-xl font-black leading-tight text-gray-800 sm:text-2xl lg:text-3xl"
                >
                  {title}
                </h2>
                {subtitle && (
                  <p className="mt-2 text-sm font-semibold italic text-[#23B14D] sm:text-base lg:text-lg">
                    {subtitle}
                  </p>
                )}
              </div>
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const formFieldClass = `w-full min-w-0 border border-gray-300 px-3 py-2.5 text-sm text-gray-700 placeholder-gray-500 focus:border-green-500 focus:outline-none sm:px-4 sm:py-3 sm:text-base ${styles.sharedFormField}`;

export const formGridClass =
  "grid grid-cols-1 gap-y-4 sm:gap-y-6 md:grid-cols-2 md:gap-x-10";

export const captchaRowClass =
  "flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between";

export const captchaInputGroupClass =
  "flex min-w-0 flex-col gap-3 sm:flex-row sm:items-center sm:gap-4";

export default EngineeringFormModal;
