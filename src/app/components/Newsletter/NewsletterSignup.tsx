"use client";
import { useState } from "react";
import D6Chatbot from "../D6Chatbot";
import FigmaAngledCta from "../FigmaAngledCta/FigmaAngledCta";
import FigmaQuoteBrackets from "../FigmaQuoteBrackets/FigmaQuoteBrackets";
import SiteHeader from "../SiteHeader/SiteHeader";
import NewsletterSignupModal from "./NewsletterSignupModal";
import styles from "./NewsletterSignup.module.css";

const BENEFIT_ROWS = [
  { benefit: "Insider Updates", desc: "See the projects before they make headlines" },
  { benefit: "Expert Insights", desc: "Get briefings from GREEN engineers, strategists & partners" },
  { benefit: "Event Access", desc: "Early invites to webinars, expos, and community events" },
  { benefit: "Opportunity Alerts", desc: "Be first to hear about RFPs, tenders, job openings" },
];

const PILL_ROW_1 = [
  { text: "1 Monthly Email (No Spam)", left: 691, top: 649, width: 356, textLeft: 727 },
  { text: "Curated Project Highlights", left: 1047, top: 649, width: 356, textLeft: 1083 },
  { text: "Thought Leadership Articles", left: 1403, top: 649, width: 356, textLeft: 1439 },
];

const PILL_ROW_2 = [
  { text: "Thought Leadership Articles", left: 662, top: 725, width: 356, textLeft: 698 },
  { text: "Tools, Templates, & Free Downloads", left: 1018, top: 725, width: 436, textLeft: 1054 },
];

interface NewsletterSignupProps {
  canvas?: boolean;
}

export default function NewsletterSignup({ canvas = false }: NewsletterSignupProps) {
  const [formOpen, setFormOpen] = useState(false);

  return (
    <main className={styles.page} data-node-id="7077:14996">
      <SiteHeader layout={canvas ? "figmaCanvas" : "viewport"} />

      {/* Large left collage (Figma mask group) */}
      <img
        src="/images/newsletter/mainImg.png"
        alt=""
        className={styles.leftCollage}
        aria-hidden="true"
      />

      {/* Vertical side title (Raleway Black, outlined, bottom-up) */}
      <p className={styles.verticalTitle} aria-hidden="true">
        Newsletter Signup
      </p>

      {/* Header block */}
      <div className={styles.headerBlock}>
        <h1 className={styles.mainTitle}>
          NEWSLETTER <span className={styles.greenText}>SIGNUP</span>
        </h1>
        <p className={styles.subHeadline}>Stay Informed. Stay Energized.</p>
        <p className={styles.description}>
          Subscribe to{" "}
          <span className={styles.greenText}>GREEN Insights</span> — your
          monthly pulse on solar innovation, impact projects, energy access
          breakthroughs, and exclusive behind-the-scenes content from across
          PNG and the South Pacific.
        </p>
      </div>

      {/* Why Subscribe? table */}
      <h2 className={styles.whyTitle} style={{ left: 909, top: 201 }}>
        Why Subscribe?
      </h2>
      <p className={styles.thBenefit}>Benefit</p>
      <p className={styles.thDesc}>Description</p>
      {BENEFIT_ROWS.map((row, i) => (
        <div
          key={row.benefit}
          className={styles.tableRow}
          style={{ top: 295 + i * 54 }}
        >
          <p className={styles.tdB}>{row.benefit}</p>
          <p className={styles.tdD}>{row.desc}</p>
        </div>
      ))}

      {/* What You'll Receive pills */}
      <h2 className={styles.receiveTitle} style={{ left: 746, top: 568 }}>
        What You&rsquo;ll <span className={styles.greenText}>Receive</span>
      </h2>
      <FigmaQuoteBrackets
        className={styles.receiveBracket}
        showRight={false}
        leftSrc="/images/newsletter/shape.png"
      />
      {[PILL_ROW_1, PILL_ROW_2].map((row, ri) =>
        row.map((pill) => (
          <div
            key={`${ri}-${pill.text}`}
            className={styles.pill}
            style={{
              left: pill.left,
              top: pill.top,
              width: pill.width,
              minHeight: 53,
            }}
          >
            <span className={styles.pillText}>{pill.text}</span>
          </div>
        )),
      )}

      {/* Contact block with brackets */}
      <div className={styles.contactBlock}>
        <FigmaQuoteBrackets
          leftStyle={{ left: 0, top: 0 }}
          showRight={false}
          leftSrc="/images/newsletter/shape.png"
          rightSrc="/images/newsletter/shape2.png"
        />
        <p className={styles.contactText}>
          Contact
          <br />
          —{" "}
          <a href="mailto:insights@green.com.pg" className={styles.emailLink}>
            insights@green.com.pg
          </a>{" "}
          .
        </p>
      </div>

      {/* Tagline */}
      <p className={styles.tagline}>
        From remote installations to regional milestones
        <br />
        — let <span className={styles.greenText}>GREEN</span> power your inbox
        with content that matters.
      </p>

      {/* Sign Up Now CTA */}
      <FigmaAngledCta
        className={styles.signupCta}
        style={{ position: "absolute", left: 1709, top: 824 }}
        onClick={() => setFormOpen(true)}
      >
        Sign Up Now
      </FigmaAngledCta>

      {/* Chatbot */}
      {canvas ? (
        <D6Chatbot
          canvasAnchored
          triggerVariant="figmaCanvas"
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

      <NewsletterSignupModal isOpen={formOpen} onClose={() => setFormOpen(false)} />
    </main>
  );
}
