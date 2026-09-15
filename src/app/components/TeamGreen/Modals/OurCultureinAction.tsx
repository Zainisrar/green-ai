"use client";

import TeamGreenModalShell from "./TeamGreenModalShell";
import styles from "./TeamGreenModals.module.css";

interface CultureActionData {
  img?: string;
  keys?: unknown[];
  quote?: string;
  title?: string;
  keypoint?: string[];
  description?: string;
  quoteHighlighted?: string;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  data?: CultureActionData;
}

const DEFAULT_POINTS = [
  "Precision With Humility",
  "Skilling The Next Gen",
  "Celebrating System Switch-Ons",
  "Solving In Real-Time",
  "Showing Up — Rain Or Remote",
];

const LOCAL_OUR_CULTURE_IMAGE = "/images/team-green/our-culture.png";

const OurCultureinAction = ({ isOpen, onClose, data }: Props) => {
  const title = data?.title || "Our Culture in Action";
  const headline = data?.description || "- What defines Team GREEN?";
  const quoteText =
    data?.quote ||
    "“Team GREEN doesn't clock in. We show up — because lives depend on it.”";
  const quoteHighlight = data?.quoteHighlighted || "GREEN";

  const rawPoints =
    data?.keypoint && data.keypoint.length > 0 ? data.keypoint : DEFAULT_POINTS;
  const points = rawPoints.map((p) => p.replace(/\n/g, " ").trim());

  const rawImg = data?.img;
  const imgSrc =
    rawImg && !rawImg.includes("mainImg.png")
      ? rawImg
      : LOCAL_OUR_CULTURE_IMAGE;

  return (
    <TeamGreenModalShell
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      headline={headline}
      quoteText={quoteText}
      quoteHighlight={quoteHighlight}
    >
      <div className={styles.cultureGrid}>
        {/* Culture Points List */}
        <div className={styles.culturePointsList}>
          {points.map((point) => (
            <div key={point} className={styles.culturePointItem}>
              <img
                src="/images/why-esg-matters-to-green/green_bolt.png"
                alt=""
                className={styles.culturePointIcon}
                loading="eager"
                decoding="async"
              />
              <p className={styles.culturePointText}>{point}</p>
            </div>
          ))}
        </div>

        {/* Culture Image */}
        <div className={styles.cultureImageWrap}>
          <img
            src="/images/handbook/shape.png"
            alt=""
            className={styles.cornerBracketBottomLeft}
            aria-hidden="true"
          />
          <img
            src={imgSrc}
            alt={title}
            className={styles.cultureImage}
            decoding="async"
            onError={(e) => {
              const img = e.currentTarget;
              if (img.dataset.fallbackApplied) return;
              img.dataset.fallbackApplied = "true";
              img.src = LOCAL_OUR_CULTURE_IMAGE;
            }}
          />
          <img
            src="/images/handbook/shape2.png"
            alt=""
            className={styles.cornerBracketTopRight}
            aria-hidden="true"
          />
        </div>
      </div>
    </TeamGreenModalShell>
  );
};

export default OurCultureinAction;
