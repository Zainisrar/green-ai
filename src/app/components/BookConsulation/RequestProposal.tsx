"use client";
import React, { useState } from "react";
import TopNavigation from "../TopNavigation/TopNavigation";
import Chatbot from "../Chatbot";
import Proposal from "./Modals/Proposal";

const RequestProposal = () => {
  const [isProposalOpen, setIsProposalOpen] = useState(false);

  return (
    <React.Fragment>
      <div className="">
        <TopNavigation />
        <div className="flex h-full">
          <div className=" lg:w-1/6 hidden lg:flex items-center justify-center">
            <div className=" fixed top-[20%] left-14">
              <img loading="lazy" decoding="async"
                src="/images/book-consulation/book-consulation.png"
                alt="globalsnapshot"
                className="w-10"
              />
            </div>
          </div>

          {/* Main Content Area */}
          <div className="  flex flex-col   md:pl-38 md:mr-4  md:my-10  lg:my-0 lg:pl-8 lg:px-8  lg:mr-8 ml-4 rounded-lg">
            <div className="">
              {/* Main Heading */}
              <h1 className="text-2xl lg:text-3xl font-black text-gray-800 mb-4">
                Request A <span className="text-[#23B14D]">PROPOSAL</span>{" "}
                {` `} (RFP)
              </h1>

              {/* Subtitle */}
              <p className="text-xl lg:text-2xl text-[#23B14D] italic font-bold mb-2">
                Let’s Build Your Energy Project — From Vision to Reality.
              </p>

              {/* Description */}
              <p className="text-gray-700 text-base lg:text-lg max-w-7xl mb-4 leading-relaxed">
                Whether you're developing a project, designing a grant, or
                planning a regional rollout — schedule a tailored consultation
                with <span className="font-bold text-[#23B14D]">GREEN's</span>{" "}
                technical, strategy, or policy teams. Get real answers from
                those who deliver real energy systems.
              </p>

              {/* Who Should Use This Section */}
              <h2 className="text-xl lg:text-2xl font-bold text-gray-800 mb-4">Who Should Use This</h2>

              <div className="flex justify-between">
                <div className="  mb-16 ">
                  <div className="space-y-4">
                    <div className=" flex justify-between">
                      <div>
                        <p
                          style={{
                            transform: "skewX(-16deg)",
                          }}
                          className=" px-8 border-[#FFE500] border-2   py-3 font-semibold"
                        >
                          <span
                            style={{ transform: "skewX(16deg)" }}
                            className="inline-block"
                          >
                            Government Agencies
                          </span>
                        </p>
                      </div>

                      <div>
                        <p
                          style={{
                            transform:"skewX(-16deg)"
                          }}
                          className=" px-8  border-[#FFE500] border-2 py-3 font-semibold"
                        >
                          <span
                            style={{ transform: "skewX(16deg)" }}
                            className="inline-block"
                          >
                            Donors & NGOs
                          </span>
                        </p>
                      </div>
                    </div>
                    <div className=" flex space-x-8 justify-between">
                      <div>
                        <p
                        style={{
                          transform:"skewX(-16deg)"
                        }}
                        className=" px-8 border-[#FFE500] border-2  py-3 font-semibold">
                          <span
                            style={{ transform: "skewX(16deg)" }}
                            className="inline-block"
                          >
                            Commercial developers
                          </span>
                        </p>
                      </div>

                      <div>
                        <p
                         style={{
                          transform:"skewX(-16deg)"
                         }}
                        className=" px-8  border-[#FFE500] border-2  py-3 font-semibold">
                          <span
                            style={{ transform: "skewX(16deg)" }}
                            className="inline-block"
                          >
                            Large enterprises
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute top-0 right-0 -z-10">
                <img loading="lazy" decoding="async"
                  src="/images/book-consulation/requestProposalMainImg.png"
                  alt="mainImg"
                />
              </div>
              {/* What GREEN Delivers in Every Proposal */}
              <h2 className="text-xl lg:text-2xl font-bold text-gray-800 mb-4">
                What GREEN Delivers in Every Proposal
              </h2>

              <div className="flex justify-between">
                <div className="grid md:grid-cols-2 gap-4 mb-8">
                  <div className="flex items-center space-x-3">
                    <span>
                      <img loading="lazy" decoding="async"
                        src="/images/grid-intel/lighting.png"
                        className="w-14 -mt-4"
                        alt="lighting"
                      />
                    </span>
                    <span className="font-semibold italic">
                      Tailored solution with technical specs
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span>
                      <img loading="lazy" decoding="async"
                        src="/images/grid-intel/lighting.png"
                        className="w-14 -mt-4"
                        alt="lighting"
                      />
                    </span>
                    <span className="font-semibold italic">
                      Single Line Diagram (SLD)
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span>
                      <img loading="lazy" decoding="async"
                        src="/images/grid-intel/lighting.png"
                        className="w-14 -mt-4"
                        alt="lighting"
                      />
                    </span>
                    <span className="font-semibold italic">
                      Financial Quotation (CapEx + OpEx)
                    </span>
                  </div>

                  <div className="flex items-center space-x-3">
                    <span>
                      <img loading="lazy" decoding="async"
                        src="/images/grid-intel/lighting.png"
                        className="w-14 -mt-4"
                        alt="lighting"
                      />
                    </span>
                    <span className="font-semibold italic">
                      ESG Impact Metrics
                    </span>
                  </div>

                  <div className="flex items-center space-x-3 md:col-span-2">
                    <span>
                      <img loading="lazy" decoding="async"
                        src="/images/grid-intel/lighting.png"
                        className="w-14 -mt-4"
                        alt="lighting"
                      />
                    </span>
                    <span className="font-semibold italic">
                      Delivery timelines, SLAs, warranties
                    </span>
                  </div>
                </div>
                <div className="  max-w-xs ">
                  <div className="relative flex items-center ">
                    <div className="absolute -left-12 top-10">
                      <img loading="lazy" decoding="async"
                        src="/images/book-consulation/shape.png"
                        alt="shape"
                        className="w-14"
                      />
                    </div>
                    <div>
                      <h3 className="text-xl lg:text-2xl font-bold ">
                        “Proposals shouldn’t be generic.
                      </h3>
                      <p className="text-gray-700 font-bold text-lg mb-4">
                        At{" "}
                        <span className="text-[#23B14D] font-bold">GREEN</span>,
                        every RFP is a strategic partnership in the making.”
                      </p>
                    </div>
                    <div className="absolute -right-8 -top-6">
                      <img loading="lazy" decoding="async"
                        src="/images/book-consulation/shape2.png"
                        alt="shape"
                        className="w-14"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Schedule Info */}
              <div className="flex justify-between items-center mb-4">
                <div 
                style={{
                  transform:"skewX(-16deg)"
                }}
                className="flex items-center  border-[#f0f9da] p-4 border-3 px-20 space-x-3 ">
                  <span>
                    <img loading="lazy" decoding="async"
                     style={{
                        transform:"skewX(16deg)"
                     }}
                      src="/images/book-consulation/calendar.png"
                      className="w-5"
                      alt="lighting"
                    />
                  </span>
                  <span
                   style={{
                    transform:"skewX(16deg)"
                   }}
                  className="font-semibold italic">
                    Email Fallback :{" "}
                    <a href="mailto:solutions@green.com.pg">
                      solutions@green.com.pg
                    </a>
                  </span>
                </div>
                <div
                  className="relative z-10 flex cursor-pointer justify-end lg:mt-10"
                  onClick={() => setIsProposalOpen(true)}
                >
                  <img loading="lazy" decoding="async"
                    src="/images/book-consulation/requestProposal.png"
                    alt="Request proposal"
                  />
                </div>
              </div>

              {/* Free Consultation Note */}
              <p className="text-center text-gray-600 mb-32 my-14">
                Consultations are free for{" "}
                <span className="text-[#23B14D] font-semibold">
                  government agencies, donors, NGOs,
                </span>{" "}
                and registered local businesses.
              </p>
            </div>
          </div>
          {/* Sidebar Content */}
        </div>
      </div>
      <Proposal isOpen={isProposalOpen} onClose={() => setIsProposalOpen(false)} />
      <Chatbot />
    </React.Fragment>
  );
};

export default RequestProposal;
