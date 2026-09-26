"use client";

import Link from "next/link";
import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  CSSProperties,
  ReactNode,
} from "react";
import styles from "./FigmaAngledCta.module.css";

interface FigmaAngledCtaProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  showArrow?: boolean;
  arrowDirection?: "left" | "right";
  icon?: "chevron" | "download";
  size?: "sm" | "md" | "lg";
  href?: string;
  download?: string | boolean;
  target?: string;
  rel?: string;
}

/** Shared slanted Figma CTA window used across GREEN desktop compositions (Vector 7368). */
export default function FigmaAngledCta({
  children,
  className = "",
  showArrow = true,
  arrowDirection = "right",
  icon = "chevron",
  size = "md",
  href,
  type = "button",
  ...props
}: FigmaAngledCtaProps) {
  const isExplore =
    typeof children === "string" &&
    children.trim().toLowerCase() === "explore";
  const isSmall = size === "sm" || (size !== "lg" && size !== "md" && isExplore);

  const chevronSvg = isSmall ? (
    <svg
      className={`${styles.smallArrow} ${arrowDirection === "left" ? styles.arrowLeft : ""}`}
      width="7"
      height="12"
      viewBox="0 0 8 13"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M1.5 1.5L6.5 6.5L1.5 11.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ) : (
    <svg
      className={`${styles.arrow} ${arrowDirection === "left" ? styles.arrowLeft : ""}`}
      width="9"
      height="15"
      viewBox="0 0 10 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M1.5 1.5L8 8L1.5 14.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  const downloadSvg = (
    <svg
      className={styles.downloadIcon}
      width={isSmall ? "14" : "18"}
      height={isSmall ? "14" : "18"}
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M9 2.5V11M5.5 7.5L9 11L12.5 7.5M3 11.5V15.5H15V11.5"
        stroke="currentColor"
        strokeWidth={isSmall ? "1.5" : "1.8"}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  const content = (
    <span
      className={`${styles.inner} ${isSmall ? styles.innerSmall : ""}`.trim()}
    >
      <span className={styles.label}>{children}</span>
      {showArrow ? (icon === "download" ? downloadSvg : chevronSvg) : null}
    </span>
  );

  const mergedStyle = {
    ...(props.style?.top !== undefined ||
    props.style?.bottom !== undefined ||
    props.style?.left !== undefined ||
    props.style?.right !== undefined
      ? { position: "absolute" as const }
      : {}),
    ...props.style,
  };

  const rootClassName = `${styles.cta} ${isSmall ? styles.ctaSmall : ""} ${className}`.trim();

  if (href) {
    const { type: _type, style: _style, ...anchorProps } =
      props as AnchorHTMLAttributes<HTMLAnchorElement>;
    void _type;
    void _style;
    return (
      <Link
        href={href}
        className={rootClassName}
        style={mergedStyle}
        {...anchorProps}
      >
        {content}
      </Link>
    );
  }

  const { style: _style, ...buttonProps } = props;
  void _style;

  return (
    <button
      {...buttonProps}
      className={rootClassName}
      style={mergedStyle}
      type={type}
    >
      {content}
    </button>
  );
}
