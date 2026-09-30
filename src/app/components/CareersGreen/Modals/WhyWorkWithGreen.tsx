"use client";
import styles from "./CareersModal.module.css";
import CareersModalShell from "./CareersModalShell";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  data?: {
    title: string;
    description: string;
    icons: Array<{
      img: { alt: string; src: string };
      title: string;
      description: string;
    }>;
    quote: { text1: string; text2: string };
  };
}
const fallbackItems = [
  [
    "Hands-on challenges",
    "from bush to boardroom",
    "/images/investor-relations/icons/technical-support.svg",
  ],
  [
    "Global standards",
    "executed in PNG contexts",
    "/images/investor-relations/icons/globe-intel.svg",
  ],
  [
    "Growth tracks",
    "for engineers, technicians, planners & project managers",
    "/images/investor-relations/icons/graph.svg",
  ],
  [
    "Mission-aligned culture",
    "safety, dignity, impact",
    "/images/investor-relations/icons/target-mission.svg",
  ],
];
export default function WhyWorkWithGreen({ isOpen, onClose, data }: Props) {
  const items = data?.icons?.length
    ? data.icons.map((item) => ({
        title: item.title,
        description: item.description,
        src: item.img.src,
        alt: item.img.alt,
      }))
    : fallbackItems.map(([title, description, src]) => ({
        title,
        description,
        src,
        alt: "",
      }));
  return (
    <CareersModalShell
      isOpen={isOpen}
      onClose={onClose}
      panelClassName={styles.whyPanel}
    >
      <div className={styles.whyHeading}>
        <h2 className={styles.heading}>
          {data?.title || "Why Work With GREEN?"}
        </h2>
        <p className={styles.whySubheading}>
          {data?.description ||
            "- We engineer energy. But our real asset is people."}
        </p>
      </div>
      <div className={styles.rule} />
      <div className={styles.whyGrid}>
        {items.map((item) => (
          <article className={styles.whyItem} key={item.title}>
            <img src={item.src} alt={item.alt} />
            <div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          </article>
        ))}
      </div>
      <blockquote className={styles.whyQuote}>
        <p>
          {data?.quote?.text1 ||
            "At GREEN, I’ve grown faster in two years than I thought possible. Field-tested. Mission-driven. It’s real work."}
        </p>
        <footer>
          {data?.quote?.text2 || "— Field Engineer, GREEN Limited"}
        </footer>
      </blockquote>
    </CareersModalShell>
  );
}
