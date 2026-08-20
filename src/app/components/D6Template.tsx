"use client";

import Link from "next/link";
import React from "react";
import D6Chatbot from "./D6Chatbot";
import SiteHeader from "./SiteHeader/SiteHeader";
import "../home.css";

interface D6TemplateProps {
  slug: string;
}

const DESIGN_W = 1920;
const DESIGN_H = 970;
/** Figma Home Page D6 — photo panels + diagonal seams (node 1201:2820) */
const FIGMA_LAYERS = {
  panels: [
    // imgLeft/imgTop/imgWidth/imgHeight override the rendered photo box only (the copy-zone
    // still uses left/top/width/height). Panel 1 is scaled up & anchored bottom-right so its
    // top-right photo edge reaches the black seam line like panels 3–5.
    {
      src: "/images/home/download (1) 1.png",
      left: -282.37,
      top: 0,
      width: 828,
      height: 979,
      z: 3,
      imgLeft: 0,
      imgTop: 0,
      imgWidth: 546,
      imgHeight: 970,
    },
    {
      src: "/images/d6/D6-Page-1/3.png",
      left: 83,
      top: 0,
      width: 1022,
      height: 976,
      z: 2,
    },
    {
      src: "/images/d6/D6-Page-1/5.png",
      left: 569,
      top: -1,
      width: 827,
      height: 969,
      z: 3,
    },
    {
      src: "/images/d6/D6-Page-1/7.png",
      left: 936,
      top: 0,
      width: 847,
      height: 970,
      z: 5,
    },
    {
      src: "/images/d6/D6-Page-1/9.png",
      left: 1321,
      top: -8,
      width: 827,
      height: 973,
      z: 4,
    },
  ],
  diagonals: [
    {
      src: "/images/d6/D6-Page-1/2.png",
      left: 70,
      top: 1,
      width: 478,
      height: 969,
      z: 6,
    },
    {
      src: "/images/d6/D6-Page-1/4.png",
      left: 558,
      top: 1,
      width: 478,
      height: 969,
      z: 7,
    },
    {
      src: "/images/d6/D6-Page-1/6.png",
      left: 920,
      top: 1,
      width: 478,
      height: 969,
      z: 8,
    },
    {
      src: "/images/d6/D6-Page-1/8.png",
      left: 1305,
      top: 1,
      width: 478,
      height: 969,
      z: 9,
    },
  ],
} as const;

/** Figma letter vectors — shared bottom baseline (y=755 on 970 canvas) */
const GREEN_LETTERS = [
  { src: "/images/d6/lgG.png", left: 0, width: 214 },
  { src: "/images/d6/lgR.png", left: 380, width: 267 },
  { src: "/images/d6/lgE.png", left: 775, width: 253 },
  { src: "/images/d6/lgE.png", left: 1159, width: 253 },
  { src: "/images/d6/lgN.png", left: 1543, width: 278 },
] as const;

const LETTER_BASELINE = 184;
const ACCORDION_SHIFT = 105;

/** Exact exported Figma composites for the interactive expanded states.
 * Keeping the photography, tints and seams in the approved composites avoids
 * the crop jump caused by re-covering each source image in a full-screen box. */
const EXPANDED_STATE_ART = [
  { panel: 2, src: "/images/d6/bg2.jpg" },
  { panel: 3, src: "/images/d6/bg3.jpg" },
  { panel: 4, src: "/images/d6/bg4.jpg" },
] as const;

type Diagonal = readonly [top: number, bottom: number];

/** The four shared panel edges. Every state uses the very same boundaries, so
 * adjacent photos always touch and no page background can appear mid-motion. */
const PANEL_EDGES: Record<number, readonly Diagonal[]> = {
  1: [
    [548, 70],
    [1036, 558],
    [1398, 920],
    [1783, 1305],
  ],
  2: [
    [548, 70],
    [900, 444],
    [1397, 937],
    [1783, 1305],
  ],
  3: [
    [548, 70],
    [980, 502],
    [1268, 810],
    [1783, 1305],
  ],
  4: [
    [548, 70],
    [980, 502],
    [1268, 810],
    [1654, 1196],
  ],
};

