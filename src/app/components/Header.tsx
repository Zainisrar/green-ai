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
  figmaExport?: boolean;
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

  if (slide.figmaExport) {
    return (
      <div
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        className="relative h-[100dvh] min-h-[100svh] w-full overflow-hidden bg-cover bg-center"
        style={{ backgroundImage: `url("${slide.backgroundImage}")` }}
      >
        <section className="sr-only" aria-label={`${slide.headline} insight`}>
          <h1>{slide.headline}</h1>
          {slide.subheadline ? <p>{slide.subheadline}</p> : null}
          <p>{slide.description}</p>
          {slide.keys.length > 0 ? (
            <ul>
              {slide.keys.map((key) => (
                <li key={key.description}>{key.description}</li>
              ))}
            </ul>
          ) : null}
          {slide.tag ? <p>{slide.tag}</p> : null}
        </section>
        <Link
          href={slide.cta.link1}
          aria-label={`Read more: ${slide.headline}`}
          className="absolute left-[60.89vw] top-[84.23vh] z-10 h-[10.1vh] w-[17.7vw] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#23B14D]"
        />
        <Link
          href={slide.cta.link2}
          aria-label={`Explore: ${slide.headline}`}
          className="absolute left-[78.96vw] top-[84.23vh] z-10 h-[10.1vh] w-[17.7vw] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#23B14D]"
        />
        <button
          type="button"
          onClick={goPrev}
          aria-label="Previous slide"
          className="absolute left-[2.13vw] top-[48.35vh] z-10 h-[4vh] w-[3vw] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#23B14D]"
        />
        <button
          type="button"
          onClick={goNext}
          aria-label="Next slide"
          className="absolute right-[2.13vw] top-[48.35vh] z-10 h-[4vh] w-[3vw] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#23B14D]"
        />
      </div>
    );
  }

  const categoryTag =
    slide.tag || `# Mining Insight 0${slide.id || current + 1}`;
  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      className="relative flex h-[100dvh] min-h-[100svh] w-full flex-col justify-between overflow-hidden font-sans text-white transition-[background-image] duration-700 select-none"
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
        className="absolute right-[1.46vw] top-[2.01dvh] z-[60] block w-[clamp(120px,19.53vw,375px)]"
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
        className="relative w-full h-full z-10 animate-fadeIn overflow-hidden"
      >
        {/* Main Content Area */}
        <div className="absolute left-[6.04vw] top-[14.74dvh] w-[82.19vw] max-md:right-5 max-md:left-5 max-md:top-[14svh] max-md:w-auto">
          {/* Main Title (Headline) */}
          {slide.headline ? (
            <div className="text-left text-[clamp(30px,3.96vw,76px)] font-bold leading-[1.05] tracking-tight text-white uppercase drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]">
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
            <div className="mt-[3.4dvh] text-left text-[clamp(20px,2.34vw,45px)] font-extrabold leading-[0.9] text-white italic uppercase drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]">
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
          <p className="mt-[5.5dvh] max-w-[82.19vw] text-[clamp(15px,1.3vw,25px)] leading-[1.2] font-normal text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)] max-md:max-w-none">
            {slide.description}
          </p>

          {/* Key Stats / Column Icons */}
          <div
            className={`absolute left-[-0.3vw] top-[38.6dvh] grid w-[88vw] items-start justify-items-center gap-0 max-md:relative max-md:left-auto max-md:top-auto max-md:mt-[5dvh] max-md:w-full max-md:gap-3 ${
              slide.keys.length >= 4
                ? "grid-cols-2 lg:grid-cols-4"
                : "grid-cols-3"
            }`}
          >
            {slide.keys.map((key, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center text-center max-w-sm"
              >
                <div className="mb-[1.5dvh] flex h-[clamp(48px,7vw,135px)] w-[clamp(48px,7vw,135px)] items-center justify-center">
                  {typeof key.icon === "string" ? (
                    <img loading="lazy" decoding="async"
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
                      ? "max-w-[340px] text-[clamp(12px,1.15vw,22px)]"
                      : "text-[clamp(12px,1.3vw,25px)]"
                  }`}
                >
                  {key.description}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Section: Tag on Left, CTA Buttons on Right */}
        <div className="absolute inset-x-0 top-[84.2dvh] z-20 max-md:top-auto max-md:bottom-4">
          {/* Bottom Left Parallelogram Skewed Tag */}
          <div
            style={{
              width: "371px",
              height: "41px",
              background: "rgba(169, 163, 163, 0.3)",
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.25)",
              backdropFilter: "blur(7.5px)",
              WebkitBackdropFilter: "blur(7.5px)",
            }}
            className="absolute left-[1vw] flex shrink-0 transform items-center justify-center border-0 border-none -skew-x-[45deg] max-md:hidden"
          >
            <div className="transform skew-x-[45deg] font-semibold italic text-base md:text-lg lg:text-[25px] text-black tracking-wide whitespace-nowrap">
              {categoryTag}
            </div>
          </div>

          {/* Bottom Right CTA Buttons (Parallelogram Skewed Glassmorphism Buttons) */}
          <div className="absolute right-[3.35vw] flex items-center gap-[1.1vw] max-md:right-4 max-md:left-4 max-md:justify-end max-md:gap-2">
            {/* Button 1 */}
            <div {...cta1Props.getContainerProps()}>
              <Link
                href={slide.cta.link1}
                style={{
                  background:
                    "linear-gradient(26.97deg, rgba(35, 209, 75, 0.228) 17.38%, rgba(255, 229, 0, 0.21) 75.79%), rgba(255, 255, 255, 0.5)",
                  boxShadow: "4px 4px 20px rgba(93, 223, 60, 0.25)",
                  backdropFilter: "blur(7.5px)",
                }}
                className="group relative inline-flex h-[clamp(48px,10.1dvh,108px)] w-[min(17.7vw,340px)] min-w-[150px] transform cursor-pointer items-center justify-center border border-white/60 transition-all -skew-x-[20deg] hover:scale-[1.02] hover:brightness-110"
              >
                <div className="flex transform items-center gap-3 text-[clamp(14px,1.46vw,28px)] font-semibold text-black italic capitalize whitespace-nowrap skew-x-[20deg] max-md:gap-1">
                  <span>
                    {typeof slide.cta.button1 === "string"
                      ? slide.cta.button1
                      : slide.cta.button1}
                  </span>
                  <svg
                    className="w-5 h-5 lg:w-7 lg:h-7 stroke-black stroke-[3.5] transition-transform group-hover:translate-x-1"
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
                style={{
                  background:
                    "linear-gradient(26.97deg, rgba(35, 209, 75, 0.228) 17.38%, rgba(255, 229, 0, 0.21) 75.79%), rgba(255, 255, 255, 0.5)",
                  boxShadow: "4px 4px 20px rgba(93, 223, 60, 0.25)",
                  backdropFilter: "blur(7.5px)",
                }}
                className="group relative inline-flex h-[clamp(48px,10.1dvh,108px)] w-[min(17.7vw,340px)] min-w-[150px] transform cursor-pointer items-center justify-center border border-white/60 transition-all -skew-x-[20deg] hover:scale-[1.02] hover:brightness-110"
              >
                <div className="flex transform items-center gap-3 text-[clamp(14px,1.46vw,28px)] font-semibold text-black italic capitalize whitespace-nowrap skew-x-[20deg] max-md:gap-1">
                  <span>
                    {typeof slide.cta.button2 === "string"
                      ? slide.cta.button2
                      : slide.cta.button2}
                  </span>
                  <svg
                    className="w-5 h-5 lg:w-7 lg:h-7 stroke-black stroke-[3.5] transition-transform group-hover:translate-x-1"
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
      <div className="pointer-events-none absolute inset-x-0 top-[48.35dvh] z-50 flex justify-between px-[2.13vw]">
        <div
          {...prevButtonProps.getContainerProps()}
          className="pointer-events-auto"
        >
          <button
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
