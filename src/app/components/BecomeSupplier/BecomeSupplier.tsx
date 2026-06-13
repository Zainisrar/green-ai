"use client";
import React, { useState } from "react";
import WhatYouNeed from "./Dialog/What-you-need";
import WhyGreen from "./Dialog/Why-Green";
import Link from "next/link";
import TopNavigation from "../TopNavigation/TopNavigation";
import Chatbot from "../Chatbot";
import { useBecomeSupplier } from "../../../hooks/useBecomeSupplier";

const BecomeSupplier = () => {
  const [isWhatYouNeedOpen, setIsWhatYouNeedOpen] = useState(false);
  const [isWhyGreenOpen, setIsWhyGreenOpen] = useState(false);
  const { data } = useBecomeSupplier();

  const mainTitle = data?.mainPage?.title ?? "BECOME A SUPPLIER";
  const subHeadline =
    data?.mainPage?.subHeadline ?? "Partner with GREEN. Build What Matters.";
  const descriptionHighlighted =
    data?.mainPage?.description?.highlighted ?? "GREEN";
  const descriptionText =
    data?.mainPage?.description?.text ??
    "Limited sources only from trusted suppliers who meet our uncompromising standards.";

  const quote0 = data?.mainPage?.quote?.[0];
  const quote1 = data?.mainPage?.quote?.[1];
  const cta1= data?.mainPage?.cta[0];
  const cta2= data?.mainPage?.cta[1];

  const openWhatYouNeed = () => setIsWhatYouNeedOpen(true);
  const closeWhatYouNeed = () => setIsWhatYouNeedOpen(false);
  const openWhyGreen = () => setIsWhyGreenOpen(true);
  const closeWhyGreen = () => setIsWhyGreenOpen(false);
  return (
    <React.Fragment>
      <div className="   ">
        <TopNavigation />
        <div className="absolute top-0 right-0 -z-10 lg:block hidden">
          <img src="/images/become-supplier/mainImg.png" alt="mainImg" />
        </div>
        <div className="flex h-full">
          {/* Left Side  */}
          <div className="w-1/6 flex items-center justify-center">
            <div className="fixed top-1/4 left-4 lg:left-14">
              <img
                src="/images/become-supplier/become-supplier.png"
                alt="Become Supplier"
                className="w-5 lg:w-8"
              />
            </div>
          </div>

          {/* Main Content Area */}
          <div className=" w-full pt-8">
            {/* Main Title */}
            <div className="lg:pl-10 pl-4 pr-4 lg:pr-0 mb-8">
              <h1 className=" text-2xl lg:text-3xl font-black text-gray-800 mb-4">
                {mainTitle.split(" ").slice(0, -1).join(" ")}{" "}
                <span className="text-[#23B14D]">
                  {mainTitle.split(" ").slice(-1)}
                </span>
              </h1>
              <h2 className="text-xl lg:text-2xl font-bold text-[#23B14D] italic mb-4">
                {subHeadline}
              </h2>
              <p className="text-gray-600 text-lg mb-6">
                {descriptionText.split(descriptionHighlighted)[0]}
                <span className="text-[#23B14D]">{descriptionHighlighted}</span>
                {descriptionText.split(descriptionHighlighted)[1]}
              </p>
            </div>

            {/* Content Grid */}
            <div className="lg:flex pr-4 lg:pr-0">
              <div className="w-full  space-y-6 mb-8">
                {/* Supplier Login & Registration Panel */}
                <div>
                  <div className="flex space-x-4 lg:max-w-3xl">
                    <img
                      src="/images/become-supplier/supplierlogin.png"
                      alt="Supplier Login"
                      className="h-20 lg:h-auto"
                    />
                    <div className="flex-1">
                      <h3 className="text-xl lg:text-2xl font-bold text-gray-800 mb-2">
                        Supplier Login & Registration Panel
                      </h3>
                      <p className="text-sm text-gray-600 mb-3">
                        Infrastructure without integrity is a risk. With GREEN,
                        resilience is engineered.
                      </p>
                    </div>
                    <div className=" lg:flex hidden ">
                      <Link
                        href={"/ecosystem/supply-partners/login"}
                        className="cursor-pointer"
                      >
                        <img
                          src="/images/client-partnerships/explore.png"
                          alt="explore"
                        />
                      </Link>
                    </div>
                  </div>
                  <div className=" lg:hidden flex justify-end">
                    <Link
                      href={"/ecosystem/supply-partners/login"}
                      className="cursor-pointer"
                    >
                      <img
                        src="/images/client-partnerships/explore.png"
                        alt="explore"
                      />
                    </Link>
                  </div>
                </div>
                {/* What You'll Need */}
                <div>
                  <div className="flex space-x-4 lg:max-w-3xl">
                    <img
                      src="/images/become-supplier/what-you-need.png"
                      alt="What You'll Need"
                      className="lg:h-auto h-20"
                    />
                    <div className="flex-1">
                      <h3 className="text-xl lg:text-2xl font-bold text-gray-800 mb-2">
                        What You'll Need
                      </h3>
                      <p className="text-sm text-gray-600 mb-3">
                        Financial models and IRR simulations available on
                        request
                      </p>
                    </div>
                    <div className="lg:block hidden">
                      <button
                        onClick={openWhatYouNeed}
                        className="cursor-pointer"
                      >
                        <img
                          src="/images/client-partnerships/explore.png"
                          alt="explore"
                        />
                      </button>
                    </div>
                  </div>
                  <div className="flex lg:hidden justify-end">
                    <button
                      onClick={openWhatYouNeed}
                      className="cursor-pointer"
                    >
                      <img
                        src="/images/client-partnerships/explore.png"
                        alt="explore"
                      />
                    </button>
                  </div>
                </div>

                {/* Why GREEN? */}
                <div>
                  <div className="flex space-x-4 lg:max-w-3xl">
                    <img
                      src="/images/become-supplier/why-green.png"
                      alt="Why GREEN?"
                      className="lg:h-auto h-20"
                    />
                    <div className="flex-1">
                      <h3 className="text-xl lg:text-2xl font-bold text-gray-800 mb-2">
                        Why GREEN?
                      </h3>
                      <p className="text-sm text-gray-600 mb-3">
                        Engage in continuous improvement & collaboration
                      </p>
                    </div>
                    <div className=" hidden lg:block">
                      <button onClick={openWhyGreen} className="cursor-pointer">
                        <img
                          src="/images/client-partnerships/explore.png"
                          alt="explore"
                        />
                      </button>
                    </div>
                  </div>
                  <div className=" flex lg:hidden justify-end">
                    <button onClick={openWhyGreen} className="cursor-pointer">
                      <img
                        src="/images/client-partnerships/explore.png"
                        alt="explore"
                      />
                    </button>
                  </div>
                </div>
              </div>
              <div className="lg:w-[400px]">
                <div className="flex space-x-4 relative ">
                  <div className="absolute -left-12 top-8 ">
                    <img
                      src="/images/become-supplier/shape.png"
                      className="w-14"
                      alt="shape"
                    />
                  </div>
                  <div className=" ">
                    <h3 className="lg:text-lg font-bold text-gray-800 mb-2 italic">
                      {quote0?.text ??
                        "This Portal is Your First Step Toward Becoming Part of Our Global Energy Supply Network"}{" "}
                      {quote0?.highlighted && (
                        <span className="text-[#23B14D]">
                          {quote0.highlighted}
                        </span>
                      )}
                    </h3>
                  </div>
                  <div className="absolute right-0 -top-4">
                    <img
                      src="/images/become-supplier/shape2.png"
                      className="w-12"
                      alt="shape"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Quote */}
            <div className="lg:flex  justify-between mb-20 ">
              <div className="">
                <h3 className="lg:text-2xl text-xl capitalize  font-bold text-gray-800 mb-2">
                  {quote1?.text.split(quote1?.highlighted)[0]}
                  <span className="text-[#23B14D]">{quote1?.highlighted}</span>
                  {quote1?.text.split(quote1?.highlighted)[1]}
                </h3>
              </div>
              <div>
                <Link
                href={cta1?.href ?? "#"}
                className="mt-8  relative lg:flex justify-end mb-8 cursor-pointer">
                  <img
                    src="/images/become-supplier/procrument.png"
                    alt="procurment contact"
                  />
                <div className="absolute top-3 text-xl font-semibold right-20 lg:right-10">
                  {
                    cta1?.text 
                  }
                </div>
                </Link>
                <Link
                href={cta2?.href ?? "#"}
                className=" flex justify-end relative my-8  cursor-pointer">
                  <img
                    src="/images/become-supplier/green.png"
                    alt="green supplier prospectus"
                  />
                <div className="absolute top-3  font-semibold right-10">
                  {
                    cta2?.text 
                  }
                </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
        {/* Right Side Info Box */}

        <Chatbot />
      </div>
      <WhatYouNeed
        isOpen={isWhatYouNeedOpen}
        onClose={closeWhatYouNeed}
        title={data?.whatYouNeed?.title}
        keys={data?.whatYouNeed?.keys}
      />
      <WhyGreen
        isOpen={isWhyGreenOpen}
        onClose={closeWhyGreen}
        title={data?.whyGreen?.title}
        keys={data?.whyGreen?.keys}
        imgSrc={data?.whyGreen?.img?.src}
        imgAlt={data?.whyGreen?.img?.alt}
      />
    </React.Fragment>
  );
};

export default BecomeSupplier;
