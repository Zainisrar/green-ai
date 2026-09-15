"use client";

import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { useProjects } from "@/hooks/useProjects";
import D6Chatbot from "../D6Chatbot";
import ProductEnquiry from "../Product/Modals/ProductEnquiry";
import SiteHeader from "../SiteHeader/SiteHeader";
import styles from "./Project.module.css";

const springTransition = {
  type: "spring" as const,
  mass: 1,
  stiffness: 100,
  damping: 15,
};

type ProjectPreviewInfo = {
  title: string;
  image: string;
  projectIndex: number;
};

type ProjectSlide = {
  id: number;
  title: string;
  shortTitle?: string;
  image: string;
  leftPreview?: ProjectPreviewInfo;
  rightPreview?: ProjectPreviewInfo;
  systems: string;
  days: string;
  totalGeneration: string;
  batteryPercentage: string;
  coalA: string;
  emissionReduction: string;
  treesPlanted: string;
  capacity: string;
  toDateProduction: string;
  consumption: string;
  dailyGeneration: string;
};

const defaultProjects: ProjectSlide[] = [
  {
    id: 1,
    title:
      "PNG’s First Utility-Scale Grid-Connected Solar Power Plant, 3MW, Baiyer (2025)",
    shortTitle: "Baiyer Solar Plant 2025",
    image: "/images/projects/mask_7077_7014_baiyer.png",
    leftPreview: {
      title: "Pimaga Health Centre 2023",
      image: "/images/projects/mask_7077_7170_pimaga.png",
      projectIndex: 1,
    },
    rightPreview: {
      title: "Mongal Health Centre 2020",
      image: "/images/projects/mask_7077_7960_mongal.png",
      projectIndex: 2,
    },
    systems: "1",
    days: "265",
    totalGeneration: "1000 kWh",
    batteryPercentage: "68",
    coalA: "3.37",
    emissionReduction: "8.78",
    treesPlanted: "603",
    capacity: "93.15 kWh",
    toDateProduction: "10800 kWh",
    consumption: "1298.7 kWh",
    dailyGeneration: "109 kWh",
  },
  {
    id: 2,
    title: "Pimaga Health Centre 2023",
    shortTitle: "Pimaga Health Centre 2023",
    image: "/images/projects/mask_7077_7170_pimaga.png",
    leftPreview: {
      title: "Mongol Health Centre 2020",
      image: "/images/projects/mask_7077_7960_mongal.png",
      projectIndex: 2,
    },
    rightPreview: {
      title: "Baiyer Solar Plant 2025",
      image: "/images/projects/mask_7077_7014_baiyer.png",
      projectIndex: 0,
    },
    systems: "1",
    days: "265",
    totalGeneration: "1000 kWh",
    batteryPercentage: "68",
    coalA: "3.37",
    emissionReduction: "8.78",
    treesPlanted: "603",
    capacity: "93.15 kWh",
    toDateProduction: "10800 kWh",
    consumption: "1298.7 kWh",
    dailyGeneration: "109 kWh",
  },
  {
    id: 3,
    title: "Mongal Health Centre 2020",
    shortTitle: "Mongal Health Centre 2020",
    image: "/images/projects/mask_7077_7960_mongal.png",
    leftPreview: {
      title: "Baiyer Solar Plant 2025",
      image: "/images/projects/mask_7077_7014_baiyer.png",
      projectIndex: 0,
    },
    rightPreview: {
      title: "Wildlife Conservation Society 2025",
      image: "/images/projects/mask_7077_7327_wildlife.png",
      projectIndex: 3,
    },
    systems: "1",
    days: "265",
    totalGeneration: "1000 kWh",
    batteryPercentage: "68",
    coalA: "3.37",
    emissionReduction: "8.78",
    treesPlanted: "603",
    capacity: "93.15 kWh",
    toDateProduction: "10800 kWh",
    consumption: "1298.7 kWh",
    dailyGeneration: "109 kWh",
  },
  {
    id: 4,
    title: "Wildlife Conservation Society 2025",
    shortTitle: "Wildlife Conservation Society 2025",
    image: "/images/projects/mask_7077_7327_wildlife.png",
    leftPreview: {
      title: "Baiyer Solar Plant 2025",
      image: "/images/projects/mask_7077_7014_baiyer.png",
      projectIndex: 0,
    },
    rightPreview: {
      title: "Mongal Health Centre 2020",
      image: "/images/projects/mask_7077_7960_mongal.png",
      projectIndex: 2,
    },
    systems: "1",
    days: "265",
    totalGeneration: "1000 kWh",
    batteryPercentage: "68",
    coalA: "3.37",
    emissionReduction: "8.78",
    treesPlanted: "603",
    capacity: "93.15 kWh",
    toDateProduction: "10800 kWh",
    consumption: "1298.7 kWh",
    dailyGeneration: "109 kWh",
  },
];

