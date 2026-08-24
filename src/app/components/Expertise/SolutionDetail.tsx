"use client";

import { motion, useReducedMotion } from "motion/react";
import Link from "next/link";
import { useState } from "react";
import styles from "./Expertise.module.css";

const DETAIL_SPRING = {
  type: "spring",
  mass: 1,
  stiffness: 100,
  damping: 15,
} as const;

export interface SolutionDetailImage {
  src: string;
  alt: string;
}

export interface SolutionDetailFeature {
  icon: string;
  title: string;
  description: string;
}

export interface SolutionDetailCategory {
  id: string;
  label: string;
}

interface SolutionDetailProps {
  nodeId: string;
  title: string;
  highlightedTitle: string;
  subtitle: string;
  description: string;
  images: readonly SolutionDetailImage[];
  features: readonly SolutionDetailFeature[];
  categories: readonly SolutionDetailCategory[];
  activeCategoryImage: string;
  activeCategoryLabel: string;
  startHref: string;
  onBack: () => void;
}

export default function SolutionDetail({
  nodeId,
  title,
  highlightedTitle,
  subtitle,
  description,
  images,
  features,
  categories,
  activeCategoryImage,
  activeCategoryLabel,
  startHref,
  onBack,
}: SolutionDetailProps) {
  const [activeImage, setActiveImage] = useState(0);
  const reduceMotion = useReducedMotion();

  const changeImage = (direction: 1 | -1) => {
    setActiveImage(
      (image) => (image + direction + images.length) % images.length,
    );
  };

  const image = images[activeImage];

  return (
    <motion.section
      className={styles.healthcareDetail}
      data-node-id={nodeId}
      initial={
        reduceMotion ? false : { opacity: 0, scale: 0.985, x: 24, y: 10 }
      }
      animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
      exit={
        reduceMotion
          ? { opacity: 0 }
          : { opacity: 0, scale: 0.985, x: 24, y: 10 }
      }
      transition={reduceMotion ? { duration: 0 } : DETAIL_SPRING}
    >
      <img loading="lazy" decoding="async"
        className={styles.detailWatermark}
        src="/images/expertise/SOLUTIONS.png"
        alt=""
        aria-hidden="true"
      />

      <div className={styles.detailMedia}>
        <div className={styles.detailImageStack} aria-hidden="true">
          <img loading="lazy" decoding="async"
            src={images[(activeImage + 2) % images.length].src}
            alt=""
            className={styles.detailStackBack}
          />
          <img loading="lazy" decoding="async"
            src={images[(activeImage + 1) % images.length].src}
            alt=""
            className={styles.detailStackMiddle}
          />
        </div>

        <img loading="lazy" decoding="async"
          key={`${image.src}-backing`}
          className={styles.detailMainBacking}
          src={image.src}
          alt=""
          aria-hidden="true"
        />

        <motion.img
          key={image.src}
          className={styles.detailMainImage}
          src={image.src}
          alt={image.alt}
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={reduceMotion ? { duration: 0 } : DETAIL_SPRING}
        />

        <div className={styles.detailArrows}>
          <button
            type="button"
            onClick={() => changeImage(-1)}
            aria-label={`Previous ${highlightedTitle.toLowerCase()} image`}
          >
            <img loading="lazy" decoding="async" src="/images/expertise/leftarrow.svg" alt="" />
          </button>
          <button
            type="button"
            onClick={() => changeImage(1)}
            aria-label={`Next ${highlightedTitle.toLowerCase()} image`}
          >
            <img loading="lazy" decoding="async" src="/images/expertise/rightarrow.svg" alt="" />
          </button>
        </div>

        <div className={styles.detailThumbnails}>
          {images.map((thumbnail, index) => (
            <button
              type="button"
              key={thumbnail.src}
              className={
                index === activeImage ? styles.detailThumbnailActive : undefined
              }
              onClick={() => setActiveImage(index)}
              aria-label={`Show ${highlightedTitle.toLowerCase()} image ${index + 1}`}
              aria-pressed={index === activeImage}
            >
              <img loading="lazy" decoding="async" src={thumbnail.src} alt="" />
            </button>
          ))}
        </div>
      </div>

      <div className={styles.detailContent}>
        <h1>
          {title} <span>{highlightedTitle}</span>
        </h1>
        <h2>{subtitle}</h2>
        <p className={styles.detailDescription}>{description}</p>

        <div className={styles.detailFeatures}>
          {features.map((feature) => (
            <article key={feature.title}>
              <img loading="lazy" decoding="async" src={feature.icon} alt="" />
              <div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            </article>
          ))}
        </div>

        <div className={styles.detailCategories}>
          <button
            type="button"
            className={styles.detailCategoryActive}
            onClick={onBack}
            aria-label={`Return from ${activeCategoryLabel}`}
          >
            <img loading="lazy" decoding="async" src={activeCategoryImage} alt="" />
            <span>{activeCategoryLabel}</span>
          </button>
          {categories.map((category) => (
            <button type="button" key={category.id}>
              {category.label}
            </button>
          ))}
        </div>

        <Link href={startHref} className={styles.detailStartButton}>
          Let&apos;s Start
        </Link>
      </div>
    </motion.section>
  );
}
