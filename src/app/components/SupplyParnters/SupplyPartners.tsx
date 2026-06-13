"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import TopNavigation from "../TopNavigation/TopNavigation";
import Chatbot from "../Chatbot";
import { useSupplyPartners } from "../../../hooks/useSupplyPartners";
import { useNavigationState } from "@/hooks/useNavigationState";

interface CTA {
  href: string;
  text: string;
}

interface Quote {
  text: string;
  highlighted: string;
}

interface Description {
  text: string;
  highlighted: string;
}

interface PartnerIcon {
  alt: string;
  src: string;
}

interface PartnerSpotlight {
  text: string;
  icons: PartnerIcon[];
}

interface MainPage {
  cta: CTA[];
  quote: Quote;
  title: string;
  description: Description;
  subHeadline: string;
  partnerSpotlight: PartnerSpotlight;
}

interface GlobalSourcingStrategy {
  title: string;
  headline: string;
  keyPoints: string[];
  description: string;
}

interface ProcurementItem {
  example: string;
  category: string;
}

interface WhatWeProcure {
  item: ProcurementItem[];
  title: string;
}

interface SupplierStep {
  step: string;
  action: string;
}

interface HowBecomeGreenSupplier {
  item: SupplierStep[];
  title: string;
  subHeadline: string;
}

interface SupplyPartnersData {
  id: number;
  mainPage: MainPage;
  globalSourcingStrategy: GlobalSourcingStrategy;
  whatWeProcure: WhatWeProcure;
  howBecomeGreenSupplier: HowBecomeGreenSupplier;
  createdAt: string;
  updatedAt: string;
}

