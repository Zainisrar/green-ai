"use client";

import { useOurStory } from "../../../hooks/useOurStory";
import D6Chatbot from "../D6Chatbot";
import SiteHeader from "../SiteHeader/SiteHeader";
import FigmaPageCanvas from "../shared/FigmaPageCanvas";
import styles from "./OurStory.module.css";

const FALLBACK_DESCRIPTION =
  "GREEN Limited renewable energy solutions and services are predominantly targeted at rural areas that lack access to conventional energy sources and utilities. Our products and services are primarily designed to empower rural communities for economic and social growth, thereby improving their quality of life in a sustainable and healthful manner. Our delivery of solutions, products, and services ensures environmental value addition.";

export default function OurStory() {
  const { ourStoryData } = useOurStory();
  const key = ourStoryData?.key || "OUR STORY & MILESTONE";
  const [titleStart, titleEnd = "MILESTONE"] = key.split(" & ");
  const storyTitle = ourStoryData?.title || "Our Story";
  const description = ourStoryData?.description || FALLBACK_DESCRIPTION;
  const milestoneTitle = ourStoryData?.ourMilestone?.title || "Our Milestones";
  const timelineImage =
    ourStoryData?.ourMilestone?.maps?.activeImg ||
    "/images/our-story/ourstory1.png";
  const mapImage =
    ourStoryData?.ourMilestone?.maps?.secondaryImg ||
    "/images/our-story/ourstory2.png";

  const desktop = (
    <main className={styles.desktopPage} data-node-id="7077:6923">
      <img
        className={styles.storyArtwork}
        src="/images/our-story/mainImg.png"
        alt=""
      />
      <SiteHeader layout="figmaCanvas" highlightActive={false} />

      <h1 className={styles.pageTitle} data-node-id="7077:6960">
        {titleStart} &amp;
        <span>{titleEnd}</span>
      </h1>

      <img
        className={styles.watermark}
        src="/images/our-story/milestone.png"
        alt=""
      />

      <section className={styles.storyCopy} data-node-id="7077:6940">
        <h2>{storyTitle}</h2>
        <p>{description}</p>
      </section>

      <section className={styles.milestones} data-node-id="7077:6941">
        <h2>{milestoneTitle}</h2>
        <img src={timelineImage} alt="GREEN milestones from 2007 to 2025" />
      </section>

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
    <main className={styles.mobilePage} data-node-id="7077:6983-mobile">
      <SiteHeader panel="logoOnly" />
      <img
        className={styles.mobileArtwork}
        src="/images/our-story/mainImg.png"
        alt=""
      />
      <div className={styles.mobileContent}>
        <h1>
          {titleStart} &amp; <span>{titleEnd}</span>
        </h1>
        <section>
          <h2>{storyTitle}</h2>
          <p>{description}</p>
        </section>
        <section>
          <h2>{milestoneTitle}</h2>
          <img
            src={mapImage}
            alt="Map of GREEN milestones across Papua New Guinea"
          />
        </section>
      </div>
      <D6Chatbot />
    </main>
  );

  return (
    <FigmaPageCanvas desktop={desktop} mobile={mobile} nodeId="7077:6923" />
  );
}
