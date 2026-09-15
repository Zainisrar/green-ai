"use client";

import React from "react";
import PublicEventModalFrame from "./PublicEventModalFrame";
import styles from "./PublicEventDialogs.module.css";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const ROLES = [
  // Left column (slanted down-left)
  {
    icon: "/images/public-events-volunteering/university-students.png",
    text: "Secondary & University Students (PNG-Based Or International)",
    left: 322,
    top: 50,
  },
  {
    icon: "/images/public-events-volunteering/energy-sustainability.png",
    text: "Individual volunteers passionate about energy & sustainability",
    left: 273,
    top: 175,
  },
  {
    icon: "/images/public-events-volunteering/ward-level-organisers.png",
    text: "Community leaders and ward-level organisers",
    left: 222,
    top: 300,
  },
  // Right column (slanted down-left)
  {
    icon: "/images/public-events-volunteering/church-networks.png",
    text: "Local NGOs, youth groups, and church networks",
    left: 1120,
    top: 50,
  },
  {
    icon: "/images/public-events-volunteering/stem-facilators.png",
    text: "Educators and STEM facilitators",
    left: 1060,
    top: 175,
  },
];

export default function WhoCanJoin({ isOpen, onClose }: Props) {
  return (
    <PublicEventModalFrame
      isOpen={isOpen}
      onClose={onClose}
      title="Who Can Join?"
    >
      <div className={styles.whoContainer}>
        {ROLES.map((role, idx) => (
          <div
            key={idx}
            className={styles.whoItem}
            style={{ left: role.left, top: role.top }}
          >
            <img
              src={role.icon}
              alt=""
              aria-hidden="true"
              className={styles.whoIcon}
            />
            <p className={styles.whoText}>{role.text}</p>
          </div>
        ))}
      </div>
    </PublicEventModalFrame>
  );
}
