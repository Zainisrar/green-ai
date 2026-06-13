"use client";
import React, { useEffect, useState } from "react";
import SolarGenerationEquipment from "./SolarGenerationEquipment";
import PowerConversionSystems from "./PowerConversionSystems";
import EnergyStorageSystems from "./EnergyStorageSystems";
import SystemIntelligence from "./SystemIntelligence";
import BalanceofSystem from "./BalanceofSystem";
import ProcurementNotes from "./ProcurementNotes";
import TopNavigation from "../TopNavigation/TopNavigation";
import Chatbot from "../Chatbot";
import { useKeySupplyCategories } from "../../../hooks/useKeySupplyCategories";

const KeySupplyCategories = () => {
  const { data: apiData, isLoading, error } = useKeySupplyCategories();
  const [isSolarOpen, setIsSolarOpen] = useState(false);
  const [isPowerOpen, setIsPowerOpen] = useState(false);
  const [isEnergyOpen, setIsEnergyOpen] = useState(false);
  const [isSystemOpen, setIsSystemOpen] = useState(false);
  const [isBalanceOpen, setIsBalanceOpen] = useState(false);
  const [isProcurementOpen, setIsProcurementOpen] = useState(false);



  if (error) {
    return (
      <div className="">
        <TopNavigation />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-xl text-red-600">Error loading key supply categories. Please try again later.</div>
        </div>
      </div>
    );
  }

  const openSolarModal = () => {
    setIsSolarOpen(true);
  };
  const closeSolarModal = () => {
    setIsSolarOpen(false);
  };

  const closePowerModal = () => {
    setIsPowerOpen(false);
  };
  const openPowerModal = () => {
    setIsPowerOpen(true);
  };

  const closeEnergyModal = () => {
    setIsEnergyOpen(false);
  };
  const openEnergyModal = () => {
    setIsEnergyOpen(true);
  };
  const closeSystemModal = () => {
    setIsSystemOpen(false);
  };
  const openSystemModal = () => {
    setIsSystemOpen(true);
  };
  const closeBalanceModal = () => {
    setIsBalanceOpen(false);
  };
  const openBalanceModal = () => {
    setIsBalanceOpen(true);
  };
  const closeProcurementModal = () => {
    setIsProcurementOpen(false);
  };
  const openProcurementModal = () => {
    setIsProcurementOpen(true);
  };
  return (
    <React.Fragment>
        <div className="absolute top-0 right-0 ">
          <img src="/images/key-supplier-categories/mainImg.png" className="h-[132vh] " alt="bg" />
        </div>
      <div className="    ">
        <TopNavigation />
        <div className="flex h-full">
          {/* Left Side  */}
          <div className="w-1/6 flex items-center justify-center">
            <div className="fixed top-1/4 left-4 lg:left-14">
              <img
                src="/images/key-supplier-categories/key-supply-categories.png"
                alt="key supply categories"
                className="w-6 lg:w-8"
              />
            </div>
          </div>

          {/* Main Content Area */}
          <div className=" pt-8 ">
            {/* Main Title */}
            <div className="lg:px-8 mb-8 pl-10">
              <h1 className="lg:text-3xl text-2xl font-black text-gray-800 mb-4">
                {apiData?.mainPage?.title?.toUpperCase() || "KEY SUPPLY CATEGORIES"}
              </h1>
              <h2 className="text-xl lg:text-2xl font-bold text-[#23B14D] italic mb-4">
                {apiData?.mainPage?.subHeadline || "What We Source — And Why It Matters."}
              </h2>
              <p className="text-gray-600 lg:text-lg mb-8">
                {apiData?.mainPage?.description?.highlighted ? (
                  <>
                    {apiData.mainPage.description.text.split(apiData.mainPage.description.highlighted)[0]}
                    <span className="text-[#23B14D] font-semibold">{apiData.mainPage.description.highlighted}</span>
                    {apiData.mainPage.description.text.split(apiData.mainPage.description.highlighted)[1]}
                  </>
                ) : (
                  <>
                    <span className="text-[#23B14D] font-semibold">GREEN</span>{" "}
                    procures across a disciplined matrix of technologies and
                    components — each category evaluated for compatibility, field
                    performance, grid resilience, and long-term support.
                  </>
                )}
              </p>
            </div>

            {/* Supply Categories List */}
            <div className="flex relative">
              <div className="lg:px-8 lg:w-7/12 space-y-4  mb-12">
                {/* Dynamic Modal Categories */}
                {apiData?.modals?.map((modal, index) => {
                  const modalHandlers = [
                    openSolarModal,
                    openPowerModal,
                    openEnergyModal,
                    openSystemModal,
                    openBalanceModal
                  ];
                  
                  return (
                    <div key={index} className="flex items-center justify-between border-b border-[#23B14D] pb-4">
                      <h3 className="text-xl font-bold text-gray-800">
                        {modal.title}
                      </h3>
                      <button onClick={modalHandlers[index]} className="cursor-pointer">
                        <img
                          src="/images/client-partnerships/explore.png"
                          alt="explore"
                        />
                      </button>
                    </div>
                  );
                })}

                {/* Supply Chain & Procurement Notes - Static */}
                <div className="flex items-center justify-between border-b border-[#23B14D] pb-4">
                  <h3 className="text-xl font-bold text-gray-800">
                    Supply Chain & Procurement Notes
                  </h3>
                  <button
                    onClick={openProcurementModal}
                    className="cursor-pointer"
                  >
                    <img
                      src="/images/client-partnerships/explore.png"
                      alt="explore"
                    />
                  </button>
                </div>
              </div>
              <div className="lg:absolute lg:block hidden right-0 bottom-0">
                <div className=" flex justify-end my-10 cursor-pointer">
                  <a 
                    href={apiData?.mainPage?.cta?.[0]?.href || "#"}
                    className="cursor-pointer hover:opacity-80 transition-opacity duration-200"
                  >
                    <img
                      src="/images/key-supplier-categories/supplying-to-green.png"
                      alt={apiData?.mainPage?.cta?.[0]?.text || "supplying to green"}
                    />
                  </a>
                </div>
                <div className=" flex justify-end my-10 lg:mb-32 cursor-pointer">
                  <a 
                    href={apiData?.mainPage?.cta?.[1]?.href || "#"}
                    className="cursor-pointer hover:opacity-80 transition-opacity duration-200"
                  >
                    <img
                      src="/images/key-supplier-categories/full-supply-category-technical-pack.png"
                      alt={apiData?.mainPage?.cta?.[1]?.text || "full supply category technical pack"}
                    />
                  </a>
                </div>
              </div>
            </div>

            {/* Bottom Quote */}
            <div className="flex justify-center  ">
              <div className="mb-8 flex relative space-x-4">
                <div className="absolute -left-16 top-2">
                  <img
                    src="/images/key-supplier-categories/shape.png"
                    alt="shape"
                  />
                </div>
                <div>
                  {apiData?.mainPage?.quote?.highlighted ? (
                    <h3 className="text-xl lg:text-2xl font-bold text-gray-800">
                      {apiData.mainPage.quote.text.split('\n').map((line, index) => (
                        <span key={index}>
                          {line.includes(apiData.mainPage.quote.highlighted) ? (
                            <>
                              {line.split(apiData.mainPage.quote.highlighted)[0]}
                              <span className="text-[#23B14D]">{apiData.mainPage.quote.highlighted}</span>
                              {line.split(apiData.mainPage.quote.highlighted)[1]}
                            </>
                          ) : (
                            line
                          )}
                          {index === 0 && <br />}
                        </span>
                      ))}
                    </h3>
                  ) : (
                    <>
                      <h3 className="text-xl lg:text-2xl font-bold text-gray-800 mb-2">
                        We Don't Tell Stories To Impress.
                      </h3>
                      <h3 className="text-xl lg:text-2xl font-bold text-gray-800">
                        We Share Stories That Prove What{" "}
                        <span className="text-[#23B14D]">Energy</span> Can Do.
                      </h3>
                    </>
                  )}
                </div>
                <div className="-mt-4 -ml-10">
                  <img
                    src="/images/key-supplier-categories/shape2.png"
                    alt="shape"
                  />
                </div>
              </div>
            </div> 
              <div className=" lg:hidden space-y-8  my-4 mb-40">
                <div className=" flex justify-end my-10 cursor-pointer">
                  <a 
                    href={apiData?.mainPage?.cta?.[0]?.href || "#"}
                    className="cursor-pointer hover:opacity-80 transition-opacity duration-200"
                  >
                    <img
                      src="/images/key-supplier-categories/supplying-to-green.png"
                      alt={apiData?.mainPage?.cta?.[0]?.text || "supplying to green"}
                    />
                  </a>
                </div>
                <div className=" flex justify-end my-10 lg:mb-32 cursor-pointer">
                  <a 
                    href={apiData?.mainPage?.cta?.[1]?.href || "#"}
                    className="cursor-pointer hover:opacity-80 transition-opacity duration-200"
                  >
                    <img
                      src="/images/key-supplier-categories/full-supply-category-technical-pack.png"
                      alt={apiData?.mainPage?.cta?.[1]?.text || "full supply category technical pack"}
                    />
                  </a>
                </div>
              </div>
          </div>
        </div>

        <Chatbot />
      </div>
      <SolarGenerationEquipment
        isOpen={isSolarOpen}
        onClose={closeSolarModal}
        data={apiData?.modals?.[0]}
      />
      <PowerConversionSystems 
        isOpen={isPowerOpen} 
        onClose={closePowerModal}
        data={apiData?.modals?.[1]}
      />
      <EnergyStorageSystems 
        isOpen={isEnergyOpen} 
        onClose={closeEnergyModal}
        data={apiData?.modals?.[2]}
      />
      <SystemIntelligence 
        isOpen={isSystemOpen} 
        onClose={closeSystemModal}
        data={apiData?.modals?.[3]}
      />
      <BalanceofSystem 
        isOpen={isBalanceOpen} 
        onClose={closeBalanceModal}
        data={apiData?.modals?.[4]}
      />
      <ProcurementNotes
        isOpen={isProcurementOpen}
        onClose={closeProcurementModal}
      />
    </React.Fragment>
  );
};

export default KeySupplyCategories;
