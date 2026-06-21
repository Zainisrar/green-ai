"use client";
import React, { useState } from "react";
import TopNavigation from "../TopNavigation/TopNavigation";
import Chatbot from "../Chatbot";
import { useEnergyStorageSmartGrid } from "../../../hooks/useEnergyStorageSmartGrid";
import Link from "next/link";
import DispatchArchitect from "./Modals/DispatchArchitect";
import StorageSystemReview from "./Modals/StorageSystemReview";

const SmartGrid = () => {
  const { smartGridData } = useEnergyStorageSmartGrid();
  const [isDispatchArchitectOpen, setIsDispatchArchitectOpen] = useState(false);
  const [isStorageReviewOpen, setIsStorageReviewOpen] = useState(false);

  if (!smartGridData) {
    return null;
  }

  const renderCallToActionButton = (index: number, className: string) => {
    const text =
      smartGridData?.callToActions?.[index]?.text ||
      [
        "Talk to a Dispatch Architect",
        "Book a Storage System Review",
        "Download our Smart Grid and Storage Dossier",
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
        <button
          type="button"
          onClick={() => setIsDispatchArchitectOpen(true)}
          className="inline-block cursor-pointer"
        >
          {buttonContent}
        </button>
      );
    }

    if (index === 1) {
      return (
        <button
          type="button"
          onClick={() => setIsStorageReviewOpen(true)}
          className="inline-block cursor-pointer"
        >
          {buttonContent}
        </button>
      );
    }

    return (
      <Link
        href={smartGridData?.callToActions?.[2]?.href || "#"}
        className="inline-block cursor-pointer"
      >
        {buttonContent}
      </Link>
    );
  };

  return (
    <React.Fragment>
      <div className="min-h-screen">
        <TopNavigation />

        {/* Mobile Layout */}
        <div className="lg:hidden px-4 py-6 relative z-50 ">
          {/* Title */}
          <div className="mb-4">
            <h1 className="text-3xl sm:text-4xl font-black text-gray-800 leading-tight">
              {smartGridData?.header?.title?.split(" & ")[0] ||
                "ENERGY STORAGE"}
              <br />
              &
              <br />
              <span className="text-[#23B14D]">
                {/* remaining title it can be anything */}
                {smartGridData?.header?.title?.split(" & ")[1] || "SMART GRID"}
              </span>
            </h1>
          </div>

          {/* Subtitle */}
          <div className="mb-4">
            <h2 className="text-lg font-bold text-[#23B14D] mb-2">
              {smartGridData?.header?.subtitle ||
                "Power That Thinks. Systems That React. Continuity Without Compromise."}
            </h2>
            <p className="text-base text-gray-600">
              {smartGridData?.header?.description ||
                "At GREEN, we don't build systems that wait for problems. We build systems that predict, protect, and perform — before failure strikes."}
            </p>
          </div>

          {/* Quote Section */}
          <div
          style={{
            transform:"skewX(-16deg)"
          }}
          className="mb-6 w-[220px] mx-auto shadow-lg bg-[#f8f9d9] p-4 rounded">
            <div>
              <h3 className="text-xl font-bold text-gray-800">
                {smartGridData?.quote?.text || "Where Energy Stops, We Store."}
              </h3>
            </div>
          </div>

          {/* Main Quote */}
          <div className="mb-6 text-center">
            <p className=" font-bold text-lg italic text-gray-700">
              "Where Grids Fail, We{" "}
              <span className="text-[#23B14D] font-semibold">Respond.</span>
              <br />
              Where{" "}
              <span className="text-[#23B14D] font-semibold">
                Intelligence
              </span>{" "}
              Is Needed,
              <br />
              We <span className="text-[#23B14D] font-semibold">Lead.</span>"
            </p>
          </div>

          {/* Our Storage Architecture */}
          <div className="mb-6">
            <h3 className="text-lg lg:text-xl font-bold text-gray-800 mb-3">
              {smartGridData?.architecture?.heading ||
                "Our Storage Architecture"}
            </h3>
            <ul className="space-y-3  text-gray-700">
              {smartGridData?.architecture?.items?.map((item, index) => (
                <li key={index} className="flex items-start space-x-2">
                  <span className="text-[#23B14D] font-bold">•</span>
                  <div>
                    <strong>{item.title}</strong>
                    <br />
                    <span className="text-gray-600">– {item.description}</span>
                  </div>
                </li>
              )) || (
                <>
                  <li className="flex items-start space-x-2">
                    <span className="text-[#23B14D] font-bold">•</span>
                    <div>
                      <strong>Modular Lithium & LFP Systems</strong>
                      <br />
                      <span className="text-gray-600">
                        – from 5 kWh to 2+ MWh
                      </span>
                    </div>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-[#23B14D] font-bold">•</span>
                    <div>
                      <strong>Rapid-Deploy Banks</strong>
                      <br />
                      <span className="text-gray-600">
                        – for remote, mobile, or critical use cases
                      </span>
                    </div>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-[#23B14D] font-bold">•</span>
                    <div>
                      <strong>Hybrid Optimization</strong>
                      <br />
                      <span className="text-gray-600">
                        – solar, diesel, and grid coordination
                      </span>
                    </div>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-[#23B14D] font-bold">•</span>
                    <div>
                      <strong>Thermal & Control Integration</strong>
                      <br />
                      <span className="text-gray-600">
                        – CICU enclosures with built-in intelligence
                      </span>
                    </div>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-[#23B14D] font-bold">•</span>
                    <div>
                      <strong>Telematics-Enabled</strong>
                      <br />
                      <span className="text-gray-600">
                        – live diagnostics, alerts, and predictive insights
                      </span>
                    </div>
                  </li>
                </>
              )}
            </ul>
          </div>

          {/* Bottom Description */}
          <div className="mb-6 text-center">
            <h3 className="text-lg font-bold text-gray-800 mb-2">
              {smartGridData?.statement?.heading ||
                "Engineered for the Real World. Built to Hold When Everything Else Doesn't."}
            </h3>
            <p className="text-[#23B14D] italic font-semibold">
              —{" "}
              {smartGridData?.statement?.description ||
                "From hospitals in blackout zones to island grids stretched to the edge."}
            </p>
          </div>

          <div className="flex flex-col items-center gap-5 lg:hidden">
            {renderCallToActionButton(0, "px-8 py-3")}
            {renderCallToActionButton(1, "px-8 py-3")}
            {renderCallToActionButton(2, "px-8 py-3")}
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden lg:block">
          <div className="absolute top-0 left-0">
            <img
              src="/images/smart-grid/mainImg.png"
              className="w-9/12 h-[130vh]"
              alt="mainImg"
            />
          </div>
          <div className="flex h-full">
            {/* Left Side - GLOBAL SNAPSHOT Text */}
            <div className="w-1/6 flex items-center justify-center">
              <div className="fixed top-1/4 left-8">
                <img
                  src="/images/smart-grid/smard-grid.png"
                  className="w-8"
                  alt="smart-grid"
                />
              </div>
            </div>

            {/* Main Content Area */}
            <div className="w-full px-2 pt-8">
              {/* Main Title */}
              <div className="mb-8">
                <h1 className="text-3xl lg:text-4xl 2xl:text-5xl font-black text-gray-800 mb-4 leading-tight">
                  {smartGridData?.header?.title?.split(" & ")[0] ||
                    "ENERGY STORAGE"}
                  {` `}
                  <span className="text-[#23B14D]">
                    {smartGridData?.header?.title?.split(" & ")[1] ||
                      "SMART GRID"}
                  </span>
                </h1>
                <h2 className="text-xl lg:text-2xl font-bold text-gray-800 mb-2">
                  {smartGridData?.header?.subtitle ||
                    "Power That Thinks. Systems That React. Continuity Without Compromise."}
                </h2>
                <p className="text-gray-600 text-lg">
                  {smartGridData?.header?.description ||
                    "At GREEN, we don't build systems that wait for problems. We build systems that predict, protect, and perform — before failure strikes."}
                </p>
              </div>

              {/* Storage Architecture Section */}
              <div className="flex justify-end w-3/4">
                <div className="mb-8">
                  <h3 className="text-xl lg:text-2xl font-bold text-gray-800 mb-4">
                    {smartGridData?.architecture?.heading ||
                      "Our Storage Architecture"}
                  </h3>
                  <ul className="space-y-2 text-gray-700">
                    {smartGridData?.architecture?.items?.map((item, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <span className="text-[#23B14D] font-bold">•</span>
                        <span>
                          <strong>{item.title}</strong> – {item.description}
                        </span>
                      </li>
                    )) || (
                      <>
                        <li className="flex items-start space-x-2">
                          <span className="text-[#23B14D] font-bold">•</span>
                          <span>
                            <strong>Modular Lithium & LFP Systems</strong> –
                            from 5 kWh to 2+ MWh
                          </span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <span className="text-[#23B14D] font-bold">•</span>
                          <span>
                            <strong>Rapid-Deploy Banks</strong> – for remote,
                            mobile, or critical use cases
                          </span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <span className="text-[#23B14D] font-bold">•</span>
                          <span>
                            <strong>Hybrid Optimization</strong> – solar,
                            diesel, and grid coordination
                          </span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <span className="text-[#23B14D] font-bold">•</span>
                          <span>
                            <strong>Thermal & Control Integration</strong> –
                            CICU enclosures with built-in intelligence
                          </span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <span className="text-[#23B14D] font-bold">•</span>
                          <span>
                            <strong>Telematics-Enabled</strong> – live
                            diagnostics, alerts, and predictive insights
                          </span>
                        </li>
                      </>
                    )}
                  </ul>
                </div>
              </div>
              {/* Bottom Section with Two Columns */}
              <div className="flex space-x-8">
                {/* Left - Where Energy Stops */}
                <div className="w-1/4">
                  <div
                  style={{
                    transform:"skewX(-16deg)"
                  }}
                  className="bg-[#f8f9d9]/80 p-6 shadow-lg">
                    <div>
                      <h3 className="text-2xl 2xl:text-3xl font-bold text-gray-800">
                        {smartGridData?.quote?.text ||
                          "Where Energy Stops, We Store."}
                      </h3>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Description */}
              <div className="flex mb-24 items-center my-10 gap-10 2xl:gap-20 2xl:-ml-20">
                {/* Right - Quote */}
                <div className="min-w-0">
                  <div className="">
                    <p className="text-xl font-bold italic text-gray-700">
                      "Where Grids Fail, We{" "}
                      <span className="text-[#23B14D] font-semibold">
                        Respond.
                      </span>
                      <br />
                      Where{" "}
                      <span className="text-[#23B14D] font-semibold">
                        Intelligence
                      </span>{" "}
                      Is Needed,
                      <br />
                      We{" "}
                      <span className="text-[#23B14D] font-semibold">
                        Lead.
                      </span>
                      "
                    </p>
                  </div>
                </div>
                <div className="w-4/12 min-w-0">
                  <h3 className="text-xl lg:text-2xl font-bold text-gray-800 mb-2">
                    {smartGridData?.statement?.heading ||
                      "Engineered for the Real World. Built to Hold When Everything Else Doesn't."}
                  </h3>
                  <p className="text-[#23B14D] text-lg italic font-semibold">
                    —{" "}
                    {smartGridData?.statement?.description ||
                      "From hospitals in blackout zones to island grids stretched to the edge"}
                  </p>
                </div>
                <div className="hidden lg:flex flex-col items-end gap-6 min-w-0">
                  {renderCallToActionButton(0, "px-10 py-3")}
                  {renderCallToActionButton(1, "px-10 py-3")}
                  {renderCallToActionButton(2, "px-10 py-3")}
                </div>
              </div>
            </div>
          </div>
        </div>
       
        <div className="lg:block hidden">
          <Chatbot />
        </div>
      </div>
      <DispatchArchitect
        isOpen={isDispatchArchitectOpen}
        onClose={() => setIsDispatchArchitectOpen(false)}
      />
      <StorageSystemReview
        isOpen={isStorageReviewOpen}
        onClose={() => setIsStorageReviewOpen(false)}
      />
    </React.Fragment>
  );
};

export default SmartGrid;
