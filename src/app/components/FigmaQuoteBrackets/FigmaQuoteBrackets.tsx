import type { CSSProperties } from "react";
import styles from "./FigmaQuoteBrackets.module.css";

interface FigmaQuoteBracketsProps {
  className?: string;
  leftStyle?: CSSProperties;
  rightStyle?: CSSProperties;
  showLeft?: boolean;
  showRight?: boolean;
  leftSrc?: string;
  rightSrc?: string;
}

export default function FigmaQuoteBrackets({
  className = "",
  leftStyle,
  rightStyle,
  showLeft = true,
  showRight = true,
  leftSrc = "/images/handbook/figma-quote-left.svg",
  rightSrc = "/images/handbook/figma-quote-right.svg",
}: FigmaQuoteBracketsProps) {
  return (
    <span className={`${styles.brackets} ${className}`.trim()} aria-hidden="true">
      {showLeft ? (
        <img loading="lazy" decoding="async"
          src={leftSrc}
          alt=""
          className={styles.left}
          style={leftStyle}
        />
      ) : null}
      {showRight ? (
        <img loading="lazy" decoding="async"
          src={rightSrc}
          alt=""
          className={styles.right}
          style={rightStyle}
        />
      ) : null}
    </span>
  );
}
