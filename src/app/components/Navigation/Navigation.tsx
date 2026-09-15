"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
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
  const figmaTransition = {
    duration: reduceMotion ? 0 : 0.3,
    ease: [0, 0, 0.58, 1] as [number, number, number, number],
  };
  const dissolveInitial = reduceMotion ? false : { opacity: 0 };
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
    const nestedParents =
      activeSection?.children?.filter((item) => item.children?.length) ?? [];
    const currentParent = nestedParents.find(
      (item) =>
        item.slug === currentPath ||
        Boolean(item.slug && currentPath?.startsWith(`${item.slug}/`)) ||
        item.children?.some(
          (child) =>
            child.slug === currentPath ||
            Boolean(child.slug && currentPath?.startsWith(`${child.slug}/`)),
        ),
    );
    const sectionDefaultParent = nestedParents.find(
      (item) => item.slug === activeSection?.slug,
    );

    setSelectedParent(
      currentParent ?? sectionDefaultParent ?? nestedParents[0] ?? null,
    );
  }, [activeSection, currentPath]);

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

  const activeFeature =
    selectedParent?.image && selectedParent.text
      ? selectedParent
      : featuredChild;
  const quote =
    activeFeature?.text?.description ||
    "Explore our comprehensive solutions and services";
  const sections = navigationData.slice().sort((a, b) => a.id - b.id);
  // CMS record IDs vary between environments. Layout selection must use the
  // section's stable identity instead of development-database IDs.
  const activeSectionName = activeSection?.name.trim().toLowerCase() ?? "";
  const activeSectionSlug = activeSection?.slug.toLowerCase() ?? "";
  const matchesSection = (name: string) =>
    activeSectionName === name ||
    activeSectionSlug === name ||
    activeSectionSlug === `/${name}` ||
    activeSectionSlug.startsWith(`/${name}/`) ||
    activeSectionSlug.startsWith(`${name}/`);
  const isEngineeringLayout = matchesSection("engineering");
  const isEvolutionLayout = matchesSection("evolution");
  const isEndeavorsLayout = matchesSection("endeavors");
  const isEnlightenLayout = matchesSection("enlighten");
  const isEcosystemLayout = matchesSection("ecosystem");
  const isEmpowerLayout = matchesSection("empower");
  const isEngageLayout = matchesSection("engage");
  const isExploreLayout = matchesSection("explore");
  const isSupplyEcosystemLayout =
    isEcosystemLayout &&
    selectedParent?.name.trim().toLowerCase() === "supply partners";
  const isFeatureLedLayout = isEmpowerLayout || isEngageLayout;
  const engageItemOrder = [
    "partner with us",
    "become a supplier",
    "investor relations",
    "media & press",
    "public events & volunteering",
    "contact us",
    "book a consultation",
    "request a proposal (rfp)",
    "find us globally (map)",
    "newsletter signup",
  ];
  const visibleItems = [...(activeSection?.children ?? [])].sort((a, b) => {
    if (!isEngageLayout) return 0;

    const aOrder = engageItemOrder.indexOf(a.name.trim().toLowerCase());
    const bOrder = engageItemOrder.indexOf(b.name.trim().toLowerCase());
    return (
      (aOrder === -1 ? Number.MAX_SAFE_INTEGER : aOrder) -
      (bOrder === -1 ? Number.MAX_SAFE_INTEGER : bOrder)
    );
  });
  const isCurrent = (item: NavigationItem) =>
    currentPath === item.slug ||
    Boolean(item.slug && currentPath?.startsWith(`${item.slug}/`));
  const hasCurrentMenuItem = visibleItems.some(isCurrent);
  const isActiveMenuItem = (item: NavigationItem, index: number) => {
    if (selectedParent) {
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

  // Several Figma-authored pages scale their entire canvas with a CSS
  // transform. A fixed element inside that canvas is fixed to (and scaled
  // with) the transformed ancestor, rather than the browser viewport. Keep
  // this global dialog at the document root so its responsive breakpoints and
  // viewport units always describe the actual window.
  if (typeof document === "undefined") return null;

  const hasNestedChildren = Boolean(selectedParent?.children?.length);

  return createPortal(
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
        className={`${styles.drawer} ${isExploreLayout ? styles.exploreDrawer : ""} ${isFeatureLedLayout ? styles.featureLedDrawer : ""} ${isEvolutionLayout ? styles.evolutionDrawer : ""} ${isEngineeringLayout ? styles.engineeringDrawer : ""} ${isEndeavorsLayout ? styles.endeavorsDrawer : ""} ${isEnlightenLayout ? styles.enlightenDrawer : ""} ${isEcosystemLayout ? styles.ecosystemDrawer : ""} ${isSupplyEcosystemLayout ? styles.supplyEcosystemDrawer : ""} ${isEmpowerLayout ? styles.empowerDrawer : ""} ${isEngageLayout ? styles.engageDrawer : ""} ${hasNestedChildren ? styles.hasNestedNavigation : ""}`.trim()}
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
          className={styles.content}
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={figmaTransition}
        >
          <motion.div
            layout="position"
            className={styles.feature}
            transition={figmaTransition}
          >
            <AnimatePresence initial={false} mode="sync">
              {activeFeature?.image ? (
                <motion.img
                  key={activeFeature.image.src}
                  loading="lazy"
                  decoding="async"
                  src={activeFeature.image.src}
                  alt={activeFeature.image.alt}
                  initial={dissolveInitial}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={figmaTransition}
                />
              ) : null}
            </AnimatePresence>
          </motion.div>
          <motion.div
            layout="position"
            className={styles.subNavigation}
            transition={figmaTransition}
          >
            <AnimatePresence initial={false} mode="wait">
              <motion.div
                key={activeSection?.id ?? "navigation"}
                className={styles.menuItems}
                initial={dissolveInitial}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={figmaTransition}
              >
                {visibleItems.map((item, index) =>
                  item.children?.length ? (
                    <button
                      key={item.id}
                      type="button"
                      className={`${styles.subMenuTrigger} ${selectedParent?.id === item.id ? `${styles.activeItem} ${isEngageLayout ? "" : styles.underlinedActiveItem}` : ""}`}
                      aria-expanded={selectedParent?.id === item.id}
                      onClick={() =>
                        setSelectedParent(
                          selectedParent?.id === item.id ? null : item,
                        )
                      }
                    >
                      <span>{item.name}</span>
                      <svg
                        className={styles.chevron}
                        width="6"
                        height="10"
                        viewBox="0 0 6 10"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                      >
                        <path
                          d="M1 1L5 5L1 9"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
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
              </motion.div>
            </AnimatePresence>
          </motion.div>
          <AnimatePresence initial={false} mode="wait">
            {selectedParent?.children?.length ? (
              <motion.nav
                layout="position"
                key={selectedParent.id}
                className={styles.nestedNavigation}
                aria-label={`${selectedParent.name} navigation`}
                initial={dissolveInitial}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={figmaTransition}
              >
                {selectedParent.children.map((item) => (
                  <Link
                    key={item.id}
                    href={item.slug}
                    className={isCurrent(item) ? styles.activeItem : undefined}
                    onClick={onClose}
                  >
                    {item.name}
                  </Link>
                ))}
              </motion.nav>
            ) : null}
          </AnimatePresence>
          <motion.blockquote
            layout="position"
            className={styles.quote}
            transition={figmaTransition}
          >
            <motion.span
              key={`${activeSection?.id ?? "navigation"}-${quote}`}
              className={styles.quoteContent}
              initial={dissolveInitial}
              animate={{ opacity: 1 }}
              transition={figmaTransition}
            >
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
                  “People-First. <em>Talent</em>-Driven.”
                </span>
              ) : isEnlightenLayout ? (
                <span>
                  “<em>Knowledge</em> Sharing, Thought Leadership, and Market
                  {` `}
                  <em>Insight</em>”
                </span>
              ) : isEngineeringLayout ? (
                <span>
                  “Our Technical{` `}
                  <em>Capabilities, Services, and Flagship</em>
                  {` `}Products”
                </span>
              ) : isEndeavorsLayout ? (
                <span>
                  “Real <em>Projects.</em> Real Impact”
                </span>
              ) : isEcosystemLayout ? (
                <span>
                  “The World Of Partners That Power Our{` `}
                  <em>Promise</em>”
                </span>
              ) : isEvolutionLayout ? (
                <span>
                  “Our Journey From <em>PNG</em> Roots To Global Energy Leader”
                </span>
              ) : isExploreLayout ? (
                <span>
                  “Start Here. <em>GREEN’s</em> Mission, Impact, and World In
                  Motion”
                </span>
              ) : (
                <span>“{quote.replace(/^[“”"']+|[“”"']+$/g, "").trim()}”</span>
              )}
            </motion.span>
          </motion.blockquote>
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
    </div>,
    document.body,
  );
}
