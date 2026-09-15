"use client";

import Image from "next/image";
import styles from "./LatestPressReleases.module.css";
import MediaDialogFrame from "./MediaDialogFrame";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const releases = [
  {
    id: "grid",
    title: "GREEN Launches GRID-INTEL™ in Eastern Highlands",
    date: "10 July 2025",
    image: "/images/media-press/easter-higherlands.png",
  },
  {
    id: "mou",
    title: "MoU Signed with Dept. of Energy for 200 Mini-Grids",
    date: "28 June 2025",
    image: "/images/media-press/mini-grids.png",
  },
  {
    id: "battery",
    title: "GREEN Expands Battery Deployment with New Global Partner",
    date: "01 June 2025",
    image: "/images/media-press/global-partner.png",
  },
];

export default function LatestPressReleases({ isOpen, onClose }: Props) {
  return (
    <MediaDialogFrame
      isOpen={isOpen}
      onClose={onClose}
      title="Latest Press Releases"
      labelledBy="latest-press-title"
    >
      <div className={styles.container}>
        <div className={styles.cardsRow}>
          {releases.map((release) => (
            <article className={styles.card} key={release.id}>
              {/* Image with decorative angled brackets */}
              <div className={styles.imageWrapper}>
                <img
                  src="/images/media-press/card-bracket-tr.svg"
                  alt=""
                  aria-hidden="true"
                  className={styles.bracketTr}
                />
                <img
                  src="/images/media-press/card-bracket-bl.svg"
                  alt=""
                  aria-hidden="true"
                  className={styles.bracketBl}
                />
                <div className={styles.imageShape}>
                  <Image
                    src={release.image}
                    alt={release.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 367px"
                    className={styles.img}
                  />
                </div>
              </div>

              {/* Title */}
              <h3 className={styles.cardTitle}>{release.title}</h3>

              {/* Date & Button */}
              <div className={styles.metaRow}>
                <span className={styles.date}>
                  <img
                    src="/images/media-press/calendar.png"
                    alt=""
                    aria-hidden="true"
                    className={styles.calendarIcon}
                  />
                  {release.date}
                </span>

                <button type="button" className={styles.readMoreBtn}>
                  Read more ›
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* Bottom-right link */}
        <button type="button" className={styles.viewAllBtn}>
          View All Press Releases <span>›</span>
        </button>
      </div>
    </MediaDialogFrame>
  );
}
