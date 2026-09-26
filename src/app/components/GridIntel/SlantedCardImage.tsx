"use client";

import React, { useEffect, useState } from "react";
import styles from "./GridIntelModalContent.module.css";

interface SlantedCardImageProps {
  src?: string;
  fallbackSrc: string;
  alt: string;
  className?: string;
}

export default function SlantedCardImage({
  src,
  fallbackSrc,
  alt,
  className = "",
}: SlantedCardImageProps) {
  // Determine initial image source:
  // If src is missing, empty, or points to mainImg placeholder from CMS, use fallbackSrc directly
  const getInitialSrc = () => {
    if (
      !src ||
      typeof src !== "string" ||
      src.includes("mainImg.png") ||
      src.includes("mainImg") ||
      src.trim() === ""
    ) {
      return fallbackSrc;
    }
    // If it's a relative path from local public directory, keep it
    if (src.startsWith("/images/grid-intel/")) {
      return src;
    }
    // If it's a full URL, use it
    if (src.startsWith("http://") || src.startsWith("https://")) {
      return src;
    }
    return fallbackSrc;
  };

  const [currentSrc, setCurrentSrc] = useState(getInitialSrc);

  useEffect(() => {
    setCurrentSrc(getInitialSrc());
  }, [src, fallbackSrc]);

  return (
    <div className={`${styles.slantedImageContainer} ${className}`}>
      <img
        src={currentSrc}
        alt={alt}
        className={styles.slantedImg}
        loading="lazy"
        decoding="async"
        width={630}
        height={275}
        onError={() => {
          if (currentSrc !== fallbackSrc) {
            setCurrentSrc(fallbackSrc);
          }
        }}
      />
    </div>
  );
}
