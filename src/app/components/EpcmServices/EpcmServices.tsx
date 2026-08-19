"use client";

import FigmaPageCanvas from "../shared/FigmaPageCanvas";
import FigmaAngledCta from "../FigmaAngledCta/FigmaAngledCta";
import D6Chatbot from "../D6Chatbot";
import SiteHeader from "../SiteHeader/SiteHeader";
import styles from "./EpcmServices.module.css";

const features = [
  {
    name: "Engineering",
    points: [
      "Site-specific feasibility and load modeling",
      "Climate-resilient system architecture",
      "Grid, off-grid, and hybrid design specialization",
    ],
  },
  {
    name: "Procurement",
    points: [
      "Global supplier network with delivery certainty",
      "Cost-stabilized sourcing and inventory control",
      "Compliance with IEC, AS/NZS, and local utility specs",
    ],
  },
  {
    name: "Construction",
    points: [
      "In-house deployment: civil, electrical, mechanical",
      "Remote and difficult terrain execution experts",
      "Schedule-bound, safety-prioritized site delivery",
    ],
  },
  {
    name: "Management",
    points: [
      "Project lifecycle leadership: plan to performance",
      "Embedded risk tracking and response automation",
      "Stakeholder reporting, permitting, and governance",
    ],
  },
];

export default function EpcmServices() {
  const desktop = (
    <main className={styles.desktopPage} data-node-id="7077:6595">
      <SiteHeader
        layout="figmaCanvas"
        highlightActive={false}
        figmaPanelVariant="flagship"
      />
      <img
        className={styles.collage}
        src="/images/solar-epcm/mask_composite_solar.png"
        alt=""
        width="1108"
        height="1297"
      />
      <img
        className={styles.verticalTitle}
        src="/images/solar-epcm/title_vert.png"
        alt=""
        width="82"
        height="698"
      />
      <img
        className={styles.pageTitle}
        src="/images/solar-epcm/title_h1.png"
        alt="Solar EPCM Services"
        width="737"
        height="68"
      />
      <p className={styles.subtitle}>
        Designed for Complexity. Delivered with Precision. Managed to Scale
      </p>
      <p className={styles.description}>
        At GREEN, EPCM is not coordination — it’s control.
        <br />
        We transform technical ambition into clean energy infrastructure
        through a seamless, standards-driven delivery model.
        <br />
        From feasibility to commissioning, we manage every milestone with zero
        compromise.
      </p>
      <section className={styles.cards}>
        {features.map((f, i) => (
          <div
            key={f.name}
            className={styles.card}
            style={
              [
                { top: 354, left: 255 },
                { top: 352, left: 773 },
                { top: 621, left: 188 },
                { top: 619, left: 706 },
              ][i]
            }
          >
            <img
              className={styles.cardPanel}
              src="/images/solar-epcm/card_panel.png"
              alt=""
              width="537"
              height="215"
              style={{ top: -2.5, left: -4.25 }}
            />
            <h2 className={styles.cardTitle}>{f.name}</h2>
            <ul className={styles.cardPoints}>
              {f.points.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
          </div>
        ))}
      </section>
      <blockquote className={styles.embedQuote}>
        <img
          className={styles.quotePanel}
          src="/images/solar-epcm/quote_panel.png"
          alt=""
          width="572"
          height="173"
          style={{ top: -9, left: -2.75 }}
        />
        <span>
          We embed it — into every process, every panel, every kilowatt.
        </span>
      </blockquote>
      <div className={styles.actions}>
        <FigmaAngledCta
          icon="download"
          style={{ top: 681, left: 1585, width: 339 }}
        >
          Download EPCM Capabilities Brief
        </FigmaAngledCta>
        <FigmaAngledCta style={{ top: 752, left: 1621, width: 299 }}>
          Request a Technical Debrief
        </FigmaAngledCta>
        <FigmaAngledCta style={{ top: 823, left: 1587, width: 329 }}>
          Book a Discovery Consultation
        </FigmaAngledCta>
      </div>
      <a className={styles.readMore} href="#epcm-details">
        <span>Read more</span>
      </a>
      <h2 className={styles.tagline}>
        You Don’t Engage GREEN to Oversee Solar.
        <br />
        You Engage Us to Deliver It.
      </h2>
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
    </main>
  );

  return (
    <FigmaPageCanvas
      desktop={desktop}
      nodeId="7077:6595"
      mobile={
        <main className={styles.mobilePage}>
          <h1>Solar EPCM Services</h1>
          <p>
            Designed for Complexity. Delivered with Precision. Managed to
            Scale.
          </p>
          {features.map((f) => (
            <section key={f.name}>
              <h2>{f.name}</h2>
              <ul>
                {f.points.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
            </section>
          ))}
        </main>
      }
    />
  );
}
