"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { useSustainabilityESG } from "../../../hooks/useSustainabilityESG";
import D6Chatbot from "../D6Chatbot";
import SiteHeader from "../SiteHeader/SiteHeader";
import FigmaPageCanvas from "../shared/FigmaPageCanvas";
import FigmaAngledCta from "../FigmaAngledCta/FigmaAngledCta";
import styles from "./EsgCommitments.module.css";
import BookTechnicalDebrief from "./Modals/BookTechnicalDebrief";
import RequestEngineeringDossier from "./Modals/RequestEngineeringDossier";
import ExploreSystem from "./Modals/ExploreSystem";

const SPRING_TRANSITION = {
  type: "spring" as const,
  mass: 1,
  stiffness: 100,
  damping: 15,
};

const FALLBACK_SECTIONS = [
  {
    heading: "Environmental Stewardship",
    intro:
      "We are actively reshaping our footprint by prioritizing climate-positive action.",
    points: [
      "Carbon-neutral operations by 2026",
      "100% transition to renewable energy across all facilities",
      "Use of biodegradable and recyclable materials",
      "Sustainable procurement and green supply chain initiatives",
      "Reforestation and carbon offset programs",
    ],
    icon: "/images/esg-commitments/icon_env.png",
    card: "/images/esg-commitments/panel_env_trim.png",
    nodeId: "7077:6738",
  },
  {
    heading: "Social Responsibility",
    intro:
      "Sustainability is about people, too. We invest in inclusive progress and resilient communities.",
    points: [
      "Training programs in green skills and clean-tech employment",
      "Local sourcing and support for underserved regions",
      "Ethical labor, diversity, and fair-wage policies",
      "Collaboration with indigenous and rural communities for eco-preservation",
    ],
    icon: "/images/esg-commitments/icon_social.png",
    card: "/images/esg-commitments/panel_social_trim.png",
    nodeId: "7077:6730",
  },
  {
    heading: "Ethical Governance",
    intro: "Good governance is the foundation of sustainable growth.",
    points: [
      "ESG-aligned decision-making and board oversight",
      "Transparent sustainability reporting and KPIs",
      "Responsible investment screening (no fossil fuels, conflict materials, etc.)",
      "Climate risk assessment and mitigation planning",
    ],
    icon: "/images/esg-commitments/icon_gov.png",
    card: "/images/esg-commitments/panel_gov_trim.png",
    nodeId: "7077:6743",
  },
] as const;

interface EsgSection {
  heading: string;
  intro: string;
  points: readonly string[];
  icon: string;
  card: string;
  nodeId: string;
}

interface PillarProps {
  section: EsgSection;
  index: number;
  mobile?: boolean;
}

