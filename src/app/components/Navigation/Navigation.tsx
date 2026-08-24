"use client";

import { motion, useReducedMotion } from "motion/react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
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
  const reduceMotion = useReducedMotion();
  const drawerRef = useRef<HTMLElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);

  // The CMS can replace the fallback navigation after the drawer has opened.
  // Do not retain a drill-down item from the previous data set.
  // biome-ignore lint/correctness/useExhaustiveDependencies: This prop changes when the CMS replaces fallback navigation.
  useEffect(() => {
    setSelectedParent(null);
  }, [navigationData]);

  // The Figma panels expose their related child group as part of the active
  // section. Engineering opens Products & Systems and Enlighten opens
  // Learning Hub without requiring an extra click.
  useEffect(() => {
    const nestedParent = activeSection?.children?.find(
      (item) => item.children?.length,
    );
    setSelectedParent(nestedParent ?? null);
  }, [activeSection]);

  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const closeOnEscape = (event: KeyboardEvent) =>
      event.key === "Escape" && onClose();

    window.addEventListener("keydown", closeOnEscape);
    closeButtonRef.current?.focus();

    return () => {
      window.removeEventListener("keydown", closeOnEscape);
      previouslyFocused?.focus();
    };
  }, [onClose]);

  const trapFocus = (event: React.KeyboardEvent<HTMLElement>) => {
    if (event.key !== "Tab") return;

    const focusableElements = drawerRef.current?.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
    );
    if (!focusableElements?.length) {
      event.preventDefault();
      return;
    }

    const first = focusableElements[0];
    const last = focusableElements[focusableElements.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  const quote =
    featuredChild?.text?.description ||
    "Explore our comprehensive solutions and services";
  const highlight = featuredChild?.text?.highlighted;
  const visibleItems = activeSection?.children ?? [];
  const sections = navigationData.slice().sort((a, b) => a.id - b.id);
  const isFeatureLedLayout = activeSection?.id === 7 || activeSection?.id === 8;
  const isEngineeringLayout = activeSection?.id === 3;
  const isEmpowerLayout = activeSection?.id === 7;
  const isEngageLayout = activeSection?.id === 8;
  const isCurrent = (item: NavigationItem) =>
    currentPath === item.slug ||
    Boolean(item.slug && currentPath?.startsWith(`${item.slug}/`));
  const hasCurrentMenuItem = visibleItems.some(isCurrent);
  const isActiveMenuItem = (item: NavigationItem, index: number) => {
    // Engineering opens on Products & Systems in the Figma panel. Treat that
    // expandable parent as the only active top-level item while its products
    // are visible, even if the underlying page is Solar EPC Services.
    if (isEngineeringLayout && selectedParent) {
      return item.id === selectedParent.id;
    }

    return isCurrent(item) || (!hasCurrentMenuItem && index === 0);
  };
  const activeMenuClassName = (item: NavigationItem, index: number) => {
    if (!isActiveMenuItem(item, index)) return "";

    // The Figma Engage panel keeps its active item green but omits the
    // divider underneath it. Every other section uses that divider to mark
    // the active destination.
    return `${styles.activeItem} ${isEngageLayout ? "" : styles.underlinedActiveItem}`;
  };

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
      <aside
        className={`${styles.drawer} ${isFeatureLedLayout ? styles.featureLedDrawer : ""} ${isEngineeringLayout ? styles.engineeringDrawer : ""} ${isEngageLayout ? styles.engageDrawer : ""}`}
        ref={drawerRef}
        onKeyDown={trapFocus}
      >
        <button
          ref={closeButtonRef}
          className={styles.close}
          type="button"
          onClick={onClose}
          aria-label="Close navigation"
        >
          <span />
          <span />
        </button>
        <motion.div
          key={activeSection?.id ?? "navigation"}
          className={styles.content}
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: reduceMotion ? 0 : 0.3,
            ease: [0, 0, 0.58, 1],
          }}
        >
          <div className={styles.feature}>
            {featuredChild?.image ? (
              <img loading="lazy" decoding="async"
                src={featuredChild.image.src}
                alt={featuredChild.image.alt}
              />
            ) : null}
          </div>
          <div className={styles.subNavigation}>
            {visibleItems.map((item, index) =>
              item.children?.length ? (
                <button
                  key={item.id}
                  type="button"
                  className={`${styles.subMenuTrigger} ${isActiveMenuItem(item, index) || selectedParent?.id === item.id ? `${styles.activeItem} ${isEngageLayout ? "" : styles.underlinedActiveItem}` : ""}`}
                  aria-expanded={selectedParent?.id === item.id}
                  onClick={() =>
                    setSelectedParent((selected) =>
                      selected?.id === item.id ? null : item,
                    )
                  }
                >
                  {item.name}
                  <span aria-hidden="true">›</span>
                </button>
              ) : (
                <Link
                  key={item.id}
                  href={item.slug}
                  className={activeMenuClassName(item, index) || undefined}
                  onClick={onClose}
                >
                  {item.name}
                </Link>
              ),
            )}
          </div>
          {selectedParent?.children?.length ? (
            <nav
              className={styles.nestedNavigation}
              aria-label={`${selectedParent.name} navigation`}
            >
              {selectedParent.children.map((item) => (
                <Link key={item.id} href={item.slug} onClick={onClose}>
                  {item.name}
                </Link>
              ))}
            </nav>
          ) : null}
          <blockquote className={styles.quote}>
            {isEngageLayout ? (
              <>
                <span>
                  “Let&apos;s <em>Connect</em> and
                </span>
                <span>
                  Define <em>Future</em> Together”
                </span>
              </>
            ) : isEmpowerLayout ? (
              <span>
                “People-First. <em>Talent-Driven.</em>”
              </span>
            ) : (
              <>
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
              </>
            )}
          </blockquote>
        </motion.div>
        <div className={styles.divider} />
        <nav className={styles.sections} aria-label="Navigation sections">
          {sections.map((section) => {
            const isActive = activeSection?.id === section.id;

            return (
              <button
                key={section.id}
                type="button"
                className={isActive ? styles.activeSection : undefined}
                aria-pressed={isActive}
                onClick={() => {
                  setActiveSection(section);
                  setSelectedParent(null);
                }}
              >
                {isActive ? (
                  <motion.span
                    className={styles.sectionMarker}
                    layoutId="active-navigation-section-marker"
                    transition={{
                      duration: reduceMotion ? 0 : 0.3,
                      ease: [0, 0, 0.58, 1],
                    }}
                  />
                ) : null}
                {section.name}
              </button>
            );
          })}
        </nav>
        <div className={styles.actions}>
          <Link href="/engage/reach-us" onClick={onClose}>
            Enquiry
          </Link>
          <Link href="/engage/contact-us" onClick={onClose}>
            Contact Us
          </Link>
        </div>
      </aside>
    </div>
  );
}
