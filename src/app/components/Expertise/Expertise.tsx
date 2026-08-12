"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useExpertise } from "../../../hooks/useExpertise";
import D6Chatbot from "../D6Chatbot";
import SiteHeader from "../SiteHeader/SiteHeader";
import styles from "./Expertise.module.css";

const DESIGN_WIDTH = 1920;
const DESIGN_HEIGHT = 970;
const ASSET_ROOT = "/images/expertise/figma-d2";

const GALLERY = [
  {
    src: `${ASSET_ROOT}/healthcare.png`,
    alt: "Solar installation powering a healthcare complex",
    label: "Powering Healthcare",
  },
  {
    src: `${ASSET_ROOT}/community-solar.png`,
    alt: "Community solar installation",
    label: "Powering Communities",
  },
  {
    src: `${ASSET_ROOT}/solar-pump.png`,
    alt: "Solar array beside a water source",
    label: "Powering Agriculture",
  },
  {
    src: `${ASSET_ROOT}/commercial-solar.png`,
    alt: "Commercial building with rooftop solar",
    label: "Powering Industry",
  },
  {
    src: `${ASSET_ROOT}/telecom-solar.png`,
    alt: "Remote solar and telecommunications installation",
    label: "Powering Telecom",
  },
  {
    src: `${ASSET_ROOT}/home-solar.png`,
    alt: "Home powered by rooftop solar",
    label: "Powering Homes",
  },
] as const;

const GRID_CARDS = [
  { nodeId: "7077:3725", item: 0, left: 1031.6, top: 140 },
  { nodeId: "7077:3726", item: 1, left: 1308.5, top: 140 },
  { nodeId: "7077:3727", item: 2, left: 1585.4, top: 140 },
  { nodeId: "7077:3728", item: 3, left: 1031.6, top: 337.13 },
  { nodeId: "7077:3729", item: 4, left: 1308.5, top: 337.13 },
  { nodeId: "7077:3730", item: 5, left: 1585.4, top: 337.13 },
  { nodeId: "7077:3732", item: 1, left: 1308.5, top: 534.26 },
  { nodeId: "7077:3733", item: 2, left: 1585.4, top: 534.26 },
  { nodeId: "7077:3734", item: 4, left: 1031.6, top: 731.39 },
  { nodeId: "7077:3735", item: 1, left: 1308.5, top: 731.39 },
] as const;

type ViewMode = "grid" | "slider";

