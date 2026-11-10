"use client";

import Link from "next/link";
import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  CSSProperties,
  ReactNode,
} from "react";
import { useId, useLayoutEffect, useRef, useState } from "react";
import styles from "./FigmaAngledCta.module.css";

interface FigmaAngledCtaProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  showArrow?: boolean;
  arrowDirection?: "left" | "right";
  icon?: "chevron" | "download" | "upload";
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
    typeof children === "string" && children.trim().toLowerCase() === "explore";
  const isSmall =
    size === "sm" || (size !== "lg" && size !== "md" && isExplore);

  const rootRef = useRef<HTMLButtonElement | HTMLAnchorElement | null>(null);
  const gradientId = `cta-outline-${useId().replace(/:/g, "")}`;
  const [outline, setOutline] = useState({ width: 178, height: 52, slant: 23 });
  // biome-ignore lint/correctness/useExhaustiveDependencies: Rebind measurement if the link/button element or size variant changes.
  useLayoutEffect(() => {
    const element = rootRef.current;
    if (!element) return;
    const update = () => {
      const css = getComputedStyle(element);
      const width = parseFloat(css.width) || element.offsetWidth;
      const height = parseFloat(css.height) || element.offsetHeight;
      if (!width || !height) return;
      const slant = Math.min(
        width * 0.45,
        parseFloat(css.getPropertyValue("--figma-cta-slant")) || 23,
      );
      setOutline((previous) =>
        previous.width === width &&
        previous.height === height &&
        previous.slant === slant
          ? previous
          : { width, height, slant },
      );
    };
    update();
    const observer = new ResizeObserver(update);
    observer.observe(element);
    window.addEventListener("resize", update);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", update);
    };
  }, [href, isSmall]);

  const chevronSvg =
    isExplore && icon === "chevron" ? (
      <svg
        className={`${isSmall ? styles.smallArrow : styles.arrow} ${arrowDirection === "left" ? styles.arrowLeft : ""}`}
        viewBox="0 0 20 20"
        fill="none"
        aria-hidden="true"
      >
        <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.2" />
        <path
          d="m8 6 4 4-4 4"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ) : isSmall ? (
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

  const uploadSvg = (
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
        d="M9 13V3M5 7L9 3L13 7M3 12V16H15V12"
        stroke="currentColor"
        strokeWidth={isSmall ? "1.5" : "1.8"}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  const content = (
    <>
      <svg
        className={styles.outline}
        viewBox={`0 0 ${outline.width} ${outline.height}`}
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop stopColor="#23b14d" />
            <stop offset="1" stopColor="#fffe50" />
          </linearGradient>
        </defs>
        <path
          d={`M${outline.slant + 0.5} .5H${outline.width - 0.5}L${outline.width - outline.slant - 0.5} ${outline.height - 0.5}H.5Z`}
          fill="none"
          stroke={`url(#${gradientId})`}
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
          style={{
            fill: "none",
            stroke: `url(#${gradientId})`,
            strokeWidth: 1,
          }}
        />
      </svg>
      <span
        className={`${styles.inner} ${isSmall ? styles.innerSmall : ""}`.trim()}
      >
        <span className={styles.label}>{children}</span>
        {showArrow
          ? icon === "download"
            ? downloadSvg
            : icon === "upload"
              ? uploadSvg
              : chevronSvg
          : null}
      </span>
    </>
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

  const rootClassName =
    `${styles.cta} ${isSmall ? styles.ctaSmall : ""} ${isExplore ? styles.exploreCta : ""} ${className}`.trim();

  if (href) {
    const {
      type: _type,
      style: _style,
      ...anchorProps
    } = props as AnchorHTMLAttributes<HTMLAnchorElement>;
    void _type;
    void _style;
    return (
      <Link
        href={href}
        ref={(node) => {
          rootRef.current = node;
        }}
        data-figma-cta
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
      ref={(node) => {
        rootRef.current = node;
      }}
      data-figma-cta
      className={rootClassName}
      style={mergedStyle}
      type={type}
    >
      {content}
    </button>
  );
}