const panelHitGeometry = (index: number, edges: readonly Diagonal[]) => {
  const left = index === 0 ? ([0, 0] as const) : edges[index - 1];
  const right = index === 4 ? ([DESIGN_W, DESIGN_W] as const) : edges[index];
  const minX = Math.min(...left, ...right);
  const maxX = Math.max(...left, ...right);

  return {
    left: minX,
    width: maxX - minX,
    clipPath: `polygon(${left[0] - minX}px 0, ${right[0] - minX}px 0, ${right[1] - minX}px 100%, ${left[1] - minX}px 100%)`,
  };
};

const panelCopyClipPath = (
  index: number,
  edges: readonly Diagonal[],
  panelLeft: number,
) => {
  const left = index === 0 ? ([0, 0] as const) : edges[index - 1];
  const right = index === 4 ? ([DESIGN_W, DESIGN_W] as const) : edges[index];
  return `polygon(${left[0] - panelLeft}px 0, ${right[0] - panelLeft}px 0, ${right[1] - panelLeft}px 100%, ${left[1] - panelLeft}px 100%)`;
};

const edgeXAtY = ([top, bottom]: Diagonal, y: number) =>
  top + (bottom - top) * (y / DESIGN_H);

const centeredPanelHeadingLeft = (
  index: number,
  y: number,
  width: number,
  edges: readonly Diagonal[],
) => {
  const leftEdge = index === 0 ? ([0, 0] as const) : edges[index - 1];
  const rightEdge =
    index === PANELS.length - 1
      ? ([DESIGN_W, DESIGN_W] as const)
      : edges[index];

  return (edgeXAtY(leftEdge, y) + edgeXAtY(rightEdge, y) - width) / 2;
};

/** Copy positions from Figma node 7077:4372, relative to their panel images. */
const PANEL_COPY = [
  {
    headlineLeft: 333.5,
    headlineTop: 383,
    headlineWidth: 247,
    headlineStyle: "panel-headline panel-headline-italic",
    descLeft: 338,
    descTop: 499,
    descWidth: 215,
  },
  {
    headlineLeft: 317.67,
    headlineTop: 343,
    headlineWidth: 360,
    headlineStyle: "panel-headline panel-headline-r",
    descLeft: 317.67,
    descTop: 457,
    descWidth: 358.26,
  },
  {
    headlineLeft: 358,
    headlineTop: 377,
    headlineWidth: 220,
    headlineStyle: "panel-headline panel-headline-italic",
    descLeft: 358,
    descTop: 493,
    descWidth: 200,
  },
  {
    headlineLeft: 338,
    headlineTop: 376,
    headlineWidth: 220,
    headlineStyle: "panel-headline panel-headline-italic",
    descLeft: 338,
    descTop: 492,
    descWidth: 200,
  },
  {
    headlineLeft: 327,
    headlineTop: 391.36,
    headlineWidth: 240,
    headlineStyle: "panel-headline panel-headline-italic",
    descLeft: 327,
    descTop: 507,
    descWidth: 210,
  },
] as const;

/** Number of rendered lines in each collapsed label. The diagonal panel's
 * horizontal center changes as Y increases, so centering against the first
 * line makes multi-line labels drift toward the right seam. */
const COLLAPSED_LABEL_LINES = [3, 2, 3, 2, 3] as const;
const COLLAPSED_LABEL_LINE_HEIGHT = 36;

const PANELS = [
  {
    label: "GREEN FUTURE ENVISIONED",
    description: undefined,
    href: "/explore/welcome-to-green",
  },
  {
    label: "RENEWABLE ENERGY THE CORE",
    description:
      "Renewables: Providing cleaner energy to our world. Renewable energy is at the core of the solutions we provide to address our clients' varied requirements. Thus, sustaiablity assured, the green way!",
    href: "/engineering/solar-epcm-services",
  },
  {
    label: "PRODUCTS AND SOLUTIONS",
    description: undefined,
    href: "/engineering/products/lighting-up-and-lifting-up-living-standards",
  },
  {
    label: "EPC ENERGY SERVICES",
    description: undefined,
    href: "/engineering/solar-epcm-services",
  },
  {
    label: "PROJECTS AND SERVICES",
    description: undefined,
    href: "/endeavors/project-portfolio",
  },
] as const;

/** Content shown after a panel badge is selected. The second entry mirrors
 * Figma node 7077:4218, the supplied expanded Energy state. */
