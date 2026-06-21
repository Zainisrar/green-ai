"use client";
import React, { useState } from "react";
import Challenge from "./Challenge";
import Solves from "./Solves";
import WhyIntel from "./WhyIntel";
import Scenerios from "./Scenerios";
import Technology from "./Technology";
import Product from "./Product";
import TopNavigation from "../TopNavigation/TopNavigation";
import Chatbot from "../Chatbot";
import { useGridIntel } from "../../../hooks/useGridIntel";
import Link from "next/link";
import TechnicalDeepDive from "./Modals/TechnicalDeepDive";
import SystemArchitectureTeam from "./Modals/SystemArchitectureTeam";

const GridIntel = () => {
  const [isChallengeOpen, setIsChallengeOpen] = useState(false);
  const [isSolvesOpen, setIsSolvesOpen] = useState(false);
  const [isWhyIntelOpen, setIsWhyIntelOpen] = useState(false);
  const [isScenarioOpen, setIsScenarioOpen] = useState(false);
  const [isTechnologyOpen, setIsTechnologyOpen] = useState(false);
  const [isProductOpen, setIsProductOpen] = useState(false);
  const [isDeepDiveOpen, setIsDeepDiveOpen] = useState(false);
  const [isArchitectureTeamOpen, setIsArchitectureTeamOpen] = useState(false);

  const { gridIntelData } = useGridIntel();

  const openChallengeModal = () => {
    setIsChallengeOpen(true);
  };

  const openSolvesModal = () => {
    setIsSolvesOpen(true);
  };

  const openWhyIntelModal = () => {
    setIsWhyIntelOpen(true);
  };

  const openScenarioModal = () => {
    setIsScenarioOpen(true);
  };
  
  const openTechnologyModal = () => {
    setIsTechnologyOpen(true);
  };

  const openProductModal = () => {
    setIsProductOpen(true);
  };

  // Early return after all hooks are called
  if (!gridIntelData) {
    return null;
  }

  const renderCallToActionButton = (index: number, className: string) => {
    const text =
      gridIntelData?.mainPage?.ctaButtons?.[index]?.text ||
      [
        "Schedule a Technical Deep-Dive",
        "Engage Our System Architecture Team",
        "Download the GRID-INTEL™ Product Dossier",
      ][index];
    const buttonContent = (
      <div
        style={{ transform: "skewX(-16deg)" }}
        className={`bg-gradient-to-r from-[#54b85a] to-[#e6f24d] shadow-md ${className}`}
      >
        <span className="block text-sm font-bold text-gray-900 whitespace-nowrap lg:text-base">
          {text} {index < 2 ? ">" : ""}
        </span>
      </div>
    );

    if (index === 0) {
      return (
        <button type="button" onClick={() => setIsDeepDiveOpen(true)} className="inline-block max-w-full cursor-pointer">
          {buttonContent}
        </button>
      );
    }

    if (index === 1) {
      return (
        <button type="button" onClick={() => setIsArchitectureTeamOpen(true)} className="inline-block max-w-full cursor-pointer">
          {buttonContent}
        </button>
      );
    }

    return (
      <Link
        href={gridIntelData?.mainPage?.ctaButtons?.[2]?.href || "#"}
        className="inline-block max-w-full cursor-pointer"
      >
        {buttonContent}
      </Link>
    );
  };

  return (
    <React.Fragment>
        <div  className="">
        <TopNavigation />
      </div>
     <div className="">
 <div className="absolute top-0 lg:block hidden left-72">
        <img
          src="/images/grid-intel/mainImg.png"
          className="h-[150vh] w-10/12"
          alt="lgImg"
        />
      </div>
      <div className="">

        {/* Mobile Layout */}
        <div className="lg:hidden  px-4 py-6 relative z-50 ">
          {/* Title */}
          <div className="mb-4">
            <h1 className="text-3xl sm:text-4xl font-black text-[#23B14D] leading-tight">
              {gridIntelData?.mainPage?.title?.replace("-INTEL", "-") ||
                "GRID-"}
              <span className="text-black">INTEL</span>
            </h1>
          </div>

          {/* Subtitle */}
          <div className="mb-4">
            <h2 className=" font-bold text-xl lg:text-2xl text-[#23B14D] italic mb-2">
              {gridIntelData?.mainPage?.subtitle ||
                "The Intelligence Layer Powering Energy Systems with Precision and Foresight"}
            </h2>
            <p className=" text-gray-600">
              {gridIntelData?.mainPage?.description ||
                "GRID-INTEL™ is GREEN's proprietary platform that controls, balances, and predicts energy flows across solar, battery, diesel, and grid infrastructure — in real time."}
            </p>
          </div>

          {/* Built for Intelligence */}
          <div className="mb-6 text-center">
            <h3 className="text-xl lg:text-2xl font-bold text-gray-800">
              {gridIntelData?.mainPage?.builtForIntelligence?.title ||
                "Built for Intelligence."}
              <br />
              {gridIntelData?.mainPage?.builtForIntelligence?.subtitle ||
                "Backed by Discipline."}
            </h3>
          </div>

          {/* Energy Intelligence Platform */}
          <div className="mb-6">
            <h3 className="text-xl lg:text-2xl font-bold text-gray-800 mb-3">
              {gridIntelData?.mainPage?.energyIntelligencePlatform?.title ||
                "Energy Intelligence Platform"}
            </h3>
            <ul className="space-y-2  text-gray-700">
              {gridIntelData?.mainPage?.features?.map((feature, index) => (
                <li key={index} className="italic">
                  • {feature.text}
                </li>
              )) || (
                <>
                  <li className="italic">• Multi-source energy optimization</li>
                  <li className="italic">• Remote telemetry & command</li>
                  <li className="italic">
                    • Load prediction & performance analytics
                  </li>
                  <li className="italic">
                    • Zero-blackout logic & fault anticipation
                  </li>
                </>
              )}
            </ul>
          </div>

          {/* Interactive Sections */}
          <div className="mb-6">
            <div className="">
              <div className="space-y-6">
                <div className="flex space-x-4">
                  <div>
                    <img src="/images/grid-intel/shape3.png" alt="shape3" />
                  </div>
                  <button
                    onClick={openChallengeModal}
                    className="mt-6 cursor-pointer -ml-16"
                  >
                    <div className="text-lg font-bold text-gray-800 mb-2">
                      The Challenge
                    </div>
                  </button>
                </div>

                <div className="flex space-x-4  ">
                  <div>
                    <img src="/images/grid-intel/shape3.png" alt="shape3" />
                  </div>
                  <button
                    onClick={openSolvesModal}
                    className="mt-6 cursor-pointer  -ml-16"
                  >
                    <div className="text-lg font-bold text-gray-800 mb-2">
                      What GRID-INTEL™
                    </div>
                  </button>
                </div>

                <div className="flex space-x-4 ">
                  <div>
                    <img src="/images/grid-intel/shape3.png" alt="shape3" />
                  </div>
                  <button
                    onClick={openWhyIntelModal}
                    className="mt-6 cursor-pointer -ml-16"
                  >
                    <div className="text-lg font-bold text-[#23B14D] mb-2">
                      What GRID-INTEL™
                    </div>
                  </button>
                </div>

                <div className="flex space-x-4 ">
                  <div>
                    <img src="/images/grid-intel/shape3.png" alt="shape3" />
                  </div>
                  <div className="mt-6  -ml-16 cursor-pointer">
                    <button
                      onClick={openScenarioModal}
                      className="text-lg cursor-pointer font-bold text-gray-800 mb-2"
                    >
                      Built for These Scenarios
                    </button>
                  </div>
                </div>

                <div className="flex space-x-4 ">
                  <div>
                    <img src="/images/grid-intel/shape3.png" alt="shape3" />
                  </div>
                  <div className="mt-6 -ml-16 cursor-pointer ">
                    <button
                      onClick={openTechnologyModal}
                      className="text-lg cursor-pointer font-bold text-gray-800 mb-2"
                    >
                      Technology Stack Overview
                    </button>
                  </div>
                </div>
                <div className="flex space-x-4 ">
                  <div>
                    <img src="/images/grid-intel/shape3.png" alt="shape3" />
                  </div>
                  <div className="mt-6  -ml-16 cursor-pointer ">
                    <button
                      onClick={openProductModal}
                      className="text-lg font-bold cursor-pointer text-gray-800 mb-2"
                    >
                      Product Integration
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Energy You Can Count On */}
          <div className="mb-6">
            <h3 className="text-xl lg:text-2xl font-bold text-gray-800 mb-3">
              {gridIntelData?.mainPage?.energyYouCanCountOn?.title ||
                "Energy You Can Count On"}
            </h3>
            <p className="text-[#23B14D] font-semibold mb-2 ">
              {gridIntelData?.mainPage?.energyYouCanCountOn?.subtitle ||
                "— Even When the Grid Can't Be Counted On"}
            </p>
            <p className="text-gray-600 ">
              {gridIntelData?.mainPage?.energyYouCanCountOn?.description ||
                "We deliver power infrastructure that anticipates failure, absorbs shocks, and ensures continuity — across any terrain, in any nation, under any grid condition."}
            </p>
          </div>

          {/* Run Smarter Section */}
          <div className="mb-6 text-center">
            <div className="space-y-1">
              <p className="text-lg italic font-bold text-gray-800">
                {gridIntelData?.mainPage?.builtForIntelligence?.runSmarter ||
                  "Run Smarter."}
              </p>
              <p className="text-lg font-bold italic text-gray-800">
                {gridIntelData?.mainPage?.builtForIntelligence
                  ?.operateWithConfidence || "Operate with Confidence."}
              </p>
              <p className="text-lg font-bold italic text-gray-800">
                {gridIntelData?.mainPage?.builtForIntelligence
                  ?.scaleWithoutUncertainty || "Scale Without Uncertainty."}
              </p>
            </div>
          </div>

          <div className="mb-10 flex flex-col items-center gap-6">
            {renderCallToActionButton(0, "px-8 py-3")}
            {renderCallToActionButton(1, "px-8 py-3")}
            {renderCallToActionButton(2, "px-8 py-3")}
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden relative lg:block">
          <div className="flex h-full">
            {/* Left Side  */}
            <div className="w-1/6 flex items-center justify-center">
              <div className="lg:fixed top-1/4 left-14">
                <img
                  src="/images/grid-intel/grid-intel.png"
                  alt="Grid Intelligence"
                  className="w-14"
                />
              </div>
            </div>

            {/* Main Content Area */}
            <div className="px-6 lg:px-20 pb-10 pt-8 min-w-0">
              {/* Main Title */}
              <div className="mb-8">
                <h1 className="text-4xl lg:text-5xl 2xl:text-6xl font-black text-[#23B14D] mb-4 leading-tight">
                  {gridIntelData?.mainPage?.title?.replace("INTEL", "") ||
                    "GRID-"}{" "}
                  <span className="text-black">INTEL</span>
                </h1>
                <h2 className="text-xl lg:text-2xl font-bold text-[#23B14D] italic mb-4">
                  {gridIntelData?.mainPage?.subtitle ||
                    "The Intelligence Layer Powering Energy Systems with Precision and Foresight"}
                </h2>
                <p className="text-gray-600 text-lg">
                  {gridIntelData?.mainPage?.description ||
                    "GRID-INTEL™ is GREEN's proprietary platform that controls, balances, and predicts energy flows across solar, battery, diesel, and grid infrastructure — in real time."}
                </p>
              </div>

              {/* Content Layout */}
              <div className="flex gap-8">
                {/* Left Column */}
                <div className="w-1/3 min-w-0">
                  {/* Energy Intelligence Platform */}
                  <div className="mb-8">
                    <h3 className="text-xl lg:text-2xl font-bold text-gray-800 mb-4">
                      {gridIntelData?.mainPage?.energyIntelligencePlatform
                        ?.title || "Energy Intelligence Platform"}
                    </h3>
                    <ul className="space-y-2 text-gray-700">
                      {gridIntelData?.mainPage?.features?.map(
                        (feature, index) => (
                          <li key={index} className="italic">
                            {feature.text}
                          </li>
                        )
                      ) || (
                        <>
                          <li className="italic">
                            Multi-source energy optimization
                          </li>
                          <li className="italic">Remote telemetry & command</li>
                          <li className="italic">
                            Load prediction & performance analytics
                          </li>
                          <li className="italic">
                            Zero-blackout logic & fault anticipation
                          </li>
                        </>
                      )}
                    </ul>
                  </div>

                  {/* Energy You Can Count On */}
                  <div className="mb-8">
                    <h3 className="text-xl lg:text-2xl font-bold text-gray-800 mb-4">
                      {gridIntelData?.mainPage?.energyYouCanCountOn?.title ||
                        "Energy You Can Count On"}
                    </h3>
                    <p className="text-[#23B14D] font-semibold mb-2">
                      {gridIntelData?.mainPage?.energyYouCanCountOn?.subtitle ||
                        "— Even When the Grid Can't Be Counted On"}
                    </p>
                    <p className="text-gray-600 text-sm">
                      {gridIntelData?.mainPage?.energyYouCanCountOn
                        ?.description ||
                        "We deliver power infrastructure that anticipates failure, absorbs shocks, and ensures continuity — across the terrain, in any nation, under any grid condition."}
                    </p>
                  </div>
                </div>

                <div className="w-1/2 min-w-0">
                  {/* Built for Intelligence Box */}
                  <div className="mb-8">
                    <div className="flex space-x-4">
                      <div>
                        <img src="/images/grid-intel/shape1.png" alt="shape1" />
                      </div>
                      <div className="mt-4 -ml-14">
                        <h3 className="text-xl lg:text-2xl font-bold text-gray-800 mb-2">
                          {gridIntelData?.mainPage?.builtForIntelligence
                            ?.title || "Built for Intelligence."}
                          <br />
                          {gridIntelData?.mainPage?.builtForIntelligence
                            ?.subtitle || "Backed by Discipline."}
                        </h3>
                      </div>
                      <div className="-ml-4">
                        <img src="/images/grid-intel/shape2.png" alt="shape2" />
                      </div>
                    </div>
                  </div>

                  {/* Run Smarter Section */}
                  <div className="my-20">
                    <div className="space-y-2">
                      <p className="text-xl italic font-bold text-gray-800">
                        {gridIntelData?.mainPage?.builtForIntelligence
                          ?.runSmarter || "Run Smarter."}
                      </p>
                      <p className="text-xl font-bold italic text-gray-800">
                        {gridIntelData?.mainPage?.builtForIntelligence
                          ?.operateWithConfidence || "Operate with Confidence."}
                      </p>
                      <p className="text-xl font-bold italic text-gray-800">
                        {gridIntelData?.mainPage?.builtForIntelligence
                          ?.scaleWithoutUncertainty ||
                          "Scale Without Uncertainty."}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="">
                  <div className="space-y-6">
                    <div className="flex space-x-4">
                      <div>
                        <img src="/images/grid-intel/shape3.png" alt="shape3" />
                      </div>
                      <button
                        onClick={openChallengeModal}
                        className="mt-6 cursor-pointer -ml-16"
                      >
                        <div className="text-lg font-bold text-gray-800 mb-2">
                          The Challenge
                        </div>
                      </button>
                    </div>

                    <div className="flex space-x-4 2xl:-ml-14">
                      <div>
                        <img src="/images/grid-intel/shape3.png" alt="shape3" />
                      </div>
                      <button
                        onClick={openSolvesModal}
                        className="mt-6 cursor-pointer -ml-16"
                      >
                        <div className="text-lg font-bold text-gray-800 mb-2">
                          What GRID-INTEL™
                        </div>
                      </button>
                    </div>

                    <div className="flex space-x-4 2xl:-ml-24">
                      <div>
                        <img src="/images/grid-intel/shape3.png" alt="shape3" />
                      </div>
                      <button
                        onClick={openWhyIntelModal}
                        className="mt-6 cursor-pointer -ml-16"
                      >
                        <div className="text-lg font-bold text-[#23B14D] mb-2">
                          What GRID-INTEL™
                        </div>
                      </button>
                    </div>

                    <div className="flex space-x-4 2xl:-ml-32">
                      <div>
                        <img src="/images/grid-intel/shape3.png" alt="shape3" />
                      </div>
                      <div className="mt-6 -ml-16 cursor-pointer">
                        <button
                          onClick={openScenarioModal}
                          className="text-lg cursor-pointer font-bold text-gray-800 mb-2"
                        >
                          Built for These Scenarios
                        </button>
                      </div>
                    </div>

                    <div className="flex space-x-4 2xl:-ml-44">
                      <div>
                        <img src="/images/grid-intel/shape3.png" alt="shape3" />
                      </div>
                      <div className="mt-6 cursor-pointer -ml-16">
                        <button
                          onClick={openTechnologyModal}
                          className="text-lg cursor-pointer font-bold text-gray-800 mb-2"
                        >
                          Technology Stack Overview
                        </button>
                      </div>
                    </div>
                    <div className="flex space-x-4 2xl:-ml-52">
                      <div>
                        <img src="/images/grid-intel/shape3.png" alt="shape3" />
                      </div>
                      <div className="mt-6 cursor-pointer -ml-16">
                        <button
                          onClick={openProductModal}
                          className="text-lg font-bold cursor-pointer text-gray-800 mb-2"
                        >
                          Product Integration
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mb-20 flex flex-col items-end gap-6 pr-8">
            {renderCallToActionButton(0, "px-10 py-3")}
            {renderCallToActionButton(1, "px-10 py-3")}
            {renderCallToActionButton(2, "px-10 py-3")}
          </div>
          <div className="lg:block hidden">
            <Chatbot />
          </div>
        </div>
      </div>
     </div>
   
      <Challenge
        isOpen={isChallengeOpen}
        onClose={() => setIsChallengeOpen(false)}
        data={gridIntelData?.challenge}
      />
      <Solves
        isOpen={isSolvesOpen}
        onClose={() => setIsSolvesOpen(false)}
        data={gridIntelData?.whatSolves}
      />
      <WhyIntel
        isOpen={isWhyIntelOpen}
        onClose={() => setIsWhyIntelOpen(false)}
      />
      <Scenerios
        isOpen={isScenarioOpen}
        onClose={() => setIsScenarioOpen(false)}
        data={gridIntelData?.scenarios}
      />
      <Technology
        isOpen={isTechnologyOpen}
        onClose={() => setIsTechnologyOpen(false)}
        data={gridIntelData?.technologyStack}
      />
      <Product 
        isOpen={isProductOpen} 
        onClose={() => setIsProductOpen(false)}
        data={gridIntelData?.productIntegration}
      />
      <TechnicalDeepDive
        isOpen={isDeepDiveOpen}
        onClose={() => setIsDeepDiveOpen(false)}
      />
      <SystemArchitectureTeam
        isOpen={isArchitectureTeamOpen}
        onClose={() => setIsArchitectureTeamOpen(false)}
      />
    </React.Fragment>
  );
};

export default GridIntel;
