"use client";
import React from "react";
import TopNavigation from "../TopNavigation/TopNavigation";
import Chatbot from "../Chatbot";
import { useOurStory } from "../../../hooks/useOurStory";

const OurStory = () => {
  const { ourStoryData,  error } = useOurStory();


  if (error) {
    return (
      <React.Fragment>
        <div className="">
          <TopNavigation />
          <div className="flex items-center justify-center h-screen">
            <div className="text-xl text-red-500">
              Error loading our story data
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      <div className="">
        <TopNavigation />
        <div className="absolute top-0 left-0 ">
          <img
            src="/images/our-story/mainImg.png"
            className="lg:h-[110vh]"
            alt="mainImg"
          />
        </div>
        <div className="mt-10 flex h-full">
          {/* Left Side - MILESTONE Text */}
          <div className="w-1/6 flex items-center justify-center">
            <div className="fixed left-4 lg:left-10 top-1/4">
              <img src="/images/our-story/milestone.png" className="w-8 lg:w-auto" alt="milestone" />
            </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:w-5/6  flex flex-col  lg:px-8  lg:mr-8 p-8 lg:ml-4 rounded-lg">
            <div className="lg:flex">
              {/* Left Content Section */}
              <div className="lg:w-1/2 flex justify-center lg:block lg:text-left text-center   pr-8">
                <h1 className=" text-2xl lg:text-3xl lg:absolute top-1/4 left-1/8 font-black mb-6">
                  {ourStoryData?.key.split(" & ")[0]+ ` &` || "OUR STORY &"}
                  <br />
                  <span className="text-[#23B14D]">
                    {ourStoryData?.key.split(" & ")[1] || "MILESTONES"}
                  </span>
                </h1>
              </div>

              {/* Right Content Section */}
              <div className="w-full z-10  relative">
                <h2 className="text-2xl lg:text-3xl  font-black text-gray-800 mb-4">
                  {ourStoryData?.title || "Our Story"}
                </h2>
                <p className="text-gray-700 lg:text-lg leading-relaxed mb-8">
                  {ourStoryData?.description ||
                    "GREEN Limited renewable energy solutions and services are predominantly targeted at rural areas that lack access to conventional energy sources and utilities. Our products and services are primarily designed to empower rural communities for economic and social growth, thereby improving their quality of life in a sustainable and healthful manner. Our delivery of solutions, products, and services ensures environmental value addition."}
                </p>

                <h3 className="text-2xl lg:text-3xl font-black text-gray-800 mb-6">
                  {ourStoryData?.ourMilestone?.title || "Our Milestones"}
                </h3>

                {/* Timeline */}
                <div className="mb-20">
                  <img
                    src={
                      ourStoryData?.ourMilestone?.maps?.activeImg ||
                      "/images/our-story/ourstory1.png"
                    }
                    alt="ourstory"
                    className="  object-cover lg:object-fill h-[30vh] lg:h-[45vh] w-auto"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <Chatbot />
      </div>
    </React.Fragment>
  );
};

export default OurStory;
