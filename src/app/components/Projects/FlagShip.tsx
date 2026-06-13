'use client';

import React from "react";
import TopNavigation from "../TopNavigation/TopNavigation";
import Chatbot from "../Chatbot";
import { useFlagshipProject } from "../../../hooks/useFlagshipProject";

const FlagShip = () => {
    const [isDesktop, setIsDesktop] = React.useState(false);

    React.useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }
  , []);
  const { data: projectData } = useFlagshipProject();

  if (!projectData) {
    return null;
  }


  return (
    <React.Fragment>
      <div className=" ">
        <TopNavigation />
        <div className="absolute lg:block hidden top-0 -left-2 -z-10">
          <img
            src="/images/flagship-projects/mainImg.png"
            className="h-[150vh] w-9/12"
            alt="mainImg"
          />
        </div>

        <div className="lg:flex h-full">
          {/* Left Side  */}
          <div className="w-1/6   hidden lg:flex items-center justify-center">
            <div className="fixed left-10 top-1/4">
              <img
                src="/images/flagship-projects/global.png"
                alt="globalsnapshot"
                className="w-10"
              />
            </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:w-3/4  lg:px-8 pt-8">
            {/* Main Title */}
            <div className="mb-8 ml-20">
              <h1 className="text-2xl lg:text-3xl font-black text-gray-800 mb-4">
                <span className="text-[#23B14D]">FLAGSHIP</span> PROJECTS
              </h1>
              <h2 className="text-xl lg:text-2xl font-bold text-gray-800 mb-6">
                {projectData.subheadline}
              </h2>
            </div>

            {/* Project Statistics */}
            <div className="flex lg:flex-row flex-col lg:justify-center lg:space-x-16 space-y-8 l:space-y-0 lg:mb-8">
              {projectData.icons.map((icon, index) => (
                <div key={index} className="text-center">
                  <div className="mb-4">
                    <img
                      src={icon.img.src}
                      alt={icon.img.alt}
                      className="w-16 h-16 mx-auto"
                    />
                  </div>
                  <h3 className="text-lg font-bold text-gray-800 mb-2">
                    {icon.title}
                  </h3>
                  <p className="text-3xl font-bold text-gray-800">
                    {icon.description.includes('kWh') ? (
                      <>
                        {icon.description.replace(' kWh', '')} <span className="text-lg">kWh</span>
                      </>
                    ) : (
                      icon.description
                    )}
                  </p>
                </div>
              ))}
            </div>

            {/* Content Layout */}
            <div className="flex lg:flex-row flex-col items-center lg:items-start lg:space-x-8 mt-8 lg:mt-20">
              {/* Left Column - Quote Box */}
              <div className="lg:flex w-1/2  relative">
                <div className="absolute top-4 lg:block hidden -left-20">
                  <img src="/images/flagship-projects/shape1.png" alt="" />
                </div>
                <div
                style={{
                  transform:isDesktop?"skewX(-16deg)":"none"
                }}
                className="   ">
                  <p className="text-xl font-bold text-gray-800 mb-2">
                    {projectData.key.title.split('.').map((line, index) => (
                      <React.Fragment key={index}>
                        {line.trim()}
                        {index === 0 && <br />}
                      </React.Fragment>
                    ))}
                  </p>
                  <p className="text-lg text-[#23B14D] font-semibold">
                    {projectData.key.subtitle.split(',').map((line, index) => (
                      <React.Fragment key={index}>
                        {line.trim()}
                        {index === 0 && <br />}
                      </React.Fragment>
                    ))}
                  </p>
                </div>
                  <div className="ml-4 lg:block hidden -mt-4">
                    <img src="/images/flagship-projects/shape2.png" alt="" />
                  </div>
              </div>

              {/* Right Column - Description */}
              <div className="mt-8 px-4 lg:px-0 lg:mt-0 lg:w-9/12">
                <p className="text-gray-600 text-lg mb-6">
                  {projectData.description.split('\n').map((paragraph, index) => (
                    <React.Fragment key={index}>
                      {paragraph.includes('GREEN') ? (
                        <>
                          {paragraph.split('GREEN')[0]}
                          <span className="text-[#23B14D] font-semibold">GREEN</span>
                          {paragraph.split('GREEN')[1]}
                        </>
                      ) : (
                        paragraph
                      )}
                      {index < projectData.description.split('\n').length - 1 && <br />}
                    </React.Fragment>
                  ))}
                </p>

                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">
                    {projectData.footer.title}
                  </h3>
                  <p className="text-lg text-gray-600">
                    <span className="text-[#23B14D] font-semibold italic">
                      {projectData.footer.subheadline}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {projectData.cta.map((ctaItem, index) => (
          <div key={index} className={`flex justify-end cursor-pointer ${index === 0 ? 'my-4' : 'my-8 mb-20'}`}>
            <a href={ctaItem.href} className="block">
              <img
                src={index === 0 ? "/images/flagship-projects/report.png" : "/images/flagship-projects/explore.png"}
                alt={ctaItem.text}
              />
            </a>
          </div>
        ))}
        <Chatbot />
      </div>
    </React.Fragment>
  );
};

export default FlagShip;
