"use client";

import { Fragment } from "react";
import type { ClientPartnershipsOurClientPartnership } from "../../../lib/api";
import ClientInfoModal from "./ClientInfoModal";
import styles from "./ClientPartnershipDialogs.module.css";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  data?: ClientPartnershipsOurClientPartnership;
}

const defaultItems = [
  {
    title: "Needs-Based Engineering",
    description: "Every solution designed around mission-critical needs",
  },
  {
    title: "Delivery Discipline",
    description: "Timelines. Compliance. Zero-excuse execution",
  },
  {
    title: "Transparency & Reporting",
    description: "Real-time monitoring, impact dashboards, partner visibility",
  },
  {
    title: "Post-Project Continuity",
    description: "Training, O&M, warranty coverage, GRID-INTEL™ support",
  },
];

const OurClientPartnershipModel = ({ isOpen, onClose, data }: Props) => {
  const title = data?.title ?? "Our Client Partnership Model";
  const subHeadline =
    data?.subHeadline ?? "Aligned by Design. Delivered with Accountability.";
  const description =
    data?.description ??
    "We co-create value with clients through a model that emphasises";
  const imgSrc =
    data?.img?.src ??
    "/images/client-partnerships/future-visions-business-technology.png";
  const imgAlt = data?.img?.alt ?? "Partnership handshake in business setting";
  const items = data?.items ?? defaultItems;
  const quoteText =
    data?.quote?.text ??
    "\"Our goal isn't just to deploy. It's to ensure your project is still running — 10 years later.\"";
  const quoteHighlighted = data?.quote?.highlighted?.split("\n") ?? [
    "goal",
    "project",
  ];

  return (
    <ClientInfoModal isOpen={isOpen} onClose={onClose}>
      <div className={styles.model}>
        <header className={styles.dialogHeader}>
          <h2 className={styles.dialogTitle}>{title}</h2>
          <p className={styles.dialogSubtitle}>- {subHeadline}</p>
        </header>
        <p className={styles.intro}>{description}</p>

        <div className={styles.modelBody}>
          <div className={styles.modelRows}>
            {items.map((item) => (
              <div key={item.title} className={styles.modelRow}>
                <div className={styles.modelLabel}>{item.title}</div>
                <div className={styles.modelDescription}>
                  – {item.description}
                </div>
              </div>
            ))}
          </div>
          <img
            loading="lazy"
            decoding="async"
            src={imgSrc}
            alt={imgAlt}
            className={styles.modelImage}
          />
        </div>

        <p className={styles.modelQuote}>
          {quoteText
            .split(new RegExp(`(${quoteHighlighted.join("|")})`, "gi"))
            .map((part) =>
              quoteHighlighted.some(
                (h) => h.toLowerCase() === part.toLowerCase(),
              ) ? (
                <span key={`highlight-${part}`} className="text-[#4CAF50]">
                  {part}
                </span>
              ) : (
                <Fragment key={`quote-${part}`}>{part}</Fragment>
              ),
            )}
        </p>
      </div>
    </ClientInfoModal>
  );
};

export default OurClientPartnershipModel;
