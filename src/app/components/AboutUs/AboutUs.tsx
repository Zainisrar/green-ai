"use client";

import React, { useEffect, useState } from "react";
import D6TopNavigation from "../d6TopNav";
import Chatbot from "../Chatbot";
import D6Chatbot from "../D6Chatbot";
import { useAboutUs } from "../../../hooks/useAboutUs";
import { parseAboutUsContent, parseQuoteContent } from "../../utils/htmlParser";
import "../../home.css";

const AboutUs = () => {
  const [desktopScale, setDesktopScale] = useState(1);
  // Fetch AboutUs data
  const { aboutUsData } = useAboutUs();
  
  // Parse content when data is available
  const parsedContent = aboutUsData ? parseAboutUsContent(aboutUsData.content) : null;
  const parsedQuote = aboutUsData ? parseQuoteContent(aboutUsData.quote) : null;

  const aboutParagraphs = parsedContent?.aboutGreenParagraphs ?? [
    "GREEN Limited - A Front-runner in sustainable living and Renewable Energy Solution Provider in Papua New Guinea has its global presence in the INDIA, USA and Australia helps to bring out the best of Product design, development and Project delivery strategies, prompt service and a support matrix more suitable to PNG with world class standards. GREEN Limited is an ISO 9001 certified company and complies with all the international standards and quality management methodologies.",
    "We are committed to enhancing and empowering lives through our energy solutions envisioned to end the energy-dependency for a sustainable and promising future.",
    "At GREEN, with a Global perspective bestows the finest solutions to Enable, Empower and Energize the drive for a sustainable future with our solutions for a better quality of life.",
  ];
  const whatParagraphs = parsedContent?.whatDoesGreenParagraphs ?? [
    "GREEN Limited renewable energy solutions and services are primarily focused at rural areas without access to conventional sources of energy or utilities. Our products and solutions are primarily intended to empower rural communities for economic and social growth, to enrich a sustainable and healthier quality of life. Our solutions, products and services delivery ensures that are environmental value addition.",
  ];

  useEffect(() => {
    const updateScale = () => {
      setDesktopScale(Math.max(window.innerWidth / 1920, window.innerHeight / 970));
    };

    updateScale();
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, []);

  return (
    <React.Fragment>
      <div className="relative min-h-screen overflow-hidden bg-white">

        {/* Mobile Layout */}
        <div className="relative z-10 px-4 py-6 md:hidden">
          {/* Clean Lean Green Title */}
          <div className="text-center mb-8">
            <h1 className=" text-2xl lg:text-3xl font-black text-gray-800 leading-tight">
              {aboutUsData?.key.split(' ').map((word, index) => (
                <React.Fragment key={index}>
                  {index === 2 ? (
                    <span className="text-[#23B14D]">{word}</span>
                  ) : (
                    word
                  )}
                  {index < 2 && <br />}
                </React.Fragment>
              )) || (
                <>
                  CLEAN
                  <br />
                  LEAN
                  <br />
                  <span className="text-[#23B14D]">GREEN</span>
                </>
              )}
            </h1>
          </div>

          {/* About GREEN Section */}
          <div className="mb-8">
            <h2 className="text-xl lg:text-2xl font-bold text-gray-800 mb-4 text-center">
              {aboutUsData?.title || "About GREEN"}
            </h2>
            <p className="text-base font-bold mb-4 italic text-center">
              {parsedContent?.subtitle.toUpperCase() || "ENLIGHTENING OUR LIVES THROUGH SUSTAINABLE ENERGY SOLUTIONS"}
            </p>

              <div className="space-y-4 text-gray-700 text-sm leading-relaxed">
                {parsedContent?.aboutGreenParagraphs.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                )) || (
                  <>
                    <p>
                      GREEN Limited - A Front-runner in sustainable living and
                      Renewable Energy Solution Provider in Papua New Guinea has 15
                      global presence in the INDIA, USA and Australia helps to bring
                      out the best of Product design, development and Project delivery
                      strategies, GREEN Limited is an ISO 9001 certified company and
                      complies with all the international standards and quality
                      management methodologies.
                    </p>
                    <p>
                      We are committed to enhancing and empowering lives through our
                      energy solutions enhanced by and the energy dependency
                      for a sustainable and promising future.
                    </p>
                    <p>
                      At GREEN, with a Global perspective between the finest solutions
                      to Enable, Empower and Energize the drive for a
                      sustainable future with our solutions for a better quality of
                      life.
                    </p>
                  </>
                )}
              </div>
          </div>

          {/* What does GREEN do Section */}
          <div className="mb-8">
            <h3 className="text-xl lg:text-2xl font-bold text-gray-800 mb-4 text-center">
              {parsedContent?.whatDoesGreenTitle || "What does GREEN Do"}
            </h3>
            <p className="text-base font-bold mb-4 italic text-center">
              {parsedContent?.whatDoesGreenSubtitle.toUpperCase() || "TRANSFORMING LIVES WITH ENERGY INDEPENDENCE"}
            </p>

            {parsedContent?.whatDoesGreenParagraphs.map((paragraph, index) => (
              <p key={index} className="text-gray-700 text-sm leading-relaxed mb-6">
                {paragraph}
              </p>
            )) || (
              <p className="text-gray-700 text-sm leading-relaxed mb-6">
                GREEN Limited renewable energy solutions and services are
                primarily focused in rural areas without access to conventional
                sources of energy or utilities. Our products and solutions are
                primarily intended to empower rural communities for economic and
                social growth to enrich their lives. Our innovative products like
                Solar Lanterns, products and services delivery ensures that are
                environmental value additions.
              </p>
            )}
          </div>

          {/* Bottom Transformation Text */}
          <div className="text-center">
            <p className="text-2xl italic text-gray-700 mb-2">
              {parsedQuote?.firstQuote || "A Transformation - That's"}{" "}
              <span className="text-[#23B14D] font-bold">GREEN!</span>
            </p>
            <p className="text-2xl italic text-gray-800">
              {parsedQuote?.secondQuote || "Perspicacious for a"}{" "}
              <span className="font-bold">BETTER WORLD!</span>
            </p>
          </div>
        </div>

        {/* Desktop Figma frame. The design is a 1920px canvas, so the image,
            content and navigation stay in the same relationship at every size. */}
        <div
          className="about-green-desktop hidden md:block"
          role="region"
          aria-label="About GREEN"
          style={{ transform: `scale(${desktopScale})` }}
        >
          <img
            src={aboutUsData?.bgImg || "/images/about-us/bg.jpg"}
            className="about-green-background"
            alt=""
          />
          <D6TopNavigation />

          <div className="about-green-clean-lean">
            <img src="/images/about-us/cleanLeanBg.png" alt="" />
            <h1>
              CLEAN
              <br />
              LEAN
              <br />
              <span>GREEN</span>
            </h1>
          </div>

          <section className="about-green-copy">
            <h2>{aboutUsData?.title || "About GREEN"}</h2>
            <p className="about-green-subtitle">
              {parsedContent?.subtitle || "Enlightening Our Lives through Sustainable Energy Solutions"}
            </p>
            <div className="about-green-body">
              {aboutParagraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
            </div>

            <h3>{parsedContent?.whatDoesGreenTitle || "What does GREEN do"}</h3>
            <p className="about-green-subtitle">
              {parsedContent?.whatDoesGreenSubtitle || "Transforming Lives with Energy Independence"}
            </p>
            <div className="about-green-body about-green-body--what">
              {whatParagraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
            </div>

            <div className="about-green-quote">
              <p>{parsedQuote?.firstQuote || "A Transformation - That's"} <strong>GREEN!</strong></p>
              <p>{parsedQuote?.secondQuote || "Perspicacious for a"} <b>BETTER WORLD!</b></p>
            </div>
          </section>
          <D6Chatbot canvasAnchored />
        </div>

        <div className="md:hidden">
          <Chatbot />
        </div>
      </div>
    </React.Fragment>
  );
};

export default AboutUs;
