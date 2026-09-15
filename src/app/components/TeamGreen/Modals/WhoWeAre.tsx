"use client";

import TeamGreenModalShell from "./TeamGreenModalShell";
import styles from "./TeamGreenModals.module.css";

interface WhoWeAreData {
  img?: {
    alt?: string;
    src?: string;
    highlighted?: string;
  };
  quote?: {
    text?: string;
    highlighted?: string;
  };
  title?: string;
  title2?: string;
  description?: string;
  description2?: string;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  data?: WhoWeAreData;
}

const LOCAL_WHO_WE_ARE_IMAGE = "/images/team-green/who-we-are.png";

const WhoWeAre = ({ isOpen, onClose, data }: Props) => {
  const title = data?.title || "Who We Are";
  const headline = "- We don't just work on infrastructure. We work on impact.";
  const quoteText =
    data?.quote?.text ||
    '"We don\'t just work on infrastructure. We work on impact."';
  const quoteHighlight = data?.quote?.highlighted || "infrastructure.";

  const rawSrc = data?.img?.src;
  const imgSrc =
    rawSrc && !rawSrc.includes("mainImg.png") ? rawSrc : LOCAL_WHO_WE_ARE_IMAGE;
  const imgAlt = data?.img?.alt || "Who We Are";

  const subheading =
    data?.title2 ||
    "GREEN is not just a solar EPC. We're a systems company built by thinkers and doers.";
  const description =
    data?.description2 ||
    "From mechatronics specialists and off-grid strategists to supply chain experts and field electricians, our team brings together world-class expertise and on-the-ground pragmatism — purpose-built for the Pacific.";
  const extraDescription =
    data?.description ||
    "We bring practical expertise and shared purpose to every project.";

  return (
    <TeamGreenModalShell
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      headline={headline}
      quoteText={quoteText}
      quoteHighlight={quoteHighlight}
    >
      <div className={styles.whoWeAreGrid}>
        <div className={styles.whoWeAreImageWrap}>
          <img
            src={imgSrc}
            alt={imgAlt}
            className={styles.whoWeAreImage}
            decoding="async"
            onError={(e) => {
              e.currentTarget.src = LOCAL_WHO_WE_ARE_IMAGE;
            }}
          />
        </div>

        <div className={styles.whoWeAreContent}>
          <h3 className={styles.whoWeAreSubheading}>{subheading}</h3>
          <p className={styles.whoWeAreText}>{description}</p>
          {extraDescription && extraDescription !== description && (
            <p className={styles.whoWeAreText}>{extraDescription}</p>
          )}
        </div>
      </div>
    </TeamGreenModalShell>
  );
};

export default WhoWeAre;
