"use client";

import { useRouter } from "next/navigation";
import { useArticleBySlug } from "../../../hooks/useArticleBySlug";
import D6Chatbot from "../D6Chatbot";
import FigmaAngledCta from "../FigmaAngledCta/FigmaAngledCta";
import SiteHeader from "../SiteHeader/SiteHeader";
import styles from "./ArticlesDetail.module.css";

interface ArticlesDetailProps {
  slug: string;
  canvas?: boolean;
}

const FALLBACK_ARTICLE = {
  title: "How Hybrid Energy Is Powering PNG’s Health Sector",
  description:
    "From the frontlines of energy transformation in Papua New Guinea to global innovation corridors — GREEN shares insights born of experience, powered by engineering, and shaped for impact.",
  featuredImg: {
    src: "/images/articles/health-sector-figma.png",
    alt: "Solar-powered health facility in Papua New Guinea",
  },
  content:
    "Although the human development index is determined by health, education, and income, one of the important factors of human development is energy. Like other necessities for human survival, energy has also become an integral part of human life. Until mastering the use of fire, human civilization was not able to take its historic step forward. With the passage of time, types of energy used diversified, use of energy became more intensive, and more complex appliances came into use, and efficiency increased. Societies were transformed from subsistence to more developed with the consumption of, and it led to better quality of life.",
  cta: { href: "/enlighten/insights-articles", text: "Explore" },
};

const plainText = (content: string) => content.replace(/<[^>]*>/g, " ");

export default function ArticlesDetail({
  slug,
  canvas = false,
}: ArticlesDetailProps) {
  const router = useRouter();
  const { data: article } = useArticleBySlug(slug);
  const isFigmaArticle = slug === "field-tested-energy";
  const currentArticle = isFigmaArticle
    ? FALLBACK_ARTICLE
    : (article ?? FALLBACK_ARTICLE);
  const content = plainText(currentArticle.content).trim();

  return (
    <main
      className={`${styles.page} ${canvas ? styles.canvasPage : ""}`}
      data-node-id="7077:6405"
    >
      <SiteHeader layout={canvas ? "figmaCanvas" : "viewport"} />
      {/* biome-ignore lint/performance/noImgElement: Figma-positioned local artwork */}
      <img
        className={styles.verticalTitle}
        src="/images/articles/insights-articles.png"
        alt=""
        aria-hidden="true"
      />

      <article className={styles.article}>
        <FigmaAngledCta
          className={styles.back}
          size="sm"
          arrowDirection="left"
          onClick={() => router.back()}
        >
          Back
        </FigmaAngledCta>

        <header className={styles.header}>
          <h1>{currentArticle.title}</h1>
          <p>
            {isFigmaArticle ? (
              <>
                From the frontlines of energy transformation in Papua New Guinea
                to global innovation corridors — <strong>GREEN</strong> shares
                insights born of experience, powered by engineering, and shaped
                for impact.
              </>
            ) : (
              currentArticle.description
            )}
          </p>
        </header>

        <section className={styles.lead}>
          <div className={styles.copy}>
            <p>{content}</p>
            <FigmaAngledCta
              className={styles.explore}
              href={currentArticle.cta.href}
              size="sm"
            >
              {currentArticle.cta.text}
            </FigmaAngledCta>
          </div>
          {/* biome-ignore lint/performance/noImgElement: CMS image URL is dynamic */}
          <img
            className={styles.featureImage}
            src={currentArticle.featuredImg.src}
            alt={currentArticle.featuredImg.alt}
          />
        </section>

        <section className={styles.body}>
          <h2>Powering PNG&apos;s Health Sector</h2>
          <p>{content}</p>
          <FigmaAngledCta
            className={styles.sectionExplore}
            href={currentArticle.cta.href}
            size="sm"
          >
            Explore
          </FigmaAngledCta>
        </section>
        <section className={styles.body}>
          <h2>PImaga Health Center</h2>
          <p>{content}</p>
          <FigmaAngledCta
            className={styles.sectionExplore}
            href={currentArticle.cta.href}
            size="sm"
          >
            Explore
          </FigmaAngledCta>
        </section>
        <section className={styles.closing}>
          <p>
            Step into the minds of GREEN&apos;s engineers, innovators, and
            on-ground teams. This is where ideas are not just imagined —
            they&apos;re shaped by experience, tested in PNG terrain, and shared
            to push the industry forward.
          </p>
        </section>
      </article>

      <D6Chatbot
        canvasAnchored
        triggerVariant="figmaCanvas"
        figmaPlaceholder="Let’s Talk Energy"
        triggerClassName={styles.chatTrigger}
        triggerStyle={{ top: 1332, left: 1484, width: 418, height: 52 }}
      />
    </main>
  );
}
