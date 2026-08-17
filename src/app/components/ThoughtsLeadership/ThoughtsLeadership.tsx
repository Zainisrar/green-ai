"use client";

import D6Chatbot from "../D6Chatbot";
import FigmaAngledCta from "../FigmaAngledCta/FigmaAngledCta";
import SiteHeader from "../SiteHeader/SiteHeader";
import styles from "./ThoughtsLeadership.module.css";

type Editorial = {
  title: string;
  image: string;
  description: string;
  author: string;
  role: string;
};

const editorials: Editorial[] = [
  {
    title: "Decentralizing Energy is the Future of Sovereignty",
    image: "/images/thoughts-leadership/figma-ai-energy.png",
    description:
      "From national policy to rural electrification design — GREEN’s leadership voice is shaping the next energy chapter for PNG and the Pacific.",
    author: "Bernard George",
    role: "CEO, GREEN",
  },
  {
    title: "Rewriting EPCM for Resilience",
    image: "/images/thoughts-leadership/figma-epcm.png",
    description:
      "From national policy to rural electrification design — GREEN’s leadership voice is shaping the next energy chapter for PNG and the Pacific.",
    author: "Keynote",
    role: "PNG Energy Investment Dialogue 2025",
  },
  {
    title: "The Real Barriers to Hybrid Adoption in Island Nations",
    image: "/images/thoughts-leadership/figma-island.png",
    description:
      "From national policy to rural electrification design — GREEN’s leadership voice is shaping the next energy chapter for PNG and the Pacific.",
    author: "Solomon Kaura",
    role: "Chief Systems Architect",
  },
  {
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

interface ThoughtsLeadershipProps {
  canvas?: boolean;
}

export default function ThoughtsLeadership({
  canvas = false,
}: ThoughtsLeadershipProps) {
  return (
    <main
      className={`${styles.page} ${canvas ? styles.canvasPage : ""}`}
      data-node-id="7077:15063"
    >
      <SiteHeader layout={canvas ? "figmaCanvas" : "viewport"} />
      <img
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
            {editorials.map((editorial, index) => (
              <article
                className={styles.card}
                key={`${editorial.title}-${index}`}
              >
                <div className={styles.cardHeading}>
                  <img src={editorial.image} alt="" />
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
          <h3>
            <span>Opinion Essays</span> (52)
          </h3>
          <ul>
            {opinionEssays.map((essay) => (
              <li key={essay}>{essay}</li>
            ))}
          </ul>
          <h3>
            Conference Keynotes <span>(61)</span>
          </h3>
          <h3>
            Policy Commentary <span>(10)</span>
          </h3>
          <h3>
            Interviews with GREEN Experts <span>(28)</span>
          </h3>
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
