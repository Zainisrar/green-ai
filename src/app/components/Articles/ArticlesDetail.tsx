"use client";

import { useArticleBySlug } from "../../../hooks/useArticleBySlug";
import D6Chatbot from "../D6Chatbot";
import FigmaAngledCta from "../FigmaAngledCta/FigmaAngledCta";
import SiteHeader from "../SiteHeader/SiteHeader";
import FigmaPageCanvas from "../shared/FigmaPageCanvas";
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

const decodeCommonEntities = (content: string) =>
  content.replace(
    /&(nbsp|amp|quot|apos|lt|gt|#39|#x27);/gi,
    (entity) =>
      ({
        "&nbsp;": " ",
        "&amp;": "&",
        "&quot;": '"',
        "&apos;": "'",
        "&lt;": "<",
        "&gt;": ">",
        "&#39;": "'",
        "&#x27;": "'",
      })[entity.toLowerCase()] ?? entity,
  );

const plainText = (content: string) =>
  content
    .replace(/<br\s*\/?\s*>/gi, "\n")
    .replace(/<\/p>/gi, "\n")
    .replace(/<[^>]*>/g, "")
    .replace(/&nbsp;/gi, " ")
    .replace(/&(amp|quot|apos|lt|gt|#39|#x27);/gi, (entity) =>
      decodeCommonEntities(entity),
    )
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n{2,}/g, "\n")
    .trim();

const parseArticleContent = (content: string) => {
  const parts = content.split(/<h2[^>]*>([\s\S]*?)<\/h2>/gi);
  const intro = plainText(parts[0] ?? "");
  const sections = [] as Array<{ title: string; content: string }>;

  for (let index = 1; index < parts.length; index += 2) {
    const title = plainText(parts[index] ?? "");
    const sectionContent = plainText(parts[index + 1] ?? "");

    if (title && sectionContent) {
      sections.push({ title, content: sectionContent });
    }
  }

  return { intro, sections };
};

export default function ArticlesDetail({
  slug,
  canvas,
}: ArticlesDetailProps) {
  const { data: article } = useArticleBySlug(slug);
  const isFigmaArticle = slug === "field-tested-energy";
  const currentArticle = isFigmaArticle
    ? FALLBACK_ARTICLE
    : (article ?? FALLBACK_ARTICLE);
  const parsedContent = parseArticleContent(currentArticle.content);
  const leadContent = parsedContent.intro || plainText(currentArticle.content);
  const bodySections =
    parsedContent.sections.length > 0
      ? parsedContent.sections
      : [
          { title: "Powering PNG's Health Sector", content: leadContent },
          { title: "PImaga Health Center", content: leadContent },
        ];

  const renderView = (isCanvas: boolean) => (
    <main
      className={`${styles.page} ${isCanvas ? styles.canvasPage : ""}`}
      data-node-id={isCanvas ? "7077:6405" : "7077:6405-mobile"}
    >
      <SiteHeader layout={isCanvas ? "figmaCanvas" : "viewport"} />
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
          href="/enlighten/insights-articles"
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
            <p>{leadContent}</p>
            <div className={styles.leadExploreWrapper}>
              <FigmaAngledCta
                className={styles.explore}
                href={currentArticle.cta.href}
                size="sm"
              >
                {currentArticle.cta.text}
              </FigmaAngledCta>
            </div>
          </div>
          {/* biome-ignore lint/performance/noImgElement: CMS image URL is dynamic */}
          <img
            className={styles.featureImage}
            src={currentArticle.featuredImg.src}
            alt={currentArticle.featuredImg.alt}
          />
        </section>

        {bodySections.map((section, index) => (
          <section className={styles.body} key={`${section.title}-${index}`}>
            <h2>{section.title}</h2>
            <div className={styles.bodyRow}>
              <p>{section.content}</p>
              <div className={styles.sectionExploreWrapper}>
                <FigmaAngledCta
                  className={styles.sectionExplore}
                  href={currentArticle.cta.href}
                  size="sm"
                >
                  Explore
                </FigmaAngledCta>
              </div>
            </div>
          </section>
        ))}
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
        canvasAnchored={isCanvas}
        triggerVariant={isCanvas ? "figmaCanvas" : "default"}
        figmaPlaceholder="Let’s Talk Energy"
        triggerClassName={styles.chatTrigger}
        triggerStyle={
          isCanvas
            ? { top: 1332, left: 1484, width: 418, height: 52 }
            : undefined
        }
      />
    </main>
  );

  if (canvas !== undefined) {
    return renderView(canvas);
  }

  return (
    <FigmaPageCanvas
      desktop={renderView(true)}
      mobile={renderView(false)}
      nodeId="7077:6405"
      designHeight={1450}
      desktopBreakpoint={1200}
      scaleToViewport="width"
    />
  );
}
