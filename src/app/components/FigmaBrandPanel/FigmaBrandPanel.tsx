import Link from "next/link";
import styles from "./FigmaBrandPanel.module.css";

interface FigmaBrandPanelProps {
  className?: string;
  compactLogo?: boolean;
  fixedCanvasSize?: boolean;
  variant?: "default" | "flagship" | "project";
  showPanel?: boolean;
}

const ASSET_ROOT = "/images/shared/figma-brand-panel";

/**
 * Shared Figma brand lockup used by the 1920px desktop canvases.
 * The artwork keeps the source node's shadow bleed separate from its bounds.
 */
export default function FigmaBrandPanel({
  className = "",
  compactLogo = false,
  fixedCanvasSize = false,
  variant = "default",
  showPanel = true,
}: FigmaBrandPanelProps) {
  return (
    <div
      className={`${styles.panel} ${fixedCanvasSize ? styles.fixedCanvasPanel : ""} ${variant === "flagship" ? styles.flagshipPanel : variant === "project" ? styles.projectPanel : ""} ${className}`.trim()}
      data-node-id={variant === "project" ? "7077:8274" : "7077:3753"}
    >
      {showPanel ? (
        <div
          className={styles.rectangle}
          data-node-id={variant === "project" ? "7077:8275" : "7077:3754"}
        >
          <img
            loading="lazy"
            decoding="async"
            src={
              variant === "project"
                ? "/images/projects/brand-panel-figma.svg"
                : `${ASSET_ROOT}/rectangle.svg`
            }
            alt=""
            width="394"
            height="590.5"
          />
        </div>
      ) : null}

      <Link
        href="/home/renewable-energy-the-core"
        className={`${styles.logo} ${compactLogo ? styles.compactLogo : ""}`}
        aria-label="GREEN home"
        data-node-id={variant === "project" ? "7077:8276" : "7077:3755"}
      >
        <img
          loading="lazy"
          decoding="async"
          src={`${ASSET_ROOT}/logo.png`}
          alt="GREEN — Future: Envisioned"
          width="255"
          height="67"
        />
      </Link>
    </div>
  );
}
