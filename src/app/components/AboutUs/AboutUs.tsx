"use client";

import React from "react";
import { useAboutUs } from "../../../hooks/useAboutUs";
import { parseAboutUsContent, parseQuoteContent } from "../../utils/htmlParser";
import D6Chatbot from "../D6Chatbot";
import SiteHeader from "../SiteHeader/SiteHeader";
import styles from "./AboutUs.module.css";

interface AboutUsProps {
  canvas?: boolean;
}

const AboutUs: React.FC<AboutUsProps> = ({ canvas = false }) => {
  const { aboutUsData } = useAboutUs();

  const parsedContent = aboutUsData
    ? parseAboutUsContent(aboutUsData.content)
    : null;
  const parsedQuote = aboutUsData ? parseQuoteContent(aboutUsData.quote) : null;

  const aboutParagraphs = parsedContent?.aboutGreenParagraphs ?? [
    "GREEN Limited - A Front-runner in sustainable living and Renewable Energy Solution Provider in Papua New Guinea has its global presence in the INDIA, USA and Australia helps to bring out the best of Product design, development and Project delivery strategies, prompt service and a support matrix more suitable to PNG with world class standards. GREEN Limited is an ISO 9001 certified company and complies with all the international standards and quality management methodologies.",
    "We are committed to enhancing and empowering lives through our energy solutions envisioned to end the energy-dependency for a sustainable and promising future.",
    "At GREEN, with a Global perspective bestows the finest solutions to Enable, Empower and Energize the drive for a sustainable future with our solutions for a better quality of life.",
  ];

  const whatParagraphs = parsedContent?.whatDoesGreenParagraphs ?? [
    "GREEN Limited renewable energy solutions and services are primarily focused at rural areas without access to conventional sources of energy or utilities. Our products and solutions are primarily intended to empower rural communities for economic and social growth, to enrich a sustainable and healthier quality of life. Our solutions, products and services delivery ensures that are environmental value addition.",
  ];

  const mainTitle = aboutUsData?.title || "About GREEN";
  const subHeadline =
    parsedContent?.subtitle ||
    "Enlightening Our Lives through Sustainable Energy Solutions";
  const whatTitle = parsedContent?.whatDoesGreenTitle || "What does GREEN do";
  const whatSubtitle =
    parsedContent?.whatDoesGreenSubtitle ||
    "Transforming Lives with Energy Independence";
  const quote1 = parsedQuote?.firstQuote || "A Transformation - That’s";
  const quote2 = parsedQuote?.secondQuote || "Perspicacious for a";

  if (canvas) {
    return (
      <main
        className={styles.canvasPage}
        data-about-us-hydrated="true"
        role="main"
        aria-label="Welcome to GREEN"
      >
        <SiteHeader layout="figmaCanvas" />

        {/* Left Image & CLEAN LEAN GREEN Parallelogram Banner */}
        <div className={styles.leftImageContainer}>
          <img
            src="/images/about-us/figma-masked-bg.png"
            alt="Children in sunshine"
            className={styles.leftImage}
          />
        </div>

        <div className={styles.cleanLeanBanner} aria-hidden="true">
          <img
            src="/images/about-us/figma-clean-lean-bg.png"
            alt=""
            className={styles.cleanLeanBg}
          />
          <div className={styles.cleanLeanText}>
            CLEAN
            <br />
            LEAN
            <br />
            <span className={styles.greenAccent}>GREEN</span>
          </div>
        </div>

        {/* Right Content Column */}
        <section className={styles.rightContent} aria-label="About Content">
          <h2 className={styles.mainTitle}>{mainTitle}</h2>
          <p className={styles.subHeadline}>{subHeadline}</p>
          {aboutParagraphs.map((paragraph, index) => (
            <p key={index} className={styles.bodyText}>
              {paragraph}
            </p>
          ))}

          <h3 className={styles.sectionTitle}>{whatTitle}</h3>
          <p className={styles.subHeadline}>{whatSubtitle}</p>
          {whatParagraphs.map((paragraph, index) => (
            <p key={index} className={styles.bodyText}>
              {paragraph}
            </p>
          ))}

          <div className={styles.quoteContainer}>
            <p className={styles.quoteLine1}>
              {quote1} <strong>GREEN!</strong>
            </p>
            <p className={styles.quoteLine2}>
              {quote2} <strong>BETTER WORLD!</strong>
            </p>
          </div>
        </section>

        <D6Chatbot canvasAnchored triggerVariant="figmaCanvas" />
      </main>
    );
  }

  return (
    <main
      className={styles.mobilePage}
      data-about-us-hydrated="true"
      role="main"
      aria-label="Welcome to GREEN"
    >
      <SiteHeader panel="logoOnly" />
      <div className={styles.mobileElements}>
        <div className={styles.mobileHero}>
          <img
            src="/images/about-us/figma-masked-bg.png"
            alt="Children in sunshine"
            className={styles.mobileHeroImg}
          />
        </div>

        <div className={styles.mobileCleanLean}>
          <h1>
            CLEAN
            <br />
            LEAN
            <br />
            <span className={styles.greenAccent}>GREEN</span>
          </h1>
        </div>

        <div className={styles.mobileContent}>
          <h2>{mainTitle}</h2>
          <p className={styles.mobileSubtitle}>{subHeadline}</p>
          {aboutParagraphs.map((paragraph, index) => (
            <p key={index} className={styles.mobileBody}>
              {paragraph}
            </p>
          ))}

          <h3>{whatTitle}</h3>
          <p className={styles.mobileSubtitle}>{whatSubtitle}</p>
          {whatParagraphs.map((paragraph, index) => (
            <p key={index} className={styles.mobileBody}>
              {paragraph}
            </p>
          ))}

          <div className={styles.mobileQuote}>
            <p>
              {quote1} <strong className={styles.greenAccent}>GREEN!</strong>
            </p>
            <p>
              {quote2} <strong>BETTER WORLD!</strong>
            </p>
          </div>
        </div>
      </div>
      <D6Chatbot />
    </main>
  );
};

export default AboutUs;