const valueWithoutUnit = (value: string | undefined, unit: string) =>
  value?.replace(unit, "").trim() || "—";

type PreviewLabel = {
  name: string;
  year: string;
};

const formatPreviewTitle = (title: string): PreviewLabel => {
  const t = title.toLowerCase();
  if (t.includes("baiyer")) {
    return { name: "Baiyer Solar Plant", year: "2025" };
  }
  if (t.includes("pimaga")) {
    return { name: "Pimaga Health Centre", year: "2023" };
  }
  if (t.includes("mongal") || t.includes("mongol")) {
    return { name: "Mongal Health Centre", year: "2020" };
  }
  if (t.includes("kagua")) {
    return { name: "Kagua Health Centre", year: "2020" };
  }
  if (t.includes("wildlife")) {
    return { name: "Wildlife Conservation Society", year: "2025" };
  }

  const match = title.match(/^(.*?)[\s,]+(\d{4})\)?$/);
  if (match) {
    return { name: match[1].trim(), year: match[2] };
  }
  return { name: title, year: "" };
};

const timelineCards = [
  {
    year: "2007",
    title: "PNG’s First Solar Street Light",
    subtitle: "at NCD",
    position: "card2007",
    visibleAt: 1,
  },
  {
    year: "2010",
    title: "PNG’s First Solar-Powered Hospital with Lighting",
    subtitle:
      "Mutzing, Atzunas, Chuya, Markham Valley, Walium, Mosa, Malala, Mulau, Kaiapit, and Narawapum",
    position: "card2010",
    visibleAt: 2,
  },
  {
    year: "2011",
    title: "PNG’s First Solar-Powered Rural Electrification islands",
    subtitle: "such as Kairuru, Musu, Wallis, Tarawai, Koli, Vokeo",
    position: "card2011",
    visibleAt: 2,
  },
  {
    year: "2012",
    title: "PNG’s First Solar-Powered Rural Government Office",
    subtitle: "such as Simbai, Middle Ramu District",
    position: "card2012",
    visibleAt: 3,
  },
  {
    year: "2020",
    title:
      "PNG’s First Solar-Powered Health Facilities with Full Biomedical Functioning,",
    subtitle: "Kagua, Mongol, Munihu, Kandep, Laigaim, Yango, Tambitanis",
    position: "card2020",
    visibleAt: 4,
  },
  {
    year: "2024",
    title:
      "PNG’s First largest Solar Powered Home Lighting Kits for 20,000 Houses",
    subtitle: "Gulf Province",
    position: "card2024",
    visibleAt: 5,
  },
  {
    year: "2023",
    title: "PNG’s First Solar-Powered Minigrid",
    subtitle: "at Pimaga Rural Hospital including staff houses",
    position: "card2023",
    visibleAt: 5,
  },
] as const;

