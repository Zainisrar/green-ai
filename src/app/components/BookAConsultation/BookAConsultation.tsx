"use client";
import { useState } from "react";
import D6Chatbot from "../D6Chatbot";
import FigmaAngledCta from "../FigmaAngledCta/FigmaAngledCta";
import SiteHeader from "../SiteHeader/SiteHeader";
import Booking from "../BookConsulation/Modals/Booking";
import styles from "./BookAConsultation.module.css";

const CTA_LINKS = {
  partnershipFramework: "/volunteer-welcome-pack.pdf",
};

const BENEFITS = [
  {
    benefit: "Project Planning",
    description: "Site evaluation, load estimation, feasibility reviews",
  },
  {
    benefit: "Solar EPCM Advisory",
    description:
      "Procurement design, component selection, commissioning guidance",
  },
  {
    benefit: "Policy & Energy Access",
    description: "Regulatory navigation, rural electrification roadmaps",
  },
  {
    benefit: "Donor & Development",
    description:
      "Proposal alignment, ESG integration, monitoring & verification",
  },
  {
    benefit: "Technology Vendors",
    description:
      "Product qualification, integration testing, local market readiness",
  },
];

const DESCRIPTION_PARTS = [
  "Whether you're developing a project, designing a grant, or planning a regional rollout — schedule a tailored consultation with ",
  "GREEN",
  "\u2019s technical, strategy, or policy teams. Get real answers from those who deliver real energy systems.",
];

const QUOTE_PARTS = [
  "You Don\u2019t Need To Navigate\nEnergy Decisions Alone.\nWith ",
  "GREEN",
  ", Expert Insight\nIs Just A Click Away.",
];

const FREE_NOTE_PARTS = [
  "Consultations are free for ",
  "government agencies, donors, NGOs",
  ", and registered local businesses.",
];

const highlight = (
  parts: string[],
  colorClass: string,
): React.ReactNode => {
  return parts.map((part, i) =>
    i === 1 ? (
      <span key={i} className={colorClass}>
        {part}
      </span>
    ) : (
      <span key={i}>{part}</span>
    )
  );
};

interface BookAConsultationProps {
  canvas?: boolean;
}

export default function BookAConsultation({
  canvas = false,
}: BookAConsultationProps) {
  const [bookingOpen, setBookingOpen] = useState(false);

  return (
    <main className={styles.page} data-node-id="7077:19924">
      <SiteHeader
        layout={canvas ? "figmaCanvas" : "viewport"}
        figmaPanelVariant="flagship"
      />

      {/* Vertical side title (Raleway Black 900, outlined, bottom-up) */}
      <div className={styles.verticalTitle} aria-hidden="true">
        <p>Book a Consultation</p>
      </div>

      {/* Right faint collage (masked photo collage) */}
      <div className={styles.rightCollage} aria-hidden="true">
        <img src="/images/book-consulation/collage.png" alt="" />
      </div>

      {/* Header block */}
      <div className={styles.headerBlock}>
        <h1 className={styles.mainTitle}>
          BOOK A <span className={styles.greenText}>CONSULTATION</span>
        </h1>
        <p className={styles.subHeadline}>Let&rsquo;s Solve Energy, Together.</p>
        <p className={styles.description}>
          {highlight(DESCRIPTION_PARTS, styles.greenText)}
        </p>
      </div>

      {/* Consultation Focus Areas */}
      <h2 className={styles.sectionTitle} style={{ top: 303 }}>
        Consultation Focus Areas
      </h2>
      <p className={styles.tableHeader} style={{ left: 264, top: 359 }}>
        Benefit
      </p>
      <p className={styles.tableHeader} style={{ left: 692, top: 357 }}>
        Description
      </p>
      <div className={styles.benefitCol}>
        {BENEFITS.map((b) => (
          <p key={b.benefit}>{b.benefit}</p>
        ))}
      </div>
      <div className={styles.descriptionCol}>
        {BENEFITS.map((b) => (
          <p key={b.benefit}>{b.description}</p>
        ))}
      </div>

      {/* Booking Details */}
      <h2 className={styles.sectionTitle} style={{ top: 639 }}>
        Booking Details
      </h2>

      <img
        src="/images/book-consulation/figma-bolt.png"
        alt=""
        className={styles.boltIcon}
        style={{ left: 262, top: 678 }}
      />
      <p className={styles.bookingText} style={{ left: 332, top: 678 }}>
        30-Minute Discovery Call (Zoom / Google Meet)
        <br />
        In-Person (Port Moresby HQ Or Field Offices)
        <span className={styles.spacer} />
      </p>

      <img
        src="/images/book-consulation/figma-bolt.png"
        alt=""
        className={styles.boltIcon}
        style={{ left: 262, top: 745 }}
      />

      <img
        src="/images/book-consulation/figma-bolt.png"
        alt=""
        className={styles.boltIcon}
        style={{ left: 982, top: 675 }}
      />
      <p className={styles.bookingText} style={{ left: 1054, top: 675 }}>
        One-Hour Technical Session
      </p>

      {/* Availability pills */}
      <div className={styles.pill} style={{ left: 262, top: 845 }}>
        <img
          src="/images/book-consulation/availability-window.svg"
          alt=""
          aria-hidden="true"
          className={styles.pillFrame}
        />
        <img
          src="/images/book-consulation/availability-calendar.svg"
          alt=""
          aria-hidden="true"
          className={styles.pillIcon}
          style={{ left: 44, top: 11 }}
        />
        <span className={styles.pillText} style={{ left: 91 }}>
          Monday&ndash;Friday | 9 AM To 5 PM GMT+10
        </span>
      </div>
      <div className={styles.pill} style={{ left: 798, top: 845 }}>
        <img
          src="/images/book-consulation/availability-window.svg"
          alt=""
          aria-hidden="true"
          className={styles.pillFrame}
        />
        <span className={styles.pillText} style={{ left: 36 }}>
          Other Slots By Request (For Global Partners)
        </span>
      </div>

      {/* Free consultation note */}
      <p className={styles.freeNote}>
        {highlight(FREE_NOTE_PARTS, styles.greenText)}
      </p>

      {/* PDF link */}
      <a
        href={CTA_LINKS.partnershipFramework}
        className={styles.pdfLink}
        target="_blank"
        rel="noopener noreferrer"
      >
        GREEN Innovation Partnership Framework (PDF)
      </a>

      {/* CTA: Book My Consultation (opens booking modal) */}
      <FigmaAngledCta
        className={styles.ctaButton}
        style={{ position: "absolute", left: 1647, top: 819 }}
        onClick={() => setBookingOpen(true)}
      >
        Book My Consultation
      </FigmaAngledCta>

      {/* Right quote over collage */}
      <div className={styles.quoteBlock}>
        <img
          src="/images/book-consulation/quote-bracket-left.svg"
          alt=""
          aria-hidden="true"
          className={styles.quoteBracketLeft}
        />
        <img
          src="/images/book-consulation/quote-bracket-right.svg"
          alt=""
          aria-hidden="true"
          className={styles.quoteBracketRight}
        />
        <p className={styles.quoteText}>
          {highlight(QUOTE_PARTS, styles.greenText)}
        </p>
      </div>

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
            left: 1498,
            width: 418,
          }}
        />
      ) : (
        <D6Chatbot />
      )}

      <Booking isOpen={bookingOpen} onClose={() => setBookingOpen(false)} />
    </main>
  );
}
