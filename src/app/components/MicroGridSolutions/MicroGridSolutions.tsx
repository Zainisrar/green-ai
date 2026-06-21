"use client";
import React, { useState } from "react";
import TopNavigation from "../TopNavigation/TopNavigation";
import Chatbot from "../Chatbot";
import { useHybridMicrogridSolutions } from "../../../hooks/useHybridMicrogridSolutions";
import Link from "next/link";
import SystemArchitect from "./Modals/SystemArchitect";
import DeploymentReview from "./Modals/DeploymentReview";

const MicroGridSolutions = () => {
  const { microgridData,  error } = useHybridMicrogridSolutions();
  const [isArchitectOpen, setIsArchitectOpen] = useState(false);
  const [isDeploymentReviewOpen, setIsDeploymentReviewOpen] = useState(false);


  if (error) {
    return (
      <React.Fragment>
        <TopNavigation />
        <div className="flex items-center justify-center h-screen">
          <div className="text-xl text-red-500">
            Error loading microgrid solutions data
          </div>
        </div>
      </React.Fragment>
    );
  }

  const hybridSolution = microgridData?.solutions?.find(
    (s) => s.id === "hybridSystems"
  );
  const microgridSolution = microgridData?.solutions?.find(
    (s) => s.id === "microgrids"
  );

  return (
    <React.Fragment>
      <TopNavigation />
      <div className=" absolute top-0  left-0 lg:left-auto lg:right-0">
        <img src="/images/microgrid-solutions/mainImg.png" className="w-screen lg:w-auto lg:h-[130vh]" alt="lgImg" />
      </div>
      <div className="">
        {/* Mobile Layout */}
        <div className="lg:hidden px-4 py-6 relative z-50 ">
          {/* Title */}
          <div className="mb-4">
            <h1 className="text-3xl sm:text-4xl font-black text-gray-800 leading-tight">
              {microgridData?.header?.title?.split(" ")[0] || "HYBRID"} &
              <br />
              {microgridData?.header?.title?.split(" ")[2] || "MICROGRID"}
              <br />
              <span className="text-[#23B14D]">
                {microgridData?.header?.title
                  ?.split("MICROGRID")
                  .slice(2)
                  .join(" ")}
              </span>
            </h1>
          </div>

          {/* Subtitle */}
          <div className="mb-4">
            <h2 className="text-xl lg:text-2xl font-bold text-gray-800 mb-2">
              {microgridData?.header?.subtitle ||
                "This Is Power, Engineered to Stay On"}
            </h2>
            <p className="text-sm text-gray-600 italic">
              {microgridData?.header?.description ||
                "In the places where the grid is weak, unreliable, or nonexistent — GREEN builds energy ecosystems that never stop."}
            </p>
          </div>

          {/* Quote Section */}
          <div className="mb-6 text-center">
            <p className="text-lg font-bold italic text-gray-800">
              {microgridData?.quote?.text ||
                "Where Energy Is Unstable, We Deliver What Doesn't Blink."}
            </p>
          </div>

          {/* Hybrid Systems */}
          <div className="mb-6">
            <h3 className="text-lg lg:text-xl font-bold text-gray-800 mb-3">
              {hybridSolution?.heading || "Hybrid Systems"}
            </h3>
            <ul className="space-y-2 text-sm text-gray-700">
              {hybridSolution?.points?.map((point, index) => (
                <li key={index} className="flex items-start space-x-2">
                  <span className="text-[#23B14D] font-bold">•</span>
                  <span>{point}</span>
                </li>
              )) || (
                <>
                  <li className="flex items-start space-x-2">
                    <span className="text-[#23B14D] font-bold">•</span>
                    <span>Solar + Battery + Diesel + Grid</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-[#23B14D] font-bold">•</span>
                    <span>Smart switching & fuel-saving logic</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-[#23B14D] font-bold">•</span>
                    <span>Zero blackout tolerance</span>
                  </li>
                </>
              )}
            </ul>
          </div>

          {/* Microgrids */}
          <div className="mb-6">
            <h3 className="text-lg lg:text-xl font-bold text-gray-800 mb-3">
              {microgridSolution?.heading || "Microgrids"}
              <span className="text-xs text-[#23B14D] italic ml-2">
                Let's Talk Energy
              </span>
            </h3>
            <ul className="space-y-2 text-sm text-gray-700">
              {microgridSolution?.points?.map((point, index) => (
                <li key={index} className="flex items-start space-x-2">
                  <span className="text-[#23B14D] font-bold">•</span>
                  <span>{point}</span>
                </li>
              )) || (
                <>
                  <li className="flex items-start space-x-2">
                    <span className="text-[#23B14D] font-bold">•</span>
                    <span>From 10 kW to multi-megawatt</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-[#23B14D] font-bold">•</span>
                    <span>Designed for islands, districts, institutions</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-[#23B14D] font-bold">•</span>
                    <span>Plug-and-deploy with GRID-INTEL™</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-[#23B14D] font-bold">•</span>
                    <span>Remote command & visibility</span>
                  </li>
                </>
              )}
            </ul>
          </div>

          {/* Use Cases */}
          <div className="mb-6">
            <div
            style={{
              transform:"skewX(-16deg)"
            }}
            className="bg-[#f8f9d9] w-full max-w-[300px] mx-auto p-4 rounded">
              <div>
              <h3 className="text-lg lg:text-xl font-bold text-gray-800 mb-3">
                {microgridData?.useCases?.heading ||
                  "Use-Cases We've Engineered"}
              </h3>
              <ul className="space-y-2 text-sm text-gray-700">
                {microgridData?.useCases?.items?.map((item, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <span className="text-[#23B14D] font-bold">•</span>
                    <span>{item}</span>
                  </li>
                )) || (
                  <>
                    <li className="flex items-start space-x-2">
                      <span className="text-[#23B14D] font-bold">•</span>
                      <span>Rural hospitals with 24/7 uptime</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-[#23B14D] font-bold">•</span>
                      <span>Schools powered entirely off-grid</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-[#23B14D] font-bold">•</span>
                      <span>Agricultural cold chains deep inland</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-[#23B14D] font-bold">•</span>
                      <span>Telecom towers beyond road access</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-[#23B14D] font-bold">•</span>
                      <span>Island communities free from diesel lock-in</span>
                    </li>
                  </>
                )}
              </ul>
              </div>
            </div>
          </div>

          {/* Bottom Description */}
          <div className="mb-6 text-center">
            <p className="text-sm text-gray-800 mb-2">
              {microgridData?.statement?.text?.split("—")[0]?.trim() ||
                "We design complete hybrid and microgrid systems that balance solar, battery, diesel, and grid"}
            </p>
            <p className="text-sm text-[#23B14D] italic font-semibold">
              —{" "}
              {microgridData?.statement?.text?.split("—")[1]?.trim() ||
                "with zero disruption, and full intelligence."}
            </p>
          </div>

          {/* Call to Action Buttons */}
          <div className="flex flex-col items-center gap-6">
            <button
              type="button"
              onClick={() => setIsArchitectOpen(true)}
              className="relative inline-block cursor-pointer w-64 sm:w-72"
            >
              <img
                src="/images/microgrid-solutions/systemarchitect.png"
                alt="Talk to a system architect"
                className="w-full"
              />
              <div style={{ transform: "skewX(-16deg)" }} className="absolute inset-0 flex items-center justify-center px-3 text-xs lg:text-sm font-bold whitespace-nowrap">
                {microgridData?.callToActions?.[0]?.text || "Talk to a System Architect"} {` >`}
              </div>
            </button>
            <button
              type="button"
              onClick={() => setIsDeploymentReviewOpen(true)}
              className="relative inline-block cursor-pointer w-64 sm:w-72"
            >
              <img src="/images/microgrid-solutions/book.png" alt="Book a deployment review" className="w-full" />
              <div style={{ transform: "skewX(-16deg)" }} className="absolute inset-0 flex items-center justify-center px-3 text-xs lg:text-sm font-bold whitespace-nowrap">
                {microgridData?.callToActions?.[1]?.text || "Book a Deployment Review"} {` >`}
              </div>
            </button>
            <Link
              href={microgridData?.callToActions?.[2]?.href || "#"}
              className="relative inline-block cursor-pointer w-64 sm:w-72"
            >
              <img
                src="/images/microgrid-solutions/downloadhybrid.png"
                alt="downloadhybrid"
                className="w-full"
              />
              <div style={{ transform: "skewX(-16deg)" }} className="absolute inset-0 flex items-center justify-center px-3 text-xs lg:text-sm font-bold whitespace-nowrap">
                {microgridData?.callToActions?.[2]?.text}
              </div>
            </Link>
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden lg:flex h-full">
          {/* Left Side  */}
          <div className="w-1/6 flex items-center justify-center">
            <div className="fixed top-1/4 left-14">
              <img
                src="/images/microgrid-solutions/hybridLogo.png"
                alt="hybridLogo"
                className="w-[30px]"
              />
            </div>
          </div>

          {/* Main Content Section */}
          <div className="lg:w-2/4 flex flex-col pt-8">
            {/* Main Title */}
            <div className="mb-8">
              <h1 className="text-3xl lg:text-4xl 2xl:text-5xl font-black text-gray-800 mb-4 leading-tight">
                {microgridData?.header?.title &&
                  (() => {
                    const title = microgridData.header.title;
                    const parts = title.split(/(MICROGRID)/i); // splits and keeps the word "Microgrid"

                    return (
                      <>
                        {parts[0]?.trim()}{" "}
                        {parts[1] && (
                          <span className="text-[#23B14D]">{parts[1]}</span>
                        )}{" "}
                        {parts[2]?.trim()}
                      </>
                    );
                  })()}
              </h1>
              <h2 className="text-xl lg:text-2xl font-bold text-gray-800 mb-2">
                {microgridData?.header?.subtitle ||
                  "This Is Power, Engineered to Stay On"}
              </h2>
              <p className="text-gray-600 text-lg italic">
                {microgridData?.header?.description ||
                  "In the places where the grid is weak, unreliable, or nonexistent — GREEN builds energy ecosystems that never stop"}
              </p>
            </div>

            {/* Two Column Content */}
            <div className="flex space-x-8 mb-8">
              {/* Hybrid Systems Column */}
              <div className="w-1/2">
                <h3 className="text-xl lg:text-2xl font-bold text-gray-800 mb-4">
                  {hybridSolution?.heading || "Hybrid Systems"}
                </h3>
                <ul className="space-y-2 text-gray-700">
                  {hybridSolution?.points?.map((point, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <span className="text-[#23B14D] font-bold">•</span>
                      <span>{point}</span>
                    </li>
                  )) || (
                    <>
                      <li className="flex items-start space-x-2">
                        <span className="text-[#23B14D] font-bold">•</span>
                        <span>Solar + Battery + Diesel + Grid</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <span className="text-[#23B14D] font-bold">•</span>
                        <span>Smart switching & fuel-saving logic</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <span className="text-[#23B14D] font-bold">•</span>
                        <span>Zero blackout tolerance</span>
                      </li>
                    </>
                  )}
                </ul>
              </div>

              {/* Microgrids Column */}
              <div className="w-1/2">
                <h3 className="text-xl lg:text-2xl font-bold text-gray-800 mb-4">
                  {microgridSolution?.heading || "Microgrids"}
                </h3>
                <ul className="space-y-2 text-gray-700">
                  {microgridSolution?.points?.map((point, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <span className="text-[#23B14D] font-bold">•</span>
                      <span>{point}</span>
                    </li>
                  )) || (
                    <>
                      <li className="flex items-start space-x-2">
                        <span className="text-[#23B14D] font-bold">•</span>
                        <span>From 10 kW to multi-megawatt</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <span className="text-[#23B14D] font-bold">•</span>
                        <span>
                          Designed for islands, districts, institutions
                        </span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <span className="text-[#23B14D] font-bold">•</span>
                        <span>Plug-and-deploy with GRID-INTEL™</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <span className="text-[#23B14D] font-bold">•</span>
                        <span>Remote command & visibility</span>
                      </li>
                    </>
                  )}
                </ul>
              </div>
            </div>

            {/* Use Cases Section */}
            <div className="mb-8">
              <div
              style={{
                transform:"skewX(-16deg)"
              }}
              className="bg-[#f8f9d9]/80 p-6 shadow-lg">
                <div>
                <h3 className="text-xl lg:text-2xl font-bold text-gray-800 mb-4">
                  {microgridData?.useCases?.heading ||
                    "Use-Cases We've Engineered"}
                </h3>
                <div className="grid lg:grid-cols-2 gap-4">
                  <ul className="space-y-2 text-gray-700">
                    {microgridData?.useCases?.items
                      ?.slice(0, 3)
                      .map((item, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <span className="text-[#23B14D] font-bold">•</span>
                          <span>{item}</span>
                        </li>
                      )) || (
                      <>
                        <li className="flex items-start space-x-2">
                          <span className="text-[#23B14D] font-bold">•</span>
                          <span>Rural hospitals with 24/7 uptime</span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <span className="text-[#23B14D] font-bold">•</span>
                          <span>Schools powered entirely off-grid</span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <span className="text-[#23B14D] font-bold">•</span>
                          <span>Agricultural cold chains deep inland</span>
                        </li>
                      </>
                    )}
                  </ul>
                  <ul className="space-y-2 text-gray-700">
                    {microgridData?.useCases?.items
                      ?.slice(3)
                      .map((item, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <span className="text-[#23B14D] font-bold">•</span>
                          <span>{item}</span>
                        </li>
                      )) || (
                      <>
                        <li className="flex items-start space-x-2">
                          <span className="text-[#23B14D] font-bold">•</span>
                          <span>Telecom towers beyond road access</span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <span className="text-[#23B14D] font-bold">•</span>
                          <span>
                            Island communities free from diesel lock-in
                          </span>
                        </li>
                      </>
                    )}
                  </ul>
                </div>
                </div>
              </div>
            </div>

            {/* Bottom Description */}
          </div>
        </div>
        <div className=" flex lg:flex-row flex-col space-y-8 lg:space-y-0 lg:justify-between lg:items-end px-4 lg:px-14 mb-10 lg:mb-32">
          <div className="lg:mb-8 min-w-0 lg:max-w-xl">
            <p className="text-xl text-gray-800 mb-2">
              {microgridData?.statement?.text?.split("—")[0]?.trim() ||
                "We design complete hybrid and microgrid systems that balance solar, battery, diesel, and grid"}
            </p>
            <p className="text-xl text-[#23B14D] italic font-semibold">
              —{" "}
              {microgridData?.statement?.text?.split("—")[1]?.trim() ||
                "with zero disruption, and full intelligence."}
            </p>
          </div>
          <div className="hidden lg:flex flex-col items-end gap-6">
            <button
              type="button"
              onClick={() => setIsArchitectOpen(true)}
              className="relative inline-block cursor-pointer"
            >
              <img
                src="/images/microgrid-solutions/systemarchitect.png"
                alt="Talk to a system architect"
              />
              <div style={{ transform: "skewX(-16deg)" }} className="absolute inset-0 flex items-center justify-center px-3 text-xs lg:text-sm font-bold whitespace-nowrap">
                {microgridData?.callToActions?.[0]?.text || "Talk to a System Architect"} {` >`}
              </div>
            </button>
            <button
              type="button"
              onClick={() => setIsDeploymentReviewOpen(true)}
              className="relative inline-block cursor-pointer"
            >
              <img src="/images/microgrid-solutions/book.png" alt="Book a deployment review" />
              <div style={{ transform: "skewX(-16deg)" }} className="absolute inset-0 flex items-center justify-center px-3 text-xs lg:text-sm font-bold whitespace-nowrap">
                {microgridData?.callToActions?.[1]?.text || "Book a Deployment Review"} {` >`}
              </div>
            </button>
            <Link
              href={microgridData?.callToActions?.[2]?.href || "#"}
              className="relative inline-block cursor-pointer"
            >
              <img
                src="/images/microgrid-solutions/downloadhybrid.png"
                alt="downloadhybrid"
              />
              <div style={{ transform: "skewX(-16deg)" }} className="absolute inset-0 flex items-center justify-center px-3 text-xs lg:text-sm font-bold whitespace-nowrap">
                {microgridData?.callToActions?.[2]?.text}
              </div>
            </Link>
          </div>
        </div>
        {/* Desktop Only Elements */}
        <div className="hidden lg:block">
          <div className="absolute right-2 top-1/3 w-4/12 cursor-pointer">
            <div className="text-2xl flex items-center font-bold italic">
              <div className="mt-8 relative top-4 left-0">
                <img
                  src="/images/microgrid-solutions/vector.png"
                  className="w-20 lg:block"
                  alt="shape"
                />
              </div>
              <div className="mt-4">
                {microgridData?.quote?.text ? (
                  <>
                    {microgridData.quote.text
                      .split(/\b(Energy|Deliver)\b/g)
                      .map((part, index) =>
                        part === "Energy" || part === "Deliver" ? (
                          <span key={index} className="text-green-600">
                            {part}
                          </span>
                        ) : (
                          <span key={index}>{part}</span>
                        )
                      )}
                  </>
                ) : (
                  <>
                    Where <span className="text-green-600">Energy</span> Is
                    Unstable, We <span className="text-green-600">Deliver</span>{" "}
                    What Doesn't Blink.
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="lg:block hidden">
        <Chatbot />
      </div>
      <SystemArchitect isOpen={isArchitectOpen} onClose={() => setIsArchitectOpen(false)} />
      <DeploymentReview isOpen={isDeploymentReviewOpen} onClose={() => setIsDeploymentReviewOpen(false)} />
    </React.Fragment>
  );
};

export default MicroGridSolutions;
