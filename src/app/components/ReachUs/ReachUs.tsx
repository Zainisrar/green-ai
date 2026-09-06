"use client";

import { motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import D6Chatbot from "../D6Chatbot";
import SiteHeader from "../SiteHeader/SiteHeader";
import ReachUsForm from "./Modal/Form";
import styles from "./ReachUs.module.css";

const DESIGN_WIDTH = 1920;
const DESIGN_HEIGHT = 970;
const OFFICES = [
  {
    id: "papuaNewGuinea",
    name: "PAPUA NEW GUINEA",
    flag: "/images/book-consulation/countryCode.png",
    address: [
      "PO Box 1243, Port Moresby",
      "Section 405, Allotment 4, Waigani Drive,",
      "North Hohola, National Capital District.",
      "11.043442, 77.892613",
    ],
  },
  {
    id: "india",
    name: "INDIA",
    flag: "/images/reach-us/flag-india.png",
    address: [
      "194E-404, Gurusamy Nagar,",
      "Thanneer Panthal, Peelamedu Post,",
      "Coimbatore, Tamilnadu - 641 004",
      "11.043442, 77.892613",
    ],
  },
  {
    id: "australia",
    name: "AUSTRALIA",
    flag: "/images/reach-us/flag-australia.png",
    address: [
      "Level 36 Riparian Plaza",
      "71 Eagle street Brisbane",
      "Qld 4000",
    ],
  },
  {
    id: "singapore",
    name: "SINGAPORE",
    flag: "/images/reach-us/flag-singapore.png",
    address: ["8 Burn Road", "# 07-07 Trivex", "Singapore (369977)"],
  },
] as const;

const MAP_EASE = [0, 0, 0.58, 1] as const;

interface ReachUsProps {
  initialFormOpen?: boolean;
}

export default function ReachUs({ initialFormOpen = false }: ReachUsProps) {
  const [currentOfficeIndex, setCurrentOfficeIndex] = useState(0);
  const [isFormOpen, setIsFormOpen] = useState(initialFormOpen);
  const [canvasScale, setCanvasScale] = useState(1);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const updateScale = () => {
      setCanvasScale(
        Math.min(
          window.innerWidth / DESIGN_WIDTH,
          window.innerHeight / DESIGN_HEIGHT,
        ),
      );
    };

    updateScale();
    window.addEventListener("resize", updateScale, { passive: true });
    return () => window.removeEventListener("resize", updateScale);
  }, []);

  useEffect(() => {
    if (reduceMotion) return undefined;
    const interval = window.setInterval(() => {
      setCurrentOfficeIndex((index) => (index + 1) % OFFICES.length);
    }, 3000);

    return () => window.clearInterval(interval);
  }, [reduceMotion]);

  return (
    <main className={styles.page}>
      <div className={styles.mobileHeader}>
        <SiteHeader panel="logoOnly" />
      </div>

      <section className={styles.desktopStage} aria-label="Reach GREEN">
        <div
          className={styles.canvas}
          style={{ transform: `translateX(-50%) scale(${canvasScale})` }}
          data-node-id="7077:13486"
        >
          <img
            loading="lazy"
            decoding="async"
            className={styles.background}
            src="/images/reach-us/bg.jpg"
            alt=""
            aria-hidden="true"
          />

          {/* Keep the header in the same 1920px coordinate system as the
              Figma canvas. This prevents viewport scaling from shifting the
              menu away from the enquiry control. */}
          <SiteHeader layout="figmaCanvas" panel="logoOnly" />

          <p className={styles.intro} data-node-id="7077:13496">
            Are you prepared to get started on your Energy Requirement right
            away? Let&apos;s connect!
          </p>

          <img
            loading="lazy"
            decoding="async"
            className={styles.verticalLabel}
            src="/images/reach-us/reach-us.png"
            alt="Reach us"
          />

          <div className={styles.mapViewport} data-node-id="7077:13498">
            <motion.img
              className={styles.map}
              src="/images/reach-us/world-map.png"
              alt="World map showing GREEN global offices"
              data-node-id="7077:13642"
              initial={reduceMotion ? false : { width: 1339.43017578125 }}
              animate={{ width: 1203.1922607421875 }}
              transition={{ duration: reduceMotion ? 0 : 0.3, ease: MAP_EASE }}
            />

            <div className={styles.pins} aria-hidden="true">
              <img
                loading="lazy"
                decoding="async"
                className={styles.indiaPin}
                src="/images/reach-us/pin-india.svg"
                alt=""
              />
              <img
                loading="lazy"
                decoding="async"
                className={styles.pngPin}
                src="/images/reach-us/pin-png.svg"
                alt=""
              />
              <img
                loading="lazy"
                decoding="async"
                className={styles.singaporePin}
                src="/images/reach-us/pin-singapore.svg"
                alt=""
              />
              <img
                loading="lazy"
                decoding="async"
                className={styles.australiaPin}
                src="/images/reach-us/pin-australia.svg"
                alt=""
              />
            </div>

            <motion.div
              key={currentOfficeIndex}
              className={styles.officeLabels}
              initial={reduceMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: reduceMotion ? 0 : 0.2, ease: MAP_EASE }}
              aria-live="polite"
            >
              {OFFICES.map((office, index) => {
                const isActive = index === currentOfficeIndex;

                return (
                  <article
                    key={office.id}
                    className={`${styles.officeCard} ${styles[office.id]} ${
                      isActive ? styles.officeCardActive : ""
                    }`}
                  >
                    {isActive && (
                      <img
                        loading="lazy"
                        decoding="async"
                        className={styles.officeFlag}
                        src={office.flag}
                        alt=""
                      />
                    )}
                    <h2>{office.name}</h2>
                    {isActive && (
                      <p>
                        {office.address.map((line) => (
                          <span key={line}>{line}</span>
                        ))}
                      </p>
                    )}
                  </article>
                );
              })}
            </motion.div>
          </div>

          <button
            type="button"
            className={styles.enquiry}
            onClick={() => setIsFormOpen(true)}
            aria-label="Open enquiry form"
            data-node-id="7077:13531"
          >
            <img
              loading="lazy"
              decoding="async"
              src="/images/reach-us/enquiry.png"
              alt="Enquiry"
            />
          </button>

          <div className={styles.sideCards}>
            <img
              loading="lazy"
              decoding="async"
              src="/images/reach-us/transformation.png"
              alt="Transformation"
              data-node-id="7077:13537"
            />
            <img
              loading="lazy"
              decoding="async"
              src="/images/reach-us/join-us.png"
              alt="Join us"
              data-node-id="7077:13542"
            />
          </div>

          <D6Chatbot canvasAnchored triggerVariant="figmaCanvas" />
        </div>
      </section>

      <section className={styles.mobileLayout}>
        <p className={styles.mobileIntro}>
          Are you prepared to get started on your Energy Requirement right away?
          Let&apos;s connect!
        </p>
        <button
          type="button"
          className={styles.mobileEnquiry}
          onClick={() => setIsFormOpen(true)}
        >
          <img
            loading="lazy"
            decoding="async"
            src="/images/reach-us/enquiry.png"
            alt="Enquiry"
          />
        </button>
        <div className={styles.mobileMapFrame}>
          <img
            loading="lazy"
            decoding="async"
            className={styles.mobileMap}
            src="/images/reach-us/world-map.png"
            alt="World map showing GREEN global offices"
          />
          <motion.div
            key={currentOfficeIndex}
            className={styles.mobileOfficeLabel}
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: reduceMotion ? 0 : 0.2, ease: MAP_EASE }}
          >
            <strong>{OFFICES[currentOfficeIndex].name}</strong>
            {OFFICES[currentOfficeIndex].address.map((line) => (
              <span key={line}>{line}</span>
            ))}
          </motion.div>
        </div>
        <div className={styles.mobileCards}>
          <img
            loading="lazy"
            decoding="async"
            src="/images/reach-us/transformation.png"
            alt="Transformation"
          />
          <img
            loading="lazy"
            decoding="async"
            src="/images/reach-us/join-us.png"
            alt="Join us"
          />
        </div>
        <D6Chatbot />
      </section>

      <ReachUsForm isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} />
    </main>
  );
}
