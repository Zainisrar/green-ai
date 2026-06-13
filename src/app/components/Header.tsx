"use client";

import React from "react";
import { HeaderButtons } from "./ui/gradient-button";
import Link from "next/link";
import { useInteractiveZIndex } from "@/hooks/useInteractiveZIndex";

export interface SlideProps {
  slug?: string; // Add slug for linking
  title: React.ReactNode;
  description: string;
  backgroundImage: string;
  keys: Array<{
    icon: React.ReactNode;
    description: string;
  }>;
  cta: {
    button1: React.ReactNode;
    link1: string;
    button2: React.ReactNode;
    link2: string;
  };
  logo: string;
  carouselLeft: React.ReactNode;
  carouselRight: React.ReactNode;
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
      className="relative w-full min-h-screen  flex flex-col justify-between text-white transition-[background-image] duration-700"
      style={{
        backgroundImage: `url("${slide.backgroundImage}")`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* add the background black shadow layer also */}
      <div className="absolute inset-0 bg-black/50 lg:bg-black/70 z-0"></div>
      <div key={current} className="relative w-full h-full flex flex-col justify-between z-10 animate-fadeIn">
        <div className="absolute lg:top-8 md:top-6 lg:right-12 z-10 top-4 left-4  lg:left-auto">
          <a href="/">
            <img
              src={slide.logo}
              alt="Logo"
              className="h-12 md:h-16 lg:h-20 w-auto"
            />
          </a>
        </div>

        <div className="flex flex-col lg:px-24   px-6 h-full pt-20 md:pt-28 lg:pt-32 ">
          {slide.slug ? (
            <Link href={`/insights/${slide.slug}`} className="cursor-pointer hover:opacity-90 transition-opacity">
              <div className="">{slide.title}</div>
            </Link>
          ) : (
            <div className="">{slide.title}</div>
          )}
          <p className="  md:text-[20px] lg:text-[25px] font-light font-sans  my-4 lg:my-4 drop-shadow">
            {slide.description}
          </p>
          {/* Key Stats/Icons */}
          <div
            className={` w-full  flex flex-col lg:flex-row lg:justify-center  z-10 ${
              slide.description ==
              "Therefore, endeavored to provide individuals and communities with sustainable energy solutions. Our mission is to encourage the adoption of renewable energy and contribute to a cleaner, greener future for all.."
                ? "lg:gap-2 2xl:gap-72"
                : "lg:gap-2 2xl:gap-32"
            }`}
          >
            {slide.keys.map((key, idx) => (
              <div
                key={idx}
                className="flex md:flex-col  w-full lg:flex-col my-4   px-4  items-center"
              >
                <div className="mb-2">{key.icon}</div>
                <span className="font-bold  md:text-center mx-4  md:text-2xl 2xl:text-lg lg:text-xl mb-1 flex flex-col lg:items-center">
                  {key.description}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div {...prevButtonProps.getContainerProps()} className="absolute left-4 md:left-8 top-1/2 lg:top-1/2 z-50 transform -translate-y-1/2">
          <button
            onClick={goPrev}
            className="bg-black/40 rounded-full p-3 z-20 cursor-pointer hover:bg-white transition"
            aria-label="Previous Slide"
          >
            {slide.carouselLeft}
          </button>
        </div>
        <div {...nextButtonProps.getContainerProps()} className="absolute right-4 md:right-8 top-1/2 lg:top-1/2 z-50 transform -translate-y-1/2">
          <button
            onClick={goNext}
            className="bg-black/40 rounded-full p-3 z-20 cursor-pointer hover:bg-white transition"
            aria-label="Next Slide"
          >
            {slide.carouselRight}
          </button>
        </div>

        {/* CTA Buttons */}
        <div className="flex justify-center lg:justify-end lg:mt-20 lg:my-auto md:my-10 gap-4 z-10 px-6 lg:px-0">
          <div {...cta1Props.getContainerProps()}>
            <Link href={slide.cta.link1} className="relative">
              <div className="absolute top-1/3 left-8 lg:left-20 flex text-black lg:text-xl font-bold">
                {slide.cta.button1}
                <img src="/images/heroSection/arrowIcn.png" className="lg:ml-4 h-3 ml-2 lg:h-5 mt-1" alt="icn" />
              </div>
              <div className="w-44 lg:w-72">
                <img src="/images/heroSection/btn.png" alt="button" />
              </div>
            </Link>
          </div>
          <div {...cta2Props.getContainerProps()}>
            <Link href={slide.cta.link2} className="relative">
              <div className="absolute top-1/3 left-10 lg:left-24 text-black flex lg:text-xl font-bold">
                {slide.cta.button2}
                <img src="/images/heroSection/arrowIcn.png" className="lg:ml-10 h-3 ml-5 lg:h-5 mt-1" alt="icn" />
              </div>
              <div className="w-44 lg:w-72 flex space-x-4 items-center">
                <img src="/images/heroSection/btn.png" alt="button" />
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