const SupplyPartners = () => {
  const { data: apiData } = useSupplyPartners();
  const [activeIndex, setActiveIndex] = useState(0);
  const nav=useNavigationState();

  // Type assertion to help TypeScript understand the data structure
  const data = apiData as SupplyPartnersData | undefined;

  const handleActiveIndex = (index: number) => {
    setActiveIndex(index);
  };

  if (!data) {
    return null;
  }
const [isDesktop, setIsDesktop]=useState(false);
  useEffect(() => {
    const checkDesktop = () => {
      if (typeof window !== "undefined") {
        const desktop = window.innerWidth >= 1024;
        setIsDesktop(desktop);
      } 
    };

    checkDesktop();
    window.addEventListener("resize", checkDesktop);
    return () => window.removeEventListener("resize", checkDesktop);
  }, []);
  const ActiveItem = (activeIndex: number) => {
    switch (activeIndex) {
      case 0:
        return (
          <div className="    ">
            <div className=" mb-8">
              <h4 className=" text-2xl lg:text-3xl font-bold text-gray-800 mb-4">
                {data?.globalSourcingStrategy?.title ||
                  "Global Sourcing Strategy"}
              </h4>
              <h5 className="text-lg lg:text-2xl font-bold text-[#23B14D] italic mb-4">
                {data?.globalSourcingStrategy?.headline ||
                  "Quality Isn't an Option. It's a Requirement."}
              </h5>
              <p className="text-gray-600 text-base mb-4">
                {data?.globalSourcingStrategy?.description ||
                  "Our global supply chain is built on partnerships with manufacturers who meet technical benchmarks, environmental compliance, and long-term support reliability. Every inverter, panel, controller, and battery we install must:"}
              </p>
              <ul className="text-gray-600 text-base mt-10 space-y-2">
                {data?.globalSourcingStrategy?.keyPoints?.map(
                  (point: string, index: number) => (
                    <li key={index}>• {point}</li>
                  )
                ) || (
                  <>
                    <li>
                      • Perform in high-humidity, off-grid, and remote
                      conditions
                    </li>
                    <li>
                      • Comply with international safety and interoperability
                      standards
                    </li>
                    <li>
                      • Have predictable lifecycle economics and bankability
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
        );
        break;
      case 1:
        return (
          <div className=" text-lg lg:text-2xl font-bold mb-4">
            <div className=" mb-8">
              <h4 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-4">
                {data?.whatWeProcure?.title || "What We Procure"}
              </h4>

              <div className="flex space-x-10 ">
                <ul className="text-base mt-10 space-y-2">
                  <li className="text-lg lg:text-xl font-semibold text-[#23B14D]">
                    Category
                  </li>
                  <div className="italic flex -ml-4 flex-col mt-4 space-y-2 text-base lg:text-lg  font-semibold text-black">
                    {data?.whatWeProcure?.item?.map(
                      (item: ProcurementItem, index: number) => (
                        <li key={index}>{item.category}</li>
                      )
                    ) || (
                      <>
                        <li>Solar Modules</li>
                        <li>Inverters</li>
                        <li>Batteries</li>
                        <li>Controllers & ATS</li>
                        <li>Mounting Structures</li>
                        <li>Data & IoT Systems</li>
                      </>
                    )}
                  </div>
                </ul>
                <ul className="text-gray-900 text-lg lg:text-xl italic  mt-10 space-y-3 ">
                  <li className="lg:text-lg font-semibold text-[#23B14D] text-center">
                    Examples
                  </li>
                  {data?.whatWeProcure?.item?.map(
                    (item: ProcurementItem, index: number) => (
                      <li key={index}>{item.example}</li>
                    )
                  ) || (
                    <>
                      <li>Mono PERC, Bifacial, Flexible PV</li>
                      <li>On-grid, Hybrid, Off-grid, Microinverters</li>
                      <li>Grid-scale BESS, LFP, Lead-carbon, Flow</li>
                      <li>MPPT, Smart Load Controllers, ATS units</li>
                      <li>Fixed, Tracker, Modular Kits</li>
                      <li>
                        Smart meters, SCADA, <br /> GRID-INTEL™-compatible
                      </li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          </div>
        );
        break;
      case 2:
        return (
          <div className=" text-lg lg:text-2xl font-bold mb-4 ">
            <div className=" mb-8">
              <h4 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-4">
                {data?.howBecomeGreenSupplier?.title ||
                  "How to Become a GREEN Supplier"}
              </h4>
              <h5 className="text-xl lg:text-2xl font-bold text-[#23B14D] italic mb-4">
                {data?.howBecomeGreenSupplier?.subHeadline ||
                  "Join the Network That Builds the Future."}
              </h5>
              <div className="flex space-x-10 ">
                <ul className="text-base mt-4 space-y-2">
                  <li className="text-xl font-semibold text-[#23B14D]">Step</li>
                  <div className="italic flex -ml-4 flex-col mt-4 space-y-2 lg:text-lg  font-semibold text-black">
                    {data?.howBecomeGreenSupplier?.item?.map(
                      (item: SupplierStep, index: number) => (
                        <li key={index}>Step {item.step}</li>
                      )
                    ) || (
                      <>
                        <li>Step 1</li>
                        <li>Step 2</li>
                        <li>Step 3</li>
                        <li>Step 4</li>
                      </>
                    )}
                  </div>
                </ul>
                <ul className="text-gray-900 text-xl italic  mt-4 space-y-3 ">
                  <li className="text-xl font-semibold text-[#23B14D] text-center">
                    Action
                  </li>
                  {data?.howBecomeGreenSupplier?.item?.map(
                    (item: SupplierStep, index: number) => (
                      <li key={index}>{item.action}</li>
                    )
                  ) || (
                    <>
                      <li>Submit your Supplier Introduction Form</li>
                      <li>Undergo technical and commercial review</li>

                      <li>Get listed as an Approved Supply Partner</li>
                    </>
                  )}

                  <li>Receive GREEN’s Supplier Code & Onboarding Pack</li>
                </ul>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <React.Fragment>
      <div className="   ">
        <div className="absolute top-0 lg:block hidden left-0 lg:left-40">
          <img
            src="/images/supply-partners/mainImg.png"
            className="w-screen lg:w-auto lg:h-[160vh]"
            alt="bg"
          />
        </div>
        <TopNavigation />


        <div className={` flex h-full ${nav.isNavigationOpen?"":"z-[9999999999999999]"} relative`}>
          {/* Left Side  */}
          <div className=" hidden  lg:w-1/8  lg:flex items-center justify-center">
            <div className="fixed top-1/3 left-14">
              <img
                src="/images/supply-partners/supply-partner.png"
                alt="supply-partner"
                className="w-10"
              />
            </div>
          </div>

          {/* Main Content Area */}
          <div className=" px-8  pt-8 w-full">
            {/* Main Title */}
            <div className="mb-8 pl-8">
              <h1 className="text-2xl lg:text-3xl font-black text-gray-800 mb-4">
                {data?.mainPage?.title?.toUpperCase() || "SUPPLY PARTNERS"}
              </h1>
              <h2 className="lg:text-2xl font-bold text-[#23B14D] italic mb-4">
                {data?.mainPage?.subHeadline ||
                  "Technology You Can Trust. Partners Who Deliver."}
              </h2>
              <p className="text-gray-600 lg:text-lg mb-6">
                {data?.mainPage?.description?.highlighted ? (
                  <>
                    {
                      data.mainPage.description.text.split(
                        data.mainPage.description.highlighted
                      )[0]
                    }
                    <span className="text-[#23B14D] font-semibold">
                      {data.mainPage.description.highlighted}
                    </span>
                    {
                      data.mainPage.description.text.split(
                        data.mainPage.description.highlighted
                      )[1]
                    }
                  </>
                ) : (
                  <>
                    <span className="text-[#23B14D] font-semibold">GREEN</span>{" "}
                    sources only from proven, Tier-1 suppliers — because our
                    systems depend on performance, durability, and trust. We
                    don't just buy parts. We build partnerships that power
                    nations.
                  </>
                )}
              </p>
            </div>

            {/* Content Layout */}
            <div className="lg:flex  lg:space-x-8  lg:ml-10 mb-8">
              {/* Left Column - Navigation Menu */}
              <div className="  space-y-4">
                <div
                  onClick={() => handleActiveIndex(0)}
                  className="relative cursor-pointer flex space-x-2 items-center"
                >
                  <div className="absolute -left-4">
                    <img
                      src="/images/supply-partners/shape.png"
                      alt="Global Sourcing Strategy"
                    />
                  </div>
                  <div
                    className={`${
                      activeIndex === 0 ? "text-[#23B14D]" : ""
                    } px-6 py-3 lg:text-xl text-lg rounded font-semibold`}
                  >
                    Global Sourcing Strategy
                  </div>
                </div>
                <div
                  onClick={() => handleActiveIndex(1)}
                  className="relative flex space-x-2 mt-10  cursor-pointer  items-center"
                >
                  <div className="absolute -left-8">
                    <img
                      src="/images/supply-partners/shape.png"
                      alt="Global Sourcing Strategy"
                    />
                  </div>
                  <div
                    className={`${
                      activeIndex === 1 ? "text-[#23B14D]" : ""
                    } px-6 py-3 text-lg lg:text-xl rounded font-semibold`}
                  >
                    What We Procure
                  </div>
                </div>
                <div
                  onClick={() => handleActiveIndex(2)}
                  className="relative flex space-x-2 mt-10  cursor-pointer  items-center"
                >
                  <div className="absolute -left-12">
                    <img
                      src="/images/supply-partners/shape.png"
                      alt="Global Sourcing Strategy"
                    />
                  </div>
                  <div
                    className={`${
                      activeIndex === 2 ? "text-[#23B14D]" : ""
                    } cursor-pointer -ml-10 px-6 py-3 text-lg lg:text-xl rounded font-semibold`}
                  >
                    How to Become a GREEN Supplier
                  </div>
                </div>
                <Link
                  href="/ecosystem/supply-partners/login"
                  className="relative flex space-x-2 mt-10 cursor-pointer  items-center"
                >
                  <div className="absolute z-50 -left-16">
                    <img
                      src="/images/supply-partners/shape.png"
                      alt="Global Sourcing Strategy"
                    />
                  </div>
                  <div
                    className={` -ml-10 px-6 py-3 text-lg lg:text-xl rounded font-semibold`}
                  >
                    Supply Partner Login Portal
                  </div>
                </Link>
              </div>

              {/* Right Column - Content */}
              <div className="mb-8 relative mt-16 lg:ml-10 flex space-x-2 items-center">
                <div className="absolute lg:block hidden -left-20">
                  <img src="/images/supply-partners/shape1.png" alt="shape" />
                </div>
                {/* Technology Section */}
                <div className=" ">
                  <h3 className="text-lg lg:text-xl font-bold text-[#23B14D] italic mb-4">
                    Technology{" "}
                    <span className="text-gray-800">You Can Trust.</span>
                    <br />
                    <span className="text-gray-800">Partners Who Deliver.</span>
                  </h3>
                </div>

                <div className="lg:block hidden">
                  <img src="/images/supply-partners/shape2.png" alt="shape" />
                </div>
              </div>
              <div className="lg:w-[500px]">{ActiveItem(activeIndex)}</div>
            </div>

            {/* Partner Spotlight Section */}
            <div className="mb-20 lg:mb-4 -mt-4">
              <div
              style={{
                transform:isDesktop?"skewX(-12deg)":"none"
              }}
              className="bg-[#f8f9d9]/40 max-w-4xl  p-4 shadow-2xl">
                <h4
                 style={{
                transform:isDesktop?"skewX(12deg)":"none"
              }}
                className="text-xl lg:text-2xl font-bold text-[#23B14D] mb-4 ">
                  Partner Spotlight
                </h4>
                <p
                   style={{
                transform:isDesktop?"skewX(12deg)":"none"
              }}
                className="text-gray-600 text-lg font-semibold mb-6 ">
                  {data?.mainPage?.partnerSpotlight?.text ||
                    "OSDA | Reno Dee | Fimer | PowerPlus | Clenergy | Grace Solar | Tecnocraft | Danish"}
                </p>

                {/* Partner Logos */}
                <div
                  style={{
                    transform:isDesktop?"skewX(12deg)":"none"
                  }}
                className="lg:flex-row flex justify-center my-4  flex-col items-center   lg:justify-start space-y-8 lg:space-x-8 ">
                  {data?.mainPage?.partnerSpotlight?.icons?.map(
                    (icon: PartnerIcon, index: number) => (
                      <img
                        key={index}
                        src={icon.src}
                        alt={icon.alt || `Partner logo ${index + 1}`}
                        className="lg:h-12"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src =
                            "/images/supply-partners/placeholder.png";
                        }}
                      />
                    )
                  ) || (
                    <>
                      <img
                        src="/images/supply-partners/clenergy.png"
                        alt="Clenergy logo"
                        className="h-12 "
                      />
                      <img
                        src="/images/supply-partners/fimer.png"
                        alt="Fimer logo"
                        className="h-12 "
                      />
                      <img
                        src="/images/supply-partners/tecnocraft.png"
                        alt="Tecnocraft logo"
                        className="h-25 "
                      />
                      <img
                        src="/images/supply-partners/catl.png"
                        alt="CATL logo"
                        className="h-25 "
                      />
                      <img
                        src="/images/supply-partners/grace-solar.png"
                        alt="Grace Solar logo"
                        className="h-12 "
                      />
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="space-y-8 mb-20 z-[9999999999999999] relative">
          <div className=" flex justify-end   cursor-pointer">
            <Link
              href={data?.mainPage?.cta?.[1]?.href || "#"}
              className="cursor-pointer hover:opacity-80 transition-opacity duration-200"
            >
              <img
                src="/images/supply-partners/contact-supply-chain-team.png"
                alt={
                  data?.mainPage?.cta?.[1]?.text || "Contact supply chain team"
                }
              />
            </Link>
          </div>
          <div className="  flex justify-end   cursor-pointer">
            <Link
              href={data?.mainPage?.cta?.[0]?.href || "#"}
              className="cursor-pointer hover:opacity-80 transition-opacity duration-200"
            >
              <img
                src="/images/supply-partners/become-supply-partner.png"
                alt={
                  data?.mainPage?.cta?.[0]?.text || "Become a supply partner"
                }
              />
            </Link>
          </div>
        </div>
        {/* Right Side - Call to Action Buttons */}

        <Chatbot />
      </div>
    </React.Fragment>
  );
};

export default SupplyPartners;
