"use client";

import Image from "next/image";
import MediaDialogFrame from "./MediaDialogFrame";
import styles from "./OfficialSpokesPeople.module.css";

interface OfficialSpokesPeopleProps {
  isOpen: boolean;
  onClose: () => void;
}

const spokespersonCards = [
  {
    id: "strategy",
    area: "Strategy, Corporate Vision",
    name: "Bernard George",
    role: "CEO",
    image: "/images/media-press/figma-spokes/source-5.jpg",
  },
  {
    id: "epcm",
    area: "EPCM, Deployment",
    name: "Bernard George",
    role: "Director of Projects",
    image: "/images/media-press/figma-spokes/source-13.jpg",
  },
  {
    id: "media",
    area: "Media, Partnerships",
    name: "Bernard George",
    role: "Communications Lead",
    image: "/images/media-press/figma-spokes/source-20.png",
  },
  {
    id: "esg",
    area: "ESG, Community Engagement",
    name: "Bernard George",
    role: "Sustainability Officer",
    image: "/images/media-press/figma-spokes/source-7.jpg",
  },
];

export default function OfficialSpokesPeople({
  isOpen,
  onClose,
}: OfficialSpokesPeopleProps) {
  const cards = [...spokespersonCards, ...spokespersonCards].map(
    (person, index) => ({
      ...person,
      id: `${person.id}-${index < spokespersonCards.length ? "row1" : "row2"}`,
    }),
  );

  return (
    <MediaDialogFrame
      isOpen={isOpen}
      onClose={onClose}
      title="Official Spokes people"
      labelledBy="official-spokespeople-title"
    >
      <div className={styles.container}>
        <div className={styles.grid}>
          {cards.map((person) => (
            <article className={styles.card} key={person.id}>
              {/* Media Player Header */}
              <div className={styles.media}>
                <Image
                  src={person.image}
                  alt={person.area}
                  fill
                  sizes="(max-width: 1024px) 50vw, 252px"
                  className={styles.img}
                />
                <button
                  type="button"
                  className={styles.playBtn}
                  aria-label={`Play ${person.area} video`}
                >
                  <svg viewBox="0 0 24 24">
                    <polygon points="6,4 20,12 6,20" />
                  </svg>
                </button>
                <div className={styles.playerBar} aria-hidden="true">
                  <div className={styles.scrubTrack}>
                    <div className={styles.scrubFill} />
                    <div className={styles.scrubDot} />
                  </div>
                  <div className={styles.controlsText}>|◁ ▷ ▷|</div>
                </div>
              </div>

              {/* Card Copy */}
              <div className={styles.cardCopy}>
                <h3 className={styles.area}>{person.area}</h3>
                <p className={styles.name}>{person.name}</p>
                <p className={styles.role}>
                  <span>— </span>
                  {person.role}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </MediaDialogFrame>
  );
}
