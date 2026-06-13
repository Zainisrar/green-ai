"use client";
import React, { useEffect, useState } from "react";
import WhoWePartnerWith from "./Dialog/WhoWePartnerWith";
import OurClientPartnershipModel from "./Dialog/OurClientPartnershipModel";
import WhatSetsGREENApart from "./Dialog/WhatSetsGREENApart";
import UseCases from "./Dialog/UseCases";
import Link from "next/link";
import PartnershipOnboarding from "./Dialog/PartnershipOnboarding";
import TopNavigation from "../TopNavigation/TopNavigation";
import Chatbot from "../Chatbot";
import { useClientPartnerships } from "../../../hooks/useClientPartnerships";

const ClientPartnerships = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOurModelOpen, setIsOurModelOpen] = useState(false);
  const [isWhatSetsOpen, setIsWhatSetsOpen] = useState(false);
  const [isUseCasesOpen, setIsUseCasesOpen] = useState(false);
  const [isPartnershipOnboardingOpen, setIsPartnershipOnboardingOpen] =
    useState(false);

  const { data } = useClientPartnerships();

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  const openOurModelModal = () => setIsOurModelOpen(true);
  const closeOurModelModal = () => setIsOurModelOpen(false);
  const openWhatSetsModal = () => setIsWhatSetsOpen(true);
  const closeWhatSetsModal = () => setIsWhatSetsOpen(false);
  const openUseCasesModal = () => setIsUseCasesOpen(true);
  const closeUseCasesModal = () => setIsUseCasesOpen(false);
  const openPartnershipOnboardingModal = () =>
    setIsPartnershipOnboardingOpen(true);
  const closePartnershipOnboardingModal = () =>
    setIsPartnershipOnboardingOpen(false);
  return (
    <React.Fragment>
      <div className="   ">
        <div className="absolute lg:block hidden top-0 right-0 -z-10 ">
          <img
            src="/images/client-partnerships/mainImg.png"
            className="h-[120vh]"
            alt="mainImg"
          />
        </div>
        <TopNavigation />
        <div className="flex h-full">
          {/* Left Side  */}
          <div className="w-1/6 flex items-center justify-center">
            <div className="fixed top-1/4 left-5 lg:left-14">
              <img
                src="/images/client-partnerships/client-partnerships.png"
                alt="Client Partnerships"
                className="w-5 lg:w-8"
              />
            </div>
          </div>

          {/* Main Content Area */}
          <div className="px-8 pt-8">
            {/* Main Title */}
            <div className="mb-8 lg:px-0 px-8">
              <h1 className=" text-xl lg:text-3xl font-black text-gray-800 mb-4">
                {data?.mainPage?.title?.toUpperCase() ?? "CLIENT PARTNERSHIPS"}
              </h1>
              <h2 className=" text-xl lg:text-2xl font-medium text-[#23B14D] italic mb-4">
                {data?.mainPage?.subHeadline ?? "We Don't Just Serve Clients. We Scale Their Missions."}
              </h2>
              <p className="text-gray-600 text-lg mb-8 max-w-5xl">
                {data?.mainPage?.description ?? "From electrifying rural provinces to powering national infrastructure, GREEN partners with clients whose ambitions match our execution. We don't just deliver energy — we deliver outcomes that endure."}
              </p>
            </div>

            {/* Content Layout */}
            <div className=" flex ml-8 my-16 relative lg:hidden  space-x-4 items-center ">
              <div className="absolute top-4 -left-14">
                <img
                  src="/images/client-partnerships/shape.png"
                  alt="shape"
                  className="w-14"
                />
              </div>
              <div className=" text-lg lg:text-xl font-bold max-w-lg italic text-gray-800 mb-2">
                {data?.mainPage?.quote2 ?? "Let's Build What Your Nation or Enterprise Needs Next."}
              </div>
              <div className="-ml-4 -mt-10">
                <img
                  src="/images/client-partnerships/shape2.png"
                  alt="shape"
                  className="w-20 "
                />
              </div>
            </div>
            <div className="lg:flex space-x-40">
              {/* Left Column - Content List */}
              <div className="lg:w-1/2 w-full space-y-10 lg:space-y-4">
                {/* Who We Partner With */}
                <div className="flex items-center justify-between border-b border-[#4CAF50] pb-4">
                  <div>
                    <h3 className="text-lg font-black text-gray-800">
                      {data?.whoWePartnerWith?.title ?? "Who We Partner With"}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {data?.whoWePartnerWith?.subHeadline ?? "Strategic Clients. Transformational Outcomes."}
                    </p>
                  </div>
                  <button onClick={openModal} className="cursor-pointer">
                    <img
                      src="/images/client-partnerships/explore.png"
                      alt="explore"
                    />
                  </button>
                </div>

                {/* Our Client Partnership Model */}
                <div className="flex items-center justify-between border-b border-[#4CAF50] pb-4">
                  <div>
                    <h3 className="text-lg font-black text-gray-800">
                      {data?.ourClientPartnership?.title ?? "Our Client Partnership Model"}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {data?.ourClientPartnership?.subHeadline ?? "Aligned by Design. Delivered with Accountability."}
                    </p>
                  </div>
                  <button
                    onClick={openOurModelModal}
                    className="cursor-pointer"
                  >
                    <img
                      src="/images/client-partnerships/explore.png"
                      alt="explore"
                    />
                  </button>
                </div>

                {/* What Sets GREEN Apart */}
                <div className="flex items-center justify-between border-b border-[#4CAF50] pb-4">
                  <div>
                    <h3 className="text-lg font-black text-gray-800">
                      {data?.whatSetsGreenApart?.title ?? "What Sets GREEN Apart"}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {data?.whatSetsGreenApart?.subHeadline ?? "Strategic Clients. Transformational Outcomes."}
                    </p>
                  </div>
                  <button
                    onClick={openWhatSetsModal}
                    className="cursor-pointer"
                  >
                    <img
                      src="/images/client-partnerships/explore.png"
                      alt="explore"
                    />
                  </button>
                </div>

                {/* Client Testimonials / Use Cases */}
                <div className="flex items-center justify-between border-b border-[#4CAF50] pb-4">
                  <div>
                    <h3 className="text-lg font-black text-gray-800">
                      {data?.useCases?.title ?? "Client Testimonials / Use Cases"}
                    </h3>
                    <p className="text-sm text-gray-600">
                      Strategic Clients. Transformational Outcomes.
                    </p>
                  </div>
                  <button
                    onClick={openUseCasesModal}
                    className="cursor-pointer"
                  >
                    <img
                      src="/images/client-partnerships/explore.png"
                      alt="explore"
                    />
                  </button>
                </div>

                {/* Partnership Onboarding */}
                <div className="flex items-center justify-between border-b border-[#4CAF50] pb-4">
                  <div>
                    <h3 className="text-lg font-black text-gray-800">
                      Partnership Onboarding
                    </h3>
                    <p className="text-sm text-gray-600">
                      Let's Build What Your Nation or Enterprise Needs Next.
                    </p>
                  </div>
                  <button
                    onClick={openPartnershipOnboardingModal}
                    className="cursor-pointer"
                  >
                    <img
                      src="/images/client-partnerships/explore.png"
                      alt="explore"
                    />
                  </button>
                </div>

                {/* CLIENT PARTNER LOGIN */}
                <div className="flex items-center justify-between border-b border-[#4CAF50] pb-4">
                  <div>
                    <h3 className="text-lg font-bold text-gray-800">
                      CLIENT PARTNER LOGIN
                    </h3>
                    <p className="text-sm text-gray-600">
                      Let's Build What Your Nation or Enterprise Needs Next.
                    </p>
                  </div>
                  <Link
                    href={"/client-value-engineering"}
                    className="cursor-pointer"
                  >
                    <img
                      src="/images/client-partnerships/explore.png"
                      alt="explore"
                    />
                  </Link>
                </div>
              </div>

              {/* Right Column - Quote Boxes */}
              <div className="my-8 lg:my-0 lg:w-1/2 space-y-8">
                {/* Top Quote Box */}
                <div className="">
                  <h3 className="text-xl  lg:text-2xl  max-w-lg italic font-bold text-gray-800 mb-2">
                    {data?.mainPage?.quote1?.text1 ?? '"ISO Compliant • Donor Trusted • Built Across PNG"'}
                  </h3>
                  <p className="text-[#23B14D] lg:text-lg font-semibold  italic">
                    {data?.mainPage?.quote1?.text2 ?? "From Brief to Commissioning in 90 Days"}
                  </p>
                </div>

                {/* Bottom Quote Box */}
                <div className=" hidden lg:mt-32 relative lg:flex  space-x-4 items-center ">
                  <div className="absolute top-4 -left-14">
                    <img
                      src="/images/client-partnerships/shape.png"
                      alt="shape"
                      className="w-14"
                    />
                  </div>
                  <div className=" text-lg lg:text-xl font-bold max-w-lg italic text-gray-800 mb-2">
                    {data?.mainPage?.quote2 ?? "Let's Build What Your Nation or Enterprise Needs Next."}
                  </div>
                  <div className="-ml-10 -mt-10">
                    <img
                      src="/images/client-partnerships/shape2.png"
                      alt="shape"
                      className="w-14 "
                    />
                  </div>
                </div>
                <div>
                  <div className=" flex justify-end my-8 cursor-pointer">
                    <img
                      src="/images/client-partnerships/book.png"
                      alt="Book Discovery Call"
                    />
                  </div>
                  <div className=" flex justify-end mb-32 mt-8 cursor-pointer">
                    <img
                      src="/images/client-partnerships/green.png"
                      alt="Green Client Partnership Prospectus"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Chatbot />
      <WhoWePartnerWith 
        isOpen={isOpen} 
        onClose={closeModal}
        data={data?.whoWePartnerWith}
      />
      <OurClientPartnershipModel
        isOpen={isOurModelOpen}
        onClose={closeOurModelModal}
        data={data?.ourClientPartnership}
      />
      <WhatSetsGREENApart
        isOpen={isWhatSetsOpen}
        onClose={closeWhatSetsModal}
        data={data?.whatSetsGreenApart}
      />
      <UseCases 
        isOpen={isUseCasesOpen} 
        onClose={closeUseCasesModal}
        data={data?.useCases}
      />
      <PartnershipOnboarding
        isOpen={isPartnershipOnboardingOpen}
        onClose={closePartnershipOnboardingModal}
      />
    </React.Fragment>
  );
};

export default ClientPartnerships;
