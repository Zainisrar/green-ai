"use client";

import Link from "next/link";
import { useState } from "react";
import { useFastFactStats } from "../../../hooks/useFastFactStats";
import D6Chatbot from "../D6Chatbot";
import SiteHeader from "../SiteHeader/SiteHeader";
import FigmaPageCanvas from "../shared/FigmaPageCanvas";
import styles from "./FastFactStats.module.css";
import ConnectWithGreen from "./Modals/ConnectWithGreen";

const FALLBACK_CARDS = [
  {
    title: "200,014",
    subtitle: "Rural Homes Energized",
    details: "GREEN SunShine, Em’Pawa, SunSmart Scale-Up",
    detailLines: ["GREEN SunShine, Em’Pawa,", "SunSmart Scale-Up"],
  },
  {
    title: "223",
    subtitle: "Green Jobs Created",
    details: "Local Technician Tracks & SME Jobs",
    detailLines: ["Local Technician Tracks &", "SME Jobs"],
  },
  {
    title: "796,270",
    subtitle: "People Positively Affected",
    details:
      "Healthcenters, Hospitals, Schools, Government offices, Household Solar Expansion",
    detailLines: [
      "Healthcenters, Hospitals,",
      "Schools, Government offices,",
      "Household Solar Expansion",
    ],
  },
  {
    title: "6,126",
    subtitle: "Emissions Avoided",
    details: "Hybrid Solar with Storage Deployment",
    detailLines: ["Hybrid Solar with Storage", "Deployment"],
  },
] as const;

