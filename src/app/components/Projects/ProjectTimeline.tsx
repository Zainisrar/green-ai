"use client";

import { motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import FigmaAngledCta from "../FigmaAngledCta/FigmaAngledCta";
import styles from "./Project.module.css";
import { projectDissolve, projectLayoutSpring } from "./projectMotion";

// Positions from the seven callouts in the Figma map composition.
const calloutPositions = [
  "card2010",
  "card2011",
  "card2012",
  "card2007",
  "card2020",
  "card2024",
  "card2023",
] as const;

interface TimelineProject {
  id: number;
  title: string;
  clientName: string;
  completionYear: string;
}

export default function ProjectTimeline({
  projects,
  onExplore,
  desktop,
}: {
  projects: TimelineProject[];
  onExplore: (id: number) => void;
  desktop: boolean;
}) {
  const [phase, setPhase] = useState(1);
  const reducedMotion = useReducedMotion();
  // Figma's map frames wait 200 ms between 2.083538-second smart animations.
  useEffect(() => {
    if (reducedMotion || !desktop) {
      setPhase(5);
      return;
    }
    setPhase(1);
    const timers = [2, 3, 4, 5].map((next) =>
      setTimeout(() => setPhase(next), 200 + (next - 2) * (2083.538 + 200)),
    );
    return () => timers.forEach(clearTimeout);
  }, [reducedMotion, desktop]);
  const visible = projects.slice(0, calloutPositions.length);

  return (
    <section
      className={`${styles.inViewStage} ${styles.cmsMapTimeline}`}
      aria-label="Project completion timeline"
      data-animation-phase={reducedMotion || !desktop ? 5 : phase}
    >
      <motion.div
        className={styles.mapScene}
        initial={reducedMotion ? false : { opacity: 0, x: 0, y: 0 }}
        animate={{ opacity: 1, x: desktop ? -49 : 0, y: desktop ? 36 : 0 }}
        transition={
          reducedMotion
            ? { duration: 0 }
            : desktop
              ? projectLayoutSpring
              : projectDissolve
        }
      >
        <Image
          className={styles.pngMap}
          src="/images/projects/png-map-figma.png"
          alt="Papua New Guinea"
          width={1920}
          height={709}
          sizes="100vw"
          priority
        />
        <div className={styles.mapCallouts}>
          {visible.map((project, index) => {
            const revealed =
              reducedMotion ||
              !desktop ||
              phase >= [2, 2, 3, 1, 4, 5, 5][index];
            return (
              <motion.article
                className={`${styles.timelineCard} ${styles[calloutPositions[index]]} ${styles.isVisible}`}
                key={project.id}
                initial={
                  reducedMotion
                    ? false
                    : { opacity: 0, x: 18, y: -9, scale: 0.975 }
                }
                animate={
                  revealed
                    ? { opacity: 1, x: 0, y: 0, scale: 1 }
                    : { opacity: 0, x: 18, y: -9, scale: 0.975 }
                }
                transition={
                  reducedMotion
                    ? { duration: 0 }
                    : desktop
                      ? { duration: 2.083538, ease: [0.77, 0, 0.175, 1] }
                      : projectDissolve
                }
                aria-hidden={!revealed}
                inert={!revealed}
              >
                <div className={styles.timelineCopy}>
                  <h2>
                    {project.completionYear && <>{project.completionYear} – </>}
                    {project.title}
                  </h2>
                  <p>{project.clientName}</p>
                </div>
                <FigmaAngledCta
                  size="sm"
                  className={styles.mapExploreButton}
                  aria-label={`Explore ${project.title}`}
                  onClick={() => onExplore(project.id)}
                >
                  Explore
                </FigmaAngledCta>
              </motion.article>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}
