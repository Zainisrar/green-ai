"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import type { ProjectPhotograph } from "@/hooks/useProjects";
import styles from "./Project.module.css";
import { preloadProjectPhoto, projectPhotoTransition } from "./projectMotion";

export default function ProjectPhoto({
  photo,
  framed = false,
  className = "",
}: {
  photo?: ProjectPhotograph;
  framed?: boolean;
  className?: string;
}) {
  const [loaded, setLoaded] = useState<ProjectPhotograph>();
  const [failed, setFailed] = useState(false);
  const reducedMotion = useReducedMotion();
  const requestedPhoto = useRef(photo);
  const url = photo?.url;
  useEffect(() => {
    requestedPhoto.current = photo;
  }, [photo]);
  useEffect(() => {
    if (!url) {
      setLoaded(undefined);
      return;
    }
    let cancelled = false;
    setFailed(false);
    void preloadProjectPhoto(url)
      .then(() => {
        if (!cancelled) setLoaded(requestedPhoto.current);
      })
      .catch(() => {
        if (!cancelled) setFailed(true);
      });
    return () => {
      cancelled = true;
    };
  }, [url]);
  const visible = loaded?.url === photo?.url ? photo : loaded;
  const frame = framed ? visible?.dashboardFrame : undefined;
  const target = {
    left: `${frame?.left ?? 0}%`,
    top: `${frame?.top ?? 0}%`,
    width: `${frame?.width ?? 100}%`,
    height: `${frame?.height ?? 100}%`,
  };
  return (
    <div
      className={`${styles.photoLayers} ${className}`}
      data-project-photo
      data-photo-ready={Boolean(visible)}
      aria-busy={Boolean(photo?.url && loaded?.url !== photo.url && !failed)}
    >
      <AnimatePresence initial={false}>
        {visible && (
          <motion.img
            key={visible.url}
            src={visible.url}
            alt={visible.alt}
            loading="eager"
            decoding="async"
            className={styles.figmaMainPhoto}
            initial={{ opacity: 0, ...target }}
            animate={{ opacity: 1, ...target }}
            exit={{ opacity: 0 }}
            transition={
              reducedMotion ? { duration: 0 } : projectPhotoTransition
            }
            style={{
              position: "absolute",
              objectFit: frame ? "fill" : "cover",
              maxWidth: "none",
            }}
          />
        )}
      </AnimatePresence>
      {!visible && (
        <div className={styles.photoPlaceholder}>
          {!photo?.url
            ? "Project photograph not supplied"
            : failed
              ? "Project photograph unavailable"
              : "Loading photograph…"}
        </div>
      )}
    </div>
  );
}
