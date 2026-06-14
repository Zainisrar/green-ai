"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import OurProcurementEthos from "./Dialog/OurProcurementEthos";
import CodeOfConduct from "./Dialog/CodeofConduct";
import TopNavigation from "../TopNavigation/TopNavigation";
import Chatbot from "../Chatbot";
import { useHandbook } from "@/app/hooks/useHandbook";

const Handbook = () => {
  const [isOurProcurementEthosOpen, setIsOurProcurementEthosOpen] =
    useState(false);
  const [isCodeOfConductOpen, setIsCodeOfConductOpen] = useState(false);
  const { data, error } = useHandbook();

 
  if (error) {
    return <div className="min-h-[50vh] flex items-center justify-center text-red-600">{error}</div>;
  }
  if (!data) return null;

  const { mainPage, ourProcurementEthos, codeOfConduct } = data;

  return (
    <React.Fragment>
      <div className="  ">
        <TopNavigation />

        <div className="flex h-full z-50 relative">
          {/* Left Side - GLOBAL SNAPSHOT Text */}
          <div className="w-1/6 flex items-center justify-center">
            <div className="fixed top-1/5 left-4 lg:left-14">
              <img
                src="/images/handbook/supplier-code-of-conduct.png"
                alt="Supplier Code of Conduct"
                className="w-4 lg:w-6"
              />
            </div>
          </div>

          {/* Main Content Area */}
          <div className=" px-8 pt-8">
            {/* Main Title */}
            <div className="mb-8 ml-10">
              <h1 className="lg:text-3xl text-2xl font-black text-gray-800 mb-4">
                {mainPage.title.toUpperCase()}
              </h1>
              <h2 className="text-xl lg:text-2xl font-bold text-[#23B14D] italic mb-4">
                {mainPage.subHeadline}
              </h2>
              <p className="text-gray-600 text-lg mb-8 whitespace-pre-line">
                {mainPage.description}
              </p>
            </div>
            <div className="absolute left-14 -z-10">
              <img src="/images/handbook/mainImg.png" alt="" role="presentation" />
            </div>
            {/* Content Grid */}
            <div className="grid  lg:grid-cols-2  gap-8 mb-8">
              {/* Our Procurement Ethos */}
              <div className="flex space-x-4">
                <img
                  src="/images/become-supplier/procurement-ethos.png"
                  alt="Our Procurement Ethos"
                  className="h-20 lg:h-auto"
                />
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    {ourProcurementEthos.title}
                  </h3>
                  <button
                    onClick={() => setIsOurProcurementEthosOpen(true)}
                    className="cursor-pointer"
                  >
                    <img
                      src="/images/client-partnerships/explore.png"
                      alt="explore"

                    />
                  </button>
                </div>
              </div>

              {/* Code Of Conduct (Rewritten) */}
              <div className="flex space-x-4">
                <img
                  src="/images/become-supplier/code-of-conduct.png"
                  alt="Code Of Conduct"
                                    className="h-20 lg:h-auto"

                />
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    {codeOfConduct.title}
                  </h3>
                  <button
                    onClick={() => setIsCodeOfConductOpen(true)}
                    className="cursor-pointer"
                  >
                    <img
                      src="/images/client-partnerships/explore.png"
                      alt="explore"
                      
                    />
                  </button>
                </div>
              </div>

              {/* The GREEN Vendor Checklist (Editable PDF Style) */}
              <div className="flex space-x-4">
                <img
                  src="/images/become-supplier/green-vendor.png"
                  alt="GREEN Vendor Checklist"
                                    className="h-20 lg:h-auto"

                />
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    The GREEN Vendor Checklist (Editable PDF Style)
                  </h3>
                  <button className="cursor-pointer">
                    <img
                      src="/images/client-partnerships/explore.png"
                      alt="explore"
                    />
                  </button>
                </div>
              </div>

              {/* Certification & Signature Page */}
              <div className="flex space-x-4">
                <img
                  src="/images/become-supplier/signature-page.png"
                  alt="Certification & Signature Page"
                                    className="h-20 lg:h-auto"

                />
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    Certification & Signature Page
                  </h3>
                  <button className="cursor-pointer">
                    <img
                      src="/images/client-partnerships/explore.png"
                      alt="explore"
                    />
                  </button>
                </div>
              </div>
            </div>

          <div className="flex justify-end">
            <Link href={mainPage.cta?.[0]?.href || "/supply-partners/login"} className=" cursor-pointer">
              <img
                src="/images/handbook/supplier-login.png"
                alt={mainPage.cta?.[0]?.text || "Supplier Login"}
              />
            </Link>
          </div>
            {/* Left Quote Box */}
            <div className="flex mt-10 space-x-12 mb-8">
              <div className="">
                <div className="hidden lg:flex relative space-x-4 items-center">
                  <div className="absolute -left-16 -top-2">
                    <img src="/images/handbook/shape.png" alt="shape" />
                  </div>
                  <div className="">
                      {mainPage.quote.slice(0,2).map((q,i) => (
                    <h3 key={i} className="text-2xl font-bold text-gray-800  whitespace-pre-line">
                        <span className={q.highlighted ? "text-[#23B14D]" : ""}>{q.text}</span>
                    </h3>
                      ))}
                  </div>
                  <div className="-ml-16 -mt-2">
                    <img
                      src="/images/handbook/shape2.png"
                      className="w-24"
                      alt="shape"
                    />
                  </div>
                </div>
              </div>

              {/* Right Side Content */}
              <div className=" mb-20 lg:mb-0 lg:max-w-xl">
                {/* Bottom Quote */}
                <div className="lg:text-center">
                  <h3 className="text-xl lg:text-2xl font-bold text-gray-800 mb-4">
                    {mainPage.quote[2]?.text.split('GREEN').map((seg, idx) => (
                      <React.Fragment key={idx}>
                        {seg}
                        {idx === 0 && <span className="text-[#23B14D]">GREEN</span>}
                      </React.Fragment>
                    ))}
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="relative z-[99999999999999999999999999999]">
      <Chatbot />
      </div>
      <OurProcurementEthos
        isOpen={isOurProcurementEthosOpen}
        onClose={() => setIsOurProcurementEthosOpen(false)}
        title={ourProcurementEthos.title}
        description={ourProcurementEthos.description}
        keys={ourProcurementEthos.keys}
        img={ourProcurementEthos.img}
      />
      <CodeOfConduct
        isOpen={isCodeOfConductOpen}
        onClose={() => setIsCodeOfConductOpen(false)}
        title={codeOfConduct.title}
        items={codeOfConduct.item}
      />
    </React.Fragment>
  );
};

export default Handbook;
