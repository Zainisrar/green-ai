"use client";
import React, { useEffect, useState } from "react";
import LatestPressReleases from "./Dialog/LatestPressReleases";
import MediaContactInterviewRequests from "./Dialog/MediaContactInterviewRequests";
import MediaKitDownload from "./Dialog/MediaKitDownload";
import GreenInTheNews from "./Dialog/GreenInTheNews";
import OfficialSpokesPeople from "./Dialog/OfficialSpokesPeople";
import RequestQuoteAppointment from "./Modals/RequestQuoteAppointment";
import TopNavigation from "../TopNavigation/TopNavigation";
import Chatbot from "../Chatbot";

const MediaPress = () => {

  const [isRequestQuoteOpen, setIsRequestQuoteOpen] = useState(false);
  const [isLatestPressReleasesOpen, setIsLatestPressReleasesOpen] = useState(false);
  const [isMediaContactOpen, setIsMediaContactOpen] = useState(false);
  const [isMediaKitDownloadOpen, setIsMediaKitDownloadOpen] = useState(false);
  const [isGreenInTheNewsOpen, setIsGreenInTheNewsOpen] = useState(false);
  const [isOfficialSpokesPeopleOpen, setIsOfficialSpokesPeopleOpen] =
    useState(false);

    const handleLatestPressReleasesOpen = () => {
        setIsLatestPressReleasesOpen(true);
    }
    const handleLatestPressReleasesClose = () => {
        setIsLatestPressReleasesOpen(false);
    }
    const handleMediaContactOpen = () => {
        setIsMediaContactOpen(true);
    }
    const handleMediaContactClose = () => {
        setIsMediaContactOpen(false);
    }
    const handleMediaKitDownloadOpen = () => {
        setIsMediaKitDownloadOpen(true);
    }
    const handleMediaKitDownloadClose = () => {
        setIsMediaKitDownloadOpen(false);
    }
    const handleGreenInTheNewsOpen = () => {
        setIsGreenInTheNewsOpen(true);
    }
    const handleGreenInTheNewsClose = () => {
        setIsGreenInTheNewsOpen(false);
    }
    const handleOfficialSpokesPeopleOpen = () => {
        setIsOfficialSpokesPeopleOpen(true);
    }
    const handleOfficialSpokesPeopleClose = () => {
        setIsOfficialSpokesPeopleOpen(false);
    }



  return (
    <React.Fragment>
       <div className=" absolute top-0 right-0  -z-10">
        <img src="/images/media-press/mainImg.png" className=" h-[150vh]" alt="bg" />
      </div>
      <div className=''>
       <TopNavigation/>
        <div className="flex h-full">
          <div className=" lg:w-1/6 hidden lg:flex items-center justify-center">
            <div className="fixed top-1/4 left-14">
              <img
                src="/images/media-press/media-press.png"
                alt="Media Press"
                className="w-14"
              />
            </div>
          </div>

          {/* Main Content Area */}
          <div className="  flex flex-col   md:pl-38 md:mr-4  md:my-10 lg:my-0 lg:pl-8 lg:px-8  lg:mr-8 ml-4 rounded-lg">
            {/* Main Title */}
            <div className="mb-8 lg:pt-8">
              <h1 className="text-2xl lg:text-3xl font-black text-gray-800 mb-4">
                MEDIA & <span className="text-[#23B14D]">PRESS</span>
              </h1>
              <h2 className="text-xl lg:text-2xl font-bold text-[#23B14D] italic mb-4">
                Telling the Energy Story — The Right Way.
              </h2>
              <p className="text-gray-600 text-base lg:text-lg  max-w-7xl">
                <span className="text-[#23B14D] font-semibold">GREEN</span>{" "}
                Limited is shaping the future of energy access in PNG and the
                Pacific. For accurate information, interviews, brand assets, and
                official statements — this is your source.
              </p>
            </div>

            {/* Content List */}
            <div className="space-y-8 max-w-4xl ">
              {/* Latest Press Releases */}
              <div className="border-b pb-2 border-[#23B14D] flex items-center justify-between ">
                <h3 className="text-lg lg:text-xl font-bold text-gray-800">
                  Latest Press Releases
                </h3>
                <button className="cursor-pointer"
                onClick={handleLatestPressReleasesOpen}
                > 
                  <img src="/images/media-press/explore.png" alt="Explore" />
                </button>
              </div>

              {/* Media Contact & Interview Requests */}
              <div className="border-b  pb-2 border-[#23B14D] flex items-center justify-between ">
                <h3 className="text-lg lg:text-xl font-bold text-gray-800">
                  Media Contact & Interview Requests
                </h3>
                <button className="cursor-pointer"
                onClick={handleMediaContactOpen}
                > 
                  <img src="/images/media-press/explore.png" alt="Explore" />
                </button>
              </div>

              {/* Media Kit Download */}
              <div className="border-b  pb-2 border-[#23B14D] flex items-center justify-between ">
                <h3 className="text-lg lg:text-xl font-bold text-gray-800">
                  Media Kit Download
                </h3>
                 <button className="cursor-pointer"
                 onClick={handleMediaKitDownloadOpen}
                > 
                  <img src="/images/media-press/explore.png" alt="Explore" />
                </button>
              </div>

              {/* GREEN in the News */}
              <div className="border-b  pb-2 border-[#23B14D] flex items-center justify-between ">
                <h3 className="text-lg lg:text-xl font-bold text-gray-800">
                  GREEN in the News
                </h3>
                <button className="cursor-pointer"
                onClick={handleGreenInTheNewsOpen}
                > 
                  <img src="/images/media-press/explore.png" alt="Explore" />
                </button>
              </div>

              {/* Official Spokes people */}
              <div className="border-b  pb-2 border-[#23B14D] flex items-center justify-between ">
                <h3 className="text-lg lg:text-xl font-bold text-gray-800">
                  Official Spokes people
                </h3>
                <button className="cursor-pointer"
                onClick={handleOfficialSpokesPeopleOpen}
                > 
                  <img src="/images/media-press/explore.png" alt="Explore" />
                </button>
              </div>
            </div>

            {/* Bottom Quote */}
            <div className="mt-16 flex relative ">
              <div className="absolute -left-12 -top-4">
                <img src="/images/media-press/shape.png" alt="Shape" />
              </div>
              <div className="">
                <h3 className="text-xl lg:text-2xl font-bold text-gray-800 mb-2">
                  We Don't Tell Stories To Impress.
                </h3>
                <h3 className="text-xl lg:text-2xl font-bold text-gray-800">
                  We Share Stories That Prove What{" "}
                  <span className="text-[#23B14D]">Energy</span> Can Do.
                </h3>
              </div>
              <div className="-mt-2 -ml-7">
                <img src="/images/media-press/shape2.png" alt="Shape" />
              </div>
            </div>
          </div>
        </div>

        <div className="relative z-10 space-y-10 mb-32 lg:-mt-32">
          <div className="   flex justify-end  cursor-pointer">
            <img
              src="/images/media-press/download-the-press-kit.png"
              alt="download the press kit"
            />
          </div>
          <div className="  flex justify-end">
            <button
              type="button"
              onClick={() => setIsRequestQuoteOpen(true)}
              className="cursor-pointer"
            >
              <img
                src="/images/media-press/request-quote.png"
                alt="request a quote"
              />
            </button>
          </div>
        </div>
      </div>
       <Chatbot/>
      <LatestPressReleases
        isOpen={isLatestPressReleasesOpen}
        onClose={handleLatestPressReleasesClose}
        />
      <MediaContactInterviewRequests
        isOpen={isMediaContactOpen}
        onClose={handleMediaContactClose}
      />
      <MediaKitDownload
        isOpen={isMediaKitDownloadOpen}
        onClose={handleMediaKitDownloadClose}
      />
      <GreenInTheNews
        isOpen={isGreenInTheNewsOpen}
        onClose={handleGreenInTheNewsClose}
      />
      <OfficialSpokesPeople
        isOpen={isOfficialSpokesPeopleOpen}
        onClose={handleOfficialSpokesPeopleClose}
      />
      <RequestQuoteAppointment
        isOpen={isRequestQuoteOpen}
        onClose={() => setIsRequestQuoteOpen(false)}
      />
    </React.Fragment>
  );
};

export default MediaPress;
