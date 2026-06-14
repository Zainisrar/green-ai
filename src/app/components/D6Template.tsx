"use client";

import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import D6Chatbot from "./D6Chatbot";
import Navigation from "./Navigation/Navigation";
import { useNavigation } from "@/app/hooks/useNavigation";
import { useNavigationState } from "@/hooks/useNavigationState";
import { useHomeBySlug } from "@/hooks/useHomeBySlug";
import { useHomeSlides } from "@/hooks/useHomeSlides";
import "../home.css";

interface D6TemplateProps {
  slug: string;
}

const DESIGN_W = 1920;
const DESIGN_H = 970;
const SLIDE_INTERVAL_MS = 2000;

/** Figma Home Page D6 — photo panels + diagonal seams (node 1201:2820) */
const FIGMA_LAYERS = {
  panels: [
    { src: "/images/d6/D6-Page-1/1.png", left: -282.37, top: 0, width: 828, height: 979, z: 1 },
    { src: "/images/d6/D6-Page-1/3.png", left: 83, top: 0, width: 1022, height: 976, z: 2 },
    { src: "/images/d6/D6-Page-1/5.png", left: 569, top: -1, width: 827, height: 969, z: 3 },
    { src: "/images/d6/D6-Page-1/7.png", left: 936, top: 0, width: 847, height: 970, z: 5 },
    { src: "/images/d6/D6-Page-1/9.png", left: 1321, top: -8, width: 827, height: 973, z: 4 },
  ],
  diagonals: [
    { src: "/images/d6/D6-Page-1/2.png", left: 70, top: 1, width: 478, height: 969, z: 6 },
    { src: "/images/d6/D6-Page-1/4.png", left: 558, top: 1, width: 478, height: 969, z: 7 },
    { src: "/images/d6/D6-Page-1/6.png", left: 920, top: 1, width: 478, height: 969, z: 8 },
    { src: "/images/d6/D6-Page-1/8.png", left: 1305, top: 1, width: 478, height: 969, z: 9 },
  ],
} as const;

/** Figma letter vectors — shared bottom baseline (y=755 on 970 canvas) */
const GREEN_LETTERS = [
  { src: "/images/d6/lgG.png", left: 0, width: 204 },
  { src: "/images/d6/lgR.png", left: 379, width: 207 },
  { src: "/images/d6/lgE.png", left: 797, width: 193 },
  { src: "/images/d6/lgE.png", left: 1159, width: 194 },
  { src: "/images/d6/lgN.png", left: 1543, width: 218 },
] as const;

const LETTER_BASELINE = 215;

/** Copy positions relative to each panel image (prevents bleed into adjacent panels) */
const PANEL_COPY = [
  {
    headlineLeft: 333,
    headlineTop: 348,
    headlineWidth: 250,
    headlineStyle: "panel-headline panel-headline-italic",
    descLeft: 333,
    descTop: 455,
    descWidth: 215,
  },
  {
    headlineLeft: 317,
    headlineTop: 348,
    headlineWidth: 360,
    headlineStyle: "panel-headline panel-headline-r",
    descLeft: 317,
    descTop: 455,
    descWidth: 280,
  },
  {
    headlineLeft: 358,
    headlineTop: 348,
    headlineWidth: 220,
    headlineStyle: "panel-headline panel-headline-italic",
    descLeft: 358,
    descTop: 455,
    descWidth: 200,
  },
  {
    headlineLeft: 338,
    headlineTop: 348,
    headlineWidth: 220,
    headlineStyle: "panel-headline panel-headline-italic",
    descLeft: 338,
    descTop: 455,
    descWidth: 200,
  },
  {
    headlineLeft: 327,
    headlineTop: 350,
    headlineWidth: 240,
    headlineStyle: "panel-headline panel-headline-italic",
    descLeft: 327,
    descTop: 458,
    descWidth: 210,
  },
] as const;

const NAV_ITEMS = [
  { href: "/explore/welcome-to-green", label: "Explore", className: "nav-explore" },
  { href: "/energy", label: "Energy", className: "nav-energy" },
  { href: "/engineering/products/lighting-up-and-lifting-up-living-standards", label: "Elements", className: "nav-elements" },
  { href: "/expertise", label: "Expertise", className: "nav-expertise" },
  { href: "/empower/join-us", label: "Enlist", className: "nav-enlist" },
  { href: "/engage/reach-us", label: "Engage", className: "nav-engage" },
];

const stackHeadline = (text: string) => {
  const line = text.trim().replace(/\s+/g, " ");
  return <span className="panel-headline-text">{line}</span>;
};

const FigmaLayer = ({
  src,
  left,
  top,
  width,
  height,
  z,
}: {
  src: string;
  left: number;
  top: number;
  width: number;
  height: number;
  z: number;
}) => (
  <img
    src={src}
    alt=""
    role="presentation"
    draggable={false}
    className="absolute select-none"
    style={{ left, top, width, height, zIndex: z, objectFit: "cover" }}
  />
);

