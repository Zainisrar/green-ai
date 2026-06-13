"use client";
import React, { useEffect, useState } from "react";
import CorePrinciples from "./CorePrinciples";
import Compromise from "./Compromise";
import Procrument from "./Procrument";
import Vendor from "./Vendor";
import TopNavigation from "../TopNavigation/TopNavigation";
import Chatbot from "../Chatbot";
import { useOurProcurementPhilosophy } from "../../../hooks/useOurProcurementPhilosophy";

const OurProcurementPhilosophy = () => {
  const { data: apiData } = useOurProcurementPhilosophy();
  const [isCorePrinciplesOpen, setIsCorePrinciplesOpen] = useState(false);
  const [isCompromiseOpen, setIsCompromiseOpen] = useState(false);
  const [isProcrumentOpen, setIsProcrumentOpen] = useState(false);
  const [isVendorOpen, setIsVendorOpen] = useState(false);

  if (!apiData) {
    return null;
  }

  const openCorePrinciples = () => setIsCorePrinciplesOpen(true);
  const closeCorePrinciples = () => setIsCorePrinciplesOpen(false);
  const openCompromise = () => setIsCompromiseOpen(true);
  const closeCompromise = () => setIsCompromiseOpen(false);
  const openProcrument = () => setIsProcrumentOpen(true);
  const closeProcrument = () => setIsProcrumentOpen(false);
  const openVendor = () => setIsVendorOpen(true);
  const closeVendor = () => setIsVendorOpen(false);

  return (
    <React.Fragment>
      <div className="   ">
        <TopNavigation />
        <div className="flex h-full">
          <div className="absolute top-0 lg:top-[590px] lg:-left-14  -z-10">
            <img
              src="/images/our-procurement-philosophy/mainImg.png"
              alt="bg"
              className="lg:w-auto w-screen"
            />
          </div>
          {/* Left Side */}
          <div className="w-1/6 flex items-center justify-center">
            <div className="fixed top-4/12 lg:top-2/12 left-4 lg:left-14">
              <img
                src="/images/our-procurement-philosophy/our-procurement-philosophy.png"
                alt="our-procurement-philosophy"
                className="w-6 lg:w-8"
              />
            </div>
          </div>

          {/* Main Content Area */}
          <div className="w-full lg:px-8 pt-8 overflow-y-auto">
            {/* Main Title */}
            <div className="mb-8">
              <h1 className="lg:text-3xl text-2xl font-black text-gray-800 mb-4">
                {apiData?.mainPage?.title?.toUpperCase() || "OUR PROCUREMENT PHILOSOPHY"}
              </h1>
              <h2 className=" text-xl lg:text-2xl font-bold text-[#23B14D] italic mb-4">
                {apiData?.mainPage?.subHeadline || "Procurement by Purpose. Partnership by Proof."}
              </h2>
              <div className="text-gray-600 lg:text-lg mb-10">
                {apiData?.mainPage?.description?.split('\n').map((paragraph, index) => (
                  <p key={index} className={index === 0 ? "mb-2" : ""}>
                    {paragraph.includes("GREEN's") ? (
                      <>
                        <span className="text-[#23B14D] font-semibold">GREEN's</span>
                        {paragraph.replace("GREEN's", "")}
                      </>
                    ) : (
                      paragraph
                    )}
                  </p>
                )) || (
                  <>
                    <p className="mb-2">
                      <span className="text-[#23B14D] font-semibold">GREEN's</span>{" "}
                      procurement approach isn't driven by cost — it's driven by
                      consequence.
                    </p>
                    <p>
                      Every product we source carries the weight of performance,
                      reputation, and impact. That's why we buy smart, selectively,
                      and strategically.
                    </p>
                  </>
                )}
              </div>
            </div>

            {/* Content Grid */}
            <div className="grid lg:grid-cols-2 gap-8 mb-8 lg:ml-32">
              {/* Core Principles */}
              <div className="flex space-x-4">
                <img
                  src="/images/our-procurement-philosophy/coreprinciples.png"
                  alt="Core Principles"
                  className="w-52 h-32"
                />
                <div className="">
                  <h3 className="text-xl lg:text-2xl font-bold text-gray-800 mb-2">
                    {apiData?.corePrinciples?.title || "Core Principles"}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">
                    {apiData?.corePrinciples?.subHeadline || "What Guides Our Procurement"}
                  </p>
                  <button
                    onClick={openCorePrinciples}
                    className="flex justify-end w-full cursor-pointer"
                  >
                    <img
                      src="/images/our-procurement-philosophy/explore.png"
                      alt="Explore"
                    />
                  </button>
                </div>
              </div>

              {/* What We Won't Compromise */}
              <div className="flex space-x-4">
                <img
                  src="/images/our-procurement-philosophy/compromise.png"
                  alt="What We Won't Compromise"
                  className="w-52 h-32"
                />
                <div className="flex-1">
                  <h3 className="text-xl lg:text-2xl font-bold text-gray-800 mb-2">
                    {apiData?.whatWeWontCompromise?.title || "What We Won't Compromise"}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">
                    {apiData?.whatWeWontCompromise?.quote?.highlighted ? (
                      <>
                        {apiData.whatWeWontCompromise.quote.text.split(apiData.whatWeWontCompromise.quote.highlighted)[0]}
                        <span className="text-[#23B14D] font-semibold">{apiData.whatWeWontCompromise.quote.highlighted}</span>
                        {apiData.whatWeWontCompromise.quote.text.split(apiData.whatWeWontCompromise.quote.highlighted)[1]}
                      </>
                    ) : (
                      "If it can't stand the test of time, it doesn't belong in a GREEN system."
                    )}
                  </p>
                  <button
                    onClick={openCompromise}
                    className="flex justify-end w-full cursor-pointer"
                  >
                    <img
                      src="/images/our-procurement-philosophy/explore.png"
                      alt="Explore"
                    />
                  </button>
                </div>
              </div>
              <div className="flex space-x-4">
                <img
                  src="/images/our-procurement-philosophy/procrument.png"
                  alt="Procurement Aligned with Impact"
                  className="w-52 h-32"
                />
                <div className="flex-1">
                  <h3 className="text-xl lg:text-2xl font-bold text-gray-800 mb-2">
                    {apiData?.procurementAlignedImpact?.title || "Procurement Aligned with Impact"}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">
                    {apiData?.procurementAlignedImpact?.description || "We believe that no single player has all the answers. That's why GREEN seeks out:"}
                  </p>
                  <button
                    onClick={openProcrument}
                    className="flex justify-end w-full cursor-pointer"
                  >
                    <img
                      src="/images/our-procurement-philosophy/explore.png"
                      alt="Explore"
                    />
                  </button>
                </div>
              </div>
              <div className="flex space-x-4">
                <img
                  src="/images/our-procurement-philosophy/vendor.png"
                  alt="Strategic Vendor Relationships"
                  className="w-52 h-32"
                />
                <div className="flex-1">
                  <h3 className="text-xl lg:text-2xl font-bold text-gray-800 mb-2">
                    {apiData?.strategicVendorRelationships?.title || "Strategic Vendor Relationships"}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">
                    We don’t treat vendors as vendors. We treat them as partners
                    in performance.
                  </p>
                  <button
                    onClick={openVendor}
                    className="flex justify-end w-full cursor-pointer"
                  >
                    <img
                      src="/images/our-procurement-philosophy/explore.png"
                      alt="Explore"
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

       <div className="space-y-8 mb-32">
         <div className=" flex justify-end  cursor-pointer">
          <a 
            href={apiData?.mainPage?.cta?.[0]?.href || "#"}
            className="cursor-pointer hover:opacity-80 transition-opacity duration-200"
          >
            <img
              src="/images/our-procurement-philosophy/submit-interest.png"
              alt={apiData?.mainPage?.cta?.[0]?.text || "submit interest"}
            />
          </a>
        </div>
        <div className=" flex justify-end  cursor-pointer">
          <a 
            href={apiData?.mainPage?.cta?.[1]?.href || "#"}
            className="cursor-pointer hover:opacity-80 transition-opacity duration-200"
          >
            <img
              src="/images/our-procurement-philosophy/green-supplier-code-of-conduct.png"
              alt={apiData?.mainPage?.cta?.[1]?.text || "Green Supplier Code of Conduct"}
            />
          </a>
        </div>
       </div>
        <div className="w-full lg:block hidden">
          <div className="text-center">
            <h3 className="text-xl lg:text-2xl font-bold text-gray-800 ">
              <span className="text-[#23B14D]">GREEN's</span> Reputation Is
              Built On What We Build.
              <br />
              What We Build Is Only As Good As What We Procure.
            </h3>
          </div>
        </div>
        <div className="lg:block hidden">
          <div className=" items-center flex">
            <div>
              <img
                src="/images/our-procurement-philosophy/shape1.png"
                alt="shape"
              />
            </div>
            <h3 className="text-lg lg:text-xl  font-bold text-gray-800 mb-4">
              {apiData?.mainPage?.quote?.[0]?.highlighted ? (
                <>
                  {apiData.mainPage.quote[0].text.split(apiData.mainPage.quote[0].highlighted)[0]}
                  <span className="text-[#23B14D]">{apiData.mainPage.quote[0].highlighted}</span>
                  {apiData.mainPage.quote[0].text.split(apiData.mainPage.quote[0].highlighted)[1]}
                  <br />
                  {apiData?.mainPage?.quote?.[1] && (
                    <>
                      {apiData.mainPage.quote[1].text.split(apiData.mainPage.quote[1].highlighted)[0]}
                      <span className="text-[#23B14D]">{apiData.mainPage.quote[1].highlighted}</span>
                      {apiData.mainPage.quote[1].text.split(apiData.mainPage.quote[1].highlighted)[1]}
                    </>
                  )}
                </>
              ) : (
                <>
                  You Call Them <span className="text-[#23B14D]">Projects.</span>
                  <br />
                  We Call Them <span className="text-[#23B14D]">People.</span>
                </>
              )}
            </h3>
            <div>
              <img
                src="/images/our-procurement-philosophy/shape2.png"
                alt="shape"
              />
            </div>
          </div>
        </div>
        <Chatbot />
      </div>
      <CorePrinciples
        isOpen={isCorePrinciplesOpen}
        onClose={closeCorePrinciples}
        data={apiData?.corePrinciples}
      />
      <Compromise 
        isOpen={isCompromiseOpen} 
        onClose={closeCompromise}
        data={apiData?.whatWeWontCompromise}
      />
      <Procrument 
        isOpen={isProcrumentOpen} 
        onClose={closeProcrument}
        data={apiData?.procurementAlignedImpact}
      />
      <Vendor 
        isOpen={isVendorOpen} 
        onClose={closeVendor}
        data={apiData?.strategicVendorRelationships}
      />
    </React.Fragment>
  );
};

export default OurProcurementPhilosophy;