const EXPANDED_PANELS = [
  {
    title: "About GREEN",
    titleLines: ["About GREEN"],
    description:
      "We are building a cleaner, more resilient future through practical renewable-energy solutions.",
    layout: {
      left: 520,
      top: 168,
      width: 540,
      bodyWidth: 500,
      bodyGap: 14,
      titleInset: 0,
      titleSize: 40,
      titleLineHeight: 49,
      bodySize: 13,
      bodyLineHeight: 22,
    },
  },
  {
    title: "Energy augmentation for industry transformation",
    titleLines: ["Energy", "Augmentation", "For Industry", "Transformation"],
    description:
      "From homes to industries, we provide an extensive spectrum of energy solutions designed to solve the underlying challenges and bring about beneficial transformations.",
    layout: {
      left: 760,
      top: 295,
      width: 430,
      bodyWidth: 350,
      bodyGap: 14,
      titleInset: 0,
      titleSize: 38,
      titleLineHeight: 46,
      bodySize: 12,
      bodyLineHeight: 19,
    },
  },
  {
    title: "Energy augmentation for industry transformation",
    titleLines: ["Energy", "Augmentation", "For Industry", "Transformation"],
    description:
      "From homes to industries, we provide an extensive spectrum of energy solutions designed to solve the underlying challenges and bring about beneficial transformations.",
    layout: {
      left: 760,
      top: 295,
      width: 430,
      bodyWidth: 350,
      bodyGap: 14,
      titleInset: 0,
      titleSize: 38,
      titleLineHeight: 46,
      bodySize: 12,
      bodyLineHeight: 19,
    },
  },
  {
    title: "Energy engineering from turnkey project deliveries",
    titleLines: ["Energy Engineering", "From Turnkey", "Project Deliveries"],
    description:
      "Energy Engineering for micro-grid to utility-scale solar energy generation and distribution / delivery, encompassing system design, procurement information, and installation of the entire commercial solar system. After delivering a completely functioning solar power plant, GREEN will continue to perform routine inspections and maintenance to ensure the solar system operates at peak efficiency.",
    layout: {
      left: 1150,
      top: 239,
      width: 470,
      bodyWidth: 320,
      bodyGap: 12,
      titleInset: 0,
      titleSize: 38,
      titleLineHeight: 46,
      bodySize: 12,
      bodyLineHeight: 19,
    },
  },
  {
    title: "Net Zero - An Innate Commitment",
    titleLines: ["Net Zero", "- An Innate", "Commitment"],
    description:
      'Achieving "net zero" carbon emissions is a crucial objective of GREEN. This means that it is necessary to remove CO2 from the atmosphere at the same rate at which it is released. Our target is to provide 100% carbon-free energy to all of our clients by the year 2050 through the utilization of renewable energy sources and environmentally sound business practices in all of the energy solutions we offer.',
    layout: {
      left: 1590,
      top: 222,
      width: 305,
      bodyWidth: 265,
      bodyGap: 10,
      titleInset: 0,
      titleSize: 38,
      titleLineHeight: 46,
      bodySize: 12,
      bodyLineHeight: 19,
    },
  },
] as const;

/** Mobile (G hidden): one letter per image on the left, its heading at the top-right inside
   the same diagonal section. Positions are vertical % within the 110vh background. */
const MOBILE_PANELS = [
  {
    letter: "R",
    heading: "About GREEN",
    headingTop: "24%",
    letterTop: "40%",
    letterLeft: "10%",
  },
  {
    letter: "E",
    heading: "Products and Solutions",
    headingTop: "44%",
    letterTop: "57%",
    letterLeft: "10%",
  },
  {
    letter: "E",
    heading: "EPC Energy Services",
    headingTop: "63%",
    letterTop: "76%",
    letterLeft: "10%",
  },
  {
    letter: "N",
    heading: "Projects and Services",
    headingTop: "81%",
    letterTop: "93%",
    letterLeft: "10%",
  },
] as const;

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