export default function FastFactStats() {
  const { fastFactsSection, impactSummarySection } = useFastFactStats();
  const [isConnectOpen, setIsConnectOpen] = useState(false);
  const blocks = fastFactsSection?.blocks ?? [];
  const energy = blocks[0]?.content.data ?? {};
  const economies = blocks[1]?.content.data ?? {};
  const people = blocks[2]?.content.data ?? {};
  const fossil = blocks[3]?.content.data ?? {};
  const cards = FALLBACK_CARDS.map((fallback, index) => ({
    ...fallback,
    ...impactSummarySection?.cards[index],
  }));
  const title = fastFactsSection?.title || "FAST FACTS & STATS";
  const subtitle =
    fastFactsSection?.subtitle || "Where We Prove What’s Possible";
  const description =
    fastFactsSection?.description ||
    "In the world’s most challenging terrain, GREEN delivered measurable transformation. Not theory. Not potential. Execution.";
  const quoteHeadline =
    impactSummarySection?.quote?.headline || "Real Impact. In Real Places.";
  const quoteDescription =
    impactSummarySection?.quote?.description ||
    "This isn't a vision. This is delivery — structured, scalable, and underway.";
  const impactWordStart = quoteHeadline.indexOf("Impact");
  const quoteAfterImpact =
    impactWordStart >= 0
      ? quoteHeadline.slice(impactWordStart + "Impact".length)
      : "";
  const quotePlaceBreak = quoteAfterImpact.indexOf(" In ");

  const factBlocks = [
    {
      title: blocks[0]?.title || "Energy Delivered",
      image: "/images/facts/energy.png",
      lines: [
        [energy.MW_deployed || "3.91 MW", "deployed."],
        [energy.Homes_electrified || "200,014", "Homes electrified."],
        [
          energy.Schools || "526",
          `Schools. ${energy.Health_posts || "28"} Health posts.`,
        ],
        [
          energy.Modular_systems_installed || "280+",
          "modular systems installed.",
        ],
      ],
    },
    {
      title: blocks[1]?.title || "Economies Triggered",
      image: "/images/facts/economics.png",
      lines: [
        [
          (economies.SMEs_powered || 3505).toLocaleString(),
          "SME / microbusinesses now powered..",
        ],
        [
          (economies.SME_jobs_created || 7010).toLocaleString(),
          "SME jobs created in remote provinces.",
        ],
        ["", "New service economies built on energy access."],
      ],
    },
    {
      title: blocks[2]?.title || "People Reached",
      image: "/images/facts/people.png",
      lines: [
        [(people.Lives_touched || 796270).toLocaleString(), "lives touched.."],
        ["", "Study hours extended."],
        ["", "Medical care stabilized."],
        ["", "Connectivity where none existed."],
      ],
    },
    {
      title: blocks[3]?.title || "Fossil Fuels Displaced",
      image: "/images/facts/fossil.png",
      lines: [
        [
          (fossil.Diesel_avoided_litres || 2734979).toLocaleString(),
          "Litres of diesel avoided each year.",
        ],
        [
          (fossil.CO2_cut_tonnes || 6126).toLocaleString(),
          "Tonnes of CO₂ cut.",
        ],
        ["", "Clean energy adoption rising across regions"],
      ],
    },
  ] as const;

  const desktop = (
    <main className={styles.desktopPage} data-node-id="7077:6529">
      <img
        className={styles.rightImage}
        src="/images/facts/lgImage.png"
        alt=""
      />
      <SiteHeader layout="figmaCanvas" highlightActive={false} />
      <h1 className={styles.pageTitle} data-node-id="7077:6542">
        Fast <strong>Facts</strong> <span>&amp; Stats</span>
      </h1>
      <img
        className={styles.watermark}
        src="/images/facts/fast-facts-stats.png"
        alt=""
      />
      <section className={styles.intro} data-node-id="7077:6536">
        <h2>{subtitle}</h2>
        <p>– {description}</p>
      </section>
      <section className={styles.factGrid}>
        {factBlocks.map((block, index) => (
          <article
            className={styles.fact}
            key={block.title}
            data-node-id={`7077:${6572 + index}`}
          >
            <img src={block.image} alt="" />
            <div>
              <h2>{block.title}</h2>
              {block.lines.map(([value, text]) => (
                <p key={`${value}-${text}`}>
                  {value ? <strong>{value}</strong> : null} {text}
                </p>
              ))}
            </div>
          </article>
        ))}
      </section>
      <section className={styles.impactCards} aria-label="Impact summary">
        {cards.map((card, index) => (
          <article key={card.title} data-node-id={`7077:${6530 + index}`}>
            <img src="/images/facts/figma-impact-card.svg" alt="" />
            <div>
              <strong>{card.title}</strong>
              {index === 3 ? <small>tones annually</small> : null}
              <h3>{card.subtitle.replace("Tonnes Annually ", "")}</h3>
              <p>{card.detailLines.join("\n")}</p>
            </div>
          </article>
        ))}
      </section>
      <section className={styles.quoteBox} data-node-id="7077:6554">
        <img src="/images/facts/figma-real-impact.svg" alt="" />
        <h2>
          {impactWordStart >= 0
            ? quoteHeadline.slice(0, impactWordStart)
            : quoteHeadline}
          {impactWordStart >= 0 ? (
            <span className={styles.green}>Impact</span>
          ) : null}
          {impactWordStart >= 0 && quotePlaceBreak >= 0 ? (
            <>
              {quoteAfterImpact.slice(0, quotePlaceBreak)}
              <br />
              {quoteAfterImpact.slice(quotePlaceBreak + 1)}
            </>
          ) : impactWordStart >= 0 ? (
            quoteAfterImpact
          ) : null}
        </h2>
      </section>
      <div className={styles.deliveryQuote} data-node-id="7077:6537">
        {quoteDescription.includes("—") ? (
          <>
            {quoteDescription
              .split("—")[0]
              .split(".")
              .filter(Boolean)
              .map((line, index, source) => (
                <p key={line}>
                  {line.trim()}
                  {index < source.length - 1 ? "." : null}
                </p>
              ))}
            <p>
              —{" "}
              <span className={styles.green}>
                {quoteDescription.split("—")[1].trim()}
              </span>
            </p>
          </>
        ) : (
          <p>{quoteDescription}</p>
        )}
      </div>
      <div className={styles.actions}>
        <button
          type="button"
          onClick={() => setIsConnectOpen(true)}
          data-node-id="7077:6563"
        >
          <img src="/images/facts/connectwithgreen.png" alt="" />
          <span>
            {impactSummarySection?.cta[0]?.text || "Connect with GREEN"}
          </span>
          <b>›</b>
        </button>
        <Link
          href={impactSummarySection?.cta[1]?.link || "#"}
          data-node-id="7077:6569"
        >
          <img src="/images/facts/downloadimpactsummary.png" alt="" />
          <span>
            {impactSummarySection?.cta[1]?.text || "Download Impact Summary"}
          </span>
        </Link>
      </div>
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
    </main>
  );

  const mobile = (
    <main className={styles.mobilePage} data-node-id="7077:6529-mobile">
      <SiteHeader panel="logoOnly" />
      <img
        className={styles.mobileImage}
        src="/images/facts/fast-facts-stats-mbImg.png"
        alt=""
      />
      <div className={styles.mobileContent}>
        <h1>{title}</h1>
        <h2>{subtitle}</h2>
        <p className={styles.mobileIntro}>{description}</p>
        {factBlocks.map((block) => (
          <article className={styles.mobileFact} key={block.title}>
            <img src={block.image} alt="" />
            <div>
              <h3>{block.title}</h3>
              {block.lines.map(([value, text]) => (
                <p key={`${value}-${text}`}>
                  {value ? <strong>{value}</strong> : null} {text}
                </p>
              ))}
            </div>
          </article>
        ))}
        <div className={styles.mobileCards}>
          {cards.map((card) => (
            <article key={card.title}>
              <strong>{card.title}</strong>
              <h3>{card.subtitle}</h3>
              <p>{card.details}</p>
            </article>
          ))}
        </div>
      </div>
      <D6Chatbot />
    </main>
  );

  return (
    <>
      <FigmaPageCanvas desktop={desktop} mobile={mobile} nodeId="7077:6529" />
      <ConnectWithGreen
        isOpen={isConnectOpen}
        onClose={() => setIsConnectOpen(false)}
      />
    </>
  );
}
