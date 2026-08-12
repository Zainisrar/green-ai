import Link from "next/link";
import styles from "./FigmaBrandPanel.module.css";

interface FigmaBrandPanelProps {
  className?: string;
  compactLogo?: boolean;
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
  showPanel = true,
}: FigmaBrandPanelProps) {
  return (
    <div
      className={`${styles.panel} ${className}`.trim()}
      data-node-id="7077:3753"
    >
      {showPanel ? (
        <div className={styles.rectangle} data-node-id="7077:3754">
          <img
            src={`${ASSET_ROOT}/rectangle.svg`}
            alt=""
            width="394"
            height="590.5"
          />
        </div>
      ) : null}

      <Link
        href="/"
        className={`${styles.logo} ${compactLogo ? styles.compactLogo : ""}`}
        aria-label="GREEN home"
        data-node-id="7077:3755"
      >
        <img
          src={`${ASSET_ROOT}/logo.png`}
          alt="GREEN — Future: Envisioned"
          width="255"
          height="67"
        />
      </Link>
    </div>
  );
}
