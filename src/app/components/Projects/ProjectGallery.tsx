"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ProjectPhotograph } from "@/hooks/useProjects";
import styles from "./Project.module.css";
import ProjectPhoto from "./ProjectPhoto";
import { projectDissolve } from "./projectMotion";

export default function ProjectGallery({
  photos,
  selectedIndex,
  onSelect,
  playing,
  onTogglePlaying,
}: {
  photos: ProjectPhotograph[];
  selectedIndex: number;
  onSelect: (index: number) => void;
  playing: boolean;
  onTogglePlaying: () => void;
}) {
  const reducedMotion = useReducedMotion();
  const index = selectedIndex % (photos.length || 1);
  const selected = photos[index];
  const canNavigate = photos.length > 1;

  if (!selected) return null;

  return (
    <motion.aside
      className={styles.mediaRail}
      aria-label="Project photography"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={reducedMotion ? { duration: 0 } : projectDissolve}
    >
      <div className={styles.galleryGrid}>
        {photos.map((photo, photoIndex) => (
          <button
            key={`${photo.url}-${photoIndex}`}
            type="button"
            aria-label={`View project photograph ${photoIndex + 1}`}
            aria-pressed={index === photoIndex}
            onClick={() => onSelect(photoIndex)}
          >
            <img src={photo.url} alt={photo.alt} />
            {index === photoIndex && (
              <svg
                className={styles.thumbnailBorder}
                viewBox="0 0 154.5 94"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <path
                  d="M49.44 1H153L104.4 93H1.5Z"
                  fill="none"
                  stroke="#23b14d"
                  strokeWidth="2"
                />
              </svg>
            )}
          </button>
        ))}
      </div>
      <figure className={styles.galleryPreview}>
        <ProjectPhoto photo={selected} />
        {canNavigate && (
          <>
            <button
              className={styles.galleryPlayOverlay}
              type="button"
              aria-label={
                playing
                  ? "Pause project photographs"
                  : "Play project photographs"
              }
              onClick={onTogglePlaying}
            >
              <PlaybackIcon kind={playing ? "pause" : "play"} />
            </button>
            <input
              className={styles.galleryProgress}
              aria-label="Selected project photograph"
              type="range"
              min={0}
              max={photos.length - 1}
              step={1}
              value={index}
              onChange={(event) => onSelect(Number(event.target.value))}
            />
          </>
        )}
      </figure>
      {canNavigate && (
        <nav
          className={styles.dashboardNavigation}
          aria-label="Photograph playback"
        >
          <button
            type="button"
            aria-label="Previous photograph"
            onClick={() =>
              onSelect((index - 1 + photos.length) % photos.length)
            }
          >
            <PlaybackIcon kind="previous" />
          </button>
          <button
            type="button"
            aria-label={playing ? "Pause slideshow" : "Play slideshow"}
            aria-pressed={playing}
            onClick={onTogglePlaying}
          >
            <PlaybackIcon kind={playing ? "pause" : "play"} />
          </button>
          <button
            type="button"
            aria-label="Next photograph"
            onClick={() => onSelect((index + 1) % photos.length)}
          >
            <PlaybackIcon kind="next" />
          </button>
        </nav>
      )}
    </motion.aside>
  );
}

function PlaybackIcon({
  kind,
}: {
  kind: "previous" | "next" | "play" | "pause";
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {kind === "play" && <path d="m7 3 14 9-14 9Z" />}
      {kind === "pause" && <path d="M7 4v16M17 4v16" />}
      {kind === "previous" && <path d="M4 4v16m16-16L7 12l13 8Z" />}
      {kind === "next" && <path d="M20 4v16M4 4l13 8-13 8Z" />}
    </svg>
  );
}
