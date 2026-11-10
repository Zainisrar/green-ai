"use client";

import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { type ProjectPhotograph, useProjects } from "@/hooks/useProjects";
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
  batteryStorage: string;
  siteName: string;
  clientName: string;
  projectScope: string;
  completionYear: string;
  listedCapacity: string;
  sourceNote?: string;
  coalA: string;
  emissionReduction: string;
  treesPlanted: string;
  capacity: string;
  toDateProduction: string;
  consumption: string;
  timelineYear?: string;
  gallery: ProjectPhotograph[];
  population?: string;
};

type PreviewLabel = {
  name: string;
  year: string;
};

const formatPreviewTitle = (title: string): PreviewLabel => {
  const match = title.match(/^(.*?)[\s,]+(\d{4})\)?$/);
  if (match) {
    return { name: match[1].trim(), year: match[2] };
  }
  return { name: title, year: "" };
};

export default function Project() {
  const [isProjectsOpen, setIsProjectsOpen] = useState(false);
  const [isDashboard, setIsDashboard] = useState(false);
  const [isFactsOpen, setIsFactsOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
  const [isStartOpen, setIsStartOpen] = useState(false);
  const [viewMode, setViewMode] = useState<"in-view" | "slide">("slide");
  const [timelineRun, setTimelineRun] = useState(0);
  const [isDesktop, setIsDesktop] = useState(true);
  const { data: apiProjects, isPending, isError, refetch } = useProjects();

  useEffect(() => {
    const update = () => setIsDesktop(window.innerWidth > 1200);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const projects = useMemo<ProjectSlide[]>(() => {
    if (!apiProjects?.length) return [];

    return apiProjects.map((project) => ({
      id: project.id,
      title: project.title,
      shortTitle: project.title,
      image: project.featuredImg,
      gallery: project.gallery ?? [],
      population: project.population,
      leftPreview: undefined,
      rightPreview: undefined,
      systems: project.numberofsystems,
      days: project.noofdays,
      totalGeneration: project.totalgeneration,
      batteryStorage: project.battery,
      siteName: project.siteName ?? "",
      clientName: project.clientName ?? "",
      projectScope: project.projectScope ?? "",
      completionYear: project.completionYear ?? "",
      listedCapacity: project.listedCapacity ?? "",
      sourceNote: project.sourceNote,
      coalA: project.coalA,
      emissionReduction: project.emissionreduction,
      treesPlanted: project.treesplanted,
      capacity: project.capacity,
      toDateProduction: project.todateproduct,
      consumption: project.consumption,
      timelineYear: /^\d{4}$/.test(project.completionYear ?? "")
        ? project.completionYear
        : undefined,
    }));
  }, [apiProjects]);

  if (!projects.length) {
    return (
      <main className={styles.page}>
        <SiteHeader layout={isDesktop ? "figmaCanvas" : "viewport"} />
        <p className={styles.loadStatus} role="status">
          {isPending
            ? "Loading projects…"
            : isError
              ? "Projects are temporarily unavailable."
              : "No projects are available yet."}
          {isError && (
            <button type="button" onClick={() => refetch()}>
              Try again
            </button>
          )}
        </p>
      </main>
    );
  }

  const activeIndex = currentProjectIndex % projects.length;
  const currentProject = projects[activeIndex];
  const gallery = currentProject.gallery.length
    ? currentProject.gallery
    : currentProject.image
      ? [{ url: currentProject.image, alt: currentProject.title }]
      : [];
  const selectedPhoto = gallery[photoIndex % (gallery.length || 1)];

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
    setPhotoIndex(0);
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
    setIsDashboard(false);
  };
  const openTimelineProject = (id: number) => {
    const matchingIndex = projects.findIndex((project) => project.id === id);

    if (matchingIndex >= 0) {
      setCurrentProjectIndex(matchingIndex);
    }
    setViewMode("slide");
  };

  return (
    <main
      className={`${styles.page} ${isDashboard ? styles.dashboard : ""}`}
      data-node-id={isDashboard ? "7077:8123" : "7077:7011"}
    >
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
        <InViewTimeline
          key={timelineRun}
          onExplore={openTimelineProject}
          projects={projects}
        />
      ) : (
        <section className={styles.stage} aria-label="Project portfolio">
          <motion.div
            className={styles.mainPhoto}
            animate={{
              scale: isProjectsOpen && !isDashboard ? 0.958 : 1,
            }}
            transition={springTransition}
          >
            {currentProject.image ? (
              <img
                loading="eager"
                decoding="async"
                src={
                  isDashboard
                    ? selectedPhoto?.url || currentProject.image
                    : currentProject.image
                }
                alt={
                  isDashboard
                    ? selectedPhoto?.alt || currentProject.title
                    : currentProject.title
                }
                className={styles.figmaMainPhoto}
                style={
                  isDesktop && isDashboard && selectedPhoto?.dashboardFrame
                    ? {
                        position: "absolute",
                        objectFit: "fill",
                        left: `${selectedPhoto.dashboardFrame.left}%`,
                        top: `${selectedPhoto.dashboardFrame.top}%`,
                        width: `${selectedPhoto.dashboardFrame.width}%`,
                        height: `${selectedPhoto.dashboardFrame.height}%`,
                      }
                    : undefined
                }
              />
            ) : (
              <div className={styles.photoPlaceholder}>
                Project photograph not supplied
              </div>
            )}
            <div className={styles.photoShade} />
          </motion.div>

          <div className={styles.titlePanel}>
            <h1>{currentProject.title}</h1>
            <button
              type="button"
              className={styles.dashboardButton}
              onClick={() => {
                setIsDashboard(!isDashboard);
                setIsProjectsOpen(true);
                setPhotoIndex(0);
              }}
              aria-label={
                isDashboard
                  ? "Back to project slides"
                  : "Open project dashboard"
              }
            >
              {isDashboard ? "↙" : "↗"}
            </button>
          </div>

          {!isDashboard && (
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
                top: isDesktop ? (isProjectsOpen ? 389 : 865) : 170,
                left: isDesktop
                  ? isProjectsOpen
                    ? 1006
                    : 844
                  : "calc(50% - 32px)",
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
          )}

          {isDashboard && (
            <fieldset
              className={styles.heroMetrics}
              aria-label="Project overview"
            >
              <HeroMetric
                icon="/images/projects/overview-population.png"
                label={
                  currentProject.population
                    ? "Total Population"
                    : "Project Capacity"
                }
                value={currentProject.population || currentProject.capacity}
              />
              <HeroMetric
                icon="/images/projects/overview-generation.png"
                label="Total Power Generation"
                value={currentProject.totalGeneration}
              />
              <HeroMetric
                icon="/images/projects/overview-storage.png"
                label={
                  <>
                    Total Storage
                    <br />
                    Battery Capacity
                  </>
                }
                value={currentProject.batteryStorage}
              />
            </fieldset>
          )}

          <AnimatePresence>
            {(isProjectsOpen || isDashboard) && (
              <motion.section
                className={styles.statsPanel}
                aria-label="Project performance data"
                initial={{ opacity: 0, y: 562 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 562 }}
                transition={springTransition}
              >
                <ProjectPerformance
                  project={currentProject}
                  onDetails={() => setIsFactsOpen(true)}
                />
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
          {!isDashboard && (
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
            </>
          )}

          {isDashboard && (
            <aside
              className={styles.mediaRail}
              aria-label="Project photography"
            >
              <div className={styles.galleryGrid}>
                {gallery.map((photo, index) => (
                  <button
                    key={`${photo.url}-${index}`}
                    type="button"
                    aria-label={`View project photograph ${index + 1}`}
                    aria-pressed={photoIndex === index}
                    onClick={() => setPhotoIndex(index)}
                  >
                    <img src={photo.url} alt={photo.alt} />
                  </button>
                ))}
              </div>
              {selectedPhoto && (
                <figure className={styles.galleryPreview}>
                  <img src={selectedPhoto.url} alt={selectedPhoto.alt} />
                  <figcaption>{currentProject.clientName}</figcaption>
                </figure>
              )}
              <div className={styles.dashboardNavigation}>
                <button
                  type="button"
                  onClick={() => moveProject(-1)}
                  aria-label="Previous project"
                >
                  ‹
                </button>
                <button
                  type="button"
                  onClick={() => moveProject(1)}
                  aria-label="Next project"
                >
                  ›
                </button>
              </div>
            </aside>
          )}
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
      <ProjectFacts
        project={currentProject}
        open={isFactsOpen}
        onClose={() => setIsFactsOpen(false)}
      />
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

function HeroMetric({
  icon,
  label,
  value,
}: {
  icon: string;
  label: React.ReactNode;
  value: string;
}) {
  return (
    <div className={styles.heroMetric}>
      <Image src={icon} alt="" width={110} height={110} />
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function ProjectPerformance({
  project,
  onDetails,
}: {
  project: ProjectSlide;
  onDetails: () => void;
}) {
  return (
    <div className={styles.statsInner}>
      <div className={styles.primaryStats}>
        <Stat label="No. of systems" value={project.systems} />
        <Stat label="No. of days" value={project.days} />
        <Stat label="Total Generation" value={project.totalGeneration} large />
        <fieldset className={styles.battery} aria-label="Battery storage">
          <span>
            <Image
              src="/images/projects/batteryPercentage.png"
              loading="eager"
              alt=""
              width={26}
              height={27}
            />
          </span>
          <strong>{project.batteryStorage}</strong>
        </fieldset>
      </div>
      <div className={styles.impactStats}>
        <Impact
          icon="/images/projects/coal.png"
          label="Coal avoided"
          value={project.coalA}
        />
        <Impact
          icon="/images/projects/co2.png"
          label={
            <>
              Emission
              <br />
              reduction
            </>
          }
          value={project.emissionReduction}
        />
        <Impact
          icon="/images/projects/tree.png"
          label="Trees planted"
          value={project.treesPlanted}
        />
        <Impact
          icon="/images/projects/capacity.png"
          label="Capacity"
          value={project.capacity}
        />
        <Impact
          icon="/images/projects/totalProduction.png"
          label="To date Production"
          value={project.toDateProduction}
        />
        <Impact
          icon="/images/projects/consumption.png"
          label="Consumption"
          value={project.consumption}
        />
      </div>
      <div className={styles.chartRow}>
        <fieldset
          className={styles.periods}
          aria-label="Generation history period"
        >
          {["Day", "Week", "Month", "Year"].map((period) => (
            <button
              key={period}
              type="button"
              disabled
              title="Generation history is unavailable"
            >
              {period}
            </button>
          ))}
        </fieldset>
        <div className={styles.historyEmpty}>
          <span>Generation history</span>
          <p>No generation history available</p>
          <div className={styles.historyAxes} aria-hidden="true" />
        </div>
      </div>
      <button
        className={styles.sourceDetailsButton}
        type="button"
        onClick={onDetails}
      >
        Project details <span aria-hidden="true">↗</span>
      </button>
    </div>
  );
}

function ProjectFacts({
  project,
  open,
  onClose,
}: {
  project: ProjectSlide;
  open: boolean;
  onClose: () => void;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    if (open) dialog.current?.showModal();
    else dialog.current?.close();
  }, [open]);
  return (
    <dialog
      ref={dialog}
      className={styles.factsDialog}
      aria-label="Project details"
      onCancel={onClose}
      onClose={onClose}
    >
      <header>
        <h2>{project.title}</h2>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close project details"
        >
          ×
        </button>
      </header>
      <dl className={styles.projectFacts}>
        <dt>Site name</dt>
        <dd>{project.siteName}</dd>
        <dt>Client</dt>
        <dd>{project.clientName}</dd>
        <dt>Year of completion / status</dt>
        <dd>{project.completionYear}</dd>
        <dt>Listed project capacity</dt>
        <dd>{project.listedCapacity || "Not provided"}</dd>
        <dt>Project scope</dt>
        <dd>{project.projectScope}</dd>
        {project.sourceNote && (
          <>
            <dt>Source note</dt>
            <dd>{project.sourceNote}</dd>
          </>
        )}
      </dl>
    </dialog>
  );
}

function InViewTimeline({
  onExplore,
  projects,
}: {
  onExplore: (id: number) => void;
  projects: ProjectSlide[];
}) {
  const groups = new Map<string, ProjectSlide[]>();
  for (const project of projects) {
    const year = project.completionYear || "Completion not provided";
    groups.set(year, [...(groups.get(year) ?? []), project]);
  }
  return (
    <section
      className={styles.inViewStage}
      data-step="5"
      aria-label="Project completion timeline"
    >
      <Image
        className={styles.pngMap}
        src="/images/projects/png-map-figma.png"
        alt="Papua New Guinea"
        width={1920}
        height={709}
        sizes="100vw"
      />
      <div className={styles.cmsTimelineCards}>
        {[...groups.entries()].map(([year, entries]) => (
          <article className={styles.cmsTimelineCard} key={year}>
            <h2>{year}</h2>
            <ul>
              {entries.map((project) => (
                <li key={project.id}>
                  <button type="button" onClick={() => onExplore(project.id)}>
                    {project.title}
                    <span aria-hidden="true"> ›</span>
                  </button>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
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
      <Image src={icon} alt="" width={34} height={28} loading="eager" />
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
        {image && <img loading="lazy" decoding="async" src={image} alt="" />}
      </span>

      {/* 2. Front Layer: Frosted glass blurred card */}
      <span className={styles.previewFrontCard}>
        {image && (
          <img
            loading="lazy"
            decoding="async"
            src={image}
            alt=""
            className={styles.previewFrontImg}
          />
        )}
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
