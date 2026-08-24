"use client";

import { useState } from "react";
import FigmaAngledCta from "../FigmaAngledCta/FigmaAngledCta";
import FigmaPageCanvas from "../shared/FigmaPageCanvas";
import D6Chatbot from "../D6Chatbot";
import SiteHeader from "../SiteHeader/SiteHeader";
import Proposal from "./Modals/Proposal";
import styles from "./RequestProposalCanvas.module.css";

const chips = [
  { text: "Government Agencies", top: 374, left: 277 },
  { text: "Donors & NGOs", top: 374, left: 723 },
  { text: "Commercial Developers", top: 443, left: 270 },
  { text: "Large Enterprises", top: 443, left: 716 },
];

const leftDeliverables = [
  { top: 590, text: "Tailored Solution With Technical Specs" },
  { top: 660, text: "Financial Quotation (CapEx + OpEx)" },
  { top: 732, text: "Delivery Timelines, SLAs, Warranties" },
];

const rightDeliverables = [
  { top: 588, text: "Single Line Diagram (SLD)" },
  { top: 660, text: "ESG Impact Metrics" },
];

export default function RequestProposalCanvas() {
  const [modalOpen, setModalOpen] = useState(false);

  const desktop = (
    <main className={styles.desktopPage} data-node-id="7077:19854">
      <SiteHeader
        layout="figmaCanvas"
        highlightActive={false}
        figmaPanelVariant="flagship"
      />
      <svg
        className={styles.verticalTitle}
        width="59"
        height="582"
        viewBox="0 0 59 582"
        aria-hidden="true"
      >
        <text
          fill="none"
          stroke="rgba(0,0,0,0.15)"
          strokeWidth="1.3"
          fontFamily="'Raleway', Raleway, sans-serif"
          fontWeight="900"
          fontSize="50"
          transform="translate(52,570) rotate(-90)"
        >
          BOOK A CONSULTATION
        </text>
      </svg>
      <img loading="lazy" decoding="async"
        className={styles.collage}
        src="/images/rfp/collage.png"
        alt=""
        width="897"
        height="526"
      />
      <h1 className={styles.h1}>
        <span>REQUEST A </span>
        <span className={styles.h1Green}>PROPOSAL</span>
        <span> (RFP)</span>
      </h1>
      <p className={styles.subtitle}>
        Let&rsquo;s Build Your Energy Project — From Vision to Reality.
      </p>
      <p className={styles.description}>
        Whether you&rsquo;re developing a project, designing a grant, or
        planning a regional rollout — schedule a tailored consultation with
        <strong>GREEN&rsquo;s</strong> technical, strategy, or policy teams. Get
        real answers from those who deliver real energy systems.
      </p>
      <h2 className={styles.sectionHead}>Who Should Use This</h2>
      <div className={styles.chips}>
        {chips.map((c) => (
          <div
            key={c.text}
            className={styles.chip}
            style={{ top: c.top, left: c.left }}
          >
            <span className={styles.chipText}>{c.text}</span>
          </div>
        ))}
      </div>
      <h2 className={styles.sectionHead2}>
        What GREEN Delivers in Every Proposal
      </h2>
      {leftDeliverables.map((d) => (
        <div
          key={`L-${d.text}`}
          className={styles.delivRow}
          style={{ top: d.top, left: 265 }}
        >
          <img loading="lazy" decoding="async"
            className={styles.bolt}
            src="/images/rfp/bolt.png"
            alt=""
            width="70"
            height="70"
          />
          <span className={styles.delivText}>{d.text}</span>
        </div>
      ))}
      {rightDeliverables.map((d) => (
        <div
          key={`R-${d.text}`}
          className={styles.delivRow}
          style={{ top: d.top, left: 873 }}
        >
          <img loading="lazy" decoding="async"
            className={styles.bolt}
            src="/images/rfp/bolt.png"
            alt=""
            width="70"
            height="70"
          />
          <span className={styles.delivText}>{d.text}</span>
        </div>
      ))}
      <div className={styles.quoteWrap} style={{ top: 533, left: 1441 }}>
        <img loading="lazy" decoding="async"
          className={styles.bracketL}
          src="/images/rfp/quote_bracket_l.png"
          alt=""
          width="81"
          height="100"
        />
        <blockquote className={styles.quote}>
          &ldquo;Proposals Shouldn&rsquo;t Be Generic. At{" "}
          <span className={styles.quoteGreen}>GREEN</span>, Every RFP Is A
          Strategic Partnership In The Making.&rdquo;
        </blockquote>
        <img loading="lazy" decoding="async"
          className={styles.bracketR}
          src="/images/rfp/quote_bracket_r.png"
          alt=""
          width="82"
          height="101"
        />
      </div>
      <div className={styles.emailBox}>
        <div className={styles.emailSkew}>
          <img loading="lazy" decoding="async"
            className={styles.calendarIcon}
            src="/images/book-consulation/calendar.png"
            alt=""
            width="30"
            height="31"
          />
          <span className={styles.emailText}>
            Email Fallback :&nbsp;&nbsp;&nbsp;solutions@green.com.pg
          </span>
        </div>
      </div>
      <FigmaAngledCta
        className={styles.ctaButton}
        onClick={() => setModalOpen(true)}
      >
        Request a Proposal (RFP)
      </FigmaAngledCta>
      <p className={styles.freeNote}>
        Consultations are free for{" "}
        <span>government agencies, donors, NGOs</span>, and registered local
        businesses.
      </p>
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
      <Proposal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </main>
  );

  return (
    <FigmaPageCanvas
      desktop={desktop}
      nodeId="7077:19854"
      mobile={
        <main className={styles.mobilePage}>
          <h1>Request a Proposal (RFP)</h1>
          <p>Let&rsquo;s Build Your Energy Project — From Vision to Reality.</p>
          <p>
            Whether you&rsquo;re developing a project, designing a grant, or
            planning a regional rollout — schedule a tailored consultation with
            GREEN&rsquo;s technical, strategy, or policy teams. Get real answers
            from those who deliver real energy systems.
          </p>
          <section>
            <h2>Who Should Use This</h2>
            <ul>
              {chips.map((c) => (
                <li key={c.text}>{c.text}</li>
              ))}
            </ul>
          </section>
          <section>
            <h2>What GREEN Delivers in Every Proposal</h2>
            <ul>
              {[...leftDeliverables, ...rightDeliverables].map((d) => (
                <li key={d.text}>{d.text}</li>
              ))}
            </ul>
          </section>
          <button type="button" onClick={() => setModalOpen(true)}>
            Request a Proposal (RFP)
          </button>
          <Proposal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
        </main>
      }
    />
  );
}
