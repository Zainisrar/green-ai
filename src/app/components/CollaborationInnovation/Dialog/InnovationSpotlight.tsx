"use client";

import Image from "next/image";
import type React from "react";
import ClientInfoModal from "@/app/components/ClientPartnerships/Dialog/ClientInfoModal";
import type { CollaborationInnovationSpotlight } from "../../../lib/api";
import styles from "./CollaborationDialogs.module.css";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  data?: CollaborationInnovationSpotlight;
}

const defaultKeys = [
  {
    title: "GRID-INTEL™",
    description:
      "Built in-house. Made for Pacific realities. Smart grid intelligence with real-time monitoring, predictive diagnostics, and interoperable architecture.",
  },
  {
    title: "Modular Microgrid Kits",
    description:
      "Rapid deployment kits engineered for island and rural electrification — scalable, smart, and robust.",
  },
  {
    title: "Community-Tied Energy Business Models",
    description:
      "Pilots with built-in economic uplift models (co-ops, productive use case layering, mobile billing integration)",
  },
];

const InnovationSpotlight = ({ isOpen, onClose, data }: Props) => {
  const title = data?.title ?? "Innovation Spotlight";
  const keys = data?.keys ?? defaultKeys;

  return (
    <ClientInfoModal isOpen={isOpen} onClose={onClose} height={570}>
      <div className={styles.spotlightWrapper}>
        <header className={styles.dialogHeader}>
          <h2 className={styles.dialogTitle}>{title}</h2>
        </header>

        <div className={styles.spotlightList}>
          {keys.map((k, idx) => {
            const offsets = [0, -55, -110];
            const offset = offsets[idx] ?? -idx * 55;
            return (
              <div
                key={idx}
                className={styles.spotlightItem}
                style={
                  { "--item-offset": `${offset}px` } as React.CSSProperties
                }
              >
                <Image
                  src="/images/collaboration-innovation/bolt.png"
                  alt=""
                  width={32}
                  height={32}
                  className={styles.spotlightBolt}
                  aria-hidden="true"
                />
                <div className={styles.spotlightContent}>
                  <h3 className={styles.spotlightTitle}>{k.title}</h3>
                  <p className={styles.spotlightDesc}>{k.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </ClientInfoModal>
  );
};

export default InnovationSpotlight;
