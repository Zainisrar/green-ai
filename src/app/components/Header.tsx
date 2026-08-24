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
        className="relative h-screen w-full overflow-hidden bg-cover bg-center"
        style={{ backgroundImage: `url("${slide.backgroundImage}")` }}
      >
        <Link
          href={slide.cta.link1}
          aria-label={`Read more: ${slide.headline}`}
          className="absolute left-[60.89vw] top-[84.23vh] z-10 h-[10.1vh] w-[17.7vw]"
        />
        <Link
          href={slide.cta.link2}
          aria-label={`Explore: ${slide.headline}`}
          className="absolute left-[78.96vw] top-[84.23vh] z-10 h-[10.1vh] w-[17.7vw]"
        />
        <button
          type="button"
          onClick={goPrev}
          aria-label="Previous slide"
          className="absolute left-[2.13vw] top-[48.35vh] z-10 h-[4vh] w-[3vw]"
        />
        <button
          type="button"
          onClick={goNext}
          aria-label="Next slide"
          className="absolute right-[2.13vw] top-[48.35vh] z-10 h-[4vh] w-[3vw]"
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
      className="relative w-full h-screen max-h-screen flex flex-col justify-between text-white transition-[background-image] duration-700 font-sans overflow-hidden select-none"
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
        className="absolute right-[1.46vw] top-[2.01vw] z-[60] block w-[min(19.53vw,375px)]"
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
        <div className="absolute left-[6.04vw] top-[14.74vh] w-[82.19vw]">
          {/* Main Title (Headline) */}
          {slide.headline ? (
            <div className="text-left uppercase font-bold text-[min(3.96vw,76px)] text-white tracking-tight leading-[1.05] drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]">
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
            <div className="mt-[3.4vh] text-left font-extrabold italic uppercase text-[min(2.34vw,45px)] text-white leading-[0.8] drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]">
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
          <p className="mt-[5.5vh] font-normal text-[min(1.3vw,25px)] text-white leading-[1.2] max-w-[82.19vw] drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]">
            {slide.description}
          </p>

          {/* Key Stats / Column Icons */}
          <div
            className={`absolute left-[-0.3vw] top-[38.6vh] w-[88vw] grid gap-0 justify-items-center items-start ${
              slide.keys.length >= 4
                ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
                : "grid-cols-1 md:grid-cols-3"
            }`}
          >
            {slide.keys.map((key, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center text-center max-w-sm"
              >
                <div className="h-[min(7vw,135px)] w-[min(7vw,135px)] flex items-center justify-center mb-[1.5vh]">
                  {typeof key.icon === "string" ? (
                    <img
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
                      ? "text-[min(1.15vw,22px)] max-w-[340px]"
                      : "text-[min(1.3vw,25px)]"
                  }`}
                >
                  {key.description}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Section: Tag on Left, CTA Buttons on Right */}
        <div className="absolute inset-x-0 top-[84.2vh] z-20">
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
            className="absolute left-[1vw] transform -skew-x-[45deg] flex items-center justify-center border-0 border-none shrink-0"
          >
            <div className="transform skew-x-[45deg] font-semibold italic text-base md:text-lg lg:text-[25px] text-black tracking-wide whitespace-nowrap">
              {categoryTag}
            </div>
          </div>

          {/* Bottom Right CTA Buttons (Parallelogram Skewed Glassmorphism Buttons) */}
          <div className="absolute right-[3.35vw] flex items-center gap-[1.1vw]">
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
                className="group relative inline-flex h-[10.1vh] w-[17.7vw] items-center justify-center transform -skew-x-[20deg] border border-white/60 hover:scale-[1.02] hover:brightness-110 transition-all cursor-pointer"
              >
                <div className="transform skew-x-[20deg] flex items-center gap-3 font-semibold italic text-lg lg:text-2xl 2xl:text-[28px] text-black capitalize whitespace-nowrap">
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
                className="group relative inline-flex h-[10.1vh] w-[17.7vw] items-center justify-center transform -skew-x-[20deg] border border-white/60 hover:scale-[1.02] hover:brightness-110 transition-all cursor-pointer"
              >
                <div className="transform skew-x-[20deg] flex items-center gap-3 font-semibold italic text-lg lg:text-2xl 2xl:text-[28px] text-black capitalize whitespace-nowrap">
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
      <div className="pointer-events-none absolute inset-x-0 top-[48.35vh] z-50 flex justify-between px-[2.13vw]">
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
