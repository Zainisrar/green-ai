"use client";

import D6Chatbot from "../D6Chatbot";
import FigmaAngledCta from "../FigmaAngledCta/FigmaAngledCta";
import SiteHeader from "../SiteHeader/SiteHeader";
import styles from "./MediaMentions.module.css";

const highlights = [
  {
    title: "Powering Change in the Pacific",
    source: "— The Guardian (March 2025)",
    image: "/images/media-mentions/figma-powering-change.png",
  },
  {
    title: "PNG’s AI Grid Pioneer: GRID-INTEL™",
    source: "IEEE Energy Magazine",
    image: "/images/media-mentions/figma-ai-grid.png",
  },
  {
    title: "Top 10 EPCs in Renewable Asia-Pacific",
    source: "Renewable World Digest",
    image: "/images/media-mentions/figma-epcs.png",
  },
];

const mentions = [
  { id: "powering-change-1", label: "Powering Change in the Pacific" },
  { id: "ai-grid-1", label: "PNG’s AI Grid Pioneer: GRID-INTEL™" },
  { id: "epcs-1", label: "Top 10 EPCs in Renewable Asia-Pacific" },
  { id: "powering-change-2", label: "Powering Change in the Pacific" },
  { id: "ai-grid-2", label: "PNG’s AI Grid Pioneer: GRID-INTEL™" },
  { id: "epcs-2", label: "Top 10 EPCs in Renewable Asia-Pacific" },
];

interface MediaMentionsProps {
  canvas?: boolean;
}

export default function MediaMentions({ canvas = false }: MediaMentionsProps) {
  return (
    <main
      className={`${styles.page} ${canvas ? styles.canvasPage : ""}`}
      data-node-id="7077:5840"
    >
      <SiteHeader layout={canvas ? "figmaCanvas" : "viewport"} />
      <img loading="lazy" decoding="async"
        className={styles.verticalTitle}
        src="/images/media-mentions/media-mentions.png"
        alt="Media and mentions"
      />
      <div className={styles.content}>
        <header className={styles.intro}>
          <h1>
            <span>Media</span> &amp; Mentions
          </h1>
          <h2>Recognized by Impact. Featured for Action.</h2>
          <p>
            See where GREEN has been featured — across newsrooms, policy forums,
            journals, and investor briefings.
          </p>
        </header>
        <section
          className={styles.highlights}
          aria-labelledby="recent-highlights"
        >
          <h3 id="recent-highlights">Recent Highlights</h3>
          <div className={styles.grid}>
            {[...highlights, ...highlights].map((highlight, index) => (
              <article
                className={styles.card}
                key={`${highlight.title}-${index}`}
              >
                <img loading="lazy" decoding="async" src={highlight.image} alt="" />
                <div>
                  <h4>{highlight.title}</h4>
                  <p>{highlight.source}</p>
                </div>
              </article>
            ))}
          </div>
          <div className={styles.pagination} aria-hidden="true">
            ‹&nbsp;&nbsp;›
          </div>
        </section>
      </div>
      <aside className={styles.sidebar} aria-label="Media mentions by year">
        <section className={styles.yearList}>
          <h3>
            2025 <span>(26)</span>
          </h3>
          <ul>
            {mentions.map((mention) => (
              <li key={mention.id}>{mention.label}</li>
            ))}
          </ul>
          <h3>
            2024 <span>(42)</span>
          </h3>
          <h3>
            2023 <span>(36)</span>
          </h3>
          <h3>
            2023 <span>(25)</span>
          </h3>
        </section>
        <FigmaAngledCta className={styles.request}>
          Submit Media Request
        </FigmaAngledCta>
      </aside>
      <p className={styles.statement}>
        <svg
          className={styles.leftCorner}
          width="82"
          height="101"
          viewBox="0 0 82 101"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M54.1612 0.699707L2.48828 98.6997H81.4883"
            stroke="url(#media-corner-left)"
            strokeWidth="3"
          />
          <defs>
            <linearGradient
              id="media-corner-left"
              x1="465.021"
              y1="-295.745"
              x2="185.277"
              y2="350.425"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#FFE500" stopOpacity="0.89" />
              <stop offset="1" stopColor="#23D14B" stopOpacity="0.3" />
            </linearGradient>
          </defs>
        </svg>
        Recognized by <em>Impact.</em> <em>Featured for Action.</em>
        <svg
          className={styles.rightCorner}
          width="82"
          height="101"
          viewBox="0 0 82 101"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M27.327 99.5L79 1.5H0"
            stroke="url(#media-corner-right)"
            strokeWidth="3"
          />
          <defs>
            <linearGradient
              id="media-corner-right"
              x1="-383.532"
              y1="395.945"
              x2="-103.789"
              y2="-250.225"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#FFE500" stopOpacity="0.89" />
              <stop offset="1" stopColor="#23D14B" stopOpacity="0.3" />
            </linearGradient>
          </defs>
        </svg>
      </p>
      {canvas ? (
        <D6Chatbot
          canvasAnchored
          triggerVariant="figmaCanvas"
          triggerStyle={{
            top: 899,
            right: "auto",
            bottom: "auto",
            left: 1498,
            width: 418,
          }}
        />
      ) : (
        <D6Chatbot />
      )}
    </main>
  );
}
