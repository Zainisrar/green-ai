"use client";

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

const renderQuote = (quote: string) =>
  quote.split(/(deploy|project)/gi).map((part) =>
    /^(deploy|project)$/i.test(part) ? (
      <span key={part.toLowerCase()} className={styles.modelQuoteAccent}>
        {part}
      </span>
    ) : (
      part
    ),
  );

const OurClientPartnershipModel = ({ isOpen, onClose, data }: Props) => {
  const title = data?.title ?? "Our Client Partnership Model";
  const subHeadline =
    data?.subHeadline ?? "Aligned by Design. Delivered with Accountability.";
  const description =
    data?.description ??
    "We co-create value with clients through a model that emphasizes";
  const imgSrc =
    data?.img?.src ??
    "/images/client-partnerships/future-visions-business-technology.png";
  const imgAlt = data?.img?.alt ?? "Partnership handshake in business setting";
  const items = data?.items ?? defaultItems;
  const quoteText =
    data?.quote?.text ??
    "“Our goal isn’t just to deploy. It’s to ensure your project is still running — 10 years later.”";

  return (
    <ClientInfoModal
      isOpen={isOpen}
      onClose={onClose}
      contentClassName={styles.modelViewport}
      geometry="clientPartnership"
    >
      <div className={styles.modelWrapper}>
        <header className={styles.dialogHeader}>
          <h2 className={styles.dialogTitle}>{title}</h2>
          <p className={styles.dialogSubtitle}>- {subHeadline}</p>
        </header>

        <p className={styles.modelIntro}>{description}</p>

        <div className={styles.modelBody}>
          <div className={styles.modelRows}>
            {items.map((item) => (
              <div key={item.title} className={styles.modelRow}>
                <span className={styles.modelLabel}>{item.title}</span>
                <span className={styles.modelDescription}>
                  – {item.description}
                </span>
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

        <p className={styles.modelQuote}>{renderQuote(quoteText)}</p>
      </div>
    </ClientInfoModal>
  );
};

export default OurClientPartnershipModel;
