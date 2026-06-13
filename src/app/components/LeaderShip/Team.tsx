"use client";
import React from "react";
import TopNavigation from "../TopNavigation/TopNavigation";
import Chatbot from "../Chatbot";
import { useLeadershipTeam } from "../../../hooks/useLeadershipTeam";

const Team = () => {
  const { leadershipSection,  error } = useLeadershipTeam();


  if (error) {
    return (
      <React.Fragment>
        <div className="">
          <TopNavigation />
          <div className="flex items-center justify-center h-screen">
            <div className="text-xl text-red-500">
              Error loading leadership team data
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }

  const members = leadershipSection?.members || [];
  const firstRowMembers = members.slice(0, 3);
  const secondRowMembers = members.slice(3, 6);
  const key = leadershipSection?.title;

  const renderMember = (member: any, index: number) => (
    <div key={index} className="">
      <div className="">
        <div className="relative">
          <img
            src={member?.img?.src || "/images/our-team/bernard-george.png"}
            alt={member?.img?.alt || member?.name || "Team Member"}
            className="w-full h-full object-cover"
            style={{
              maskImage: "url('/images/our-team/maskImg.png')",
              maskRepeat: "no-repeat",
              maskSize: "100% 100%",
              maskPosition: "center",
              WebkitMaskImage: "url('/images/our-team/maskImg.png')",
              WebkitMaskRepeat: "no-repeat",
              WebkitMaskSize: "100% 100%",
              WebkitMaskPosition: "center",
            }}
          />
          <img
            src="/images/our-team/maskImg.png"
            alt=""
            className="absolute top-16 w-[400px] -z-10 "
          />
        </div>
        <div className="text-center -ml-20">
          <h3 className="text-lg lg:text-xl font-bold text-gray-800">
            {member?.name || "Bernard George"}
          </h3>
          <p className="text-sm text-green-600 font-semibold">
            {member?.designation || "Chief Executive Officer"}
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <React.Fragment>
      <div className="">
        <TopNavigation />
        <div className="flex h-full">
          <div className="absolute top-0 left-0">
            <img
              src="/images/our-team/mainImg.png"
              className="lg:h-screen"
              alt="mainImg"
            />
          </div>
          {/* Left Side - TEAM Text */}
          <div className="lg:w-1/6 flex items-center justify-center">
            <div className="fixed top-1/3 left-8 lg:left-14">
              <img
                src="/images/our-team/team.png"
                className="w-8 lg:w-20"
                alt="our-team"
              />
            </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:w-5/6 flex w-full flex-col  lg:px-8  lg:mr-8 lg:ml-4">
            <div className="lg:flex">
              {/* Left Content Section */}
              <div className="lg:w-1/2  flex justify-center text-center lg:block ">
                <h1 className="text-4xl lg:text-5xl 2xl:text-6xl lg:mt-24 uppercase font-black leading-tight mb-6">
                  {key?.split("LEADERSHIP")[0] || "Leadership"}
                  <br />
                  <span className="text-[#23B14D]">
                    {key?.slice(key.indexOf("LEADERSHIP") + "LEADERSHIP".length).trim() || "Team"}
                  </span>
                </h1>
              </div>

              {/* Right Content Section */}
              <div className="w-full flex  flex-col  justify-center lg:ml-52  items-center mt-8">
                {/* Team Members Grid */}

                <div className="lg:grid lg:grid-cols-3  lg:gap-8 my-2 lg:-ml-52">
                  {firstRowMembers.map((member, index) =>
                    renderMember(member, index)
                  )}
                </div>
                <div className="lg:grid lg:grid-cols-3  lg:gap-8 mb-40  lg:-ml-72">
                  {secondRowMembers.map((member, index) =>
                    renderMember(member, index + 3)
                  )}
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

export default Team;