const D6Template = (_props: D6TemplateProps) => {
  const [isMobile, setIsMobile] = React.useState(false);
  const [viewportScale, setViewportScale] = React.useState({
    x: 1,
    y: 1,
  });
  const [expandedPanel, setExpandedPanel] = React.useState(1);
  const [transitioningTo, setTransitioningTo] = React.useState<number | null>(
    null,
  );
  const panelCopyTimer = React.useRef<ReturnType<typeof setTimeout> | null>(
    null,
  );

  React.useEffect(
    () => () => {
      if (panelCopyTimer.current) clearTimeout(panelCopyTimer.current);
    },
    [],
  );

  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setExpandedPanel(1);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const activatePanel = (index: number) => {
    // The G artwork is static; R, E1, E2 and N are accordion states.
    if (index === 0) return;

    // In the R frame, its active headline advances to the E1 frame. The
    // other active panels stay put, matching their "already active" state.
    const target =
      expandedPanel === index ? (index === 1 ? 2 : expandedPanel) : index;
    if (target === expandedPanel) return;

    if (panelCopyTimer.current) clearTimeout(panelCopyTimer.current);
    setTransitioningTo(target);
    setExpandedPanel(target);
    // Geometry moves for one second. Copy fades over the final 300ms so it
    // does not precede the diagonal panel, especially when returning to R.
    panelCopyTimer.current = setTimeout(() => setTransitioningTo(null), 700);
  };

  const itemTransform = (index: number) => {
    if (index === 0 || expandedPanel === 1 || index === expandedPanel)
      return "translateX(0)";
    const distance = Math.abs(index - expandedPanel);
    const direction = index < expandedPanel ? -1 : 1;
    return `translateX(${(direction * ACCORDION_SHIFT) / distance}px)`;
  };

  React.useEffect(() => {
    // The fixed 1920px composition needs a wide desktop viewport. Below this
    // point its diagonal panels would be cropped, so use the dedicated mobile art.
    const checkMobile = () => setIsMobile(window.innerWidth <= 1200);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  React.useEffect(() => {
    // Map the complete Figma frame to the available desktop viewport. Scaling
    // each axis keeps both the right edge and the bottom edge in view without
    // cropping or letterboxing on non-1920x970 aspect ratios.
    const updateViewportScale = () => {
      setViewportScale({
        x: window.innerWidth / DESIGN_W,
        y: window.innerHeight / DESIGN_H,
      });
    };

    updateViewportScale();
    window.addEventListener("resize", updateViewportScale);
    return () => window.removeEventListener("resize", updateViewportScale);
  }, []);

  if (isMobile) {
    return (
      <>
        <SiteHeader panel="logoOnly" />
        {/* Exact image aspect → diagonals land at fixed % on every device (no object-cover crop) */}
        <div className="relative w-screen overflow-hidden aspect-[360/800]">
          <img
            src="/images/d6/mobileBg.png"
            alt=""
            role="presentation"
            className="absolute inset-0 -z-10 h-full w-full"
          />
          <div className="mt-4">
            <img src="/images/d6/greenFuture.png" alt="" role="presentation" />
          </div>
          {/* G hidden. Each image: one letter on the left, its heading at the top-right inside. */}
          <div className="pointer-events-none absolute inset-0 z-0">
            {MOBILE_PANELS.map((p, i) => (
              <React.Fragment key={`m-${i}`}>
                <span
                  className="absolute block font-bold leading-tight text-white"
                  style={{
                    top: p.headingTop,
                    left: "52%",
                    maxWidth: 150,
                    fontSize: 16,
                    textShadow: "0px 2px 10px rgba(0,0,0,0.6)",
                  }}
                >
                  {p.heading}
                </span>
                <span
                  className="absolute block font-extrabold italic leading-none text-white"
                  style={{
                    top: p.letterTop,
                    left: p.letterLeft,
                    fontSize: 56,
                    textShadow: "0px 2px 12px rgba(0,0,0,0.55)",
                  }}
                >
                  {p.letter}
                </span>
              </React.Fragment>
            ))}
          </div>
          <D6Chatbot />
        </div>
      </>
    );
  }

  return (
    <>
      <div
        className="d6-route-shell relative w-full overflow-hidden bg-[#f5f5f5]"
        style={{ height: "100svh" }}
      >
        <div
          className={`home-page-d6${expandedPanel === 1 ? "" : " is-panel-expanded"}${transitioningTo === 1 ? " is-transitioning-to-r" : ""}`}
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            width: DESIGN_W,
            height: DESIGN_H,
            transform: `scale(${viewportScale.x}, ${viewportScale.y})`,
            transformOrigin: "top left",
          }}
        >
          {/* Use the shared Figma canvas header so the home navigation has the
              same 1920px spacing and offsets as every other canvas page. */}
          <SiteHeader layout="figmaCanvas" panel="logoOnly" />

          <div className="d6-left-corner-wash" aria-hidden />
          {FIGMA_LAYERS.panels.map((layer, i) => {
            const l = layer as typeof layer & {
              imgLeft?: number;
              imgTop?: number;
              imgWidth?: number;
              imgHeight?: number;
            };
            return (
              <img
                key={`panel-${i}`}
                src={layer.src}
                alt=""
                role="presentation"
                draggable={false}
                className="d6-static-art absolute select-none"
                style={{
                  left: l.imgLeft ?? layer.left,
                  top: l.imgTop ?? layer.top,
                  width: l.imgWidth ?? layer.width,
                  height: l.imgHeight ?? layer.height,
                  zIndex: layer.z,
                  objectFit: "cover",
                  clipPath:
                    i === 0
                      ? "polygon(35.4% 0, 100% 0, 14.7% 100%, 0 100%, 0 42.7%)"
                      : undefined,
                }}
              />
            );
          })}
          {FIGMA_LAYERS.diagonals.map((layer, i) => (
            <img
              key={`diag-${i}`}
              src={layer.src}
              alt=""
              role="presentation"
              draggable={false}
              className="d6-static-art absolute select-none"
              style={{
                left: layer.left,
                top: layer.top,
                width: layer.width,
                height: layer.height,
                zIndex: layer.z,
              }}
            />
          ))}

          {/* Approved Figma state composites. Their opacity interpolation
              reproduces the design's image cross-fade while copy and hit areas
              move with the shared gentle transition below. */}
          <div className="d6-live-art" aria-hidden="true">
            {EXPANDED_STATE_ART.map((state) => (
              <img
                key={state.panel}
                src={state.src}
                alt=""
                draggable={false}
                className={`d6-state-art${expandedPanel === state.panel ? " is-active" : ""}`}
              />
            ))}
          </div>

          {/* Full-panel hit targets preserve the Figma accordion behaviour even
              when a composite supplies the visible letters in an expanded state. */}
          {[1, 2, 3, 4].map((index) => (
            <button
              key={`panel-hit-${index}`}
              type="button"
              className="d6-panel-hit"
              onClick={() => activatePanel(index)}
              aria-label={`Show ${PANELS[index].label}`}
              aria-expanded={expandedPanel === index}
              style={panelHitGeometry(
                index,
                PANEL_EDGES[expandedPanel] ?? PANEL_EDGES[1],
              )}
            />
          ))}

          {/* GREEN letters — photo panels only; letters rendered once on shared baseline */}
          {GREEN_LETTERS.map((letter, i) => (
            <button
              key={`letter-${i}`}
              type="button"
              className="d6-badge absolute select-none"
              onClick={() => activatePanel(i)}
              aria-label={`Show ${PANELS[i].label}`}
              aria-expanded={expandedPanel === i}
              aria-disabled={i === 0}
              style={{
                left: letter.left,
                bottom: LETTER_BASELINE,
                width: letter.width,
                zIndex: 20,
                transform: itemTransform(i),
                opacity: expandedPanel === 1 || i === 0 ? 1 : 0,
              }}
            >
              <img
                src={letter.src}
                alt=""
                role="presentation"
                draggable={false}
              />
            </button>
          ))}

          {/* Figma green wedge — top-left corner behind logo */}
          <div className="d6-green-corner" style={{ zIndex: 12 }} aria-hidden />

          {/* Each panel's heading + description clipped to its own image bounds */}
          {PANELS.map((panelContent, i) => {
            const panel = FIGMA_LAYERS.panels[i];
            const copy = PANEL_COPY[i];
            const isCollapsedPanel = i > 0 && expandedPanel !== i;
            const isCollapsedAbout = i === 1 && isCollapsedPanel;
            const label = isCollapsedAbout ? "ABOUT GREEN" : panelContent.label;
            // Collapsed labels share the same visual row in the Figma states.
            // R's active Renewable heading sits higher, so About GREEN needs a
            // separate collapsed-only Y position.
            const headlineTop = isCollapsedAbout ? 377 : copy.headlineTop;
            const headlineVisualMidY =
              panel.top +
              headlineTop +
              (COLLAPSED_LABEL_LINES[i] * COLLAPSED_LABEL_LINE_HEIGHT) / 2;
            const headlineLeft = isCollapsedPanel
              ? centeredPanelHeadingLeft(
                  i,
                  headlineVisualMidY,
                  isCollapsedAbout ? 190 : copy.headlineWidth,
                  PANEL_EDGES[expandedPanel] ?? PANEL_EDGES[1],
                ) - panel.left
              : copy.headlineLeft;
            const detailHref = isCollapsedAbout
              ? "/explore/welcome-to-green"
              : panelContent.href;
            return (
              <div
                key={`${i}-${panelContent.href}`}
                className={`panel-copy-zone d6-panel-copy--${i}`}
                style={{
                  left: panel.left,
                  top: panel.top,
                  width: panel.width,
                  height: panel.height,
                  zIndex: 30,
                  clipPath: panelCopyClipPath(
                    i,
                    PANEL_EDGES[expandedPanel] ?? PANEL_EDGES[1],
                    panel.left,
                  ),
                  transform: isCollapsedPanel
                    ? "translateX(0)"
                    : itemTransform(i),
                  opacity: expandedPanel === i && i >= 2 ? 0 : 1,
                }}
              >
                {isCollapsedPanel ? (
                  <Link
                    href={detailHref}
                    className={`d6-panel-link ${copy.headlineStyle}${isCollapsedAbout ? " panel-headline-about" : ""}`}
                    aria-label={`Go to ${label}`}
                    style={{
                      left: headlineLeft,
                      top: headlineTop,
                      width: isCollapsedAbout ? 190 : copy.headlineWidth,
                    }}
                  >
                    {stackHeadline(label)}
                  </Link>
                ) : (
                  <button
                    type="button"
                    onClick={() => activatePanel(i)}
                    className={`d6-panel-link ${copy.headlineStyle}`}
                    aria-expanded={expandedPanel === i}
                    aria-disabled={i === 0}
                    style={{
                      left: headlineLeft,
                      top: headlineTop,
                      width: copy.headlineWidth,
                    }}
                  >
                    {stackHeadline(label)}
                  </button>
                )}
                {panelContent.description && expandedPanel === 1 && (
                  <p
                    className="panel-desc"
                    style={{
                      left: copy.descLeft,
                      top: copy.descTop,
                      width: copy.descWidth,
                    }}
                  >
                    {panelContent.description}
                  </p>
                )}
              </div>
            );
          })}

          {expandedPanel >= 2 && (
            <section
              key={expandedPanel}
              className={`d6-expanded-copy d6-expanded-copy--${expandedPanel}`}
              aria-live="polite"
              style={
                {
                  left: EXPANDED_PANELS[expandedPanel].layout.left,
                  top: EXPANDED_PANELS[expandedPanel].layout.top,
                  width: EXPANDED_PANELS[expandedPanel].layout.width,
                  "--d6-copy-body-width": `${EXPANDED_PANELS[expandedPanel].layout.bodyWidth}px`,
                  "--d6-copy-body-gap": `${EXPANDED_PANELS[expandedPanel].layout.bodyGap}px`,
                  "--d6-copy-title-inset": `${EXPANDED_PANELS[expandedPanel].layout.titleInset}px`,
                  "--d6-copy-title-size": `${EXPANDED_PANELS[expandedPanel].layout.titleSize}px`,
                  "--d6-copy-title-line-height": `${EXPANDED_PANELS[expandedPanel].layout.titleLineHeight}px`,
                  "--d6-copy-body-size": `${EXPANDED_PANELS[expandedPanel].layout.bodySize}px`,
                  "--d6-copy-body-line-height": `${EXPANDED_PANELS[expandedPanel].layout.bodyLineHeight}px`,
                } as React.CSSProperties
              }
            >
              <div>
                <h2 aria-label={EXPANDED_PANELS[expandedPanel].title}>
                  {EXPANDED_PANELS[expandedPanel].titleLines.map((line) => (
                    <span key={line}>{line}</span>
                  ))}
                </h2>
                <p>{EXPANDED_PANELS[expandedPanel].description}</p>
              </div>
            </section>
          )}

          <div className="d6-fixed-right-wedge" aria-hidden="true" />
          <div className="group-1171280893" style={{ zIndex: 20 }}>
            <img
              src="/images/d6/companysnapshot.png"
              alt="Company snapshots in 90 seconds"
              className="company-snapshots-art"
              draggable={false}
            />
          </div>

          <D6Chatbot
            canvasAnchored
            triggerVariant="figmaCanvas"
            figmaPlaceholder="Let's Talk Energy"
          />
        </div>
      </div>
    </>
  );
};

export default D6Template;
