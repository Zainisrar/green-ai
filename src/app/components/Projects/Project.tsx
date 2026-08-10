"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo, useState } from "react";
import { useNavigation } from "@/app/hooks/useNavigation";
import { useNavigationState } from "@/hooks/useNavigationState";
import { useProjects } from "@/hooks/useProjects";
import Chatbot from "../Chatbot";
import Navigation from "../Navigation/Navigation";
import LetsStart from "./Modals/LetsStart";
import styles from "./Project.module.css";

const navigation = [
  { href: "/explore/welcome-to-green", label: "Explore" },
  { href: "/energy", label: "Energy" },
  {
    href: "/engineering/products/lighting-up-and-lifting-up-living-standards",
    label: "Elements",
  },
  { href: "/expertise", label: "Expertise" },
  { href: "/empower/join-us", label: "Enlist" },
  { href: "/engage/reach-us", label: "Engage" },
];

type ProjectSlide = {
  id: number;
  title: string;
  image: string;
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

const fallbackProject: ProjectSlide = {
  id: 1,
  title: "Wildlife Conservation Society 2025",
  image: "/images/projects/featuredProjectImg1.png",
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
};

const fallbackProjects = [
  fallbackProject,
  {
    ...fallbackProject,
    id: 2,
    title:
      "PNG’s First Utility-Scale Grid-Connected Solar Power Plant, 3MW, Baiyer (2025)",
    image: "/images/projects/image.png",
  },
  {
    ...fallbackProject,
    id: 3,
    title: "Mongal Health Centre 2020",
    image: "/images/projects/image2.png",
  },
];

const supplementalProjects: ProjectSlide[] = [
  {
    ...fallbackProject,
    id: -1,
    title: "Pimaga Health Centre 2023",
    image: "/images/projects/pimaga-health-centre-2023.png",
  },
];

const valueWithoutUnit = (value: string | undefined, unit: string) =>
  value?.replace(unit, "").trim() || "—";

const previewTitle = (title: string) => {
  if (title.toLowerCase().includes("baiyer")) {
    return "Baiyer Solar Plant 2025";
  }

  return title;
};

export default function Project() {
  const [isProjectsOpen, setIsProjectsOpen] = useState(true);
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
  const [isStartOpen, setIsStartOpen] = useState(false);
  const [viewMode, setViewMode] = useState<"in-view" | "slide">("in-view");
  const pathname = usePathname();
  const { isNavigationOpen, openNavigation, closeNavigation } =
    useNavigationState();
  const { navigationData, activeSection, setActiveSection, featuredChild } =
    useNavigation(isNavigationOpen, pathname);
  const { data: apiProjects } = useProjects();

  const projects = useMemo(() => {
    const liveProjects = apiProjects?.length
      ? apiProjects.map((project) => ({
          id: project.id,
          title: project.title?.trim() || fallbackProject.title,
          image: project.featuredImg || fallbackProject.image,
          systems: valueWithoutUnit(project.numberofsystems, ""),
          days: valueWithoutUnit(project.noofdays, ""),
          totalGeneration:
            project.totalgeneration || fallbackProject.totalGeneration,
          batteryPercentage: valueWithoutUnit(project.battery, "%"),
          coalA: project.coalA || fallbackProject.coalA,
          emissionReduction:
            project.emissionreduction || fallbackProject.emissionReduction,
          treesPlanted: project.treesplanted || fallbackProject.treesPlanted,
          capacity: project.capacity || fallbackProject.capacity,
          toDateProduction:
            project.todateproduct || fallbackProject.toDateProduction,
          consumption: project.consumption || fallbackProject.consumption,
          dailyGeneration:
            project.totalenergydaily || fallbackProject.dailyGeneration,
        }))
      : fallbackProjects;

    return [
      ...liveProjects,
      ...supplementalProjects.filter(
        (supplemental) =>
          !liveProjects.some(
            (project) =>
              project.title.toLowerCase() === supplemental.title.toLowerCase(),
          ),
      ),
    ];
  }, [apiProjects]);

  const activeIndex = currentProjectIndex % projects.length;
  const currentProject = projects[activeIndex];
  const previousProject =
    projects[(activeIndex - 1 + projects.length) % projects.length];
  const nextProject = projects[(activeIndex + 1) % projects.length];
  const moveProject = (amount: number) => {
    setViewMode("slide");
    setCurrentProjectIndex(
      (index) => (index + amount + projects.length) % projects.length,
    );
  };

  if (isNavigationOpen && navigationData) {
    return (
      <Navigation
        navigationData={navigationData}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        featuredChild={featuredChild}
        currentPath={pathname}
        isOpen={isNavigationOpen}
        onClose={closeNavigation}
      />
    );
  }

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <Link href="/" className={styles.logo} aria-label="GREEN home">
          <Image
            src="/images/heroSection/logo.png"
            alt="GREEN — Future: Envisioned"
            width={375}
            height={98}
            priority
          />
        </Link>
        <nav className={styles.navigation} aria-label="Primary navigation">
          {navigation.map((item) => (
            <Link href={item.href} key={item.label}>
              {item.label}
            </Link>
          ))}
          <button
            type="button"
            onClick={openNavigation}
            aria-label="Open navigation"
            className={styles.menuButton}
          >
            <Image
              src="/images/heroSection/lighting.svg"
              alt=""
              width={42}
              height={54}
            />
          </button>
        </nav>
      </header>

      <Image
        className={styles.verticalTitle}
        src="/images/projects/projects.png"
        alt="Projects"
        width={73}
        height={480}
        priority
      />

      <section className={styles.stage} aria-label="Project portfolio">
        <div className={styles.mainPhoto}>
          <img src={currentProject.image} alt={currentProject.title} />
          <div className={styles.photoShade} />
        </div>

        <div className={styles.titlePanel}>
          <h1>{currentProject.title}</h1>
        </div>

        <button
          type="button"
          className={styles.collapseButton}
          onClick={() => setIsProjectsOpen((open) => !open)}
          aria-expanded={isProjectsOpen}
          aria-label={
            isProjectsOpen
              ? "Collapse project details"
              : "Expand project details"
          }
        >
          <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
            className={isProjectsOpen ? "" : styles.rotated}
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </button>

        {isProjectsOpen && (
          <section
            className={styles.statsPanel}
            aria-label="Project performance data"
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
                <p>Total Generation daily : {currentProject.dailyGeneration}</p>
                <Image
                  src="/images/projects/graph.png"
                  alt="Daily energy generation graph"
                  width={342}
                  height={148}
                />
                <span>Today</span>
              </div>
            </div>
          </section>
        )}
      </section>

      <fieldset className={styles.viewToggle}>
        <legend className={styles.screenReaderOnly}>Project view mode</legend>
        <button
          type="button"
          className={viewMode === "in-view" ? styles.activeView : undefined}
          onClick={() => setViewMode("in-view")}
        >
          In View
        </button>
        <button
          type="button"
          className={viewMode === "slide" ? styles.activeView : undefined}
          onClick={() => setViewMode("slide")}
        >
          Slide
        </button>
      </fieldset>

      <ProjectPreview
        project={previousProject}
        direction="previous"
        onClick={() => moveProject(-1)}
      />
      <ProjectPreview
        project={nextProject}
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
      <Chatbot triggerClassName={styles.chatTrigger} />
      <LetsStart isOpen={isStartOpen} onClose={() => setIsStartOpen(false)} />
    </main>
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
  project,
  direction,
  onClick,
}: {
  project: ProjectSlide;
  direction: "previous" | "next";
  onClick: () => void;
}) {
  const isPrevious = direction === "previous";
  const label = previewTitle(project.title);

  return (
    <button
      type="button"
      className={`${styles.preview} ${isPrevious ? styles.previousPreview : styles.nextPreview}`}
      onClick={onClick}
      aria-label={`${isPrevious ? "Previous" : "Next"} project: ${label}`}
    >
      {isPrevious && (
        <span className={styles.previewArrow}>
          <Arrow direction="left" />
        </span>
      )}
      <span className={styles.previewCard}>
        <img src={project.image} alt="" />
        <span>{label}</span>
      </span>
      {!isPrevious && (
        <span className={styles.previewArrow}>
          <Arrow direction="right" />
        </span>
      )}
    </button>
  );
}
