"use client";

import { AnimatePresence } from "motion/react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useExpertise } from "../../../hooks/useExpertise";
import D6Chatbot from "../D6Chatbot";
import SiteHeader from "../SiteHeader/SiteHeader";
import styles from "./Expertise.module.css";
import SolutionDetail from "./SolutionDetail";

const DESIGN_WIDTH = 1920;
const DESIGN_HEIGHT = 970;
const ASSET_ROOT = "/images/expertise/figma-d2";

const GALLERY = [
  {
    src: `${ASSET_ROOT}/healthcare.png`,
    alt: "Solar installation powering a healthcare complex",
    label: "Powering Healthcare",
    slug: "/expertise/powering-healthcare",
  },
  {
    src: `${ASSET_ROOT}/community-solar.png`,
    alt: "Community solar installation",
    label: "Powering Communities",
    slug: "/expertise/powering-communities",
  },
  {
    src: `${ASSET_ROOT}/solar-pump.png`,
    alt: "Solar array beside a water source",
    label: "Powering Rural",
    slug: "/expertise/powering-rural",
  },
  {
    src: `${ASSET_ROOT}/commercial-solar.png`,
    alt: "Commercial building with rooftop solar",
    label: "Powering Corporate",
    slug: "/expertise/powering-corporate",
  },
  {
    src: `${ASSET_ROOT}/telecom-solar.png`,
    alt: "Remote solar and telecommunications installation",
    label: "Powering Telecom",
    slug: "/expertise/powering-telecom",
  },
  {
    src: `${ASSET_ROOT}/home-solar.png`,
    alt: "Home powered by rooftop solar",
    label: "Powering Home",
    slug: "/expertise/powering-home",
  },
] as const;

