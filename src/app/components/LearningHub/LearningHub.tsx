"use client";

import Link from "next/link";
import D6Chatbot from "../D6Chatbot";
import SiteHeader from "../SiteHeader/SiteHeader";
import styles from "./LearningHub.module.css";

type LearningCard = {
  title: string;
  description: string;
  category: string;
  image: string;
  href: string;
};

const learningCards: LearningCard[] = [
  {
    title: "Energy Fundamentals",
    description:
      "Build a practical foundation in renewable generation, storage, and resilient energy systems.",
    category: "FOUNDATIONS",
    image: "/images/articles/article1.png",
    href: "/enlighten/insights-articles/energy-for-communities",
  },
  {
    title: "Designing for Resilience",
    description:
      "Explore the design decisions that help energy infrastructure perform in remote and changing conditions.",
    category: "FIELD NOTES",
    image: "/images/events/figma-resilient-energy.png",
    href: "/enlighten/insights-articles/field-tested-energy",
  },
  {
    title: "GRID-INTEL in Practice",
    description:
      "Learn how intelligent monitoring turns operational data into clearer, faster energy decisions.",
    category: "TECHNOLOGY",
    image: "/images/events/figma-grid-intel.png",
    href: "/enlighten/insights-articles/execution-on-png-terrain",
  },
];

interface LearningHubProps {
  canvas?: boolean;
}

export default function LearningHub({ canvas = false }: LearningHubProps) {
  return (
    <main
      className={`${styles.page} ${canvas ? styles.canvasPage : ""}`}
      data-node-id="pattern-derived-learning-hub"
    >
      <SiteHeader layout={canvas ? "figmaCanvas" : "viewport"} />
      <img
        className={styles.verticalTitle}
        src="/images/articles/insights-articles.png"
        alt="Learning Hub"
      />

      <div className={styles.content}>
        <header className={styles.intro}>
          <h1>
            <span>Learning</span> Hub
          </h1>
          <h2>Knowledge for a changing energy future.</h2>
          <p>
            Practical guides, field notes, and technical explainers from GREEN
            to help communities, partners, and energy professionals make better
            decisions.
          </p>
        </header>

        <section className={styles.learningSection} aria-labelledby="learning-title">
          <div className={styles.sectionHeading}>
            <h3 id="learning-title">Explore the library</h3>
            <span>Learn · Apply · Share</span>
          </div>
          <div className={styles.cards}>
            {learningCards.map((card) => (
              <Link className={styles.card} href={card.href} key={card.title}>
                <img src={card.image} alt="" />
                <div className={styles.cardBody}>
                  <span>{card.category}</span>
                  <h4>{card.title}</h4>
                  <p>{card.description}</p>
                  <strong>
                    Explore <span aria-hidden="true">›</span>
                  </strong>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className={styles.closingMessage}>
          <h2>
            Learn with purpose. <em>Build with impact.</em>
          </h2>
          <p>
            GREEN shares experience from the field so the next energy decision
            can be clearer, stronger, and more useful for the people it serves.
          </p>
        </section>
      </div>

      {canvas ? (
        <D6Chatbot
          canvasAnchored
          triggerVariant="figmaCanvas"
          triggerClassName={styles.chatTrigger}
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