export default function Expertise() {
  const { data: expertiseItems } = useExpertise();
  const [view, setView] = useState<ViewMode>("grid");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [desktopScale, setDesktopScale] = useState(1);

  useEffect(() => {
    const updateScale = () => {
      setDesktopScale(
        Math.min(
          window.innerWidth / DESIGN_WIDTH,
          window.innerHeight / DESIGN_HEIGHT,
        ),
      );
    };

    updateScale();
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, []);

  const activeExpertise =
    expertiseItems?.[selectedIndex] ?? expertiseItems?.[0];
  const exploreHref = activeExpertise?.slug || "/expertise/powering-healthcare";
  const activeGalleryItem = GALLERY[selectedIndex % GALLERY.length];

  const sliderItems = useMemo(
    () => [...GALLERY.slice(selectedIndex), ...GALLERY.slice(0, selectedIndex)],
    [selectedIndex],
  );

  return (
    <main className={styles.page}>
      <SiteHeader />

      <section className={styles.desktopStage} aria-label="GREEN solutions">
        <div
          className={styles.canvas}
          data-node-id="7077:3678"
          data-name="Solutions page -D2"
          style={{
            transform: `translate(-50%, -50%) scale(${desktopScale})`,
          }}
        >
          <div className={styles.leftBackdrop} aria-hidden="true">
            <img
              src={`${ASSET_ROOT}/background.png`}
              alt=""
              data-node-id="7077:3687"
            />
          </div>
          <h1 className={styles.heroHeading} data-node-id="7077:3711">
            POWERING <span>HEALTHCARE</span>
          </h1>

          <div className={styles.verticalLabel} data-node-id="7077:3713">
            SOLUTIONS
          </div>

          <section className={styles.introduction} data-node-id="7077:3712">
            <h2>
              A <span>GREENER</span> FUTURE,
              <br />
              An Ultimate Target
            </h2>
            <p data-node-id="7077:3710">
              In an era where sustainability and environmental consciousness are
              paramount, the quest for a greener future is more important than
              ever
            </p>
          </section>

          <Link
            href={exploreHref}
            className={styles.exploreButton}
            data-node-id="7077:3746"
          >
            <img
              className={styles.exploreShape}
              src={`${ASSET_ROOT}/explore-button.svg`}
              alt=""
            />
            <span>Explore</span>
            <img
              className={styles.exploreArrow}
              src={`${ASSET_ROOT}/explore-arrow.svg`}
              alt=""
            />
          </Link>

          <section
            className={styles.gallery}
            aria-label="Renewable energy solutions"
            data-node-id="7077:3724"
          >
            {view === "grid" ? (
              <>
                {GRID_CARDS.map((card) => {
                  const item = GALLERY[card.item];
                  return (
                    <button
                      key={card.nodeId}
                      type="button"
                      className={styles.galleryCard}
                      data-node-id={card.nodeId}
                      style={{ left: card.left, top: card.top }}
                      onClick={() => setSelectedIndex(card.item)}
                      aria-label={`Select ${item.label}`}
                    >
                      <img src={item.src} alt={item.alt} />
                      <span aria-hidden="true" />
                    </button>
                  );
                })}

                <button
                  type="button"
                  className={styles.selectedCard}
                  data-node-id="7077:3738"
                  onClick={() =>
                    setSelectedIndex((selectedIndex + 1) % GALLERY.length)
                  }
                  aria-label={`Selected solution: ${activeGalleryItem.label}. Show next solution.`}
                >
                  <img
                    src={activeGalleryItem.src}
                    alt={activeGalleryItem.alt}
                  />
                  <span className={styles.selectedLabel}>
                    <img src={`${ASSET_ROOT}/selected-label.svg`} alt="" />
                    <b>{activeGalleryItem.label}</b>
                  </span>
                </button>
              </>
            ) : (
              <div className={styles.sliderGallery} data-node-id="7077:3724">
                {sliderItems.map((item, index) => (
                  <button
                    type="button"
                    key={`${item.src}-${index}`}
                    onClick={() => setSelectedIndex(GALLERY.indexOf(item))}
                    className={
                      index === 0 ? styles.sliderCardActive : undefined
                    }
                  >
                    <img src={item.src} alt={item.alt} />
                    <span>{item.label}</span>
                  </button>
                ))}
              </div>
            )}
          </section>

          <div className={styles.pagination} aria-hidden="true">
            <img src={`${ASSET_ROOT}/dot-active.svg`} alt="" />
            <img src={`${ASSET_ROOT}/dot.svg`} alt="" />
            <img src={`${ASSET_ROOT}/dot.svg`} alt="" />
          </div>

          <fieldset className={styles.viewSwitch}>
            <legend className={styles.srOnly}>Choose gallery view</legend>
            <button
              type="button"
              className={view === "grid" ? styles.activeView : undefined}
              onClick={() => setView("grid")}
              aria-pressed={view === "grid"}
              data-node-id="7077:3718"
            >
              Grid
            </button>
            <button
              type="button"
              className={view === "slider" ? styles.activeView : undefined}
              onClick={() => setView("slider")}
              aria-pressed={view === "slider"}
              data-node-id="7077:3722"
            >
              Slider
            </button>
          </fieldset>

          <D6Chatbot canvasAnchored triggerClassName={styles.chatbot} />
        </div>
      </section>

      <section className={styles.mobileLayout}>
        <div className={styles.mobileHero}>
          <p>Solutions</p>
          <h1>
            POWERING <span>HEALTHCARE</span>
          </h1>
          <h2>
            A <span>GREENER</span> FUTURE,
            <br />
            An Ultimate Target
          </h2>
          <p>
            In an era where sustainability and environmental consciousness are
            paramount, the quest for a greener future is more important than
            ever.
          </p>
          <Link href={exploreHref}>Explore →</Link>
        </div>

        <div className={styles.mobileGallery}>
          {GALLERY.map((item, index) => (
            <button
              type="button"
              key={item.src}
              onClick={() => setSelectedIndex(index)}
              className={
                selectedIndex === index ? styles.mobileSelected : undefined
              }
            >
              <img src={item.src} alt={item.alt} />
              <span>{item.label}</span>
            </button>
          ))}
        </div>
        <D6Chatbot />
      </section>
    </main>
  );
}
