"use client";

import Link from "next/link";
import { useState } from "react";
import styles from "./Expertise.module.css";

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
  // Figma node 7077:3970 opens with the water-tank facility at the front.
  // The remaining images are deliberately layered behind it.
  const [activeImage, setActiveImage] = useState(1);
  const changeImage = (direction: 1 | -1) => {
    setActiveImage(
      (image) => (image + direction + images.length) % images.length,
    );
  };

  const image = images[activeImage];

  return (
    <section className={styles.healthcareDetail} data-node-id={nodeId}>
      <img
        loading="lazy"
        decoding="async"
        className={styles.detailWatermark}
        src="/images/expertise/SOLUTIONS.png"
        alt=""
        aria-hidden="true"
      />

      <div className={styles.detailMedia}>
        <div className={styles.detailImageStack} aria-hidden="true">
          <img
            loading="lazy"
            decoding="async"
            src={images[(activeImage + 2) % images.length].src}
            alt=""
            className={styles.detailStackBack}
          />
          <img
            loading="lazy"
            decoding="async"
            src={images[(activeImage + 1) % images.length].src}
            alt=""
            className={styles.detailStackMiddle}
          />
        </div>

        <img
          loading="lazy"
          decoding="async"
          key={`${image.src}-backing`}
          className={styles.detailMainBacking}
          src={image.src}
          alt=""
          aria-hidden="true"
        />

        <img
          className={styles.detailMainImage}
          src={image.src}
          alt={image.alt}
        />

        <div className={styles.detailArrows}>
          <button
            type="button"
            onClick={() => changeImage(-1)}
            aria-label={`Previous ${highlightedTitle.toLowerCase()} image`}
          >
            <img
              loading="lazy"
              decoding="async"
              src="/images/expertise/leftarrow.svg"
              alt=""
            />
          </button>
          <button
            type="button"
            onClick={() => changeImage(1)}
            aria-label={`Next ${highlightedTitle.toLowerCase()} image`}
          >
            <img
              loading="lazy"
              decoding="async"
              src="/images/expertise/rightarrow.svg"
              alt=""
            />
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
            <img
              loading="lazy"
              decoding="async"
              src={activeCategoryImage}
              alt=""
            />
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
    </section>
  );
}
