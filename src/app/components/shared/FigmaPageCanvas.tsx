"use client";

import type { ReactNode } from "react";
import { useLayoutEffect, useState } from "react";
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
  scaleToViewport?: "contain" | "width" | "fill";
  /** Scale a desktop-only Figma frame down on narrow screens instead of clipping it. */
  scaleMobileToViewport?: boolean;
}

/** Reusable viewport for GREEN's fixed 1920 x 970 Figma compositions. */
export default function FigmaPageCanvas({
  desktop,
  mobile,
  nodeId,
  desktopBreakpoint = 1023,
  fitCanvasHeight = false,
  designHeight = DESIGN_HEIGHT,
  scaleToViewport = "fill",
  scaleMobileToViewport = false,
}: FigmaPageCanvasProps) {
  // Initialize with 0 so the SSR pass emits nothing (no viewport width is known
  // server-side). useLayoutEffect fires synchronously before paint in the browser,
  // so the correct desktop/mobile branch is rendered before the first visible frame.
  // This prevents the brief flash of 1920px desktop canvas on mobile devices.
  const [viewport, setViewport] = useState({ width: 0, height: 0 });

  useLayoutEffect(() => {
    const updateViewport = () =>
      setViewport({
        // clientWidth excludes the reserved Windows scrollbar gutter. Using
        // innerWidth here made a scaled 1920px canvas a few pixels wider than
        // the document, which showed as a horizontal sliver or clipped edge.
        width:
          typeof window !== "undefined" && window.innerWidth
            ? Math.min(
                window.innerWidth,
                document.documentElement.clientWidth || window.innerWidth,
              )
            : document.documentElement.clientWidth,
        height: window.innerHeight,
      });

    updateViewport();
    window.addEventListener("resize", updateViewport);
    return () => window.removeEventListener("resize", updateViewport);
  }, []);

  // SSR pass: Emit both desktop and mobile trees with responsive CSS visibility.
  // This ensures search engine crawlers and users receive full HTML immediately,
  // before JavaScript executes, without layout flash or hydration mismatch.
  if (viewport.width === 0) {
    return (
      <div
        className={`${styles.ssrWrapper} ${desktopBreakpoint === 1200 ? styles.ssrBreak1200 : ""}`}
        data-figma-page-node={nodeId}
        data-ssr="true"
      >
        <div className={styles.ssrDesktop}>{desktop}</div>
        <div className={styles.ssrMobile}>{mobile}</div>
      </div>
    );
  }

  if (viewport.width <= desktopBreakpoint) {
    if (scaleMobileToViewport) {
      const mobileScale = viewport.width / DESIGN_WIDTH;

      return (
        <div
          className={`${styles.shell} ${styles.shellScrollable}`}
          data-figma-page-node={nodeId}
        >
          <div
            className={styles.canvasSizer}
            aria-hidden="true"
            style={{ height: designHeight * mobileScale }}
          />
          <div
            className={styles.canvas}
            data-figma-responsive="mobile"
            style={{
              top: 0,
              left: 0,
              height: designHeight,
              transform: `scale(${mobileScale})`,
            }}
          >
            {mobile}
          </div>
        </div>
      );
    }

    return (
      <div className={styles.mobile} data-figma-responsive="mobile">
        {mobile}
      </div>
    );
  }

  // Scrollable width-fitting mode for long multi-section Figma pages
  if (scaleToViewport === "width" && !fitCanvasHeight) {
    const scale = viewport.width / DESIGN_WIDTH;
    return (
      <div
        className={`${styles.shell} ${styles.shellScrollable}`}
        data-figma-page-node={nodeId}
      >
        <div
          className={styles.canvasSizer}
          aria-hidden="true"
          style={{ height: designHeight * scale }}
        />
        <div
          className={styles.canvas}
          data-figma-responsive="desktop"
          style={{
            top: 0,
            left: 0,
            height: designHeight,
            transform: `scale(${scale})`,
          }}
        >
          {desktop}
        </div>
      </div>
    );
  }

  if (scaleToViewport === "contain") {
    const scale = Math.min(
      viewport.width / DESIGN_WIDTH,
      viewport.height / designHeight,
    );
    return (
      <div className={styles.shell} data-figma-page-node={nodeId}>
        <div
          className={styles.canvas}
          data-figma-responsive="desktop"
          style={{
            top: "50%",
            left: "50%",
            height: designHeight,
            transform: `translate(-50%, -50%) scale(${scale})`,
          }}
        >
          {desktop}
        </div>
      </div>
    );
  }

  // Default full-viewport mode ("fill"):
  // Scales 100vw x 100vh so 13", 15", and widescreen monitors have 0px side white space,
  // 0px bottom content clipping, and 0px unwanted vertical scrollbars.
  const scaleX = viewport.width / DESIGN_WIDTH;
  const scaleY = viewport.height / designHeight;

  return (
    <div className={styles.shell} data-figma-page-node={nodeId}>
      <div
        className={styles.canvas}
        data-figma-responsive="desktop"
        style={{
          top: 0,
          left: 0,
          height: designHeight,
          transform: `scale(${scaleX}, ${scaleY})`,
        }}
      >
        {desktop}
      </div>
    </div>
  );
}
