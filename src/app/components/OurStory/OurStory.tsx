"use client";

import { useOurStory } from "../../../hooks/useOurStory";
import D6Chatbot from "../D6Chatbot";
import SiteHeader from "../SiteHeader/SiteHeader";
import FigmaPageCanvas from "../shared/FigmaPageCanvas";
import styles from "./OurStory.module.css";

const FALLBACK_DESCRIPTION =
  "GREEN Limited renewable energy solutions and services are predominantly targeted at rural areas that lack access to conventional energy sources and utilities. Our products and services are primarily designed to empower rural communities for economic and social growth, thereby improving their quality of life in a sustainable and healthful manner. Our delivery of solutions, products, and services ensures environmental value addition.";
const MILESTONE_MAP = "/images/our-story/milestone-map.png";

export default function OurStory() {
  const { ourStoryData } = useOurStory();
  const storyTitle = ourStoryData?.title || "Our Story";
  const description = ourStoryData?.description || FALLBACK_DESCRIPTION;
  const milestoneTitle = ourStoryData?.ourMilestone?.title || "Our Milestones";

  const desktop = (
    <main className={styles.desktopPage} data-node-id="7077:6983">
      <SiteHeader layout="figmaCanvas" highlightActive={false} />

      <img
        className={styles.collage}
        src="/images/our-story/collage.png"
        alt=""
      />

      <img
        className={styles.pageTitleImg}
        src="/images/our-story/title_h1.png"
        alt="Our Story & Milestone"
      />

      <img
        className={styles.watermark}
        src="/images/our-story/mile_vert.png"
        alt=""
      />

      <section className={styles.storyCopy}>
        <h2>{storyTitle}</h2>
        <p>{description}</p>
      </section>

      <section className={styles.milestones}>
        <h2 className={styles.milestonesTitle}>{milestoneTitle}</h2>
        <img
          className={styles.milestoneMap}
          src={MILESTONE_MAP}
          alt="Map of GREEN milestones across Papua New Guinea"
        />
        <a className={styles.readMore} href="#read-more">
          <span>Read more</span>
          <img
            className={styles.readMoreArrow}
            src="/images/our-story/readmore_arrow.png"
            alt=""
          />
        </a>
      </section>

      <D6Chatbot
        canvasAnchored
        triggerVariant="figmaCanvas"
        figmaPlaceholder="Let’s Talk Energy"
        triggerClassName={styles.chatTrigger}
      />
    </main>
  );

  const mobile = (
    <main className={styles.mobilePage}>
      <SiteHeader panel="logoOnly" />
      <img
        className={styles.mobileArtwork}
        src="/images/our-story/mainImg.png"
        alt=""
      />
      <div className={styles.mobileContent}>
        <h1>
          Our Story &amp; <span>Milestone</span>
        </h1>
        <section>
          <h2>{storyTitle}</h2>
          <p>{description}</p>
        </section>
        <section>
          <h2>{milestoneTitle}</h2>
          <img
            src={
              ourStoryData?.ourMilestone?.maps?.secondaryImg || MILESTONE_MAP
            }
            alt="Map of GREEN milestones across Papua New Guinea"
          />
        </section>
      </div>
      <D6Chatbot figmaPlaceholder="Let’s Talk Energy" />
    </main>
  );

  return (
    <FigmaPageCanvas desktop={desktop} mobile={mobile} nodeId="7077:6923" />
  );
}
