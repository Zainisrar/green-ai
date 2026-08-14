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
}

/** Reusable viewport for GREEN's fixed 1920 x 970 Figma compositions. */
export default function FigmaPageCanvas({
  desktop,
  mobile,
  nodeId,
  desktopBreakpoint = 1200,
  fitCanvasHeight = false,
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

  const scale = Math.min(
    viewport.width / DESIGN_WIDTH,
    viewport.height / DESIGN_HEIGHT,
  );

  return (
    <div
      className={styles.shell}
      data-figma-page-node={nodeId}
      style={fitCanvasHeight ? { height: DESIGN_HEIGHT * scale } : undefined}
    >
      <div
        className={styles.canvas}
        data-figma-responsive="desktop"
        style={{
          top: 0,
          left: (viewport.width - DESIGN_WIDTH * scale) / 2,
          transform: `scale(${scale})`,
        }}
      >
        {desktop}
      </div>
    </div>
  );
}