function EsgPillar({ section, index, mobile = false }: PillarProps) {
  return (
    <article
      className={`${styles.pillar} ${mobile ? styles.mobilePillar : ""}`}
      data-node-id={section.nodeId}
    >
      <img
        loading="lazy"
        decoding="async"
        className={styles.cardShape}
        src={section.card}
        alt=""
      />
      <div className={styles.pillarContent}>
        <h2>{section.heading}</h2>
        <p>{section.intro}</p>
        <ul>
          {section.points.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
      </div>
      <img
        loading="lazy"
        decoding="async"
        className={styles.pillarIcon}
        src={section.icon}
        alt=""
        width={index === 0 ? 73 : index === 1 ? 75 : 77}
        height={index === 0 ? 73 : index === 1 ? 75 : 77}
      />
    </article>
  );
}

export default function EsgCommitments() {
  const { sustainabilityData } = useSustainabilityESG();
  const [isDebriefOpen, setIsDebriefOpen] = useState(false);
  const [isDossierOpen, setIsDossierOpen] = useState(false);
  const [isExploreOpen, setIsExploreOpen] = useState(false);
  const [isAlternateView, setIsAlternateView] = useState(false);

  const sections = FALLBACK_SECTIONS.map((fallback, index) => ({
    ...fallback,
    heading: sustainabilityData?.sections?.[index]?.heading || fallback.heading,
    points: sustainabilityData?.sections?.[index]?.points?.length
      ? sustainabilityData.sections[index].points
      : fallback.points,
  }));
  const rawSubtitle =
    sustainabilityData?.header?.subtitle ||
    "sustainability is more than a goal—it’s our core operating principle. We integrate Environmental, Social and Governance (ESG) values into everything we do, from product design to energy use, supply chains, and community partnerships.";
  const subtitle = rawSubtitle
    .replace(/^GREEN,\s*/i, "")
    .replace(/^At GREEN,\s*/i, "")
    .replace(/^– At GREEN,\s*/i, "");
  const quote =
    sustainabilityData?.quote?.text ||
    "We lead with purpose—to build a thriving, low-carbon future through sustainable innovation and ESG integrity";

  const desktop = (
    <main
      className={styles.desktopPage}
      data-node-id={isAlternateView ? "7077:6671" : "7077:6707"}
    >
      <motion.img
        loading="lazy"
        decoding="async"
        className={isAlternateView ? styles.backgroundAlt : styles.background}
        src={
          isAlternateView
            ? "/images/esg-commitments/mask_left.png"
            : "/images/esg-commitments/mask_composite.png"
        }
        alt=""
        width={isAlternateView ? 896 : 967}
        height={1297}
        initial={false}
        animate={{
          left: isAlternateView ? -15 : 1064,
          top: isAlternateView ? -132 : -123,
          width: isAlternateView ? 896 : 967,
        }}
        transition={SPRING_TRANSITION}
      />
      <SiteHeader layout="figmaCanvas" highlightActive={false} />

      <AnimatePresence mode="wait">
        {!isAlternateView ? (
          <motion.div
            key="state1"
            className={styles.stateTransitionWrapper}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <img
              loading="lazy"
              decoding="async"
              className={styles.verticalTitle}
              src="/images/esg-commitments/title_vert.png"
              alt=""
              aria-hidden="true"
              width="49"
              height="837"
            />
            <button
              type="button"
              className={styles.pageTitleButton}
              onClick={() => setIsAlternateView(true)}
              aria-label="Click to view detailed mission breakdown"
              data-node-id="7077:6715"
            >
              <img
                loading="lazy"
                decoding="async"
                className={styles.pageTitle}
                src="/images/esg-commitments/title_h1.png"
                alt="Sustainability & ESG Commitments"
                width="1030"
                height="37"
              />
            </button>
            <p className={styles.intro} data-node-id="7077:6708">
              <strong>GREEN</strong>, {subtitle}
            </p>
            <div className={styles.pillars}>
              {sections.map((section, index) => (
                <EsgPillar
                  key={section.heading}
                  section={section}
                  index={index}
                />
              ))}
            </div>
            <blockquote className={styles.quote} data-node-id="7077:6735">
              “<span>{quote}</span>”
              <span className={styles.quoteMark} aria-hidden="true">
                “
              </span>
            </blockquote>
            <img
              loading="lazy"
              decoding="async"
              className={styles.tomorrowPanel}
              src="/images/esg-commitments/tomorrow_panel.png"
              alt=""
              width="511"
              height="132"
            />
            <div className={styles.tomorrow} data-node-id="7077:6726">
              <span>Green Today.</span>
              <strong>Greener Tomorrow.</strong>
            </div>
            <div className={styles.actions}>
              <FigmaAngledCta
                onClick={() => setIsDebriefOpen(true)}
                style={{
                  position: "absolute",
                  top: 658,
                  left: 1620,
                  width: 299,
                }}
              >
                Book a Technical Debrief
              </FigmaAngledCta>
              <FigmaAngledCta
                onClick={() => setIsDossierOpen(true)}
                style={{
                  position: "absolute",
                  top: 732,
                  left: 1557,
                  width: 359,
                }}
              >
                Request Our Engineering Dossier
              </FigmaAngledCta>
              <FigmaAngledCta
                onClick={() => setIsExploreOpen(true)}
                style={{
                  position: "absolute",
                  top: 812,
                  left: 1497,
                  width: 419,
                }}
              >
                Explore a System Built for Your Reality
              </FigmaAngledCta>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="state2"
            className={styles.stateTransitionWrapper}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <button
              type="button"
              className={styles.pageTitleButtonAlt}
              onClick={() => setIsAlternateView(false)}
              aria-label="Click to return to commitments overview"
              data-node-id="7077:6683"
            >
              Sustainability
              <br />
              &amp; ESG
              <br />
              <span>Commitments</span>
            </button>

            <img
              loading="lazy"
              decoding="async"
              className={styles.tomorrowPanelAlt}
              src="/images/esg-commitments/tomorrow_panel.png"
              alt=""
              width="506"
              height="125"
            />
            <div className={styles.tomorrowAlt} data-node-id="7077:6694">
              <span>Green Today.</span>
              <strong>Greener Tomorrow.</strong>
            </div>

            <div className={styles.altRightSection}>
              <div className={styles.missionHeader} data-node-id="7077:6676">
                <h2 className={styles.missionTitle}>
                  A Greener Mission, A Lasting Impact
                </h2>
                <p className={styles.missionSubtitle}>
                  <span>– At GREEN,</span> {subtitle}
                </p>
              </div>

              <article className={styles.altPillarEnv} data-node-id="7077:6672">
                <div className={styles.altPillarItem}>
                  <img
                    loading="lazy"
                    decoding="async"
                    className={styles.altPillarIcon}
                    src="/images/esg-commitments/icon_env_6671.png"
                    alt=""
                    width="65"
                    height="65"
                    data-node-id="7077:6704"
                  />
                  <div className={styles.altPillarBody}>
                    <h3 className={styles.altPillarTitle}>
                      {sections[0].heading}
                    </h3>
                    <p className={styles.altPillarIntro}>{sections[0].intro}</p>
                    <ul className={styles.altPillarList}>
                      {sections[0].points.map((pt) => (
                        <li key={pt}>{pt}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </article>

              <article
                className={styles.altPillarSocial}
                data-node-id="7077:6673"
              >
                <div className={styles.altPillarItem}>
                  <img
                    loading="lazy"
                    decoding="async"
                    className={styles.altPillarIcon}
                    src="/images/esg-commitments/icon_social_6671.png"
                    alt=""
                    width="65"
                    height="65"
                    data-node-id="7077:6674"
                  />
                  <div className={styles.altPillarBody}>
                    <h3 className={styles.altPillarTitle}>
                      {sections[1].heading}
                    </h3>
                    <p className={styles.altPillarIntro}>{sections[1].intro}</p>
                    <ul className={styles.altPillarList}>
                      {sections[1].points.map((pt) => (
                        <li key={pt}>{pt}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </article>

              <article className={styles.altPillarGov} data-node-id="7077:6675">
                <div className={styles.altPillarItem}>
                  <img
                    loading="lazy"
                    decoding="async"
                    className={styles.altPillarIcon}
                    src="/images/esg-commitments/icon_gov_6671.png"
                    alt=""
                    width="77"
                    height="77"
                    data-node-id="7077:6705"
                  />
                  <div className={styles.altPillarBody}>
                    <h3 className={styles.altPillarTitle}>
                      {sections[2].heading}
                    </h3>
                    <p className={styles.altPillarIntro}>{sections[2].intro}</p>
                    <ul className={styles.altPillarList}>
                      {sections[2].points.map((pt) => (
                        <li key={pt}>{pt}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </article>

              <blockquote className={styles.altQuote} data-node-id="7077:6701">
                <span className={styles.altQuoteMark} aria-hidden="true">
                  “
                </span>
                {quote}
                <span className={styles.altQuoteMarkEnd} aria-hidden="true">
                  ”
                </span>
              </blockquote>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <D6Chatbot
        canvasAnchored
        triggerVariant="figmaCanvas"
        triggerClassName={styles.chatTrigger}
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

  const mobile = (
    <main
      className={styles.mobilePage}
      data-node-id={isAlternateView ? "7077:6671-mobile" : "7077:6707-mobile"}
    >
      <SiteHeader panel="logoOnly" />
      <div className={styles.mobileContent}>
        <button
          type="button"
          onClick={() => setIsAlternateView((prev) => !prev)}
          style={{
            background: "none",
            border: "none",
            padding: 0,
            textAlign: "left",
            cursor: "pointer",
            width: "100%",
          }}
        >
          <h1>
            Sustainability &amp; ESG <span>Commitments</span>
          </h1>
        </button>
        <p>
          <strong>GREEN</strong>, {subtitle}
        </p>
        <div className={styles.mobilePillars}>
          {sections.map((section, index) => (
            <EsgPillar
              key={section.heading}
              section={section}
              index={index}
              mobile
            />
          ))}
        </div>
        <blockquote>
          “<span>{quote}</span>”
        </blockquote>
        <div className={styles.mobileTomorrow}>
          <span>Green Today.</span>
          <strong>Greener Tomorrow.</strong>
        </div>
        <div className={styles.mobileActions}>
          <button type="button" onClick={() => setIsDebriefOpen(true)}>
            Book a Technical Debrief
          </button>
          <button type="button" onClick={() => setIsDossierOpen(true)}>
            Request Our Engineering Dossier
          </button>
          <button type="button" onClick={() => setIsExploreOpen(true)}>
            Explore a System Built for Your Reality
          </button>
        </div>
      </div>
      <D6Chatbot />
    </main>
  );

  return (
    <>
      <FigmaPageCanvas
        desktop={desktop}
        mobile={mobile}
        nodeId={isAlternateView ? "7077:6671" : "7077:6707"}
      />
      <BookTechnicalDebrief
        isOpen={isDebriefOpen}
        onClose={() => setIsDebriefOpen(false)}
      />
      <RequestEngineeringDossier
        isOpen={isDossierOpen}
        onClose={() => setIsDebriefOpen(false)}
      />
      <ExploreSystem
        isOpen={isExploreOpen}
        onClose={() => setIsExploreOpen(false)}
      />
    </>
  );
}
