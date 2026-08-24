"use client";

import type React from "react";
import TopNavigation from "./TopNavigation/TopNavigation";

type NavigationProps = {
  items: { name: string; link: string }[];
};

interface Props {
  backroundImg: string;
  navigation: NavigationProps;
  title: string;
  subheadline: string;
  description: React.ReactNode;
  name1: string;
  name2: string;
  cardTitle: string;
  keypoints1: { icon: string; text: React.ReactNode }[];
  keypoints2: { icon: string; text: React.ReactNode }[];
}

const Insight24: React.FC<Props> = ({
  title,
  subheadline,
  description,
  name1,
  name2,
  cardTitle,
  backroundImg,
  keypoints1,
  keypoints2,
}) => {
  const keypoints = [...keypoints1, ...keypoints2];
  const figmaTitle = title.replace(/\s*:/, " :");
  const isHotel = name2.toLowerCase().includes("hotel");

  return (
    <main
      className={`solar-home-insight${isHotel ? " solar-home-insight--hotel" : ""}`}
    >
      <div className="solar-home-insight__solar" aria-hidden="true">
        <img loading="lazy" decoding="async" src={backroundImg} alt="" />
      </div>
      <img loading="lazy" decoding="async"
        className="solar-home-insight__left-shape"
        src="/images/insight1/figma/left-shape-b.svg"
        alt=""
        aria-hidden="true"
      />

      <TopNavigation />

      <div className="solar-home-insight__name">
        <span>{name1}</span> <strong>{name2}</strong>
      </div>

      <div className="solar-home-insight__title">
        <div>{figmaTitle}</div>
        <div>{subheadline}</div>
      </div>

      <p className="solar-home-insight__description">{description}</p>

      <section
        className="solar-home-insight__facts"
        aria-label="Solar Home benefits"
      >
        {keypoints.map((point, index) => (
          <article
            className={`solar-home-insight__fact solar-home-insight__fact--${index + 1}`}
            key={index}
          >
            <img loading="lazy" decoding="async" src={point.icon} alt="" />
            <p>{point.text}</p>
          </article>
        ))}
      </section>

      <div
        className="solar-home-insight__quote-panel"
        aria-label="Insight quote"
      >
        <p>
          <span>“</span>
          {isHotel ? (
            <>
              <span className="solar-home-insight__hotel-quote">
                Empower Hotels as
                <br />
                leadership in sustainability
                <br />
                and climate responsibility.
              </span>
            </>
          ) : (
            cardTitle
          )}
          <span>”</span>
        </p>
      </div>

      <p className="solar-home-insight__tag">
        # {name2} &nbsp;Insight {isHotel ? "04" : "02"}
      </p>

      <button
        className="solar-home-insight__chat"
        type="button"
        aria-label="Open chat"
      >
        <img loading="lazy" decoding="async"
          className="insight-chat__panel"
          src="/images/insight1/figma/chat-panel.svg"
          alt=""
          aria-hidden="true"
        />
        <span className="insight-chat__label">Let’s Talk Energy</span>
        <img loading="lazy" decoding="async"
          className="insight-chat__microphone"
          src="/images/insight1/figma/chat-microphone.svg"
          alt=""
          aria-hidden="true"
        />
      </button>
    </main>
  );
};

export default Insight24;
