"use client";

import type React from "react";
import styles from "./Vector7366.module.css";

export interface Vector7366Props {
  value: string;
  onChange: (value: string) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
  inputRef?: React.RefObject<HTMLInputElement | null>;
  variant?: "figmaCanvas" | "responsive";
  className?: string;
  placeholder?: string;
  micIconSrc?: string;
  micScale?: number;
}

/**
 * Vector 7366 / "Let's Talk Energy" Figma CTA Button
 * Canonical Figma Node: 7080:56395 (Group 1171276641)
 *
 * Features:
 * - Exact 418×52px parallelogram shape with glowing gradient border (Figma Vector 7366)
 * - Semi-transparent white backdrop with blur
 * - High-contrast italic Montserrat "Let's Talk Energy" prompt styling
 * - Microphone icon with proper inner clearance (never touches border)
 */
export const Vector7366: React.FC<Vector7366Props> = ({
  value,
  onChange,
  onKeyDown,
  onSubmit,
  inputRef,
  variant = "figmaCanvas",
  className = "",
  placeholder = "Let's Talk Energy",
  micIconSrc = "/images/mike.svg",
  micScale = 1,
}) => {
  if (variant === "figmaCanvas") {
    return (
      <div className={`${styles.canvasContainer} ${className}`}>
        {/* Background glow and slanted parallelogram vector */}
        <img
          src="/images/letstalkenergy.png"
          alt=""
          draggable={false}
          className={styles.canvasBgImage}
        />

        {/* Input prompt */}
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={onKeyDown}
          placeholder={placeholder}
          aria-label={placeholder}
          className={styles.canvasInput}
        />

        {/* Microphone action button */}
        <button
          type="button"
          aria-label="Send prompt"
          onClick={onSubmit}
          className={styles.canvasMicButton}
        >
          <img
            src={micIconSrc}
            alt="Send message"
            className={styles.canvasMicIcon}
            style={{ transform: `scale(${micScale})` }}
          />
        </button>
      </div>
    );
  }

  // Standard responsive viewport floating trigger
  return (
    <div className={`${styles.responsiveContainer} ${className}`}>
      {/* Background glow and slanted parallelogram vector */}
      <img
        src="/images/letstalkenergy.png"
        alt=""
        draggable={false}
        className={styles.responsiveBgImage}
      />

      {/* Input prompt */}
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={onKeyDown}
        placeholder={placeholder}
        aria-label={placeholder}
        className={styles.responsiveInput}
      />

      {/* Microphone action button */}
      <button
        type="button"
        aria-label="Send prompt"
        onClick={onSubmit}
        className={styles.responsiveMicButton}
      >
        <img
          src={micIconSrc}
          alt="Send message"
          className={styles.responsiveMicIcon}
          style={{ transform: `scale(${micScale})` }}
        />
      </button>
    </div>
  );
};

export default Vector7366;
