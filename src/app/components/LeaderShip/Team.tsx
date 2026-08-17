"use client";

import { useLeadershipTeam } from "../../../hooks/useLeadershipTeam";
import D6Chatbot from "../D6Chatbot";
import SiteHeader from "../SiteHeader/SiteHeader";
import FigmaPageCanvas from "../shared/FigmaPageCanvas";
import styles from "./Team.module.css";

const FALLBACK_MEMBERS = [
  {
    name: "Bernard George",
    designation: "Chief Executive Officer",
    image: "/images/our-team/bernard-george.png",
  },
  {
    name: "Senthilkumar Chockalingam",
    designation: "Senior Business and Engineering Manager",
    image: "/images/our-team/senthilkumar.png",
  },
  {
    name: "Bernard George",
    designation: "Chief Executive Officer",
    image: "/images/our-team/bernard-george.png",
  },
  {
    name: "Bernard George",
    designation: "Chief Executive Officer",
    image: "/images/our-team/bernard-george.png",
  },
  {
    name: "Senthilkumar Chockalingam",
    designation: "Senior Business and Engineering Manager",
    image: "/images/our-team/senthilkumar.png",
  },
  {
    name: "Bernard George",
    designation: "Chief Executive Officer",
    image: "/images/our-team/bernard-george.png",
  },
] as const;

export default function Team() {
  const { leadershipSection } = useLeadershipTeam();
  const apiMembers = leadershipSection?.members ?? [];
  const members = FALLBACK_MEMBERS.map((fallback, index) => ({
    name: apiMembers[index]?.name || fallback.name,
    designation: apiMembers[index]?.designation || fallback.designation,
    image: apiMembers[index]?.img?.src || fallback.image,
    alt: apiMembers[index]?.img?.alt || fallback.name,
  }));
  const title = leadershipSection?.title || "Leadership Team";
  const titleWords = title.trim().split(/\s+/);
  const titleEnd = titleWords.pop() || "Team";
  const titleStart = titleWords.join(" ") || "Leadership";

  const desktop = (
    <main className={styles.desktopPage} data-node-id="7077:6769">
      <img
        className={styles.backgroundArtwork}
        src="/images/our-team/mainImg.png"
        alt=""
      />
      <SiteHeader layout="figmaCanvas" highlightActive={false} />
      <h1 className={styles.pageTitle} data-node-id="7077:6789">
        {titleStart}
        <span>{titleEnd}</span>
      </h1>
      <img
        className={styles.watermark}
        src="/images/our-team/team.png"
        alt=""
      />

      <section className={styles.teamGrid} aria-label="Leadership team">
        {members.map((member, index) => (
          <article
            className={`${styles.member} ${index === 1 || index === 4 ? styles.engineer : ""}`}
            key={`${member.name}-${index}`}
            data-node-id={`7077:${6800 + index}`}
          >
            <img
              className={styles.frame}
              src="/images/our-team/figma-member-frame.svg"
              alt=""
            />
            <img
              className={styles.portrait}
              src={member.image}
              alt={member.alt}
            />
            <div className={styles.memberCopy}>
              <h2>{member.name}</h2>
              <p>{member.designation}</p>
            </div>
          </article>
        ))}
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
    <main className={styles.mobilePage} data-node-id="7077:6769-mobile">
      <SiteHeader panel="logoOnly" />
      <img
        className={styles.mobileArtwork}
        src="/images/our-team/mainImg.png"
        alt=""
      />
      <div className={styles.mobileContent}>
        <h1>
          {titleStart} <span>{titleEnd}</span>
        </h1>
        <div className={styles.mobileGrid}>
          {members.map((member, index) => (
            <article key={`${member.name}-mobile-${index}`}>
              <div>
                <img src="/images/our-team/maskImg.png" alt="" />
                <img src={member.image} alt={member.alt} />
              </div>
              <h2>{member.name}</h2>
              <p>{member.designation}</p>
            </article>
          ))}
        </div>
      </div>
      <D6Chatbot />
    </main>
  );

  return (
    <FigmaPageCanvas desktop={desktop} mobile={mobile} nodeId="7077:6769" />
  );
}
