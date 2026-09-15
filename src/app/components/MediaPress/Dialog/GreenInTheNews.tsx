"use client";

import Image from "next/image";
import MediaDialogFrame from "./MediaDialogFrame";
import styles from "./GreenInTheNews.module.css";

interface GreenInTheNewsProps {
  isOpen: boolean;
  onClose: () => void;
}

const newsRows = [
  [
    {
      id: "national-1",
      source: "The National",
      title: "GREEN Brings Solar to Remote Health Posts",
      image: "/images/media-press/easter-higherlands.png",
    },
    {
      id: "cleantech-1",
      source: "CleanTech Wire",
      title: "GRID-INTEL™ Puts PNG on the Energy Data Map",
      image: "/images/media-press/mini-grids.png",
    },
  ],
  [
    {
      id: "national-2",
      source: "The National",
      title: "GREEN Brings Solar to Remote Health Posts",
      image: "/images/media-press/easter-higherlands.png",
    },
    {
      id: "cleantech-2",
      source: "CleanTech Wire",
      title: "GRID-INTEL™ Puts PNG on the Energy Data Map",
      image: "/images/media-press/mini-grids.png",
    },
  ],
  [
    {
      id: "national-3",
      source: "The National",
      title: "GREEN Brings Solar to Remote Health Posts",
      image: "/images/media-press/easter-higherlands.png",
    },
    {
      id: "cleantech-3",
      source: "CleanTech Wire",
      title: "GRID-INTEL™ Puts PNG on the Energy Data Map",
      image: "/images/media-press/mini-grids.png",
    },
  ],
];

const rowClasses = [styles.row0, styles.row1, styles.row2];

export default function GreenInTheNews({
  isOpen,
  onClose,
}: GreenInTheNewsProps) {
  return (
    <MediaDialogFrame
      isOpen={isOpen}
      onClose={onClose}
      title="GREEN in the News"
      labelledBy="green-news-title"
    >
      <div className={styles.container}>
        <div className={styles.rowsContainer}>
          {newsRows.map((row, rowIndex) => (
            <div
              key={rowIndex}
              className={`${styles.newsRow} ${rowClasses[rowIndex] || ""}`}
            >
              {row.map((item) => (
                <article className={styles.newsItem} key={item.id}>
                  <div className={styles.imageShape}>
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 240px"
                      className={styles.img}
                    />
                  </div>
                  <div className={styles.copy}>
                    <p className={styles.source}>{item.source}</p>
                    <h3 className={styles.headline}>{item.title}</h3>
                    <button type="button" className={styles.readBtn}>
                      Read <span>›</span>
                    </button>
                  </div>
                </article>
              ))}
            </div>
          ))}
        </div>
      </div>
    </MediaDialogFrame>
  );
}