const SOLUTION_COPY = [
  {
    title: "POWERING",
    highlighted: "HEALTHCARE",
    description:
      "In an era where sustainability and environmental consciousness are paramount, the quest for a greener future is more important than ever",
  },
  {
    title: "POWERING",
    highlighted: "COMMUNITIES",
    description:
      "Reliable, clean energy solutions that enable stronger and more resilient communities.",
  },
  {
    title: "POWERING",
    highlighted: "RURAL",
    description:
      "Solar-powered systems that improve productivity, irrigation, and dependable energy access for agriculture and rural communities.",
  },
  {
    title: "POWERING",
    highlighted: "CORPORATE",
    description:
      "Efficient renewable energy systems built for businesses, industry, and essential commercial operations.",
  },
  {
    title: "POWERING",
    highlighted: "TELECOM",
    description:
      "Resilient solar energy infrastructure that keeps remote and critical telecommunications connected.",
  },
  {
    title: "POWERING",
    highlighted: "HOME",
    description:
      "Sustainable, affordable power solutions that bring dependable energy to homes and rural households.",
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

function parseTitle(
  title?: string,
  highlighted?: string,
  defaultTitle = "POWERING",
  defaultHighlight = "HEALTHCARE",
) {
  if (!title) return { title: defaultTitle, highlighted: defaultHighlight };
  const parts = title.trim().split(/\s+/);
  if (parts.length >= 2 && parts[0].toUpperCase() === "POWERING") {
    return {
      title: parts[0],
      highlighted: parts.slice(1).join(" ").toUpperCase(),
    };
  }
  if (highlighted && title.toUpperCase().includes(highlighted.toUpperCase())) {
    const cleaned = title
      .replace(
        new RegExp(highlighted.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i"),
        "",
      )
      .trim();
    return {
      title: cleaned || defaultTitle,
      highlighted: highlighted.toUpperCase(),
    };
  }
  return {
    title: parts[0] || defaultTitle,
    highlighted: parts.slice(1).join(" ").toUpperCase() || defaultHighlight,
  };
}

const SLIDER_ITEMS = [
  {
    nodeId: "7077:3787",
    item: 0,
    src: "/images/expertise/figma-slider/rectangle-428.png",
    assetClass: "sliderAssetHealthcare",
    label: "",
    labelClass: "",
    title: "POWERING",
    highlighted: "HEALTHCARE",
    description:
      "In an era where sustainability and environmental consciousness are paramount, the quest for a greener future is more important than ever",
    slug: "/expertise/powering-healthcare",
  },
  {
    nodeId: "7077:3790",
    item: 5,
    src: "/images/expertise/figma-slider/edu-1.png",
    assetClass: "sliderAssetHome",
    label: "Powering Home",
    labelClass: "",
    title: "POWERING",
    highlighted: "HOME",
    description:
      "Sustainable, affordable power solutions that bring dependable energy to homes and rural households.",
    slug: "/expertise/powering-home",
  },
  {
    nodeId: "7077:3796",
    item: 3,
    src: "/images/expertise/figma-slider/rectangle-372.png",
    assetClass: "sliderAssetCorporate",
    label: "Powering Corporate",
    labelClass: "sliderPanelCorporate",
    title: "POWERING",
    highlighted: "CORPORATE",
    description:
      "Efficient renewable energy systems built for businesses, industry, and essential commercial operations.",
    slug: "/expertise/powering-corporate",
  },
  {
    nodeId: "7077:3802",
    item: 2,
    src: "/images/expertise/figma-slider/rectangle-366.png",
    assetClass: "sliderAssetRural",
    label: "Powering Rural",
    labelClass: "sliderPanelRural",
    title: "POWERING",
    highlighted: "RURAL",
    description:
      "Solar-powered systems that improve productivity, irrigation, and dependable energy access for agriculture and rural communities.",
    slug: "/expertise/powering-rural",
  },
  {
    nodeId: "7077:3807",
    item: 4,
    src: "/images/expertise/figma-slider/rectangle-370.png",
    assetClass: "sliderAssetTelecom",
    label: "",
    labelClass: "",
    title: "POWERING",
    highlighted: "TELECOM",
    description:
      "Resilient solar energy infrastructure that keeps remote and critical telecommunications connected.",
    slug: "/expertise/powering-telecom",
  },
  {
    nodeId: "7077:3810",
    item: 1,
    src: "/images/expertise/figma-slider/rectangle-365.png",
    assetClass: "sliderAssetResidence",
    label: "",
    labelClass: "",
    title: "POWERING",
    highlighted: "COMMUNITIES",
    description:
      "Reliable, clean energy solutions that enable stronger and more resilient communities.",
    slug: "/expertise/powering-communities",
  },
  {
    nodeId: "7077:3813",
    item: 3,
    src: "/images/expertise/figma-slider/rectangle-372.png",
    assetClass: "sliderAssetCorporateRepeat",
    label: "",
    labelClass: "",
    title: "POWERING",
    highlighted: "CORPORATE",
    description:
      "Efficient renewable energy systems built for businesses, industry, and essential commercial operations.",
    slug: "/expertise/powering-corporate",
  },
  {
    nodeId: "7077:3816",
    item: 2,
    src: "/images/expertise/figma-slider/rectangle-366.png",
    assetClass: "sliderAssetRuralRepeat",
    label: "",
    labelClass: "",
    title: "POWERING",
    highlighted: "RURAL",
    description:
      "Solar-powered systems that improve productivity, irrigation, and dependable energy access for agriculture and rural communities.",
    slug: "/expertise/powering-rural",
  },
] as const;

const SLIDER_CARD_STEP = 470.361;

const HEALTHCARE_IMAGES = [
  {
    src: "/images/expertise/powerhealthcare1.png",
    alt: "Solar panels installed on a healthcare facility roof",
  },
  {
    src: "/images/expertise/powerhealthcare2.png",
    alt: "Aerial view of the healthcare facility and water tank",
  },
  {
    src: "/images/expertise/powerhealthcare3.png",
    alt: "Solar powered healthcare facility surrounded by forest",
  },
] as const;

const HEALTHCARE_FEATURES = [
  {
    icon: "/images/expertise/medicalservices.svg",
    title: "Medical Services & Lighting",
    description:
      "Enable effective delivery of health services with energy efficient lifesaving medical devices and lighting etc.",
  },
  {
    icon: "/images/expertise/diseasetreatement.svg",
    title: "Disease Treatment & Prevention",
    description:
      "Enables Healthcare sectors to broaden services for prevention and treatment of non-communicable diseases and other diseases.",
  },
  {
    icon: "/images/expertise/medicalservices.svg",
    title: "Maternal Care",
    description:
      "Reduce maternal infant mortality rate with effective obstetric procedures and surgery with reliable lighting and advanced medical equipment etc.",
  },
  {
    icon: "/images/expertise/diseasetreatement.svg",
    title: "Disease Diagnosis & Emergency Procedures",
    description:
      "Broaden services for prevention and treatment of non-communicable diseases and other diseases.",
  },
] as const;

type ViewMode = "grid" | "slider";
type SliderScreen = "overview" | "healthcare";

export default function Expertise() {
  const { data: expertiseItems } = useExpertise();
  const [view, setView] = useState<ViewMode>("grid");
  const [sliderScreen, setSliderScreen] = useState<SliderScreen>("overview");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isSliderDragging, setIsSliderDragging] = useState(false);
  const [desktopScale, setDesktopScale] = useState({ x: 1, y: 1 });
  const sliderViewportRef = useRef<HTMLElement>(null);
  const sliderDragStart = useRef<{
    pointerId: number;
    x: number;
    scrollLeft: number;
    lastX: number;
    lastTime: number;
    velocity: number;
  } | null>(null);
  const sliderDidDrag = useRef(false);
  const sliderMomentumFrame = useRef<number | null>(null);

  useEffect(() => {
    const updateScale = () => {
      setDesktopScale({
        x: document.documentElement.clientWidth / DESIGN_WIDTH,
        y: window.innerHeight / DESIGN_HEIGHT,
      });
    };

    updateScale();
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, []);

  const [activeSliderIndex, setActiveSliderIndex] = useState(0);

  const selectSolution = (galleryIndex: number) => {
    const safeIndex = (galleryIndex + GALLERY.length) % GALLERY.length;
    setSelectedIndex(safeIndex);
    const matchingSliderIndex = SLIDER_ITEMS.findIndex(
      (panel) => panel.item === safeIndex,
    );
    if (matchingSliderIndex >= 0) {
      setActiveSliderIndex(matchingSliderIndex);
    }
  };

  const currentSliderItem = SLIDER_ITEMS[activeSliderIndex] ?? SLIDER_ITEMS[0];
  const activeGalleryItem = GALLERY[selectedIndex % GALLERY.length];
  const fallbackSolution = SOLUTION_COPY[selectedIndex % SOLUTION_COPY.length];

  const activeExpertise = expertiseItems?.find((item) => {
    const targetSlug = `/expertise/${activeGalleryItem.label.toLowerCase().replace(/\s+/g, "-")}`;
    const cleanLabel = activeGalleryItem.label
      .toLowerCase()
      .replace("powering ", "");
    return (
      item.slug === targetSlug ||
      item.slug?.includes(cleanLabel) ||
      (cleanLabel === "rural" && item.slug?.includes("agriculture")) ||
      (cleanLabel === "corporate" && item.slug?.includes("industry")) ||
      (cleanLabel === "home" && item.slug?.includes("homes"))
    );
  });

  let activeTitle: string;
  let activeHighlighted: string;
  let activeDescription: string;
  let exploreHref: string;

  if (view === "slider") {
    activeTitle = currentSliderItem.title;
    activeHighlighted = currentSliderItem.highlighted;
    activeDescription = currentSliderItem.description;
    exploreHref = currentSliderItem.slug;
  } else {
    const parsed = parseTitle(
      activeExpertise?.title,
      activeExpertise?.highlightedTitle || activeExpertise?.highlighted,
      fallbackSolution.title,
      fallbackSolution.highlighted,
    );
    activeTitle = parsed.title;
    activeHighlighted = parsed.highlighted;
    activeDescription =
      activeExpertise?.description || fallbackSolution.description;
    exploreHref =
      activeExpertise?.slug ||
      activeGalleryItem.slug ||
      "/expertise/powering-healthcare";
  }

  const scrollSlider = (direction: 1 | -1) => {
    sliderViewportRef.current?.scrollBy({
      left: direction * SLIDER_CARD_STEP,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
    });
  };

  const finishSliderDrag = () => {
    const dragStart = sliderDragStart.current;
    if (dragStart === null) return;

    sliderDragStart.current = null;
    setIsSliderDragging(false);

    const viewport = sliderViewportRef.current;
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (viewport && !reduceMotion && Math.abs(dragStart.velocity) > 0.04) {
      let velocity = Math.max(-2.2, Math.min(2.2, dragStart.velocity));
      let previousTime = performance.now();

      const applyMomentum = (time: number) => {
        const elapsed = Math.min(time - previousTime, 32);
        previousTime = time;
        viewport.scrollLeft += velocity * elapsed;
        velocity *= 0.88 ** (elapsed / 16.67);

        const atStart = viewport.scrollLeft <= 0 && velocity < 0;
        const atEnd =
          viewport.scrollLeft >= viewport.scrollWidth - viewport.clientWidth &&
          velocity > 0;
        if (Math.abs(velocity) > 0.02 && !atStart && !atEnd) {
          sliderMomentumFrame.current = requestAnimationFrame(applyMomentum);
        } else {
          sliderMomentumFrame.current = null;
        }
      };

      sliderMomentumFrame.current = requestAnimationFrame(applyMomentum);
    }

    window.setTimeout(() => {
      sliderDidDrag.current = false;
    }, 80);
  };

  return (
    <main className={styles.page}>
      <section className={styles.desktopStage} aria-label="GREEN solutions">
        <div
          className={styles.canvas}
          data-node-id="7077:3678"
          data-name="Solutions page -D2"
          style={{
            transform: `scale(${desktopScale.x}, ${desktopScale.y})`,
          }}
        >
          <SiteHeader layout="figmaCanvas" canvasActiveNavigation />

          <AnimatePresence initial={false}>
            {sliderScreen === "healthcare" ? (
              <SolutionDetail
                nodeId="7077:3843"
                title="POWERING"
                highlightedTitle="HEALTHCARE"
                subtitle="Renewable Energy and Medical Technology Augmentation for Sustainable Healthcare System"
                description="Powering the Healthcare initiative, GREEN Limited equips healthcare facilities with renewable energy-based power production augmented with medical technology to impart enabling and empowering capabilities for Sustainable Healthcare Facilities. The Sustainable Healthcare System provides vital, modern, and life-saving medical equipment that meets the standards and requirements of the healthcare industry. This solution promotes health and well-being for all those who employ it. Enhance Healthcare Facilities Using the Powering Healthcare Program"
                images={HEALTHCARE_IMAGES}
                features={HEALTHCARE_FEATURES}
                categories={[
                  { id: "education", label: "Powering Education" },
                  { id: "agriculture", label: "Powering Agriculture" },
                  { id: "home", label: "Powering Home" },
                  { id: "education-secondary", label: "Powering Education" },
                ]}
                activeCategoryImage={GALLERY[0].src}
                activeCategoryLabel="Powering Healthcare"
                startHref={exploreHref}
                onBack={() => setSliderScreen("overview")}
              />
            ) : null}
          </AnimatePresence>

          <div
            className={
              sliderScreen === "healthcare" ? styles.overviewHidden : undefined
            }
          >
            <div className={styles.leftBackdrop} aria-hidden="true">
              <img
                loading="lazy"
                decoding="async"
                src={`${ASSET_ROOT}/background.png`}
                alt=""
                data-node-id="7077:3687"
              />
            </div>
            <h1
              className={`${styles.heroHeading} ${
                view === "slider" ? styles.sliderHeroHeading : ""
              }`}
              data-node-id="7077:3711"
            >
              {activeTitle} <span>{activeHighlighted}</span>
            </h1>

            {view === "slider" ? (
              <img
                loading="lazy"
                decoding="async"
                className={styles.sliderWatermark}
                src="/images/expertise/sliderSolution.png"
                alt="SOLUTIONS"
                data-node-id="7077:3713"
              />
            ) : (
              <img
                loading="lazy"
                decoding="async"
                className={styles.verticalLabel}
                src="/images/expertise/figma-d2/expertise_vert.png"
                alt="SOLUTIONS"
                data-node-id="7077:3713"
              />
            )}

            {view === "grid" ? (
              <>
                <section
                  className={styles.introduction}
                  data-node-id="7077:3712"
                >
                  <h2>
                    A <span>GREENER</span> FUTURE,
                    <br />
                    An Ultimate Target
                  </h2>
                  <p data-node-id="7077:3710">{activeDescription}</p>
                </section>

                <Link
                  href={exploreHref}
                  className={styles.exploreButton}
                  data-node-id="7077:3746"
                  aria-label={`Explore ${activeGalleryItem.label}`}
                >
                  <img
                    loading="lazy"
                    decoding="async"
                    className={styles.exploreShape}
                    src={`${ASSET_ROOT}/explore-button.svg`}
                    alt=""
                  />
                  <span>Explore</span>
                  <img
                    loading="lazy"
                    decoding="async"
                    className={styles.exploreArrow}
                    src={`${ASSET_ROOT}/explore-arrow.svg`}
                    alt=""
                  />
                </Link>
              </>
            ) : (
              <p className={styles.sliderDescription} data-node-id="7077:3769">
                {activeDescription}
              </p>
            )}

            <section
              className={styles.gallery}
              aria-label="Renewable energy solutions"
              data-node-id="7077:3724"
            >
              {view === "grid" ? (
                <>
                  {GRID_CARDS.map((card) => {
                    const item = GALLERY[card.item];
                    const isSelected = selectedIndex === card.item;
                    return (
                      <button
                        key={card.nodeId}
                        type="button"
                        className={`${styles.galleryCard} ${
                          isSelected ? styles.galleryCardSelected : ""
                        }`}
                        data-node-id={card.nodeId}
                        style={{ left: card.left, top: card.top }}
                        onClick={() => selectSolution(card.item)}
                        aria-label={`Select ${item.label}`}
                        aria-pressed={isSelected}
                      >
                        <img
                          loading="lazy"
                          decoding="async"
                          src={item.src}
                          alt={item.alt}
                        />
                        <span aria-hidden="true" />
                      </button>
                    );
                  })}

                  <button
                    type="button"
                    className={styles.selectedCard}
                    data-node-id="7077:3738"
                    onClick={() => selectSolution(selectedIndex)}
                    aria-label={`Selected solution: ${activeGalleryItem.label}`}
                    aria-pressed="true"
                  >
                    <img
                      loading="lazy"
                      decoding="async"
                      src={activeGalleryItem.src}
                      alt={activeGalleryItem.alt}
                    />
                    <span className={styles.selectedLabel}>
                      <img
                        loading="lazy"
                        decoding="async"
                        src={`${ASSET_ROOT}/selected-label.svg`}
                        alt=""
                      />
                      <b>{activeGalleryItem.label}</b>
                    </span>
                  </button>
                </>
              ) : (
                <div className={styles.sliderGallery} data-node-id="7077:3768">
                  <section
                    ref={sliderViewportRef}
                    className={`${styles.sliderScroller} ${
                      isSliderDragging ? styles.sliderDragging : ""
                    }`}
                    data-node-id="7077:3786"
                    data-name="CROLLING"
                    aria-label="Solutions carousel. Scroll or drag horizontally, or use the left and right arrow keys."
                    onPointerDown={(event) => {
                      if (sliderMomentumFrame.current !== null) {
                        cancelAnimationFrame(sliderMomentumFrame.current);
                        sliderMomentumFrame.current = null;
                      }
                      sliderDragStart.current = {
                        pointerId: event.pointerId,
                        x: event.clientX,
                        scrollLeft: event.currentTarget.scrollLeft,
                        lastX: event.clientX,
                        lastTime: performance.now(),
                        velocity: 0,
                      };
                      sliderDidDrag.current = false;
                    }}
                    onPointerMove={(event) => {
                      const dragStart = sliderDragStart.current;
                      if (
                        dragStart === null ||
                        dragStart.pointerId !== event.pointerId
                      )
                        return;

                      const dragDistance =
                        (event.clientX - dragStart.x) / desktopScale.x;
                      const now = performance.now();
                      const elapsed = Math.max(now - dragStart.lastTime, 1);
                      dragStart.velocity =
                        (dragStart.lastX - event.clientX) /
                        desktopScale.x /
                        elapsed;
                      dragStart.lastX = event.clientX;
                      dragStart.lastTime = now;
                      if (Math.abs(dragDistance) > 4) {
                        sliderDidDrag.current = true;
                        setIsSliderDragging(true);
                        try {
                          if (
                            !event.currentTarget.hasPointerCapture(
                              event.pointerId,
                            )
                          ) {
                            event.currentTarget.setPointerCapture(
                              event.pointerId,
                            );
                          }
                        } catch {
                          // ignore capture error
                        }
                      }
                      event.currentTarget.scrollLeft =
                        dragStart.scrollLeft - dragDistance;
                    }}
                    onPointerUp={finishSliderDrag}
                    onPointerCancel={finishSliderDrag}
                    onWheel={(event) => {
                      const delta =
                        Math.abs(event.deltaX) > Math.abs(event.deltaY)
                          ? event.deltaX
                          : event.deltaY;
                      const viewport = event.currentTarget;
                      const maxScroll =
                        viewport.scrollWidth - viewport.clientWidth;
                      const canScroll =
                        (delta < 0 && viewport.scrollLeft > 0) ||
                        (delta > 0 && viewport.scrollLeft < maxScroll);

                      if (!canScroll) return;
                      event.preventDefault();
                      viewport.scrollLeft += delta / desktopScale.x;
                    }}
                    onKeyDown={(event) => {
                      if (event.key === "ArrowLeft") {
                        event.preventDefault();
                        scrollSlider(-1);
                      }
                      if (event.key === "ArrowRight") {
                        event.preventDefault();
                        scrollSlider(1);
                      }
                    }}
                  >
                    <div className={styles.sliderTrack}>
                      {SLIDER_ITEMS.map((panel, index) => {
                        const isActive = activeSliderIndex === index;
                        return (
                          <button
                            type="button"
                            key={panel.nodeId}
                            data-node-id={panel.nodeId}
                            onClick={() => {
                              if (!sliderDidDrag.current) {
                                setActiveSliderIndex(index);
                                setSelectedIndex(panel.item);
                              }
                            }}
                            className={`${styles.sliderPanel} ${
                              isActive ? styles.sliderPanelActive : ""
                            }`}
                            aria-label={`Select ${panel.title} ${panel.highlighted}`}
                            aria-pressed={isActive}
                          >
                            <span
                              className={`${styles.sliderAsset} ${styles[panel.assetClass]}`}
                            >
                              <img
                                loading="lazy"
                                decoding="async"
                                src={panel.src}
                                alt={panel.highlighted}
                              />
                            </span>
                            {panel.label ? (
                              <span
                                className={`${styles.sliderLabel} ${styles[panel.labelClass]}`}
                              >
                                <b>{panel.label}</b>
                              </span>
                            ) : null}
                          </button>
                        );
                      })}
                    </div>
                  </section>
                </div>
              )}
            </section>

            {view === "grid" ? (
              <div className={styles.pagination} aria-hidden="true">
                <img
                  loading="lazy"
                  decoding="async"
                  src={`${ASSET_ROOT}/dot-active.svg`}
                  alt=""
                />
                <img
                  loading="lazy"
                  decoding="async"
                  src={`${ASSET_ROOT}/dot.svg`}
                  alt=""
                />
                <img
                  loading="lazy"
                  decoding="async"
                  src={`${ASSET_ROOT}/dot.svg`}
                  alt=""
                />
              </div>
            ) : null}

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
                onClick={() => {
                  setSliderScreen("overview");
                  setView("slider");
                  const matchingSliderIndex = SLIDER_ITEMS.findIndex(
                    (panel) => panel.item === selectedIndex,
                  );
                  const targetIndex =
                    matchingSliderIndex >= 0 ? matchingSliderIndex : 0;
                  setActiveSliderIndex(targetIndex);
                  requestAnimationFrame(() => {
                    if (sliderViewportRef.current) {
                      sliderViewportRef.current.scrollTo({
                        left: targetIndex * SLIDER_CARD_STEP,
                        behavior: window.matchMedia(
                          "(prefers-reduced-motion: reduce)",
                        ).matches
                          ? "auto"
                          : "smooth",
                      });
                    }
                  });
                }}
                aria-pressed={view === "slider"}
                data-node-id="7077:3722"
              >
                Slider
              </button>
            </fieldset>
          </div>

          <D6Chatbot canvasAnchored triggerVariant="figmaCanvas" />
        </div>
      </section>

      <section className={styles.mobileLayout}>
        <div className={styles.mobileHero}>
          <p>Solutions</p>
          <h1>
            {activeTitle} <span>{activeHighlighted}</span>
          </h1>
          <h2>
            A <span>GREENER</span> FUTURE,
            <br />
            An Ultimate Target
          </h2>
          <p>{activeDescription}</p>
          <Link href={exploreHref}>Explore →</Link>
        </div>

        <div className={styles.mobileGallery}>
          {GALLERY.map((item, index) => (
            <button
              type="button"
              key={item.src}
              onClick={() => selectSolution(index)}
              className={
                selectedIndex === index ? styles.mobileSelected : undefined
              }
            >
              <img
                loading="lazy"
                decoding="async"
                src={item.src}
                alt={item.alt}
              />
              <span>{item.label}</span>
            </button>
          ))}
        </div>
        <D6Chatbot />
      </section>
    </main>
  );
}
