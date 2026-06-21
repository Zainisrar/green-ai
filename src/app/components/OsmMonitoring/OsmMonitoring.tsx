"use client";
import React, { useState } from "react";
import TopNavigation from "../TopNavigation/TopNavigation";
import Chatbot from "../Chatbot";
import { useOMMonitoring } from "../../../hooks/useOMMonitoring";
import OMProposal from "./Modals/OMProposal";
import LiveDemoPOC from "./Modals/LiveDemoPOC";

const OsmMonitoring = () => {
  const { omData,  error } = useOMMonitoring();
  const [isOMProposalOpen, setIsOMProposalOpen] = useState(false);
  const [isLiveDemoOpen, setIsLiveDemoOpen] = useState(false);


  if (error) {
    return (
      <React.Fragment>
        <div className=" ">
          <TopNavigation />
          <div className="flex items-center justify-center h-screen">
            <div className="text-xl text-red-500">
              Error loading O&M monitoring data
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
        <div className="z-50 relative">
          <TopNavigation />
        </div>
      <div className=" ">
        <div className="flex mb-10 h-full">
          <div className="absolute top-0 lg:block hidden left-32">
            <img
              className="h-[120vh] -z-10 relative"
              src="/images/osm-monitoring/mainImg.png"
              alt="mainImg"
            />
          </div>
          {/* Left Side Image */}
          <div className="w-1/6   lg:flex hidden  items-center justify-center">
            <div className="lg:fixed  left-10 top-1/4">
              <img
                src="/images/osm-monitoring/osm.png"
                className="w-10"
                alt="OSM Monitoring"
              />
            </div>
          </div>

          {/* Main Content Area */}
          <div className="w-full min-w-0 px-4 lg:px-8 pt-8">
            {/* Main Title */}
            <div className="mb-8 lg:w-2/3">
              <h1 className="text-3xl lg:text-4xl 2xl:text-5xl font-black text-gray-800 mb-4 leading-tight">
                {omData?.header?.title?.replace("MONITORING", "") || "O&M &"}{" "}
                <span className="text-[#23B14D]">MONITORING</span>
              </h1>
              <p className="text-gray-600 text-lg mb-2">
                {omData?.header?.subtitle ||
                  "At GREEN, Operations & Maintenance (O&M) is not an afterthought."}
              </p>
              <p className="text-gray-600 text-lg mb-2">
                {omData?.header?.description?.split(".")[0] ||
                  "It is a core pillar of our Engineering DNA — designed to increase long-term system efficiency, financial integrity, and real-world impact"}
                .
              </p>
              <p className="text-gray-600 text-lg">
                {omData?.header?.description?.split(".")[1]?.trim() ||
                  "We don't just build systems. We stand behind them — with real-time data, preventative protocols, and field-tested service teams"}
                .
              </p>
            </div>

            {/* Content Layout */}
            <div className="flex lg:flex-row flex-col  lg:space-x-8">
              {/* Left Column - O&M Philosophy */}
              <div className="w-full">
                <h3 className="text-xl lg:text-2xl font-bold text-gray-800 mb-6">
                  {omData?.philosophy?.heading || "Our O&M Philosophy"}
                </h3>

                <div className="grid gap-8 lg:gap-10 lg:grid-cols-[1.3fr_1fr_auto]">
                  <div className="min-w-0 2xl:-ml-20">
                    <div className="space-y-8 ">
                      {omData?.philosophy?.items?.map((item, index) => (
                        <div
                          key={index}
                          className={`flex space-x-4 ${
                            index === 0
                              ? "ml-4"
                              : index === 1
                              ? "2xl:-ml-20"
                              : "2xl:-ml-24"
                          }`}
                        >
                          <div className="flex-shrink-0">
                            <img
                              src="/images/osm-monitoring/lighting.png"
                              alt="lighting"
                              className="w-8 h-8"
                            />
                          </div>
                          <div>
                            <h4 className="text-lg lg:text-xl font-bold text-gray-800 mb-2">
                              {item.title}
                            </h4>
                            <p className="text-gray-600 text-sm">
                              {item.description}
                            </p>
                          </div>
                        </div>
                      )) || (
                        <>
                          <div className="flex space-x-4 ml-4">
                            <div className="flex-shrink-0">
                              <img
                                src="/images/osm-monitoring/lighting.png"
                                alt="lighting"
                                className="w-8 h-8"
                              />
                            </div>
                            <div>
                              <h4 className="text-lg lg:text-xl font-bold text-gray-800 mb-2">
                                Predict. Prevent. Perform.
                              </h4>
                              <p className="text-gray-600 text-sm">
                                Downtime isn't an option — especially in
                                mission-critical environments like hospitals and
                                schools. GREEN's O&M model is built around
                                predictive diagnostics, remote oversight, and
                                rapid field response.
                              </p>
                            </div>
                          </div>

                          <div className="flex space-x-4 2xl:-ml-20">
                            <div className="flex-shrink-0">
                              <img
                                src="/images/osm-monitoring/lighting.png"
                                alt="lighting"
                                className="w-8 h-8"
                              />
                            </div>
                            <div>
                              <h4 className="text-lg lg:text-xl font-bold text-gray-800 mb-2">
                                Standardized. Yet Site-Specific.
                              </h4>
                              <p className="text-gray-600 text-sm">
                                Our O&M structure is templated for efficiency,
                                but every deployment is calibrated for local
                                safety, usage profile, and stakeholder needs.
                              </p>
                            </div>
                          </div>

                          <div className="flex space-x-4 2xl:-ml-24">
                            <div className="flex-shrink-0">
                              <img
                                src="/images/osm-monitoring/lighting.png"
                                alt="lighting"
                                className="w-8 h-8"
                              />
                            </div>
                            <div>
                              <h4 className="text-lg lg:text-xl font-bold text-gray-800 mb-2">
                                Contracted for Clarity. Delivered with
                                Discipline.
                              </h4>
                              <p className="text-gray-600 text-sm">
                                Our clients benefit from clear SLAs, cost
                                transparency, and KPI-driven service
                                performance.
                              </p>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="min-w-0 2xl:ml-20">
                    <div>
                      <div className="mt-20 mb-10 lg:my-0 flex items-center space-x-4">
                        <div className="flex-shrink-0">
                          <img
                            src="/images/osm-monitoring/shape.png"
                            alt="shape"
                            className="w-16"
                          />
                        </div>
                        <div className="min-w-0">
                          <h3 className="text-xl lg:text-2xl font-bold text-gray-800 mb-2">
                            <span className="text-[#23B14D]">Sustaining</span>{" "}
                            Systems.
                            <br />
                            <span className="text-[#23B14D]">
                              Securing
                            </span>{" "}
                            Performance.
                            <br />
                            <span className="text-[#23B14D]">Scaling</span>{" "}
                            Trust.
                          </h3>
                        </div>
                      </div>
                    </div>

                    <div className="lg:mt-8 text-center lg:text-left min-w-0">
                      <h4 className="text-xl lg:text-2xl font-bold italic text-gray-800 mb-4">
                        {omData?.whyMatters?.heading || "Why This Matters"}
                      </h4>
                      <div className="space-y-2 text-base lg:text-lg max-w-md">
                        {omData?.whyMatters?.points?.map((point, index) => (
                          <p key={index} className="text-gray-600">
                            —{" "}
                            <span className="text-[#23B14D] font-semibold">
                              {point.split(" ")[0]} {point.split(" ")[1]}{" "}
                              {point.split(" ")[2]} {point.split(" ")[3]}{" "}
                              {point.split(" ")[4]}
                            </span>{" "}
                            {point.split(" ").slice(5).join(" ")}
                          </p>
                        )) || (
                          <>
                            <p className="text-gray-600">
                              —{" "}
                              <span className="text-[#23B14D] font-semibold">
                                Systems that are not monitored
                              </span>{" "}
                              Fail Quietly.
                            </p>
                            <p className="text-gray-600">
                              —{" "}
                              <span className="text-[#23B14D] font-semibold">
                                Systems that are not maintained
                              </span>{" "}
                              Fail Early.
                            </p>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="mt-10 lg:mt-0 mb-10 flex flex-col items-center lg:items-end gap-6 justify-end">
                    <button
                      type="button"
                      onClick={() => setIsOMProposalOpen(true)}
                      className="inline-block cursor-pointer"
                    >
                      <div
                        style={{ transform: "skewX(-16deg)" }}
                        className="bg-gradient-to-r from-[#54b85a] to-[#e6f24d] px-8 py-3 shadow-md"
                      >
                        <span className="block text-sm lg:text-base font-bold text-gray-900 whitespace-nowrap">
                          {(omData?.callToActions?.[0]?.text || "Request an O&M Proposal") + " >"}
                        </span>
                      </div>
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsLiveDemoOpen(true)}
                      className="inline-block cursor-pointer"
                    >
                      <div
                        style={{ transform: "skewX(-16deg)" }}
                        className="bg-gradient-to-r from-[#54b85a] to-[#e6f24d] px-8 py-3 shadow-md"
                      >
                        <span className="block text-sm lg:text-base font-bold text-gray-900 whitespace-nowrap">
                          {(omData?.callToActions?.[1]?.text || "Book a Live Demo of GREEN POC") + " >"}
                        </span>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      <div className="lg:block hidden">
        <Chatbot />
      </div>
      </div>
      <OMProposal isOpen={isOMProposalOpen} onClose={() => setIsOMProposalOpen(false)} />
      <LiveDemoPOC isOpen={isLiveDemoOpen} onClose={() => setIsLiveDemoOpen(false)} />
    </React.Fragment>
  );
};

export default OsmMonitoring;
