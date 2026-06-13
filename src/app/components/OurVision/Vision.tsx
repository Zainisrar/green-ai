"use client";
import React from "react";
import TopNavigation from "../TopNavigation/TopNavigation";
import Chatbot from "../Chatbot";
import { useVisionMission } from "../../../hooks/useVisionMission";

const Vision = () => {
  const { visionMissionSection, error } = useVisionMission();


  if (error) {
    return (
      <React.Fragment>
        <div className="">
          <TopNavigation />
          <div className="flex items-center justify-center h-screen">
            <div className="text-xl text-red-500">Error loading vision mission data</div>
          </div>
        </div>
      </React.Fragment>
    );
  }

  const visionBlock = visionMissionSection?.blocks?.[0];
  const missionBlock = visionMissionSection?.blocks?.[1];
  const key= visionMissionSection?.title

  return (
    <React.Fragment>
      <div className="">
        {/* Background Image */}
        <div className="absolute  top-0 lg:bottom-0 left-0">
          <img src="/images/our-vision/mainImg.png" alt="our vision" />
        </div>
        
        <TopNavigation />

        {/* Mobile Layout */}
        <div className="lg:hidden px-4 py-6 relative z-50">
          {/* Future Envisioned Title */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-black text-gray-800">
              {key?.split(':')[0] || "FUTURE"}:
            </h1>
            <h1 className="text-2xl lg:text-3xl font-black text-[#23B14D]">
              {key?.slice(key.indexOf(':') + 1).trim() || "ENVISIONED"}
            </h1>
          </div>

          {/* Subtitle */}
          <div className="text-center mb-8">
            <p className="text-sm font-medium italic">
              {visionMissionSection?.footer?.text?.toUpperCase() || "ENVISION AND ENLIGHTEN LIVES WITH GREEN'S SUSTAINABLE ENERGY SOLUTIONS"}
            </p>
          </div>

          {/* Our Vision Card */}
          <div
          style={{
            transform:"skewX(-16deg)"
          }}
          className="bg-[#f7fae9]  w-[320px] mx-auto  p-6 rounded-lg shadow-lg mb-6">
            <div className="flex items-center mb-4">
              <img
                src={visionBlock?.icon?.src || "/images/our-vision/visionicn.png"}
                alt={visionBlock?.icon?.alt || "vision"}
                className="w-8 h-8 mr-3"
              />
              <h3 className="text-lg font-black text-gray-800">
                {visionBlock?.title || "Our Vision"}
              </h3>
            </div>
            
            <p className="text-xs text-gray-700 mb-4 leading-relaxed">
              {visionBlock?.content?.description || "Envisioning the Energy needs and Envisaging the Environmental impacts on the Globe, GREEN delivers Clean, lean and Green Solutions"}
            </p>
            
            <div className=" p-3 rounded">
              <p className="text-xs italic text-center">
                <span className="text-[#23B14D] text-lg">"</span>
                {visionBlock?.content?.quote || "Our aspiration is to empower lives with Sustainable Living and Renewable Energy Solutions"}
                <span className="text-[#23B14D] text-lg">"</span>
              </p>
            </div>
          </div>

          {/* Our Mission Card */}
          <div 
          style={{
            transform:"skewX(-16deg)"
          }}
          className="bg-[#f7fae9]  w-[320px] mx-auto p-6 rounded-lg shadow-lg mb-8">
            <div className="flex items-center mb-4">
              <img
                src={missionBlock?.icon?.src || "/images/our-vision/missionicon.png"}
                alt={missionBlock?.icon?.alt || "mission"}
                className="w-8 h-8 mr-3"
              />
              <h3 className="text-lg font-black text-gray-800">
                {missionBlock?.title || "Our Mission"}
              </h3>
            </div>
            
            <p className="text-xs text-gray-700 mb-4 leading-relaxed">
              {missionBlock?.content?.description || "Sustainable Living and Renewable Energy Solutions for all. To Spearhead the Renewable Energy Movement for Greener environment globally & contribute to Sustainable Development Goals"}
            </p>
            
            <div className=" p-3 rounded">
              <p className="text-xs italic text-center">
                <span className="text-[#23B14D] text-lg">"</span>
                {missionBlock?.content?.quote || "Innovating, Developing and Delivering Sustainable Renewable Energy based Solutions and Products for a greener social and industrial environment and thereby to ensure community welfare and rural empowerment"}
                <span className="text-[#23B14D] text-lg">"</span>
              </p>
            </div>
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden lg:flex h-full">
          {/* Left Side - VISION Text */}
          <div className="w-1/6 flex items-center justify-center">
            <div className="fixed left-10 top-1/3">
              <img src="/images/our-vision/vision.png" alt="vision" />
            </div>
          </div>

          {/* Main Content Area */}
          <div className="w-5/6 flex flex-col px-8 mr-8 ml-4 rounded-lg">
            <div className="flex">
              {/* Left Content Section */}
              <div className="w-1/2 pr-8">
                <h1 className="text-3xl font-black mt-20">
{key?.split(':')[0] || "Future"}
                  : <br />
                  <span className="text-[#23B14D]">
                    {
                      key?.slice(key.indexOf(':') + 1).trim() || "Envisioned"
                    }
                    </span>
                </h1>
              </div>

              {/* Right Content Section */}
              <div className="w-full flex flex-col justify-center items-center mt-16">
                {/* Vision and Mission Cards */}
                <div className="flex space-x-4 mb-16">
                  <div
                  style={{
                    transform:"skewX(-16deg)"
                  }}
                  className="bg-[#f7fae9] w-[320px] p-8  shadow-xl text-center">
                    <div className="flex space-x-4 items-center">
                      <div className="flex space-x-4 items-center">
                        <div>
                          <img
                            src={visionBlock?.icon?.src || "/images/our-vision/visionicn.png"}
                            alt={visionBlock?.icon?.alt || "vision"}
                            className="w-12"
                          />
                        </div>
                        <h3 className="text-xl font-black text-gray-800">
                          {visionBlock?.title || "Our Vision"}
                        </h3>
                      </div>
                    </div>
                    <p className="text-sm text-gray-700 mt-10 mb-6">
                      {visionBlock?.content?.description || "Envisioning the Energy needs and Envisaging the Environmental impacts on the Globe, GREEN delivers Clean, lean and Green Solutions"}
                    </p>
                    <div className="p-4 rounded-lg">
                      <p className="text-sm">
                        <span className="text-[#23B14D]">"</span>
                        {visionBlock?.content?.quote || "Our aspiration is to empower lives with Sustainable Living and Renewable Energy Solutions"}
                        <span className="text-[#23B14D]">"</span>
                      </p>
                    </div>
                  </div>
                  <div 
                  style={{
                    transform:"skewX(-16deg)"
                  }}
                  className="bg-[#f7fae9] w-[320px] p-8  shadow-xl text-center">
                    <div className="flex space-x-4 items-center">
                      <div className="flex space-x-4 items-center">
                        <div>
                          <img
                            src={missionBlock?.icon?.src || "/images/our-vision/missionicon.png"}
                            alt={missionBlock?.icon?.alt || "mission"}
                            className="w-12"
                          />
                        </div>
                        <h3 className="text-xl font-black text-gray-800">
                          {missionBlock?.title || "Our Mission"}
                        </h3>
                      </div>
                    </div>
                    <p className="text-sm text-gray-700 mt-10 mb-6">
                      {missionBlock?.content?.description || "Sustainable Living and Renewable Energy Solutions for all. To Spearhead the Renewable Energy Movement for Greener environment globally & contribute to Sustainable Development Goals"}
                    </p>
                    <div className="p-4 rounded-lg">
                      <p className="text-sm">
                        <span className="text-[#23B14D]">"</span>
                        {missionBlock?.content?.quote || "Innovating, Developing and Delivering Sustainable Renewable Energy based Solutions and Products for a greener social and industrial environment and thereby to ensure community welfare and rural empowerment"}
                        <span className="text-[#23B14D]">"</span>
                      </p>
                    </div>
                  </div>
                </div>

                {/* Bottom Tagline */}
                <div className="text-center mb-20">
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">
                    {visionMissionSection?.footer?.text || "Envision and Enlighten lives with GREEN's Sustainable Energy Solutions"}
                  </h2>
                </div>
              </div>
            </div>
          </div>
        </div>
        
      </div>
        <Chatbot />
    </React.Fragment>
  );
};

export default Vision;
