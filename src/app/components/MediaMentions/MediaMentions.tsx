"use client";

import { useState } from "react";
import D6Chatbot from "../D6Chatbot";
import FigmaAngledCta from "../FigmaAngledCta/FigmaAngledCta";
import SiteHeader from "../SiteHeader/SiteHeader";
import styles from "./MediaMentions.module.css";

const highlights = [
  {
    id: "powering-change",
    title: "Powering Change in the Pacific",
    source: "— The Guardian (March 2025)",
    image: "/images/media-mentions/figma-powering-change.png",
  },
  {
    id: "ai-grid",
    title: "PNG’s AI Grid Pioneer: GRID-INTEL™",
    source: "IEEE Energy Magazine",
    image: "/images/media-mentions/figma-ai-grid.png",
  },
  {
    id: "epcs",
    title: "Top 10 EPCs in Renewable Asia-Pacific",
    source: "Renewable World Digest",
    image: "/images/media-mentions/figma-epcs.png",
  },
];

const visibleHighlights = [
  ...highlights.map((highlight) => ({ ...highlight, id: `${highlight.id}-a` })),
  ...highlights.map((highlight) => ({ ...highlight, id: `${highlight.id}-b` })),
];

const mentions = [
  { id: "powering-change-1", label: "Powering Change in the Pacific" },
  { id: "ai-grid-1", label: "PNG’s AI Grid Pioneer: GRID-INTEL™" },
  { id: "epcs-1", label: "Top 10 EPCs in Renewable Asia-Pacific" },
  { id: "powering-change-2", label: "Powering Change in the Pacific" },
  { id: "ai-grid-2", label: "PNG’s AI Grid Pioneer: GRID-INTEL™" },
  { id: "epcs-2", label: "Top 10 EPCs in Renewable Asia-Pacific" },
];

const years = [
  { id: "2025", label: "2025", count: 26, items: mentions },
  { id: "2024", label: "2024", count: 42, items: [] },
  { id: "2023", label: "2023", count: 36, items: [] },
  { id: "2022", label: "2022", count: 25, items: [] },
];

interface MediaMentionsProps {
  canvas?: boolean;
}

export default function MediaMentions({ canvas = false }: MediaMentionsProps) {
  const [openYear, setOpenYear] = useState("2025");

  return (
    <main
      className={`${styles.page} ${canvas ? styles.canvasPage : ""}`}
      data-node-id="7077:5840"
    >
      <SiteHeader layout={canvas ? "figmaCanvas" : "viewport"} />
      <img
        loading="lazy"
        decoding="async"
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
            {visibleHighlights.map((highlight) => (
              <article className={styles.card} key={highlight.id}>
                <img
                  loading="lazy"
                  decoding="async"
                  src={highlight.image}
                  alt=""
                />
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
          {years.map((year) => {
            const isOpen = openYear === year.id;
            const panelId = `year-${year.id}-panel`;

            return (
              <div className={styles.year} key={year.id}>
                <button
                  aria-controls={panelId}
                  aria-expanded={isOpen}
                  className={styles.yearTrigger}
                  onClick={() => setOpenYear(isOpen ? "" : year.id)}
                  type="button"
                >
                  {year.label} <strong>({year.count})</strong>
                </button>
                {isOpen && year.items.length > 0 ? (
                  <ul id={panelId}>
                    {year.items.map((mention) => (
                      <li key={mention.id}>{mention.label}</li>
                    ))}
                  </ul>
                ) : null}
              </div>
            );
          })}
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
