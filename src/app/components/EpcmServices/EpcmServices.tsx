"use client";

import React from "react";
import TopNavigation from "../TopNavigation/TopNavigation";
import Chatbot from "../Chatbot";
import { useSolarEPCMServices } from "../../../hooks/useSolarEPCMServices";
import Link from "next/link";

const EpcmServices = () => {
  const { epcmData, error } = useSolarEPCMServices();



  if (error) {
    return (
      <React.Fragment>
        <div className="">
          <TopNavigation />
          <div className="flex items-center justify-center h-screen">
            <div className="text-xl text-red-500">
              Error loading EPCM services data
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      <div className="">
        <div className="absolute lg:block hidden -z-10 opacity-40 right-0 top-0">
          <img
            src="/images/epcm-services/mainImg.png"
            className="lg:h-[150vh]"
            alt="mainImg"
          />
        </div>
        <TopNavigation />
        <div className="flex h-full">
          {/* Left Side  */}
          <div className="w-1/6  items-center justify-center">
            <div className="fixed lg:block hidden top-1/5 left-14">
              <img
                src="/images/epcm-services/solarEpcmServices.png"
                alt="solarEpcmServices"
                className="w-12"
              />
            </div>
          </div>
          {/* Main Content Panel */}
          <div className="w-full m-4 lg:mx-0  lg:text-left lg:my-20">
            {/* Header Section */}
            <div className="mb-8">
              <h1 className="text-3xl lg:text-3xl font-black text-gray-800 mb-2">
                {epcmData?.header?.title ? (
                  epcmData.header.title.includes("EPCM") ? (
                    <>
                      {epcmData.header.title.split("EPCM")[0]}
                      <span className="text-[#23B14D]">EPCM</span>
                      {epcmData.header.title.split("EPCM")[1]}
                    </>
                  ) : (
                    epcmData.header.title
                  )
                ) : (
                  <>
                    SOLAR <span className="text-[#23B14D]">EPCM</span> SERVICES
                  </>
                )}
              </h1>
              <h2 className=" text-xl lg:text-3xl text-[#23B14D] italic mb-4">
                {epcmData?.header?.subtitle ||
                  "Designed for Complexity. Delivered with Precision. Managed to Scale"}
              </h2>
              {epcmData?.introduction.text.split("\n").map((para, index) => (
                <p
                  key={index}
                  className={`p-2 ${index === 0 ? "max-w-2xl" : ""}`}
                >
                  {para.split(/\b(GREEN)\b/gi).map((part, i) =>
                    part.toLowerCase() === "green" ? (
                      <span key={i} className="text-[#23B14D] font-black">
                        {part}
                      </span>
                    ) : (
                      <React.Fragment key={i}>{part}</React.Fragment>
                    )
                  )}
                </p>
              ))}
            </div>

            {/* EPCM Services Grid */}
            <div className="  flex lg:flex-row flex-col lg:space-x-6  lg:mb-8">
              {/* First Row Services */}
              {epcmData?.services?.slice(0, 2).map((service, index) => (
                <div
                  key={service.id}
                  style={{
                    transform:"skewX(-16deg)"
                  }}
                  className={`${
                    index === 1 ? "my-4 -ml-4" : ""
                  } w-9/12 mx-auto lg:w-auto lg:mx-0 p-4 border-4 border-[#f0f9da] `}
                >
                  <h3 className="text-xl font-black text-gray-800 mb-3">
                    {service.heading}
                  </h3>
                  <ul className="text-sm font-semibold text-gray-700 space-y-2">
                    {service.points?.map((point, pointIndex) => (
                      <li key={pointIndex}>{point}</li>
                    ))}
                  </ul>
                </div>
              )) || (
                <>
                  <div style={{transform:"skewX(-16deg)"}} className="w-9/12 mx-auto lg:w-auto lg:mx-0 p-4 border-4  border-[#f0f9da]  ">
                    <h3 className="text-xl font-black text-gray-800 mb-3">
                      Engineering
                    </h3>
                    <ul className="text-sm font-semibold text-gray-700 space-y-2">
                      <li>Site-specific feasibility and load modeling</li>
                      <li>Climate-resilient design methodologies</li>
                      <li>Grid, off-grid, and hybrid design specialization</li>
                    </ul>
                  </div>
                  <div style={{transform:"skewX(-16deg)"}} className="p-4 my-4 w-9/12 mx-auto lg:w-auto lg:mx-0 -ml-4 border-4 border-[#f0f9da]  ">
                    <h3 className="text-xl font-black text-gray-800 mb-3">
                      Procurement
                    </h3>
                    <ul className="text-sm font-semibold text-gray-700 space-y-2">
                      <li>Global supplier network with delivery certainty</li>
                      <li>Cost-stabilized sourcing and inventory control</li>
                      <li>
                        Compliance with IEC, AS/NZS, and local utility specs
                      </li>
                    </ul>
                  </div>
                </>
              )}
              <div style={{transform:"skewX(-16deg)"}} className="ml-10 lg:block hidden bg-[#e8f3d5] py-8 text-center text-xl font-bold p-2 px-4  w-[300px] shadow-2xl">
                {epcmData?.quote?.text ||
                  "We embed it — into every process, every panel, every kilowatt."}
              </div>
            </div>

            <div className="  flex lg:flex-row flex-col lg:space-x-6  lg:mb-8">
              {/* Second Row Services */}
              {epcmData?.services?.slice(2, 4).map((service, index) => (
                <div
                  key={service.id}
                  style={{
                    transform:"skewX(-16deg)"
                  }}
                  className={`${
                    index === 1 ? "my-4 -ml-4" : ""
                  } w-9/12 mx-auto lg:w-auto lg:mx-0 p-4 border-4 border-[#f0f9da] `}
                >
                  <h3 className="text-xl font-black text-gray-800 mb-3">
                    {service.heading}
                  </h3>
                  <ul className="text-sm font-semibold text-gray-700 space-y-2">
                    {service.points?.map((point, pointIndex) => (
                      <li key={pointIndex}>{point}</li>
                    ))}
                  </ul>
                </div>
              )) || (
                <>
                  <div
                  style={{
                    transform:"skewX(-16deg)"
                  }}
                  className="w-9/12 mx-auto lg:w-auto lg:mx-0 p-4 border-4  border-[#f0f9da]  ">
                    <h3 className="text-xl font-black text-gray-800 mb-3">
                      Construction
                    </h3>
                    <ul className="text-sm font-semibold text-gray-700 space-y-2">
                      <li>
                        In-house deployment: civil, electrical, mechanical
                      </li>
                      <li>Remote and difficult terrain execution experts</li>
                      <li>Schedule-bound, safety-prioritized site delivery</li>
                    </ul>
                  </div>
                  <div
                   style={{
                    transform:"skewX(-16deg)"
                   }}
                  className="p-4 my-4 w-9/12 mx-auto lg:w-auto lg:mx-0 -ml-4 border-4 border-[#f0f9da]  ">
                    <h3 className="text-xl font-black text-gray-800 mb-3">
                      Management
                    </h3>
                    <ul className="text-sm font-semibold text-gray-700 space-y-2">
                      <li>Project lifecycle leadership: plan to performance</li>
                      <li>Embedded risk tracking and response automation</li>
                      <li>Stakeholder reporting, permitting, and governance</li>
                    </ul>
                  </div>
                </>
              )}
              <div
              style={{
                transform:"skewX(-16deg)"
              }}
              className="ml-10 lg:block hidden bg-[#e8f3d5] py-8 text-center text-xl font-bold p-2 px-4  w-[300px] shadow-2xl">
                {epcmData?.quote?.text ||
                  "We embed it — into every process, every panel, every kilowatt."}
              </div>
            </div>

            {/* Bottom Tagline */}
            <div className="flex lg:flex-row flex-col lg:space-y-0 space-y-4 lg:justify-between">
              <div className=" italic">
                <p className="text-2xl text-gray-800">
                  {epcmData?.tagline?.text?.split(".")[0] ||
                    "You Don't Engage GREEN to Oversee Solar"}
                  .
                </p>
                <p className="text-2xl font-bold text-gray-800">
                  {epcmData?.tagline?.text?.split(".")[1]?.trim() ||
                    "You Engage Us to Deliver It"}
                  .
                </p>
              </div>
              <div className="space-y-8">
                <Link
                href={epcmData?.callToActions[0].href || "#"}
                  className=" flex justify-end relative   cursor-pointer"
                >
                  <img src="/images/epcm-services/epcmBtn.png" alt="epcm" />
                  <div className=" top-3 text-lg font-bold absolute left-6">
                      {epcmData?.callToActions[0].text }
                  </div>
                </Link>
                <Link 
                href={epcmData?.callToActions[1].href || "#"}
                className=" flex relative justify-end  cursor-pointer">
                  <img
                    src="/images/epcm-services/technicalBtn.png"
                    alt="technical"
                  />
                  <div className=" top-3 text-lg font-bold absolute right-6">
                      {epcmData?.callToActions[1].text }{` >`}
                  </div>
                </Link>
                   <Link 
                href={epcmData?.callToActions[2].href || "#"}
                className=" flex justify-end relative cursor-pointer">
                  <img
                    src="/images/epcm-services/bookingBtn.png"
                    alt="project porfolio"
                  />
                  <div className=" top-3 text-lg font-bold absolute right-6">
                      {epcmData?.callToActions[2].text }{` >`}
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="lg:block hidden">
        <Chatbot />
      </div>
    </React.Fragment>
  );
};

export default EpcmServices;
