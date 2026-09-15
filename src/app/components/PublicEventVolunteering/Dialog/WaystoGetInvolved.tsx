"use client";

import React from "react";
import Link from "next/link";
import PublicEventModalFrame from "./PublicEventModalFrame";
import FigmaAngledCta from "../../FigmaAngledCta/FigmaAngledCta";
import styles from "./PublicEventDialogs.module.css";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

interface InitiativeItem {
  title: string;
  desc: string;
  image: string;
  left: number;
  top: number;
}

const INITIATIVES: InitiativeItem[] = [
  // Left Column (slanted down-left)
  {
    title: "Clean Energy Campaigns",
    desc: "Awareness drives, solar literacy, rural demonstrations",
    image: "/images/public-events-volunteering/clean-energy-campaigns.png",
    left: 275,
    top: 30,
  },
  {
    title: "Community Volunteer Days",
    desc: "Mini-grid site visits, solar install support, environment cleanup",
    image: "/images/public-events-volunteering/community-volunteer-days.png",
    left: 193,
    top: 170,
  },
  {
    title: "Events & Exhibitions",
    desc: "Attend GREEN public expos, launch days, and energy fairs",
    image: "/images/public-events-volunteering/events-exhibitions.png",
    left: 111,
    top: 310,
  },
  // Right Column (slanted down-left)
  {
    title: "School & Campus Outreach",
    desc: "STEM sessions, hands-on tech demos, GreenTalks",
    image: "/images/public-events-volunteering/school-campus-outreach.png",
    left: 919,
    top: 30,
  },
  {
    title: "Energy Advocacy",
    desc: "Join our efforts to raise voices on energy justice, access, and equity",
    image: "/images/public-events-volunteering/energy-advocacy.png",
    left: 828,
    top: 170,
  },
];

export default function WaystoGetInvolved({ isOpen, onClose }: Props) {
  return (
    <PublicEventModalFrame
      isOpen={isOpen}
      onClose={onClose}
      title="Ways to Get Involved"
      titleDash="- From community action to grassroots advocacy:"
    >
      <div className={styles.waysContainer}>
        {INITIATIVES.map((item, idx) => (
          <div
            key={idx}
            className={styles.waysItem}
            style={{ left: item.left, top: item.top }}
          >
            <div className={styles.waysImgFrame}>
              <img
                src={item.image}
                alt={item.title}
                className={styles.waysImg}
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className={styles.waysInfo}>
              <h4 className={styles.waysTitle}>{item.title}</h4>
              <p className={styles.waysDesc}>{item.desc}</p>
              <FigmaAngledCta className={styles.waysCta}>
                Explore
              </FigmaAngledCta>
            </div>
          </div>
        ))}

        <Link
          href="/volunteer-welcome-pack.pdf"
          className={styles.waysBottomLink}
          style={{ left: 828, top: 330 }}
        >
          <em>Download</em>
          <span className={styles.waysBottomLinkAccent}>
            Volunteer Welcome Pack (PDF)
          </span>
        </Link>
      </div>
    </PublicEventModalFrame>
  );
}
