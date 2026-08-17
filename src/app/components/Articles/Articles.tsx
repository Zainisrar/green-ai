"use client";

import Link from "next/link";
import { useMemo } from "react";
import { useInsightsArticles } from "../../../hooks/useInsightsArticles";
import D6Chatbot from "../D6Chatbot";
import SiteHeader from "../SiteHeader/SiteHeader";
import styles from "./Articles.module.css";

type ArticleCard = {
  id: number;
  title: string;
  description: string;
  img: string;
  href: string;
};

const fallbackArticles: ArticleCard[] = [
  {
    id: 1,
    title: "How Hybrid Energy Is Powering PNG’s Health Sector",
    description:
      "What we’ve learned deploying solar-diesel-battery systems for off-grid clinics.",
    img: "/images/articles/article1.png",
    href: "/enlighten/insights-articles/field-tested-energy",
  },
  {
    id: 2,
    title: "How Hybrid Energy Is Powering PNG’s Health Sector",
    description:
      "What we’ve learned deploying solar-diesel-battery systems for off-grid clinics.",
    img: "/images/articles/article1.png",
    href: "/enlighten/insights-articles/energy-for-communities",
  },
  {
    id: 3,
    title: "How Hybrid Energy Is Powering PNG’s Health Sector",
    description:
      "What we’ve learned deploying solar-diesel-battery systems for off-grid clinics.",
    img: "/images/articles/article1.png",
    href: "/enlighten/insights-articles/execution-on-png-terrain",
  },
];

const articleGroups = [
  "Project Diaries",
  "Innovation Notes",
  "Field Intelligence",
  "Engineer's Column",
  "Future Energy",
];

interface ArticlesProps {
  canvas?: boolean;
}

export default function Articles({ canvas = false }: ArticlesProps) {
  const { data: apiArticles } = useInsightsArticles();

  const articles = useMemo<ArticleCard[]>(() => {
    // The Figma overview is a curated editorial layout, not a live feed.
    if (canvas || !apiArticles?.length) return fallbackArticles;

    return apiArticles.map((article) => ({
      id: article.id,
      title: article.title,
      description: article.description,
      img: article.featuredImg.src,
      href: article.cta.href || `/enlighten/insights-articles/${article.slug}`,
    }));
  }, [apiArticles, canvas]);

  return (
    <main
      className={`${styles.page} ${canvas ? styles.canvasPage : ""}`}
      data-node-id="7080:58112"
    >
      <SiteHeader layout={canvas ? "figmaCanvas" : "viewport"} />
      <img
        className={styles.verticalTitle}
        src="/images/articles/insights-articles.png"
        alt="Insights and Articles"
      />

      <div className={styles.content}>
        <header className={styles.intro}>
          <h1>
            <span>Insights &amp;</span> Articles
          </h1>
          <h2>Field-Tested Ideas. Forward-Thinking Energy.</h2>
          <p>
            From the frontlines of energy transformation in Papua New Guinea to
            global innovation corridors — <strong>GREEN</strong> shares insights
            born of experience, powered by engineering, and shaped for impact.
          </p>
        </header>

        <section
          className={styles.articleGroups}
          aria-label="Insights and articles"
        >
          {articleGroups.map((group) => (
            <section className={styles.group} key={group}>
              <h3>{group}</h3>
              <div className={styles.cards}>
                {articles.slice(0, 3).map((article) => (
                  <Link
                    className={styles.card}
                    href={article.href}
                    key={group + article.id}
                  >
                    <h4>{article.title}</h4>
                    <div className={styles.cardDetails}>
                      <img src={article.img} alt="" />
                      <p>{article.description}</p>
                    </div>
                    <span className={styles.readMore}>
                      Explore <span aria-hidden="true">›</span>
                    </span>
                  </Link>
                ))}
              </div>
              <span className={styles.rowArrow} aria-hidden="true">
                ›
              </span>
            </section>
          ))}
        </section>

        <section className={styles.closingMessage}>
          <h2>
            Step into the minds of GREEN&apos;s engineers, innovators, and
            on-ground teams.
          </h2>
          <p>
            — they&apos;re shaped by experience, tested in PNG terrain, and
            shared to push the industry forward.
          </p>
        </section>

        <div className={styles.contribute}>
          <img
            src="/images/articles/want.png"
            alt="Want to contribute or feature GREEN's work?"
          />
        </div>
      </div>

      {canvas ? (
        <D6Chatbot
          canvasAnchored
          triggerVariant="figmaCanvas"
          triggerClassName={styles.chatTrigger}
          triggerStyle={{
            top: 1788,
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
