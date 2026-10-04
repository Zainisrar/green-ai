"use client";

import Image from "next/image";
import type React from "react";
import ClientInfoModal from "@/app/components/ClientPartnerships/Dialog/ClientInfoModal";
import type { CollaborationInnovationOurPhilosophy } from "../../../lib/api";
import styles from "./CollaborationDialogs.module.css";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  data?: CollaborationInnovationOurPhilosophy;
}

const defaultKeys = [
  "Remote-ready technologies",
  "Resilient off-grid and microgrid systems",
  "Low-cost scalable storage",
  "AI-enabled smart grid analytics",
  "Climate-adaptive solar architecture",
];

const OurPhilosophy = ({ isOpen, onClose, data }: Props) => {
  const title = data?.title ?? "Our Philosophy";
  const subHeadline =
    data?.subHeadline ?? "“We don’t chase trends. We co-create breakthroughs.”";
  const keys = data?.keys ?? defaultKeys;
  const imgSrc =
    data?.img?.src ??
    "/images/collaboration-innovation/our-philosophy-model.png";
  const imgAlt = data?.img?.alt ?? "Solar Installation";
  const description =
    data?.description?.text ??
    "GREEN’s innovation model is built on trust, experimentation, and field-tested ingenuity. We pursue partnerships that yield measurable results — not just prototypes or press releases.";

  const renderDescription = (text: string, highlight?: string) => {
    const target = (highlight || "GREEN’s").trim();
    const pattern = target.replace(/['’]/g, "['’]");
    const regex = new RegExp(`(${pattern}|GREEN[’']?s?|GREEN)`, "i");
    const parts = text.split(regex);
    return parts.map((part, idx) => {
      const lower = part.toLowerCase();
      if (
        lower === target.toLowerCase() ||
        lower === "green's" ||
        lower === "green’s" ||
        lower === "green"
      ) {
        return (
          <span key={idx} className={styles.philosophyGreen}>
            {part}
          </span>
        );
      }
      return part;
    });
  };

  return (
    <ClientInfoModal isOpen={isOpen} onClose={onClose}>
      <div className={styles.philosophyWrapper}>
        <header className={styles.dialogHeader}>
          <h2 className={styles.dialogTitle}>{title}</h2>
          <p className={styles.dialogSubtitle}>- {subHeadline}</p>
        </header>

        <p className={styles.philosophyIntro}>
          {renderDescription(description, data?.description?.highlighted)}
        </p>

        <div className={styles.philosophyBody}>
          <div className={styles.philosophyList}>
            {keys.map((k, idx) => {
              const offsets = [30, 7, -13, -36, -61];
              const offset = offsets[idx] ?? 30 - idx * 23;
              return (
                <div
                  key={idx}
                  className={styles.philosophyItem}
                  style={
                    { "--item-offset": `${offset}px` } as React.CSSProperties
                  }
                >
                  <Image
                    src="/images/collaboration-innovation/bolt.png"
                    alt=""
                    width={42}
                    height={50}
                    className={styles.boltIcon}
                    aria-hidden="true"
                  />
                  <span className={styles.philosophyText}>{k}</span>
                </div>
              );
            })}
          </div>

          <div className={styles.philosophyImageWrapper}>
            <img
              loading="lazy"
              decoding="async"
              src={imgSrc}
              alt={imgAlt}
              className={styles.philosophyImage}
            />
          </div>
        </div>
      </div>
    </ClientInfoModal>
  );
};

export default OurPhilosophy;
