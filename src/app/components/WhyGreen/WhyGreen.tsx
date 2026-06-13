"use client";
import React, { useState, useEffect } from "react";
import TopNavigation from "../TopNavigation/TopNavigation";
import Chatbot from "../Chatbot";
import { useWhyGreen } from "../../../hooks/useWhyGreen";
import { parseWhyGreenContent } from "../../utils/htmlParser";

const WhyGreen = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const { whyGreenData } = useWhyGreen();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // Example breakpoint for mobile
      setIsTablet(window.innerWidth >= 768 && window.innerWidth < 1024); // Example breakpoint for tablet
    };
    handleResize(); // Check on mount
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Parse content from API
  const parsedContent = whyGreenData
    ? parseWhyGreenContent(whyGreenData.content)
    : null;
  const icons = whyGreenData?.icons || [];
  const key = whyGreenData?.key.text || "";

  if (!whyGreenData) {
    return null;
  }

  return (
    <React.Fragment>
      <div className=" ">
        <div className="absolute lg:block hidden -z-10 top-0 left-0">
          <img
            src="/images/why-green/mainImg.png"
            className="w-10/12 h-[130vh] "
            alt="mainBg"
          />
        </div>
        <div className="absolute lg:hidden -z-10 top-0 left-0">
          <img
            src="/images/why-green/mobileMainImg.png"
            className="w-screen"
            alt="mainBg"
          />
        </div>
        <TopNavigation />
        {/* Main Content */}
        <div className="lg:flex h-full">
          <div className="lg:w-1/5  lg:flex hidden items-center justify-center">
            <div className="fixed bottom-4 left-10">
              <img src="/images/why-green/whygreen.png" alt="whygreen" />
            </div>
          </div>
          <div className=" lg:w-1/4 md:ml-44 lg:-ml-20 2xl:w-1/4 ml-16 lg:my-32  2xl:-ml-28 my-12 flex">
            <h1 className="text-4xl lg:text-5xl 2xl:text-7xl uppercase font-black leading-tight">
              {key.slice(0, key.indexOf(" "))}
              {` `}
              <span className="text-[#23B14D]">
                {key.slice(key.indexOf(" "), key.length)}
              </span>
            </h1>
          </div>

          <div className="lg:w-2/3  pl-16  pr-4 flex flex-col mt-4 lg:pr-20 lg:pl-58 2xl:pl-24">
            <p className="text-[#23B14D] md:pl-20 lg:pl-0  lg:hidden lg:text-base 2xl:text-xl font-semibold mb-4 2xl:mb-6 italic">
              {parsedContent?.subtitle ||
                "- A Sustainable Living and Frontrunner in Renewable Energy Solution Provider"}
            </p>
            <h2 className=" lg:text-3xl text-xl md:ml-4 lg:ml-0 md:block flex justify-end 2xl:text-5xl font-bold text-gray-800 mb-4">
              {parsedContent?.companyName || "GREEN Limited"}
            </h2>
            <p className="text-[#23B14D]  lg:block hidden lg:text-base 2xl:text-xl font-semibold mb-4 2xl:mb-6 italic">
              {parsedContent?.subtitle ||
                "- A Sustainable Living and Frontrunner in Renewable Energy Solution Provider"}
            </p>

            <div className="space-y-4 md:ml-4 lg:ml-0  text-gray-700 text-sm 2xl:text-base leading-relaxed mb-4">
              {parsedContent?.paragraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              )) || (
                <>
                  <p>
                    GREEN Limited - A Front-Runner in Sustainable Living and
                    Renewable Energy Solution Provider in Papua New Guinea has
                    its global presence in the USA, INDIA and Australia. The
                    company helps to bring out the best of Product design,
                    development and Project delivery strategies, prompt service
                    and a support matrix more suitable to PNG with World Class
                    standards. GREEN Limited is an ISO 9001 certified company
                    and complies with all the international standards and
                    quality management methodologies.
                  </p>
                  <p>
                    GREEN is committed to enhancing and empowering lives through
                    our energy and technology augmented solutions envisioned to
                    end the energy-dependency on fossil fuels for a sustainable
                    and promising future. With a Global perspective, GREEN
                    bestows to deliver the finest solutions to Enable, Empower
                    and Energize the drive for a sustainable future towards a
                    Net-Zero Target!
                  </p>
                </>
              )}
            </div>

            <div className="lg:-ml-10 2xl:-ml-20 mt-2  2xl:mt-10">
              <h3 className="lg:text-xl 2xl:text-3xl font-bold text-gray-800 mb-2">
                {parsedContent?.envisionTitle ||
                  "Envision and Enlighten lives with"}
              </h3>
              <p className="text-[#23B14D] lg:text-lg 2xl:text-2xl mb-4 font-bold lg:mb-8">
                {parsedContent?.solutionsTitle ||
                  "GREEN's Sustainable Energy Solutions"}
              </p>

              <div className="grid pb-40 md:grid-cols-2 lg:grid-cols-3 gap-4  lg:gap-10 ">
                {icons.length > 0 ? (
                  icons.map((icon, index) => (
                    <div key={index} className=" flex space-x-2 ">
                      <div className="">
                        <img
                          src={icon.img.src}
                          alt={icon.img.alt}
                          className="w-16 lg:w-20 object-contain"
                        />
                      </div>
                      <div className="flex flex-col space-y-2">
                        <h4 className="text-lg lg:text-xl font-bold text-gray-800 mb-2">
                          {icon.text}
                        </h4>
                        <p className="text-sm text-gray-600">
                          {icon.description}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  // Fallback content
                  <>
                    <div className=" flex space-x-2 ">
                      <div className="">
                        <img
                          src="/images/why-green/envirornment.png"
                          alt="Environment"
                          className="w-16 lg:w-20 object-contain"
                        />
                      </div>
                      <div className="flex flex-col space-y-2">
                        <h4 className="text-lg lg:text-xl font-bold text-gray-800 mb-2">
                          Environment
                        </h4>
                        <p className="text-sm text-gray-600">
                          Renewable Energy reduces the devastating impacts of
                          fossil fuels on the ecosystem.
                        </p>
                      </div>
                    </div>
                    <div className=" flex space-x-2 ">
                      <div className="">
                        <img
                          src="/images/why-green/health.png"
                          alt="health"
                          className="w-16 lg:w-20 object-contain"
                        />
                      </div>
                      <div className="flex flex-col space-y-2">
                        <h4 className="text-lg lg:text-xl font-bold text-gray-800 mb-2">
                          Health
                        </h4>
                        <p className="text-sm text-gray-600">
                          Renewable energy emits no or low air
                          pollutants.Healthcares can rely on renewable energy
                        </p>
                      </div>
                    </div>
                    <div className=" flex space-x-2 ">
                      <div className="">
                        <img
                          src="/images/why-green/economy.png"
                          alt="Economy"
                          className="w-16 lg:w-20 object-contain"
                        />
                      </div>
                      <div className="flex flex-col space-y-2">
                        <h4 className="text-lg lg:text-xl font-bold text-gray-800 mb-2">
                          Economy
                        </h4>
                        <p className="text-sm text-gray-600">
                          Renewable Energy comes with low costs.Energy prices
                          are affordable at all levels.
                        </p>
                      </div>
                    </div>
                    <div className=" flex space-x-2 ">
                      <div className="">
                        <img
                          src="/images/why-green/application.png"
                          alt="Application"
                          className="w-16 lg:w-20 object-contain"
                        />
                      </div>
                      <div className="flex flex-col space-y-2">
                        <h4 className="text-lg lg:text-xl font-bold text-gray-800 mb-2">
                          Application
                        </h4>
                        <p className="text-sm text-gray-600">
                          Residential applications, industrial, remote and
                          transportation applications.
                        </p>
                      </div>
                    </div>
                    <div className=" flex space-x-2 ">
                      <div className="">
                        <img
                          src="/images/why-green/independence.png"
                          alt="Independence"
                          className="w-16 lg:w-20 object-contain"
                        />
                      </div>
                      <div className="flex flex-col space-y-2">
                        <h4 className="text-lg lg:text-xl font-bold text-gray-800 mb-2">
                          Independence
                        </h4>
                        <p className="text-sm text-gray-600">
                          Unaffected by the failure of the conventional
                          electrical grid
                        </p>
                      </div>
                    </div>
                    <div className=" flex space-x-2 ">
                      <div className="">
                        <img
                          src="/images/why-green/efficiency.png"
                          alt="Efficiency"
                          className="w-16 lg:w-20 object-contain"
                        />
                      </div>
                      <div className="flex flex-col space-y-2">
                        <h4 className="text-lg lg:text-xl font-bold text-gray-800 mb-2">
                          Efficiency
                        </h4>
                        <p className="text-sm text-gray-600">
                          Enhance energy security and lower risk of fuel spill,
                          reduce the need for imported fuels
                        </p>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        <Chatbot />
      </div>
    </React.Fragment>
  );
};

export default WhyGreen;
