"use client";

import React from "react";
import GridIntelInfoModal from "./GridIntelInfoModal";
import SlantedCardImage from "./SlantedCardImage";
import styles from "./GridIntelModalContent.module.css";

interface ProductIntegrationItem {
  icon?: string;
  title?: string;
  text?: string;
  description?: string;
}

interface ProductIntegrationData {
  image?: {
    alt?: string;
    src?: string;
  };
  items?: ProductIntegrationItem[];
  title?: string;
  tagline?: string;
  subtitle?: string;
  description?: string;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  data?: ProductIntegrationData;
}

const LOCAL_PRODUCT_IMAGE = "/images/grid-intel/product-integration.png";

const DEFAULT_INTEGRATIONS = [
  "GREEN SunShine systems",
  "GREEN Em’Pawa hybrid energy platforms",
  "Custom-engineered microgrids and EPCM solutions",
];

const PRODUCT_OFFSETS = [0, -31, -64];

export default function Product({ isOpen, onClose, data }: Props) {
  if (!isOpen) return null;

  const integrationList = data?.items?.length
    ? data.items.map((item) => item.title || item.text || "")
    : DEFAULT_INTEGRATIONS;

  const title = data?.title || "Product Integration";
  const subtitle =
    data?.subtitle || "GRID-INTEL™ is fully integrated with.";

  const footerQuote = data?.tagline ? (
    <>
      <span className={styles.greenHighlight}>GRID-INTEL™</span>{" "}
      {data.tagline.replace(/^GRID-INTEL™\s*/i, "")}
    </>
  ) : (
    <>
      <span className={styles.greenHighlight}>GRID-INTEL™</span> turns
      distributed power systems into orchestrated, intelligent infrastructure.
    </>
  );

  return (
    <GridIntelInfoModal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      subtitle={subtitle}
      footerQuote={footerQuote}
    >
      <div className={styles.productLayout}>
        <div className={styles.productList}>
          {integrationList.map((text, idx) => (
            <div
              key={`product-item-${idx}-${text}`}
              className={styles.bulletItem}
              style={{
                transform: `translateX(${PRODUCT_OFFSETS[idx] ?? -idx * 25}px)`,
              }}
            >
              <img
                src="/images/grid-intel/lighting.png"
                alt=""
                className={styles.boltIcon}
                loading="lazy"
                decoding="async"
                width={57}
                height={57}
              />

              <p className={styles.productBulletText}>{text}</p>
            </div>
          ))}
        </div>

        <SlantedCardImage
          src={data?.image?.src}
          fallbackSrc={LOCAL_PRODUCT_IMAGE}
          alt={data?.image?.alt || "Product Integration"}
        />
      </div>
    </GridIntelInfoModal>
  );
}
