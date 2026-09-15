"use client";

import React from "react";
import PublicEventModalFrame from "./PublicEventModalFrame";
import styles from "./PublicEventDialogs.module.css";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function WhyWeEngage({ isOpen, onClose }: Props) {
  return (
    <PublicEventModalFrame
      isOpen={isOpen}
      onClose={onClose}
      title="Why We Engage"
      titleDash="- “Our mission isn’t just to install systems — it’s to shift systems”"
    >
      <div className={styles.engageContainer}>
        <div className={styles.engageTextCol}>
          <p className={styles.engageParagraph}>
            Our mission isn’t just to install systems
            <br />—{" "}
            <span className={styles.engageStrong}>it’s to shift systems</span>.
            And for that, we need people power:
            <br />
            informed, inspired, and involved.
          </p>

          <p className={styles.engageParagraph}>
            Whether you’re a student, teacher, village leader, or climate
            advocate
            <br />— there’s a place for you in{" "}
            <span className={styles.engageHighlight}>GREEN</span>’s growing
            movement.
          </p>
        </div>

        <div className={styles.engageImageFrame}>
          <img
            src="/images/public-events-volunteering/why-we-engage-model.png"
            alt="Solar installation and community engagement"
            className={styles.engageImage}
            loading="lazy"
            decoding="async"
          />
        </div>

        <div className={styles.engageQuoteRow}>
          <p className={styles.engageQuoteText}>
            “Our Mission Isn’t Just To Install Systems — It’s To Shift Systems”
          </p>
        </div>
      </div>
    </PublicEventModalFrame>
  );
}
