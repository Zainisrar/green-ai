"use client";

import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import styles from "./FigmaPageCanvas.module.css";

const DESIGN_WIDTH = 1920;
const DESIGN_HEIGHT = 970;

interface FigmaPageCanvasProps {
  desktop: ReactNode;
  mobile: ReactNode;
  nodeId: string;
  desktopBreakpoint?: number;
  fitCanvasHeight?: boolean;
  /** Height of the source Figma frame. Most screens are 1920 x 970. */
  designHeight?: number;
  /** Long Figma pages should preserve the 1920px design width and scroll. */
  scaleToViewport?: "contain" | "width";
}

/** Reusable viewport for GREEN's fixed 1920 x 970 Figma compositions. */
export default function FigmaPageCanvas({
  desktop,
  mobile,
  nodeId,
  desktopBreakpoint = 1200,
  fitCanvasHeight = false,
  designHeight = DESIGN_HEIGHT,
  scaleToViewport = "width",
}: FigmaPageCanvasProps) {
  const [viewport, setViewport] = useState({
    width: DESIGN_WIDTH,
    height: DESIGN_HEIGHT,
  });

  useEffect(() => {
    const updateViewport = () =>
      setViewport({ width: window.innerWidth, height: window.innerHeight });

    updateViewport();
    window.addEventListener("resize", updateViewport);
    return () => window.removeEventListener("resize", updateViewport);
  }, []);

  if (viewport.width <= desktopBreakpoint) {
    return (
      <div className={styles.mobile} data-figma-responsive="mobile">
        {mobile}
      </div>
    );
  }

  const scale =
    scaleToViewport === "width"
      ? viewport.width / DESIGN_WIDTH
      : Math.min(viewport.width / DESIGN_WIDTH, viewport.height / designHeight);

  // The shell always fills the full viewport (100svh). The canvas scales to
  // fit inside. This prevents the white-space gap below on narrower screens.
  return (
    <div
      className={styles.shell}
      data-figma-page-node={nodeId}
    >
      <div
        className={styles.canvas}
        data-figma-responsive="desktop"
        style={{
          top: 0,
          left: (viewport.width - DESIGN_WIDTH * scale) / 2,
          height: designHeight,
          transform: `scale(${scale})`,
        }}
      >
        {desktop}
      </div>
    </div>
  );
}
