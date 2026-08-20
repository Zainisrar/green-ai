"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { NavigationItem, NavigationText } from "../../hooks/useNavigation";
import styles from "./Navigation.module.css";

interface Props {
  onClose: () => void;
  navigationData: NavigationItem[];
  activeSection: NavigationItem | null;
  setActiveSection: (section: NavigationItem) => void;
  featuredChild: {
    image?: { src: string; alt: string };
    text?: NavigationText;
  } | null;
  currentPath?: string;
}

export default function Navigation({
  onClose,
  navigationData,
  activeSection,
  setActiveSection,
  featuredChild,
  currentPath,
}: Props) {
  const [selectedParent, setSelectedParent] = useState<NavigationItem | null>(
    null,
  );
  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) =>
      event.key === "Escape" && onClose();
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [onClose]);

  const quote =
    featuredChild?.text?.description ||
    "Explore our comprehensive solutions and services";
  const highlight = featuredChild?.text?.highlighted;
  const visibleItems =
    selectedParent?.children ?? activeSection?.children ?? [];
  const isCurrent = (item: NavigationItem) =>
    currentPath === item.slug ||
    Boolean(item.slug && currentPath?.startsWith(`${item.slug}/`));

  return (
    <div
      className={styles.overlay}
      role="dialog"
      aria-modal="true"
      aria-label="Site navigation"
    >
      <button
        className={styles.backdrop}
        type="button"
        onClick={onClose}
        aria-label="Close navigation"
      />
      <aside className={styles.drawer}>
        <button
          className={styles.close}
          type="button"
          onClick={onClose}
          aria-label="Close navigation"
        >
          <span />
          <span />
        </button>
        <div className={styles.content}>
          <div className={styles.feature}>
            {featuredChild?.image ? (
              <img
                src={featuredChild.image.src}
                alt={featuredChild.image.alt}
              />
            ) : null}
          </div>
          <div className={styles.subNavigation}>
            {selectedParent ? (
              <button
                className={styles.back}
                type="button"
                onClick={() => setSelectedParent(null)}
              >
                ‹ {activeSection?.name}
              </button>
            ) : null}
            {visibleItems.map((item) =>
              item.children?.length ? (
                <button
                  key={item.id}
                  type="button"
                  className={isCurrent(item) ? styles.activeItem : undefined}
                  onClick={() => setSelectedParent(item)}
                >
                  {item.name}
                </button>
              ) : (
                <Link
                  key={item.id}
                  href={item.slug}
                  className={isCurrent(item) ? styles.activeItem : undefined}
                  onClick={onClose}
                >
                  {item.name}
                </Link>
              ),
            )}
          </div>
          <blockquote className={styles.quote}>
            “
            {highlight && quote.includes(highlight) ? (
              <>
                {quote.split(highlight)[0]}
                <em>{highlight}</em>
                {quote.split(highlight).slice(1).join(highlight)}
              </>
            ) : (
              quote
            )}
            ”
          </blockquote>
        </div>
        <div className={styles.divider} />
        <nav className={styles.sections} aria-label="Navigation sections">
          {navigationData
            .slice()
            .sort((a, b) => a.id - b.id)
            .map((section) => (
              <button
                key={section.id}
                type="button"
                className={
                  activeSection?.id === section.id
                    ? styles.activeSection
                    : undefined
                }
                onClick={() => {
                  setActiveSection(section);
                  setSelectedParent(null);
                }}
              >
                {section.name}
              </button>
            ))}
        </nav>
        <div className={styles.actions}>
          <Link href="/engage/reach-us" onClick={onClose}>
            Enquiry
          </Link>
          <Link href="/engage/reach-us" onClick={onClose}>
            Contact Us
          </Link>
        </div>
      </aside>
    </div>
  );
}
