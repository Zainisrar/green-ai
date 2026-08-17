"use client";

import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import styles from "./FigmaAngledCta.module.css";

interface FigmaAngledCtaProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
  children: ReactNode;
  className?: string;
  showArrow?: boolean;
  icon?: "chevron" | "download";
  href?: string;
}

/** Shared slanted Figma CTA window used across GREEN desktop compositions (Vector 7368). */
export default function FigmaAngledCta({
  children,
  className = "",
  showArrow = true,
  icon = "chevron",
  href,
  type = "button",
  ...props
}: FigmaAngledCtaProps) {
  const content = (
    <>
      <span>{children}</span>
      {showArrow ? (
        icon === "download" ? (
          <svg
            className={styles.arrow}
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              d="M8 2V11M8 11L4.5 7.5M8 11L11.5 7.5M2.5 14H13.5"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        ) : (
          <svg
            className={styles.arrow}
            width="11"
            height="18"
            viewBox="0 0 11 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              d="M1.5 1.5L9 9L1.5 16.5"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )
      ) : null}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={`${styles.cta} ${className}`.trim()}>
        {content}
      </Link>
    );
  }

  return (
    <button
      {...props}
      className={`${styles.cta} ${className}`.trim()}
      type={type}
    >
      {content}
    </button>
  );
}
