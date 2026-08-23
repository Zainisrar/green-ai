"use client";

/** Shared brand registry for Figma canvases; product-canvas marks are rendered by their page source layers. */
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
  { href: "/energy", label: "Energy" },
  {
    href: "/engineering/products",
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
  empawa: {
    src: "/images/product/green-empawa.png",
    alt: "GREEN Em’Pawa",
    width: 230,
    height: 85,
  },
  sunsmart: {
    src: "/images/product/green-sunsmart.png",
    alt: "GREEN SunSmart",
    width: 226,
    height: 77,
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
  neutralNavigation?: boolean;
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
  neutralNavigation = false,
}: SiteHeaderProps) {
  const pathname = usePathname();
  const headerBrand = headerBrands[brand];
  const [isScrolled, setIsScrolled] = useState(false);
  const { isNavigationOpen, openNavigation, closeNavigation } =
    useNavigationState();
  const { navigationData, activeSection, setActiveSection, featuredChild } =
    useNavigation(isNavigationOpen, pathname);
  const showEmpawaProductLink =
    (layout === "productCanvas" && brand === "sunshine") ||
    brandClassName === "product-figma-header-logo";

  useEffect(() => {
    const updateHeader = () => setIsScrolled(window.scrollY > 32);
    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });
    return () => window.removeEventListener("scroll", updateHeader);
  }, []);

  return (
    <>
      <header
        className={`${styles.header} ${layout === "figmaCanvas" ? styles.canvasHeader : ""} ${layout === "productCanvas" ? styles.productCanvasHeader : ""} ${neutralNavigation ? styles.neutralNavigation : ""} ${isScrolled ? styles.scrolled : ""} ${isNavigationOpen ? styles.navigationOpen : ""}`}
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

        {showEmpawaProductLink ? (
          <Link
            href="/engineering/products/green-empawa"
            className={styles.productEmpawaLink}
            aria-label="View GREEN Em’Pawa products"
          />
        ) : null}

        <nav className={styles.navigation} aria-label="Primary navigation">
          {navigationItems.map((item) => {
            const active =
              highlightActive && isItemActive(pathname, item.label);
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
              onClick={isNavigationOpen ? closeNavigation : openNavigation}
              className={`${styles.menuButton} ${isNavigationOpen ? styles.menuCloseButton : ""}`}
              aria-label={
                isNavigationOpen
                  ? "Close navigation menu"
                  : "Open navigation menu"
              }
            >
              {isNavigationOpen ? (
                <>
                  <span />
                  <span />
                </>
              ) : (
                <Image
                  src="/images/heroSection/lighting.svg"
                  alt=""
                  width={42}
                  height={42}
                />
              )}
            </button>
          ) : null}
        </nav>

        {layout !== "viewport" ? (
          <button
            type="button"
            onClick={isNavigationOpen ? closeNavigation : openNavigation}
            className={`${styles.menuButton} ${styles.canvasMenuButton} ${isNavigationOpen ? styles.menuCloseButton : ""}`}
            aria-label={
              isNavigationOpen
                ? "Close navigation menu"
                : "Open navigation menu"
            }
            data-node-id="I7077:3756;7077:14065"
          >
            {isNavigationOpen ? (
              <>
                <span />
                <span />
              </>
            ) : (
              <Image
                src="/images/shared/figma-brand-panel/bolt.png"
                alt=""
                width={85}
                height={85}
              />
            )}
          </button>
        ) : null}
      </header>
      {isNavigationOpen && navigationData ? (
        <Navigation
          navigationData={navigationData}
          activeSection={activeSection}
          setActiveSection={setActiveSection}
          featuredChild={featuredChild}
          currentPath={pathname}
          onClose={closeNavigation}
        />
      ) : null}
    </>
  );
}
