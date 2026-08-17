"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useNavigation } from "@/app/hooks/useNavigation";
import { useNavigationState } from "@/hooks/useNavigationState";
import FigmaBrandPanel from "../FigmaBrandPanel/FigmaBrandPanel";
import Navigation from "../Navigation/Navigation";
import styles from "./SiteHeader.module.css";

const navigationItems = [
  { href: "/explore/welcome-to-green", label: "Explore" },
  { href: "/engineering/solar-epcm-services", label: "Energy" },
  {
    href: "/engineering/products/lighting-up-and-lifting-up-living-standards",
    label: "Elements",
  },
  { href: "/expertise", label: "Expertise" },
  { href: "/empower/join-us", label: "Enlist" },
  { href: "/engage/reach-us", label: "Engage" },
] as const;

const headerBrands = {
  green: {
    src: "/images/heroSection/logo.png",
    alt: "GREEN — Future: Envisioned",
    width: 375,
    height: 98,
  },
  sunshine: {
    src: "/images/product/green-sunshine.png",
    alt: "GREEN SunShine",
    width: 176,
    height: 70,
  },
} as const;

interface SiteHeaderProps {
  brand?: keyof typeof headerBrands;
  brandClassName?: string;
  productLogo?: boolean;
  compactLogo?: boolean;
  panel?: "full" | "logoOnly";
  layout?: "viewport" | "figmaCanvas" | "productCanvas";
  figmaPanelVariant?: "default" | "flagship";
  highlightActive?: boolean;
}

const isItemActive = (pathname: string, label: string) => {
  if (label === "Explore") return pathname.startsWith("/explore");
  if (label === "Energy") {
    return (
      pathname === "/energy" ||
      (pathname.startsWith("/engineering/") &&
        !pathname.startsWith("/engineering/products"))
    );
  }
  if (label === "Elements") {
    return pathname.startsWith("/engineering/products");
  }
  if (label === "Expertise") return pathname.startsWith("/expertise");
  if (label === "Enlist") {
    return pathname.startsWith("/empower") || pathname.startsWith("/enlist");
  }
  return pathname.startsWith("/engage");
};

export default function SiteHeader({
  brand = "green",
  brandClassName = "",
  productLogo = false,
  compactLogo = false,
  panel = "full",
  layout = "viewport",
  figmaPanelVariant = "default",
  highlightActive = true,
}: SiteHeaderProps) {
  const pathname = usePathname();
  const headerBrand = headerBrands[brand];
  const [isScrolled, setIsScrolled] = useState(false);
  const { isNavigationOpen, openNavigation, closeNavigation } =
    useNavigationState();
  const { navigationData, activeSection, setActiveSection, featuredChild } =
    useNavigation(isNavigationOpen, pathname);

  useEffect(() => {
    const updateHeader = () => setIsScrolled(window.scrollY > 32);
    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });
    return () => window.removeEventListener("scroll", updateHeader);
  }, []);

  if (isNavigationOpen && navigationData) {
    return (
      <Navigation
        navigationData={navigationData}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        featuredChild={featuredChild}
        currentPath={pathname}
        onClose={closeNavigation}
      />
    );
  }

  return (
    <header
      className={`${styles.header} ${layout === "figmaCanvas" ? styles.canvasHeader : ""} ${layout === "productCanvas" ? styles.productCanvasHeader : ""} ${isScrolled ? styles.scrolled : ""}`}
      data-site-header
      data-node-id={layout !== "viewport" ? "7077:3756" : undefined}
    >
      {brand === "green" ? (
        <FigmaBrandPanel
          className={
            layout !== "viewport"
              ? `${styles.canvasBrandPanel} ${figmaPanelVariant === "flagship" ? styles.flagshipCanvasBrandPanel : ""}`
              : styles.brandPanel
          }
          compactLogo={compactLogo}
          fixedCanvasSize={layout === "figmaCanvas"}
          variant={figmaPanelVariant}
          showPanel={panel === "full"}
        />
      ) : (
        <Link
          href="/home/renewable-energy-the-core"
          className={`${styles.logo} ${styles.sunshineLogo} ${productLogo ? styles.productLogo : ""} ${brandClassName}`}
          aria-label="GREEN home"
        >
          <Image
            src={headerBrand.src}
            alt={headerBrand.alt}
            width={headerBrand.width}
            height={headerBrand.height}
            priority
          />
        </Link>
      )}

      <nav className={styles.navigation} aria-label="Primary navigation">
        {navigationItems.map((item) => {
          const active = highlightActive && isItemActive(pathname, item.label);
          return (
            <Link
              href={item.href}
              key={item.label}
              className={active ? styles.active : undefined}
              aria-current={active ? "page" : undefined}
            >
              {item.label}
            </Link>
          );
        })}
        {layout === "viewport" ? (
          <button
            type="button"
            onClick={openNavigation}
            className={styles.menuButton}
            aria-label="Open navigation menu"
          >
            <Image
              src="/images/heroSection/lighting.svg"
              alt=""
              width={42}
              height={42}
            />
          </button>
        ) : null}
      </nav>

      {layout !== "viewport" ? (
        <button
          type="button"
          onClick={openNavigation}
          className={`${styles.menuButton} ${styles.canvasMenuButton}`}
          aria-label="Open navigation menu"
          data-node-id="I7077:3756;7077:14065"
        >
          <img
            src="/images/shared/figma-brand-panel/bolt.png"
            alt=""
            width="85"
            height="85"
          />
        </button>
      ) : null}
    </header>
  );
}
