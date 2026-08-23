"use client";

import { useVisionMission } from "../../../hooks/useVisionMission";
import D6Chatbot from "../D6Chatbot";
import SiteHeader from "../SiteHeader/SiteHeader";
import FigmaPageCanvas from "../shared/FigmaPageCanvas";
import styles from "./Vision.module.css";

const FALLBACK_VISION = {
  title: "Our Vision",
  description:
    "Envisioning the Energy needs and Envisaging the Environmental Impacts on the Globe, GREEN delivers Clean, lean and Green Solutions",
  quote:
    "Our aspiration is to empower lives with Sustainable Living and Renewable Energy Solutions",
  icon: "/images/our-vision/figma-vision-icon.png",
};

const FALLBACK_MISSION = {
  title: "Our Mission",
  description:
    "Sustainable Living and Renewable Energy Solutions for all. To Spearhead the Renewable Energy Movement for Greener environment globally & contribute to Sustainable Development Goals",
  quote:
    "Innovating, Developing and Delivering Sustainable Renewable Energy based Solutions and Products for a greener social and industrial environment and thereby to ensure community welfare and rural empowerment",
  icon: "/images/our-vision/figma-mission-icon.png",
};

export default function Vision() {
  const { visionMissionSection } = useVisionMission();
  const visionSource = visionMissionSection?.blocks?.[0];
  const missionSource = visionMissionSection?.blocks?.[1];
  const vision = {
    title: visionSource?.title || FALLBACK_VISION.title,
    description:
      visionSource?.content?.description || FALLBACK_VISION.description,
    quote: visionSource?.content?.quote || FALLBACK_VISION.quote,
    icon: visionSource?.icon?.src || FALLBACK_VISION.icon,
  };
  const mission = {
    title: missionSource?.title || FALLBACK_MISSION.title,
    description:
      missionSource?.content?.description || FALLBACK_MISSION.description,
    quote: missionSource?.content?.quote || FALLBACK_MISSION.quote,
    icon: missionSource?.icon?.src || FALLBACK_MISSION.icon,
  };
  const sectionTitle = visionMissionSection?.title || "Future: Envisioned";
  const [titleStart, titleEnd = "Envisioned"] = sectionTitle.split(":");
  const footer =
    visionMissionSection?.footer?.text ||
    "Envision and Enlighten lives with GREEN’s Sustainable Energy Solutions";
  const greenFooterStart = footer.indexOf("GREEN");

  const desktop = (
    <main className={styles.desktopPage} data-node-id="7077:6846">
      <div className={styles.eyeArtwork} aria-hidden="true">
        <img src="/images/our-vision/figma-eye.png" alt="" />
      </div>
      <SiteHeader layout="figmaCanvas" highlightActive={false} />
      <h1 className={styles.pageTitle} data-node-id="7077:6867">
        {titleStart}:<span>{titleEnd.trim()}</span>
      </h1>
      <img
        className={styles.watermark}
        src="/images/our-vision/vision.png"
        alt=""
      />

      <section
        className={`${styles.card} ${styles.visionCard}`}
        data-node-id="7077:6847"
      >
        <img
          className={styles.cardShape}
          src="/images/our-vision/figma-vision-card.svg"
          alt=""
        />
        <img className={styles.cardIcon} src={vision.icon} alt="" />
        <h2>{vision.title}</h2>
        <p className={styles.description}>{vision.description}</p>
        <p className={styles.quote}>
          <span>“</span>
          {vision.quote}
          <span>”</span>
        </p>
      </section>

      <section
        className={`${styles.card} ${styles.missionCard}`}
        data-node-id="7077:6848"
      >
        <img
          className={styles.cardShape}
          src="/images/our-vision/figma-mission-card.svg"
          alt=""
        />
        <img className={styles.cardIcon} src={mission.icon} alt="" />
        <h2>{mission.title}</h2>
        <p className={styles.description}>{mission.description}</p>
        <p className={styles.quote}>
          <span>“</span>
          {mission.quote}
          <span>”</span>
        </p>
      </section>

      <p className={styles.footer} data-node-id="7077:6878">
        {greenFooterStart >= 0 ? footer.slice(0, greenFooterStart) : footer}
        {greenFooterStart >= 0 ? (
          <span>{footer.slice(greenFooterStart)}</span>
        ) : null}
      </p>

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
    <main className={styles.mobilePage} data-node-id="7077:6885-mobile">
      <SiteHeader panel="logoOnly" />
      <img
        className={styles.mobileEye}
        src="/images/our-vision/mainImg.png"
        alt=""
      />
      <div className={styles.mobileContent}>
        <h1>
          {titleStart}: <span>{titleEnd.trim()}</span>
        </h1>
        {[vision, mission].map((item) => (
          <article key={item.title}>
            <div>
              <img src={item.icon} alt="" />
              <h2>{item.title}</h2>
            </div>
            <p>{item.description}</p>
            <blockquote>“{item.quote}”</blockquote>
          </article>
        ))}
        <p className={styles.mobileFooter}>{footer}</p>
      </div>
      <D6Chatbot />
    </main>
  );

  return (
    <FigmaPageCanvas desktop={desktop} mobile={mobile} nodeId="7077:6846" />
  );
}
