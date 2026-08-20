"use client";
import React, { useState } from "react";
import Link from "next/link";
import SiteHeader from "../SiteHeader/SiteHeader";
import D6Chatbot from "../D6Chatbot";
import FigmaAngledCta from "../FigmaAngledCta/FigmaAngledCta";
import FigmaQuoteBrackets from "../FigmaQuoteBrackets/FigmaQuoteBrackets";
import styles from "./PublicEventVolunteering.module.css";
import WhyWeEngage from "./Dialog/WhyWeEngage";
import WaystoGetInvolved from "./Dialog/WaystoGetInvolved";
import WhoCanJoin from "./Dialog/WhoCanJoin";
import VolunteerSignUp from "./Dialog/VolunteerSignUp";
import PastHighlights from "./Dialog/PastHighlights";
import SignUpToVolunteer from "./Modals/SignUpToVolunteer";

interface PublicEventVolunteeringProps {
  canvas?: boolean;
}

export default function PublicEventVolunteering({
  canvas = false,
}: PublicEventVolunteeringProps) {
  const [openModal, setOpenModal] = useState<string | null>(null);
  const [isSignUpFormOpen, setIsSignUpFormOpen] = useState(false);

  const highlightText = (
    text: string,
    highlight: string,
    wordCase = true
  ) => {
    if (!highlight) return text;
    const parts = text.split(new RegExp(`(${highlight})`, "gi"));
    return parts.map((part, index) => {
      const shouldHighlight =
        part.toLowerCase() === highlight.toLowerCase() ||
        (wordCase && part.toLowerCase() === highlight.toLowerCase());
      return shouldHighlight ? (
        <span key={index} className={styles.highlight}>
          {part}
        </span>
      ) : (
        part
      );
    });
  };

  const rows = [
    {
      key: "whyWeEngage",
      title: "Why We Engage",
      subtitle: "Our mission isn’t just to install systems — it’s to shift systems.",
      x: 793,
      y: 286,
      subY: 320,
      ctaX: 1586,
      ctaY: 296,
    },
    {
      key: "waysToGetInvolved",
      title: "Ways to Get Involved",
      subtitle: "Awareness drives, solar literacy, rural demonstrations",
      x: 747,
      y: 381,
      subY: 420,
      ctaX: 1540,
      ctaY: 396,
    },
    {
      key: "whoCanJoin",
      title: "Who Can Join?",
      subtitle: "No prior experience needed. Just willingness to act.",
      x: 704,
      y: 484,
      subY: 528,
      ctaX: 1492,
      ctaY: 501,
    },
    {
      key: "volunteerSignUp",
      title: "Volunteer Sign-Up",
      subtitle: "All GREEN events are coordinated by trained staff",
      x: 656,
      y: 588,
      subY: 630,
      ctaX: 1431,
      ctaY: 599,
    },
    {
      key: "pastHighlights",
      title: "Past Highlights",
      subtitle: "All Events and stories",
      x: 599,
      y: 695,
      subY: 741,
      ctaX: 1374,
      ctaY: 706,
    },
  ];

  return (
    <div className={styles.page} data-node-id="7077:24270">
      {/* Background */}
      <div
        style={{ transform: "skewX(-8deg)" }}
        className={styles.bgWrap}
        aria-hidden="true"
      >
        <img
          src="/images/public-events-volunteering/mainImg.png"
          alt=""
          className={styles.bgImg}
        />
      </div>
      <div className={styles.bgFade} aria-hidden="true" />

      {/* Site header */}
      <SiteHeader layout={canvas ? "figmaCanvas" : "viewport"} />

      {/* Vertical side title */}
      <div className={styles.verticalTitleWrap}>
        <p className={styles.verticalTitle}>PUBLIC EVENTS &amp; VOLUNTEERING</p>
      </div>

      {/* Page header */}
      <header className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>
          PUBLIC <span className={styles.green}>EVENTS</span> &amp; VOLUNTEERING
        </h1>
        <p className={styles.subHeadline}>
          Be Part of the Energy Transition. On the Ground. In the Community.
        </p>
        <p className={styles.description}>
          From school outreach to community solar cleanups —{" "}
          <span className={styles.highlight}>GREEN</span> invites individuals,
          institutions, and future changemakers to participate in hands-on
          action that matters.
        </p>
      </header>

      {/* Rows */}
      {rows.map((row, index) => (
        <div key={row.key} className={styles.row} style={{ top: row.y }}>
          <h3 className={styles.rowTitle} style={{ left: row.x }}>
            {row.title}
          </h3>
          <p className={styles.rowSub} style={{ left: row.x - 13, top: row.subY - row.y }}>
            {row.subtitle}
          </p>
          <FigmaAngledCta
            className={styles.rowCta}
            style={{
              position: "absolute",
              left: row.ctaX,
              top: row.ctaY - row.y,
            }}
            onClick={() => setOpenModal(row.key)}
          >
            Explore
          </FigmaAngledCta>
          {index < rows.length - 1 && <div className={styles.rowDivider} />}
        </div>
      ))}

      {/* Bottom quote */}
      <div className={styles.bottomQuote}>
        <FigmaQuoteBrackets
          leftStyle={{ left: -69, top: -11 }}
          rightStyle={{ right: -42, top: -16 }}
        />
        <h2 className={styles.bottomQuoteText}>
          You Don’t Need To Be An <span className={styles.highlight}>Engineer</span> To
          Power Change. You Just Need To Show Up. We’ll Show You How.
        </h2>
      </div>

      {/* Bottom-right CTAs */}
      <FigmaAngledCta
        className={styles.ctaSignUp}
        style={{ position: "absolute", left: 1631, top: 660 }}
        onClick={() => setIsSignUpFormOpen(true)}
      >
        Sign Up to Volunteer
      </FigmaAngledCta>
      <FigmaAngledCta
        className={styles.ctaCalendar}
        style={{ position: "absolute", left: 1528, top: 742 }}
        icon="chevron"
        href="/enlighten/events-webinars"
      >
        View Upcoming Events Calendar
      </FigmaAngledCta>
      <FigmaAngledCta
        className={styles.ctaWelcome}
        style={{ position: "absolute", left: 1498, top: 820 }}
        icon="download"
        href="/volunteer-welcome-pack.pdf"
      >
        Download Volunteer Welcome Pack (PDF)
      </FigmaAngledCta>

      {/* Chatbot */}
      {canvas ? (
        <D6Chatbot
          canvasAnchored
          triggerVariant="figmaCanvas"
          figmaPlaceholder="Let's Talk Energy"
          triggerStyle={{
            top: 899,
            right: "auto",
            bottom: "auto",
            left: 1499,
            width: 418,
          }}
        />
      ) : (
        <D6Chatbot />
      )}

      {/* Modals */}
      <WhyWeEngage isOpen={openModal === "whyWeEngage"} onClose={() => setOpenModal(null)} />
      <WaystoGetInvolved
        isOpen={openModal === "waysToGetInvolved"}
        onClose={() => setOpenModal(null)}
      />
      <WhoCanJoin isOpen={openModal === "whoCanJoin"} onClose={() => setOpenModal(null)} />
      <VolunteerSignUp
        isOpen={openModal === "volunteerSignUp"}
        onClose={() => setOpenModal(null)}
      />
      <PastHighlights
        isOpen={openModal === "pastHighlights"}
        onClose={() => setOpenModal(null)}
      />
      <SignUpToVolunteer
        isOpen={isSignUpFormOpen}
        onClose={() => setIsSignUpFormOpen(false)}
      />
    </div>
  );
}
