"use client";

import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import styles from "./TechInfoModal.module.css";

export interface BulletItem {
  text: string;
  prefix?: string;
  highlight?: string;
}

export interface TechInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  titleDash?: string;
  subtitle?: string;
  imageSide?: "left" | "right";
  imageSrc: string;
  imageAlt?: string;
  bullets?: BulletItem[];
  quote?: string;
  className?: string;
}

export default function TechInfoModal({
  isOpen,
  onClose,
  title,
  titleDash,
  subtitle = "We co-create value with clients through a model that emphasizes",
  imageSide = "right",
  imageSrc,
  imageAlt,
  bullets = [],
  quote = "“Our goal : Build a future-proof ecosystem that outperforms today’s limitations.”",
  className = "",
}: TechInfoModalProps) {
  const [scale, setScale] = useState(1);
  const [mounted, setMounted] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

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

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen, onClose]);

  if (!isOpen || !mounted) return null;

  const imageElement = (
    <div
      className={
        imageSide === "left"
          ? styles.imageContainerLeft
          : styles.imageContainerRight
      }
    >
      <img
        src={imageSrc}
        alt={imageAlt || title}
        className={styles.modalImage}
        loading="lazy"
        decoding="async"
      />
    </div>
  );

  const bulletsElement = (
    <div
      className={
        imageSide === "left" ? styles.bulletsRight : styles.bulletsLeft
      }
    >
      {bullets.map((b, idx) => (
        <div key={idx} className={styles.bulletRow}>
          <img
            src="/images/technology-innovation-alliances/modal_bolt.png"
            alt=""
            className={styles.bulletIcon}
            aria-hidden="true"
          />
          <div className={styles.bulletText}>
            {b.prefix && (
              <span className={styles.bulletPrefix}>{b.prefix} </span>
            )}
            <span>{b.text}</span>
            {b.highlight && (
              <span className={styles.gridIntelGreen}>{b.highlight}</span>
            )}
          </div>
        </div>
      ))}
    </div>
  );

  return createPortal(
    <div className={styles.overlay} role="presentation">
      <button
        type="button"
        className={styles.backdrop}
        onClick={onClose}
        aria-label="Close dialog overlay"
      />
      <section
        className={`${styles.stage} ${className}`}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        style={{ "--modal-scale": scale } as React.CSSProperties}
      >
        <div className={styles.modal}>
          {/* Exact Figma Vector 7376 frame with SVG gradient border */}
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
                id="techModalBorderGrad"
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
              d="M 304.84 0 H 1866.2 L 1508.74 699.6 L 0 691.02 Z"
              fill="#ffffff"
              stroke="url(#techModalBorderGrad)"
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
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
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
                        <React.Fragment key={i}>
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

          {subtitle && <p className={styles.subtitle}>{subtitle}</p>}

          <div className={styles.divider} aria-hidden="true" />

          <div className={styles.bodyArea}>
            {imageSide === "left" ? (
              <>
                {imageElement}
                {bulletsElement}
              </>
            ) : (
              <>
                {bulletsElement}
                {imageElement}
              </>
            )}
          </div>

          {quote && (
            <div className={styles.quoteRow}>
              <p className={styles.quoteText}>{quote}</p>
            </div>
          )}
        </div>
      </section>
    </div>,
    document.body,
  );
}
