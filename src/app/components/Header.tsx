"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useInteractiveZIndex } from "@/hooks/useInteractiveZIndex";

export interface KeyItem {
  icon: React.ReactNode | string;
  description: string;
}

export interface SlideProps {
  id?: number;
  slug?: string;
  headline?: string;
  subheadline?: string;
  highlighted?: string;
  title?: React.ReactNode;
  description: string;
  backgroundImage: string;
  tag?: string;
  keys: KeyItem[];
  cta: {
    button1: React.ReactNode | string;
    link1: string;
    button2: React.ReactNode | string;
    link2: string;
  };
  logo?: string;
  carouselLeft?: React.ReactNode;
  carouselRight?: React.ReactNode;
  /** Desktop offsets derived from the individual Figma slider frames. */
  contentTop?: string;
  keysTop?: string;
  descriptionMarginTop?: string;
}

interface HeaderProps {
  slides: SlideProps[];
}

const Header: React.FC<HeaderProps> = ({ slides }) => {
  const [current, setCurrent] = React.useState(0);
  const slide = slides && slides.length > 0 ? slides[current] : null;
  const prevButtonProps = useInteractiveZIndex();
  const nextButtonProps = useInteractiveZIndex();
  const cta1Props = useInteractiveZIndex();
  const cta2Props = useInteractiveZIndex();
  const [paused, setPaused] = React.useState(false);

  const goPrev = () =>
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  const goNext = () =>
    setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));

  // Auto-advance the carousel; pause on hover.
  React.useEffect(() => {
    if (paused || !slides || slides.length <= 1) return;
    const id = setInterval(() => {
      setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(id);
  }, [paused, slides]);

  if (!slide) return null;

  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      className="relative flex min-h-[100svh] h-auto md:h-[100dvh] w-full flex-col justify-between overflow-x-hidden overflow-y-auto md:overflow-hidden font-sans text-white transition-[background-image] duration-700 md:select-none"
      style={{
        backgroundImage: `url("${slide.backgroundImage}")`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Background dark overlay matching Figma linear gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70 z-0"></div>
      <Link
        href="/home/renewable-energy-the-core"
        className="absolute right-4 top-3 z-[60] block w-[clamp(130px,36vw,200px)] md:right-[1.46vw] md:top-[2.01dvh] md:w-[clamp(120px,19.53vw,375px)]"
        aria-label="GREEN home"
      >
        <Image
          src="/images/heroSection/logo.png"
          alt="GREEN — Future: Envisioned"
          width={375}
          height={98}
          priority
        />
      </Link>

      <div
        key={current}
        className="relative w-full h-auto md:h-full min-h-[100svh] z-10 animate-fadeIn overflow-x-hidden overflow-y-visible md:overflow-hidden flex flex-col justify-between"
      >
        {/* Main Content Area */}
        <div
          className="header-content-area relative left-auto top-auto w-full px-5 pt-20 pb-4 md:absolute md:left-[6.04vw] md:w-[82.19vw] md:px-0 md:pt-0 md:pb-0"
          style={{
            "--desktop-content-top": slide.contentTop || "14.74dvh",
          } as React.CSSProperties}
        >
          {/* Main Title (Headline) */}
          {slide.headline ? (
            <div className="text-left text-[clamp(28px,3.96vw,76px)] font-bold leading-[1.05] tracking-tight text-white uppercase drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]">
              {slide.headline}
            </div>
          ) : slide.slug ? (
            <Link
              href={`/insights/${slide.slug}`}
              className="cursor-pointer hover:opacity-90 transition-opacity"
            >
              <div className="drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]">
                {slide.title}
              </div>
            </Link>
          ) : (
            <div className="drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]">
              {slide.title}
            </div>
          )}

          {/* Subheadline with Highlighted Term */}
          {slide.subheadline && (
            <div className="mt-3 md:mt-[3.4dvh] text-left text-[clamp(18px,2.34vw,45px)] font-extrabold leading-[1.0] text-white italic uppercase drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]">
              {(() => {
                if (
                  !slide.highlighted ||
                  slide.subheadline.trim().toLowerCase() ===
                    slide.highlighted.trim().toLowerCase()
                ) {
                  return (
                    <span className="text-[#23B14D] not-italic font-black uppercase">
                      {slide.subheadline}
                    </span>
                  );
                }
                const parts = slide.subheadline.split(
                  new RegExp(`(${slide.highlighted})`, "gi"),
                );
                return parts.map((part, idx) =>
                  part.toLowerCase() === slide.highlighted?.toLowerCase() ? (
                    <span
                      key={idx}
                      className="text-[#23B14D] not-italic font-black uppercase mx-1"
                    >
                      {part}
                    </span>
                  ) : (
                    <React.Fragment key={idx}>{part}</React.Fragment>
                  ),
                );
              })()}
            </div>
          )}

          {/* Description */}
          <p
            className="header-description w-full max-w-none text-[clamp(14px,1.3vw,25px)] leading-[1.35] font-normal text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)] mt-3 md:mt-0 md:max-w-[82.19vw]"
            style={{
              "--desktop-desc-margin-top":
                slide.descriptionMarginTop || "5.5dvh",
            } as React.CSSProperties}
          >
            {slide.description}
          </p>

          {/* Key Stats / Column Icons */}
          <div
            className={`header-keys-area relative left-auto top-auto w-full mt-6 grid items-start justify-items-center gap-4 md:absolute md:left-[-0.3vw] md:w-[88vw] md:gap-0 ${
              slide.keys.length >= 4
                ? "grid-cols-2 md:grid-cols-4"
                : "grid-cols-2 md:grid-cols-3"
            }`}
            style={{
              "--desktop-keys-top": slide.keysTop || "37.7dvh",
            } as React.CSSProperties}
          >
            {slide.keys.map((key, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center text-center max-w-sm px-1"
              >
                <div className="mb-2 md:mb-[1dvh] flex h-14 w-14 sm:h-16 sm:w-16 md:h-[clamp(56px,5.8vw,110px)] md:w-[clamp(56px,5.8vw,110px)] items-center justify-center">
                  {typeof key.icon === "string" ? (
                    <img
                      loading="lazy"
                      decoding="async"
                      className="max-h-full max-w-full object-contain filter drop-shadow-[0_4px_12px_rgba(0,0,0,0.3)]"
                      src={key.icon}
                      alt="icon"
                    />
                  ) : (
                    key.icon
                  )}
                </div>
                <span
                  className={`font-black text-center text-white leading-snug drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)] ${
                    slide.keys.length >= 4
                      ? "max-w-[310px] text-[12px] sm:text-[14px] md:text-[clamp(13px,1.15vw,20px)]"
                      : "max-w-[360px] text-[12px] sm:text-[14px] md:text-[clamp(14px,1.25vw,22px)]"
                  }`}
                >
                  {key.description}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom right Figma CTA buttons. */}
        <div className="relative inset-x-auto top-auto z-20 mt-8 mb-12 px-5 flex justify-center md:absolute md:inset-x-auto md:top-auto md:right-[3.35vw] md:bottom-[max(4.2dvh,2rem)] md:mt-0 md:mb-0 md:px-0 md:flex md:justify-end">
          <div className="flex items-center justify-center flex-wrap gap-3 md:gap-[1.1vw]">
            {/* Button 1 */}
            <div {...cta1Props.getContainerProps()}>
              <Link
                href={slide.cta.link1}
                className="group relative inline-flex h-[48px] sm:h-[54px] md:h-[clamp(60px,4.5vw,74px)] w-[clamp(135px,40vw,165px)] md:w-[clamp(210px,16vw,260px)] min-w-[130px] cursor-pointer items-center justify-center transition-transform hover:scale-[1.02] active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#23D14B]"
              >
                <img
                  src="/images/insight1/figma/slider/slider-cta.svg"
                  alt=""
                  aria-hidden="true"
                  className="pointer-events-none absolute -left-[5.77%] -top-[19.31%] h-[146.77%] w-[113.88%] max-w-none"
                />
                <div className="relative z-10 flex items-center gap-2 md:gap-2.5 px-3 text-[13px] sm:text-[14px] md:text-[clamp(15px,1.15vw,19px)] font-semibold text-black italic capitalize whitespace-nowrap">
                  <span>
                    {typeof slide.cta.button1 === "string"
                      ? slide.cta.button1
                      : slide.cta.button1}
                  </span>
                  <svg
                    aria-hidden="true"
                    className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-[18px] md:h-[18px] stroke-black stroke-[2.8] transition-transform group-hover:translate-x-1"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.25 4.5l7.5 7.5-7.5 7.5"
                    />
                  </svg>
                </div>
              </Link>
            </div>

            {/* Button 2 */}
            <div {...cta2Props.getContainerProps()}>
              <Link
                href={slide.cta.link2}
                className="group relative inline-flex h-[48px] sm:h-[54px] md:h-[clamp(60px,4.5vw,74px)] w-[clamp(135px,40vw,165px)] md:w-[clamp(210px,16vw,260px)] min-w-[130px] cursor-pointer items-center justify-center transition-transform hover:scale-[1.02] active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#23D14B]"
              >
                <img
                  src="/images/insight1/figma/slider/slider-cta.svg"
                  alt=""
                  aria-hidden="true"
                  className="pointer-events-none absolute -left-[5.77%] -top-[19.31%] h-[146.77%] w-[113.88%] max-w-none"
                />
                <div className="relative z-10 flex items-center gap-2 md:gap-2.5 px-3 text-[13px] sm:text-[14px] md:text-[clamp(15px,1.15vw,19px)] font-semibold text-black italic capitalize whitespace-nowrap">
                  <span>
                    {typeof slide.cta.button2 === "string"
                      ? slide.cta.button2
                      : slide.cta.button2}
                  </span>
                  <svg
                    className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-[18px] md:h-[18px] stroke-black stroke-[2.8] transition-transform group-hover:translate-x-1"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.25 4.5l7.5 7.5-7.5 7.5"
                    />
                  </svg>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Carousel Navigation Chevron Arrows (Left & Right) */}
      <div className="pointer-events-none absolute inset-x-0 top-[24%] md:top-[48.35dvh] z-50 flex justify-between px-1 md:px-[2.13vw]">
        <div
          {...prevButtonProps.getContainerProps()}
          className="pointer-events-auto"
        >
          <button
            type="button"
            onClick={goPrev}
            className="p-1 md:p-2 cursor-pointer hover:scale-125 transition-transform border-0 bg-transparent filter drop-shadow-[0_0_8px_rgba(35,209,75,0.6)]"
            aria-label="Previous Slide"
          >
            <svg
              className="w-8 h-10 md:w-10 md:h-12 text-[#23B14D] stroke-[4]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5L8.25 12l7.5-7.5"
              />
            </svg>
          </button>
        </div>
        <div
          {...nextButtonProps.getContainerProps()}
          className="pointer-events-auto"
        >
          <button
            type="button"
            onClick={goNext}
            className="p-1 md:p-2 cursor-pointer hover:scale-125 transition-transform border-0 bg-transparent filter drop-shadow-[0_0_8px_rgba(35,209,75,0.6)]"
            aria-label="Next Slide"
          >
            <svg
              className="w-8 h-8 md:w-10 md:h-12 text-[#23B14D] stroke-[4]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 4.5l7.5 7.5-7.5 7.5"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