export default function Project() {
  const [isProjectsOpen, setIsProjectsOpen] = useState(false);
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
  const [isStartOpen, setIsStartOpen] = useState(false);
  const [viewMode, setViewMode] = useState<"in-view" | "slide">("slide");
  const [timelineRun, setTimelineRun] = useState(0);
  const [isDesktop, setIsDesktop] = useState(true);
  const { data: apiProjects } = useProjects();

  useEffect(() => {
    const update = () => setIsDesktop(window.innerWidth > 1200);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const projects = useMemo(() => {
    if (!apiProjects?.length) return defaultProjects;

    return defaultProjects.map((dp) => {
      const live = apiProjects.find(
        (p) =>
          p.title?.toLowerCase().includes(dp.shortTitle?.toLowerCase() || "") ||
          dp.title.toLowerCase().includes(p.title?.toLowerCase() || ""),
      );
      if (!live) return dp;

      return {
        ...dp,
        systems: valueWithoutUnit(live.numberofsystems, "") || dp.systems,
        days: valueWithoutUnit(live.noofdays, "") || dp.days,
        totalGeneration: live.totalgeneration || dp.totalGeneration,
        batteryPercentage:
          valueWithoutUnit(live.battery, "%") || dp.batteryPercentage,
        coalA: live.coalA || dp.coalA,
        emissionReduction: live.emissionreduction || dp.emissionReduction,
        treesPlanted: live.treesplanted || dp.treesPlanted,
        capacity: live.capacity || dp.capacity,
        toDateProduction: live.todateproduct || dp.toDateProduction,
        consumption: live.consumption || dp.consumption,
        dailyGeneration: live.totalenergydaily || dp.dailyGeneration,
      };
    });
  }, [apiProjects]);

  const activeIndex = currentProjectIndex % projects.length;
  const currentProject = projects[activeIndex];

  const currentLeftPreview = currentProject.leftPreview || {
    title:
      projects[(activeIndex - 1 + projects.length) % projects.length].title,
    image:
      projects[(activeIndex - 1 + projects.length) % projects.length].image,
    projectIndex: (activeIndex - 1 + projects.length) % projects.length,
  };

  const currentRightPreview = currentProject.rightPreview || {
    title: projects[(activeIndex + 1) % projects.length].title,
    image: projects[(activeIndex + 1) % projects.length].image,
    projectIndex: (activeIndex + 1) % projects.length,
  };

  const moveProject = (amount: number) => {
    setViewMode("slide");
    if (amount < 0 && currentProject.leftPreview) {
      setCurrentProjectIndex(currentProject.leftPreview.projectIndex);
    } else if (amount > 0 && currentProject.rightPreview) {
      setCurrentProjectIndex(currentProject.rightPreview.projectIndex);
    } else {
      setCurrentProjectIndex(
        (index) => (index + amount + projects.length) % projects.length,
      );
    }
  };
  const openInView = () => {
    setTimelineRun((run) => run + 1);
    setViewMode("in-view");
  };
  const openTimelineProject = (year: string) => {
    const matchingIndex = projects.findIndex((project) =>
      project.title.includes(year),
    );

    if (matchingIndex >= 0) {
      setCurrentProjectIndex(matchingIndex);
    }
    setViewMode("slide");
  };

  return (
    <main className={styles.page} data-node-id="7077:7011">
      <SiteHeader layout={isDesktop ? "figmaCanvas" : "viewport"} />

      <Image
        className={styles.verticalTitle}
        src="/images/projects/title_proj.png"
        alt=""
        width={113}
        height={485}
        priority
      />

      {viewMode === "in-view" ? (
        <InViewTimeline key={timelineRun} onExplore={openTimelineProject} />
      ) : (
        <section className={styles.stage} aria-label="Project portfolio">
          <motion.div
            className={styles.mainPhoto}
            animate={{
              scale: isProjectsOpen ? 0.958 : 1,
            }}
            transition={springTransition}
          >
            <img
              loading="eager"
              decoding="async"
              src={currentProject.image}
              alt={currentProject.title}
              className={styles.figmaMainPhoto}
            />
            <div className={styles.photoShade} />
          </motion.div>

          <div className={styles.titlePanel}>
            <h1>{currentProject.title}</h1>
          </div>

          <motion.button
            type="button"
            className={styles.collapseButton}
            onClick={() => setIsProjectsOpen((open) => !open)}
            aria-expanded={isProjectsOpen}
            aria-label={
              isProjectsOpen
                ? "Collapse project details"
                : "Expand project details"
            }
            initial={false}
            animate={{
              rotate: isProjectsOpen ? 180 : 0,
              top: isProjectsOpen ? 389 : 865,
              left: isProjectsOpen ? 1006 : 844,
            }}
            transition={springTransition}
          >
            <svg
              width="59"
              height="34"
              viewBox="0 0 59 34"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M5 29L29.5 5L54 29"
                stroke="white"
                strokeWidth="8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </motion.button>

          <AnimatePresence>
            {isProjectsOpen && (
              <motion.section
                className={styles.statsPanel}
                aria-label="Project performance data"
                initial={{ opacity: 0, y: 562 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 562 }}
                transition={springTransition}
              >
                <div className={styles.primaryStats}>
                  <Stat label="No. of systems" value={currentProject.systems} />
                  <Stat label="No. of days" value={currentProject.days} />
                  <Stat
                    label="Total Generation"
                    value={currentProject.totalGeneration}
                    large
                  />
                  <div className={styles.battery}>
                    <span>
                      <Image
                        src="/images/projects/batteryPercentage.png"
                        width={26}
                        height={27}
                        alt=""
                      />
                    </span>
                    <strong>{currentProject.batteryPercentage}%</strong>
                  </div>
                </div>
                <div className={styles.impactStats}>
                  <Impact
                    icon="/images/projects/coal.png"
                    label="Coal A"
                    value={currentProject.coalA}
                  />
                  <span className={styles.divider}>/</span>
                  <Impact
                    icon="/images/projects/co2.png"
                    label={
                      <>
                        Emission
                        <br />
                        reduction
                      </>
                    }
                    value={currentProject.emissionReduction}
                  />
                  <span className={styles.divider}>/</span>
                  <Impact
                    icon="/images/projects/tree.png"
                    label="Trees Planted"
                    value={currentProject.treesPlanted}
                  />
                  <Impact
                    icon="/images/projects/capacity.png"
                    label="Capacity"
                    value={currentProject.capacity}
                  />
                  <Impact
                    icon="/images/projects/totalProduction.png"
                    label="To date Production"
                    value={currentProject.toDateProduction}
                  />
                  <Impact
                    icon="/images/projects/consumption.png"
                    label="Consumption"
                    value={currentProject.consumption}
                  />
                </div>
                <div className={styles.chartRow}>
                  <div className={styles.periods}>
                    {["Day", "Week", "Month", "Year"].map((period) => (
                      <button type="button" key={period}>
                        {period}
                      </button>
                    ))}
                  </div>
                  <div className={styles.graph}>
                    <p>
                      Total Generation daily : {currentProject.dailyGeneration}
                    </p>
                    <Image
                      src="/images/projects/graph.png"
                      alt="Daily energy generation graph"
                      width={342}
                      height={148}
                    />
                    <span>Today</span>
                  </div>
                </div>
              </motion.section>
            )}
          </AnimatePresence>
        </section>
      )}

      <fieldset className={styles.viewToggle}>
        <legend className={styles.screenReaderOnly}>Project view mode</legend>
        <button
          type="button"
          className={viewMode === "in-view" ? styles.activeView : undefined}
          onClick={openInView}
          aria-pressed={viewMode === "in-view"}
        >
          In View
        </button>
        <button
          type="button"
          className={viewMode === "slide" ? styles.activeView : undefined}
          onClick={() => setViewMode("slide")}
          aria-pressed={viewMode === "slide"}
        >
          Slide
        </button>
      </fieldset>

      {viewMode === "slide" && (
        <>
          <ProjectPreview
            title={currentLeftPreview.title}
            image={currentLeftPreview.image}
            direction="previous"
            onClick={() => moveProject(-1)}
          />
          <ProjectPreview
            title={currentRightPreview.title}
            image={currentRightPreview.image}
            direction="next"
            onClick={() => moveProject(1)}
          />

          <button
            type="button"
            className={`${styles.mobileArrow} ${styles.mobilePrevious}`}
            onClick={() => moveProject(-1)}
            aria-label="Previous project"
          >
            <Arrow direction="left" />
          </button>
          <button
            type="button"
            className={`${styles.mobileArrow} ${styles.mobileNext}`}
            onClick={() => moveProject(1)}
            aria-label="Next project"
          >
            <Arrow direction="right" />
          </button>

          <button
            type="button"
            className={styles.startButton}
            onClick={() => setIsStartOpen(true)}
          >
            <Image
              src="/images/projects/letStart.png"
              alt="Let's Start"
              width={179}
              height={62}
            />
          </button>
        </>
      )}
      {isDesktop ? (
        <motion.div
          animate={{
            x: isProjectsOpen ? -7 : 0,
            y: isProjectsOpen ? -4 : 0,
          }}
          transition={springTransition}
        >
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
        </motion.div>
      ) : (
        <D6Chatbot />
      )}
      <ProductEnquiry
        isOpen={isStartOpen}
        onClose={() => setIsStartOpen(false)}
        titlePrefix="LET'S"
        titleAccent="START"
        interestLabel="PROJECT TYPE"
        interestOptions={[
          "Project Portfolio",
          "Solar EPCM",
          "Hybrid microgrid",
          "Energy storage",
          "Grid integration",
          "Rural electrification",
          "Other",
        ]}
        defaultInterest="Project Portfolio"
        submitButtonText="Get Started"
      />
    </main>
  );
}

function InViewTimeline({ onExplore }: { onExplore: (year: string) => void }) {
  const step = 5;

  return (
    <section
      className={styles.inViewStage}
      data-step={step}
      aria-label="PNG project milestone map"
    >
      <Image
        className={styles.pngMap}
        src="/images/projects/png-map-figma.png"
        alt="Map of Papua New Guinea showing GREEN project locations"
        width={2048}
        height={756}
        priority
      />

      <div
        className={`${styles.mapPin} ${styles.pin2007}`}
        aria-hidden="true"
      />
      <span
        className={`${styles.connector} ${styles.connector2007}`}
        aria-hidden="true"
      />

      <div
        className={`${styles.revealGroup} ${step >= 2 ? styles.isVisible : ""}`}
      >
        <div
          className={`${styles.mapPin} ${styles.pin2010}`}
          aria-hidden="true"
        />
        <div
          className={`${styles.mapPin} ${styles.pin2011}`}
          aria-hidden="true"
        />
        <span
          className={`${styles.connector} ${styles.connector2010}`}
          aria-hidden="true"
        />
        <span
          className={`${styles.connector} ${styles.connector2011}`}
          aria-hidden="true"
        />
      </div>

      <div
        className={`${styles.revealGroup} ${step >= 3 ? styles.isVisible : ""}`}
      >
        <div
          className={`${styles.mapPin} ${styles.pin2012}`}
          aria-hidden="true"
        />
        <span
          className={`${styles.connector} ${styles.connector2012Vertical}`}
          aria-hidden="true"
        />
        <span
          className={`${styles.connector} ${styles.connector2012Horizontal}`}
          aria-hidden="true"
        />
      </div>

      <div
        className={`${styles.revealGroup} ${step >= 4 ? styles.isVisible : ""}`}
      >
        <div
          className={`${styles.mapPin} ${styles.pin2020}`}
          aria-hidden="true"
        />
        <span
          className={`${styles.connector} ${styles.connector2020}`}
          aria-hidden="true"
        />
      </div>

      <div
        className={`${styles.revealGroup} ${step >= 5 ? styles.isVisible : ""}`}
      >
        <div
          className={`${styles.mapPin} ${styles.pin2024}`}
          aria-hidden="true"
        />
        <div
          className={`${styles.mapPin} ${styles.pin2023}`}
          aria-hidden="true"
        />
        <span
          className={`${styles.connector} ${styles.connector2024Vertical}`}
          aria-hidden="true"
        />
        <span
          className={`${styles.connector} ${styles.connector2024Horizontal}`}
          aria-hidden="true"
        />
        <span
          className={`${styles.connector} ${styles.connector2023Vertical}`}
          aria-hidden="true"
        />
        <span
          className={`${styles.connector} ${styles.connector2023Horizontal}`}
          aria-hidden="true"
        />
      </div>

      {timelineCards.map((card) => (
        <article
          className={`${styles.timelineCard} ${styles[card.position]} ${step >= card.visibleAt ? styles.isVisible : ""}`}
          key={card.year}
        >
          <div className={styles.timelineCopy}>
            <h2>
              {card.year} - {card.title}
            </h2>
            <p>{card.subtitle}</p>
          </div>
          <button type="button" onClick={() => onExplore(card.year)}>
            Explore
            <span className={styles.exploreArrow} aria-hidden="true">
              ›
            </span>
          </button>
        </article>
      ))}
    </section>
  );
}

function Stat({
  label,
  value,
  large = false,
}: {
  label: string;
  value: string;
  large?: boolean;
}) {
  return (
    <div className={styles.stat}>
      <span>{label}</span>
      <strong className={large ? styles.largeValue : undefined}>{value}</strong>
    </div>
  );
}

function Impact({
  icon,
  label,
  value,
}: {
  icon: string;
  label: React.ReactNode;
  value: string;
}) {
  return (
    <div className={styles.impact}>
      <Image src={icon} alt="" width={34} height={28} />
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function Arrow({ direction }: { direction: "left" | "right" }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d={direction === "left" ? "m14 5-7 7 7 7" : "m10 5 7 7-7 7"} />
    </svg>
  );
}

function ProjectPreview({
  title,
  image,
  direction,
  onClick,
}: {
  title: string;
  image: string;
  direction: "previous" | "next";
  onClick: () => void;
}) {
  const isPrevious = direction === "previous";
  const { name, year } = formatPreviewTitle(title);
  const fullLabel = year ? `${name} ${year}` : name;

  return (
    <button
      type="button"
      className={`${styles.preview} ${isPrevious ? styles.previousPreview : styles.nextPreview}`}
      onClick={onClick}
      aria-label={`${isPrevious ? "Previous" : "Next"} project: ${fullLabel}`}
    >
      {/* 1. Back Layer: Clear unblurred framed photo */}
      <span className={styles.previewBackFrame}>
        <img loading="lazy" decoding="async" src={image} alt="" />
      </span>

      {/* 2. Front Layer: Frosted glass blurred card */}
      <span className={styles.previewFrontCard}>
        <img
          loading="lazy"
          decoding="async"
          src={image}
          alt=""
          className={styles.previewFrontImg}
        />
        <span className={styles.previewCaption}>
          <span>{name}</span>
          {year && <span className={styles.previewYear}>{year}</span>}
        </span>
      </span>

      {/* 3. Directional arrow */}
      <span className={styles.previewArrow} aria-hidden="true">
        <img
          loading="lazy"
          decoding="async"
          src={
            isPrevious
              ? "/images/projects/arrow_7077_7037.png"
              : "/images/projects/arrow_7077_7036.png"
          }
          alt=""
          width={40}
          height={23}
        />
      </span>
    </button>
  );
}
