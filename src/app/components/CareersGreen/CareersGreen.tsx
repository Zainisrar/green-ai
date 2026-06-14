"use client";
import React from "react";
import TopNavigation from "../TopNavigation/TopNavigation";
import Chatbot from "../Chatbot";
import { useCareersGreen } from "../../../hooks/useCareersGreen";
import WhyWorkWithGreen from "./Modals/WhyWorkWithGreen";
import CareerTracksSupport from "./Modals/CareerTracksSupport";
import WhatMakesGreenDifferent from "./Modals/WhatMakesGreenDifferent";
import OpenRoles from "./Modals/OpenRoles";

const CareerGreen = () => {
  const { data: careersData,  error } = useCareersGreen();
  const [isWhyWorkWithGreenOpen, setIsWhyWorkWithGreenOpen] = React.useState(false);
  const [isCareerTracksSupportOpen, setIsCareerTracksSupportOpen] = React.useState(false);
  const [isWhatMakesGreenDifferentOpen, setIsWhatMakesGreenDifferentOpen] = React.useState(false);
  const [isOpenRolesOpen, setIsOpenRolesOpen] = React.useState(false);

  // Helper function to render highlighted text
  const renderHighlightedText = (text: string, highlighted: string) => {
    if (!highlighted || !text.includes(highlighted)) {
      return text;
    }
    
    const parts = text.split(highlighted);
    return (
      <>
        {parts.map((part, index) => (
          <React.Fragment key={index}>
            {part}
            {index < parts.length - 1 && (
              <span className="text-[#23B14D] font-semibold">{highlighted}</span>
            )}
          </React.Fragment>
        ))}
      </>
    );
  };


  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="text-6xl mb-4">⚠️</div>
          <div className="text-xl text-red-600 mb-2">Error loading careers data</div>
          <div className="text-gray-500">Please try refreshing the page</div>
        </div>
      </div>
    );
  }
  return (
    <React.Fragment>
      <div className="">
        <div className="lg:block hidden absolute top-0  right-0 -z-10">
          <img
            src="/images/careers-green/mainImg.png"
            className="  h-[145vh]"
            alt="img"
          />
        </div>
        <TopNavigation />
        <div className="flex h-full">
          {/* Left Side - GLOBAL SNAPSHOT Text */}
          <div className="w-1/6 flex items-center justify-center">
            <div className="fixed top-[20%] left-4 lg:left-14">
              <img
                src="/images/careers-green/industry-affiliations-certifications.png"
                alt="Careers at GREEN"
                className="w-5 lg:w-6"
              />
            </div>
          </div>

          {/* Main Content Area */}
          <div className="w-full px-8 pt-8">
            {/* Main Title */}
            <div className="mb-8">
              <h1 className=" text-2xl lg:text-3xl font-black text-gray-800 mb-4">
                {careersData?.data?.mainPage?.title || "Careers at GREEN"}
              </h1>
              <h2 className=" text-xl lg:text-2xl font-bold text-[#23B14D] italic mb-4">
                {careersData?.data?.mainPage?.subHeadline || "Build More Than a Career. Build the Future of Energy."}
              </h2>
              <p className="text-gray-600 text-lg mb-8">
                {careersData?.data?.mainPage?.description ? 
                  renderHighlightedText(careersData.data.mainPage.description.text, careersData.data.mainPage.description.highlighted) :
                  <>
                    <span className="text-[#23B14D] font-semibold">GREEN</span> is
                    isn't a job. It's a calling. If you're ready to solve real
                    problems, power real communities, and leave systems behind that
                    last —
                    <span className="text-[#23B14D] font-semibold">
                      {" "}
                      we're hiring.
                    </span>
                  </>
                }
              </p>
            </div>

            <div className="lg:flex space-y-10 lg:space-y-0  space-x-20 justify-between ">
              <div className="lg:space-y-12 flex flex-col lg:w-9/12">
                {(careersData?.data?.mainPage?.keys || [
                  { text: "Why Work With GREEN?" },
                  { text: "Career Tracks We Support" },
                  { text: "What Makes GREEN Different" },
                  { text: "Open Roles" }
                ]).map((key, index) => (
                  <div key={index} className="lg:flex lg:space-x-8 border-b border-green-600 pb-4 items-center lg:w-full justify-between">
                    <div>
                      <h3 className="text-lg lg:text-xl font-bold text-gray-800 mb-1">
                        {key.text}
                      </h3>
                    </div>

                    <div className="text-right">
                      <button
                        onClick={() => {
                          if (index === 0) setIsWhyWorkWithGreenOpen(true);
                          else if (index === 1) setIsCareerTracksSupportOpen(true);
                          else if (index === 2) setIsWhatMakesGreenDifferentOpen(true);
                          else if (index === 3) setIsOpenRolesOpen(true);
                        }}
                        className="cursor-pointer"
                      >
                        <img
                          src="/images/team-green/exploreBtn.png"
                          alt="explore"
                        />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="space-y-3 my-3 lg:my-0 lg:w-5/12">
                <div className="flex relative space-x-4 items-center capitalize">
                  <div>
                    <h3 className="text-xl lg:text-2xl font-bold text-gray-800 ">
                      {careersData?.data?.mainPage?.quote1 ?
                        renderHighlightedText(careersData.data.mainPage.quote1.text, careersData.data.mainPage.quote1.highlighted) :
                        <>We engineer{` `} <span className="text-[#23B14D]">energy.</span></>
                      }
                    </h3>
                  </div>
                </div>
                <div className="flex relative space-x-4 items-center capitalize">
                  <div>
                    <h3 className="text-xl lg:text-2xl font-bold text-gray-800 ">
                      But our real asset is
                      {` `} <span className="text-[#23B14D]">people.</span>
                    </h3>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className=" flex justify-end my-8  cursor-pointer">
                <img
                  src="/images/team-green/work-with-us.png"
                  alt="Work with us"
                />
              </div>
              <div className=" flex justify-end my-8  cursor-pointer">
                <img
                  src="/images/team-green/green.png"
                  alt="GREEN People & Culture Brief"
                />
              </div>
            </div>
            {/* Bottom Quote */}
            <div className="my-12 mb-20">
              <h3 className="text-xl lg:text-2xl font-bold text-gray-800 capitalize">
                {careersData?.data?.mainPage?.quote2 ? 
                  renderHighlightedText(careersData.data.mainPage.quote2.text, careersData.data.mainPage.quote2.highlighted) :
                  <>
                    "In {` `}
                    <span className="text-[#23B14D]">energy</span> {` `}{" "}
                    infrastructure, trust is engineered — through compliance, peer
                    validation, and continuous improvement."
                  </>
                }
              </h3>
            </div>
          </div>
        </div>

        <Chatbot />

        {/* Modals */}
        <WhyWorkWithGreen 
          isOpen={isWhyWorkWithGreenOpen} 
          onClose={() => setIsWhyWorkWithGreenOpen(false)}
          data={careersData?.data?.whyWorkWithGreenModal}
        />
        <CareerTracksSupport 
          isOpen={isCareerTracksSupportOpen} 
          onClose={() => setIsCareerTracksSupportOpen(false)}
          data={careersData?.data?.careerTrackSupport}
        />
        <WhatMakesGreenDifferent 
          isOpen={isWhatMakesGreenDifferentOpen} 
          onClose={() => setIsWhatMakesGreenDifferentOpen(false)}
          data={careersData?.data?.whatMakesGreenDifferent}
        />
        <OpenRoles 
          isOpen={isOpenRolesOpen} 
          onClose={() => setIsOpenRolesOpen(false)}
          data={careersData?.data?.openRoles}
        />
      </div>
    </React.Fragment>
  );
};

export default CareerGreen;