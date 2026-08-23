"use client";

import type React from "react";
import { useEffect, useRef } from "react";
import enquiryStyles from "@/app/components/shared/EngineeringFormModal.module.css";
import styles from "./ClientInfoModal.module.css";

interface ClientInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  maxWidthClass?: string;
  geometry?: "default" | "consultation";
}

const ClientInfoModal = ({
  isOpen,
  onClose,
  children,
  maxWidthClass = "max-w-6xl",
  geometry = "consultation",
}: ClientInfoModalProps) => {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

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
  const widthClass =
    geometry === "consultation"
      ? "max-w-none sm:w-[calc(100vw-3rem)]"
      : maxWidthClass;

  return (
    <div
      className={`scrollbar-hide fixed inset-0 z-[2147483647] flex items-start justify-center overflow-y-auto p-3 sm:items-center sm:p-4 ${
        geometry === "consultation"
          ? enquiryStyles.consultationOverlay
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
        className={`relative z-10 my-2 w-full ${widthClass} sm:my-auto ${
          geometry === "consultation"
            ? enquiryStyles.consultationWindow
            : enquiryStyles.window
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Information dialog"
      >
        <button
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          className="absolute right-4 top-2 z-30 cursor-pointer p-1.5 text-gray-700 transition hover:text-gray-900 sm:right-8 sm:top-4"
          aria-label="Close modal"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 sm:h-8 sm:w-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 6l12 12M18 6L6 18"
            />
          </svg>
        </button>

        <div className="scrollbar-hide max-h-[calc(100dvh-1.5rem)] overflow-y-auto sm:max-h-[90dvh]">
          <div
            className={`relative mx-2 border-2 border-[#4CAF50] bg-white px-6 py-10 pr-12 shadow-2xl sm:mx-3 sm:px-12 sm:py-12 sm:pr-16 lg:px-16 lg:pr-20 ${
              geometry === "consultation" ? styles.enquiryPanel : "rounded-lg"
            }`}
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientInfoModal;
