"use client";
import React, { useEffect, useState } from "react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}
const WaystoGetInvolved = ({ isOpen, onClose }: Props) => {
  if (!isOpen) return null;

  return (
    <React.Fragment>
      {/* Modal Overlay */}
      <div className="fixed inset-0 bg-black/20 z-[99999999999999] flex items-center justify-center">
        {/* Modal Container */}
        <div className="relative w-full max-w-6xl mx-4">
          {/* Skewed Modal Background */}
          <div
            className="bg-gray-100 transform  py-14 border-2 border-[#4CAF50] px-16 relative shadow-2xl"
            style={{ clipPath: "polygon(0 0, 95% 0, 100% 100%, 5% 100%)",
              transform:"skewX(-12deg)"
             }}
          >
            {/* Close Button */}
            <div className="flex justify-end w-full">
              <button
                onClick={onClose}
                style={{
                  transform:"skewX(12deg)"
                }}
                className="   cursor-pointer text-gray-600 hover:text-gray-800 text-2xl z-10 transform "
              >
                <img src="/images/join-us/xicon.png" alt="Close Icon" />
              </button>
            </div>
            {/* Modal Content */}
            <div
            style={{
              transform:"skewX(6deg)"
            }}
            className="transform  max-w-5xl mx-auto">
              {/* Header */}
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-4">
                  Ways to Get Involved
                </h2>
                <div className="w-full h-px bg-gray-400 mb-8"></div>
              </div>

              {/* Grid Layout */}
              <div className="grid grid-cols-2  mb-8">
                {/* Clean Energy Campaigns */}
                <div className="flex ">
                  <div className="w-96">
                    <img
                      src="/images/public-events-volunteering/clean-energy-campaigns.png"
                      alt="Clean Energy Campaigns"
                    />
                  </div>
                  <div className="">
                    <h3 className="font-bold text-gray-800 mb-1">
                      Clean Energy Campaigns
                    </h3>
                    <p className="text-sm text-gray-600 mb-2">
                      Awareness drives, solar literacy, rural connections
                    </p>
                    <button className="flex justify-end w-full">
                      <img
                        src="/images/global-snapshot/exploreBtn.png"
                        alt="explore"
                        className="w-28 "
                      />
                    </button>
                  </div>
                </div>
                {/* School & Campus Outreach */}

                <div className="flex ">
                  <div className="w-96">
                    <img
                      src="/images/public-events-volunteering/school-campus-outreach.png"
                      alt="Clean Energy Campaigns"
                    />
                  </div>
                  <div className="">
                    <h3 className="font-bold text-gray-800 mb-1">
                      School & Campus Outreach
                    </h3>
                    <p className="text-sm text-gray-600 mb-2">
                      STEM sessions, hands-on tech demos, GreenTalks
                    </p>
                    <button className="flex justify-end w-full">
                      <img
                        src="/images/global-snapshot/exploreBtn.png"
                        alt="explore"
                        className="w-28 "
                      />
                    </button>
                  </div>
                </div>
              {/* Community Volunteer Days */}

                <div className="flex mt-10 ">
                  <div className="w-96">
                    <img
                      src="/images/public-events-volunteering/community-volunteer-days.png"
                      alt="Clean Energy Campaigns"
                    />
                  </div>
                  <div className="">
                   <h3 className="font-bold text-gray-800 mb-1">
                      Community Volunteer Days
                    </h3>
                    <p className="text-sm text-gray-600 mb-2">
                      Mini-grid site visits, solar install support, environment
                      cleanup
                    </p>
                    <button className="flex justify-end w-full">
                      <img
                        src="/images/global-snapshot/exploreBtn.png"
                        alt="explore"
                        className="w-28 "
                      />
                    </button>
                  </div>
                </div>
              {/* Energy Advocacy */}

                <div className="flex mt-10 ">
                  <div className="w-96">
                    <img
                      src="/images/public-events-volunteering/energy-advocacy.png"
                      alt="Clean Energy Campaigns"
                    />
                  </div>
                  <div className="">
                   <h3 className="font-bold text-gray-800 mb-1">
                      Community Volunteer Days
                    </h3>
                    <p className="text-sm text-gray-600 mb-2">
                      Mini-grid site visits, solar install support, environment
                      cleanup
                    </p>
                    <button className="flex justify-end w-full">
                      <img
                        src="/images/global-snapshot/exploreBtn.png"
                        alt="explore"
                        className="w-28 "
                      />
                    </button>
                  </div>
                </div>
                  {/* Events & Exhibitions */}

                <div className="flex mt-10 ">
                  <div className="w-96">
                    <img
                      src="/images/public-events-volunteering/events-exhibitions.png"
                      alt="Clean Energy Campaigns"
                    />
                  </div>
                  <div className="">
                      <h3 className="font-bold text-gray-800 mb-1">
                      Events & Exhibitions
                    </h3>
                    <p className="text-sm text-gray-600 mb-2">
                      Attend GREEN public expos, launch days, and energy fairs
                    </p>
                    <button className="flex justify-end w-full">
                      <img
                        src="/images/global-snapshot/exploreBtn.png"
                        alt="explore"
                        className="w-28 "
                      />
                    </button>
                  </div>
                </div>

              

              </div>

              {/* Download Section */}
              <div className="text-right mt-8">
                <p className="text-gray-700">
                  <span className="italic">Download</span>{" "}
                  <a href="/volunteer-welcome-pack.pdf" download className="text-[#23B14D] font-medium underline">
                    Volunteer Welcome Pack (PDF)
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default WaystoGetInvolved;
