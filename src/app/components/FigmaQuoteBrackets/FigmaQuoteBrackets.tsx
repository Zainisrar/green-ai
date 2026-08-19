import type { CSSProperties } from "react";
import styles from "./FigmaQuoteBrackets.module.css";

interface FigmaQuoteBracketsProps {
  className?: string;
  leftStyle?: CSSProperties;
  rightStyle?: CSSProperties;
  showLeft?: boolean;
  showRight?: boolean;
}

export default function FigmaQuoteBrackets({
  className = "",
  leftStyle,
  rightStyle,
  showLeft = true,
  showRight = true,
}: FigmaQuoteBracketsProps) {
  return (
    <span className={`${styles.brackets} ${className}`.trim()} aria-hidden="true">
      {showLeft ? (
        <img
          src="/images/handbook/figma-quote-left.svg"
          alt=""
          className={styles.left}
          style={leftStyle}
        />
      ) : null}
      {showRight ? (
        <img
          src="/images/handbook/figma-quote-right.svg"
          alt=""
          className={styles.right}
          style={rightStyle}
        />
      ) : null}
    </span>
  );
}
