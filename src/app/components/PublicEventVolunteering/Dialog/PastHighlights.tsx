"use client";

import React from "react";
import Link from "next/link";
import PublicEventModalFrame from "./PublicEventModalFrame";
import styles from "./PublicEventDialogs.module.css";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const HIGHLIGHTS = [
  {
    title: "Solar Literacy Drive",
    location: "– Eastern Highlands",
    year: "– 2024",
    image: "/images/public-events-volunteering/solar-literacy.png",
  },
  {
    title: "Women In Energy",
    location: "– Madang Installation Workshop",
    year: "– 2023",
    image: "/images/public-events-volunteering/women-in-energy.png",
  },
  {
    title: "Village Grid Demo Days",
    location: "– Milne Bay",
    year: "– 2022",
    image: "/images/public-events-volunteering/grid-demo-guys.png",
  },
  {
    title: "Plastic-To-Power Campaign",
    location: "– Port Moresby",
    year: "– 2022",
    image: "/images/public-events-volunteering/plastic-to-power-campaign.png",
  },
];

export default function PastHighlights({ isOpen, onClose }: Props) {
  return (
    <PublicEventModalFrame
      isOpen={isOpen}
      onClose={onClose}
      title="Past Highlights"
      titleDash="- Real impact, real communities across PNG:"
    >
      <div className={styles.highlightsContainer}>
        <div className={styles.highlightsRow}>
          {HIGHLIGHTS.map((item, idx) => (
            <div key={idx} className={styles.highlightVideoCard}>
              <div className={styles.videoThumbWrap}>
                <img
                  src={item.image}
                  alt={item.title}
                  className={styles.videoThumb}
                  loading="lazy"
                  decoding="async"
                />
                <button
                  type="button"
                  className={styles.playBtnOverlay}
                  aria-label={`Play ${item.title} video`}
                >
                  ▶
                </button>
                <div className={styles.videoControlsBar}>
                  <span className={styles.videoControlIcon}>|◁</span>
                  <span className={styles.videoControlIcon}>▷</span>
                  <div className={styles.videoProgressBar}>
                    <div className={styles.videoProgressFill} />
                  </div>
                  <span className={styles.videoControlIcon}>▷|</span>
                </div>
              </div>

              <div className={styles.highlightMeta}>
                <h4 className={styles.highlightTitle}>{item.title}</h4>
                <p className={styles.highlightLocation}>{item.location}</p>
                <p className={styles.highlightYear}>{item.year}</p>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.highlightsGalleryLinkWrap}>
          <Link
            href="/enlighten/events-webinars"
            className={styles.highlightsGalleryLink}
          >
            Browse the GREEN Events Gallery →
          </Link>
        </div>
      </div>
    </PublicEventModalFrame>
  );
}