const D6Template = ({ slug }: D6TemplateProps) => {
  const { isNavigationOpen, openNavigation, closeNavigation } =
    useNavigationState();
  const { navigationData, activeSection, setActiveSection, featuredChild } =
    useNavigation(isNavigationOpen);

  const { data: homeData, isLoading } = useHomeBySlug(slug);
  const { data: slides, isLoading: slidesLoading } = useHomeSlides();
  const [isMobile, setIsMobile] = React.useState(false);
  const [scale, setScale] = React.useState(1);
  const [activeSlide, setActiveSlide] = React.useState(0);
  const [slideVisible, setSlideVisible] = React.useState(true);

  React.useEffect(() => {
    if (!isLoading && homeData === null) notFound();
  }, [homeData, isLoading]);

  React.useEffect(() => {
    if (!slides?.length) return;

    const interval = setInterval(() => {
      setSlideVisible(false);
      window.setTimeout(() => {
        setActiveSlide((i) => (i + 1) % slides.length);
        setSlideVisible(true);
      }, 350);
    }, SLIDE_INTERVAL_MS);

    return () => clearInterval(interval);
  }, [slides]);

  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 1030);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  React.useEffect(() => {
    const updateScale = () => setScale(window.innerWidth / DESIGN_W);
    updateScale();
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, []);

  if (isNavigationOpen && navigationData) {
    return (
      <Navigation
        navigationData={navigationData}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        featuredChild={featuredChild}
        isOpen={isNavigationOpen}
        onClose={closeNavigation}
      />
    );
  }

  if (isMobile) {
    return (
      <>
        <div>
          <div className="mt-2 flex justify-between px-4">
            <img src="/images/d6/logo.png" alt="GREEN logo" />
            <div className="flex items-center space-x-4">
              <img src="/images/d6/arr.png" alt="" role="presentation" />
              <Link href="/explore">Explore</Link>
              <img src="/images/d6/break.png" alt="" role="presentation" />
              <Link href="/energy">Energy</Link>
              <img src="/images/d6/arr2.png" alt="" role="presentation" />
            </div>
          </div>
          <div className="mt-4">
            <img src="/images/d6/greenFuture.png" alt="" role="presentation" />
          </div>
          <div onClick={openNavigation} className="mt-4 ml-4 cursor-pointer">
            <img src="/images/d6/moreDetails.png" alt="" role="presentation" className="w-24" />
          </div>
          <div className="absolute w-screen h-screen -z-10 top-0">
            <img src="/images/d6/mobileBg.png" alt="" role="presentation" className="w-screen h-[110vh]" />
          </div>
          <D6Chatbot />
        </div>
      </>
    );
  }

  if (isLoading || slidesLoading || !homeData || !slides?.length) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-[#f5f5f5]">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#23B14D] border-t-transparent" />
      </div>
    );
  }

  return (
    <>
      <div
        className="relative w-full overflow-hidden bg-[#f5f5f5]"
        style={{ height: DESIGN_H * scale }}
      >
        <div
          className="home-page-d6"
          style={{
            width: DESIGN_W,
            height: DESIGN_H,
            transform: `scale(${scale})`,
            transformOrigin: "top left",
          }}
        >
          {FIGMA_LAYERS.panels.map((layer, i) => (
            <img
              key={`panel-${i}`}
              src={layer.src}
              alt=""
              role="presentation"
              draggable={false}
              className="absolute select-none transition-opacity duration-500"
              style={{
                left: layer.left,
                top: layer.top,
                width: layer.width,
                height: layer.height,
                zIndex: layer.z,
                objectFit: "cover",
                opacity: activeSlide === i ? 1 : 0.88,
              }}
            />
          ))}
          {FIGMA_LAYERS.diagonals.map((layer, i) => (
            <FigmaLayer key={`diag-${i}`} {...layer} />
          ))}

          {/* GREEN letters — photo panels only; letters rendered once on shared baseline */}
          {GREEN_LETTERS.map((letter, i) => (
            <img
              key={`letter-${i}`}
              src={letter.src}
              alt=""
              role="presentation"
              draggable={false}
              className="pointer-events-none absolute select-none"
              style={{
                left: letter.left,
                bottom: LETTER_BASELINE,
                width: letter.width,
                height: "auto",
                zIndex: 20,
              }}
            />
          ))}

          {/* Figma green wedge — top-left corner behind logo */}
          <div className="d6-green-corner" style={{ zIndex: 12 }} aria-hidden />

          {/* Each panel's heading + description clipped to its own image bounds */}
          {slides.map((slide, i) => {
            const panel = FIGMA_LAYERS.panels[i];
            const copy = PANEL_COPY[i];
            const isActive = activeSlide === i;
            return (
              <div
                key={slide.id}
                className="panel-copy-zone"
                style={{
                  left: panel.left,
                  top: panel.top,
                  width: panel.width,
                  height: panel.height,
                  zIndex: 30,
                }}
              >
                <h2
                  className={copy.headlineStyle}
                  style={{
                    left: copy.headlineLeft,
                    top: copy.headlineTop,
                    maxWidth: copy.headlineWidth,
                  }}
                >
                  {stackHeadline(slide.headline)}
                </h2>
                {isActive && (
                  <p
                    className={`panel-desc ${slideVisible ? "slide-visible" : "slide-hidden"}`}
                    style={{
                      left: copy.descLeft,
                      top: copy.descTop,
                      width: copy.descWidth,
                    }}
                  >
                    {slide.description}
                  </p>
                )}
              </div>
            );
          })}

          <div className="group-1171280893" style={{ zIndex: 20 }}>
            <div className="arrow-1" />
            <p className="company-snapshots">
              company Snapshots
              <br />
              IN 90 SEC
            </p>
          </div>

          <Link href="/" className="green-logo-high block" style={{ zIndex: 30 }} aria-label="GREEN home">
            <img
              src="/images/home/GREEN Logo - High 5.png"
              alt="GREEN logo"
              className="h-full w-full object-contain"
            />
          </Link>

          <nav className="component" style={{ zIndex: 30 }}>
            <div className="frame-1171277914">
              {NAV_ITEMS.map((item) => (
                <Link key={item.href} href={item.href} className={item.className}>
                  {item.label}
                </Link>
              ))}
            </div>
            <button
              type="button"
              onClick={openNavigation}
              className="bolt-1 cursor-pointer border-0 bg-transparent p-0"
              aria-label="Open navigation menu"
            />
          </nav>
        </div>
      </div>
      <D6Chatbot />
    </>
  );
};

export default D6Template;
