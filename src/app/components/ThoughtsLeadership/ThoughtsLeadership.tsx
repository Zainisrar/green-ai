"use client";

import { useState } from "react";
import D6Chatbot from "../D6Chatbot";
import FigmaAngledCta from "../FigmaAngledCta/FigmaAngledCta";
import SiteHeader from "../SiteHeader/SiteHeader";
import styles from "./ThoughtsLeadership.module.css";

type Editorial = {
  id: string;
  title: string;
  image: string;
  description: string;
  author: string;
  role: string;
};

const editorials: Editorial[] = [
  {
    id: "decentralizing-energy",
    title: "Decentralizing Energy is the Future of Sovereignty",
    image: "/images/thoughts-leadership/figma-ai-energy.png",
    description:
      "From national policy to rural electrification design — GREEN’s leadership voice is shaping the next energy chapter for PNG and the Pacific.",
    author: "Bernard George",
    role: "CEO, GREEN",
  },
  {
    id: "rewriting-epcm",
    title: "Rewriting EPCM for Resilience",
    image: "/images/thoughts-leadership/figma-epcm.png",
    description:
      "From national policy to rural electrification design — GREEN’s leadership voice is shaping the next energy chapter for PNG and the Pacific.",
    author: "Keynote",
    role: "PNG Energy Investment Dialogue 2025",
  },
  {
    id: "hybrid-adoption",
    title: "The Real Barriers to Hybrid Adoption in Island Nations",
    image: "/images/thoughts-leadership/figma-island.png",
    description:
      "From national policy to rural electrification design — GREEN’s leadership voice is shaping the next energy chapter for PNG and the Pacific.",
    author: "Solomon Kaura",
    role: "Chief Systems Architect",
  },
  {
    id: "decentralizing-energy-repeat",
    title: "Decentralizing Energy is the Future of Sovereignty",
    image: "/images/thoughts-leadership/figma-ai-energy.png",
    description:
      "From national policy to rural electrification design — GREEN’s leadership voice is shaping the next energy chapter for PNG and the Pacific.",
    author: "Bernard George",
    role: "CEO, GREEN",
  },
];

const opinionEssays = [
  "Resilient Energy for Island Communities",
  "GRID-INTEL™ Masterclass Series",
  "PNG Clean Energy Forum 2025",
  "AI for Energy Innovation Series",
  "Women in Energy: Pacific Edition",
  "Renewable Energy Integration for Resilience",
];

const categories = [
  { id: "opinion", label: "Opinion Essays", count: 52, items: opinionEssays },
  { id: "keynotes", label: "Conference Keynotes", count: 61, items: [] },
  { id: "policy", label: "Policy Commentary", count: 10, items: [] },
  {
    id: "interviews",
    label: "Interviews with GREEN Experts",
    count: 28,
    items: [],
  },
];

interface ThoughtsLeadershipProps {
  canvas?: boolean;
}

export default function ThoughtsLeadership({
  canvas = false,
}: ThoughtsLeadershipProps) {
  const [openCategory, setOpenCategory] = useState("opinion");

  return (
    <main
      className={`${styles.page} ${canvas ? styles.canvasPage : ""}`}
      data-node-id="7077:15063"
    >
      <SiteHeader layout={canvas ? "figmaCanvas" : "viewport"} />
      <img
        loading="lazy"
        decoding="async"
        className={styles.verticalTitle}
        src="/images/thoughts-leadership/thought.png"
        alt="Thought leadership"
      />
      <div className={styles.content}>
        <header className={styles.intro}>
          <h1>
            Thought <span>Leadership</span>
          </h1>
          <h2>
            Designed for Complexity. Delivered with Precision. Managed to Scale
          </h2>
          <p>
            From national policy to rural electrification design — GREEN’s
            leadership voice is shaping the next energy chapter for PNG and the
            Pacific.
          </p>
        </header>
        <section
          className={styles.editorialSection}
          aria-labelledby="editorials"
        >
          <h3 id="editorials">Featured Editorials / Speeches</h3>
          <div className={styles.editorialGrid}>
            {editorials.map((editorial) => (
              <article className={styles.card} key={editorial.id}>
                <div className={styles.cardHeading}>
                  <img
                    loading="lazy"
                    decoding="async"
                    src={editorial.image}
                    alt=""
                  />
                  <h4>{editorial.title}</h4>
                </div>
                <p>{editorial.description}</p>
                <div className={styles.byline}>
                  <strong>By {editorial.author}</strong>
                  <span>— {editorial.role}</span>
                </div>
                <FigmaAngledCta className={styles.readMore}>
                  Read more
                </FigmaAngledCta>
              </article>
            ))}
          </div>
          <div className={styles.pagination} aria-hidden="true">
            ‹&nbsp;&nbsp;›
          </div>
        </section>
      </div>
      <aside
        className={styles.sidebar}
        aria-label="Thought leadership categories"
      >
        <section className={styles.categories}>
          {categories.map((category) => {
            const isOpen = openCategory === category.id;
            const panelId = `${category.id}-panel`;

            return (
              <div className={styles.category} key={category.id}>
                <button
                  aria-controls={panelId}
                  aria-expanded={isOpen}
                  className={styles.categoryTrigger}
                  onClick={() => setOpenCategory(isOpen ? "" : category.id)}
                  type="button"
                >
                  <span>{category.label}</span>{" "}
                  <strong>({category.count})</strong>
                </button>
                {isOpen && category.items.length > 0 ? (
                  <ul id={panelId}>
                    {category.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                ) : null}
              </div>
            );
          })}
        </section>
        <div className={styles.sidebarCtas}>
          <FigmaAngledCta>Request a Technical Debrief</FigmaAngledCta>
          <FigmaAngledCta>Book a Discovery Consultation</FigmaAngledCta>
        </div>
      </aside>
      <p className={styles.statement}>
        We Don’t Just Build <em>Systems.</em> We Build <em>Perspectives.</em>
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
