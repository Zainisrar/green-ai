"use client";

import React from "react";
import PublicEventModalFrame from "./PublicEventModalFrame";
import styles from "./PublicEventDialogs.module.css";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onJoin?: () => void;
}

const STEPS = [
  {
    step: "Step 1",
    action: "Fill the Volunteer Interest Form →",
    hasJoin: true,
    left: 390,
    top: 95,
  },
  {
    step: "Step 2",
    action: "Get matched with a program/event near you",
    hasJoin: false,
    left: 365,
    top: 175,
  },
  {
    step: "Step 3",
    action: "Receive onboarding brief and safety training",
    hasJoin: false,
    left: 340,
    top: 255,
  },
  {
    step: "Step 4",
    action: "Show up, energize lives, and gain impact experience",
    hasJoin: false,
    left: 315,
    top: 335,
  },
];

export default function VolunteerSignUp({ isOpen, onClose, onJoin }: Props) {
  return (
    <PublicEventModalFrame
      isOpen={isOpen}
      onClose={onClose}
      title="Volunteer Sign-Up"
      titleDash="- Simple 4-step onboarding flow:"
    >
      <div className={styles.volunteerContainer}>
        <div className={styles.volunteerHeaderRow}>
          <h3 className={styles.volunteerColHeader} style={{ width: 220 }}>
            Step
          </h3>
          <h3 className={styles.volunteerColHeader}>Action</h3>
        </div>

        {STEPS.map((item, idx) => (
          <div
            key={idx}
            className={styles.volunteerStepItem}
            style={{ left: item.left, top: item.top }}
          >
            <span className={styles.volunteerStepLabel}>{item.step}</span>
            <div className={styles.volunteerActionWrap}>
              <p className={styles.volunteerActionText}>{item.action}</p>
              {item.hasJoin && (
                <button
                  type="button"
                  className={styles.volunteerJoinLink}
                  onClick={onJoin}
                >
                  Join Now
                </button>
              )}
            </div>
          </div>
        ))}

        <p className={styles.volunteerNote}>
          * Volunteer insurance and safety briefings are mandatory
        </p>
      </div>
    </PublicEventModalFrame>
  );
}
