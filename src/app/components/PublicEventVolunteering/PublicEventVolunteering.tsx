"use client";
import React, { useEffect, useState } from "react";
import WhyWeEngage from "./Dialog/WhyWeEngage";
import WaystoGetInvolved from "./Dialog/WaystoGetInvolved";
import WhoCanJoin from "./Dialog/WhoCanJoin";
import VolunteerSignUp from "./Dialog/VolunteerSignUp";
import PastHighlights from "./Dialog/PastHighlights";
import TopNavigation from "../TopNavigation/TopNavigation";
import Chatbot from "../Chatbot";

const PublicEventVolunteering = () => {

  const [isWhyWeEngageOpen, setIsWhyWeEngageOpen] = useState(false);
  const [isWaysToGetInvolvedOpen, setIsWaysToGetInvolvedOpen] = useState(false);
  const [isWhoCanJoinOpen, setIsWhoCanJoinOpen] = useState(false);
  const [isVolunteerSignUpOpen, setIsVolunteerSignUpOpen] = useState(false);
  const [isPastHighlightsOpen, setIsPastHighlightsOpen] = useState(false);

  const handleOpenWhyWeEngage = () => {
    setIsWhyWeEngageOpen(true);
  };
  const handleCloseWhyWeEngage = () => {
    setIsWhyWeEngageOpen(false);
  };

  const handleOpenWaysToGetInvolved = () => {
    setIsWaysToGetInvolvedOpen(true);
  };

  const handleCloseWaysToGetInvolved = () => {
    setIsWaysToGetInvolvedOpen(false);
  };

  const handleOpenWhoCanJoin = () => {
    setIsWhoCanJoinOpen(true);
  };

  const handleCloseWhoCanJoin = () => {
    setIsWhoCanJoinOpen(false);
  };

  const handleOpenVolunteerSignUp = () => {
    setIsVolunteerSignUpOpen(true);
  };

  const handleCloseVolunteerSignUp = () => {
    setIsVolunteerSignUpOpen(false);
  };

  const handleOpenPastHighlights = () => {
    setIsPastHighlightsOpen(true);
  };

  const handleClosePastHighlights = () => {
    setIsPastHighlightsOpen(false);
  };


  return (
    <React.Fragment>
      <div
      style={{
        transform:"skewX(-8deg)"
      }}
      className=" absolute top-0 -left-24  -z-10">
        <img src="/images/public-events-volunteering/mainImg.png" className="w-8/12 h-[160vh]" alt="bg" />
      </div>
      <div className="">
        <TopNavigation />
        <div className="flex h-full">
          <div className=" lg:w-1/6 hidden lg:flex items-center justify-center">
            <div className="fixed top-[20%] left-14">
              <img
                src="/images/public-events-volunteering/public-event-volunteering.png"
                alt="public-event-volunteering"
                className="w-7"
              />
            </div>
          </div>

          {/* Main Content Area */}
          <div className=" flex flex-col   md:pl-38 md:mr-4  md:my-10 lg:my-0 lg:pl-8 lg:px-8  lg:mr-8 ml-4 rounded-lg">
            <div className=" ">
              {/* Main Heading */}
              <h1 className="text-2xl lg:text-3xl font-black text-gray-800 mb-4">
                PUBLIC <span className="text-[#23B14D]">EVENTS</span> &
                VOLUNTEERING
              </h1>

              {/* Subtitle */}
              <p className="text-xl lg:text-2xl text-[#23B14D] font-semibold mb-6 italic">
                Be Part of the Energy Transition. On the Ground. In the
                Community.
              </p>

              {/* Description */}
              <p className="text-gray-700 text-xl max-w-7xl  mb-2 leading-relaxed">
                From school outreach to community solar cleanups —{" "}
                <span className="font-bold text-[#23B14D]">GREEN</span> invites
                individuals, institutions, and future changemakers to
                participate in hands-on action that matters.
              </p>

              {/* Sections with Explore buttons */}
              <div className="  max-w-3xl  mx-auto space-y-6 mb-8">
                {/* Why We Engage */}
                <div className="flex border-b border-[#23B14D] items-center justify-between  pb-4">
                  <div>
                    <h3 className="text-xl lg:text-2xl font-bold mb-2">Why We Engage</h3>
                    <p className="text-gray-600 italic">
                      Our mission isn't just to install systems — it's to shift
                      systems.
                    </p>
                  </div>
                  <button
                    onClick={handleOpenWhyWeEngage}
                    className=" cursor-pointer"
                  >
                    <img
                      src="/images/public-events-volunteering/explore.png"
                      alt="Explore"
                    />
                  </button>
                </div>

                {/* Ways to Get Involved */}
                <div className="flex border-b border-[#23B14D] items-center justify-between  pb-4">
                  <div>
                    <h3 className="text-xl lg:text-2xl font-bold mb-2">
                      Ways to Get Involved
                    </h3>
                    <p className="text-gray-600 italic">
                      Awareness drives, solar literacy, rural demonstrations
                    </p>
                  </div>
                  <button
                    onClick={handleOpenWaysToGetInvolved}
                    className=" cursor-pointer"
                  >
                    <img
                      src="/images/public-events-volunteering/explore.png"
                      alt="Explore"
                    />
                  </button>
                </div>

                {/* Who Can Join */}
                <div className="flex border-b border-[#23B14D] items-center justify-between  pb-4">
                  <div>
                    <h3 className="text-xl lg:text-2xl font-bold mb-2">Who Can Join?</h3>
                    <p className="text-gray-600 italic">
                      No prior experience needed. Just willingness to act.
                    </p>
                  </div>
                  <button
                    onClick={handleOpenWhoCanJoin}
                    className=" cursor-pointer"
                  >
                    <img
                      src="/images/public-events-volunteering/explore.png"
                      alt="Explore"
                    />
                  </button>
                </div>

                {/* Volunteer Sign-Up */}
                <div className="flex border-b border-[#23B14D] items-center justify-between  pb-4">
                  <div>
                    <h3 className="text-xl lg:text-2xl font-bold mb-2">
                      Volunteer Sign-Up
                    </h3>
                    <p className="text-gray-600 italic">
                      All GREEN events are coordinated by trained staff
                    </p>
                  </div>
                  <button
                    onClick={handleOpenVolunteerSignUp}
                    className=" cursor-pointer"
                  >
                    <img
                      src="/images/public-events-volunteering/explore.png"
                      alt="Explore"
                    />
                  </button>
                </div>

                {/* Past Highlights */}
                <div className="flex border-b border-[#23B14D] items-center justify-between  pb-4">
                  <div>
                    <h3 className="text-xl lg:text-2xl font-bold mb-2">Past Highlights</h3>
                    <p className="text-gray-600 italic">
                      All Events and stories
                    </p>
                  </div>
                  <button
                    onClick={handleOpenPastHighlights}
                    className=" cursor-pointer"
                  >
                    <img
                      src="/images/public-events-volunteering/explore.png"
                      alt="Explore"
                    />
                  </button>
                </div>
              </div>

              {/* Bottom Message */}
              <div className="flex justify-center">
                <div>
                  <img
                    src="/images/public-events-volunteering/shape.png"
                    alt=""
                  />
                </div>
                <div>
                  <p className="text-gray-900 text-xl  font-bold mb-2">
                    You Don't Need To Be An{" "}
                    <span className="text-[#23B14D] font-bold">Engineer</span>{" "}
                    To Power Change.
                  </p>
                  <p className="text-gray-900 text-xl  font-bold mb-2">
                    You Just Need To Show Up. We'll Show You How.
                  </p>
                </div>
                <div>
                  <img
                    src="/images/public-events-volunteering/shape2.png"
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-8 mb-8">
          <div className="  flex justify-end">
            <img
              src="/images/public-events-volunteering/SignUptoVolunteer.png"
              alt="Sign Up to Volunteer"
            />
          </div>
          <div className="  flex justify-end">
            <img
              src="/images/public-events-volunteering/ViewUpcomingEventsCalendar.png"
              alt="View Upcoming Events Calendar"
            />
          </div>
          <div className=" flex justify-end">
            <img
              src="/images/public-events-volunteering/DownloadVolunteerWelcomePack.png"
              alt="Download Volunteer Welcome Pack"
            />
          </div>
        </div>
      
      </div>
      <Chatbot/>
      <WhyWeEngage
        isOpen={isWhyWeEngageOpen}
        onClose={handleCloseWhyWeEngage}
      />
      <WaystoGetInvolved
        isOpen={isWaysToGetInvolvedOpen}
        onClose={handleCloseWaysToGetInvolved}
      />
      <WhoCanJoin isOpen={isWhoCanJoinOpen} onClose={handleCloseWhoCanJoin} />
      <VolunteerSignUp
        isOpen={isVolunteerSignUpOpen}
        onClose={handleCloseVolunteerSignUp}
      />
      <PastHighlights
        isOpen={isPastHighlightsOpen}
        onClose={handleClosePastHighlights}
      />
    </React.Fragment>
  );
};

export default PublicEventVolunteering;
