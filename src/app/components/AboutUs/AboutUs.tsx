"use client";

import React from "react";
import TopNavigation from "../TopNavigation/TopNavigation";
import Chatbot from "../Chatbot";
import { useAboutUs } from "../../../hooks/useAboutUs";
import { parseAboutUsContent, parseQuoteContent } from "../../utils/htmlParser";

const AboutUs = () => {

  
  // Fetch AboutUs data
  const { aboutUsData } = useAboutUs();
  
  // Parse content when data is available
  const parsedContent = aboutUsData ? parseAboutUsContent(aboutUsData.content) : null;
  const parsedQuote = aboutUsData ? parseQuoteContent(aboutUsData.quote) : null;
if(aboutUsData){
  return (
    <React.Fragment>
      <div className="">
        {/* Background Image */}
        <div className="absolute lg:block hidden -z-10 top-0 left-0">
          <img
            src={aboutUsData?.bgImg || "/images/about-us/mainImg.png"}
            className="w-11/12 h-[120vh] "
            alt="mainBg"
          />
        </div>
        
        <TopNavigation />

        {/* Mobile Layout */}
        <div className="md:hidden px-4 py-6 relative z-50">
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

        {/* Desktop Layout */}
        <div className="hidden md:flex h-full">
          {/* Left Side - Clean Lean Green Text */}
          <div className="lg:w-8/12 2xl:w-7/12  flex lg:items-end pb-40 md:justify-center">
            <div className="text-center relative z-50  lg:pl-20">
              <h1 className="text-3xl lg:text-6xl 2xl:text-8xl font-black text-gray-800 leading-tight">
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
              <div className="absolute -z-10 -top-8 2xl:w-[860px]  lg:w-[650px] 2xl:-left-32 lg:-left-22">
                <img src="/images/about-us/cleanLeanBg.png" alt="img" className="" />
              </div>
            </div>
          </div>

          {/* Right Side - About Content */}
          <div className="md:w-[60%] 2xl:w-7/12 lg:w-9/12 flex flex-col justify-center py-10 md:mx-4 md:pl-10 lg:mx-auto lg:pl-36 lg:pr-8">
            <h2 className="lg:text-2xl 2xl:text-3xl text-xl font-bold flex justify-end lg:block mb-2 text-gray-800">
              {aboutUsData?.title || "About GREEN"}
            </h2>
            <p className="2xl:text-lg md:text-base text-base lg:text-base font-bold mb-4 italic">
              {parsedContent?.subtitle || "Enlightening Our Lives through Sustainable Energy Solutions"}
            </p>

              <div className="space-y-3 text-gray-700 text-sm 2xl:text-base leading-relaxed">
                {parsedContent?.aboutGreenParagraphs.map((paragraph, index) => (
                  <p key={index}>
                    {paragraph}
                    {index === 1 && <br className="2xl:block hidden"/>}
                    {index === 2 && <br className="2xl:block hidden"/>}
                  </p>
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
                      energy solutions enhanced by <br className="2xl:block hidden"/> and the energy dependency
                      for a sustainable and promising future.
                    </p>
                    <p>
                      At GREEN, with a Global perspective between the finest solutions
                      to Enable, Empower and Energize the drive <br className="2xl:block hidden"/> for a
                      sustainable future with our solutions for a better quality of
                      life.
                    </p>
                  </>
                )}
              </div>

            <h3 className="lg:text-2xl 2xl:text-3xl font-bold mt-6 mb-2 flex justify-end lg:justify-start text-xl text-gray-800">
              {parsedContent?.whatDoesGreenTitle || "What does GREEN do"}
            </h3>
            <p className="2xl:text-lg md:text-base font-bold mb-4 italic">
              {parsedContent?.whatDoesGreenSubtitle || "Transforming Lives with Energy Independence"}
            </p>

            {parsedContent?.whatDoesGreenParagraphs.map((paragraph, index) => (
              <p key={index} className="text-gray-700 text-sm 2xl:text-base leading-relaxed mb-4 2xl:mb-6">
                {paragraph}
              </p>
            )) || (
              <p className="text-gray-700 text-sm 2xl:text-base leading-relaxed mb-4 2xl:mb-6">
                GREEN Limited renewable energy solutions and services are
                primarily focused in rural areas without access to conventional
                sources of energy or utilities. Our products and solutions are
                primarily intended to empower rural communities for economic and
                social growth to enrich their lives. Our innovative products like
                Solar Lanterns, products and services delivery ensures that are
                environmental value additions.
              </p>
            )}

            <div className="mt-6">
              <p className="md:text-2xl text-2xl 2xl:text-4xl italic text-gray-700 mb-2">
                {parsedQuote?.firstQuote || "A Transformation - That's"}{" "}
                <span className="text-[#23B14D] font-bold">GREEN!</span>
              </p>
              <p className="md:text-2xl text-2xl 2xl:text-4xl italic 2xl:mt-4 text-gray-800">
                {parsedQuote?.secondQuote || "Perspicacious for a"}{" "}
                <span className="font-bold">BETTER WORLD!</span>
              </p>
            </div>
          </div>
        </div>

        <Chatbot />
      </div>
    </React.Fragment>
  );
}
};

export default AboutUs;
