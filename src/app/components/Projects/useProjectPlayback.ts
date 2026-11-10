"use client";

import { useReducedMotion } from "motion/react";
import { useEffect, useMemo, useState } from "react";
import type {
  ProjectMotionFrame,
  ProjectPhotograph,
} from "@/hooks/useProjects";
import {
  preloadProjectPhoto,
  projectPhotoHoldMs,
  projectPhotoTransitionMs,
} from "./projectMotion";

interface PlaybackProject {
  id: number;
  title: string;
  image: string;
  gallery: ProjectPhotograph[];
  dashboardSequence?: ProjectMotionFrame[];
}

export default function useProjectPlayback(
  project: PlaybackProject | undefined,
  enabled: boolean,
) {
  const reducedMotion = useReducedMotion();
  const [playing, setPlaying] = useState(false);
  const [choice, setChoice] = useState({
    step: 0,
    photoIndex: 0,
    manual: false,
    initial: true,
  });
  const [pageVisible, setPageVisible] = useState(true);
  const [readySequence, setReadySequence] = useState<string>();
  const photos = useMemo(
    () =>
      project?.gallery.length
        ? project.gallery
        : project?.image
          ? [{ url: project.image, alt: project.title }]
          : [],
    [project],
  );
  const sequence = useMemo(() => {
    const supplied = project?.dashboardSequence?.filter(
      (frame) =>
        frame.url &&
        Number.isInteger(frame.photoIndex) &&
        frame.photoIndex >= 0 &&
        frame.photoIndex < photos.length,
    );
    return supplied?.length
      ? supplied
      : photos.map((photo, photoIndex) => ({ ...photo, photoIndex }));
  }, [project, photos]);
  const sequenceKey = sequence.map((frame) => frame.url).join("|");
  const step = choice.step % (sequence.length || 1);
  const selectedIndex = choice.manual
    ? choice.photoIndex % (photos.length || 1)
    : (sequence[step]?.photoIndex ?? 0);
  const photo = choice.manual ? photos[selectedIndex] : sequence[step];

  const projectId = project?.id;
  useEffect(() => {
    if (projectId === undefined) return;
    setChoice({ step: 0, photoIndex: 0, manual: false, initial: true });
    setPlaying(enabled && !reducedMotion);
  }, [enabled, projectId, reducedMotion]);

  useEffect(() => {
    const update = () => setPageVisible(document.visibilityState !== "hidden");
    update();
    document.addEventListener("visibilitychange", update);
    return () => document.removeEventListener("visibilitychange", update);
  }, []);

  useEffect(() => {
    if (projectId === undefined) return;
    let cancelled = false;
    void Promise.all(sequence.map((item) => preloadProjectPhoto(item.url)))
      .then(() => {
        if (!cancelled) setReadySequence(sequenceKey);
      })
      .catch(() => {
        if (!cancelled) setPlaying(false);
      });
    return () => {
      cancelled = true;
    };
  }, [projectId, sequence, sequenceKey]);

  useEffect(() => {
    if (
      !enabled ||
      !playing ||
      !pageVisible ||
      sequence.length < 2 ||
      !photo ||
      readySequence !== sequenceKey
    )
      return;
    let cancelled = false;
    let timer: ReturnType<typeof setTimeout> | undefined;
    void preloadProjectPhoto(photo.url)
      .then(() => {
        if (cancelled) return;
        timer = setTimeout(
          () => {
            const followingManual = sequence.findIndex(
              (frame) => frame.photoIndex > selectedIndex,
            );
            const nextStep = choice.manual
              ? Math.max(0, followingManual)
              : (step + 1) % sequence.length;
            void preloadProjectPhoto(sequence[nextStep].url)
              .then(() => {
                if (!cancelled)
                  setChoice({
                    step: nextStep,
                    photoIndex: sequence[nextStep].photoIndex,
                    manual: false,
                    initial: false,
                  });
              })
              .catch(() => {
                if (!cancelled) setPlaying(false);
              });
          },
          projectPhotoHoldMs + (choice.initial ? 0 : projectPhotoTransitionMs),
        );
      })
      .catch(() => {
        if (!cancelled) setPlaying(false);
      });
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [
    enabled,
    playing,
    pageVisible,
    sequence,
    step,
    photo,
    choice.initial,
    choice.manual,
    selectedIndex,
    readySequence,
    sequenceKey,
  ]);

  const selectPhoto = (index: number) => {
    setPlaying(false);
    setChoice({ step: 0, photoIndex: index, manual: true, initial: false });
  };
  const togglePlaying = () => {
    if (!playing && choice.manual) {
      const matchingStep = sequence.findIndex(
        (frame) => frame.photoIndex === selectedIndex,
      );
      setChoice({
        step: Math.max(0, matchingStep),
        photoIndex: selectedIndex,
        manual: matchingStep < 0,
        initial: true,
      });
    }
    setPlaying((value) => !value);
  };
  return {
    ready: readySequence === sequenceKey,
    photos,
    photo,
    selectedIndex,
    step,
    playing: playing && sequence.length > 1,
    selectPhoto,
    togglePlaying,
    reducedMotion: Boolean(reducedMotion),
  };
}
