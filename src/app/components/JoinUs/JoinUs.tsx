"use client";

import { motion, useReducedMotion } from "motion/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useJoinUs } from "../../../hooks/useJoinUs";
import D6Chatbot from "../D6Chatbot";
import TopNavigation from "../TopNavigation/TopNavigation";
import ExistingUsers from "./ExistingUsers";
import styles from "./JoinUs.module.css";
import NewUsers from "./NewUsers";

const FIGMA_WIDTH = 1920;
const FIGMA_HEIGHT = 992;

const SPRING_TRANSITION = {
  type: "spring" as const,
  mass: 1,
  stiffness: 100,
  damping: 15,
};

const FEATURES = [
  {
    className: styles.tracker,
    title: "Application Tracker",
    detail: "(View, Update, Withdraw)",
  },
  {
    className: styles.savedJobs,
    title: "Save Jobs & Internship Openings",
  },
  {
    className: styles.toolkit,
    title: "Access The GREEN Career Toolkit",
    detail: "(Interview Prep, Resume Tips, Field-Readiness Guide)",
  },
  {
    className: styles.assessments,
    title: "Schedule Technical Assessments",
    detail: "(Where Applicable)",
  },
] as const;

export default function JoinUs() {
  const { data: joinUsData } = useJoinUs();
  const [isExistingUsersOpen, setIsExistingUsersOpen] = useState(false);
  const [isNewUsersOpen, setIsNewUsersOpen] = useState(false);
  const [canvasScale, setCanvasScale] = useState(1);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const updateScale = () => setCanvasScale(window.innerWidth / FIGMA_WIDTH);
    updateScale();
    window.addEventListener("resize", updateScale, { passive: true });
    return () => window.removeEventListener("resize", updateScale);
  }, []);

  const data = joinUsData?.data;
  const scenicInitial = reduceMotion
    ? false
    : {
        x: 457,
        y: 302,
        scaleX: 1003 / 2786,
        scaleY: 2133.5 / 1567,
        opacity: 0,
      };
  const fadeInitial = reduceMotion ? false : { opacity: 0 };
  return (
    <>
      <TopNavigation />

      <main
        className={styles.pageShell}
        style={{ height: Math.max(FIGMA_HEIGHT * canvasScale, 1) }}
      >
        <div
          className={styles.canvas}
          style={{ transform: `scale(${canvasScale})` }}
          data-node-id="7077:17046"
        >
          <motion.div
            className={styles.scenicArt}
            initial={scenicInitial}
            animate={{ x: 0, y: 0, scaleX: 1, scaleY: 1, opacity: 1 }}
            transition={reduceMotion ? { duration: 0 } : SPRING_TRANSITION}
            data-node-id="7077:2823"
            aria-hidden="true"
          >
            <img loading="lazy" decoding="async" src="/images/join-us/bg.jpg" alt="" />
          </motion.div>

          <motion.section
            className={styles.content}
            initial={fadeInitial}
            animate={{ opacity: 1 }}
            transition={reduceMotion ? { duration: 0 } : SPRING_TRANSITION}
            data-node-id="7391:3458"
          >
            <h1 className={styles.title}>
              <span>Join Us </span>
              <strong>Login</strong>
            </h1>

            <p className={styles.subHeadline}>
              {data?.subHeadline ||
                "Step Into a Career That Builds the Future."}
            </p>
            <p className={styles.description}>
              {data?.description ||
                "Whether you’re a solar enthusiast, a seasoned engineer, or a fresh graduate, your journey into GREEN begins here. Login to apply, track your applications, and access exclusive career-building resources."}
            </p>

            <button
              type="button"
              className={`${styles.loginButton} ${styles.existingUsers}`}
              onClick={() => setIsExistingUsersOpen(true)}
              aria-label="Log in as an existing user"
            >
              <img loading="lazy" decoding="async"
                src="/images/join-us/existing-users.png"
                alt="Existing Users"
              />
            </button>
            <button
              type="button"
              className={`${styles.loginButton} ${styles.newUsers}`}
              onClick={() => setIsNewUsersOpen(true)}
              aria-label="Register as a new user"
            >
              <img loading="lazy" decoding="async" src="/images/join-us/new-users.png" alt="New Users" />
            </button>

            <h2 className={styles.accessHeading}>
              What You’ll Access After Logging In:
            </h2>
            <div className={styles.divider} aria-hidden="true" />

            {FEATURES.map((feature) => (
              <article
                className={`${styles.feature} ${feature.className}`}
                key={feature.title}
              >
                <img loading="lazy" decoding="async"
                  src="/images/join-us/lighting.png"
                  alt=""
                  aria-hidden="true"
                />
                <div>
                  <h3>{feature.title}</h3>
                  {"detail" in feature ? <p>{feature.detail}</p> : null}
                </div>
              </article>
            ))}

            <div className={styles.partnerCopy}>
              <p>Already Working With</p>
              <p>
                <strong>GREEN</strong> As A Trainee Or Partner?
              </p>
              <p>Login Via Partner Portal</p>
            </div>

            <section className={styles.policy}>
              <h2>{data?.dataPolicyEthics?.title || "Data Policy & Ethics"}</h2>
              <p>
                {data?.dataPolicyEthics?.description ||
                  "Your Data Is Secure. GREEN Limited Commits To Using All Submitted Information For Recruitment, Training, And Placement Only. No Third-Party Access Is Granted."}
              </p>
            </section>

            <Link
              href={data?.email?.href || "mailto:careers.support@green.com.pg"}
              className={`${styles.contactCard} ${styles.emailCard}`}
            >
              <img loading="lazy" decoding="async" src="/images/join-us/mail.png" alt="" />
              <span>{data?.email?.text || "careers.support@green.com.pg"}</span>
            </Link>
            <div className={`${styles.contactCard} ${styles.phoneCard}`}>
              <img loading="lazy" decoding="async" src="/images/join-us/call.png" alt="" />
              <span>
                {data?.phone?.text || "+675 XXX XXX XXX (Careers Desk)"}
              </span>
            </div>

            <Link
              href={data?.cta?.[0]?.href || "#"}
              className={`${styles.cta} ${styles.vacancies}`}
            >
              <img loading="lazy" decoding="async"
                src="/images/join-us/view-current-vacancies.png"
                alt="View Current Vacancies"
              />
            </Link>
            <Link
              href={data?.cta?.[1]?.href || "#"}
              className={`${styles.cta} ${styles.privacy}`}
            >
              <img loading="lazy" decoding="async"
                src="/images/join-us/view-our-recruitment-privacy-policy.png"
                alt="View our Recruitment Privacy Policy (PDF)"
              />
            </Link>
          </motion.section>

          <img loading="lazy" decoding="async"
            className={styles.verticalLabel}
            src="/images/join-us/industry-affiliations-certifications.png"
            alt="Industry affiliations and certifications"
          />

          <D6Chatbot canvasAnchored triggerVariant="figmaCanvas" />
        </div>
      </main>

      <ExistingUsers
        isOpen={isExistingUsersOpen}
        onClose={() => setIsExistingUsersOpen(false)}
      />
      <NewUsers
        isOpen={isNewUsersOpen}
        onClose={() => setIsNewUsersOpen(false)}
      />
    </>
  );
}
